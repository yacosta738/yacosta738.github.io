import type { Lang } from "@/i18n";

/**
 * Interface for tag filtering criteria
 */
export interface TagCriteria {
	lang?: Lang;
	title?: string;
}
