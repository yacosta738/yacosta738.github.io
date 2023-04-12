export interface Role {
	role?: string
	startDate?: Date | string
	endDate?: Date | string
	achievements?: string[]
}

export interface Job {
	id?: string
	title?: string
	lang?: string
	company?: string
	icon?: string
	location?: string
	url?: string
	published: boolean
	roles?: Role[]
	createDate?: Date | string
}
