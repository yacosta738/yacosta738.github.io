import type { CollectionEntry } from "astro:content";
import type Skill from "./skill-library.model";

/**
 * Converts a single skill collection entry from Astro's content collection to a `Skill` library model.
 *
 * @param {CollectionEntry<"skillsLibrary">} skillData - The skill collection entry to convert.
 * @returns {Skill} A `Skill` library model object.
 */
export function toSkill(skillData: CollectionEntry<"skillsLibrary">): Skill {
	return {
		id: skillData.id,
		name: skillData.data.name,
		icon: skillData.data.icon,
	};
}

/**
 * Converts an array of skill collection entries to an array of `Skill` library models.
 *
 * @param {CollectionEntry<"skillsLibrary">[]} skills - An array of skill collection entries.
 * @returns {Promise<Skill[]>} A promise that resolves to an array of `Skill` library model objects.
 */
export async function toSkills(
	skills: CollectionEntry<"skillsLibrary">[],
): Promise<Skill[]> {
	return skills.map(toSkill);
}
