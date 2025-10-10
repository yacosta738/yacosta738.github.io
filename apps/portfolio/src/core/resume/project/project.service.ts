import {
	createProjectMetadataMap,
	type ProjectMetadata,
} from "@/core/project-metadata";
import type Project from "@/core/resume/project/project.model";

/**
 * Represents a project that has been enhanced with its corresponding presentation metadata.
 * This combines the core resume data with UI-specific data from the `project-metadata` collection.
 *
 * @property {ProjectMetadata | null} metadata - The associated presentation metadata, or null if none is found.
 */
export type EnhancedProject = Project & {
	metadata: ProjectMetadata | null;
};

/**
 * Cache for project metadata to avoid repeated collection reads.
 * @type {Map<string, ProjectMetadata> | null}
 */
let metadataCache: Map<string, ProjectMetadata> | null = null;

/**
 * Loads and caches the project metadata from the content collection into a Map for efficient lookup.
 *
 * @returns {Promise<Map<string, ProjectMetadata>>} A promise that resolves to a map of project metadata.
 */
async function loadMetadata(): Promise<Map<string, ProjectMetadata>> {
	if (metadataCache) {
		return metadataCache;
	}

	try {
		metadataCache = await createProjectMetadataMap();
		return metadataCache;
	} catch (error) {
		console.warn("Failed to load project metadata:", error);
		metadataCache = new Map();
		return metadataCache;
	}
}

/**
 * Enhances a single project object by attaching its corresponding metadata.
 *
 * @param {Project} project - The project object to enhance.
 * @returns {Promise<EnhancedProject>} A promise that resolves to the enhanced project.
 */
export async function enhanceProject(
	project: Project,
): Promise<EnhancedProject> {
	const metadataMap = await loadMetadata();
	const metadata = metadataMap.get(project.name) || null;

	return {
		...project,
		metadata,
	};
}

/**
 * Enhances an array of project objects with their corresponding metadata.
 *
 * @param {Project[]} projects - The array of project objects to enhance.
 * @returns {Promise<EnhancedProject[]>} A promise that resolves to an array of enhanced projects.
 */
export async function enhanceProjects(
	projects: Project[],
): Promise<EnhancedProject[]> {
	const metadataMap = await loadMetadata();

	return projects.map((project) => ({
		...project,
		metadata: metadataMap.get(project.name) || null,
	}));
}

/**
 * Gets all featured projects, enhanced with their metadata and sorted by order.
 *
 * @param {Project[]} projects - The array of all projects from the resume.
 * @returns {Promise<EnhancedProject[]>} A promise that resolves to a sorted array of featured projects.
 */
export async function getFeaturedProjects(
	projects: Project[],
): Promise<EnhancedProject[]> {
	const enhancedProjects = await enhanceProjects(projects);

	return enhancedProjects
		.filter((project) => project.metadata?.featured === true)
		.sort(
			(a, b) => (a.metadata?.priority || 999) - (b.metadata?.priority || 999),
		);
}

/**
 * Gets all projects, enhanced with their metadata and sorted by order.
 *
 * @param {Project[]} projects - The array of all projects from the resume.
 * @returns {Promise<EnhancedProject[]>} A promise that resolves to a sorted array of all projects.
 */
export async function getAllProjects(
	projects: Project[],
): Promise<EnhancedProject[]> {
	const enhancedProjects = await enhanceProjects(projects);

	return enhancedProjects.sort((a, b) => {
		const orderA = a.metadata?.priority || 999;
		const orderB = b.metadata?.priority || 999;
		return orderA - orderB;
	});
}
