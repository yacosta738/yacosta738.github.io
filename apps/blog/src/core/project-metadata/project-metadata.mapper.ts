import type { ProjectMetadataCriteria } from "./project-metadata.criteria";
import type ProjectMetadata from "./project-metadata.model";

type AstroContentEntry = {
	data: {
		title: string;
		cover?: string;
		date: string;
		repository?: string;
		url?: string;
		company: string;
		tech?: Array<{ id: string } | string>;
		showInProjects: boolean;
		featured: boolean;
		priority: number;
		published: boolean;
	};
};

/**
 * Converts an Astro content collection entry into a `ProjectMetadata` model.
 * This function ensures that the data structure is consistent and provides default
 * values for optional fields.
 *
 * @param {AstroContentEntry} entry - The content collection entry from Astro.
 * @returns {ProjectMetadata} A normalized `ProjectMetadata` object.
 */
export const fromContentEntry = (entry: AstroContentEntry): ProjectMetadata => {
	const data = entry.data;
	return {
		title: data.title,
		cover: data.cover,
		date: data.date,
		repository: data.repository,
		url: data.url,
		company: data.company,
		tech: data.tech
			? data.tech.map((techRef) =>
					typeof techRef === "string" ? techRef : techRef.id,
				)
			: [],
		showInProjects: data.showInProjects ?? false,
		featured: data.featured ?? false,
		priority: data.priority ?? 0,
		published: data.published ?? false,
		year: data.date ? new Date(data.date).getFullYear() : undefined,
	};
};

/**
 * Applies filtering and sorting criteria to an array of `ProjectMetadata` objects.
 * This allows for dynamic querying of project metadata based on various conditions.
 *
 * @param {ProjectMetadata[]} metadata - The array of project metadata to filter.
 * @param {ProjectMetadataCriteria} [criteria] - The criteria to apply for filtering and sorting.
 * @returns {ProjectMetadata[]} The filtered and sorted array of project metadata.
 */
export const applyCriteria = (
	metadata: ProjectMetadata[],
	criteria?: ProjectMetadataCriteria,
): ProjectMetadata[] => {
	if (!criteria) return metadata;

	let filtered = [...metadata];

	if (criteria.featured !== undefined) {
		filtered = filtered.filter((item) => item.featured === criteria.featured);
	}

	if (criteria.published !== undefined) {
		filtered = filtered.filter((item) => item.published === criteria.published);
	}

	if (criteria.showInProjects !== undefined) {
		filtered = filtered.filter(
			(item) => item.showInProjects === criteria.showInProjects,
		);
	}

	if (criteria.tech && criteria.tech.length > 0) {
		filtered = filtered.filter((item) =>
			criteria.tech?.some((tech) => item.tech?.includes(tech)),
		);
	}

	if (criteria.hasRepository !== undefined) {
		filtered = filtered.filter((item) =>
			criteria.hasRepository ? !!item.repository : !item.repository,
		);
	}

	if (criteria.hasUrl !== undefined) {
		filtered = filtered.filter((item) =>
			criteria.hasUrl ? !!item.url : !item.url,
		);
	}

	if (criteria.hasCover !== undefined) {
		filtered = filtered.filter((item) =>
			criteria.hasCover ? !!item.cover : !item.cover,
		);
	}

	if (criteria.company) {
		filtered = filtered.filter((item) =>
			item.company
				.toLowerCase()
				.includes(criteria.company?.toLowerCase() ?? ""),
		);
	}

	if (criteria.sortBy) {
		filtered.sort((a, b) => {
			let comparison = 0;
			switch (criteria.sortBy) {
				case "priority":
					comparison = a.priority - b.priority;
					break;
				case "title":
					comparison = a.title.localeCompare(b.title);
					break;
				case "featured":
					comparison = Number(b.featured) - Number(a.featured);
					break;
				case "date":
					comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
					break;
			}
			return criteria.sortDirection === "desc" ? -comparison : comparison;
		});
	}

	if (criteria.limit && criteria.limit > 0) {
		filtered = filtered.slice(0, criteria.limit);
	}

	return filtered;
};

/**
 * Creates a `Map` for fast project metadata lookup by project title.
 * This is useful for efficiently accessing metadata for a specific project.
 *
 * @param {ProjectMetadata[]} metadata - An array of project metadata.
 * @returns {Map<string, ProjectMetadata>} A map where keys are project titles and values are the metadata objects.
 */
export const createLookupMap = (
	metadata: ProjectMetadata[],
): Map<string, ProjectMetadata> => {
	return new Map(metadata.map((item) => [item.title, item]));
};
