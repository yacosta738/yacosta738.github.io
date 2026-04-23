import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const rootDir = resolve(process.cwd());
const distDir = join(rootDir, "dist");
const functionsDir = join(rootDir, "functions");
const outputPath = join(functionsDir, "_csp-hashes.generated.js");

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

const scriptRegex =
	/<script\b([^>]*)>([\s\S]*?)<\/script(?=[\t\n\f\r />])[^>]*>/gi;
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

mkdirSync(functionsDir, { recursive: true });

const sortedHashes = Array.from(hashes).sort((a, b) => a.localeCompare(b));
const hashLines = sortedHashes.map((h) => `  "${h}",`).join("\n");
const fileContent = `// AUTO-GENERATED — do not edit manually. Run \`pnpm --filter=blog csp:hashes\` to regenerate.
export const scriptHashes = [
${hashLines}
];
`;

writeFileSync(outputPath, fileContent, "utf8");

console.log(
	`Found ${hashes.size} inline script hash(es). Written to ${outputPath}`,
);
