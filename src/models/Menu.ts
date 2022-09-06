export interface Menu {
	id: string
	title: string
	link: string
	dataCypress: string
}
const idMax = 100
export const navMenus: Menu[] = [
	{
		id: `yap-${Math.floor(Math.random() * idMax)}`,
		title: 'about',
		link: '/#about',
		dataCypress: 'about'
	},
	{
		id: `yap-${Math.floor(Math.random() * idMax)}`,
		title: 'experience',
		link: '/#jobs',
		dataCypress: 'jobs'
	},
	{
		id: `yap-${Math.floor(Math.random() * idMax)}`,
		title: 'work',
		link: '/#projects',
		dataCypress: 'projects'
	},
	{
		id: `yap-${Math.floor(Math.random() * idMax)}`,
		title: 'last-articles',
		link: '/#last3articles',
		dataCypress: 'last3articles'
	},
	{
		id: `yap-${Math.floor(Math.random() * idMax)}`,
		title: 'contact',
		link: '/#contact',
		dataCypress: 'contact'
	},
	{
		id: `yap-${Math.floor(Math.random() * idMax)}`,
		title: 'blog',
		link: '/blog',
		dataCypress: 'blog'
	}
]
