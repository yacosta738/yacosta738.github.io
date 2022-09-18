import { test, expect } from '@playwright/test'

test('Test side social media links', async ({ page }) => {
	await page.goto('http://localhost:3000/')

	const [page1] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('#GitHub svg').click()
	])

	await page1.goto('https://github.com/yacosta738')

	const [page2] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('#Instagram svg').click()
	])
	await page2.goto('https://www.instagram.com/yacosta738/')

	const [page3] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('#Twitter svg').click()
	])

	await page3.goto('https://twitter.com/yacosta738')

	const [page4] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('#Linkedin svg').click()
	])

	await page4.goto('https://www.linkedin.com/in/yacosta738/')

	const [page5] = await Promise.all([
		page.waitForEvent('popup'),
		page.locator('#Codepen svg').click()
	])

	await page5.goto('https://codepen.io/yacosta738')

	await page.locator('text=yunielacosta738@gmail.com').click()
	await expect(page).toHaveURL('http://localhost:3000/')
})
