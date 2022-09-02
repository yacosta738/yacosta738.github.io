export interface Article {
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
	console.log(json.frontmatter.minutesRead)
	return {
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
