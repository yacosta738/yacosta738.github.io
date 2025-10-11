/**
 * Represents a project in the resume.
 * This interface is based on the JSON Resume schema for projects.
 *
 * @property {string} name - The name of the project.
 * @property {string} description - A brief description of the project.
 * @property {string[]} [highlights] - A list of key highlights or achievements in the project.
 * @property {string[]} [keywords] - A list of technologies or keywords associated with the project.
 * @property {Date} [startDate] - The start date of the project.
 * @property {Date} [endDate] - The end date of the project.
 * @property {string} [url] - The URL of the project's homepage or live version.
 * @property {string[]} [roles] - The roles held in the project.
 * @property {string} [entity] - The entity (e.g., company) for which the project was developed.
 * @property {string} [type] - The type of project (e.g., "Web Application").
 * @property {string} [github] - The URL of the project's GitHub repository.
 * @property {boolean} [isActive] - Whether the project is currently active or ongoing.
 */
export default interface Project {
	name: string;
	description: string;
	highlights?: string[];
	keywords?: string[];
	startDate?: Date;
	endDate?: Date;
	url?: string;
	roles?: string[];
	entity?: string;
	type?: string;
	// Fields that are not in the standard schema but are allowed by additionalProperties
	github?: string;
	isActive?: boolean;
}
