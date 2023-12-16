import type { CmsCollection } from 'netlify-cms-core'
export const collections: CmsCollection[] = [
	// Content collections
	{
		name: 'tech',
		label: 'Tech',
		folder: 'src/content/technologies',
		slug: '{{id}}',
		create: true,
		extension: 'json',
		fields: [
			{ label: 'ID', name: 'id', widget: 'string' },
			{ label: 'Name', name: 'name', widget: 'string' },
			{ label: 'Icon', name: 'icon', widget: 'string' },
			{ label: 'url', name: 'url', widget: 'string' }
		]
	}
]

export default collections
