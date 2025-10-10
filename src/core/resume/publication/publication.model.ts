/**
 * Represents a publication (e.g., a book, article, or paper).
 *
 * @property {string} name - The name of the publication.
 * @property {string} publisher - The publisher of the work (e.g., "O'Reilly Media").
 * @property {Date} releaseDate - The date the publication was released.
 * @property {string} [url] - An optional URL to view the publication.
 * @property {string} [summary] - A brief summary of the publication.
 */
export default interface Publication {
	name: string;
	publisher: string;
	releaseDate: Date;
	url?: string;
	summary?: string;
}
