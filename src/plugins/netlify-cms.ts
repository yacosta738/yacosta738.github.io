import type { CmsConfig } from 'netlify-cms-core'
export const config: Omit<CmsConfig, 'load_config_file' | 'local_backend'> = {
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
				{ label: 'Link', name: 'link', widget: 'string', required: false },
				{ label: 'External Link', name: 'isExternalLink', widget: 'boolean', required: false },
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
				{ label: 'Enlace', name: 'link', widget: 'string', required: false },
				{ label: 'Enlace Externo', name: 'isExternalLink', widget: 'boolean', required: false },
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
