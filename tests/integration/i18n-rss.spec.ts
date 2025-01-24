import { test, expect } from '@playwright/test';

test('test i18n and rss', async ({ page }) => {
  await page.goto('http://localhost:4321');

  expect(page.locator('#welcome-en')).toHaveText('Hi, my name is');

  await page.locator('select').nth(1).selectOption('/es/');
  await expect(page).toHaveURL('http://localhost:4321/es/');

  expect(page.locator('#welcome-es')).toHaveText('Hola, mi nombre es');

  await expect(page.locator('h2:has-text("Sobre mí")')).toHaveText('Sobre mí');
  await expect(page.locator('h2:has-text("Dónde he trabajado")')).toHaveText('Dónde he trabajado');
  await expect(page.locator('h2:has-text("Otros proyectos")')).toHaveText('Otros proyectos');
  await expect(page.locator('h2:has-text("Últimos artículos")')).toHaveText('Últimos artículos');
  await expect(page.locator('h2:has-text("Contáctame")')).toHaveText('Contáctame');

  await page.locator('select').nth(1).selectOption('/');
  await expect(page).toHaveURL('http://localhost:4321');

  await expect(page.locator('h2:has-text("About me")')).toHaveText('About me');
  await expect(page.locator('h2:has-text("Where I\'ve Worked")')).toHaveText("Where I've Worked");
  await expect(page.locator('h2:has-text("Other Noteworthy Projects")')).toHaveText(
    'Other Noteworthy Projects'
  );
  await expect(page.locator('h2:has-text("Last Articles")')).toHaveText('Last Articles');
  await expect(page.locator('h2:has-text("Contact me")')).toHaveText('Contact me');
});
