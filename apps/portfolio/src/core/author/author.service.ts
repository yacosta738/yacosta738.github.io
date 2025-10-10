/**
 * Service module for handling Author-related operations.
 * @module AuthorService
 */

import { getCollection } from "astro:content";
import type { Lang } from "@/i18n";
import { parseEntityId } from "@/lib/collection.entity";
import type { AuthorCriteria } from "./author.criteria";
import { toAuthors } from "./author.mapper";
import type Author from "./author.model";

/**
 * Retrieves authors from the content collection with filtering options
 * @async
 * @param {AuthorCriteria} criteria - Criteria for filtering authors
 * @returns {Promise<Author[]>} A promise that resolves to an array of filtered Author objects
 */
export const getAuthors = async (
	criteria?: AuthorCriteria,
): Promise<Author[]> => {
	const { lang, name, location } = criteria || {};

	const authors = await getCollection("authors", ({ id, data }) => {
		// Filter by language if provided
		if (lang) {
			const authorLang = parseEntityId(id).lang;
			if (authorLang !== lang) return false;
		}

		// Filter by name if provided
		if (name && !data.name.toLowerCase().includes(name.toLowerCase())) {
			return false;
		}

		// Filter by location if provided
		if (
			location &&
			!data.location.toLowerCase().includes(location.toLowerCase())
		) {
			return false;
		}

		return true;
	});

	return toAuthors(authors);
};

/**
 * Retrieves a specific author by their ID.
 * @async
 * @param {string} id - The unique identifier of the author to retrieve.
 * @returns {Promise<Author | undefined>} A promise that resolves to an Author object if found, undefined otherwise.
 */
export const getAuthorById = async (
	id: string,
): Promise<Author | undefined> => {
	const authors = await getAuthors();
	return authors.find((author) => author.id === id);
};

export const getAuthorBySlug = async (
	slug: string,
	lang: Lang,
): Promise<Author | undefined> => {
	const authors = await getAuthors({ lang });
	return authors.find((author) => author.slug === slug);
};
