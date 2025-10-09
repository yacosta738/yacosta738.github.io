/**
 * Represents a category entity in the system.
 * @interface Category
 * @property {string} id - The unique identifier for the category
 * @property {string} title - The display name of the category
 * @property {number} [order] - Optional ordering position of the category
 */
export default interface Category {
	id: string;
	slug: string;
	title: string;
	order?: number;
}
