import { defineCollection, reference, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Reusable schemas
const profileSchema = z.object({
	network: z.string(),
	username: z.string(),
	url: z.url(),
});

const locationSchema = z.object({
	address: z.string().optional(),
	postalCode: z.string().optional(),
	city: z.string(),
	countryCode: z.string(),
	region: z.string(),
});

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

const createNotionLoader = async () => {
	const { notionBlockFallbacks } = await import("./lib/notion/notion-blocks");
	const { createCachedNotionLoader } = await import(
		"./lib/notion/notion-loader"
	);
	const notionCacheUrl = new URL(
		"../.cache/notion-loader.json",
		import.meta.url,
	);
	const defaultNotionPlatformId = "ea2cff95e1ca82ab97128153e241fe9a";
	const notionPlatformId =
		normalizeNotionId(
			process.env.NOTION_PLATFORM_ID ?? import.meta.env.NOTION_PLATFORM_ID,
		) ?? defaultNotionPlatformId;
	const defaultNotionAuthorId = "en/yuniel-acosta-perez";
	const defaultNotionCategoryId = "en/software-development";
	const defaultNotionTagIds = ["en/tech"];
	const notionDefaultAuthorId =
		process.env.NOTION_DEFAULT_AUTHOR_ID ??
		import.meta.env.NOTION_DEFAULT_AUTHOR_ID ??
		defaultNotionAuthorId;
	const notionDefaultCategoryId =
		process.env.NOTION_DEFAULT_CATEGORY_ID ??
		import.meta.env.NOTION_DEFAULT_CATEGORY_ID ??
		defaultNotionCategoryId;
	const notionDefaultTagIds = (
		process.env.NOTION_DEFAULT_TAG_IDS ??
		import.meta.env.NOTION_DEFAULT_TAG_IDS ??
		defaultNotionTagIds.join(",")
	)
		.split(",")
		.map((tag: string) => tag.trim())
		.filter(Boolean);
	const notionRehypePlugin = notionBlockFallbacks as (
		...args: unknown[]
	) => unknown;
	const notionTypeFilter = "Article";
	const notionStatusFilter = "Ready";
	const notionToday = new Date().toISOString().slice(0, 10);
	const notionPostsFilter = {
		and: [
			{
				property: "Platforms",
				relation: { contains: notionPlatformId },
			},
			{
				property: "Type",
				select: { equals: notionTypeFilter },
			},
			{
				property: "Status",
				status: { equals: notionStatusFilter },
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
	};

	return createCachedNotionLoader({
		auth: process.env.NOTION_TOKEN ?? import.meta.env.NOTION_TOKEN,
		database_id:
			normalizeNotionId(
				process.env.NOTION_DATABASE_ID ?? import.meta.env.NOTION_DATABASE_ID,
			) ?? "",
		filter: notionPostsFilter,
		platformId: notionPlatformId,
		requiredType: notionTypeFilter,
		requiredStatus: notionStatusFilter,
		defaultAuthorId: notionDefaultAuthorId,
		defaultCategoryId: notionDefaultCategoryId,
		defaultTags: notionDefaultTagIds,
		cacheUrl: notionCacheUrl,
		rehypePlugins: [notionRehypePlugin],
	});
};

// System skills library collection (icons, metadata, etc.)
const skillsLibrary = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.json",
		base: "../../packages/shared/src/data/skills",
	}),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		icon: z.string().optional(),
	}),
});

// Languages library collection (language names, mappings, metadata)
const languagesLibrary = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.json",
		base: "../../packages/shared/src/data/languages",
	}),
	schema: z.object({
		code: z.string(),
		nativeName: z.string(),
		names: z.record(z.string(), z.string()), // { "en": "English", "es": "Inglés" }
		flag: z.string().optional(),
		direction: z.enum(["ltr", "rtl"]).default("ltr"),
	}),
});

// Project metadata collection for presentation enhancements
const projectMetadata = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.json",
		base: "../../packages/shared/src/data/project-metadata",
	}),
	schema: z.object({
		title: z.string(),
		cover: z.string().optional(),
		date: z
			.string()
			.refine((value) => !Number.isNaN(Date.parse(value)), "Invalid datetime"),
		repository: z.string().optional(),
		url: z.string().optional(),
		company: z.string(),
		tech: z.array(reference("skillsLibrary")).optional(),
		showInProjects: z.boolean().default(false),
		featured: z.boolean().default(false),
		priority: z.number().default(0),
		published: z.boolean().default(false),
	}),
});

// Main resume collection using glob loader for multiple languages
const resume = defineCollection({
	loader: glob({
		pattern: "**/resume.json",
		base: "../../packages/shared/src/data/resume",
	}),
	schema: z.object({
		basics: z.object({
			name: z.string(),
			label: z.string(),
			image: z.string(),
			email: z.email(),
			phone: z.string().optional(),
			url: z.url().optional(),
			summary: z.string(),
			location: locationSchema,
			profiles: z.array(profileSchema),
		}),
		// Direct JSON arrays instead of references for now
		work: z.array(
			z.object({
				name: z.string(),
				position: z.string(),
				url: z.url().optional(),
				startDate: z.coerce.date(),
				endDate: z.preprocess(
					(v) => (v === "" || v === null || v === undefined ? null : v),
					z.coerce.date().nullable(),
				),
				summary: z.string().optional(),
				highlights: z.array(z.string()).optional(),
			}),
		),
		volunteer: z
			.array(
				z.object({
					organization: z.string(),
					position: z.string(),
					url: z.url().optional(),
					startDate: z.coerce.date(),
					endDate: z.preprocess(
						(v) => (v === "" || v === null || v === undefined ? null : v),
						z.coerce.date().nullable(),
					),
					summary: z.string().optional(),
					highlights: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		education: z.array(
			z.object({
				institution: z.string(),
				url: z.url().optional(),
				area: z.string(),
				studyType: z.string(),
				startDate: z.coerce.date(),
				endDate: z.preprocess(
					(v) => (v === "" || v === null || v === undefined ? null : v),
					z.coerce.date().nullable(),
				),
				score: z.string().optional(),
				courses: z.array(z.string()).optional(),
			}),
		),
		awards: z
			.array(
				z.object({
					title: z.string(),
					date: z.coerce.date(),
					awarder: z.string(),
					summary: z.string().optional(),
				}),
			)
			.optional(),
		certificates: z
			.array(
				z.object({
					name: z.string(),
					date: z.coerce.date(),
					issuer: z.string(),
					url: z.url().optional(),
				}),
			)
			.optional(),
		publications: z
			.array(
				z.object({
					name: z.string(),
					publisher: z.string(),
					releaseDate: z.coerce.date(),
					url: z.url().optional(),
					summary: z.string().optional(),
				}),
			)
			.optional(),
		skills: z.array(
			z.object({
				name: z.string(),
				level: z.string().optional(),
				keywords: z.array(z.string()).optional(),
			}),
		),
		languages: z
			.array(
				z.object({
					language: z.string(),
					fluency: z.string(),
				}),
			)
			.optional(),
		interests: z
			.array(
				z.object({
					name: z.string(),
					keywords: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		references: z
			.array(
				z.object({
					name: z.string(),
					reference: z.string(),
				}),
			)
			.optional(),
		projects: z
			.array(
				z.object({
					name: z.string(),
					description: z.string().optional(),
					highlights: z.array(z.string()).optional(),
					startDate: z.preprocess(
						(v) => (v === "" || v === null || v === undefined ? undefined : v),
						z.coerce.date().optional(),
					),
					endDate: z.preprocess(
						(v) => (v === "" || v === null || v === undefined ? null : v),
						z.coerce.date().nullable().optional(),
					),
					url: z.url().optional(),
				}),
			)
			.optional(),
	}),
});

const articles = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "../../packages/shared/src/data/articles",
	}),
	schema: ({ image }: SchemaContext) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			lastModified: z.coerce.date().optional(),
			cover: image().optional(),
			author: reference("authors"),
			tags: z.array(reference("tags")),
			category: reference("categories"),
			draft: z.boolean().optional().default(false),
			featured: z.boolean().optional().default(false),
		}),
});

// Notion loader is enabled by default. Set NOTION_LOADER=0 to disable.
const useNotionLoader = process.env.NOTION_LOADER !== "0";
const emptyNotionLoader = async () => [];
const notionLoader = useNotionLoader
	? await createNotionLoader()
	: emptyNotionLoader;
const notionArticles = defineCollection({
	loader: notionLoader,
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		lastModified: z.coerce.date().optional(),
		cover: z.string().optional(),
		author: reference("authors"),
		tags: z.array(reference("tags")),
		category: reference("categories"),
		draft: z.boolean().optional().default(false),
		featured: z.boolean().optional().default(false),
	}),
});

const tags = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.md",
		base: "../../packages/shared/src/data/tags",
	}),
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
	}),
});

const categories = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.md",
		base: "../../packages/shared/src/data/categories",
	}),
	schema: z.object({
		title: z.string(),
		order: z.number().optional(),
	}),
});

const authors = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.json",
		base: "../../packages/shared/src/data/authors",
	}),
	schema: z.object({
		name: z.string(),
		email: z.string(),
		avatar: z.string(),
		bio: z.string(),
		location: z.string(),
		socials: z.array(
			z.object({
				name: z.string(),
				url: z.string(),
				icon: z.string(),
			}),
		),
	}),
});

const externalArticles = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "../../packages/shared/src/data/external-articles",
	}),
	schema: ({ image }: SchemaContext) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			lastModified: z.coerce.date().optional(),
			cover: image().optional(),
			author: reference("authors"),
			tags: z.array(reference("tags")),
			category: reference("categories"),
			draft: z.boolean().optional().default(false),
			isExternal: z.boolean().default(true),
			link: z.url(),
		}),
});

export const collections = {
	resume,
	skillsLibrary,
	languagesLibrary,
	projectMetadata,
	articles,
	notionArticles,
	tags,
	categories,
	authors,
	externalArticles,
};
