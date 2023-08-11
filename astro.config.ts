import { defineConfig } from 'astro/config'
// @ts-ignore
import { remarkReadingTime } from './remark-reading-time.mjs'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import astroI18next from 'astro-i18next'
import image from '@astrojs/image'
import vue from '@astrojs/vue'
import robotsTxt from 'astro-robots-txt'
import NetlifyCMS from 'astro-netlify-cms'
import remarkToc from 'remark-toc'
import AstroPWA from '@vite-pwa/astro'
import Compress from 'astro-compress'
import critters from 'astro-critters'

import { manifest, workbox } from './src/plugins/pwa'
import { config } from './src/plugins/netlify-cms'

// https://astro.build/config
export default defineConfig({
	site: 'https://yunielacosta.com/',
	integrations: [
		AstroPWA({
			mode: 'production',
			base: '/',
			scope: '/',
			includeAssets: ['favicon.ico'],
			registerType: 'autoUpdate',
			manifest,
			workbox,
			devOptions: {
				enabled: true,
				navigateFallbackAllowlist: [/^\/404$/]
			}
		}),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					es: 'es'
				}
			}
		}),
		tailwind(),
		astroI18next(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp'
		}),
		robotsTxt(),
		Compress({
			css: false
		}),
		critters({
			exclude: ['index.html', (file: string) => file === './dist/index.html']
		}),
		NetlifyCMS({
			config
		}),
		vue()
	],
	vite: {
		ssr: {
			external: ['svgo']
		},
		plugins: []
	},
	markdown: {
		remarkPlugins: [remarkToc, remarkReadingTime],
		gfm: true
	}
})
