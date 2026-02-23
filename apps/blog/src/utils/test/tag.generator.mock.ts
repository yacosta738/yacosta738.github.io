import { faker } from "@faker-js/faker";
import type Tag from "@/core/tag/tag.model";

/**
 * Generates a single mock tag with random data
 * @param overrides Optional properties to override default random values
 * @returns A mock Tag object
 */
export function generateMockTag(overrides?: Partial<Tag>): Tag {
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
 * Generates an array of mock tags
 * @param count Number of tags to generate (default: 3)
 * @param overrides Optional properties to override default random values
 * @returns Array of mock Tag objects
 */
export function generateMockTags(count = 3, overrides?: Partial<Tag>): Tag[] {
	return Array.from({ length: count }, () => generateMockTag(overrides));
}
