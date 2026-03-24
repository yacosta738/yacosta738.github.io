import { expect, test } from "@playwright/test";
import { selectors } from "../fixtures";

/**
 * Seed test for the Portfolio app.
 *
 * This test bootstraps a ready-to-use page context for Playwright Test Agents.
 * The planner agent will run this test first to set up the environment,
 * then use it as a template for all generated tests.
 *
 * @see https://playwright.dev/docs/test-agents
 */
test("seed", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Yuniel/i);

	// Ensure the main navigation is visible and interactive
	const nav = page.locator(selectors.navigation.mainNav);
	await expect(nav).toBeVisible();

	// Verify the page loaded with essential content
	await expect(page.locator("main")).toBeVisible();
});
