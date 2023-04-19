import { test } from '@playwright/test'

test('test resume button 📓', async ({ page }) => {
	await page.goto('http://localhost:3000/')

	const [curriculum] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('text=Resume').nth(1).click()
	])

	await curriculum.goto('https://github.com/yacosta738')
	await curriculum.goto('https://www.linkedin.com/in/yacosta738/')
	await curriculum.goto('https://www.yunielacosta.com/')
	await curriculum.close()
})
