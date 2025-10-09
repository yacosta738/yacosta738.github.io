import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for E2E testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: "tests/e2e",

	// Test execution settings
	timeout: 30_000,
	expect: { timeout: 5_000 },
	fullyParallel: true,

	// Retry on CI for flake resistance
	retries: process.env.CI ? 2 : 0,

	// Only fail if more than 10% of tests are flaky
	reportSlowTests: { max: 5, threshold: 60_000 },

	// Limit parallel workers on CI to avoid resource exhaustion
	workers: process.env.CI ? 2 : undefined,

	// Reporting configuration
	reporter: process.env.CI
		? [
				["dot"],
				["html", { open: "never", outputFolder: "playwright-report" }],
				["json", { outputFile: "playwright-report/results.json" }],
			]
		: [["list"], ["html", { open: "on-failure" }]],

	// Global configuration for all tests
	use: {
		baseURL: process.env.BASE_URL || "http://localhost:4321",

		// Capture traces, screenshots, and videos on failure
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
		video: "retain-on-failure",

		// Standard viewport for desktop tests
		viewport: { width: 1280, height: 720 },

		// Respect user preferences
		colorScheme: "light",

		// Browser context options
		ignoreHTTPSErrors: true,

		// Action timeout
		actionTimeout: 10_000,
	},

	// Development server configuration - auto-start on test run
	webServer: {
		command: "pnpm dev",
		url: "http://localhost:4321",
		timeout: 120_000,
		reuseExistingServer: !process.env.CI,
		stdout: "ignore",
		stderr: "pipe",
	},

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
			use: { ...devices["Desktop Safari"] },
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
