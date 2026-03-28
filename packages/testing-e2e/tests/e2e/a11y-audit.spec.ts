import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Accessibility audit tests using axe-core.
 *
 * Runs automated WCAG 2.1 AA checks on key pages.
 * This catches ~30-40% of a11y issues; manual testing is still needed.
 */

test.describe("Accessibility audit", () => {
	test("homepage has no critical a11y violations", async ({ page }) => {
		await page.goto("/");
		await page.waitForLoadState("networkidle");

		const results = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test("blog homepage has no critical a11y violations", async ({ page }) => {
		await page.goto("/blog");
		await page.waitForLoadState("networkidle");

		const results = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test("search page has no critical a11y violations", async ({ page }) => {
		await page.goto("/search");
		await page.waitForLoadState("networkidle");

		const results = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test("Spanish homepage has no critical a11y violations", async ({
		page,
	}) => {
		await page.goto("/es");
		await page.waitForLoadState("networkidle");

		const results = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
			.analyze();

		expect(results.violations).toEqual([]);
	});
});
