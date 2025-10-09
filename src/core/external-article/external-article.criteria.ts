import type { Lang } from "@/i18n";

/**
 * Interface for external article filtering criteria
 */
export interface ExternalArticleCriteria {
	lang?: Lang;
	includeDrafts?: boolean;
	author?: string | string[];
	tags?: string | string[];
	category?: string | string[];
}
