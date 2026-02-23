/**
 * Represents a skill entry in a resume.
 *
 * @property {string} name - The name of the skill category (e.g., "Web Development").
 * @property {string} level - The proficiency level in this skill area (e.g., "Master").
 * @property {string[]} [keywords] - A list of specific technologies or tools within this skill category.
 */
export default interface Skill {
	name: string;
	level: string;
	keywords?: string[];
}
