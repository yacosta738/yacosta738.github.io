import { fileToUrl } from "notion-astro-loader";
import * as rawProperties from "notion-astro-loader/schemas/raw-properties";
import * as transformedProperties from "notion-astro-loader/schemas/transformed-properties";
import { DEFAULT_LOCALE, type Lang, LOCALES } from "@/i18n";

type NotionPageData = {
	cover: unknown | null;
	properties: Record<string, unknown>;
};

type MapOptions = {
	logger?: { warn: (message: string) => void };
	platformId?: string;
	requiredType?: string;
	requiredStatus?: string;
	now?: Date;
	defaultAuthorId?: string;
	defaultCategoryId?: string;
	defaultTags?: string[];
};

export type NotionArticleData = {
	title: string;
	description: string;
	date: string;
	lastModified?: string;
	cover?: string;
	author: string;
	tags: string[];
	category: string;
	draft?: boolean;
	featured?: boolean;
};

export type NotionArticleEntry = {
	id: string;
	data: NotionArticleData;
	sourceId?: string;
};

const TITLE_KEYS = ["Title", "Name"] as const;
const DESCRIPTION_KEYS = ["Description", "Summary", "Excerpt"] as const;
const SLUG_KEYS = ["Slug"] as const;
const LOCALE_KEYS = ["Locale", "Lang", "Language"] as const;
const PLATFORM_KEYS = ["Platforms"] as const;
const TAG_KEYS = ["Tags"] as const;
const CATEGORY_KEYS = ["Category"] as const;
const TYPE_KEYS = ["Type"] as const;
const AUTHOR_KEYS = ["Author"] as const;
const DATE_KEYS = ["Schedule Date", "Date"] as const;
const CREATED_TIME_KEYS = ["Created time", "Created Time"] as const;
const LAST_EDITED_KEYS = ["Last edited time", "Last Edited Time"] as const;
const STATUS_KEYS = ["Status"] as const;
const PUBLISHED_KEYS = ["Published"] as const;
const FEATURED_KEYS = ["Featured"] as const;

const getProperty = (
	properties: Record<string, unknown>,
	keys: readonly string[],
): unknown | undefined => {
	for (const key of keys) {
		const value = properties[key];
		if (value !== undefined) {
			return value;
		}
	}
	return undefined;
};

const parseProperty = <T>(
	schema: {
		safeParse: (
			input: unknown,
		) => { success: true; data: T } | { success: false };
	},
	property: unknown,
): T | undefined => {
	if (!property) {
		return undefined;
	}
	const result = schema.safeParse(property);
	return result.success ? result.data : undefined;
};

const toRelationItems = (
	property: unknown,
): Array<{ id?: string; name?: string; title?: string }> => {
	if (!property) {
		return [];
	}

	if (Array.isArray(property)) {
		return property.map((item) =>
			typeof item === "string"
				? { id: item }
				: (item as { id?: string; name?: string; title?: string }),
		);
	}

	if (typeof property === "object" && property !== null) {
		const relation = (property as { relation?: unknown }).relation;
		if (Array.isArray(relation)) {
			return relation.map((item) =>
				typeof item === "string"
					? { id: item }
					: (item as { id?: string; name?: string; title?: string }),
			);
		}
	}

	return [];
};

const resolveRelationIds = (property: unknown): string[] => {
	return toRelationItems(property)
		.map((item) => (item.id ? normalizeNotionId(item.id) : undefined))
		.filter((value): value is string => Boolean(value));
};

const resolveRelationNames = (property: unknown): string[] => {
	return toRelationItems(property)
		.map((item) => item.name ?? item.title)
		.filter((value): value is string => Boolean(value));
};

const slugify = (value: string): string => {
	return value
		.normalize("NFKD")
		.replace(/[^\w\s-]/g, "")
		.trim()
		.toLowerCase()
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
};

const normalizeNotionId = (value: string): string => {
	const match = value.match(
		/[0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
	);
	if (!match) {
		return value;
	}
	return match[0].replace(/-/g, "");
};

const normalizeUrlValue = (value: unknown): string | undefined => {
	if (typeof value === "string") {
		return value;
	}
	if (value instanceof URL) {
		return value.toString();
	}
	return undefined;
};

const normalizeLocale = (value: string | undefined): Lang => {
	if (!value) {
		return DEFAULT_LOCALE;
	}

	const normalized = value.toLowerCase();
	if (normalized in LOCALES) {
		return normalized as Lang;
	}

	const base = normalized.split("-")[0];
	if (base in LOCALES) {
		return base as Lang;
	}

	return DEFAULT_LOCALE;
};

const toReferenceId = (lang: Lang, value: string): string | undefined => {
	const slug = slugify(value);
	if (!slug) {
		return undefined;
	}
	return `${lang}/${slug}`;
};

const formatDateId = (date: Date): string => {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");
	return `${year}/${month}/${day}`;
};

const resolveCover = (cover: NotionPageData["cover"]): string | undefined => {
	if (!cover) {
		return undefined;
	}

	try {
		return normalizeUrlValue(
			fileToUrl(cover as Parameters<typeof fileToUrl>[0]),
		);
	} catch {
		return undefined;
	}
};

const resolveTitle = (
	properties: Record<string, unknown>,
): string | undefined => {
	const property = getProperty(properties, TITLE_KEYS);
	return parseProperty(transformedProperties.title, property);
};

const resolveDescription = (
	properties: Record<string, unknown>,
): string | undefined => {
	const property = getProperty(properties, DESCRIPTION_KEYS);
	return parseProperty(transformedProperties.rich_text, property);
};

const resolveSlug = (
	properties: Record<string, unknown>,
): string | undefined => {
	const property = getProperty(properties, SLUG_KEYS);
	return (
		parseProperty(transformedProperties.rich_text, property) ??
		parseProperty(transformedProperties.title, property)
	);
};

const resolveLocale = (properties: Record<string, unknown>): Lang => {
	const property = getProperty(properties, LOCALE_KEYS);
	const localeValue =
		parseProperty<string>(transformedProperties.select, property) ??
		parseProperty<string>(transformedProperties.rich_text, property);
	return normalizeLocale(localeValue);
};

const resolvePlatforms = (properties: Record<string, unknown>): string[] => {
	const property = getProperty(properties, PLATFORM_KEYS);
	return resolveRelationIds(property);
};

const resolveType = (
	properties: Record<string, unknown>,
): string | undefined => {
	const property = getProperty(properties, TYPE_KEYS);
	return parseProperty(transformedProperties.select, property);
};

const resolveStatus = (
	properties: Record<string, unknown>,
): string | undefined => {
	const property = getProperty(properties, STATUS_KEYS);
	return parseProperty(transformedProperties.status, property);
};

const resolvePublished = (
	properties: Record<string, unknown>,
): boolean | undefined => {
	const property = getProperty(properties, PUBLISHED_KEYS);
	return parseProperty(transformedProperties.checkbox, property);
};

const resolveScheduleDate = (
	properties: Record<string, unknown>,
): Date | undefined => {
	const dateProperty = getProperty(properties, DATE_KEYS);
	const dateValue = parseProperty<{ start?: Date }>(
		transformedProperties.date,
		dateProperty,
	);
	if (dateValue?.start) {
		return dateValue.start;
	}

	return undefined;
};

const resolveTags = (
	properties: Record<string, unknown>,
	lang: Lang,
): string[] => {
	const property = getProperty(properties, TAG_KEYS);
	const tagNames = parseProperty<string[]>(
		transformedProperties.multi_select,
		property,
	);
	const relationNames = resolveRelationNames(property);
	const tags = tagNames ?? relationNames;
	if (!tags || tags.length === 0) {
		return [];
	}

	return tags
		.map((name) => toReferenceId(lang, name))
		.filter((value): value is string => Boolean(value));
};

const resolveCategory = (
	properties: Record<string, unknown>,
	lang: Lang,
): string | undefined => {
	const property = getProperty(properties, CATEGORY_KEYS);
	const categoryName = parseProperty<string>(
		transformedProperties.select,
		property,
	);
	if (!categoryName) {
		return undefined;
	}
	return toReferenceId(lang, categoryName);
};

const resolveAuthor = (
	properties: Record<string, unknown>,
	lang: Lang,
): string | undefined => {
	const property = getProperty(properties, AUTHOR_KEYS);
	const peopleResult = rawProperties.people.safeParse(property);
	const peopleName = peopleResult.success
		? (
				peopleResult.data.people as Array<{ name?: string }> | undefined
			)?.[0]?.name?.trim()
		: undefined;
	const authorName =
		peopleName ??
		parseProperty<string>(transformedProperties.select, property) ??
		parseProperty<string>(transformedProperties.rich_text, property) ??
		parseProperty<string>(transformedProperties.title, property);

	if (!authorName) {
		return undefined;
	}

	return toReferenceId(lang, authorName);
};

const resolveDate = (properties: Record<string, unknown>): Date | undefined => {
	const scheduleDate = resolveScheduleDate(properties);
	if (scheduleDate) {
		return scheduleDate;
	}

	const createdProperty = getProperty(properties, CREATED_TIME_KEYS);
	return parseProperty<Date>(
		transformedProperties.created_time,
		createdProperty,
	);
};

const resolveLastModified = (
	properties: Record<string, unknown>,
): Date | undefined => {
	const lastEditedProperty = getProperty(properties, LAST_EDITED_KEYS);
	const parsed = parseProperty(
		rawProperties.last_edited_time,
		lastEditedProperty,
	);
	if (!parsed?.last_edited_time) {
		return undefined;
	}

	return new Date(parsed.last_edited_time);
};

const resolveDraft = (properties: Record<string, unknown>): boolean => {
	const published = resolvePublished(properties);
	if (published === false) {
		return true;
	}

	const status = resolveStatus(properties);
	if (status) {
		return status.toLowerCase() !== "ready";
	}

	return false;
};

const resolveFeatured = (properties: Record<string, unknown>): boolean => {
	const property = getProperty(properties, FEATURED_KEYS);
	return parseProperty(transformedProperties.checkbox, property) ?? false;
};

const buildEntryId = (lang: Lang, date: Date, slug: string): string => {
	const datePath = formatDateId(date);
	return `${lang}/${datePath}/${slug}`;
};

export const mapNotionArticleEntry = (
	page: NotionPageData,
	sourceId: string,
	options: MapOptions = {},
): NotionArticleEntry | null => {
	const properties = page.properties ?? {};
	const warn = (message: string) => {
		options.logger?.warn(message);
	};

	const title = resolveTitle(properties);
	if (!title) {
		warn(`Notion page ${sourceId} skipped: missing title.`);
		return null;
	}

	const description = resolveDescription(properties);
	const finalDescription = description ?? title;
	if (!description) {
		warn(`Notion page ${sourceId}: missing description, using title.`);
	}

	const date = resolveDate(properties);
	if (!date) {
		warn(`Notion page ${sourceId} skipped: missing date.`);
		return null;
	}

	const platformId = options.platformId;
	const normalizedPlatformId = platformId
		? normalizeNotionId(platformId)
		: undefined;
	if (normalizedPlatformId) {
		const platforms = resolvePlatforms(properties);
		if (!platforms.includes(normalizedPlatformId)) {
			warn(`Notion page ${sourceId} skipped: platform filter mismatch.`);
			return null;
		}
	}

	const requiredType = options.requiredType;
	if (requiredType) {
		const type = resolveType(properties);
		if (!type || type.toLowerCase() !== requiredType.toLowerCase()) {
			warn(`Notion page ${sourceId} skipped: type filter mismatch.`);
			return null;
		}
	}

	const requiredStatus = options.requiredStatus;
	if (requiredStatus) {
		const status = resolveStatus(properties);
		if (!status || status.toLowerCase() !== requiredStatus.toLowerCase()) {
			warn(`Notion page ${sourceId} skipped: status filter mismatch.`);
			return null;
		}
	}

	const published = resolvePublished(properties);
	if (published !== true) {
		warn(`Notion page ${sourceId} skipped: not published.`);
		return null;
	}

	const scheduleDate = resolveScheduleDate(properties);
	if (!scheduleDate) {
		warn(`Notion page ${sourceId} skipped: missing schedule date.`);
		return null;
	}

	const now = options.now ?? new Date();
	if (scheduleDate.valueOf() > now.valueOf()) {
		warn(`Notion page ${sourceId} skipped: schedule date in future.`);
		return null;
	}

	const lang = resolveLocale(properties);
	const slugSource = resolveSlug(properties) ?? title;
	const slug = slugify(slugSource);
	if (!slug) {
		warn(`Notion page ${sourceId} skipped: unable to generate slug.`);
		return null;
	}

	const author = resolveAuthor(properties, lang) ?? options.defaultAuthorId;
	if (!author) {
		warn(`Notion page ${sourceId} skipped: missing author.`);
		return null;
	}

	const tags = resolveTags(properties, lang);
	const finalTags = tags.length > 0 ? tags : (options.defaultTags ?? []);
	if (finalTags.length === 0) {
		warn(`Notion page ${sourceId}: missing tags, continuing without tags.`);
	}

	const category =
		resolveCategory(properties, lang) ?? options.defaultCategoryId;
	if (!category) {
		warn(`Notion page ${sourceId} skipped: missing category.`);
		return null;
	}

	const lastModified = resolveLastModified(properties);
	const cover = resolveCover(page.cover);
	const draft = resolveDraft(properties);
	const featured = resolveFeatured(properties);
	const id = buildEntryId(lang, date, slug);

	return {
		id,
		sourceId,
		data: {
			title,
			description: finalDescription,
			date: date.toISOString(),
			lastModified: lastModified?.toISOString(),
			cover,
			author,
			tags: finalTags,
			category,
			draft,
			featured,
		},
	};
};
