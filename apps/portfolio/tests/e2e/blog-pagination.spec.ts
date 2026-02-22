import { expect, test } from "@playwright/test";
import { selectors } from "../fixtures";

test.describe("Blog Pagination and Navigation", () => {
	test("should display pagination controls on blog page", async ({ page }) => {
		await page.goto("/en/blog");

		// Check if pagination navigation exists
		const paginationNav = page.locator(selectors.blog.paginationNav);
		const hasPagination = (await paginationNav.count()) > 0;

		if (hasPagination) {
			await expect(paginationNav).toBeVisible();
		}

		// Articles should be visible
		const articles = page.locator(selectors.blog.articleTitle);
		await expect(articles.first()).toBeVisible();
	});

	test("should navigate to next page and show different articles", async ({
		page,
	}) => {
		await page.goto("/en/blog");

		// Get first article title
		const firstArticle = page.locator(selectors.blog.articleTitle).first();
		await expect(firstArticle).toBeVisible();
		const firstTitle = await firstArticle.innerText();

		// Check if next button exists
		const nextButton = page.locator(selectors.blog.paginationNext);
		const hasNextPage =
			(await nextButton.isVisible()) &&
			!(await nextButton.evaluate(
				(el: HTMLElement) =>
					el.classList.contains("disabled") ||
					el.classList.contains("cursor-not-allowed"),
			));

		if (hasNextPage) {
			// Click next
			await nextButton.click();
			// Use 'load' instead of 'networkidle' for better CI stability
			// (networkidle may never fire if there are persistent connections)
			await page.waitForLoadState("load", { timeout: 60000 });
			await page.waitForSelector(selectors.blog.articleTitle, {
				timeout: 60000,
			});

			// Verify URL changed - actual format is /en/blog/page/2
			await expect(page).toHaveURL(/\/blog\/page\/\d+/);

			// Get new first article
			const newFirstArticle = page.locator(selectors.blog.articleTitle).first();
			await expect(newFirstArticle).toBeVisible();
			const newFirstTitle = await newFirstArticle.innerText();

			// Titles should be different
			expect(newFirstTitle).not.toBe(firstTitle);
		}
	});

	test("should navigate to specific article and display content", async ({
		page,
	}) => {
		await page.goto("/en/blog");

		// Wait for articles to load
		await page.waitForSelector(selectors.blog.articleTitle);

		// Find article card links more specifically
		// Target links that wrap article titles/cards, not content links
		const articleLink = page
			.locator("article")
			.filter({ has: page.locator(selectors.blog.articleTitle) })
			.locator('a[href*="/blog/"]')
			.first();

		const linkCount = await articleLink.count();

		if (linkCount > 0) {
			// Get the href before clicking to verify it's a valid article link
			const href = await articleLink.getAttribute("href");
			expect(href).toMatch(/\/en\/blog\/.+/);

			// Click without waiting for navigation to complete, preventing timeouts on slow navigations.
			// The subsequent page.waitForURL handles the wait explicitly.
			await articleLink.click({ noWaitAfter: true });
			await page.waitForURL(/\/en\/blog\/.+$/, { timeout: 30000 });

			// Verify we're on an article page — accept deeper paths (for example
			// dated articles like /en/blog/2023/03/23/slug)
			await expect(page).toHaveURL(/\/en\/blog\/.+$/);

			// Article content should be visible
			// Wait for the article heading to appear after navigation and
			// explicitly target the first matched heading to avoid strict
			// mode violations when multiple <h1> elements exist on the page.
			await page.waitForSelector(selectors.blog.articleHeading);
			const articleHeading = page
				.locator(selectors.blog.articleHeading)
				.first();
			await expect(articleHeading).toBeVisible();
		} else {
			// No articles found, skip this test
			console.log("No articles found to navigate to");
		}
	});

	test("should navigate back to first page from paginated page", async ({
		page,
	}) => {
		// Start on page 2 (if it exists)
		await page.goto("/en/blog/2");

		// Check if prev button exists
		const prevButton = page.locator(selectors.blog.paginationPrev);
		const hasPrevPage = await prevButton.isVisible().catch(() => false);

		if (hasPrevPage) {
			await prevButton.click();
			// Use 'load' instead of 'networkidle' for better CI stability
			await page.waitForLoadState("load", { timeout: 60000 });
			await page.waitForSelector(selectors.blog.articleTitle, {
				timeout: 60000,
			});

			// Should be back on page 1
			await expect(page).toHaveURL(/\/en\/blog\/?$/);
		}
	});

	test("should handle direct URL navigation to blog page", async ({ page }) => {
		// Navigate directly to blog
		await page.goto("/en/blog");

		// Page should load successfully
		await expect(page).toHaveURL(/\/en\/blog/);

		// At least one article should be visible
		const articles = page.locator(selectors.blog.articleTitle);
		const count = await articles.count();
		expect(count).toBeGreaterThan(0);
	});

	test("should display consistent layout across pages", async ({ page }) => {
		await page.goto("/en/blog");

		// Check for consistent elements - use role selectors to avoid strict mode violations
		const header = page.getByRole("banner").first();
		const footer = page.getByRole("contentinfo").first();
		const nav = page.getByRole("navigation").first();

		await expect(header).toBeVisible();
		await expect(footer).toBeVisible();
		await expect(nav).toBeVisible();

		// Navigate to another page if possible
		const nextButton = page.locator(selectors.blog.paginationNext);
		const hasNext = await nextButton.isVisible().catch(() => false);

		if (hasNext) {
			await nextButton.click();
			// Use 'load' instead of 'networkidle' for better CI stability
			await page.waitForLoadState("load", { timeout: 60000 });
			await page.waitForSelector(selectors.blog.articleTitle, {
				timeout: 60000,
			});

			// Same elements should still be visible
			await expect(header).toBeVisible();
			await expect(footer).toBeVisible();
			await expect(nav).toBeVisible();
		}
	});

	test("should work on Spanish blog pages", async ({ page }) => {
		await page.goto("/es/blog");

		// Articles should be visible
		const articles = page.locator(selectors.blog.articleTitle);
		await expect(articles.first()).toBeVisible();

		// HTML lang should be Spanish
		await expect(page.locator("html")).toHaveAttribute("lang", "es");
	});

	test("should have accessible pagination controls", async ({ page }) => {
		await page.goto("/en/blog");

		const paginationNav = page.locator(selectors.blog.paginationNav);
		const hasPagination = (await paginationNav.count()) > 0;

		if (hasPagination) {
			// Navigation should be accessible
			// Note: <nav> element has implicit role="navigation", no need to check explicit attribute
			await expect(paginationNav).toBeVisible();

			// Check for aria-label
			const ariaLabel = await paginationNav.getAttribute("aria-label");
			expect(ariaLabel).toBeTruthy();

			// Buttons should be keyboard accessible
			const nextButton = page.locator(selectors.blog.paginationNext);
			if (await nextButton.isVisible()) {
				await nextButton.focus();
				await expect(nextButton).toBeFocused();
			}
		}
	});

	test("should preserve filters/search on pagination (if applicable)", async ({
		page,
	}) => {
		// This test can be expanded if you add filtering/search functionality
		await page.goto("/en/blog");

		// For now, just verify basic navigation
		await expect(page).toHaveURL(/\/en\/blog/);
	});

	test("should handle empty blog page gracefully", async ({ page }) => {
		// Try to navigate to a very high page number
		const response = await page.goto("/en/blog/page/999");
		await page.waitForLoadState("domcontentloaded");

		// Should either redirect or render a not-found/empty state, but not crash
		expect(response).not.toBeNull();
		expect(response?.status()).toBeLessThan(500);
	});
});
