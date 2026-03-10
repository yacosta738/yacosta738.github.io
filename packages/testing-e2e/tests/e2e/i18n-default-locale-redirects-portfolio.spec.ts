import { expect, test } from "@playwright/test";

test.describe("Default locale legacy redirects - portfolio", () => {
	test.beforeEach(({ baseURL }, testInfo) => {
		testInfo.skip(
			!baseURL?.includes("4321"),
			"Portfolio app only (baseURL port 4321)",
		);
	});

	test("redirects /en/ to /", async ({ page }) => {
		await page.goto("/en/", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveURL(/\/$/);
	});

	test("redirects /en/<path> to unprefixed path", async ({ page }) => {
		await page.goto("/en/about", {
			waitUntil: "domcontentloaded",
		});
		await expect(page).toHaveURL(/\/about$/);
	});
});
