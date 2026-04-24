import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getBlogContentPlan } from "./blog-content-plan.mjs";

const currentFilePath = fileURLToPath(import.meta.url);
const scriptDir = dirname(currentFilePath);
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

const isDirectInvocation =
	process.argv[1] && resolve(process.argv[1]) === currentFilePath;

if (isDirectInvocation) {
	const rawAstroArgs = process.argv.slice(2);
	const skipValidation = rawAstroArgs.includes("--skip-validation");
	const astroArgs = rawAstroArgs.filter((arg) => arg !== "--skip-validation");
	const astroCommand = astroArgs[0];

	if (!astroCommand) {
		throw new Error("Expected an Astro command such as 'check' or 'build'.");
	}

	const plan = await prepareBlogContent();
	const astroEnv = {
		...process.env,
		BLOG_CONTENT_SOURCE: plan.astroMode,
		PLAYWRIGHT_TEST: process.env.PLAYWRIGHT_TEST ?? "false",
	};

	if (!skipValidation && astroCommand === "build") {
		await run(["exec", "astro", "check"], astroEnv);
	}

	await run(["exec", "astro", ...astroArgs], astroEnv);
}
