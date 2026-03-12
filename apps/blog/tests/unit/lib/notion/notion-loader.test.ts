import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { createCachedNotionLoader } from "@/lib/notion/notion-loader";

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
		expect(logger.warn).toHaveBeenCalledWith(
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
});
