import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const e2ePort = Number.parseInt(process.env.E2E_PORT ?? "", 10) || 4322;
const appDir = fileURLToPath(new URL(".", import.meta.url));

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
		baseURL: `http://localhost:${e2ePort}`,
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
		const buildCommand = process.env.CI
			? "test -d dist && test -f dist/index.html && test -f dist/pagefind/pagefind-ui.css && test -f dist/pagefind/pagefind-ui.js && echo 'Using pre-built artifact' || pnpm build"
			: "pnpm build";

		return {
			command: `${buildCommand} && pnpm exec astro preview --port ${e2ePort} --strictPort`,
			url: `http://localhost:${e2ePort}`,
			cwd: appDir,
			timeout: 600_000,
			// CI runs expect a fresh preview server. For local parallel runs,
			// set E2E_PORT per run or flip reuseExistingServer to true.
			reuseExistingServer: false,
			env: { PLAYWRIGHT_TEST: "true" },
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
