import type { CollectionEntry } from "astro:content";
import { cleanEntityId } from "@/lib/collection.entity";
import type Category from "./category.model";

/**
 * Maps a category collection entry to a Category model
 * @param categoryData - The collection entry data for a category
 * @returns A Category model object
 */
export function toCategory(
	categoryData: CollectionEntry<"categories">,
): Category {
	if (!categoryData?.data) {
		throw new Error("Invalid category data: data object is missing");
	}

	const { data } = categoryData;
	if (!data.title) {
		throw new Error("Invalid category data: title is required");
	}

	return {
		id: categoryData.id,
		slug: cleanEntityId(categoryData.id),
		title: data.title,
		order: data.order ?? Number.MAX_SAFE_INTEGER, // Default to end of list
	};
}

/**
 * Maps an array of category collection entries to an array of Category models
 * @param categories - Array of category collection entries
 * @returns Array of Category model objects
 */
export function toCategories(
	categories: CollectionEntry<"categories">[],
): Category[] {
	return categories
		.map(toCategory)
		.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
