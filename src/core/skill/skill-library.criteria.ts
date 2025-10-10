import type { Lang } from "@/i18n";

/**
 * Interface for skill filtering criteria
 */
export interface SkillCriteria {
	lang?: Lang;
	id?: string;
	name?: string;
	icon?: boolean;
}
