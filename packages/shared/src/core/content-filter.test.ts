import { describe, expect, it, vi } from "vitest";
import {
	type BaseContentCriteria,
	createContentEntryFilter,
	type FilterableContentEntry,
	matchesEntityId,
	matchesTags,
} from "./content-filter";

vi.mock("@/lib/collection.entity", () => ({
	parseEntityId: (id: string) => {
		const match = /^([a-z]{2}(?:-[a-z]{2})?)\/(.+)$/i.exec(id);
		if (match) return { lang: match[1], path: match[2] };
		return { lang: null, path: id };
	},
}));

describe("matchesEntityId", () => {
	it("returns true when criteria is undefined (no filter)", () => {
		expect(matchesEntityId(undefined, "any-id")).toBe(true);
	});

	it("returns false when criteria is set but entityId is undefined", () => {
		expect(matchesEntityId("author-1", undefined)).toBe(false);
	});

	it("returns true when string criteria matches entityId", () => {
		expect(matchesEntityId("author-1", "author-1")).toBe(true);
	});

	it("returns false when string criteria does not match", () => {
		expect(matchesEntityId("author-1", "author-2")).toBe(false);
	});

	it("returns true when array criteria includes entityId", () => {
		expect(matchesEntityId(["a", "b", "c"], "b")).toBe(true);
	});

	it("returns false when array criteria does not include entityId", () => {
		expect(matchesEntityId(["a", "b"], "z")).toBe(false);
	});

	it("returns false when empty array criteria", () => {
		expect(matchesEntityId([], "any")).toBe(false);
	});
});

describe("matchesTags", () => {
	it("returns true when criteria tags is undefined", () => {
		expect(matchesTags(undefined, [{ id: "tag-1" }])).toBe(true);
	});

	it("returns false when criteria is set but entry tags is undefined", () => {
		expect(matchesTags("tag-1", undefined)).toBe(false);
	});

	it("returns true when string criteria matches one of the entry tags", () => {
		expect(matchesTags("tag-2", [{ id: "tag-1" }, { id: "tag-2" }])).toBe(true);
	});

	it("returns false when string criteria matches none of the entry tags", () => {
		expect(matchesTags("tag-3", [{ id: "tag-1" }, { id: "tag-2" }])).toBe(
			false,
		);
	});

	it("returns true when array criteria has at least one match", () => {
		expect(
			matchesTags(["tag-a", "tag-b"], [{ id: "tag-b" }, { id: "tag-c" }]),
		).toBe(true);
	});

	it("returns false when array criteria has no matches", () => {
		expect(
			matchesTags(["tag-x", "tag-y"], [{ id: "tag-a" }, { id: "tag-b" }]),
		).toBe(false);
	});

	it("returns false when empty array criteria", () => {
		expect(matchesTags([], [{ id: "tag-1" }])).toBe(false);
	});

	it("returns true when criteria undefined and entry tags undefined", () => {
		expect(matchesTags(undefined, undefined)).toBe(true);
	});
});

describe("createContentEntryFilter", () => {
	const makeEntry = (
		overrides: Partial<FilterableContentEntry["data"]> = {},
		id = "en/my-post",
	): FilterableContentEntry => ({
		id,
		data: {
			draft: false,
			...overrides,
		},
	});

	const defaultOptions = { applyFeaturedFilter: false };

	it("filters out drafts by default", () => {
		const filter = createContentEntryFilter(undefined, defaultOptions);
		expect(filter(makeEntry({ draft: true }))).toBe(false);
		expect(filter(makeEntry({ draft: false }))).toBe(true);
	});

	it("includes drafts when includeDrafts is true", () => {
		const filter = createContentEntryFilter(
			{ includeDrafts: true },
			defaultOptions,
		);
		expect(filter(makeEntry({ draft: true }))).toBe(true);
	});

	it("filters by lang when criteria.lang is set", () => {
		const filter = createContentEntryFilter({ lang: "en" }, defaultOptions);
		expect(filter(makeEntry({}, "en/my-post"))).toBe(true);
		expect(filter(makeEntry({}, "es/my-post"))).toBe(false);
	});

	it("passes when criteria.lang is undefined", () => {
		const filter = createContentEntryFilter({}, defaultOptions);
		expect(filter(makeEntry({}, "en/my-post"))).toBe(true);
		expect(filter(makeEntry({}, "es/my-post"))).toBe(true);
	});

	it("passes entries without lang prefix when criteria.lang is undefined", () => {
		const filter = createContentEntryFilter({}, defaultOptions);
		expect(filter(makeEntry({}, "my-post-no-prefix"))).toBe(true);
	});

	it("rejects entry with no language prefix when criteria.lang is set", () => {
		const filter = createContentEntryFilter({ lang: "en" }, defaultOptions);
		// parseEntityId returns { lang: null, path: "my-post" } for unprefixed IDs,
		// so the lang filter should reject it
		expect(filter(makeEntry({}, "my-post"))).toBe(false);
	});

	it("filters by author", () => {
		const filter = createContentEntryFilter(
			{ author: "yuniel" },
			defaultOptions,
		);
		expect(filter(makeEntry({ author: { id: "yuniel" } }))).toBe(true);
		expect(filter(makeEntry({ author: { id: "other" } }))).toBe(false);
		expect(filter(makeEntry({}))).toBe(false);
	});

	it("filters by tags", () => {
		const filter = createContentEntryFilter(
			{ tags: ["typescript", "vitest"] },
			defaultOptions,
		);
		expect(filter(makeEntry({ tags: [{ id: "typescript" }] }))).toBe(true);
		expect(filter(makeEntry({ tags: [{ id: "rust" }] }))).toBe(false);
		expect(filter(makeEntry({}))).toBe(false);
	});

	it("filters by category", () => {
		const filter = createContentEntryFilter(
			{ category: "tutorials" },
			defaultOptions,
		);
		expect(filter(makeEntry({ category: { id: "tutorials" } }))).toBe(true);
		expect(filter(makeEntry({ category: { id: "news" } }))).toBe(false);
		expect(filter(makeEntry({}))).toBe(false);
	});

	it("applies featured filter when applyFeaturedFilter is true", () => {
		const filter = createContentEntryFilter(undefined, {
			applyFeaturedFilter: true,
			featured: true,
		});
		expect(filter(makeEntry({ featured: true }))).toBe(true);
		expect(filter(makeEntry({ featured: false }))).toBe(false);
		expect(filter(makeEntry({}))).toBe(false);
	});

	it("applies featured=false filter", () => {
		const filter = createContentEntryFilter(undefined, {
			applyFeaturedFilter: true,
			featured: false,
		});
		expect(filter(makeEntry({ featured: false }))).toBe(true);
		expect(filter(makeEntry({ featured: true }))).toBe(false);
	});

	it("skips featured filter when applyFeaturedFilter is false", () => {
		const filter = createContentEntryFilter(undefined, {
			applyFeaturedFilter: false,
			featured: true,
		});
		expect(filter(makeEntry({ featured: false }))).toBe(true);
		expect(filter(makeEntry({ featured: true }))).toBe(true);
	});

	it("skips featured filter when options.featured is undefined", () => {
		const filter = createContentEntryFilter(undefined, {
			applyFeaturedFilter: true,
			featured: undefined,
		});
		expect(filter(makeEntry({ featured: true }))).toBe(true);
		expect(filter(makeEntry({ featured: false }))).toBe(true);
	});

	it("handles undefined criteria", () => {
		const filter = createContentEntryFilter(undefined, defaultOptions);
		expect(filter(makeEntry())).toBe(true);
	});

	it("combines multiple criteria", () => {
		const criteria: BaseContentCriteria = {
			lang: "en",
			author: "yuniel",
			tags: "typescript",
			category: "tutorials",
		};
		const filter = createContentEntryFilter(criteria, {
			applyFeaturedFilter: true,
			featured: true,
		});

		const goodEntry = makeEntry(
			{
				author: { id: "yuniel" },
				tags: [{ id: "typescript" }],
				category: { id: "tutorials" },
				featured: true,
			},
			"en/my-post",
		);
		expect(filter(goodEntry)).toBe(true);

		// Fails on author
		const badAuthor = makeEntry(
			{
				author: { id: "other" },
				tags: [{ id: "typescript" }],
				category: { id: "tutorials" },
				featured: true,
			},
			"en/my-post",
		);
		expect(filter(badAuthor)).toBe(false);
	});
});
