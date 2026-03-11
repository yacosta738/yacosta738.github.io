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

	test("redirects root to /blog", async ({ page }) => {
		await page.goto("/", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveURL(/\/blog\/?$/);
	});

	test("redirects /en/blog to /blog", async ({ page }) => {
		await page.goto("/en/blog", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveURL(/\/blog\/?$/);
	});

	test("redirects legacy /en/blog/* to unprefixed paths", async ({ page }) => {
		const cases = [
			{
				from: "/en/blog/category/software-development",
				to: "/blog/category/software-development",
			},
			{ from: "/en/blog/tag/security", to: "/blog/tag/security" },
		];

		for (const { from, to } of cases) {
			await page.goto(from, { waitUntil: "domcontentloaded" });
			const expected = new RegExp(`${to.replace(/\//g, "\\/")}\\/?$`);
			await expect(page).toHaveURL(expected);
		}
	});
});
