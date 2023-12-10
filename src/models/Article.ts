import type { CollectionEntry } from 'astro:content'

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

export const jsonToArticle = async (json: CollectionEntry<'blog'>): Promise<Article> => {
	const article = json.data
	const { remarkPluginFrontmatter } = await json.render()
	let content = ''
	// check if json has rawContent()
	// if it does, it means it's a markdown file
	if (json.data) {
		content = json.body
	}
	const urlPrefix: string = '/posts/'
	return {
		id: json.id || crypto.randomUUID(),
		url: `${urlPrefix}${json.slug}`,
		title: article?.title,
		description: article?.description,
		date: article?.date,
		cover: article?.cover,
		author: article?.author,
		timeToRead: remarkPluginFrontmatter?.minutesRead || 0,
		lang: article?.lang,
		tags: article?.tags,
		categories: article?.categories,
		draft: article?.draft,
		content
	}
}
