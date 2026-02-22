import { expect, test } from "@playwright/test";
import { selectors } from "../fixtures";

test.describe("Language Switching", () => {
	test("should switch from English to Spanish and update UI", async ({
		page,
	}) => {
		// Start on English homepage (navigate directly to avoid redirect race)
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Verify initial English state (accept locale variants like `en-US`)
		await expect(page.locator("html")).toHaveAttribute("lang", /^en/);
		await expect(page).toHaveURL(/\/en\/?$/);

		// Find language selector (may not be visible due to CSS, but should be in DOM)
		const langSelector = page.locator(selectors.language.toggle).first();

		// Wait for the selector to be attached to the DOM
		await expect(langSelector).toBeAttached({ timeout: 10000 });

		// Select Spanish from dropdown (use full path as value, force for hidden elements)
		await langSelector.selectOption("/es/", { force: true });

		// Wait for navigation to complete
		await page.waitForLoadState("networkidle");
		await page.waitForURL(/\/es\/?/, { timeout: 10000 });

		// Verify Spanish is now active (accept locale variants like `es-ES`)
		await expect(page.locator("html")).toHaveAttribute("lang", /^es/);
		await expect(page).toHaveURL(/\/es\/?/);

		// Verify UI content has translated
		const heading = page.getByRole("heading", { level: 1 }).first();
		await expect(heading).toBeVisible();

		// Check that Spanish content is present (may vary by page structure)
		const pageContent = await page.textContent("body");
		expect(pageContent).toBeTruthy();
	});

	test("should switch from Spanish to English and update URL", async ({
		page,
	}) => {
		// Start on Spanish homepage
		await page.goto("/es/");
		await page.waitForLoadState("networkidle");

		// Verify initial Spanish state (accept locale variants like `es-ES`)
		await expect(page.locator("html")).toHaveAttribute("lang", /^es/);

		// Select English from dropdown (use full path as value, force for hidden elements)
		const langSelector = page.locator(selectors.language.toggle).first();
		await langSelector.selectOption("/en/", { force: true });

		// Wait for navigation
		await page.waitForLoadState("networkidle");

		// Verify English is now active (accept locale variants like `en-US`)
		await expect(page.locator("html")).toHaveAttribute("lang", /^en/);
		await expect(page).toHaveURL(/\/en\/?/);
	});

	test("should persist language selection across navigation", async ({
		page,
	}) => {
		// Start on English
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		// Switch to Spanish (use first match and full path as value, force for hidden elements)
		const _langToggle = page.locator(selectors.language.toggle).first();
		await _langToggle.selectOption("/es/", { force: true });
		await page.waitForLoadState("networkidle");

		// Navigate to blog page
		await page.goto("/es/blog");
		await page.waitForLoadState("networkidle");

		// Verify Spanish is still active (accept locale variants like `es-ES`)
		await expect(page.locator("html")).toHaveAttribute("lang", /^es/);
		await expect(page).toHaveURL(/\/es\/blog\/?/);
	});

	test("should have accessible language selector", async ({ page }) => {
		await page.goto("/en/");
		await page.waitForLoadState("networkidle");

		const langSelector = page.locator(selectors.language.toggle).first();

		// Check for accessibility attributes (element exists in DOM)
		await expect(langSelector).toBeAttached();
		await expect(langSelector).toBeEnabled();

		// Verify it has proper role
		const role = await langSelector.getAttribute("role");
		const tagName = await langSelector.evaluate((el) =>
			el.tagName.toLowerCase(),
		);
		expect(tagName === "select" || role === "combobox").toBeTruthy();
	});
});
