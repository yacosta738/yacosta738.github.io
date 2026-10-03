import { test } from "@playwright/test";
import { auditRoute } from "../fixtures/a11y";

/**
 * Blog-specific a11y audit routes.
 * Excluded from portfolio test runs via testIgnore pattern.
 */
test.describe("Accessibility audit (blog)", () => {
	for (const theme of ["light", "dark"] as const) {
		test(`blog homepage has no ${theme} theme violations`, async ({ page }) => {
			await auditRoute(page, "/", theme);
		});

		test(`search page has no ${theme} theme violations`, async ({ page }) => {
			await auditRoute(page, "/search", theme);
		});

		test(`Spanish blog homepage has no ${theme} theme violations`, async ({
			page,
		}) => {
			await auditRoute(page, "/es", theme);
		});
	}
});
