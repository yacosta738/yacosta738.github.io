import { test } from '@playwright/test'

test('test search box in blog', async ({ page }) => {
	await page.goto('http://localhost:3000/')
	await page.getByRole('link', { name: '0" counter(item) ". Blog' }).click()
	await page.getByRole('button').click()
	await page.fill('[placeholder="Search..."]', '')
	await page.type('[placeholder="Search..."]', 'vuejs')
	await page
		.getByText('Vue 3 with Typescript and Decorators I use Typescript and decorator libraries fo')
		.click()
	await page.getByRole('link', { name: 'Vue 3 with Typescript and Decorators' }).click()
	await page.getByRole('link', { name: 'Back to Blog' }).click()
	await page.getByRole('button').click()
	await page.getByPlaceholder('Search...').click()
	await page.getByPlaceholder('Search...').fill('kotlin')
	await page.getByRole('button', { name: 'Close modal' }).click()
	await page.getByRole('link', { name: 'acosta-logo' }).click()
})
