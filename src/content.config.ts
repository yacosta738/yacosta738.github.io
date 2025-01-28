import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/data/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		cover: z.string(),
		author: reference("authors"),
		tags: z.array(reference("tags")),
		categories: z.array(reference("categories")),
		isExternalLink: z.boolean().default(false),
		link: z.string().optional(),
		draft: z.boolean(),
	}),
});

const tags = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/tags" }),
	schema: z.object({
		title: z.string(),
	}),
});

const categories = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/categories" }),
	schema: z.object({
		title: z.string(),
		order: z.number().optional(),
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/authors" }),
	schema: z.object({
		name: z.string(),
		image: z.string(),
		rol: z.string(),
		bio: z.string(),
		email: z.string(),
		social: z.array(
			z.object({
				name: z.string(),
				url: z.string(),
				icon: z.string(),
			}),
		),
	}),
});

const jobs = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/jobs" }),
	schema: z.object({
		title: z.string(),
		company: z.string(),
		icon: z.string(),
		location: z.string(),
		url: z.string(),
		published: z.boolean(),
		createDate: z.string().datetime(),
		roles: z.array(
			z.object({
				role: z.string(),
				startDate: z.string().datetime(),
				endDate: z.string().datetime().optional(),
				achievements: z.array(z.string()),
			}),
		),
	}),
});

const technologies = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/technologies" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		icon: z.string().optional(),
		url: z.string(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/projects" }),
	schema: z.object({
		title: z.string(),
		cover: z.string().optional(),
		date: z.string().datetime(),
		repository: z.string().optional(),
		url: z.string().optional(),
		company: z.string(),
		tech: z.array(reference("technologies")),
		showInProjects: z.boolean().default(false),
		featured: z.boolean().default(false),
		priority: z.number().default(0),
		published: z.boolean().default(false),
		content: z.string(),
	}),
});

const notifications = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/data/notifications",
	}),
	schema: z.object({
		title: z.string(),
		content: z.string(),
		type: z.enum(["neutral", "success", "error"]).default("neutral"),
		startDate: z.string().datetime(),
		endDate: z.string().datetime().optional(),
		dismissible: z.boolean().default(false),
		active: z.boolean().default(false),
	}),
});

export const collections = {
	blog: blogCollection,
	authors,
	jobs,
	technologies,
	projects,
	tags,
	categories,
	notifications,
};
