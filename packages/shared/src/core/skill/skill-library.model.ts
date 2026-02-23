/**
 * Represents a skill in the global skill library.
 * This is used to associate icons with specific technologies.
 *
 * @property {string} id - The unique identifier for the skill (typically the file name).
 * @property {string} name - The name of the skill or technology.
 * @property {string} [icon] - The `astro-icon` name for the skill's logo (e.g., "simple-icons:typescript").
 */
export default interface Skill {
	id: string;
	name: string;
	icon?: string;
}
