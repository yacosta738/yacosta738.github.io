/** biome-ignore-all lint/suspicious/noExplicitAny: Mocking */
import { getCollection } from "astro:content";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { parseEntityId } from "@/lib/collection.entity";
import { toAuthors } from "./author.mapper";
import { getAuthorById, getAuthors } from "./author.service";

// Mock the dependencies
vi.mock("astro:content", () => ({
	getCollection: vi.fn(),
}));

vi.mock("./author.mapper", () => ({
	toAuthors: vi.fn((authors: Array<{ id: string }>) =>
		Promise.resolve(authors.map((a) => ({ ...a, id: a.id }))),
	),
}));

vi.mock("@/lib/collection.entity", () => ({
	parseEntityId: vi.fn(),
}));

const mockAuthors = [
	{
		id: "en/author-1",
		data: {
			name: "John Doe",
			location: "New York",
		},
	},
	{
		id: "es/author-2",
		data: {
			name: "Jane Doe",
			location: "London",
		},
	},
];

describe("AuthorService", () => {
	beforeEach(() => {
		// Mock the getCollection to simulate filtering
		vi.mocked(getCollection).mockImplementation(async (_collection, filter) => {
			if (filter) {
				return mockAuthors.filter(filter) as any;
			}
			return mockAuthors as any;
		});

		// Mock parseEntityId
		vi.mocked(parseEntityId).mockImplementation((id) => ({
			lang: id.split("/")[0] as "en" | "es",
			path: id.split("/")[1],
		}));

		// Mock toAuthors
		// Mock toAuthors to mirror the real signature: accept CollectionEntry<"authors">[] and return Author[]
		vi.mocked(toAuthors).mockImplementation(
			(authors: any[]) =>
				authors.map((a) => ({
					id: a.id,
					name: a.data?.name ?? "",
					email: a.data?.email ?? "",
					location: a.data?.location ?? "",
					avatar: a.data?.avatar ?? "",
					bio: a.data?.bio ?? "",
					socials: a.data?.socials ?? [],
				})) as any,
		);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getAuthors", () => {
		it("should return all authors by default", async () => {
			const authors = await getAuthors();
			expect(authors).toHaveLength(2);
		});

		it("should filter authors by lang", async () => {
			const authors = await getAuthors({ lang: "en" });
			expect(authors).toHaveLength(1);
			expect(authors[0].id).toBe("en/author-1");
		});

		it("should filter authors by name", async () => {
			const authors = await getAuthors({ name: "John" });
			expect(authors).toHaveLength(1);
			expect(authors[0].id).toBe("en/author-1");
		});

		it("should filter authors by location", async () => {
			const authors = await getAuthors({ location: "London" });
			expect(authors).toHaveLength(1);
			expect(authors[0].id).toBe("es/author-2");
		});
	});

	describe("getAuthorById", () => {
		it("should return an author by id", async () => {
			const author = await getAuthorById("en/author-1");
			expect(author).toBeDefined();
			expect(author?.id).toBe("en/author-1");
		});

		it("should return undefined if author not found", async () => {
			const author = await getAuthorById("non-existent");
			expect(author).toBeUndefined();
		});
	});
});
