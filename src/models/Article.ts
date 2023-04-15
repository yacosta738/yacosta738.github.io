import { v4 as uuidv4 } from 'uuid'
export interface Article {
	id: string
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
	const frontmatter = json.frontmatter
	let content = ''
	// check if json has rawContent()
	// if it does, it means it's a markdown file
	if (json.rawContent) {
		content = json.rawContent()
	}
	return {
		id: json.id || uuidv4(),
		url: json.url,
		title: frontmatter?.title || json.title,
		description: frontmatter?.description || json.description,
		date: frontmatter?.date || json.date,
		cover: frontmatter?.cover || json.cover,
		author: frontmatter?.author || json.author,
		timeToRead: frontmatter?.minutesRead || json.timeToRead,
		lang: frontmatter?.lang || json.lang,
		tags: frontmatter?.tags || json.tags,
		categories: frontmatter?.categories || json.categories,
		draft: frontmatter?.draft || json.draft,
		content
	}
}
