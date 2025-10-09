import type { CollectionEntry } from "astro:content";
import type Author from "./author.model";

/**
 * Maps author collection data to Author model
 * @param authorData - The author collection entry from Astro content
 * @returns An Author model object with all required properties
 */

export function toAuthor(authorData: CollectionEntry<"authors">): Author {
	if (!authorData?.data) {
		throw new Error("Invalid author data: data object is missing");
	}

	const { data } = authorData;
	if (!data.name) {
		throw new Error("Invalid author data: name is required");
	}

	return {
		id: authorData.id,
		slug: authorData.id,
		name: data.name,
		email: data.email ?? "", // Provide default for optional fields
		avatar: data.avatar ?? "", // Provide default for optional fields
		bio: data.bio ?? "", // Provide default for optional fields
		location: data.location ?? "", // Provide default for optional fields
		socials: data.socials ?? [], // Provide default for optional fields
	};
}

/**
 * Maps an array of author collection data to an array of Author models
 * @param authors - Array of author collection entries from Astro content
 * @returns Array of Author model objects
 */
export function toAuthors(authors: CollectionEntry<"authors">[]): Author[] {
	return authors.map(toAuthor);
}
