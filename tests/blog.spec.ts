import { test, expect } from '@playwright/test'

test('test blog section', async ({ page }) => {
	await page.goto('http://localhost:3000/')

	await page.locator('text=Blog').nth(1).click()
	await expect(page).toHaveURL('http://localhost:3000/blog')

	await page.locator('[data-test="paginator-next"]').click()
	await expect(page).toHaveURL('http://localhost:3000/blog/2')

	await page.locator('[data-test="paginator-next"]').click()

	await page
		.locator(
			'text=Gridsome is a Vue.js-powered, modern site generator for building the fastest pos >> a'
		)
		.click()
	await expect(page).toHaveURL('http://localhost:3000/blog/introduction-to-gridsome')

	const [page1] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('a:nth-child(7) > .h-7 > path').click()
	])

	const [page2] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('a:nth-child(6) > .h-7').click()
	])

	const [page3] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('a:nth-child(5) > .h-7').click()
	])

	const [page4] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('a:nth-child(4) > .h-7').click()
	])

	await page4.goto(
		'https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2Fsubmit%3Furl%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fblog%252Fintroduction-to-gridsome%26title%3DIntroduction%2520to%2520Gridsome'
	)

	const [page5] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('a:nth-child(3) > .h-7').click()
	])

	const [page6] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('a:nth-child(2) > .h-7 > path').click()
	])

	const [page7] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('.mb-8 > div > a > .h-7').first().click()
	])

	await page.locator('text=Back to Blog').click()
	await expect(page).toHaveURL('http://localhost:3000/blog')
})
