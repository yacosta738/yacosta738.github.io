import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createCachedNotionLoader } from "@blog/lib/notion/notion-loader";
import { afterEach, describe, expect, it, vi } from "vitest";

type StoreEntry = { id: string } & Record<string, unknown>;

const createStore = () => {
	const map = new Map<string, StoreEntry>();
	return {
		keys: () => map.keys(),
		entries: () => map.entries(),
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
		fork: () => logger,
	};
	return logger;
};

const createContext = (
	store: ReturnType<typeof createStore>,
	logger: ReturnType<typeof createLogger>,
) => {
	return {
		store,
		logger,
		parseData: async ({ data }: { data: unknown }) => data,
		generateDigest: () => "digest",
	};
};

afterEach(() => {
	vi.unstubAllEnvs();
});

describe("createCachedNotionLoader", () => {
	it("uses cached entries when Notion credentials are missing", async () => {
		const tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-cache-"));
		const cacheUrl = new URL(
			"notion-loader.json",
			pathToFileURL(`${tempDir}/`),
		);
		await writeFile(
			cacheUrl,
			JSON.stringify(
				{
					version: 1,
					databaseId: "db",
					lastSync: new Date().toISOString(),
					entries: [
						{
							id: "en/2026/03/11/cached",
							data: {
								title: "Cached entry",
								description: "Cached description",
								date: "2026-03-11T00:00:00.000Z",
								author: "en/yuniel-acosta-perez",
								tags: ["en/tech"],
								category: "en/software-development",
							},
						},
					],
				},
				null,
				2,
			),
			"utf-8",
		);

		const loader = createCachedNotionLoader({
			auth: "",
			database_id: "",
			cacheUrl,
		});
		const store = createStore();
		const logger = createLogger();
		const context = createContext(store, logger);

		await loader.load(context);

		expect(store.count()).toBe(1);
		expect(store.get("en/2026/03/11/cached")).toBeDefined();
		expect(logger.info).toHaveBeenCalledWith(
			expect.stringContaining("Notion credentials missing"),
		);

		await rm(tempDir, { recursive: true, force: true });
	});

	it("continues without entries when no cache exists", async () => {
		const tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-cache-"));
		const cacheUrl = new URL(
			"missing-cache.json",
			pathToFileURL(`${tempDir}/`),
		);
		const loader = createCachedNotionLoader({
			auth: "",
			database_id: "",
			cacheUrl,
		});
		const store = createStore();
		const logger = createLogger();
		const context = createContext(store, logger);

		await loader.load(context);

		expect(store.count()).toBe(0);
		expect(logger.warn).toHaveBeenCalledWith(
			expect.stringContaining("No Notion cache found"),
		);

		await rm(tempDir, { recursive: true, force: true });
	});

	it("falls back to cache when the live loader fails", async () => {
		vi.stubEnv("NOTION_LOADER_TRACE", "pre-query");

		const tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-cache-"));
		const cacheUrl = new URL(
			"fallback-cache.json",
			pathToFileURL(`${tempDir}/`),
		);
		await writeFile(
			cacheUrl,
			JSON.stringify(
				{
					version: 1,
					databaseId: "db",
					lastSync: new Date().toISOString(),
					entries: [
						{
							id: "en/2026/03/11/fallback",
							data: {
								title: "Fallback entry",
								description: "Recovered from cache",
								date: "2026-03-11T00:00:00.000Z",
								author: "en/yuniel-acosta-perez",
								tags: ["en/tech"],
								category: "en/software-development",
							},
							digest: "digest",
						},
					],
				},
				null,
				2,
			),
			"utf-8",
		);

		const loader = createCachedNotionLoader({
			auth: "token",
			database_id: "db",
			cacheUrl,
		});
		const store = createStore();
		const logger = createLogger();
		const context = createContext(store, logger);

		await loader.load(context);

		expect(store.count()).toBe(1);
		expect(store.get("en/2026/03/11/fallback")).toBeDefined();
		expect(logger.info).toHaveBeenCalledWith(
			expect.stringContaining(
				"Notion loader failed; attempting cache fallback.",
			),
		);

		await rm(tempDir, { recursive: true, force: true });
	});

	it("warns when a live loader failure has no cache fallback", async () => {
		vi.stubEnv("NOTION_LOADER_TRACE", "pre-query");

		const tempDir = await mkdtemp(path.join(os.tmpdir(), "notion-cache-"));
		const cacheUrl = new URL(
			"missing-fallback-cache.json",
			pathToFileURL(`${tempDir}/`),
		);

		const loader = createCachedNotionLoader({
			auth: "token",
			database_id: "db",
			cacheUrl,
		});
		const store = createStore();
		const logger = createLogger();
		const context = createContext(store, logger);

		await loader.load(context);

		expect(store.count()).toBe(0);
		expect(logger.warn).toHaveBeenCalledWith(
			expect.stringContaining(
				"No Notion cache found; continuing without Notion entries.",
			),
		);

		await rm(tempDir, { recursive: true, force: true });
	});
});
