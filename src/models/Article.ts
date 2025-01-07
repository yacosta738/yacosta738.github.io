import type { CollectionEntry } from 'astro:content';

export interface Article {
	id: string;
	url: string;
	title: string;
	description: string;
	date: string | Date;
	cover: string;
	author: string;
	timeToRead: number;

	tags: string[];
	categories: string[];
	draft: boolean;
	content: string;
}

export const jsonToArticle = async (json: CollectionEntry<'blog'>): Promise<Article> => {
	const article = json.data;
	const { remarkPluginFrontmatter } = await json.render();
	let content = '';
	if (json.data) {
		content = json.body;
	}
	return {
		id: json.id || crypto.randomUUID(),
		url: json.slug,
		title: article?.title,
		description: article?.description,
		date: article?.date,
		cover: article?.cover,
		author: article?.author,
		timeToRead: remarkPluginFrontmatter?.minutesRead || 0,
		tags: article?.tags,
		categories: article?.categories,
		draft: article?.draft,
		content,
	};
};
