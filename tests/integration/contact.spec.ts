import { test, expect } from '@playwright/test';

test('test contact section', async ({ page }) => {
	await page.goto('http://localhost:4321');

	await page.routeFromHAR('./hars/contact.har', {
		url: '*/**/api/v1/fruits',
		update: true,
	});

	await page.locator('[id="form-name"]').click();

	await page.locator('[id="form-name"]').fill('John Doe');

	await page.locator('[id="form-email"]').click();

	await page.locator('[id="form-email"]').fill('johndoe@test.com');

	await page.locator('[id="form-subject"]').click();

	await page.locator('[id="form-subject"]').fill('John it is time to start your new project');

	await page.locator('textarea[id="form-message"]').click();

	await page
		.locator('textarea[id="form-message"]')
		.fill(
			'I think that success depends on communication and focus on the goal. I would like to work with you on your project.'
		);

	await page.locator('text=Send Message').click();
	await expect(page).toHaveURL(
		process.env.CONTACT_FORM ||
		'https://n8n-k4aj.onrender.com/webhook-test/8901e5dd-9459-44df-86b7-8657178868f5'
	);
});
