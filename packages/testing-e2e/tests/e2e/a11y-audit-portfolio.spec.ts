import { test } from "@playwright/test";
import { auditRoute } from "../fixtures/a11y";

/**
 * Portfolio-specific a11y audit routes.
 * Excluded from blog test runs via testIgnore pattern.
 */
test.describe("Accessibility audit (portfolio)", () => {
	for (const theme of ["light", "dark"] as const) {
		test(`Spanish homepage has no ${theme} theme violations`, async ({
			page,
		}) => {
			await auditRoute(page, "/es", theme);
		});
	}
});
