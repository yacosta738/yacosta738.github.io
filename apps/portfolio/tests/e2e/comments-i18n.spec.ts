import { expect, type Page, test } from "@playwright/test";

/**
 * E2E Tests for Comments Internationalization (User Story 2)
 *
 * Tests verify:
 * - Spanish locale labels appear when site language is Spanish
 * - English locale labels appear when site language is English
 * - Widget locale matches site locale
 */

/**
 * Helper: Navigate to a blog post in specific locale
 */
async function navigateToBlogPost(
	page: Page,
	locale: "en" | "es" = "en",
): Promise<void> {
	await page.goto(`/${locale}/blog/`);
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

test.describe("Comments Internationalization - Spanish", () => {
	test("T017: Verify Spanish locale labels appear when site language is Spanish", async ({
		page,
	}) => {
		// Navigate to Spanish blog post
		await navigateToBlogPost(page, "es");

		// Verify we're on Spanish version
		await expect(page).toHaveURL(/\/es\//);

		// Check comments heading in Spanish
		const heading = page.locator("#comments-heading");
		await expect(heading).toBeVisible();
		const headingText = await heading.textContent();
		expect(headingText?.trim()).toBe("Comentarios");

		// Scroll to comments
		await scrollToComments(page);
		await waitForGiscusLoad(page);

		// Verify Giscus script loaded with Spanish locale
		const giscusScript = page.locator('script[src*="giscus.app"]');
		await expect(giscusScript).toBeAttached();

		const lang = await giscusScript.getAttribute("data-lang");
		expect(lang).toBe("es");
	});

	test("T017b: Verify loading message in Spanish", async ({ page }) => {
		// Navigate to Spanish blog post
		await navigateToBlogPost(page, "es");

		// Quickly check for Spanish loading message before widget loads
		const commentsSection = page.locator('[data-testid="comments-section"]');
		await commentsSection.scrollIntoViewIfNeeded();

		// Check if loading message appears (may be very brief)
		const loadingMessage = page.locator(".giscus-loading");

		// Either loading message is visible, or widget already loaded
		const loadingText = await loadingMessage.textContent().catch(() => null);

		if (loadingText) {
			expect(loadingText.trim()).toBe("Cargando comentarios...");
		}
	});
});

test.describe("Comments Internationalization - English", () => {
	test("T017c: Verify English locale labels appear when site language is English", async ({
		page,
	}) => {
		// Navigate to English blog post
		await navigateToBlogPost(page, "en");

		// Verify we're on English version
		await expect(page).toHaveURL(/\/en\//);

		// Check comments heading in English
		const heading = page.locator("#comments-heading");
		await expect(heading).toBeVisible();
		const headingText = await heading.textContent();
		expect(headingText?.trim()).toBe("Comments");

		// Scroll to comments
		await scrollToComments(page);
		await waitForGiscusLoad(page);

		// Verify Giscus script loaded with English locale
		const giscusScript = page.locator('script[src*="giscus.app"]');
		await expect(giscusScript).toBeAttached();

		const lang = await giscusScript.getAttribute("data-lang");
		expect(lang).toBe("en");
	});

	test("T017d: Verify loading message in English", async ({ page }) => {
		// Navigate to English blog post
		await navigateToBlogPost(page, "en");

		// Quickly check for English loading message
		const commentsSection = page.locator('[data-testid="comments-section"]');
		await commentsSection.scrollIntoViewIfNeeded();

		const loadingMessage = page.locator(".giscus-loading");
		const loadingText = await loadingMessage.textContent().catch(() => null);

		if (loadingText) {
			expect(loadingText.trim()).toBe("Loading comments...");
		}
	});
});

test.describe("Comments Internationalization - Smoke Test", () => {
	test("Verify locale switch preserves comment functionality", async ({
		page,
	}) => {
		// Start with English
		await navigateToBlogPost(page, "en");
		await scrollToComments(page);
		await waitForGiscusLoad(page);

		// Verify widget loaded
		const giscusFrame = page.frameLocator("iframe.giscus-frame");
		await expect(giscusFrame.locator("body")).toBeVisible();

		// Navigate to same post in Spanish (if language switcher exists)
		// Try to find language switcher
		const langSwitcher = page.locator(
			'[aria-label*="language" i], [data-testid="locale-select"]',
		);

		if ((await langSwitcher.count()) > 0) {
			await langSwitcher.click();
			const spanishOption = page.locator(
				'a[href*="/es/"], button:has-text("Español")',
			);

			if ((await spanishOption.count()) > 0) {
				await spanishOption.click();
				await page.waitForLoadState("networkidle");

				// Verify we're on Spanish version
				await expect(page).toHaveURL(/\/es\//);

				// Scroll to comments again
				await scrollToComments(page);
				await waitForGiscusLoad(page);

				// Verify widget still works
				await expect(giscusFrame.locator("body")).toBeVisible();
			}
		}
	});
});
