/**
 * Service module for handling Category-related operations.
 * @module CategoryService
 */

import { getCollection, getEntry } from "astro:content";
import { parseEntityId } from "@/lib/collection.entity";
import type { CategoryCriteria } from "./category.criteria";
import { toCategories, toCategory } from "./category.mapper";
import type Category from "./category.model";

/**
 * Retrieves categories from the content collection with filtering options
 * @async
 * @param {CategoryCriteria} criteria - Criteria for filtering categories
 * @returns {Promise<Category[]>} A promise that resolves to an array of filtered Category objects
 */
export const getCategories = async (
	criteria?: CategoryCriteria,
): Promise<Array<Category>> => {
	const { lang, title, orderMin, orderMax } = criteria || {};

	const categoriesCollection = await getCollection(
		"categories",
		({ id, data }) => {
			// Filter by language if provided
			if (lang) {
				const categoryLang = parseEntityId(id).lang;
				if (categoryLang !== lang) return false;
			}

			// Filter by title if provided
			if (title && !data.title.toLowerCase().includes(title.toLowerCase())) {
				return false;
			}

			// Filter by order range if provided
			if (
				orderMin !== undefined &&
				(data.order === undefined || data.order < orderMin)
			) {
				return false;
			}

			if (
				orderMax !== undefined &&
				(data.order === undefined || data.order > orderMax)
			) {
				return false;
			}

			return true;
		},
	);

	return toCategories(categoriesCollection);
};

/**
 * Retrieves a specific category by its ID.
 *
 * @param categoryId - The unique identifier of the category to retrieve
 * @returns A Promise that resolves to a Category object if found, undefined otherwise
 * @throws Will throw an error if the collection cannot be accessed
 */
export const getCategoryById = async (
	categoryId: string,
): Promise<Category | undefined> => {
	try {
		const entry = await getEntry("categories", categoryId);
		return entry ? toCategory(entry) : undefined;
	} catch (error) {
		console.error(`Failed to fetch category ${categoryId}:`, error);
		throw new Error(`Failed to fetch category ${categoryId}`);
	}
};
