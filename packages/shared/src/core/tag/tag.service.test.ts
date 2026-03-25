import { getCollection, getEntry } from "astro:content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getTagById, getTags } from "./tag.service";

vi.mock("astro:content", () => ({
	getCollection: vi.fn(),
	getEntry: vi.fn(),
}));

vi.mock("./tag.mapper", () => ({
	toTag: vi.fn((entry: { id: string; data: { title: string } }) => ({
		id: entry.id,
		slug: entry.id.replace(/^[a-z]{2}\//, ""),
		title: entry.data.title,
	})),
	toTags: vi.fn((entries: Array<{ id: string; data: { title: string } }>) =>
		entries.map((e) => ({
			id: e.id,
			slug: e.id.replace(/^[a-z]{2}\//, ""),
			title: e.data.title,
		})),
	),
}));

const mockGetCollection = vi.mocked(getCollection);
const mockGetEntry = vi.mocked(getEntry);

const fakeTagEntries = [
	{ id: "en/security", data: { title: "Security" } },
	{ id: "en/javascript", data: { title: "JavaScript" } },
	{ id: "es/security", data: { title: "Seguridad" } },
];

describe("getTags", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockGetCollection.mockImplementation(
			async (_name: string, filter?: (entry: never) => boolean) => {
				if (!filter) return fakeTagEntries as never;
				return fakeTagEntries.filter((e) => filter(e as never)) as never;
			},
		);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should return all tags when no criteria provided", async () => {
		const tags = await getTags();

		expect(mockGetCollection).toHaveBeenCalledWith(
			"tags",
			expect.any(Function),
		);
		expect(tags).toHaveLength(3);
	});

	it("should filter tags by language", async () => {
		const tags = await getTags({ lang: "en" });

		expect(tags).toHaveLength(2);
		expect(tags.every((t) => t.id.startsWith("en/"))).toBe(true);
	});

	it("should filter tags by title (case-insensitive)", async () => {
		const tags = await getTags({ title: "secur" });

		// Only "Security" contains "secur" (case-insensitive). "Seguridad" does not.
		expect(tags).toHaveLength(1);
	});

	it("should cache results for repeated calls with same criteria", async () => {
		const uniqueCriteria = { lang: "es", title: "segur" };

		const first = await getTags(uniqueCriteria);
		const second = await getTags(uniqueCriteria);

		expect(first).toBe(second); // Same reference = cached
		// getCollection is called only once for this criteria
	});

	it("should throw when getCollection fails", async () => {
		mockGetCollection.mockRejectedValueOnce(new Error("network error"));

		await expect(
			getTags({ lang: "en", title: "unique-fail-test" }),
		).rejects.toThrow("Failed to fetch tags");
	});
});

describe("getTagById", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return a tag when found", async () => {
		mockGetEntry.mockResolvedValueOnce({
			id: "en/security",
			data: { title: "Security" },
		} as never);

		const tag = await getTagById("en/security");

		expect(tag).toBeDefined();
		expect(tag?.title).toBe("Security");
	});

	it("should return undefined when entry not found", async () => {
		mockGetEntry.mockResolvedValueOnce(undefined as never);

		const tag = await getTagById("nonexistent");

		expect(tag).toBeUndefined();
	});

	it("should throw when getEntry fails", async () => {
		mockGetEntry.mockRejectedValueOnce(new Error("network error"));

		await expect(getTagById("en/security")).rejects.toThrow(
			"Failed to fetch tag with id en/security",
		);
	});
});
