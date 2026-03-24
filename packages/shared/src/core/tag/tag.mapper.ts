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
	const fallbackSlug = cleanEntityId(tagData.id).replace(/^tags\//, "");
	const title = tagData.data.title.trim();

	// Create slug from title with ReDoS-safe transformations
	// Limit input length to prevent excessive processing
	const maxLength = 200;
	let truncatedTitle = title;
	if (truncatedTitle.length > maxLength) {
		truncatedTitle = truncatedTitle.slice(0, maxLength);
	}

	const slugFromTitle = truncatedTitle
		.toLowerCase()
		.normalize("NFD")
		.replaceAll(/[\u0300-\u036f]/g, "")
		// Use split-join pattern instead of regex with + to prevent potential ReDoS
		.split(/[^a-z0-9]+/)
		.filter(Boolean)
		.join("-")
		// Remove leading/trailing dashes with separate anchored replacements (no alternation = no backtracking)
		.replace(/^-+/, "")
		.replace(/-+$/, "");

	let slug = fallbackSlug;
	if (slugFromTitle.length > 0) {
		slug = slugFromTitle;
	}

	return {
		id: tagData.id,
		slug,
		title,
	};
}
/**
 * Converts an array of tag collection entries to Tag objects
 * @param {CollectionEntry<"tags">[]} tags - Array of tag collection entries
 * @returns {Tag[]} Array of Tag objects
 */
export function toTags(tags: CollectionEntry<"tags">[]): Tag[] {
	return tags.map(toTag);
}
