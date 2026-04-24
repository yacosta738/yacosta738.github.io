import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(scriptDir, "..");
const repoRoot = resolve(appDir, "..", "..");

const loadEnvFileIfPresent = (path) => {
	if (!existsSync(path)) {
		return;
	}

	const fileContents = readFileSync(path, "utf8");
	for (const rawLine of fileContents.split(/\r?\n/u)) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) {
			continue;
		}

		const separatorIndex = line.indexOf("=");
		if (separatorIndex === -1) {
			continue;
		}

		const key = line.slice(0, separatorIndex).trim();
		const rawValue = line.slice(separatorIndex + 1).trim();
		const quotedValue = rawValue.replace(/^(["'])(.*)\1$/u, "$2");
		if (!process.env[key]) {
			process.env[key] = quotedValue;
		}
	}
};

loadEnvFileIfPresent(resolve(repoRoot, ".env"));
loadEnvFileIfPresent(resolve(appDir, ".env"));

process.env.BLOG_CONTENT_SOURCE = "live";

const child = spawn("pnpm", ["exec", "astro", "sync"], {
	stdio: "inherit",
	env: process.env,
});

child.on("exit", (code) => {
	process.exit(code ?? 1);
});

child.on("error", (error) => {
	console.error("[notion:sync] failed to start astro sync", error);
	process.exit(1);
});
