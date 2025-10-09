import type { Lang } from "@/i18n";

/**
 * Interface for author filtering criteria
 */
export interface AuthorCriteria {
	lang?: Lang;
	name?: string;
	location?: string;
	hasArticles?: boolean;
}
