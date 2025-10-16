import { type CollectionEntry, getEntries, getEntry } from "astro:content";
import { toAuthor } from "../author";
import { toCategory } from "../category";
import { toTag } from "../tag";
import type Article from "./article.model";

/**
 * Maps a collection entry of type "articles" to an Article object.
 *
 * @param articleData - The collection entry containing article data
 * @throws {Error} If the author is not found for the article
 * @throws {Error} If the category is not found for the article
 * @returns Promise containing the mapped Article object
 */
export async function toArticle(
	articleData: CollectionEntry<"articles">,
): Promise<Article> {
	const author = await getEntry(articleData.data.author);
	const category = await getEntry(articleData.data.category);
	const tags = await getEntries(articleData.data.tags);

	if (!author) {
		throw new Error(`Author not found for article: ${articleData.id}`);
	}
	if (!category) {
		throw new Error(`Category not found for article: ${articleData.id}`);
	}

	return {
		id: articleData.id,
		title: articleData.data.title,
		description: articleData.data.description,
		author: toAuthor(author),
		cover: articleData.data.cover,
		tags: tags.map(toTag),
		category: toCategory(category),
		featured: articleData.data.featured,
		draft: articleData.data.draft,
		body: articleData.body ?? "",
		date: new Date(articleData.data.date),
		lastModified: articleData.data.lastModified
			? new Date(articleData.data.lastModified)
			: undefined,
		entry: articleData,
	};
}

/**
 * Converts an array of article collection entries to an array of Article objects.
 *
 * @param articles - Array of collection entries of type "articles"
 * @returns Promise containing an array of mapped Article objects
 */
export async function toArticles(
	articles: CollectionEntry<"articles">[],
): Promise<Article[]> {
	return Promise.all(articles.map(toArticle));
}

/**
 * Maps a collection entry of type "externalArticles" to an Article object.
 *
 * @param articleData - The collection entry containing external article data
 * @throws {Error} If the author is not found for the article
 * @throws {Error} If the category is not found for the article
 * @returns Promise containing the mapped Article object
 */
export async function toExternalArticle(
	articleData: CollectionEntry<"externalArticles">,
): Promise<Article> {
	const author = await getEntry(articleData.data.author);
	const category = await getEntry(articleData.data.category);
	const tags = await getEntries(articleData.data.tags);

	if (!author) {
		throw new Error(`Author not found for external article: ${articleData.id}`);
	}
	if (!category) {
		throw new Error(
			`Category not found for external article: ${articleData.id}`,
		);
	}

	return {
		id: articleData.id,
		title: articleData.data.title,
		description: articleData.data.description,
		author: toAuthor(author),
		cover: articleData.data.cover,
		tags: tags.map(toTag),
		category: toCategory(category),
		featured: false, // externalArticles don't have featured field
		draft: articleData.data.draft ?? false,
		body: articleData.body ?? "",
		date: new Date(articleData.data.date),
		lastModified: articleData.data.lastModified
			? new Date(articleData.data.lastModified)
			: undefined,
		entry: articleData,
	};
}

/**
 * Converts an array of external article collection entries to an array of Article objects.
 *
 * @param articles - Array of collection entries of type "externalArticles"
 * @returns Promise containing an array of mapped Article objects
 */
export async function toExternalArticles(
	articles: CollectionEntry<"externalArticles">[],
): Promise<Article[]> {
	return Promise.all(articles.map(toExternalArticle));
}
