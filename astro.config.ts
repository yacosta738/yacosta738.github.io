import { defineConfig, sharpImageService } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import NetlifyCMS from 'astro-netlify-cms';
import remarkToc from 'remark-toc';
import icon from 'astro-icon';
import { config } from './src/plugins/netlify-cms';
const DEV_PORT: number = 3000;

// https://astro.build/config
export default defineConfig({
	site: 'https://yunielacosta.com/',
	server: {
		/* Dev. server only */
		port: DEV_PORT,
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['es', 'en'],
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en',
					es: 'es',
				},
			},
		}),
		tailwind(),
		robotsTxt(),
		NetlifyCMS({
			config,
		}),
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
				'akar-icons': ['*'],
			},
		}),
	],
	vite: {
		ssr: {
			external: ['svgo'],
		},
		plugins: [],
	},
	markdown: {
		remarkPlugins: [remarkToc, remarkReadingTime],
		gfm: true,
	},
	image: {
		domains: ['avatars.githubusercontent.com', 'yunielacosta.com'],
		service: sharpImageService(),
	},
});
