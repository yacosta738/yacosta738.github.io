import { type CollectionEntry, getEntries, getEntry } from "astro:content";
import { toAuthor } from "../author";
import { toCategory } from "../category";
import { toTag } from "../tag";
import type Article from "./article.model";

const isStringReference = (value: unknown): value is string =>
	typeof value === "string" && value.trim().length > 0;

const isObjectReference = (
	value: unknown,
): value is { collection: string; id: string } =>
	typeof value === "object" &&
	value !== null &&
	"collection" in value &&
	"id" in value &&
	typeof (value as { collection?: unknown }).collection === "string" &&
	(value as { collection: string }).collection.trim().length > 0 &&
	typeof (value as { id?: unknown }).id === "string" &&
	(value as { id: string }).id.trim().length > 0;

const isValidReference = (
	value: unknown,
): value is string | { collection: string; id: string } =>
	isStringReference(value) || isObjectReference(value);

type EntryWithId = { id?: string };

const mapEntriesSafe = async <T extends EntryWithId, U>(
	entries: T[],
	mapper: (entry: T) => Promise<U>,
	context: string,
): Promise<U[]> => {
	const results = await Promise.allSettled(entries.map(mapper));
	return results.flatMap((result, index) => {
		if (result.status === "fulfilled") {
			return [result.value];
		}
		const id = entries[index]?.id ?? "unknown";
		const message =
			result.reason instanceof Error
				? result.reason.message
				: String(result.reason);
		console.warn(`Skipping ${context} entry ${id}: ${message}`);
		return [];
	});
};

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
	const authorRef = articleData.data.author;
	const categoryRef = articleData.data.category;
	const author = isValidReference(authorRef)
		? await getEntry(authorRef)
		: undefined;
	const category = isValidReference(categoryRef)
		? await getEntry(categoryRef)
		: undefined;
	const tagRefs = (articleData.data.tags ?? []).filter(isValidReference);
	const tags = await getEntries(tagRefs);
	const tagEntries = tags.filter((tag): tag is CollectionEntry<"tags"> =>
		Boolean(tag),
	);

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
		tags: tagEntries.map(toTag),
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
	return mapEntriesSafe(articles, toArticle, "article");
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
	const authorRef = articleData.data.author;
	const categoryRef = articleData.data.category;
	const author = isValidReference(authorRef)
		? await getEntry(authorRef)
		: undefined;
	const category = isValidReference(categoryRef)
		? await getEntry(categoryRef)
		: undefined;
	const tagRefs = (articleData.data.tags ?? []).filter(isValidReference);
	const tags = await getEntries(tagRefs);
	const tagEntries = tags.filter((tag): tag is CollectionEntry<"tags"> =>
		Boolean(tag),
	);

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
		tags: tagEntries.map(toTag),
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
	return mapEntriesSafe(articles, toExternalArticle, "external article");
}

/**
 * Maps a collection entry of type "notionArticles" to an Article object.
 *
 * @param articleData - The collection entry containing Notion article data
 * @throws {Error} If the author is not found for the article
 * @throws {Error} If the category is not found for the article
 * @returns Promise containing the mapped Article object
 */
export async function toNotionArticle(
	articleData: CollectionEntry<"notionArticles">,
): Promise<Article> {
	const fallbackAuthorId = articleData.id.startsWith("es/")
		? "es/yuniel-acosta-perez"
		: "en/yuniel-acosta-perez";
	const authorRef = articleData.data.author;
	const categoryRef = articleData.data.category;
	const primaryAuthor = isValidReference(authorRef)
		? await getEntry(authorRef)
		: undefined;
	const author = primaryAuthor ?? (await getEntry("authors", fallbackAuthorId));
	const category = isValidReference(categoryRef)
		? await getEntry(categoryRef)
		: undefined;
	const tagRefs = (articleData.data.tags ?? []).filter(isValidReference);
	const tags = await getEntries(tagRefs);
	const tagEntries = tags.filter((tag): tag is CollectionEntry<"tags"> =>
		Boolean(tag),
	);

	if (!author) {
		throw new Error(`Author not found for notion article: ${articleData.id}`);
	}
	if (!category) {
		const fallbackCategoryId = articleData.id.startsWith("es/")
			? "es/software-development"
			: "en/software-development";
		const fallbackCategory = await getEntry("categories", fallbackCategoryId);
		if (!fallbackCategory) {
			throw new Error(
				`Category not found for notion article: ${articleData.id}`,
			);
		}
		return {
			id: articleData.id,
			title: articleData.data.title,
			description: articleData.data.description,
			author: toAuthor(author),
			cover: articleData.data.cover,
			tags: tagEntries.map(toTag),
			category: toCategory(fallbackCategory),
			featured: articleData.data.featured ?? false,
			draft: articleData.data.draft ?? false,
			body: articleData.body ?? "",
			date: new Date(articleData.data.date),
			lastModified: articleData.data.lastModified
				? new Date(articleData.data.lastModified)
				: undefined,
			entry: articleData,
		};
	}

	return {
		id: articleData.id,
		title: articleData.data.title,
		description: articleData.data.description,
		author: toAuthor(author),
		cover: articleData.data.cover,
		tags: tagEntries.map(toTag),
		category: toCategory(category),
		featured: articleData.data.featured ?? false,
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
 * Converts an array of Notion article collection entries to an array of Article objects.
 *
 * @param articles - Array of collection entries of type "notionArticles"
 * @returns Promise containing an array of mapped Article objects
 */
export async function toNotionArticles(
	articles: CollectionEntry<"notionArticles">[],
): Promise<Article[]> {
	return mapEntriesSafe(articles, toNotionArticle, "notion article");
}
