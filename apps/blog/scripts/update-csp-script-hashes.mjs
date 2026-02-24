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

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const srcRegex = /\bsrc\s*=/i;

const hashes = new Set();
for (const htmlFile of walkHtmlFiles(distDir)) {
	const html = readFileSync(htmlFile, "utf8");
	let match = scriptRegex.exec(html);
	while (match) {
		const attrs = match[1] || "";
		const content = match[2] || "";
		if (!srcRegex.test(attrs) && content.trim().length > 0) {
			hashes.add(hashInlineScript(content));
		}
		match = scriptRegex.exec(html);
	}
}

if (hashes.size === 0) {
	throw new Error("No inline script hashes found in dist HTML files.");
}

const headersContent = readFileSync(headersPath, "utf8");
const headersLines = headersContent.split(/\r?\n/);
const cspLinePrefix = "Content-Security-Policy:";
const cspLineIndex = headersLines.findIndex((line) =>
	line.trimStart().startsWith(cspLinePrefix),
);

if (cspLineIndex === -1) {
	throw new Error(
		"Could not find Content-Security-Policy line in public/_headers.",
	);
}

const cspLine = headersLines[cspLineIndex];
const cspPrefixIndex = cspLine.indexOf(cspLinePrefix);
const cspValue = cspLine.slice(cspPrefixIndex + cspLinePrefix.length).trim();

const directives = cspValue
	.split(";")
	.map((directive) => directive.trim())
	.filter(Boolean);

const scriptSrcIndex = directives.findIndex((directive) =>
	directive.startsWith("script-src "),
);

if (scriptSrcIndex === -1) {
	throw new Error("Could not find script-src directive in CSP.");
}

const scriptSrcValue = directives[scriptSrcIndex].slice("script-src ".length);

const existingTokens = scriptSrcValue
	.split(/\s+/)
	.map((token) => token.trim())
	.filter(Boolean)
	.filter(
		(token) => token !== "'unsafe-inline'" && !token.startsWith("'sha256-"),
	);

const nextTokens = [
	...existingTokens,
	...Array.from(hashes).sort((a, b) => a.localeCompare(b)),
];
directives[scriptSrcIndex] = `script-src ${nextTokens.join(" ")}`;

const nextCspValue = `${directives.join("; ")};`;
headersLines[cspLineIndex] =
	`${cspLine.slice(0, cspPrefixIndex + cspLinePrefix.length)} ${nextCspValue}`;
const nextHeaders = headersLines.join("\n");

writeFileSync(headersPath, nextHeaders, "utf8");

console.log(
	`Updated CSP script-src with ${hashes.size} inline script hash(es) in ${headersPath}`,
);
