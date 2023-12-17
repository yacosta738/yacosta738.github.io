import { test, expect } from '@playwright/test';

test('Test side social media links', async ({ page }) => {
	await page.goto('http://localhost:3000/');

	const [githubPage] = await Promise.all([
		page.waitForEvent('popup', { timeout: 5000 }),
		page.locator('#GitHub svg').click(),
	]);

	githubPage?.goto('https://github.com/yacosta738');

	const [InstagramPage] = await Promise.all([
		page.waitForEvent('popup', { timeout: 5000 }),
		page.locator('#Instagram svg').click(),
	]);
	await InstagramPage?.goto('https://www.instagram.com/yacosta738/');

	const [twitterPage] = await Promise.all([
		page.waitForEvent('popup', { timeout: 5000 }),
		page.locator('#Twitter svg').click(),
	]);

	await twitterPage?.goto('https://twitter.com/yacosta738');

	const [LinkedInPage] = await Promise.all([
		page.waitForEvent('popup', { timeout: 5000 }),
		page.locator('#Linkedin svg').click(),
	]);

	await LinkedInPage?.goto('https://www.linkedin.com/in/yacosta738/');

	const [CodepenPage] = await Promise.all([
		page.waitForEvent('popup', { timeout: 5000 }),
		page.locator('#Codepen svg').click(),
	]);

	await CodepenPage?.goto('https://codepen.io/yacosta738');

	await page.locator('text=yunielacosta738@gmail.com').click();
	await expect(page).toHaveURL('http://localhost:3000/');
});
