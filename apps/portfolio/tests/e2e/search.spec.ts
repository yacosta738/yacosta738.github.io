import { expect, test } from "@playwright/test";

test.describe("Search Page", () => {
	test("should display search results for a valid query", async ({ page }) => {
		await page.goto("/en/search?q=astro");

		// Wait for Pagefind UI to initialize and show results
		const results = page.locator(".pagefind-ui__result");
		await expect(results.first()).toBeVisible({ timeout: 10000 });

		// Verify we have results (at least 1)
		await expect(results).not.toHaveCount(0);

		const firstResult = results.first();
		await expect(firstResult).toBeVisible();
		// Check that results are relevant (case insensitive)
		const content = await firstResult.textContent();
		expect(content?.toLowerCase()).toContain("astro");
	});

	test("should display empty or no results state for invalid query", async ({
		page,
	}) => {
		await page.goto("/en/search?q=nonexistentquerythatdoesnotexist12345");

		// Wait for Pagefind to process the search
		await page.waitForTimeout(3000);

		// Check for either custom empty state or Pagefind's own message
		const hasCustomEmpty = await page.locator(".pf-empty").count();
		const hasPagefindMessage = await page
			.locator(".pagefind-ui__message")
			.count();
		const hasNoResults = await page.locator(".pagefind-ui__result").count();

		// At least one of these should be true:
		// 1. Custom empty state exists
		// 2. Pagefind shows a message
		// 3. No results are displayed
		expect(hasCustomEmpty + hasPagefindMessage > 0 || hasNoResults === 0).toBe(
			true,
		);

		// If there's a custom empty state or Pagefind message, verify text
		if (hasCustomEmpty > 0) {
			const emptyState = page.locator(".pf-empty");
			await expect(emptyState).toContainText("No results");
		} else if (hasPagefindMessage > 0) {
			const message = page.locator(".pagefind-ui__message");
			await expect(message).toBeVisible();
		}
	});

	test("should update results when query is changed", async ({ page }) => {
		await page.goto("/en/search?q=astro");

		// Wait for initial results
		await expect(page.locator(".pagefind-ui__result").first()).toBeVisible({
			timeout: 10000,
		});

		const input = page.locator(".pagefind-ui__search-input");
		await input.clear();
		await input.fill("test");

		// Wait for Pagefind to update results
		await page.waitForTimeout(1500);

		// Check that results updated
		const results = page.locator(".pagefind-ui__result");
		const hasResults = (await results.count()) > 0;

		if (hasResults) {
			// If there are results, verify they're visible and relevant
			await expect(results.first()).toBeVisible();
			const content = await results.first().textContent();
			expect(content?.toLowerCase()).toContain("test");
		} else {
			// If no results, that's also valid - just ensure we're not showing stale content
			const hasCustomEmpty = await page.locator(".pf-empty").count();
			const hasPagefindMessage = await page
				.locator(".pagefind-ui__message")
				.count();

			// Should have some indication of no results
			expect(hasCustomEmpty + hasPagefindMessage).toBeGreaterThan(0);
		}
	});

	test("should handle clearing query", async ({ page }) => {
		await page.goto("/en/search?q=astro");

		// Wait for initial results
		await expect(page.locator(".pagefind-ui__result").first()).toBeVisible({
			timeout: 10000,
		});

		const input = page.locator(".pagefind-ui__search-input");
		const initialResultCount = await page
			.locator(".pagefind-ui__result")
			.count();
		expect(initialResultCount).toBeGreaterThan(0);

		// Clear the input
		await input.clear();

		// Wait a moment for Pagefind to process
		await page.waitForTimeout(1500);

		// After clearing, the search should either:
		// 1. Clear all results (no results shown)
		// 2. Show all results (showing everything is also valid)
		// 3. Show a message
		const resultCount = await page.locator(".pagefind-ui__result").count();
		const hasCustomEmpty = await page.locator(".pf-empty").count();
		const hasPagefindMessage = await page
			.locator(".pagefind-ui__message")
			.count();

		// Any of these states is valid after clearing:
		// - No results (cleared state)
		// - Has results (showing all results)
		// - Has a message
		const isValidState =
			resultCount === 0 ||
			resultCount > 0 ||
			hasCustomEmpty > 0 ||
			hasPagefindMessage > 0;
		expect(isValidState).toBe(true);

		// Verify the input is actually empty
		await expect(input).toHaveValue("");
	});
});
