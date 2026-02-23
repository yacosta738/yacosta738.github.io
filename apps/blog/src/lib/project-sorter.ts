import type { EnhancedProject } from "@/core/resume/project/project.service";

/**
 * Enhanced project with cached computed values for performance
 */
export type SortableProject = EnhancedProject & {
	_sortTimestamp: number;
	_displayYear: string;
};

/**
 * Extracts a timestamp for sorting from project date fields
 */
const getProjectTimestamp = (project: EnhancedProject): number => {
	if (!project) return Number.NEGATIVE_INFINITY;

	// Try startDate first
	if (project.startDate) {
		try {
			const date =
				project.startDate instanceof Date
					? project.startDate
					: new Date(project.startDate as string);
			const timestamp = date.getTime();
			if (!Number.isNaN(timestamp)) return timestamp;
		} catch {
			// Continue to fallback
		}
	}

	// Fallback to metadata.year
	const year = project.metadata?.year;
	if (year) {
		const yearNumber = Number(String(year).slice(0, 4));
		if (!Number.isNaN(yearNumber)) {
			// January 1st of the year
			return new Date(yearNumber, 0, 1).getTime();
		}
	}

	return Number.NEGATIVE_INFINITY;
};

/**
 * Extracts display year from project date fields
 */
const getProjectDisplayYear = (project: EnhancedProject): string => {
	// Try startDate first
	if (project.startDate) {
		try {
			const date =
				project.startDate instanceof Date
					? project.startDate
					: new Date(project.startDate);
			if (!Number.isNaN(date.getTime())) {
				return String(date.getFullYear());
			}
		} catch {
			// Continue to fallback
		}
	}

	// Fallback to metadata.year
	const year = project.metadata?.year;
	if (year) {
		const yearString = String(year);
		if (yearString.length >= 4) {
			return yearString.slice(0, 4);
		}
	}

	return "";
};

/**
 * Enhances projects with cached computed values for efficient sorting and display
 */
export const enhanceProjectsForSorting = (
	projects: EnhancedProject[],
): SortableProject[] => {
	return projects.map((project) => ({
		...project,
		_sortTimestamp: getProjectTimestamp(project),
		_displayYear: getProjectDisplayYear(project),
	}));
};

/**
 * Comparator function for sorting projects
 * Priority: timestamp (newest first) → name (A-Z)
 */
const projectComparator = (a: SortableProject, b: SortableProject): number => {
	// Primary sort: timestamp (newest first)
	if (a._sortTimestamp !== b._sortTimestamp) {
		return b._sortTimestamp - a._sortTimestamp;
	}

	// Secondary sort: name (A-Z, case-insensitive)
	const nameA = a.name || "";
	const nameB = b.name || "";
	return nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
};

/**
 * Sorts projects by date (newest first) with name as fallback
 * Returns enhanced projects with cached computed values
 */
export const sortProjectsByDate = (
	projects: EnhancedProject[],
): SortableProject[] => {
	if (!projects?.length) return [];

	const enhanced = enhanceProjectsForSorting(projects);
	return enhanced.sort(projectComparator);
};

/**
 * Type guard to check if a project is already enhanced
 */
export const isSortableProject = (
	project: EnhancedProject | SortableProject,
): project is SortableProject => {
	return "_sortTimestamp" in project && "_displayYear" in project;
};
