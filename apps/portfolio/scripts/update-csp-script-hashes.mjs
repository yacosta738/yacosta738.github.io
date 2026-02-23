import { createHash } from "node:crypto";
import {
	existsSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const rootDir = resolve(process.cwd());
const distDir = join(rootDir, "dist");
const headersPath = join(rootDir, "public", "_headers");

/**
 * Walk through a directory and find all HTML files
 * @param {string} dir
 * @returns {string[]}
 */
const walkHtmlFiles = (dir) => {
	if (!existsSync(dir)) return [];
	const htmlFiles = [];
	const entries = readdirSync(dir);
	for (const entry of entries) {
		const fullPath = join(dir, entry);
		const stats = statSync(fullPath);
		if (stats.isDirectory()) {
			htmlFiles.push(...walkHtmlFiles(fullPath));
		} else if (entry.endsWith(".html")) {
			htmlFiles.push(fullPath);
		}
	}
	return htmlFiles;
};

/**
 * Hash script content for CSP
 * @param {string} scriptContent
 * @returns {string}
 */
const hashInlineScript = (scriptContent) => {
	const hash = createHash("sha256")
		.update(scriptContent, "utf8")
		.digest("base64");
	return `'sha256-${hash}'`;
};

/**
 * Extract inline script hashes from HTML without using complex regex
 * @param {string} html
 * @returns {Set<string>}
 */
const extractHashesFromHtml = (html) => {
	const hashes = new Set();
	let pos = 0;
	const lowerHtml = html.toLowerCase();

	while (true) {
		const startTagIndex = lowerHtml.indexOf("<script", pos);
		if (startTagIndex === -1) break;

		let endTagIndex = lowerHtml.indexOf("</script>", startTagIndex);
		let endTagLength = 9;

		if (endTagIndex === -1) {
			const closeTagPattern = /<\s*\/\s*script\b[^>]*>/gi;
			closeTagPattern.lastIndex = startTagIndex;
			const fallbackMatch = closeTagPattern.exec(lowerHtml);

			if (fallbackMatch) {
				endTagIndex = fallbackMatch.index;
				endTagLength = fallbackMatch[0].length;
			}
		}

		if (endTagIndex === -1) {
			pos = startTagIndex + 7;
			continue;
		}

		const startTagEndIndex = lowerHtml.indexOf(">", startTagIndex);
		if (startTagEndIndex === -1 || startTagEndIndex > endTagIndex) {
			pos = startTagIndex + 7;
			continue;
		}

		const attrs = lowerHtml.slice(startTagIndex + 7, startTagEndIndex);
		// Check for src attribute safely
		const normalizedAttrs = attrs.replace(/\t|\n|\r/g, " ");
		const hasSrc =
			normalizedAttrs.includes(" src=") || normalizedAttrs.startsWith("src=");

		if (!hasSrc) {
			const content = html.slice(startTagEndIndex + 1, endTagIndex);
			if (content.trim().length > 0) {
				hashes.add(hashInlineScript(content));
			}
		}
		pos = endTagIndex + endTagLength;
	}
	return hashes;
};

const main = () => {
	const htmlFiles = walkHtmlFiles(distDir);
	if (htmlFiles.length === 0) {
		console.warn(`No HTML files found in ${distDir}. Skipping CSP update.`);
		return;
	}

	const allHashes = new Set();
	for (const htmlFile of htmlFiles) {
		const html = readFileSync(htmlFile, "utf8");
		const fileHashes = extractHashesFromHtml(html);
		for (const h of fileHashes) {
			allHashes.add(h);
		}
	}

	if (allHashes.size === 0) {
		console.warn("No inline script hashes found in dist HTML files.");
		return;
	}

	if (!existsSync(headersPath)) {
		console.error(`_headers file not found at ${headersPath}`);
		process.exit(1);
	}

	const headersContent = readFileSync(headersPath, "utf8");
	const separator = headersContent.includes("\r\n") ? "\r\n" : "\n";
	const lines = headersContent.split(/\r?\n/);
	let cspLineIndex = -1;

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].trim().toLowerCase().startsWith("content-security-policy:")) {
			cspLineIndex = i;
			break;
		}
	}

	if (cspLineIndex === -1) {
		console.error("Could not find Content-Security-Policy line in _headers.");
		process.exit(1);
	}

	const originalLine = lines[cspLineIndex];
	const colonIndex = originalLine.indexOf(":");
	const prefix = `${originalLine.slice(0, colonIndex + 1).trimEnd()} `;
	const cspValue = originalLine.slice(colonIndex + 1).trim();

	const directives = cspValue
		.split(";")
		.map((d) => d.trim())
		.filter((d) => d.length > 0);

	let scriptSrcIndex = -1;
	for (let i = 0; i < directives.length; i++) {
		const dLower = directives[i].toLowerCase();
		if (dLower === "script-src" || dLower.startsWith("script-src ")) {
			scriptSrcIndex = i;
			break;
		}
	}

	if (scriptSrcIndex === -1) {
		console.error("Could not find script-src directive in CSP.");
		process.exit(1);
	}

	const scriptSrcDirective = directives[scriptSrcIndex];
	const tokens = scriptSrcDirective
		.replace(/\t|\n|\r/g, " ")
		.split(" ")
		.filter((t) => t.length > 0);

	const filteredTokens = tokens.slice(1).filter((token) => {
		const tLower = token.toLowerCase();
		return tLower !== "'unsafe-inline'" && !tLower.startsWith("'sha256-");
	});

	const sortedHashes = Array.from(allHashes).sort();
	const nextTokens = ["script-src", ...filteredTokens, ...sortedHashes];
	directives[scriptSrcIndex] = nextTokens.join(" ");

	const nextCspValue = `${directives.join("; ")};`;
	lines[cspLineIndex] = prefix + nextCspValue;

	writeFileSync(headersPath, lines.join(separator), "utf8");

	console.log(
		`Updated CSP script-src with ${allHashes.size} inline script hash(es) in ${headersPath}`,
	);
};

main();
