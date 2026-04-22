import { mapNotionArticleEntry } from "@blog/lib/notion/notion-article.mapper";
import { describe, expect, it, vi } from "vitest";

vi.mock("@yap/astro-notion-loader", () => ({
	fileToUrl: () => new URL("https://example.com/notion-cover.png"),
}));

const textFragments = (value: string) => [
	{
		type: "text",
		text: { content: value, link: null },
		annotations: {
			bold: false,
			italic: false,
			strikethrough: false,
			underline: false,
			code: false,
			color: "default",
		},
		plain_text: value,
		href: null,
	},
];

const titleProperty = (value: string) => ({
	type: "title",
	id: "title",
	title: textFragments(value),
});

const richTextProperty = (value: string) => ({
	type: "rich_text",
	id: "rich",
	rich_text: textFragments(value),
});

const dateProperty = (value: string) => ({
	type: "date",
	id: "date",
	date: { start: value, end: null, time_zone: null },
});

const selectProperty = (value: string) => ({
	type: "select",
	id: "select",
	select: { id: "value", name: value, color: "blue" },
});

const relationProperty = (values: Array<{ id: string; name?: string }>) => ({
	type: "relation",
	id: "relation",
	relation: values,
});

const checkboxProperty = (value: boolean) => ({
	type: "checkbox",
	id: "checkbox",
	checkbox: value,
});

const statusProperty = (value: string) => ({
	type: "status",
	id: "status",
	status: { id: "status", name: value, color: "green" },
});

const lastEditedProperty = (value: string) => ({
	type: "last_edited_time",
	id: "last-edited",
	last_edited_time: value,
});

describe("mapNotionArticleEntry", () => {
	const platformId = "ea2cff95-e1ca-82ab-9712-8153e241fe9a";
	const mapOptions = {
		platformId,
		requiredType: "Article",
		requiredStatus: "Ready",
		now: new Date("2024-03-01T00:00:00.000Z"),
		defaultAuthorId: "en/yuniel-acosta-perez",
		defaultCategoryId: "en/software-development",
		defaultTags: ["en/tech"],
	};

	it("falls back to title when description is missing", () => {
		const entry = mapNotionArticleEntry(
			{
				cover: null,
				properties: {
					Name: titleProperty("Missing Description"),
					"Schedule Date": dateProperty("2024-01-02"),
					Platforms: relationProperty([{ id: platformId }]),
					Type: selectProperty("Article"),
					Status: statusProperty("Ready"),
					Published: checkboxProperty(true),
				},
			},
			"page-1",
			mapOptions,
		);

		expect(entry?.data.description).toBe("Missing Description");
		expect(entry?.data.author).toBe("en/yuniel-acosta-perez");
	});

	it("skips entries that are not published", () => {
		const entry = mapNotionArticleEntry(
			{
				cover: null,
				properties: {
					Name: titleProperty("Draft post"),
					Description: richTextProperty("Draft description"),
					"Schedule Date": dateProperty("2024-02-10"),
					Author: richTextProperty("Yuniel Acosta"),
					Platforms: relationProperty([{ id: platformId, name: "Astro" }]),
					Type: selectProperty("Article"),
					Status: statusProperty("Ready"),
					Published: checkboxProperty(false),
				},
			},
			"page-2",
			mapOptions,
		);

		expect(entry).toBeNull();
	});

	it("skips entries missing required category when no default is provided", () => {
		const entry = mapNotionArticleEntry(
			{
				cover: null,
				properties: {
					Name: titleProperty("Missing category"),
					Description: richTextProperty("Missing category description"),
					"Schedule Date": dateProperty("2024-02-10"),
					Author: richTextProperty("Yuniel Acosta"),
					Platforms: relationProperty([{ id: platformId }]),
					Type: selectProperty("Article"),
					Status: statusProperty("Ready"),
					Published: checkboxProperty(true),
				},
			},
			"page-2",
			{
				...mapOptions,
				defaultCategoryId: undefined,
			},
		);

		expect(entry).toBeNull();
	});

	it("generates id using locale, date, and slug", () => {
		const entry = mapNotionArticleEntry(
			{
				cover: null,
				properties: {
					Name: titleProperty("Hello World"),
					Description: richTextProperty("First post"),
					"Schedule Date": dateProperty("2024-01-02"),
					Author: richTextProperty("Yuniel Acosta"),
					Platforms: relationProperty([{ id: platformId }]),
					Type: selectProperty("Article"),
					Status: statusProperty("Ready"),
					Published: checkboxProperty(true),
					Locale: selectProperty("es"),
					"Last edited time": lastEditedProperty("2024-01-05T00:00:00.000Z"),
				},
			},
			"page-3",
			mapOptions,
		);

		expect(entry?.id).toBe("es/2024/01/02/hello-world");
		expect(entry?.data.tags).toEqual(["en/tech"]);
		expect(entry?.data.category).toBe("en/software-development");
		expect(entry?.data.lastModified).toBe("2024-01-05T00:00:00.000Z");
	});

	it("skips entries that have an empty slug (slugify returns empty string)", () => {
		// A title composed only of non-alphanumeric chars slugifies to ""
		const entry = mapNotionArticleEntry(
			{
				cover: null,
				properties: {
					Name: titleProperty("---!!!---"),
					"Schedule Date": dateProperty("2024-02-10"),
					Platforms: relationProperty([{ id: platformId }]),
					Type: selectProperty("Article"),
					Status: statusProperty("Ready"),
					Published: checkboxProperty(true),
				},
			},
			"page-slug",
			mapOptions,
		);

		expect(entry).toBeNull();
	});

	it("skips entries missing required author when no default is provided", () => {
		const entry = mapNotionArticleEntry(
			{
				cover: null,
				properties: {
					Name: titleProperty("No author post"),
					Description: richTextProperty("Description here"),
					"Schedule Date": dateProperty("2024-02-10"),
					Platforms: relationProperty([{ id: platformId }]),
					Type: selectProperty("Article"),
					Status: statusProperty("Ready"),
					Published: checkboxProperty(true),
				},
			},
			"page-author",
			{
				...mapOptions,
				defaultAuthorId: undefined,
			},
		);

		expect(entry).toBeNull();
	});

	it("emits a warning and continues when tags are absent and no default tags are set", () => {
		const warnSpy = vi.fn();
		const entry = mapNotionArticleEntry(
			{
				cover: null,
				properties: {
					Name: titleProperty("No tags post"),
					Description: richTextProperty("Some description"),
					"Schedule Date": dateProperty("2024-02-10"),
					Platforms: relationProperty([{ id: platformId }]),
					Type: selectProperty("Article"),
					Status: statusProperty("Ready"),
					Published: checkboxProperty(true),
				},
			},
			"page-notags",
			{
				...mapOptions,
				defaultTags: [],
				logger: { warn: warnSpy },
			},
		);

		expect(entry).not.toBeNull();
		expect(warnSpy).toHaveBeenCalledWith(
			expect.stringContaining("missing tags"),
		);
	});

	it("normalizes cover URLs from Notion files", () => {
		const entry = mapNotionArticleEntry(
			{
				cover: {
					type: "external",
					external: { url: "https://example.com/notion-cover.png" },
				},
				properties: {
					Name: titleProperty("Cover test"),
					Description: richTextProperty("Cover description"),
					"Schedule Date": dateProperty("2024-01-02"),
					Author: richTextProperty("Yuniel Acosta"),
					Platforms: relationProperty([{ id: platformId }]),
					Type: selectProperty("Article"),
					Status: statusProperty("Ready"),
					Published: checkboxProperty(true),
				},
			},
			"page-4",
			mapOptions,
		);

		expect(entry?.data.cover).toBe("https://example.com/notion-cover.png");
	});
});
