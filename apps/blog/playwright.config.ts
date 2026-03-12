import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const appDir = fileURLToPath(new URL(".", import.meta.url));
const uniqueSuffix = process.env.E2E_RUN_ID ?? String(process.pid);
const explicitHost = process.env.E2E_HOST;
const explicitName = process.env.E2E_PORTLESS_NAME;
const inferredNameFromHost = explicitHost?.endsWith(".localhost")
	? explicitHost.replace(/\.localhost$/, "")
	: undefined;
const portlessName =
	explicitName ?? inferredNameFromHost ?? `blog-${uniqueSuffix}`;
const portlessHost = explicitHost ?? `${portlessName}.localhost`;
const portlessPortRaw = process.env.PORTLESS_PORT ?? "1355";
const portlessPort = Number.parseInt(portlessPortRaw, 10);
const resolvedPortlessPort = Number.isNaN(portlessPort) ? 1355 : portlessPort;
const portlessStateDir =
	process.env.PORTLESS_STATE_DIR ?? path.join(os.homedir(), ".portless");
const portlessCaPath = path.join(portlessStateDir, "ca.pem");
const usePortless = (process.env.PW_USE_PORTLESS ?? "1") !== "0";
const previewPortRaw = process.env.E2E_PREVIEW_PORT ?? "4321";
const previewPort = Number.parseInt(previewPortRaw, 10);
const resolvedPreviewPort = Number.isNaN(previewPort) ? 4321 : previewPort;
const baseURL =
	process.env.E2E_BASE_URL ??
	(usePortless
		? `https://${portlessHost}:${resolvedPortlessPort}`
		: `http://127.0.0.1:${resolvedPreviewPort}`);

if (usePortless && fs.existsSync(portlessCaPath)) {
	if (!process.env.NODE_EXTRA_CA_CERTS) {
		process.env.NODE_EXTRA_CA_CERTS = portlessCaPath;
	}
	const systemCaOption = "--use-system-ca";
	const nodeOptions = process.env.NODE_OPTIONS ?? "";
	if (!nodeOptions.includes(systemCaOption)) {
		process.env.NODE_OPTIONS = nodeOptions
			? `${nodeOptions} ${systemCaOption}`
			: systemCaOption;
	}
}

const reuseExistingServer =
	process.env.E2E_REUSE_SERVER === "1" || !process.env.CI;

/**
 * Playwright configuration for E2E testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: "../../packages/testing-e2e/tests/e2e",
	testIgnore: ["**/contact-form.spec.ts"],

	// Test execution settings
	timeout: 120_000, // Increased timeout for webkit stability
	expect: { timeout: 10_000 },
	fullyParallel: true,

	// Retry on CI and locally for webkit flake resistance
	retries: process.env.CI ? 2 : 1,
	failOnFlakyTests: Boolean(process.env.CI),

	// Report up to 5 tests that exceed the duration threshold of 60_000 ms.
	reportSlowTests: { max: 5, threshold: 60_000 },

	// Limit parallel workers on CI to avoid resource exhaustion
	workers: process.env.CI ? 2 : undefined,

	// Reporting configuration
	reporter: process.env.CI
		? [
				["dot"],
				["html", { open: "never", outputFolder: "playwright-report" }],
				["json", { outputFile: "playwright-report/results.json" }],
				["junit", { outputFile: "playwright-report/results.xml" }],
			]
		: [["list"], ["html", { open: "on-failure" }]],

	// Global configuration for all tests
	use: {
		baseURL,
		trace: "on-first-retry",
		screenshot: "on-first-failure",
		video: "on-first-retry",
		viewport: { width: 1280, height: 720 },
		colorScheme: "light",
		ignoreHTTPSErrors: true,
		actionTimeout: 15_000,
		navigationTimeout: 30_000,
	},

	// Development server configuration - auto-start on test run
	webServer: (() => {
		// Always use preview so Pagefind assets are available for search tests.
		// In CI, the build artifact may already exist. Check before rebuilding.
		const buildCommand =
			process.env.E2E_PREBUILT === "1"
				? "echo 'Using pre-built artifact'"
				: process.env.CI
					? "test -d dist && test -f dist/index.html && test -f dist/pagefind/pagefind-ui.css && test -f dist/pagefind/pagefind-ui.js && echo 'Using pre-built artifact' || pnpm build"
					: "pnpm build";
		const baseEnv: Record<string, string> = { PLAYWRIGHT_TEST: "true" };
		if (usePortless) {
			baseEnv.PORTLESS_HTTPS = "1";
		}
		const previewCommand = usePortless
			? `${buildCommand} && portless --name ${portlessName} astro preview`
			: `${buildCommand} && pnpm exec astro preview --host 127.0.0.1 --port ${resolvedPreviewPort}`;

		return {
			command: previewCommand,
			url: baseURL,
			cwd: appDir,
			timeout: 900_000,
			// CI runs expect a fresh preview server. For local parallel runs,
			// set E2E_HOST per run or flip reuseExistingServer to true.
			reuseExistingServer,
			env: baseEnv,
			stdout: "pipe",
			stderr: "pipe",
		};
	})(),

	// Browser projects - test across all major browsers
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
				// Webkit-specific settings for stability
				launchOptions: {
					slowMo: 50, // Slow down operations slightly for webkit
				},
			},
		},

		// Mobile viewports for responsive testing
		{
			name: "mobile-chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "mobile-safari",
			use: { ...devices["iPhone 13"] },
		},
	],
});
