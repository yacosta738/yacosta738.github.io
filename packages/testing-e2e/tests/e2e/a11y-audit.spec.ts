import { test } from "@playwright/test";
import { auditRoute } from "../fixtures/a11y";

/**
 * Accessibility audit tests using axe-core (shared routes).
 * Runs on both portfolio and blog apps.
 *
 * App-specific routes are in a11y-audit-portfolio.spec.ts and a11y-audit-blog.spec.ts.
 */
test.describe("Accessibility audit", () => {
	test("default locale homepage has no critical a11y violations", async ({
		page,
	}) => {
		await auditRoute(page, "/");
	});
});
