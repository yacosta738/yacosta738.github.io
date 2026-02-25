import type { Lang } from "@/i18n";
import { parseEntityId } from "@/lib/collection.entity";

export type EntityCriteria = string | ReadonlyArray<string> | undefined;

export type BaseContentCriteria = {
	lang?: Lang;
	includeDrafts?: boolean;
	author?: EntityCriteria;
	tags?: EntityCriteria;
	category?: EntityCriteria;
};

export type FilterableContentData = {
	draft: boolean;
	author?: { id: string };
	tags?: ReadonlyArray<{ id: string }>;
	category?: { id: string };
	featured?: boolean;
};

export type FilterableContentEntry = {
	id: string;
	data: FilterableContentData;
};

const toCriteriaList = (
	criteriaValue: EntityCriteria,
): ReadonlyArray<string> => {
	if (criteriaValue === undefined) {
		return [];
	}

	return Array.isArray(criteriaValue) ? criteriaValue : [criteriaValue];
};

export const matchesEntityId = (
	criteriaValue: EntityCriteria,
	entityId: string | undefined,
): boolean => {
	if (criteriaValue === undefined) {
		return true;
	}

	if (entityId === undefined) {
		return false;
	}

	return toCriteriaList(criteriaValue).includes(entityId);
};

export const matchesTags = (
	criteriaTags: EntityCriteria,
	entryTags: ReadonlyArray<{ id: string }> | undefined,
): boolean => {
	if (criteriaTags === undefined) {
		return true;
	}

	if (entryTags === undefined) {
		return false;
	}

	const tagsToMatch = toCriteriaList(criteriaTags);
	return tagsToMatch.some((tag) =>
		entryTags.some((entryTag) => entryTag.id === tag),
	);
};

type ContentFilterOptions = {
	featured?: boolean;
	applyFeaturedFilter: boolean;
};

export const createContentEntryFilter = (
	criteria: BaseContentCriteria | undefined,
	options: ContentFilterOptions,
) => {
	const includeDrafts = criteria?.includeDrafts ?? false;

	return ({ id, data }: FilterableContentEntry): boolean => {
		if (!includeDrafts && data.draft) {
			return false;
		}

		if (
			criteria?.lang !== undefined &&
			parseEntityId(id).lang !== criteria.lang
		) {
			return false;
		}

		if (!matchesEntityId(criteria?.author, data.author?.id)) {
			return false;
		}

		if (!matchesTags(criteria?.tags, data.tags)) {
			return false;
		}

		if (!matchesEntityId(criteria?.category, data.category?.id)) {
			return false;
		}

		if (
			options.applyFeaturedFilter &&
			options.featured !== undefined &&
			data.featured !== options.featured
		) {
			return false;
		}

		return true;
	};
};
