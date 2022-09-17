import { test } from '@playwright/test'

test('test resume button 📓', async ({ page }) => {
	await page.goto('http://localhost:3000/')

	const [page1] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('text=Resume').nth(1).click()
	])
  await page1.goto('http://localhost:3000/files/yuniel_acosta_cv.pdf')
})
