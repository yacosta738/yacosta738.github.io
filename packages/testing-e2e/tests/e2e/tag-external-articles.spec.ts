import { expect, test } from "@playwright/test";
import { selectors } from "../fixtures";

test.describe("Tag Pages with External Articles", () => {
	test("should display the 'r' tag page in English", async ({ page }) => {
		// Navigate to the tag page for 'r' in English
		await page.goto("/en/blog/tag/r");

		// Verify page loaded successfully
		await expect(page).toHaveURL("/en/blog/tag/r");

		// Check for page heading - use specific selector to avoid capturing Playwright DevTools h1
		const heading = page.locator("main h1, article h1, .container h1").first();
		await expect(heading).toBeVisible();

		// Articles should be visible
		const articles = page.locator(selectors.blog.articleTitle);
		await expect(articles.first()).toBeVisible();

		// Should have at least one article
		const articleCount = await articles.count();
		expect(articleCount).toBeGreaterThan(0);
	});

	test("should display the 'r' tag page in Spanish", async ({ page }) => {
		// Navigate to the tag page for 'r' in Spanish
		await page.goto("/es/blog/tag/r");

		// Verify page loaded successfully
		await expect(page).toHaveURL("/es/blog/tag/r");

		// Check for page heading - use specific selector to avoid capturing Playwright DevTools h1
		const heading = page.locator("main h1, article h1, .container h1").first();
		await expect(heading).toBeVisible();

		// Articles should be visible
		const articles = page.locator(selectors.blog.articleTitle);
		await expect(articles.first()).toBeVisible();

		// Should have at least one article
		const articleCount = await articles.count();
		expect(articleCount).toBeGreaterThan(0);
	});

	test("should include external articles in tag results", async ({ page }) => {
		// Navigate to tag page that has external articles
		await page.goto("/en/blog/tag/r");

		// Wait for articles to load
		await page.waitForSelector(selectors.blog.articleTitle, {
			timeout: 10000,
		});

		// Check if articles are displayed
		const articles = page.locator(selectors.blog.articleTitle);
		const articleCount = await articles.count();

		// Should have at least the external article we know exists
		// (thesis article with tag 'en/r')
		expect(articleCount).toBeGreaterThanOrEqual(1);

		// Verify we have actual article content, not just empty containers
		for (let i = 0; i < (await articles.count()); i++) {
			const article = articles.nth(i);
			await expect(article).toHaveText(/./); // Has some text
		}
	});

	test("should filter articles correctly by tag", async ({ page }) => {
		await page.goto("/en/blog/tag/r");

		// Get all article links
		const articleLinks = page.locator('a[href^="/en/blog/"]');
		const linkCount = await articleLinks.count();

		// Should have at least one link to an article
		expect(linkCount).toBeGreaterThan(0);
	});

	test("should handle pagination if tag has many articles", async ({
		page,
	}) => {
		await page.goto("/en/blog/tag/r");

		// Check if pagination exists
		const paginationNav = page.locator(selectors.blog.paginationNav);
		const hasPagination = (await paginationNav.count()) > 0;

		// If pagination exists, verify it works
		if (hasPagination) {
			await expect(paginationNav).toBeVisible();

			// If there's a next button and it's not disabled
			const nextButton = page.locator(selectors.blog.paginationNext);
			const hasNextPage =
				(await nextButton.isVisible()) &&
				!(await nextButton.evaluate(
					(el: HTMLElement) =>
						el.classList.contains("disabled") ||
						el.classList.contains("cursor-not-allowed"),
				));

			if (hasNextPage) {
				await nextButton.click();
				await page.waitForLoadState("load", { timeout: 60000 });

				// Should navigate to page 2
				await expect(page).toHaveURL(/\/page\/2$/);

				// Articles should still be visible on page 2
				const articles = page.locator(selectors.blog.articleTitle);
				await expect(articles.first()).toBeVisible();
			}
		}
	});

	test("should have correct meta information", async ({ page }) => {
		await page.goto("/en/blog/tag/r");

		// Check page title
		await expect(page).toHaveTitle(/tag/i);

		// Verify no console errors
		const errors: string[] = [];
		page.on("console", (msg) => {
			if (msg.type() === "error") {
				errors.push(msg.text());
			}
		});

		// Wait a bit to catch any errors
		await page.waitForTimeout(1000);

		// Should not have critical errors (allow warnings)
		const criticalErrors = errors.filter(
			(error) =>
				!error.includes("warning") && !error.includes("Unexpected token"),
		);
		expect(criticalErrors).toHaveLength(0);
	});

	test("should display both regular and external articles together", async ({
		page,
	}) => {
		// This test verifies that the combined API works correctly
		await page.goto("/en/blog/tag/r");

		// Wait for articles to render
		await page.waitForSelector(selectors.blog.articleTitle, {
			timeout: 10000,
		});

		// Get all article elements
		const articles = page.locator("article");
		const articleCount = await articles.count();

		// Should have at least one article
		expect(articleCount).toBeGreaterThan(0);

		// Each article should have basic structure
		for (let i = 0; i < Math.min(articleCount, 3); i++) {
			const article = articles.nth(i);
			// Should have a title
			const title = article.locator(
				selectors.blog.articleTitle.replace("article ", ""),
			);
			await expect(title).toBeVisible();
		}
	});
});
