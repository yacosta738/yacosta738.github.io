/**
 * Service module for handling Skill-related operations.
 * @module SkillService
 */

import { getCollection, getEntry } from "astro:content";
import { parseEntityId } from "@/lib/collection.entity";
import type { SkillCriteria } from "./skill-library.criteria";
import { toSkill, toSkills } from "./skill-library.mapper";
import type Skill from "./skill-library.model";

const skillsCache: Record<string, Skill[]> = {};

/**
 * Generates a cache key from skill criteria
 * @param {SkillCriteria} criteria - The filtering criteria
 * @returns {string} A string key for caching
 */
function getCacheKey(criteria?: SkillCriteria): string {
	if (!criteria) return "all";
	return JSON.stringify(criteria);
}

/**
 * Retrieves skills from the content collection with filtering options
 * Implements caching to improve performance on subsequent calls.
 * @async
 * @param {SkillCriteria} criteria - Criteria for filtering skills
 * @returns {Promise<Skill[]>} A promise that resolves to an array of filtered Skill objects
 * @throws {Error} If the skills collection cannot be fetched
 */
export async function getSkills(criteria?: SkillCriteria): Promise<Skill[]> {
	const cacheKey = getCacheKey(criteria);

	if (skillsCache[cacheKey]) {
		return skillsCache[cacheKey];
	}

	try {
		const { lang, name, icon } = criteria || {};

		const skills = await getCollection("skillsLibrary", ({ id, data }) => {
			// Filter by language if provided
			if (lang) {
				const skillLang = parseEntityId(id).lang;
				if (skillLang !== lang) return false;
			}

			if (name && !data.name.toLowerCase().includes(name.toLowerCase())) {
				return false;
			}

			if (icon && !data.icon) {
				return false;
			}

			return true;
		});

		const mappedSkills = await toSkills(skills);
		skillsCache[cacheKey] = mappedSkills;
		return mappedSkills;
	} catch (error) {
		console.error("Failed to fetch skills:", error);
		throw new Error("Failed to fetch skills");
	}
}

/**
 * Retrieves a specific skill by its ID.
 * @async
 * @param {string} id - The unique identifier of the skill
 * @returns {Promise<Skill | undefined>} A promise that resolves to a Skill object if found, undefined otherwise
 */
export async function getSkillById(id: string): Promise<Skill | undefined> {
	try {
		const entry = await getEntry("skillsLibrary", id);
		return entry ? toSkill(entry) : undefined;
	} catch (error) {
		console.error(`Failed to fetch skill with id ${id}:`, error);
		throw new Error(`Failed to fetch skill with id ${id}`);
	}
}
