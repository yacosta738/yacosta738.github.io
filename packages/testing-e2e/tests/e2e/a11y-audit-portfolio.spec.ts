import { test } from "@playwright/test";
import { auditRoute } from "../fixtures/a11y";

/**
 * Portfolio-specific a11y audit routes.
 * Excluded from blog test runs via testIgnore pattern.
 */
test.describe("Accessibility audit (portfolio)", () => {
	test("Spanish homepage has no critical a11y violations", async ({ page }) => {
		await auditRoute(page, "/es");
	});
});
