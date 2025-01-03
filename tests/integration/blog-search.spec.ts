import { test, expect } from '@playwright/test';

test('searchArticlesInEnglishAndSpanish', async ({ page }) => {
	// Search articles in English
	await page.goto('http://localhost:3000/');
	await page.getByRole('link', { name: '" counter(item) ". Blog' }).click();
	await page.getByLabel('Search').click();
	await page.getByPlaceholder('Search articles and').click();
	await page.getByPlaceholder('Search articles and').fill('vuejs');
	await page.getByText('FREE HOSTINGS for WEB').click();
	await page.waitForURL('http://localhost:3000/posts/javascript-free-hosts');
	expect(page.url()).toBe('http://localhost:3000/posts/javascript-free-hosts');

	// Search articles in Spanish
	await page.getByRole('combobox').selectOption('/es/');
	await page.getByRole('link', { name: '" counter(item) ". Blog' }).click();
	await page.getByLabel('Buscar').click();
	await page.getByPlaceholder('Buscar artículos y').click();
	await page.getByPlaceholder('Buscar artículos y').fill('vuejs');
	await page.getByText('HOSTINGS GRATUITOS para').click();
	await page.waitForURL('http://localhost:3000/posts/es/javascript-free-hosts');
	expect(page.url()).toBe('http://localhost:3000/posts/es/javascript-free-hosts');
});

test('searchWithEmptyQuery', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.getByRole('link', { name: '" counter(item) ". Blog' }).click();
	await page.getByLabel('Search').click();
	await page.getByPlaceholder('Search articles and').click();
	await page.getByPlaceholder('Search articles and').fill('');
	const searchResults = await page.$$('[data-testid="search-result"]');
	expect(searchResults.length).toBe(0);
});

test('searchWithNonExistentQuery', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	await page.getByRole('link', { name: '" counter(item) ". Blog' }).click();
	await page.getByLabel('Search').click();
	await page.getByPlaceholder('Search articles and').click();
	await page.getByPlaceholder('Search articles and').fill('nonexistentquery');
	const searchResults = await page.$$('[data-testid="search-result"]');
	expect(searchResults.length).toBe(0);
});
