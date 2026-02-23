import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const rootDir = resolve(process.cwd());
const distDir = join(rootDir, "dist");
const headersPath = join(rootDir, "public", "_headers");

const walkHtmlFiles = (dir) => {
	const entries = readdirSync(dir);
	const htmlFiles = [];

	for (const entry of entries) {
		const absolutePath = join(dir, entry);
		const stats = statSync(absolutePath);
		if (stats.isDirectory()) {
			htmlFiles.push(...walkHtmlFiles(absolutePath));
			continue;
		}
		if (entry.endsWith(".html")) {
			htmlFiles.push(absolutePath);
		}
	}

	return htmlFiles;
};

const hashInlineScript = (scriptContent) => {
	const hash = createHash("sha256")
		.update(scriptContent, "utf8")
		.digest("base64");
	return `'sha256-${hash}'`;
};

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script\b[^>]*>/gi;
const srcRegex = /\bsrc\s*=/i;

const hashes = new Set();
for (const htmlFile of walkHtmlFiles(distDir)) {
	const html = readFileSync(htmlFile, "utf8");
	const matches = html.matchAll(scriptRegex);
	for (const match of matches) {
		const attrs = match[1] || "";
		const content = match[2] || "";
		if (!srcRegex.test(attrs) && content.trim().length > 0) {
			hashes.add(hashInlineScript(content));
		}
	}
}

if (hashes.size === 0) {
	throw new Error("No inline script hashes found in dist HTML files.");
}

const headersContent = readFileSync(headersPath, "utf8");
const cspLineRegex = /(Content-Security-Policy:\s*)([^\r\n]*)/i;
const cspLineMatch = headersContent.match(cspLineRegex);
if (!cspLineMatch) {
	throw new Error(
		"Could not find Content-Security-Policy line in public/_headers.",
	);
}

const cspValue = cspLineMatch[2];
const scriptSrcRegex = /script-src\s+([^\s;](?:[^;]*[^\s;])?)\s*(?:;|$)/i;
const scriptSrcMatch = cspValue.match(scriptSrcRegex);
if (!scriptSrcMatch) {
	throw new Error("Could not find script-src directive in CSP.");
}

const existingTokens = scriptSrcMatch[1]
	.split(/\s+/)
	.map((token) => token.trim())
	.filter(Boolean)
	.filter(
		(token) => token !== "'unsafe-inline'" && !token.startsWith("'sha256-"),
	);

const nextTokens = [...existingTokens, ...Array.from(hashes).sort()];
const nextScriptSrc = `script-src ${nextTokens.join(" ")};`;
const nextCspValue = cspValue.replace(scriptSrcRegex, nextScriptSrc);
const nextHeaders = headersContent.replace(cspLineRegex, `$1${nextCspValue}`);

writeFileSync(headersPath, nextHeaders, "utf8");

console.log(
	`Updated CSP script-src with ${hashes.size} inline script hash(es) in ${headersPath}`,
);
