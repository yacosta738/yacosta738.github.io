import { defineConfig } from 'astro/config'
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
import compress from 'astro-compress'
import critters from 'astro-critters'

// https://astro.build/config
export default defineConfig({
	site: 'https://yunielacosta.com/',
	integrations: [
		AstroPWA({
			mode: 'production',
			base: '/',
			scope: '/',
			includeAssets: ['favicons/favicon.ico'],
			registerType: 'autoUpdate',
			manifest: {
				name: 'Yuniel Acosta',
				short_name: 'YAP',
				theme_color: '#64ffda',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				navigateFallback: '/404',
				globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
			},
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
		compress({
			css: false
		}),
		critters({
			exclude: ['index.html', (file: string) => file === './dist/index.html']
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
							{ label: 'Draft', name: 'draft', widget: 'boolean', default: true },
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
							{ label: 'Draft', name: 'draft', widget: 'boolean', default: true },
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
						name: 'roles',
						label: 'Roles',
						folder: 'src/data/jobs/roles',
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
						create: true,
						extension: 'json',
						fields: [
							{ label: 'Role', name: 'role', widget: 'string' },
							{ label: 'Start Date', name: 'startDate', widget: 'datetime' },
							{ label: 'End Date', name: 'endDate', widget: 'datetime', required: false },
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
						name: 'roles_es',
						label: 'Roles',
						folder: 'src/data/jobs/roles/es',
						slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
						create: true,
						extension: 'json',
						fields: [
							{ label: 'Rol', name: 'role', widget: 'string' },
							{ label: 'Fecha de Inicio', name: 'startDate', widget: 'datetime' },
							{ label: 'Fecha de Fin', name: 'endDate', widget: 'datetime', required: false },
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
							{ label: 'Company', name: 'company', widget: 'string' },
							{ label: 'URL', name: 'url', widget: 'string', required: false },
							{ label: 'Icon', name: 'icon', widget: 'string' },
							{ label: 'Location', name: 'location', widget: 'string' },
							{ label: 'Create Date', name: 'createDate', widget: 'datetime' },
							{ label: 'Published', name: 'published', widget: 'boolean', default: true },
							{
								label: 'Roles',
								name: 'roles',
								widget: 'relation',
								collection: 'roles',
								search_fields: ['role'],
								value_field: 'role',
								display_fields: ['role']
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
							{ label: 'Empresa', name: 'company', widget: 'string' },
							{ label: 'URL', name: 'url', widget: 'string', required: false },
							{ label: 'Icono', name: 'icon', widget: 'string' },
							{ label: 'Ubicación', name: 'location', widget: 'string' },
							{ label: 'Fecha de Creación', name: 'createDate', widget: 'datetime' },
							{ label: 'Publicado', name: 'published', widget: 'boolean', default: true },
							{
								label: 'Roles',
								name: 'roles',
								widget: 'relation',
								collection: 'roles_es',
								search_fields: ['role'],
								value_field: 'role',
								display_fields: ['role']
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
								search_fields: ['name'],
								value_field: 'name',
								display_fields: ['name']
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
								search_fields: ['name'],
								value_field: 'name',
								display_fields: ['name']
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
		plugins: []
	},
	markdown: {
		remarkPlugins: [remarkToc, remarkReadingTime],
		gfm: true
	}
})
