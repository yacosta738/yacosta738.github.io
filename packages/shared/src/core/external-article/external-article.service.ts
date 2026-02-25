/**
 * Service layer for managing ExternalArticle-related operations
 * @module ExternalArticleService
 */

import { getCollection } from "astro:content";
import {
	type BaseContentCriteria,
	createContentEntryFilter,
} from "../content-filter";
import type { ExternalArticleCriteria } from "./external-article.criteria";
import { toExternalArticles } from "./external-article.mapper";
import type ExternalArticle from "./external-article.model";

const toBaseCriteria = (
	criteria: ExternalArticleCriteria | undefined,
): BaseContentCriteria | undefined => {
	if (criteria === undefined) {
		return undefined;
	}

	return {
		lang: criteria.lang,
		includeDrafts: criteria.includeDrafts,
		author: criteria.author,
		tags: criteria.tags,
		category: criteria.category,
	};
};

const createExternalArticleFilter = (
	criteria: ExternalArticleCriteria | undefined,
) => {
	return createContentEntryFilter(toBaseCriteria(criteria), {
		applyFeaturedFilter: false,
	});
};

/**
 * Retrieves external articles from the content collection with filtering options
 * @async
 * @param {ExternalArticleCriteria} criteria - Criteria for filtering external articles
 * @returns {Promise<ExternalArticle[]>} A promise that resolves to an array of filtered ExternalArticle objects
 */
export async function getExternalArticles(
	criteria?: ExternalArticleCriteria,
): Promise<ExternalArticle[]> {
	const filter = createExternalArticleFilter(criteria);
	const externalArticles = await getCollection("externalArticles", filter);

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
	criteria?: ExternalArticleCriteria,
): Promise<boolean> {
	const externalArticles = await getExternalArticles(criteria);
	return externalArticles.length > 0;
}
