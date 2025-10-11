import { faker } from "@faker-js/faker";
import type Author from "@/core/author/author.model";
import type { Social } from "@/core/author/author.model";

/**
 * Generates a mock social media profile
 * @returns A mock Social object
 */
function generateMockSocial(): Social {
	const socialPlatforms = [
		"twitter",
		"github",
		"linkedin",
		"facebook",
		"instagram",
	];
	const platform = faker.helpers.arrayElement(socialPlatforms);

	return {
		name: platform.charAt(0).toUpperCase() + platform.slice(1),
		url: `https://${platform}.com/${faker.internet.username()}`,
		icon: platform,
	};
}

/**
 * Generate a single mock author with random data
 * @param overrides - Optional properties to override default random values
 * @returns A mock Author object
 */
export function generateMockAuthor(overrides?: Partial<Author>): Author {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const fullName = `${firstName} ${lastName}`;

	const slug = faker.helpers.slugify(fullName.toLowerCase());
	return {
		id: `en/${slug}`,
		slug,
		name: fullName,
		email: faker.internet.email({ firstName, lastName }),
		avatar: faker.image.avatar(),
		bio: faker.lorem.paragraph(),
		location: `${faker.location.city()}, ${faker.location.country()}`,
		socials: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
			generateMockSocial(),
		),
		...overrides,
	};
}

/**
 * Generate multiple mock authors with random data
 * @param count - Number of authors to generate
 * @param overrides - Optional properties to override for all authors
 * @returns An array of mock Author objects
 */
export function generateMockAuthors(
	count = 3,
	overrides?: Partial<Author>,
): Author[] {
	return Array.from({ length: count }, () => generateMockAuthor(overrides));
}
