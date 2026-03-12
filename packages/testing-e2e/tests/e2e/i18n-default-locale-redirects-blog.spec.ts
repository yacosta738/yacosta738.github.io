import { expect, test } from "@playwright/test";

function escapeRegExp(str: string): string {
	return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

test.describe("Default locale legacy redirects - blog", () => {
	test.beforeEach(({ baseURL }, testInfo) => {
		const blogHostPattern = /^blog(?:-[^.]+)?\.localhost$/;
		const isBlogBaseUrl = (url: string | undefined) => {
			if (!url) {
				return false;
			}
			try {
				return blogHostPattern.test(new URL(url).hostname);
			} catch {
				return blogHostPattern.test(url);
			}
		};

		testInfo.skip(
			!isBlogBaseUrl(baseURL),
			"Blog app only (baseURL blog*.localhost)",
		);
	});

	test("redirects /en/ to /", async ({ page }) => {
		await page.goto("/en/", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveURL(/\/?$/);
	});

	test("redirects root to /", async ({ page }) => {
		await page.goto("/", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveURL(/\/?$/);
	});

	test("redirects /en/blog to /", async ({ page }) => {
		await page.goto("/en/blog", { waitUntil: "domcontentloaded" });
		await expect(page).toHaveURL(/\/?$/);
	});

	test("redirects legacy /en/blog/* to unprefixed paths", async ({ page }) => {
		const cases = [
			{
				from: "/en/blog/category/software-development",
				to: "/category/software-development",
			},
			{ from: "/en/blog/tag/security", to: "/tag/security" },
		];

		for (const { from, to } of cases) {
			await page.goto(from, { waitUntil: "domcontentloaded" });
			const expected = new RegExp(`${escapeRegExp(to)}\\/?$`);
			await expect(page).toHaveURL(expected);
		}
	});
});
