import { test, expect } from '@playwright/test';

test('test contact section', async ({ page }) => {
	const webhookUrl = 'https://n8n-k4aj.onrender.com/webhook-test/8901e5dd-9459-44df-86b7-8657178868f5';
	
	// Set up request interception
	await page.route(webhookUrl, async (route) => {
		const response = await route.fetch();
		await route.fulfill({
			status: 307,
			headers: {
				'location': 'http://localhost:4321',
				'content-type': 'application/json'
			}
		});
	});

	await page.goto('http://localhost:4321');
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

	// Submit form and wait for response
	const responsePromise = page.waitForResponse(response => 
		response.url() === webhookUrl && response.status() === 307
	);
	
	await page.locator('button[type="submit"]').click();
	
	const response = await responsePromise;
	
	// Verify response
	expect(response.status()).toBe(307);
	expect(response.headers()['location']).toBe('http://localhost:4321');
});
