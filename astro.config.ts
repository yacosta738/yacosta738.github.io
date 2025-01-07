import { defineConfig, sharpImageService } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import remarkToc from 'remark-toc';
import icon from 'astro-icon';
import vue from '@astrojs/vue';

const DEV_PORT: number = 4321;

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
		vue(),
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
