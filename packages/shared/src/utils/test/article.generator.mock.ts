import { faker } from "@faker-js/faker";
import type Article from "@/core/article/article.model";
import { generateMockAuthor } from "./author.generator.mock";
import { generateMockCategory } from "./category.generator.mock";
import { generateMockImage } from "./image.generator.mock";
import { generateMockTags } from "./tag.generator.mock";

/**
 * Generates a single mock article with random data
 * @param overrides Optional properties to override default random values
 * @returns A mock Article object
 */
export function generateMockArticle(overrides?: Partial<Article>): Article {
	const title = faker.lorem.sentence();
	const slug = faker.helpers.slugify(title.toLowerCase());
	return {
		id: `en/${slug}`,
		title,
		description: faker.lorem.paragraph(),
		author: generateMockAuthor(),
		cover: generateMockImage(),
		tags: generateMockTags(faker.number.int({ min: 1, max: 3 })),
		category: generateMockCategory(),
		date: faker.date.past(),
		draft: false,
		body: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 5 })),
		lastModified: faker.datatype.boolean() ? faker.date.recent() : undefined,
		featured: faker.datatype.boolean(),
		...overrides,
	};
}

/**
 * Generates an array of mock articles
 * @param count Number of articles to generate (default: 5)
 * @param overrides Optional properties to override default random values for all articles
 * @returns Array of mock Article objects
 */
export function generateMockArticles(
	count = 5,
	overrides?: Partial<Article>,
): Article[] {
	return Array.from({ length: count }, () => generateMockArticle(overrides));
}
