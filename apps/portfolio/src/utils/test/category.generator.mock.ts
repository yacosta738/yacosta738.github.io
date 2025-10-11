import { faker } from "@faker-js/faker";
import type Category from "@/core/category/category.model";

/**
 * Generates a single mock category with random data
 * @param overrides Optional properties to override default random values
 * @returns A mock Category object
 */
export function generateMockCategory(overrides?: Partial<Category>): Category {
	const title = faker.word.sample();
	const slug = faker.helpers.slugify(title.toLowerCase());
	return {
		id: `en/${slug}`,
		slug,
		title,
		...overrides,
	};
}

/**
 * Generates an array of mock categories
 * @param count Number of categories to generate (default: 3)
 * @param overrides Optional properties to override default random values
 * @returns Array of mock Category objects
 */
export function generateMockCategories(
	count = 3,
	overrides?: Partial<Category>,
): Category[] {
	return Array.from({ length: count }, () => generateMockCategory(overrides));
}
