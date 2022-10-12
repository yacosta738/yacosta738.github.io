import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './remark-reading-time.mjs'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import astroI18next from 'astro-i18next'
import image from '@astrojs/image'
import vue from '@astrojs/vue'
import robotsTxt from 'astro-robots-txt'
import NetlifyCMS from 'astro-netlify-cms'

import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
	site: 'https://yunielacosta.com/',
	experimental: {
		integrations: true
	},
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
		astroI18next(),
		image(),
		robotsTxt(),
		compress({
			html: false,
			css: false
		}),
		NetlifyCMS({
			config: {
				backend: {
					name: 'git-gateway',
					branch: 'main'
				},
				publish_mode: 'editorial_workflow',
				media_folder: 'public/uploads',
				public_folder: 'public/uploads',
				site_url: 'https://yunielacosta.com',
				display_url: 'https://yunielacosta.com',
				logo_url: 'https://yunielacosta.com/logo.svg',
				collections: [
					// Content collections
					{
						name: 'posts',
						label: 'Posts',
						folder: 'src/pages/blog',
						create: true,
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
						label_singular: 'Post',
						fields: [
							{ label: 'Title', name: 'title', widget: 'string' },
							{ label: 'Description', name: 'description', widget: 'string' },
							{ label: 'Date', name: 'date', widget: 'datetime' },
							{
								label: 'Language',
								name: 'lang',
								widget: 'select',
								options: ['en', 'es'],
								default: 'en'
							},
							{ label: 'Cover', name: 'cover', widget: 'image', required: false },
							{ label: 'Author', name: 'author', widget: 'string' },
							{
								label: 'Layout',
								name: 'layout',
								widget: 'hidden',
								default: '../../components/templates/BlogPostTemplate.astro'
							},
							{
								label: 'Tags',
								name: 'tags',
								widget: 'list',
								allow_add: true,
								default: ['IT']
							},
							{ label: 'Categories', name: 'categories', widget: 'list', required: false },
							{ label: 'Draft', name: 'draft', widget: 'boolean', default: false },
							{ label: 'Body', name: 'body', widget: 'markdown' }
						]
					},
					{
						name: 'posts_es',
						label: 'Artículos',
						folder: 'src/pages/es/blog',
						create: true,
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
						label_singular: 'Artículo',
						fields: [
							{ label: 'Título', name: 'title', widget: 'string' },
							{ label: 'Descripción', name: 'description', widget: 'string' },
							{ label: 'Fecha', name: 'date', widget: 'datetime' },
							{
								label: 'Idioma',
								name: 'lang',
								widget: 'select',
								options: ['en', 'es'],
								default: 'en'
							},
							{ label: 'Cover', name: 'cover', widget: 'image', required: false },
							{ label: 'Autor', name: 'author', widget: 'string' },
							{
								label: 'Layout',
								name: 'layout',
								widget: 'hidden',
								default: '../../components/templates/BlogPostTemplate.astro'
							},
							{
								label: 'Etiquetas',
								name: 'tags',
								widget: 'list',
								allow_add: true,
								default: ['IT']
							},
							{ label: 'Categoría', name: 'categories', widget: 'list', required: false },
							{ label: 'Draft', name: 'draft', widget: 'boolean', default: false },
							{ label: 'Body', name: 'body', widget: 'markdown' }
						]
					}
				]
			}
		}),
		vue()
	],
	vite: {
		ssr: {
			external: ['svgo']
		}
	},
	markdown: {
		extendDefaultPlugins: true,
		remarkPlugins: [remarkReadingTime]
	}
})
