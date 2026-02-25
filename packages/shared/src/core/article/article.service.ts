/**
 * Service layer for managing Article-related operations
 * @module ArticleService
 */

import { getCollection } from "astro:content";
import type { Lang } from "@/i18n";
import {
	type BaseContentCriteria,
	createContentEntryFilter,
} from "../content-filter";
import type { ArticleCriteria } from "./article.criteria";
import { toArticles, toExternalArticles } from "./article.mapper";
import type Article from "./article.model";

const toBaseCriteria = (
	criteria: ArticleCriteria | undefined,
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

const createArticleFilter = (
	criteria: ArticleCriteria | undefined,
	options: { includeFeatured: boolean },
) => {
	return createContentEntryFilter(toBaseCriteria(criteria), {
		applyFeaturedFilter: options.includeFeatured,
		featured: criteria?.featured,
	});
};

/**
 * Retrieves articles from the content collection with filtering options
 * @async
 * @param {ArticleCriteria} criteria - Criteria for filtering articles
 * @returns {Promise<Article[]>} A promise that resolves to an array of filtered Article objects
 */
export async function getArticles(
	criteria?: ArticleCriteria,
): Promise<Article[]> {
	const filter = createArticleFilter(criteria, { includeFeatured: true });
	const articles = await getCollection("articles", filter);

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
	criteria?: ArticleCriteria,
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

/**
 * Retrieves all articles including both regular and external articles
 * @async
 * @param {ArticleCriteria} criteria - Criteria for filtering articles
 * @returns {Promise<Article[]>} A promise that resolves to an array of combined Article objects
 */
export async function getAllArticlesIncludingExternal(
	criteria?: ArticleCriteria,
): Promise<Article[]> {
	const regularFilter = createArticleFilter(criteria, {
		includeFeatured: true,
	});
	const externalFilter = createArticleFilter(criteria, {
		includeFeatured: false,
	});

	const regularArticles = await getCollection("articles", regularFilter);
	const externalArticles = await getCollection(
		"externalArticles",
		externalFilter,
	);

	// Combine and map both collections
	const mappedRegular = await toArticles(regularArticles);
	const mappedExternal = await toExternalArticles(externalArticles);
	const combined = [...mappedRegular, ...mappedExternal];

	// Deduplicate by id (in case same article exists in both collections)
	const seen = new Set<string>();
	const deduplicated = combined.filter((article) => {
		if (seen.has(article.id)) return false;
		seen.add(article.id);
		return true;
	});

	return deduplicated;
}
