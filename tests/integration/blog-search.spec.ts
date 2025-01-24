import { test, expect } from '@playwright/test';

test('searchArticlesInEnglishAndSpanish', async ({ page }) => {
  // Search articles in English
  await page.goto('http://localhost:4321/');
  await page.getByRole('link', { name: '" counter(item) ". Blog' }).click();
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search articles and').click();
  await page.getByPlaceholder('Search articles and').fill('hosting');
  await page.getByText('Free Web Hosting for JavaScript Projects').click();
  const expectedEnglishPostUrl = 'http://localhost:4321/posts/en/javascript-free-hosts';
  await page.waitForURL(expectedEnglishPostUrl);
  expect(page.url()).toBe(expectedEnglishPostUrl);

  // Search articles in Spanish
  await page.getByRole('combobox').selectOption('/es/');
  await page.getByRole('link', { name: '" counter(item) ". Blog' }).click();
  await page.getByLabel('Buscar').click();
  await page.getByPlaceholder('Buscar artículos y').click();
  await page.getByPlaceholder('Buscar artículos y').fill('hosting');
  await page.getByText('Hosting Web Gratuito para Proyectos con JavaScript').click();
  const spanishPostUrl = 'http://localhost:4321/posts/es/javascript-free-hosts';
  await page.waitForURL(spanishPostUrl);
  expect(page.url()).toBe(spanishPostUrl);
});

test('searchWithEmptyQuery', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.getByRole('link', { name: '" counter(item) ". Blog' }).click();
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search articles and').click();
  await page.getByPlaceholder('Search articles and').fill('');
  const searchResults = await page.$$('[data-testid="search-result"]');
  expect(searchResults.length).toBe(0);
});

test('searchWithNonExistentQuery', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await page.getByRole('link', { name: '" counter(item) ". Blog' }).click();
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search articles and').click();
  await page.getByPlaceholder('Search articles and').fill('nonexistentquery');
  const searchResults = await page.$$('[data-testid="search-result"]');
  expect(searchResults.length).toBe(0);
});
