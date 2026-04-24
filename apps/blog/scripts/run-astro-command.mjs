import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getBlogContentPlan } from "./blog-content-plan.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(scriptDir, "..");
const repoRoot = resolve(appDir, "..", "..");
const snapshotPath = resolve(appDir, ".cache", "notion-loader.json");
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

const loadEnvFileIfPresent = (path) => {
	if (!existsSync(path) || typeof process.loadEnvFile !== "function") {
		return;
	}

	process.loadEnvFile(path);
};

const run = (args, env = process.env) =>
	new Promise((resolvePromise, rejectPromise) => {
		const child = spawn(pnpmCommand, args, {
			cwd: appDir,
			stdio: "inherit",
			env,
		});

		child.on("exit", (code) => {
			if (code === 0) {
				resolvePromise();
				return;
			}

			rejectPromise(new Error(`Command failed: pnpm ${args.join(" ")}`));
		});

		child.on("error", rejectPromise);
	});

export const prepareBlogContent = async () => {
	loadEnvFileIfPresent(resolve(repoRoot, ".env"));
	loadEnvFileIfPresent(resolve(appDir, ".env"));

	const plan = getBlogContentPlan({
		snapshotExists: existsSync(snapshotPath),
		notionToken: process.env.NOTION_TOKEN ?? "",
		notionDatabaseId: process.env.NOTION_DATABASE_ID ?? "",
	});

	if (plan.requiresSync) {
		await run(["notion:sync"]);
		await run(["notion:validate"]);
	}

	return plan;
};

const astroCommand = process.argv[2];

if (!astroCommand) {
	throw new Error("Expected an Astro command such as 'check' or 'build'.");
}

const skipValidation = process.argv.includes("--skip-validation");
const plan = await prepareBlogContent();
const astroEnv = {
	...process.env,
	BLOG_CONTENT_SOURCE: plan.astroMode,
	PLAYWRIGHT_TEST: process.env.PLAYWRIGHT_TEST ?? "false",
};

if (!skipValidation && astroCommand === "build") {
	await run(["exec", "astro", "check"], astroEnv);
}

await run(["exec", "astro", astroCommand], astroEnv);
