/**
 * Represents an author entity in the system.
 * @interface Author
 * @property {string} id - The unique identifier of the author
 * @property {string} name - The full name of the author
 * @property {string} email - The email address of the author
 * @property {string} avatar - The URL or path to the author's avatar image
 * @property {string} bio - The author's biographical information
 * @property {string} location - The author's geographical location
 * @property {Social[]} socials - The author's social media profiles
 *
 * @example
 * // English author
 * const englishAuthor: Author = {
 *   id: "en/john-doe",
 *   name: "John Doe",
 *   email: "john@codary.tech",
 *   avatar: "/images/authors/john-doe.webp",
 *   bio: "John is a web developer with 5+ years of experience",
 *   location: "New York, USA",
 *   socials: [
 *     { name: "Twitter", url: "https://twitter.com/johndoe", icon: "twitter" }
 *   ]
 * };
 *
 * // Spanish author
 * const spanishAuthor: Author = {
 *   id: "es/john-doe",
 *   name: "John Doe",
 *   email: "john@codary.tech",
 *   avatar: "/images/authors/john-doe.webp",
 *   bio: "John es un desarrollador web con más de 5 años de experiencia",
 *   location: "Nueva York, EE.UU.",
 *   socials: [
 *     { name: "Twitter", url: "https://twitter.com/johndoe", icon: "twitter" }
 *   ]
 * };
 */

/**
 * Represents a social media profile
 * @interface Social
 * @property {string} name - The name of the social media platform
 * @property {string} url - The URL to the social media profile
 * @property {string} icon - The icon identifier for the social media platform
 */
export interface Social {
	name: string;
	url: string;
	icon: string;
}

export default interface Author {
	id: string;
	slug: string;
	name: string;
	email: string;
	avatar: string;
	bio: string;
	location: string;
	socials: Social[];
}
