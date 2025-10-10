/**
 * Criteria for filtering and searching project metadata
 */
export interface ProjectMetadataCriteria {
	featured?: boolean;
	published?: boolean;
	showInProjects?: boolean;
	tech?: string[];
	hasRepository?: boolean;
	hasUrl?: boolean;
	hasCover?: boolean;
	company?: string;
	limit?: number;
	sortBy?: "priority" | "title" | "featured" | "date";
	sortDirection?: "asc" | "desc";
}
