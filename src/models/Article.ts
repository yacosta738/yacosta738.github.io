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

export const calculateTimeToRead = (content: string): number => {
	/*
    1. Get your total word count (including the headline and subhead).
    2. Divide total word count by 200. The number before the decimal is your minutes.
    3. Take the decimal points and multiply that number by .60. That will give you your seconds.
    */
	const totalWordCount = content?.split(/\s+/).length
	const minutes = Math.floor(totalWordCount / 200)
	const seconds = Math.round((totalWordCount / 200 - minutes) * 60)
	return minutes + seconds / 60
}

export const jsonToArticle = (json: any): Article => {
	return {
		url: json.url,
		title: json.frontmatter.title,
		description: json.frontmatter.description,
		date: json.frontmatter.date,
		cover: json.frontmatter.cover,
		author: json.frontmatter.author,
		timeToRead: calculateTimeToRead(json.rawContent()),
		lang: json.frontmatter.lang,
		tags: json.frontmatter.tags,
		categories: json.frontmatter.categories,
		draft: json.frontmatter.draft,
		content: json.rawContent()
	}
}
