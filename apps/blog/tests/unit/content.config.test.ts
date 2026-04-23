import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const createCachedNotionLoaderMock = vi.fn(
	(config: Record<string, unknown>) => ({
		name: "notion-articles-loader",
		config,
	}),
);
const snapshotPath = fileURLToPath(
	new URL("../../.cache/notion-loader.json", import.meta.url),
);

const importContentConfig = async () => {
	vi.resetModules();
	createCachedNotionLoaderMock.mockClear();
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
	vi.doMock("../../src/lib/notion/notion-loader", () => ({
		createCachedNotionLoader: createCachedNotionLoaderMock,
	}));
	vi.doMock("../../src/lib/notion/notion-blocks", () => ({
		notionBlockFallbacks: vi.fn(),
	}));

	return import("../../src/content.config");
};

describe("content.config", () => {
	beforeEach(() => {
		vi.unstubAllEnvs();
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		rmSync(snapshotPath, { force: true });
		vi.doUnmock("astro/loaders");
		vi.doUnmock("astro:content");
		vi.doUnmock("../../src/lib/notion/notion-loader");
		vi.doUnmock("../../src/lib/notion/notion-blocks");
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
		expect(createCachedNotionLoaderMock).toHaveBeenCalledWith(
			expect.objectContaining({
				auth: "token",
				database_id: "123456781234123412341234567890ab",
				platformId: "87654321432143214321ba0987654321",
				defaultTags: ["en/tech", "es/frontend"],
			}),
		);
	});

	it("uses the cached notion loader when BLOG_CONTENT_SOURCE is snapshot", async () => {
		vi.stubEnv("BLOG_CONTENT_SOURCE", "snapshot");
		vi.stubEnv("NOTION_TOKEN", "token");
		vi.stubEnv("NOTION_DATABASE_ID", "12345678-1234-1234-1234-1234567890ab");
		mkdirSync(path.dirname(snapshotPath), { recursive: true });
		writeFileSync(
			snapshotPath,
			JSON.stringify({
				version: 1,
				lastSync: new Date().toISOString(),
				entries: [],
			}),
			"utf8",
		);
		const { collections } = await importContentConfig();

		expect(collections.notionArticles.loader).toMatchObject({
			name: "notion-articles-loader",
		});
		expect(createCachedNotionLoaderMock).toHaveBeenCalledWith(
			expect.objectContaining({
				auth: "",
				database_id: "",
			}),
		);
	});

	it("parses the main collection schemas and applies defaults", async () => {
		vi.stubEnv("BLOG_CONTENT_SOURCE", "disabled");
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
