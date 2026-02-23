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

// Simplified script regex to avoid ReDoS
const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
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
const prefix = originalLine.slice(0, colonIndex + 1).trimEnd() + " ";
const cspValue = originalLine.slice(colonIndex + 1).trim();

// Parse CSP directives
const directives = cspValue.split(";").map((d) => d.trim()).filter(Boolean);
const scriptSrcIndex = directives.findIndex((d) =>
	d.toLowerCase().startsWith("script-src "),
);

if (scriptSrcIndex === -1) {
	throw new Error("Could not find script-src directive in CSP.");
}

const scriptSrcDirective = directives[scriptSrcIndex];
const existingTokens = scriptSrcDirective
	.split(/\s+/)
	.slice(1) // Skip "script-src"
	.filter(
		(token) =>
			token !== "'unsafe-inline'" &&
			!token.startsWith("'sha256-") &&
			token.length > 0,
	);

const nextTokens = ["script-src", ...existingTokens, ...Array.from(hashes).sort()];
directives[scriptSrcIndex] = nextTokens.join(" ");

const nextCspValue = directives.join("; ") + ";";
lines[cspLineIndex] = prefix + nextCspValue;
const nextHeaders = lines.join("\n");

writeFileSync(headersPath, nextHeaders, "utf8");

console.log(
	`Updated CSP script-src with ${hashes.size} inline script hash(es) in ${headersPath}`,
);
