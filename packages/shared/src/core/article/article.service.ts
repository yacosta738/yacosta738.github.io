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
import {
	toArticles,
	toExternalArticles,
	toNotionArticles,
} from "./article.mapper";
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

const getSortDate = (article: Article): Date => {
	if (article.date) {
		return article.date;
	}

	if (article.lastModified) {
		return article.lastModified;
	}

	return new Date(0);
};

const sortArticles = (articles: Article[]): Article[] => {
	return [...articles].sort(
		(a, b) => getSortDate(b).valueOf() - getSortDate(a).valueOf(),
	);
};

const mergeArticles = (
	primary: Article[],
	secondary: Article[],
	context: string,
): Article[] => {
	const seen = new Set(primary.map((article) => article.id));
	const merged = [...primary];

	for (const article of secondary) {
		if (seen.has(article.id)) {
			console.warn(
				`Duplicate article id detected (${context}): ${article.id}. Keeping primary entry.`,
			);
			continue;
		}
		seen.add(article.id);
		merged.push(article);
	}

	return merged;
};

const deduplicateArticles = (articles: Article[]): Article[] => {
	const seen = new Set<string>();
	return articles.filter((article) => {
		if (seen.has(article.id)) {
			return false;
		}
		seen.add(article.id);
		return true;
	});
};

const shouldLoadNotion = (): boolean => import.meta.env.NOTION_LOADER === "1";

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
	const notionArticles = shouldLoadNotion()
		? await getCollection("notionArticles", filter)
		: [];

	const mappedArticles = await toArticles(articles);
	const mappedNotion = await toNotionArticles(notionArticles);
	const combined = mergeArticles(
		mappedArticles,
		mappedNotion,
		"articles/notionArticles",
	);

	return sortArticles(combined);
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
	const notionArticles = shouldLoadNotion()
		? await getCollection("notionArticles", regularFilter)
		: [];
	const externalArticles = await getCollection(
		"externalArticles",
		externalFilter,
	);

	// Combine and map both collections
	const mappedRegular = await toArticles(regularArticles);
	const mappedNotion = await toNotionArticles(notionArticles);
	const mappedExternal = await toExternalArticles(externalArticles);
	const merged = mergeArticles(
		mappedRegular,
		mappedNotion,
		"articles/notionArticles",
	);
	const combined = deduplicateArticles([...merged, ...mappedExternal]);

	return sortArticles(combined);
}
