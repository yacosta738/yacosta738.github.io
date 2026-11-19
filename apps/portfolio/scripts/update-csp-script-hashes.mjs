import { createHash } from "node:crypto";
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const rootDir = resolve(process.cwd());
const distDir = join(rootDir, "dist");
const functionsDir = join(rootDir, "functions");
const outputPath = join(functionsDir, "_csp-hashes.generated.js");

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

const getScriptEnd = (lowerHtml, startTagIndex) => {
	const plainEndTagIndex = lowerHtml.indexOf("</script>", startTagIndex);
	if (plainEndTagIndex !== -1) {
		return {
			endTagIndex: plainEndTagIndex,
			endTagLength: 9,
		};
	}

	const closeTagPattern = /<\s*\/\s*script\b[^>]*>/gi;
	closeTagPattern.lastIndex = startTagIndex;
	const fallbackMatch = closeTagPattern.exec(lowerHtml);
	if (!fallbackMatch) {
		return null;
	}

	return {
		endTagIndex: fallbackMatch.index,
		endTagLength: fallbackMatch[0].length,
	};
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

		const scriptEnd = getScriptEnd(lowerHtml, startTagIndex);
		if (!scriptEnd) {
			pos = startTagIndex + 7;
			continue;
		}

		const { endTagIndex, endTagLength } = scriptEnd;

		const startTagEndIndex = lowerHtml.indexOf(">", startTagIndex);
		if (startTagEndIndex === -1 || startTagEndIndex > endTagIndex) {
			pos = startTagIndex + 7;
			continue;
		}

		const attrs = lowerHtml.slice(startTagIndex + 7, startTagEndIndex);
		// Check for src attribute safely
		const normalizedAttrs = attrs.replaceAll(/[\t\n\r]/g, " ");
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

	mkdirSync(functionsDir, { recursive: true });

	const sortedHashes = Array.from(allHashes).sort((a, b) => a.localeCompare(b));
	const hashLines = sortedHashes.map((h) => `  "${h}",`).join("\n");
	const fileContent = `// AUTO-GENERATED — do not edit manually. Run \`pnpm --filter=portfolio csp:hashes\` to regenerate.
export const scriptHashes = [
${hashLines}
];
`;

	writeFileSync(outputPath, fileContent, "utf8");

	console.log(
		`Found ${allHashes.size} inline script hash(es). Written to ${outputPath}`,
	);
};

main();
