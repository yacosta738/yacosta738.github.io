/**
 * Project metadata model for enhancing JSON Resume projects with presentation data.
 * Maintains clean separation between core resume data and UI metadata.
 * Aligned with the Astro content collection schema.
 */
export default interface ProjectMetadata {
	title: string;
	cover?: string;
	date: string; // ISO datetime string
	repository?: string;
	url?: string;
	company: string;
	tech?: string[]; // Array of skill IDs that reference skillsLibrary
	showInProjects: boolean;
	featured: boolean;
	priority: number;
	published: boolean;
	year?: number; // Computed from date
}

export interface RawProjectData extends ProjectMetadata {
	// Additional properties that might come from the content collection entry
}
