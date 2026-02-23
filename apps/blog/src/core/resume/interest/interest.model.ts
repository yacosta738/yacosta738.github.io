/**
 * Represents a personal interest or hobby.
 *
 * @property {string} name - The name of the interest (e.g., "Photography").
 * @property {string[]} [keywords] - A list of related keywords or sub-interests (e.g., ["Portraits", "Landscapes"]).
 */
export default interface Interest {
	name: string;
	keywords?: string[];
}
