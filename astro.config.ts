import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './remark-reading-time.mjs'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import astroI18next from 'astro-i18next'
import image from '@astrojs/image'
import vue from '@astrojs/vue'
import robotsTxt from 'astro-robots-txt'
import NetlifyCMS from 'astro-netlify-cms'
import { VitePWA } from 'vite-plugin-pwa'

import compress from 'astro-compress'
import { manifest } from './src/utils/seoConfig'

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
				locales: {
					en: 'en',
					fr: 'es'
				}
			}
		}),
		tailwind(),
		astroI18next(),
		image({
			serviceEntryPoint: '@astrojs/image/sharp'
		}),
		robotsTxt(),
		compress({
			html: true,
			css: true
		}),
		NetlifyCMS({
			config: {
				backend: {
					name: 'git-gateway',
					branch: 'master'
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
						slug: '{{slug}}',
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
							{
								label: 'Categories',
								name: 'categories',
								widget: 'list',
								allow_add: true,
								default: ['IT']
							},
							{ label: 'Draft', name: 'draft', widget: 'boolean', default: false },
							{ label: 'Body', name: 'body', widget: 'markdown' }
						]
					},
					{
						name: 'posts_es',
						label: 'Artículos',
						folder: 'src/pages/es/blog',
						create: true,
						slug: '{{slug}}',
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
								default: 'es'
							},
							{ label: 'Cover', name: 'cover', widget: 'image', required: false },
							{ label: 'Autor', name: 'author', widget: 'string' },
							{
								label: 'Layout',
								name: 'layout',
								widget: 'hidden',
								default: '../../../components/templates/BlogPostTemplate.astro'
							},
							{
								label: 'Etiquetas',
								name: 'tags',
								widget: 'list',
								allow_add: true,
								default: ['IT']
							},
							{
								label: 'Categories',
								name: 'categories',
								widget: 'list',
								allow_add: true,
								default: ['IT']
							},
							{ label: 'Draft', name: 'draft', widget: 'boolean', default: false },
							{ label: 'Body', name: 'body', widget: 'markdown' }
						]
					},
					{
						name: 'tech',
						label: 'Tech',
						folder: 'src/data/technologies',
						slug: '{{id}}',
						create: true,
						extension: 'json',
						fields: [
							{ label: 'ID', name: 'id', widget: 'string' },
							{ label: 'Name', name: 'name', widget: 'string' },
							{ label: 'Icon', name: 'icon', widget: 'string' },
							{ label: 'url', name: 'url', widget: 'string' }
						]
					},
					{
						name: 'jobs',
						label: 'Jobs',
						folder: 'src/data/jobs',
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
						create: true,
						extension: 'json',
						fields: [
							{ label: 'Title', name: 'title', widget: 'string' },
							{
								label: 'Lang',
								name: 'lang',
								widget: 'select',
								options: ['en', 'es'],
								default: 'en'
							},
							{ label: 'Role', name: 'role', widget: 'string' },
							{ label: 'Company', name: 'company', widget: 'string' },
							{ label: 'Start Date', name: 'startDate', widget: 'datetime' },
							{ label: 'End Date', name: 'endDate', widget: 'datetime', required: false },
							{ label: 'URL', name: 'url', widget: 'string', required: false },
							{ label: 'Published', name: 'published', widget: 'boolean', default: true },
							{
								label: 'Achievement',
								name: 'achievement',
								widget: 'list',
								allow_add: true,
								max: 4,
								label_singular: 'Achievement'
							}
						]
					},
					{
						name: 'jobs_es',
						label: 'Trabajos',
						folder: 'src/data/jobs/es',
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
						create: true,
						extension: 'json',
						fields: [
							{ label: 'Título', name: 'title', widget: 'string' },
							{
								label: 'Idioma',
								name: 'lang',
								widget: 'select',
								options: ['en', 'es'],
								default: 'es'
							},
							{ label: 'Role', name: 'role', widget: 'string' },
							{ label: 'Empresa', name: 'company', widget: 'string' },
							{ label: 'Fecha de inicio', name: 'startDate', widget: 'datetime' },
							{
								label: 'Fecha de finalización',
								name: 'endDate',
								widget: 'datetime',
								required: false
							},
							{ label: 'URL', name: 'url', widget: 'string', required: false },
							{ label: 'Publicado', name: 'published', widget: 'boolean', default: true },
							{
								label: 'Logros',
								name: 'achievement',
								widget: 'list',
								allow_add: true,
								max: 4,
								label_singular: 'Logro'
							}
						]
					},
					{
						name: 'projects',
						label: 'Projects',
						folder: 'src/data/projects',
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
						create: true,
						extension: 'json',
						fields: [
							{ label: 'Title', name: 'title', widget: 'string' },
							{
								label: 'Lang',
								name: 'lang',
								widget: 'select',
								options: ['en', 'es'],
								default: 'en'
							},
							{ label: 'Cover', name: 'cover', widget: 'image' },
							{ label: 'Date', name: 'date', widget: 'datetime' },
							{ label: 'Repository', name: 'repository', widget: 'string', required: false },
							{ label: 'URL', name: 'url', widget: 'string', required: false },
							{ label: 'Company', name: 'company', widget: 'string', required: false },
							{
								label: 'Technologies',
								name: 'tech',
								widget: 'relation',
								collection: 'tech',
								searchFields: ['name'],
								valueField: 'name',
								displayFields: ['name']
							},
							{
								label: 'Show in projects',
								name: 'showInProjects',
								widget: 'boolean',
								default: false
							},
							{ label: 'Featured', name: 'featured', widget: 'boolean', default: false },
							{ label: 'Priority', name: 'priority', widget: 'number', default: 0 },
							{ label: 'Published', name: 'published', widget: 'boolean', default: true },
							{ label: 'Content', name: 'content', widget: 'markdown' }
						]
					},
					{
						name: 'projects_es',
						label: 'Proyectos',
						folder: 'src/data/projects/es',
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
						create: true,
						extension: 'json',
						fields: [
							{ label: 'Título', name: 'title', widget: 'string' },
							{
								label: 'Idioma',
								name: 'lang',
								widget: 'select',
								options: ['en', 'es'],
								default: 'es'
							},
							{ label: 'Cover', name: 'cover', widget: 'image' },
							{ label: 'Fecha', name: 'date', widget: 'datetime' },
							{ label: 'Repositorio', name: 'repository', widget: 'string', required: false },
							{ label: 'URL', name: 'url', widget: 'string', required: false },
							{ label: 'Empresa', name: 'company', widget: 'string', required: false },
							{
								label: 'Tecnologías',
								name: 'tech',
								widget: 'relation',
								collection: 'tech',
								searchFields: ['name'],
								valueField: 'name',
								displayFields: ['name']
							},
							{
								label: 'Mostrar en proyectos',
								name: 'showInProjects',
								widget: 'boolean',
								default: false
							},
							{ label: 'Destacado', name: 'featured', widget: 'boolean', default: false },
							{ label: 'Prioridad', name: 'priority', widget: 'number', default: 0 },
							{ label: 'Publicado', name: 'published', widget: 'boolean', default: true },
							{ label: 'Contenido', name: 'content', widget: 'markdown' }
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
		},
		plugins: [
			VitePWA({
				registerType: 'autoUpdate',
				manifest,
				devOptions: {
					enabled: true
				},
				workbox: {
					globDirectory: 'dist',
					globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
					clientsClaim: true,
					skipWaiting: true,
					// Don't fallback on document based (e.g. `/some-page`) requests
					// This removes an errant console.log message from showing up.
					navigateFallback: null
				}
			})
		]
	},
	markdown: {
		extendDefaultPlugins: true,
		remarkPlugins: [remarkReadingTime]
	}
})
