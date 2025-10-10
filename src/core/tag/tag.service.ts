/**
 * Service module for handling Tag-related operations.
 * @module TagService
 */

import { getCollection, getEntry } from "astro:content";
import { parseEntityId } from "@/lib/collection.entity";
import type { TagCriteria } from "./tag.criteria";
import { toTag, toTags } from "./tag.mapper";
import type Tag from "./tag.model";

const tagsCache: Record<string, Tag[]> = {};

/**
 * Generates a cache key from tag criteria
 * @param {TagCriteria} criteria - The filtering criteria
 * @returns {string} A string key for caching
 */
function getCacheKey(criteria?: TagCriteria): string {
	if (!criteria) return "all";
	return JSON.stringify(criteria);
}

/**
 * Retrieves tags from the content collection with filtering options
 * Implements caching to improve performance on subsequent calls.
 * @async
 * @param {TagCriteria} criteria - Criteria for filtering tags
 * @returns {Promise<Tag[]>} A promise that resolves to an array of filtered Tag objects
 * @throws {Error} If the tags collection cannot be fetched
 */
export async function getTags(criteria?: TagCriteria): Promise<Tag[]> {
	const cacheKey = getCacheKey(criteria);

	if (tagsCache[cacheKey]) {
		return tagsCache[cacheKey];
	}

	try {
		const { lang, title } = criteria || {};

		const tags = await getCollection("tags", ({ id, data }) => {
			// Filter by language if provided
			if (lang) {
				const tagLang = parseEntityId(id).lang;
				if (tagLang !== lang) return false;
			}

			// Filter by title if provided
			if (title && !data.title.toLowerCase().includes(title.toLowerCase())) {
				return false;
			}

			return true;
		});

		const mappedTags = await toTags(tags);
		tagsCache[cacheKey] = mappedTags;
		return mappedTags;
	} catch (error) {
		console.error("Failed to fetch tags:", error);
		throw new Error("Failed to fetch tags");
	}
}

/**
 * Retrieves a specific tag by its ID.
 * @async
 * @param {string} id - The unique identifier of the tag
 * @returns {Promise<Tag | undefined>} A promise that resolves to a Tag object if found, undefined otherwise
 */
export async function getTagById(id: string): Promise<Tag | undefined> {
	try {
		const entry = await getEntry("tags", id);
		return entry ? toTag(entry) : undefined;
	} catch (error) {
		console.error(`Failed to fetch tag with id ${id}:`, error);
		throw new Error(`Failed to fetch tag with id ${id}`);
	}
}
