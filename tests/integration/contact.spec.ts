import { test, expect } from '@playwright/test';

test('test contact section', async ({ page }) => {
	await page.goto('http://localhost:3000');

	await page.locator('[id="form-name"]').click();

	await page.locator('[id="form-name"]').fill('Yuniel Acosta');

	await page.locator('[id="form-email"]').click();

	await page.locator('[id="form-email"]').fill('yunielacosta738@gmail.com');

	await page.locator('[id="form-subject"]').click();

	await page.locator('[id="form-subject"]').fill('I want contact you');

	await page.locator('textarea[id="form-message"]').click();

	await page
		.locator('textarea[id="form-message"]')
		.fill('I think that you and me could work together');

	await page.locator('text=Send Message').click();
	await expect(page).toHaveURL('https://formspree.io/f/xknperzd');
});
