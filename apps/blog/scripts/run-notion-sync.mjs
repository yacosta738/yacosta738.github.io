import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(scriptDir, "..");
const repoRoot = resolve(appDir, "..", "..");

const loadEnvFileIfPresent = (path) => {
	if (!existsSync(path) || typeof process.loadEnvFile !== "function") {
		return;
	}

	process.loadEnvFile(path);
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
