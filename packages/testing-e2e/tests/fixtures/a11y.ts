import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

/**
 * Shared axe-core audit helper for a11y tests.
 *
 * Contrast is included in this audit so regressions in either color theme fail
 * the same route-level checks as other WCAG A/AA violations.
 */

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

export async function auditRoute(
	page: Page,
	route: string,
	theme?: "dark" | "light",
) {
	await page.goto(route);
	await page.waitForLoadState("networkidle");
	if (theme) await setTheme(page, theme);

	const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

	expect(results.violations).toEqual([]);
}

export async function setTheme(page: Page, theme: "dark" | "light") {
	await page.evaluate((nextTheme) => {
		document.documentElement.classList.toggle("dark", nextTheme === "dark");
		localStorage.setItem("theme", nextTheme);
		document.dispatchEvent(
			new CustomEvent("themeChanged", { detail: { theme: nextTheme } }),
		);
	}, theme);
}
