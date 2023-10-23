export interface Menu {
	id: string
	title: string
	link: string
	dataCypress: string
}
export const navMenus: Menu[] = [
	{
		id: 'about-' + crypto.randomUUID(),
		title: 'about',
		link: '/#about',
		dataCypress: 'about'
	},
	{
		id: 'experience-' + crypto.randomUUID(),
		title: 'experience',
		link: '/#jobs',
		dataCypress: 'jobs'
	},
	{
		id: 'projects-' + crypto.randomUUID(),
		title: 'work',
		link: '/#projects',
		dataCypress: 'projects'
	},
	{
		id: 'last-articles-' + crypto.randomUUID(),
		title: 'last-articles',
		link: '/#last3articles',
		dataCypress: 'last3articles'
	},
	{
		id: 'contact-' + crypto.randomUUID(),
		title: 'contact',
		link: '/#contact',
		dataCypress: 'contact'
	},
	{
		id: 'blog-' + crypto.randomUUID(),
		title: 'blog',
		link: '/blog',
		dataCypress: 'blog'
	}
]
