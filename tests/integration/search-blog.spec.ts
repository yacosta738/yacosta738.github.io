import { test, expect } from '@playwright/test'

test('test search box in blog', async ({ page }) => {
	await page.goto('http://localhost:3000/blog')
	await page.locator('#acosta-navbar').getByRole('button').click()
	await page.getByPlaceholder('Search...').click()
	await page.getByPlaceholder('Search...').fill('vuejs')
	// get text of #itemFoundText and check if it is equal to '1 item found'
	await page.waitForSelector('#itemFoundText')
	const itemFoundText = await page.$eval('#itemFoundText', (el) => el.textContent)
	expect(itemFoundText).toBeDefined()
	await page.getByPlaceholder('Search...').click()
	await page.getByPlaceholder('Search...').fill('kotlin')
	await page.getByRole('button', { name: 'Close modal' }).click()
	await page.getByRole('link', { name: 'yuniel acosta portfolio logo' }).click()
})
