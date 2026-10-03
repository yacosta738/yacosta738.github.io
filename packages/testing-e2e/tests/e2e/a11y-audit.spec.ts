import { test } from "@playwright/test";
import { auditRoute } from "../fixtures/a11y";

/**
 * Accessibility audit tests using axe-core (shared routes).
 * Runs on both portfolio and blog apps.
 *
 * App-specific routes are in a11y-audit-portfolio.spec.ts and a11y-audit-blog.spec.ts.
 */
test.describe("Accessibility audit", () => {
	for (const theme of ["light", "dark"] as const) {
		test(`default locale homepage has no ${theme} theme violations`, async ({
			page,
		}) => {
			await auditRoute(page, "/", theme);
		});
	}
});
