import { type CollectionEntry } from 'astro:content'

import { randomInt } from '../utils/utilities'
const MAX_ID = 1000000
export interface IRole {
	role?: string
	startDate?: Date | string
	endDate?: Date | string
	achievements?: string[]
	getIdentifier: () => number
}

export interface IJob {
	id?: number
	title?: string
	lang?: string
	company?: string
	icon?: string
	location?: string
	url?: string
	published: boolean
	roles?: IRole[]
	createDate?: Date | string
}

export class Role implements IRole {
	id: number = randomInt(1, MAX_ID)
	role: string = ''
	startDate?: Date | string
	endDate?: Date | string
	achievements: string[] = []

	constructor(data: Partial<IRole> = {}) {
		Object.assign(this, data)
	}

	public getIdentifier: () => number = () => this.id ?? randomInt(1, 1000000)
}

export class Job implements IJob {
	id: number = randomInt(1, MAX_ID)
	title: string = ''
	lang: string = 'en'
	company: string = ''
	icon: string = ''
	location: string = ''
	url: string = ''
	published: boolean = false
	roles: IRole[] = []
	createDate?: Date | string

	constructor(data: Partial<IJob> = {}) {
		Object.assign(this, data)
	}
}

export const jsonToJob = (json: CollectionEntry<'jobs'>): IJob => {
	return {
		id: json.id || randomInt(1, MAX_ID),
		title: json.data?.title,
		lang: json.data?.lang,
		company: json.data?.company,
		icon: json.data?.icon,
		location: json.data?.location,
		url: json.data?.url,
		published: json.data?.published,
		createDate: json.data?.createDate,
		roles: json.data?.roles?.map((role) => {
			return new Role({
				role: role.role,
				startDate: role.startDate,
				endDate: role.endDate,
				achievements: role.achievements
			})
		})
	}
}
