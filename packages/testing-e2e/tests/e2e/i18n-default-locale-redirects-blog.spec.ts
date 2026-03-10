import { expect, test } from "@playwright/test";

test.describe("Default locale legacy redirects - blog", () => {
	test.beforeEach(({ baseURL }, testInfo) => {
		testInfo.skip(
			!baseURL?.includes("4322"),
			"Blog app only (baseURL port 4322)",
		);
	});

	test("redirects /en/ to /blog", async ({ page }) => {
		await page.goto("/en/", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveURL(/\/blog\/?$/);
	});

	test("redirects /en/blog to /blog", async ({ page }) => {
		await page.goto("/en/blog", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveURL(/\/blog\/?$/);
	});
});
