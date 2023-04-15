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
