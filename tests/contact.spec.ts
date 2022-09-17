import { test, expect } from '@playwright/test'

test('test contact section', async ({ page }) => {
	await page.goto('http://localhost:3000/')

	await page.locator('[placeholder="John Doe"]').click()

	await page.locator('[placeholder="John Doe"]').fill('Yuniel Acosta')

	await page.locator('[placeholder="jhondoe\\@gmail\\.com"]').click()

	await page.locator('[placeholder="jhondoe\\@gmail\\.com"]').fill('yunielacosta738@gmail.com')

	await page.locator('[placeholder="John it\\\'s time to start your new project"]').click()

	await page
		.locator('[placeholder="John it\\\'s time to start your new project"]')
		.fill('I want contact you')

	await page.locator('textarea[name="message"]').click()

	await page.locator('textarea[name="message"]').fill('I think that you and me could work together')

	await page.locator('text=Send Message').click()
	await expect(page).toHaveURL('https://formspree.io/f/xknperzd')
})
