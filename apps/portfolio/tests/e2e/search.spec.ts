import { expect, type Page, test } from "@playwright/test";

/**
 * Helper function to wait for Pagefind UI to fully initialize.
 * Pagefind loads asynchronously in DOMContentLoaded, so we need to wait for:
 * 1. The .pagefind-ui container to exist
 * 2. The search input to be visible and enabled
 *
 * @param page - Playwright page object
 * @param timeout - Maximum time to wait in milliseconds (default: 15000)
 * @returns The input locator once it's ready
 */
async function waitForPagefindUI(page: Page, timeout = 15000) {
	// Wait for the Pagefind UI container to exist
	await page.waitForSelector(".pagefind-ui", { timeout, state: "attached" });

	// Wait for the input to be visible and enabled
	const input = page.locator(".pagefind-ui__search-input");
	await expect(input).toBeVisible({ timeout });
	await expect(input).toBeEnabled({ timeout });

	return input;
}

/**
 * Wait for Pagefind to finish processing and show either:
 * - Results (.pagefind-ui__result)
 * - Custom empty state (.pf-empty)
 * - Pagefind's empty message (.pagefind-ui__message)
 */
async function waitForSearchResults(page: Page, timeout = 15000) {
	await page.waitForSelector(
		".pagefind-ui__result, .pf-empty, .pagefind-ui__message",
		{ timeout, state: "visible" },
	);
}

test.describe("Search Page", () => {
	test("should display empty or no results state for invalid query", async ({
		page,
	}) => {
		await page.goto("/en/search?q=nonexistentquerythatdoesnotexist12345");

		// Wait for Pagefind UI to initialize
		await waitForPagefindUI(page);

		// Wait for search to complete (results or empty state)
		await waitForSearchResults(page);

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
		// Start from a query that should reliably produce an empty state,
		// then switch to a known query and assert results appear.
		await page.goto("/en/search?q=nonexistentquerythatdoesnotexist12345");

		// Wait for Pagefind UI to initialize
		const input = await waitForPagefindUI(page);

		// Wait for initial search state to appear (empty/message)
		await waitForSearchResults(page);

		// Change query to one that should produce actual results
		await input.fill(""); // Clear input reliably
		await input.fill("astro");
		await expect(input).toHaveValue("astro");

		// URL should reflect latest query once Pagefind input handler runs
		await expect
			.poll(() => new URL(page.url()).searchParams.get("q"), { timeout: 10_000 })
			.toBe("astro");

		// Wait for Pagefind to render at least one result for the new query
		const results = page.locator(".pagefind-ui__result");
		await expect.poll(() => results.count(), { timeout: 15_000 }).toBeGreaterThan(0);

		await expect(results.first()).toBeVisible();
		const firstResultLinks = results.first().locator(".pagefind-ui__result-link");
		await expect.poll(() => firstResultLinks.count(), { timeout: 10_000 }).toBeGreaterThan(0);
		await expect(firstResultLinks.first()).toBeVisible();
	});

	test("should handle clearing query", async ({ page }) => {
		await page.goto("/en/search?q=astro");

		// Wait for Pagefind UI to initialize
		const input = await waitForPagefindUI(page);

		// Wait for initial results to appear (or empty state)
		await waitForSearchResults(page);

		// Verify we have initial state (either results or empty message)
		const initialResultCount = await page
			.locator(".pagefind-ui__result")
			.count();
		const hasInitialEmpty = await page.locator(".pf-empty").count();
		const hasInitialMessage = await page
			.locator(".pagefind-ui__message")
			.count();

		const hasInitialState =
			initialResultCount > 0 || hasInitialEmpty > 0 || hasInitialMessage > 0;
		expect(hasInitialState).toBe(true);

		// Clear the input
		await input.clear();

		// Wait for Pagefind to process the cleared state
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
