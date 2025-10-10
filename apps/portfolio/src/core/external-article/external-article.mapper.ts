import { type CollectionEntry, getEntries, getEntry } from "astro:content";
import { toAuthor } from "../author";
import { toCategory } from "../category";
import { toTag } from "../tag";
import type ExternalArticle from "./external-article.model";

/**
 * Maps a collection entry of type "externalArticles" to an ExternalArticle object.
 *
 * @param externalArticleData - The collection entry containing external article data
 * @throws {Error} If the author is not found for the external article
 * @throws {Error} If the category is not found for the external article
 * @returns Promise containing the mapped ExternalArticle object
 */
export async function toExternalArticle(
	externalArticleData: CollectionEntry<"externalArticles">,
): Promise<ExternalArticle> {
	const author = await getEntry(externalArticleData.data.author);
	const category = await getEntry(externalArticleData.data.category);
	const tags = await getEntries(externalArticleData.data.tags);

	if (!author) {
		throw new Error(
			`Author not found for external article: ${externalArticleData.id}`,
		);
	}
	if (!category) {
		throw new Error(
			`Category not found for external article: ${externalArticleData.id}`,
		);
	}

	return {
		id: externalArticleData.id,
		title: externalArticleData.data.title,
		description: externalArticleData.data.description,
		author: toAuthor(author),
		cover: externalArticleData.data.cover,
		tags: tags.map(toTag),
		category: toCategory(category),
		draft: externalArticleData.data.draft,
		date: new Date(externalArticleData.data.date),
		lastModified: externalArticleData.data.lastModified
			? new Date(externalArticleData.data.lastModified)
			: undefined,
		isExternal: externalArticleData.data.isExternal,
		link: externalArticleData.data.link,
		entry: externalArticleData,
	};
}

/**
 * Converts an array of external article collection entries to an array of ExternalArticle objects.
 *
 * @param externalArticles - Array of collection entries of type "externalArticles"
 * @returns Promise containing an array of mapped ExternalArticle objects
 */
export async function toExternalArticles(
	externalArticles: CollectionEntry<"externalArticles">[],
): Promise<ExternalArticle[]> {
	return Promise.all(externalArticles.map(toExternalArticle));
}
