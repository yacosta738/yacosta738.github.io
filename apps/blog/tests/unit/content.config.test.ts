import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const importContentConfig = async () => {
	vi.resetModules();
	vi.doMock("astro/loaders", () => ({
		glob: (config: Record<string, unknown>) => ({ type: "glob", ...config }),
	}));
	vi.doMock("astro:content", async () => {
		const { z } = await import("astro/zod");
		return {
			defineCollection: (config: Record<string, unknown>) => config,
			reference: () => z.string(),
		};
	});

	return import("../../src/content.config");
};

describe("content.config", () => {
	beforeEach(() => {
		vi.unstubAllEnvs();
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.doUnmock("astro/loaders");
		vi.doUnmock("astro:content");
	});

	it("uses the empty notion loader when BLOG_CONTENT_SOURCE is disabled", async () => {
		vi.stubEnv("BLOG_CONTENT_SOURCE", "disabled");
		const { collections } = await importContentConfig();

		await expect(collections.notionArticles.loader()).resolves.toEqual([]);
	});

	it("builds the notion loader with normalized ids when using live Notion content", async () => {
		vi.stubEnv("BLOG_CONTENT_SOURCE", "live");
		vi.stubEnv("NOTION_TOKEN", "token");
		vi.stubEnv("NOTION_DATABASE_ID", "12345678-1234-1234-1234-1234567890ab");
		vi.stubEnv("NOTION_PLATFORM_ID", "87654321-4321-4321-4321-ba0987654321");
		vi.stubEnv("NOTION_DEFAULT_TAG_IDS", " en/tech, es/frontend ");

		const { collections } = await importContentConfig();

		expect(collections.notionArticles.loader).toMatchObject({
			name: "notion-articles-loader",
		});
	});

	it("uses the cached notion loader when BLOG_CONTENT_SOURCE is snapshot", async () => {
		vi.stubEnv("BLOG_CONTENT_SOURCE", "snapshot");
		const { collections } = await importContentConfig();

		expect(collections.notionArticles.loader).toMatchObject({
			name: "notion-articles-loader",
		});
	});

	it("parses the main collection schemas and applies defaults", async () => {
		const { z } = await import("astro/zod");
		const { collections } = await importContentConfig();

		const image = () => z.string();
		const resumeParsed = collections.resume.schema.parse({
			basics: {
				name: "Yuniel Acosta",
				label: "Fullstack",
				image: "/avatar.png",
				email: "yuniel@example.com",
				summary: "Resumen",
				location: {
					city: "Havana",
					countryCode: "CU",
					region: "La Habana",
				},
				profiles: [
					{
						network: "GitHub",
						username: "yacosta738",
						url: "https://github.com/yacosta738",
					},
				],
			},
			work: [
				{
					name: "YAP",
					position: "Engineer",
					startDate: "2024-01-01",
					endDate: "",
				},
			],
			volunteer: [
				{
					organization: "OSS",
					position: "Maintainer",
					startDate: "2023-01-01",
					endDate: undefined,
				},
			],
			education: [
				{
					institution: "CUJAE",
					area: "CS",
					studyType: "Bachelor",
					startDate: "2010-01-01",
					endDate: null,
				},
			],
			skills: [{ name: "TypeScript" }],
			projects: [
				{
					name: "Portfolio",
					startDate: "",
					endDate: "",
				},
			],
		});

		expect(resumeParsed.work[0]?.endDate).toBeNull();
		expect(resumeParsed.volunteer?.[0]?.endDate).toBeNull();
		expect(resumeParsed.education[0]?.endDate).toBeNull();
		expect(resumeParsed.projects?.[0]?.startDate).toBeUndefined();
		expect(resumeParsed.projects?.[0]?.endDate).toBeNull();

		const articleSchema = collections.articles.schema({ image });
		const articleParsed = articleSchema.parse({
			title: "Hello",
			description: "World",
			date: "2026-01-01",
			cover: "/cover.png",
			author: "en/yuniel-acosta-perez",
			tags: ["en/tech"],
			category: "en/software-development",
		});
		expect(articleParsed.draft).toBe(false);
		expect(articleParsed.featured).toBe(false);

		const notionParsed = collections.notionArticles.schema.parse({
			title: "Hello",
			description: "World",
			date: "2026-01-01",
			author: "en/yuniel-acosta-perez",
			tags: ["en/tech"],
			category: "en/software-development",
		});
		expect(notionParsed.draft).toBe(false);
		expect(notionParsed.featured).toBe(false);

		const projectMetadataParsed = collections.projectMetadata.schema.parse({
			title: "Portfolio",
			date: "2026-01-01T00:00:00.000Z",
			company: "YAP",
		});
		expect(projectMetadataParsed.showInProjects).toBe(false);
		expect(projectMetadataParsed.featured).toBe(false);
		expect(projectMetadataParsed.priority).toBe(0);
		expect(projectMetadataParsed.published).toBe(false);

		const externalArticleSchema = collections.externalArticles.schema({
			image,
		});
		const externalArticleParsed = externalArticleSchema.parse({
			title: "External",
			description: "Article",
			date: "2026-01-01",
			cover: "/cover.png",
			author: "en/yuniel-acosta-perez",
			tags: ["en/tech"],
			category: "en/software-development",
			link: "https://example.com/post",
		});
		expect(externalArticleParsed.isExternal).toBe(true);

		const authorParsed = collections.authors.schema.parse({
			name: "Yuniel",
			email: "yuniel@example.com",
			avatar: "/avatar.png",
			bio: "Bio",
			location: "Havana",
			socials: [
				{
					name: "GitHub",
					url: "https://github.com/yacosta738",
					icon: "github",
				},
			],
		});
		expect(authorParsed.socials).toHaveLength(1);
	});
});
