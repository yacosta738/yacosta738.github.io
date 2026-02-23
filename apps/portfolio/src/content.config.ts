import {
	defineCollection,
	reference,
	type SchemaContext,
	z,
} from "astro:content";
import { glob } from "astro/loaders";

// Reusable schemas
const profileSchema = z.object({
	network: z.string(),
	username: z.string(),
	url: z.string().url(),
});

const locationSchema = z.object({
	address: z.string().optional(),
	postalCode: z.string().optional(),
	city: z.string(),
	countryCode: z.string(),
	region: z.string(),
});

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
		date: z.string().datetime(),
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
			email: z.string().email(),
			phone: z.string().optional(),
			url: z.string().url().optional(),
			summary: z.string(),
			location: locationSchema,
			profiles: z.array(profileSchema),
		}),
		// Direct JSON arrays instead of references for now
		work: z.array(
			z.object({
				name: z.string(),
				position: z.string(),
				url: z.string().url().optional(),
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
					url: z.string().url().optional(),
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
				url: z.string().url().optional(),
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
					url: z.string().url().optional(),
				}),
			)
			.optional(),
		publications: z
			.array(
				z.object({
					name: z.string(),
					publisher: z.string(),
					releaseDate: z.coerce.date(),
					url: z.string().url().optional(),
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
					url: z.string().url().optional(),
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
			link: z.string().url(),
		}),
});

export const collections = {
	resume,
	skillsLibrary,
	languagesLibrary,
	projectMetadata,
	articles,
	tags,
	categories,
	authors,
	externalArticles,
};
