/**
 * Represents an award or honor received.
 *
 * @property {string} title - The title of the award (e.g., "Hackathon Winner").
 * @property {Date} date - The date the award was received.
 * @property {string} awarder - The organization that gave the award (e.g., "ACM").
 * @property {string} [summary] - A brief summary or description of the award.
 */
export default interface Award {
	title: string;
	date: Date;
	awarder: string;
	summary?: string;
}
