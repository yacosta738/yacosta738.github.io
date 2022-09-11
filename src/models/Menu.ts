import { v4 as uuidv4 } from 'uuid'
export interface Menu {
	id: string
	title: string
	link: string
	dataCypress: string
}
export const navMenus: Menu[] = [
	{
		id: uuidv4(),
		title: 'about',
		link: '/#about',
		dataCypress: 'about'
	},
	{
		id: uuidv4(),
		title: 'experience',
		link: '/#jobs',
		dataCypress: 'jobs'
	},
	{
		id: uuidv4(),
		title: 'work',
		link: '/#projects',
		dataCypress: 'projects'
	},
	{
		id: uuidv4(),
		title: 'last-articles',
		link: '/#last3articles',
		dataCypress: 'last3articles'
	},
	{
		id: uuidv4(),
		title: 'contact',
		link: '/#contact',
		dataCypress: 'contact'
	},
	{
		id: uuidv4(),
		title: 'blog',
		link: '/blog',
		dataCypress: 'blog'
	}
]
