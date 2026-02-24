/**
 * Service layer for managing ExternalArticle-related operations
 * @module ExternalArticleService
 */

import { getCollection } from "astro:content";
import { parseEntityId } from "@/lib/collection.entity";
import type { ExternalArticleCriteria } from "./external-article.criteria";
import { toExternalArticles } from "./external-article.mapper";
import type ExternalArticle from "./external-article.model";

type FilterableExternalArticleData = {
	draft: boolean;
	author?: { id: string };
	tags?: Array<{ id: string }>;
	category?: { id: string };
};

type FilterableExternalArticleEntry = {
	id: string;
	data: FilterableExternalArticleData;
};

const matchesEntityId = (
	criteriaValue: string | ReadonlyArray<string> | undefined,
	entityId: string | undefined,
): boolean => {
	if (!criteriaValue) {
		return true;
	}

	if (!entityId) {
		return false;
	}

	const idsToMatch = Array.isArray(criteriaValue)
		? criteriaValue
		: [criteriaValue];

	return idsToMatch.includes(entityId);
};

const matchesTags = (
	criteriaTags: string | ReadonlyArray<string> | undefined,
	entryTags: ReadonlyArray<{ id: string }> | undefined,
): boolean => {
	if (!criteriaTags) {
		return true;
	}

	if (!entryTags) {
		return false;
	}

	const tagsToMatch = Array.isArray(criteriaTags)
		? criteriaTags
		: [criteriaTags];

	return tagsToMatch.some((tag) =>
		entryTags.some((entryTag) => entryTag.id === tag),
	);
};

const createExternalArticleFilter = (
	criteria: ExternalArticleCriteria | undefined,
) => {
	const {
		lang,
		includeDrafts = false,
		author,
		tags,
		category,
	} = criteria ?? {};

	return ({ id, data }: FilterableExternalArticleEntry): boolean => {
		if (!includeDrafts && data.draft) {
			return false;
		}

		if (lang && parseEntityId(id).lang !== lang) {
			return false;
		}

		if (!matchesEntityId(author, data.author?.id)) {
			return false;
		}

		if (!matchesTags(tags, data.tags)) {
			return false;
		}

		if (!matchesEntityId(category, data.category?.id)) {
			return false;
		}

		return true;
	};
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
	const resolvedCriteria = criteria ?? { includeDrafts: false };
	const externalArticles = await getExternalArticles(resolvedCriteria);
	return externalArticles.length > 0;
}
