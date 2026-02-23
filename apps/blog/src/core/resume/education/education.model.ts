/**
 * Represents an entry in the education section of a resume.
 *
 * @property {string} institution - The name of the educational institution (e.g., "University of California, Berkeley").
 * @property {string} [url] - An optional URL for the institution or program.
 * @property {string} area - The area of study (e.g., "Computer Science").
 * @property {string} studyType - The type of study or degree (e.g., "Bachelor's").
 * @property {Date} startDate - The start date of the education.
 * @property {Date | null} [endDate] - The end date of the education. Can be null for ongoing studies.
 * @property {string} [score] - The score or GPA obtained (e.g., "4.0").
 * @property {string[]} [courses] - A list of relevant courses taken.
 * @property {string} [thesis] - The title or a brief description of the thesis.
 */
export default interface Education {
	institution: string;
	url?: string;
	area: string;
	studyType: string;
	startDate: Date;
	endDate?: Date | null;
	score?: string;
	courses?: string[];
	thesis?: string;
}
