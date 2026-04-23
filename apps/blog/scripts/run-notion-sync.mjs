import { spawn } from "node:child_process";

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
