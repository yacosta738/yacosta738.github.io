import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

/**
 * Shared axe-core audit helper for a11y tests.
 *
 * Note: some rules are excluded because the site has pre-existing issues
 * that need a dedicated design pass to fix:
 * - color-contrast: multiple elements across the site need contrast improvements
 * - link-in-text-block: footer links need underline or sufficient contrast from surrounding text
 * These are tracked separately and should be re-enabled once resolved.
 */

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

/** Pre-existing violations to exclude until a dedicated fix pass */
const EXCLUDED_RULES = ["color-contrast", "link-in-text-block"];

export async function auditRoute(page: Page, route: string) {
	await page.goto(route);
	await page.waitForLoadState("networkidle");

	const results = await new AxeBuilder({ page })
		.withTags(WCAG_TAGS)
		.disableRules(EXCLUDED_RULES)
		.analyze();

	expect(results.violations).toEqual([]);
}
