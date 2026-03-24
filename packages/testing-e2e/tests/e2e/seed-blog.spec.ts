import { expect, test } from "@playwright/test";
import { selectors } from "../fixtures";

/**
 * Seed test for the Blog app.
 *
 * This test bootstraps a ready-to-use page context for Playwright Test Agents.
 * The planner agent will run this test first to set up the environment,
 * then use it as a template for all generated tests.
 *
 * @see https://playwright.dev/docs/test-agents
 */
test("seed", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/blog/i);

	// Ensure the main navigation is visible and interactive
	const nav = page.locator(selectors.navigation.mainNav);
	await expect(nav).toBeVisible();

	// Verify the blog content area loaded
	await expect(page.locator("main")).toBeVisible();
});
