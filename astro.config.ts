import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './remark-reading-time.mjs'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import robotsTxt from 'astro-robots-txt'
import NetlifyCMS from 'astro-netlify-cms'
import remarkToc from 'remark-toc'
import Compress from 'astro-compress'
import critters from 'astro-critters'
import icon from 'astro-icon'

import { config } from './src/plugins/netlify-cms'

const DEV_PORT: number = 3000

// https://astro.build/config
export default defineConfig({
	site: 'https://yunielacosta.com/',
	server: {
		/* Dev. server only */
		port: DEV_PORT
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['es', 'en']
	},
	integrations: [
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
		robotsTxt(),
		Compress({
			CSS: false
		}),
		critters({
			exclude: ['index.html', (file: string) => file === './dist/index.html']
		}),
		NetlifyCMS({
			config
		}),
		vue(),
		icon({
			iconDir: 'src/icons',
			include: {
				mdi: ['*'],
				uit: ['*'],
				'simple-icons': ['*'],
				ph: ['*'],
				ri: ['*'],
				ic: ['*'],
				charm: ['*'],
				cib: ['*'],
				ion: ['*'],
				clarity: ['*'],
				teenyicons: ['*'],
				'akar-icons': ['*']
			}
		})
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
