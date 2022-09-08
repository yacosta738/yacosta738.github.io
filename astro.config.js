import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './remark-reading-time.mjs'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import astroI18next from 'astro-i18next'
import image from '@astrojs/image'
import vue from '@astrojs/vue'

import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
export default defineConfig({
	site: 'https://yunielacosta.com/',
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'en',
				// All urls that don't contain `es` or `fr` after `https://stargazers.club/` will be treated as default locale, i.e. `en`
				locales: {
					en: 'en',
					// The `defaultLocale` value must present in `locales` keys
					fr: 'es'
				}
			}
		}),
		tailwind(),
		vue(),
		astroI18next(),
		image()
	],
	vite: {
		ssr: {
			external: ['svgo']
		}
	},
	markdown: {
		extendDefaultPlugins: true,
		remarkPlugins: [remarkReadingTime]
	},
	output: 'server',
	adapter: netlify()
})
