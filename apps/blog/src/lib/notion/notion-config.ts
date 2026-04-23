type NotionLoaderConfig = {
	auth?: string;
	database_id: string;
	filter: {
		and: Array<Record<string, unknown>>;
	};
	platformId: string;
	requiredType: string;
	requiredStatus: string;
	defaultAuthorId: string;
	defaultCategoryId: string;
	defaultTags: string[];
};

const normalizeNotionId = (value?: string): string | undefined => {
	if (!value) {
		return undefined;
	}

	const match =
		/[0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.exec(
			value,
		);

	if (!match) {
		return value;
	}

	return match[0].replaceAll("-", "");
};

export const getNotionLoaderConfig = (): NotionLoaderConfig => {
	const defaultNotionPlatformId = "ea2cff95e1ca82ab97128153e241fe9a";
	const platformId =
		normalizeNotionId(process.env.NOTION_PLATFORM_ID) ??
		defaultNotionPlatformId;
	const requiredType = "Article";
	const requiredStatus = "Ready";
	const notionToday = new Date().toISOString().slice(0, 10);
	const defaultAuthorId = "en/yuniel-acosta-perez";
	const defaultCategoryId = "en/software-development";
	const defaultTags = (process.env.NOTION_DEFAULT_TAG_IDS ?? "en/tech")
		.split(",")
		.map((tag) => tag.trim())
		.filter(Boolean);

	return {
		auth: process.env.NOTION_TOKEN,
		database_id: normalizeNotionId(process.env.NOTION_DATABASE_ID) ?? "",
		filter: {
			and: [
				{
					property: "Platforms",
					relation: { contains: platformId },
				},
				{
					property: "Type",
					select: { equals: requiredType },
				},
				{
					property: "Status",
					status: { equals: requiredStatus },
				},
				{
					property: "Schedule Date",
					date: { on_or_before: notionToday },
				},
				{
					property: "Published",
					checkbox: { equals: true },
				},
			],
		},
		platformId,
		requiredType,
		requiredStatus,
		defaultAuthorId: process.env.NOTION_DEFAULT_AUTHOR_ID ?? defaultAuthorId,
		defaultCategoryId:
			process.env.NOTION_DEFAULT_CATEGORY_ID ?? defaultCategoryId,
		defaultTags,
	};
};
