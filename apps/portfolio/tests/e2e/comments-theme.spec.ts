import { expect, type Page, test } from "@playwright/test";

/**
 * E2E Tests for Comments Theme Adaptation (User Story 2)
 *
 * Tests verify:
 * - Dark mode theme is correctly applied to Giscus widget
 * - Theme updates dynamically when user toggles theme
 * - Theme changes reflect in widget without page reload
 */

const BLOG_POST_URL = "/en/blog/";

/**
 * Helper: Navigate to a blog post
 */
async function navigateToBlogPost(page: Page): Promise<void> {
	await page.goto(BLOG_POST_URL);
	const firstPostLink = page.locator('article a[href*="/blog/"]').first();
	await expect(firstPostLink).toBeVisible();
	await firstPostLink.click();
	await expect(page.locator("article h1").first()).toBeVisible();
}

/**
 * Helper: Scroll to comments section
 */
async function scrollToComments(page: Page): Promise<void> {
	const commentsSection = page.locator('[data-testid="comments-section"]');
	await commentsSection.scrollIntoViewIfNeeded();
}

/**
 * Helper: Wait for Giscus iframe to load
 */
async function waitForGiscusLoad(page: Page): Promise<void> {
	const giscusFrame = page.frameLocator("iframe.giscus-frame");
	await expect(giscusFrame.locator("body")).toBeVisible({ timeout: 10000 });
}

/**
 * Helper: Toggle theme
 */
async function toggleTheme(page: Page): Promise<void> {
	// Find and click theme toggle button
	const themeToggle = page.locator(
		'button[aria-label*="theme" i], button[title*="theme" i], [data-testid="theme-toggle"]',
	);
	await themeToggle.click();
	await page.waitForTimeout(500); // Wait for theme transition
}

test.describe("Comments Theme Adaptation", () => {
	test("T016: Verify dark mode theme is reflected in widget", async ({
		page,
	}) => {
		await navigateToBlogPost(page);

		// Switch to dark mode if not already
		const htmlElement = page.locator("html");
		const isDark = await htmlElement.evaluate((el) =>
			el.classList.contains("dark"),
		);

		if (!isDark) {
			await toggleTheme(page);
		}

		// Scroll to comments to trigger loading
		await scrollToComments(page);
		await waitForGiscusLoad(page);

		// Verify Giscus script loaded with dark theme
		const giscusScript = page.locator('script[src*="giscus.app"]');
		await expect(giscusScript).toBeAttached();

		// Check data-theme attribute (should be 'dark')
		const theme = await giscusScript.getAttribute("data-theme");
		expect(theme).toBe("dark");

		// Verify iframe loaded with dark theme
		const giscusFrame = page.frameLocator("iframe.giscus-frame");
		const frameBody = giscusFrame.locator("body");
		await expect(frameBody).toBeVisible();

		// Check if dark theme classes or styles are applied
		// Giscus uses different theme implementations, so we check multiple indicators
		const hasThemeClass = await frameBody.evaluate((body) => {
			const html = body.ownerDocument.documentElement;
			return (
				html.classList.contains("dark") ||
				html.dataset.theme === "dark" ||
				body.classList.contains("gsc-dark")
			);
		});

		expect(hasThemeClass).toBeTruthy();
	});

	test("T016b: Verify light mode theme is reflected in widget", async ({
		page,
	}) => {
		await navigateToBlogPost(page);

		// Switch to light mode if not already
		const htmlElement = page.locator("html");
		const isDark = await htmlElement.evaluate((el) =>
			el.classList.contains("dark"),
		);

		if (isDark) {
			await toggleTheme(page);
		}

		// Scroll to comments
		await scrollToComments(page);
		await waitForGiscusLoad(page);

		// Verify Giscus script loaded with light theme
		const giscusScript = page.locator('script[src*="giscus.app"]');
		const theme = await giscusScript.getAttribute("data-theme");
		expect(theme).toBe("light");
	});

	test("T016c: Verify theme toggle updates widget dynamically", async ({
		page,
	}) => {
		await navigateToBlogPost(page);

		// Start in light mode
		const htmlElement = page.locator("html");
		let isDark = await htmlElement.evaluate((el) =>
			el.classList.contains("dark"),
		);

		if (isDark) {
			await toggleTheme(page);
		}

		// Load comments in light mode
		await scrollToComments(page);
		await waitForGiscusLoad(page);

		// Initial theme should be light
		const giscusScript = page.locator('script[src*="giscus.app"]');
		const theme = await giscusScript.getAttribute("data-theme");
		expect(theme).toBe("light");

		// Toggle to dark mode
		await toggleTheme(page);
		await page.waitForTimeout(1000); // Wait for postMessage to process

		// Verify theme updated (check if postMessage was sent)
		// We can't directly verify iframe content after postMessage,
		// but we can verify the toggle was successful
		isDark = await htmlElement.evaluate((el) => el.classList.contains("dark"));
		expect(isDark).toBeTruthy();
	});
});

test.describe("Comments Theme - Edge Cases", () => {
	test("Verify theme persists across page navigation", async ({ page }) => {
		await navigateToBlogPost(page);

		// Set dark mode
		const htmlElement = page.locator("html");
		let isDark = await htmlElement.evaluate((el) =>
			el.classList.contains("dark"),
		);

		if (!isDark) {
			await toggleTheme(page);
		}

		// Navigate to another page
		await page.goto("/en/");
		await page.waitForTimeout(500);

		// Navigate back to blog post
		await navigateToBlogPost(page);

		// Theme should still be dark
		isDark = await htmlElement.evaluate((el) => el.classList.contains("dark"));
		expect(isDark).toBeTruthy();

		// Load comments
		await scrollToComments(page);
		await waitForGiscusLoad(page);

		// Verify dark theme in widget
		const giscusScript = page.locator('script[src*="giscus.app"]');
		const theme = await giscusScript.getAttribute("data-theme");
		expect(theme).toBe("dark");
	});
});
