/** biome-ignore-all lint/suspicious/noExplicitAny: Mocking */
import { describe, expect, it } from "vitest";
import { toAuthor, toAuthors } from "./author.mapper";

const makeAuthorEntry = (overrides: Record<string, any> = {}): any => ({
	id: "en/john-doe",
	data: {
		name: "John Doe",
		email: "john@example.com",
		avatar: "/img/john.webp",
		bio: "A developer",
		location: "NYC",
		socials: [
			{ name: "Twitter", url: "https://twitter.com/john", icon: "twitter" },
		],
		...overrides,
	},
});

describe("author.mapper", () => {
	describe("toAuthor", () => {
		it("should map a full author entry to Author model", () => {
			const entry = makeAuthorEntry();
			const result = toAuthor(entry);
			expect(result).toEqual({
				id: "en/john-doe",
				slug: "en/john-doe",
				name: "John Doe",
				email: "john@example.com",
				avatar: "/img/john.webp",
				bio: "A developer",
				location: "NYC",
				socials: [
					{ name: "Twitter", url: "https://twitter.com/john", icon: "twitter" },
				],
			});
		});

		it("should default email to empty string when undefined", () => {
			const entry = makeAuthorEntry({ email: undefined });
			const result = toAuthor(entry);
			expect(result.email).toBe("");
		});

		it("should default avatar to empty string when undefined", () => {
			const entry = makeAuthorEntry({ avatar: undefined });
			const result = toAuthor(entry);
			expect(result.avatar).toBe("");
		});

		it("should default bio to empty string when undefined", () => {
			const entry = makeAuthorEntry({ bio: undefined });
			const result = toAuthor(entry);
			expect(result.bio).toBe("");
		});

		it("should default location to empty string when undefined", () => {
			const entry = makeAuthorEntry({ location: undefined });
			const result = toAuthor(entry);
			expect(result.location).toBe("");
		});

		it("should default socials to empty array when undefined", () => {
			const entry = makeAuthorEntry({ socials: undefined });
			const result = toAuthor(entry);
			expect(result.socials).toEqual([]);
		});

		it("should default all optional fields when all are undefined", () => {
			const entry = makeAuthorEntry({
				email: undefined,
				avatar: undefined,
				bio: undefined,
				location: undefined,
				socials: undefined,
			});
			const result = toAuthor(entry);
			expect(result.email).toBe("");
			expect(result.avatar).toBe("");
			expect(result.bio).toBe("");
			expect(result.location).toBe("");
			expect(result.socials).toEqual([]);
		});

		it("should throw when data object is missing", () => {
			const entry = { id: "en/john-doe" } as any;
			expect(() => toAuthor(entry)).toThrow(
				"Invalid author data: data object is missing",
			);
		});

		it("should throw when authorData is null", () => {
			expect(() => toAuthor(null as any)).toThrow(
				"Invalid author data: data object is missing",
			);
		});

		it("should throw when authorData is undefined", () => {
			expect(() => toAuthor(undefined as any)).toThrow(
				"Invalid author data: data object is missing",
			);
		});

		it("should throw when name is missing", () => {
			const entry = makeAuthorEntry({ name: "" });
			expect(() => toAuthor(entry)).toThrow(
				"Invalid author data: name is required",
			);
		});

		it("should throw when name is undefined", () => {
			const entry = makeAuthorEntry({ name: undefined });
			expect(() => toAuthor(entry)).toThrow(
				"Invalid author data: name is required",
			);
		});
	});

	describe("toAuthors", () => {
		it("should map an array of author entries", () => {
			const entries = [
				makeAuthorEntry(),
				makeAuthorEntry({ name: "Jane Doe" }),
			];
			// Override the id on the second entry to make it distinct
			entries[1].id = "es/jane-doe";
			const result = toAuthors(entries);
			expect(result).toHaveLength(2);
			expect(result[0].name).toBe("John Doe");
			expect(result[1].name).toBe("Jane Doe");
		});

		it("should return empty array for empty input", () => {
			const result = toAuthors([]);
			expect(result).toEqual([]);
		});
	});
});
