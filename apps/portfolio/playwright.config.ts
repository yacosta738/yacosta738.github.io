import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for E2E testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: "tests/e2e",
	testIgnore: [
		"tests/e2e/comments*.spec.ts",
		"tests/e2e/search.spec.ts",
		"tests/e2e/newsletter.spec.ts",
		"tests/e2e/tag-external-articles.spec.ts",
	],

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
		baseURL: process.env.BASE_URL || "http://localhost:4321",
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
		// By default use the dev server. For stable Pagefind-backed tests,
		// set PW_USE_PREVIEW=1 to build and run `astro preview` so the Pagefind
		// index is available (slower but more stable).
		const usePreview = process.env.PW_USE_PREVIEW === "1";
		if (usePreview) {
			// In CI, the build artifact may already exist. Check before rebuilding.
			// If dist/ exists and has content, skip build. Otherwise, build first.
			const buildCommand = process.env.CI
				? "test -d dist && test -f dist/index.html && echo 'Using pre-built artifact' || pnpm build"
				: "pnpm build";

			return {
				command: `${buildCommand} && pnpm preview --port 4321`,
				url: "http://localhost:4321",
				timeout: 600_000,
				reuseExistingServer: false,
				env: { PLAYWRIGHT_TEST: "true" },
				stdout: "pipe",
				stderr: "pipe",
			};
		}

		return {
			command: "pnpm dev --port 4321",
			url: "http://localhost:4321",
			timeout: 180_000,
			reuseExistingServer: true,
			env: { PLAYWRIGHT_TEST: "true" },
			stdout: "ignore",
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
