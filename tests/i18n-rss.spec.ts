import { test, expect } from '@playwright/test'

test('test i18n and rss', async ({ page }) => {
	await page.goto('http://localhost:3000/')

	await expect(await page.locator('h1').first()).toHaveText('Hi, my name is')

	await page.locator('select').nth(1).selectOption('/es/')
	await expect(page).toHaveURL('http://localhost:3000/es/')

	expect(await page.locator('h1').first()).toHaveText('Hola, mi nombre es')
	expect(await page.locator('#my-self')).toHaveText(
		'Soy ingeniero de software, entusiasta de la ciencia y la tecnología, especializado en construir aplicaciones web y Móviles.'
	)
	await expect(await page.locator('h2:has-text("Sobre mí")')).toHaveText('Sobre mí')
	await expect(await page.locator('h2:has-text("Dónde he trabajado")')).toHaveText(
		'Dónde he trabajado'
	)
	await expect(await page.locator('h2:has-text("Otros proyectos")')).toHaveText('Otros proyectos')
	await expect(await page.locator('h2:has-text("Últimos artículos")')).toHaveText(
		'Últimos artículos'
	)
	await expect(await page.locator('h2:has-text("Contácteme")')).toHaveText('Contácteme')

	await page.locator('select').nth(1).selectOption('/')
	await expect(page).toHaveURL('http://localhost:3000/')

	await expect(await page.locator('#my-self')).toHaveText(
		'I’m a software engineer, technology and science enthusiast, specialized in building mobile and web applications.'
	)
	await expect(await page.locator('h2:has-text("About me")')).toHaveText('About me')
	await expect(await page.locator('h2:has-text("Where I\'ve Worked")')).toHaveText(
		"Where I've Worked"
	)
	await expect(await page.locator('h2:has-text("Other Noteworthy Projects")')).toHaveText(
		'Other Noteworthy Projects'
	)
	await expect(await page.locator('h2:has-text("Last Articles")')).toHaveText('Last Articles')
	await expect(await page.locator('h2:has-text("Contact me")')).toHaveText('Contact me')
})
