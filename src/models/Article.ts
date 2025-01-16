import type { Author } from '@models:Author';
import type { CollectionEntry } from 'astro:content';
import { getEntry, render } from 'astro:content';

export interface Article {
	id: string;
	url: string;
	title: string;
	description: string;
	date: string | Date;
	cover: string;
	author: Author;
	timeToRead: number;
	tags: CollectionEntry<'tags'>[];
	categories: CollectionEntry<'categories'>[];
	draft: boolean;
	content: string;
}

export const jsonToArticle = async (json: CollectionEntry<'blog'>): Promise<Article> => {
	const article = json.data;
	const { remarkPluginFrontmatter } = await render(json);
	let content = '';
	if (json.data) {
		content = json.body || '';
	}

	// Fetch the full author data
	const authorEntry = await getEntry('authors', article.author.id);
	const author = authorEntry?.data as Author;

	return {
		id: json.id || crypto.randomUUID(),
		url: json.id,
		title: article?.title,
		description: article?.description,
		date: article?.date,
		cover: article?.cover,
		author,
		timeToRead: remarkPluginFrontmatter?.minutesRead || 0,
		tags: (await Promise.all(
			article?.tags.map(async (tag) => {
				const tagEntry = await getEntry('tags', tag.id);
				return tagEntry;
			})
		)).filter((tag) => tag !== undefined) as CollectionEntry<'tags'>[],
		categories: (await Promise.all(
			article?.categories.map(async (category) => {
				const categoryEntry = await getEntry('categories', category.id);
				return categoryEntry;
			})
		)).filter((category) => category !== undefined) as CollectionEntry<'categories'>[],
		draft: article?.draft,
		content,
	};
};
