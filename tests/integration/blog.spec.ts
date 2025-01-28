import { test, expect } from "@playwright/test";

test("test blog section", async ({ page }) => {
	await page.goto("http://localhost:4321");

	await page.locator("text=Blog").nth(1).click();
	await expect(page).toHaveURL("http://localhost:4321/blog");

	await page.locator('[data-test="paginator-next"]').click();
	await expect(page).toHaveURL("http://localhost:4321/blog/2");

	await page.goto(
		"http://localhost:4321/posts/en/maximizing-productivity-and-alignment-with-okrs-a-guide-to-setting-and-achieving-objectives",
	);

	await page.locator("text=Back to Blog").click();
	await expect(page).toHaveURL("http://localhost:4321/blog");
});
