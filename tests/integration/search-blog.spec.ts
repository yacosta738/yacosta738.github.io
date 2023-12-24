import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/blog');
  await page.getByRole('button', { name: 'Search' }).click();

	const noResults = await page.getByText('No recent searches');
  const esc = await page.getByText('Esc to close');
	expect(noResults).toBeDefined();
	expect(esc).toBeDefined();

  await page.getByPlaceholder('Search articles and').fill('vuejs');
  await page.locator('#results div').filter({ hasText: 'FREE HOSTINGS for WEB' }).first().click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search articles and').fill('angular');
  await page.getByPlaceholder('Search articles and').press('Escape');
});
