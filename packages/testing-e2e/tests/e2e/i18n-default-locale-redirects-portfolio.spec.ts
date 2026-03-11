import { expect, test } from "@playwright/test";

test.describe("Default locale legacy redirects - portfolio", () => {
	test.beforeEach(({ baseURL }, testInfo) => {
		testInfo.skip(
			!baseURL?.includes("4321"),
			"Portfolio app only (baseURL port 4321)",
		);
	});

	test("redirects /en/* to unprefixed paths", async ({ request }) => {
		const cases = [
			{ from: "/en/", to: "/" },
			{ from: "/en/about", to: "/about" },
			{ from: "/en/support", to: "/support" },
			{ from: "/en/projects/case-study", to: "/projects/case-study" },
		];

		for (const { from, to } of cases) {
			const response = await request.get(from, { maxRedirects: 0 });
			expect(response.status()).toBe(301);
			expect(response.headers().location).toBe(to);
		}
	});

	test("renders English content at /about and /support", async ({ page }) => {
		await page.goto("/about", { waitUntil: "domcontentloaded" });
		await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();

		await page.goto("/support", { waitUntil: "domcontentloaded" });
		await expect(
			page.getByRole("heading", { name: "Support My Work" }),
		).toBeVisible();
	});

	test("renders default locale content at root", async ({ page }) => {
		await page.goto("/", { waitUntil: "domcontentloaded" });
		await expect(
			page.getByRole("link", { name: "Get in touch" }),
		).toBeVisible();
	});

	test("renders non-default locale content at prefixed path", async ({
		page,
	}) => {
		await page.goto("/es/about", { waitUntil: "domcontentloaded" });
		await expect(page.getByRole("heading", { name: "Sobre Mí" })).toBeVisible();
	});
});
