import { v4 as uuidv4 } from 'uuid'
export interface Article {
	id: string;
	url: string
	title: string
	description: string
	date: string | Date
	cover: string
	author: string
	timeToRead: number
	lang: string
	tags: string[]
	categories: string[]
	draft: boolean
	content: string
}

export const jsonToArticle = (json: any): Article => {
	return {
		id: json.id || uuidv4(),
		url: json.url,
		title: json.frontmatter.title,
		description: json.frontmatter.description,
		date: json.frontmatter.date,
		cover: json.frontmatter.cover,
		author: json.frontmatter.author,
		timeToRead: json.frontmatter.minutesRead,
		lang: json.frontmatter.lang,
		tags: json.frontmatter.tags,
		categories: json.frontmatter.categories,
		draft: json.frontmatter.draft,
		content: json.rawContent()
	}
}
