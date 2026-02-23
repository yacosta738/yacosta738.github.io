import { getCollection } from "astro:content";
import type { ProjectMetadataCriteria } from "./project-metadata.criteria";
import {
	applyCriteria,
	createLookupMap,
	fromContentEntry,
} from "./project-metadata.mapper";
import type ProjectMetadata from "./project-metadata.model";

let metadataCache: ProjectMetadata[] | null = null;

/**
 * Loads all project metadata from the Astro content collection.
 * Implements a simple in-memory cache to avoid redundant file reads.
 *
 * @returns {Promise<ProjectMetadata[]>} A promise that resolves to an array of all project metadata.
 */
export const loadProjectMetadata = async (): Promise<ProjectMetadata[]> => {
	if (metadataCache) {
		return metadataCache;
	}

	try {
		const metadataEntries = await getCollection("projectMetadata");
		metadataCache = metadataEntries.map(fromContentEntry);
		return metadataCache;
	} catch (error) {
		console.warn("Failed to load project metadata:", error);
		metadataCache = [];
		return metadataCache;
	}
};

/**
 * Gets project metadata, with optional filtering and sorting criteria.
 *
 * @param {ProjectMetadataCriteria} [criteria] - The criteria to apply.
 * @returns {Promise<ProjectMetadata[]>} A promise that resolves to the filtered and sorted project metadata.
 */
export const getProjectMetadata = async (
	criteria?: ProjectMetadataCriteria,
): Promise<ProjectMetadata[]> => {
	const metadata = await loadProjectMetadata();
	return applyCriteria(metadata, criteria);
};

/**
 * Gets metadata for a specific project by its title.
 * This is the main function to match projects from the resume with their metadata.
 *
 * @param {string} projectTitle - The title of the project to find.
 * @returns {Promise<ProjectMetadata | null>} A promise that resolves to the project's metadata or null if not found.
 */
export const getProjectMetadataByTitle = async (
	projectTitle: string,
): Promise<ProjectMetadata | null> => {
	const metadata = await loadProjectMetadata();
	return metadata.find((item) => item.title === projectTitle) || null;
};

/**
 * Gets metadata for a specific project by its name (for backward compatibility).
 * This function tries to match the project name from the resume with the title in metadata.
 *
 * @param {string} projectName - The name of the project to find.
 * @returns {Promise<ProjectMetadata | null>} A promise that resolves to the project's metadata or null if not found.
 */
export const getProjectMetadataByName = async (
	projectName: string,
): Promise<ProjectMetadata | null> => {
	return getProjectMetadataByTitle(projectName);
};

/**
 * Gets metadata for all featured projects, sorted by the `priority` property.
 *
 * @returns {Promise<ProjectMetadata[]>} A promise that resolves to an array of featured project metadata.
 */
export const getFeaturedProjectsMetadata = async (): Promise<
	ProjectMetadata[]
> => {
	return getProjectMetadata({
		featured: true,
		published: true,
		sortBy: "priority",
		sortDirection: "asc",
	});
};

/**
 * Gets metadata for all non-featured projects that should be shown in projects page, sorted by the `priority` property.
 *
 * @returns {Promise<ProjectMetadata[]>} A promise that resolves to an array of non-featured project metadata.
 */
export const getNonFeaturedProjectsMetadata = async (): Promise<
	ProjectMetadata[]
> => {
	return getProjectMetadata({
		featured: false,
		published: true,
		showInProjects: true,
		sortBy: "priority",
		sortDirection: "asc",
	});
};

/**
 * Gets metadata for all projects that should be shown in the projects page.
 *
 * @returns {Promise<ProjectMetadata[]>} A promise that resolves to an array of project metadata for the projects page.
 */
export const getPublishedProjectsMetadata = async (): Promise<
	ProjectMetadata[]
> => {
	return getProjectMetadata({
		published: true,
		showInProjects: true,
		sortBy: "priority",
		sortDirection: "asc",
	});
};

/**
 * Creates a `Map` of project metadata for fast lookups by project title.
 *
 * @returns {Promise<Map<string, ProjectMetadata>>} A promise that resolves to a map of project metadata.
 */
export const createProjectMetadataMap = async (): Promise<
	Map<string, ProjectMetadata>
> => {
	const metadata = await loadProjectMetadata();
	return createLookupMap(metadata);
};
