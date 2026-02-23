/**
 * Service layer for managing ExternalArticle-related operations
 * @module ExternalArticleService
 */

import { getCollection } from "astro:content";
import { parseEntityId } from "@/lib/collection.entity";
import type { ExternalArticleCriteria } from "./external-article.criteria";
import { toExternalArticles } from "./external-article.mapper";
import type ExternalArticle from "./external-article.model";

/**
 * Retrieves external articles from the content collection with filtering options
 * @async
 * @param {ExternalArticleCriteria} criteria - Criteria for filtering external articles
 * @returns {Promise<ExternalArticle[]>} A promise that resolves to an array of filtered ExternalArticle objects
 */
export async function getExternalArticles(
	criteria?: ExternalArticleCriteria,
): Promise<ExternalArticle[]> {
	const {
		lang,
		includeDrafts = false,
		author,
		tags,
		category,
	} = criteria || {};

	const externalArticles = await getCollection(
		"externalArticles",
		({ id, data }) => {
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
				const categoriesToMatch = Array.isArray(category)
					? category
					: [category];
				if (!data.category || !categoriesToMatch.includes(data.category.id))
					return false;
			}

			return true;
		},
	);

	return toExternalArticles(externalArticles);
}

/**
 * Retrieves a specific external article by its ID
 * @async
 * @param {string} id - The unique identifier of the external article to retrieve
 * @returns {Promise<ExternalArticle | undefined>} A promise that resolves to either an ExternalArticle object if found, or undefined if not found
 */
export async function getExternalArticleById(
	id: string,
): Promise<ExternalArticle | undefined> {
	const externalArticles = await getExternalArticles();
	return externalArticles.find((externalArticle) => externalArticle.id === id);
}

/**
 * Checks if external articles exist based on given criteria
 * @async
 * @param {ExternalArticleCriteria} criteria - Criteria for filtering external articles
 * @returns {Promise<boolean>} A promise that resolves to true if external articles exist, false otherwise
 */
export async function hasExternalArticles(
	criteria: ExternalArticleCriteria = { includeDrafts: false },
): Promise<boolean> {
	const externalArticles = await getExternalArticles(criteria);
	return externalArticles.length > 0;
}
