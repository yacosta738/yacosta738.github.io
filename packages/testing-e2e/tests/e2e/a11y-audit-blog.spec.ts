import { test } from "@playwright/test";
import { auditRoute } from "../fixtures/a11y";

/**
 * Blog-specific a11y audit routes.
 * Excluded from portfolio test runs via testIgnore pattern.
 */
test.describe("Accessibility audit (blog)", () => {
	test("blog homepage has no critical a11y violations", async ({ page }) => {
		await auditRoute(page, "/");
	});

	test("search page has no critical a11y violations", async ({ page }) => {
		await auditRoute(page, "/search");
	});

	test("Spanish blog homepage has no critical a11y violations", async ({
		page,
	}) => {
		await auditRoute(page, "/es");
	});
});
