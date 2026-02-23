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
	if (!existsSync(dir)) {
		return [];
	}
	const entries = readdirSync(dir);
	const htmlFiles = [];

	for (const entry of entries) {
		const absolutePath = join(dir, entry);
		const stats = statSync(absolutePath);
		if (stats.isDirectory()) {
			htmlFiles.push(...walkHtmlFiles(absolutePath));
		} else if (entry.endsWith(".html")) {
			htmlFiles.push(absolutePath);
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

// Safer script tag detection
// Avoids catastrophic backtracking by using non-greedy match and limiting scope
const scriptRegex = /<script(?:\s+([^>]*))?>([\s\S]*?)<\/script\s*>/gi;
const srcRegex = /\bsrc\s*=/i;

const hashes = new Set();
const htmlFiles = walkHtmlFiles(distDir);

if (htmlFiles.length === 0) {
	console.warn(`No HTML files found in ${distDir}. Skipping CSP update.`);
	process.exit(0);
}

for (const htmlFile of htmlFiles) {
	const html = readFileSync(htmlFile, "utf8");
	const matches = html.matchAll(scriptRegex);
	for (const match of matches) {
		const attrs = match[1] || "";
		const content = match[2] || "";
		// Only hash inline scripts that are not empty
		if (!srcRegex.test(attrs) && content.trim().length > 0) {
			hashes.add(hashInlineScript(content));
		}
	}
}

if (hashes.size === 0) {
	console.warn("No inline script hashes found in dist HTML files.");
	process.exit(0);
}

const headersContent = readFileSync(headersPath, "utf8");

// Parse _headers line by line to find CSP
const lines = headersContent.split(/\r?\n/);
const cspLineIndex = lines.findIndex((line) =>
	line.trim().toLowerCase().startsWith("content-security-policy:"),
);

if (cspLineIndex === -1) {
	throw new Error(
		"Could not find Content-Security-Policy line in public/_headers.",
	);
}

const originalLine = lines[cspLineIndex];
const colonIndex = originalLine.indexOf(":");
if (colonIndex === -1) {
	throw new Error(
		"Invalid Content-Security-Policy line format (missing colon).",
	);
}

const prefix = `${originalLine.slice(0, colonIndex + 1).trimEnd()} `;
const cspValue = originalLine.slice(colonIndex + 1).trim();

// Parse CSP directives
const directives = cspValue
	.split(";")
	.map((d) => d.trim())
	.filter(Boolean);

const scriptSrcIndex = directives.findIndex(
	(d) =>
		d.toLowerCase() === "script-src" ||
		d.toLowerCase().startsWith("script-src "),
);

if (scriptSrcIndex === -1) {
	throw new Error("Could not find script-src directive in CSP.");
}

const scriptSrcDirective = directives[scriptSrcIndex];
const tokens = scriptSrcDirective.split(/\s+/);
// Keep everything that is not 'unsafe-inline' or a previous hash
const existingTokens = tokens
	.slice(1)
	.filter(
		(token) =>
			token !== "'unsafe-inline'" &&
			!token.startsWith("'sha256-") &&
			token.length > 0,
	);

const nextTokens = [
	"script-src",
	...existingTokens,
	...Array.from(hashes).sort(),
];
directives[scriptSrcIndex] = nextTokens.join(" ");

const nextCspValue = `${directives.join("; ")};`;
lines[cspLineIndex] = prefix + nextCspValue;
const nextHeaders = lines.join("\n");

writeFileSync(headersPath, nextHeaders, "utf8");

console.log(
	`Updated CSP script-src with ${hashes.size} inline script hash(es) in ${headersPath}`,
);
