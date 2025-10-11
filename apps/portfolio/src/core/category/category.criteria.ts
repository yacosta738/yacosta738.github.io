import type { Lang } from "@/i18n";

/**
 * Interface for category filtering criteria
 */
export interface CategoryCriteria {
	lang?: Lang;
	title?: string;
	orderMin?: number;
	orderMax?: number;
}
