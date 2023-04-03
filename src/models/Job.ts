export interface Job {
	id?: string
	title?: string
	lang?: string
	role?: string
	startDate?: Date | string
	endDate?: Date | string
	company?: string
	location?: string
	url?: string
	published: boolean
	achievement?: string[]
}
