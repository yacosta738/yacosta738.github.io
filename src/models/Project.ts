import { Tech } from './Tech'

export interface ProjectJson {
	id?: string
	title?: string
	lang?: string
	date?: string | Date
	cover?: string
	repository?: string
	url?: string
	company?: string
	tech?: string[]
	showInProjects?: boolean
	featured?: boolean
	published?: boolean
	content?: string
}

export interface Project {
	id?: string
	title?: string
	lang?: string
	date?: string | Date
	cover?: string
	repository?: string
	url?: string
	company?: string
	tech?: Tech[]
	showInProjects?: boolean
	featured?: boolean
	published?: boolean
	content?: string
}
