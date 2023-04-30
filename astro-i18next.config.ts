/** @type {import('astro-i18next').AstroI18nextConfig} */

import type { AstroI18nextConfig } from 'astro-i18next'

const config: AstroI18nextConfig = {
	defaultLocale: 'en',
	locales: ['en', 'es'],
	namespaces: ['about', 'blog', 'common', 'contact', 'hero', 'projects'],
	defaultNamespace: 'common'
}

export default config
