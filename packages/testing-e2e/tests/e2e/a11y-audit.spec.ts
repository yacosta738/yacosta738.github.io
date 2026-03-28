import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

/**
 * Accessibility audit tests using axe-core.
 *
 * Runs automated WCAG 2.1 AA checks on key pages.
 * This catches ~30-40% of a11y issues; manual testing is still needed.
 */

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

async function auditRoute(page: Page, route: string) {
	await page.goto(route);
	await page.waitForLoadState("networkidle");

	const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

	expect(results.violations).toEqual([]);
}

test.describe("Accessibility audit", () => {
	test("homepage has no critical a11y violations", async ({ page }) => {
		await auditRoute(page, "/");
	});

	test("blog homepage has no critical a11y violations", async ({ page }) => {
		await auditRoute(page, "/blog");
	});

	test("search page has no critical a11y violations", async ({ page }) => {
		await auditRoute(page, "/search");
	});

	test("Spanish homepage has no critical a11y violations", async ({ page }) => {
		await auditRoute(page, "/es");
	});
});
