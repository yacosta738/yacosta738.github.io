/**
 * Service layer for managing Article-related operations
 * @module ArticleService
 */

import { getCollection } from "astro:content";
import type { Lang } from "@/i18n";
import { parseEntityId } from "@/lib/collection.entity";
import type { ArticleCriteria } from "./article.criteria";
import { toArticles } from "./article.mapper";
import type Article from "./article.model";

/**
 * Retrieves articles from the content collection with filtering options
 * @async
 * @param {ArticleCriteria} criteria - Criteria for filtering articles
 * @returns {Promise<Article[]>} A promise that resolves to an array of filtered Article objects
 */
export async function getArticles(
	criteria?: ArticleCriteria,
): Promise<Article[]> {
	const {
		lang,
		includeDrafts = false,
		author,
		tags,
		category,
		featured,
	} = criteria || {};

	const articles = await getCollection("articles", ({ id, data }) => {
		// Always check draft status unless includeDrafts is true
		if (!includeDrafts && data.draft) return false;

		// Filter by language if provided
		if (lang) {
			const articleLang = parseEntityId(id).lang;
			if (articleLang !== lang) return false;
		}

		// Filter by author if provided
		if (author) {
			const authorsToMatch = Array.isArray(author) ? author : [author];
			if (!data.author || !authorsToMatch.includes(data.author.id))
				return false;
		}

		// Filter by tags if provided
		if (tags) {
			const tagsToMatch = Array.isArray(tags) ? tags : [tags];
			if (
				!data.tags ||
				!tagsToMatch.some((tag) => data.tags.some((t) => t.id === tag))
			)
				return false;
		}

		// Filter by category if provided
		if (category) {
			const categoriesToMatch = Array.isArray(category) ? category : [category];
			if (!data.category || !categoriesToMatch.includes(data.category.id))
				return false;
		}

		// Filter by featured status if provided
		if (featured !== undefined && data.featured !== featured) return false;

		return true;
	});

	return toArticles(articles);
}

/**
 * @deprecated Use getArticles({ lang }) instead
 */
export async function fetchPublishedArticles(lang: Lang): Promise<Article[]> {
	return getArticles({ lang });
}

/**
 * Retrieves a specific article by its ID
 * @async
 * @param {string} id - The unique identifier of the article to retrieve
 * @returns {Promise<Article | undefined>} A promise that resolves to either an Article object if found, or undefined if not found
 */
export async function getArticleById(id: string): Promise<Article | undefined> {
	const articles = await getArticles();
	return articles.find((article) => article.id === id);
}

/**
 * Checks if article exist based on given criteria
 * @async
 * @param {ArticleCriteria} criteria - Criteria for filtering article
 * @returns {Promise<boolean>} A promise that resolves to true if article exist, false otherwise
 */
export async function hasArticles(
	criteria: ArticleCriteria = { includeDrafts: false },
): Promise<boolean> {
	const articles = await getArticles(criteria);
	return articles.length > 0;
}

export async function getArticlesByAuthor(
	authorName: string,
	criteria?: ArticleCriteria,
): Promise<Article[]> {
	const articles = await getArticles(criteria);
	return articles.filter((article) => article.author.name === authorName);
}
