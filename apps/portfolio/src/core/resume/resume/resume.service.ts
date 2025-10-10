/**
 * Service module for handling Resume-related operations.
 * @module ResumeService
 */

import { getCollection } from "astro:content";
import { parseEntityId } from "@/lib/collection.entity";
import type { ResumeCriteria } from "./resume.criteria";
import { toResumes } from "./resume.mapper";
import type Resume from "./resume.model";

/**
 * Retrieves resumes from the content collection with filtering options
 * @async
 * @param {ResumeCriteria} criteria - Criteria for filtering resumes
 * @returns {Promise<Resume[]>} A promise that resolves to an array of filtered Resume objects
 */
export const getResumes = async (
	criteria?: ResumeCriteria,
): Promise<Resume[]> => {
	const lang = criteria?.lang;
	const resumeId = criteria?.id;

	const resumes = await getCollection("resume", ({ id }) => {
		// Filter by language if provided
		if (lang) {
			const resumeLang = parseEntityId(id).lang;
			if (resumeLang !== lang) return false;
		}

		// Filter by id if provided
		if (resumeId && id !== resumeId) {
			return false;
		}

		return true;
	});

	return toResumes(resumes);
};

/**
 * Retrieves a specific resume by their ID.
 * @async
 * @param {string} id - The unique identifier of the resume to retrieve.
 * @returns {Promise<Resume | undefined>} A promise that resolves to an Resume object if found, undefined otherwise.
 */
export const getResumeById = async (
	id: string,
): Promise<Resume | undefined> => {
	const resumes = await getResumes();
	return resumes.find((resume) => resume.id === id);
};

/**
 * Retrieves the main resume with all data populated.
 * This function is typically used for getting the primary resume for display.
 * @async
 * @param {ResumeCriteria} criteria - Optional criteria for filtering (e.g., language)
 * @returns {Promise<Resume | undefined>} A promise that resolves to the main Resume object with all data, undefined if not found.
 */
export const getMainResumeWithData = async (
	criteria?: ResumeCriteria,
): Promise<Resume | undefined> => {
	// Get resumes with optional criteria
	const resumes = await getResumes(criteria);
	return resumes[0];
};
