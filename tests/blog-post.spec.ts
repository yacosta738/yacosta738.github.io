import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
	await page.goto('http://localhost:3000/blog/rebuilding-site-with-astro/')

	await page.locator('text=Back to Blog').click()
	await expect(page).toHaveURL('http://localhost:3000/blog/')

	await page.locator('span:has-text("vuejs")').click()
	await expect(page).toHaveURL('http://localhost:3000/blog/tag/vuejs/')

	await page.locator('text=programming').click()
	await expect(page).toHaveURL('http://localhost:3000/blog/category/programming/')
})
