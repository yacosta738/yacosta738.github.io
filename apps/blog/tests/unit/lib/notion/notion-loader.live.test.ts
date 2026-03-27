import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@notionhq/client", async () => import("./notion-client.mock"));

type StoreEntry = { id: string } & Record<string, unknown>;

const createStore = () => {
	const map = new Map<string, StoreEntry>();
	return {
		keys: () => map.keys(),
		entries: () => Array.from(map.entries()),
		get: (id: string) => map.get(id),
		set: (entry: { id: string }) => {
			map.set(entry.id, entry);
		},
		delete: (id: string) => map.delete(id),
		clear: () => map.clear(),
		count: () => map.size,
	};
};

const createLogger = () => {
	const logger = {
		info: vi.fn(),
		warn: vi.fn(),
		debug: vi.fn(),
		error: vi.fn(),
		fork: () => logger,
	};
	return logger;
};

const createContext = (
	store: ReturnType<typeof createStore>,
	logger: ReturnType<typeof createLogger>,
) => ({
	store,
	logger,
	parseData: async ({ data }: { data: unknown }) => data,
	generateDigest: () => "digest",
});

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

const createLivePage = (platformId: string) => ({
	id: "page-1",
	last_edited_time: "2024-01-05T00:00:00.000Z",
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
	},
});

const importLoader = async () => {
	vi.resetModules();
	return import("@blog/lib/notion/notion-loader");
};

afterEach(() => {
	delete globalThis.__notionImportError;
	delete globalThis.__notionPages;
	vi.unstubAllEnvs();
	vi.resetModules();
});

describe("createCachedNotionLoader live sync", () => {
	it("maps live Notion pages and writes the cache on success", async () => {
		vi.stubEnv("NOTION_LOADER_RENDER", "0");
		const platformId = "ea2cff95e1ca82ab97128153e241fe9a";
		globalThis.__notionPages = [createLivePage(platformId)];

		const { createCachedNotionLoader } = await importLoader();
		const tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-live-"));
		const cacheUrl = new URL("live-cache.json", pathToFileURL(`${tempDir}/`));
		const loader = createCachedNotionLoader({
			auth: "token",
			database_id: "db",
			cacheUrl,
			platformId,
			requiredType: "Article",
			requiredStatus: "Ready",
			defaultAuthorId: "en/yuniel-acosta-perez",
			defaultCategoryId: "en/software-development",
			defaultTags: ["en/tech"],
		});
		const store = createStore();
		const logger = createLogger();
		const context = createContext(store, logger);

		await loader.load(context);

		expect(store.count()).toBe(1);
		const cache = JSON.parse(await readFile(cacheUrl, "utf-8")) as {
			entries: Array<{ id: string; sourceId: string; data: { title: string } }>;
		};
		expect(cache.entries).toHaveLength(1);
		expect(cache.entries[0]).toMatchObject({
			sourceId: "page-1",
			data: { title: "Hello World" },
		});

		await rm(tempDir, { recursive: true, force: true });
	});

	it("skips mapping when NOTION_LOADER_SKIP_MAP is enabled", async () => {
		vi.stubEnv("NOTION_LOADER_RENDER", "0");
		vi.stubEnv("NOTION_LOADER_SKIP_MAP", "1");
		const platformId = "ea2cff95e1ca82ab97128153e241fe9a";
		globalThis.__notionPages = [createLivePage(platformId)];

		const { createCachedNotionLoader } = await importLoader();
		const tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-skip-map-"));
		const cacheUrl = new URL(
			"skip-map-cache.json",
			pathToFileURL(`${tempDir}/`),
		);
		const loader = createCachedNotionLoader({
			auth: "token",
			database_id: "db",
			cacheUrl,
			platformId,
		});
		const store = createStore();
		const logger = createLogger();
		const context = createContext(store, logger);

		await loader.load(context);

		expect(store.get("page-1")).toBeDefined();
		expect(store.get("en/2024/01/02/hello-world")).toBeUndefined();

		await rm(tempDir, { recursive: true, force: true });
	});

	it("emits a targeted warning for invalid tokens", async () => {
		const tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-errors-"));
		const baseUrl = pathToFileURL(`${tempDir}/`);
		globalThis.__notionImportError = "api token is invalid";

		const { createCachedNotionLoader } = await importLoader();
		const loader = createCachedNotionLoader({
			auth: "token",
			database_id: "db",
			cacheUrl: new URL("invalid-token.json", baseUrl),
		});
		const store = createStore();
		const logger = createLogger();
		const context = createContext(store, logger);

		await loader.load(context);

		expect(logger.info).toHaveBeenCalledWith(
			"Notion token rejected. Check NOTION_TOKEN in build env and re-share the database with the integration.",
		);

		await rm(tempDir, { recursive: true, force: true });
	});

	it("emits a targeted warning for missing databases", async () => {
		const tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-errors-"));
		const baseUrl = pathToFileURL(`${tempDir}/`);
		globalThis.__notionImportError = "object not found";

		const { createCachedNotionLoader } = await importLoader();
		const loader = createCachedNotionLoader({
			auth: "token",
			database_id: "db",
			cacheUrl: new URL("missing-database.json", baseUrl),
		});
		const store = createStore();
		const logger = createLogger();
		const context = createContext(store, logger);

		await loader.load(context);

		expect(logger.info).toHaveBeenCalledWith(
			"Notion database not found or not shared. Verify NOTION_DATABASE_ID and ensure the integration has access.",
		);

		await rm(tempDir, { recursive: true, force: true });
	});
});
