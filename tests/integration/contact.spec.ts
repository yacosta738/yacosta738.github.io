import { test, expect } from "@playwright/test";

test("test contact section", async ({ page }) => {
	const webhookPattern = "https://formspree.io/f/*";

	// Set up request interception with pattern matching
	await page.route(webhookPattern, async (route) => {
		const response = await route.fetch();
		await route.fulfill({
			status: 307,
			headers: {
				location: "http://localhost:4321",
				"content-type": "application/json",
			},
		});
	});

	await page.goto("http://localhost:4321");
	await page.locator('[id="form-name"]').click();

	await page.locator('[id="form-name"]').fill("John Doe");

	await page.locator('[id="form-email"]').click();

	await page.locator('[id="form-email"]').fill("johndoe@test.com");

	await page.locator('[id="form-subject"]').click();

	await page
		.locator('[id="form-subject"]')
		.fill("John it is time to start your new project");

	await page.locator('textarea[id="form-message"]').click();

	await page
		.locator('textarea[id="form-message"]')
		.fill(
			"I think that success depends on communication and focus on the goal. I would like to work with you on your project.",
		);

	// Submit form and wait for response
	const FORM_SUBMISSION_TIMEOUT = 60000; // 60 seconds
	const responsePromise = page.waitForResponse(
		(response) => {
			const url = response.url();
			return url.includes("formspree.io/f") && response.status() === 307;
		},
		{ timeout: FORM_SUBMISSION_TIMEOUT },
	);

	await page.locator('button[type="submit"]').click();

	const response = await responsePromise;

	// Verify response
	expect(response.status()).toBe(307);
	expect(response.headers().location).toBe("http://localhost:4321");
});
