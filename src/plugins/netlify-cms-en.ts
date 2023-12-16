import type { CmsCollection } from 'netlify-cms-core'
export const collections: CmsCollection[] = [
	// Content collections
	{
		name: 'posts',
		label: 'Posts',
		folder: 'src/content/blog',
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
		name: 'roles',
		label: 'Roles',
		folder: 'src/content/jobs/roles',
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
		name: 'jobs',
		label: 'Jobs',
		folder: 'src/content/jobs',
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
		name: 'projects',
		label: 'Projects',
		folder: 'src/content/projects',
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
	}
]

export default collections
