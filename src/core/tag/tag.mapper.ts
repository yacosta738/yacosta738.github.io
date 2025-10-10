/**
 * Maps collection entries of tags to Tag objects
 * @module TagMapper
 */

import type { CollectionEntry } from "astro:content";
import { cleanEntityId } from "@/lib/collection.entity";
import type Tag from "./tag.model";

/**
 * Converts a single tag collection entry to a Tag object
 * @param {CollectionEntry<"tags">} tagData - The tag collection entry to convert
 * @returns {Tag} A Tag object with id and title
 */
export function toTag(tagData: CollectionEntry<"tags">): Tag {
	const fallbackSlug = cleanEntityId(tagData.id);
	const slugFromData = tagData.data.slug?.trim();
	const title = tagData.data.title.trim();

	// Create slug from title with ReDoS-safe transformations
	// Limit input length to prevent excessive processing
	const maxLength = 200;
	const truncatedTitle =
		title.length > maxLength ? title.slice(0, maxLength) : title;

	const slugFromTitle = truncatedTitle
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		// Use non-greedy quantifier and avoid catastrophic backtracking
		.replace(/[^a-z0-9]+?/g, "-")
		// Remove leading/trailing dashes with bounded operations
		.replace(/^-/, "")
		.replace(/-$/, "");

	const slug =
		slugFromData && slugFromData.length > 0
			? slugFromData
			: slugFromTitle.length > 0
				? slugFromTitle
				: fallbackSlug;

	return {
		id: tagData.id,
		slug,
		title,
	};
}
/**
 * Converts an array of tag collection entries to Tag objects
 * @param {CollectionEntry<"tags">[]} tags - Array of tag collection entries
 * @returns {Promise<Tag[]>} Promise that resolves to an array of Tag objects
 */
export async function toTags(tags: CollectionEntry<"tags">[]): Promise<Tag[]> {
	return tags.map(toTag);
}
