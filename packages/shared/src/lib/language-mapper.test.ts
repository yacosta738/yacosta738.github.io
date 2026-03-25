import { getCollection } from "astro:content";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageMapper } from "./language-mapper";

vi.mock("astro:content", () => ({
	getCollection: vi.fn(),
}));

// Update the MockLanguageEntry type to include missing fields
interface MockLanguageEntry {
	id: string;
	collection: "languagesLibrary";
	data: {
		code: string;
		nativeName: string;
		names: Record<string, string>;
		direction: "ltr" | "rtl";
		flag?: string;
	};
}

// Update the mockLanguageEntries to include the missing fields
const mockLanguageEntries: MockLanguageEntry[] = [
	{
		id: "1",
		collection: "languagesLibrary",
		data: {
			code: "en",
			nativeName: "English",
			names: { en: "English", es: "Inglés" },
			direction: "ltr",
		},
	},
	{
		id: "2",
		collection: "languagesLibrary",
		data: {
			code: "es",
			nativeName: "Español",
			names: { en: "Spanish", es: "Español" },
			direction: "ltr",
		},
	},
];

describe("LanguageMapper", () => {
	let languageMapper: LanguageMapper;

	beforeEach(async () => {
		vi.mocked(getCollection).mockResolvedValue(mockLanguageEntries);
		languageMapper = new LanguageMapper();
		await languageMapper.initialize();
	});

	it("should initialize and load language data", () => {
		expect(getCollection).toHaveBeenCalledWith("languagesLibrary");
		expect(languageMapper.getAllLanguages()).toHaveLength(2);
	});

	it("should find a locale code by language name", () => {
		expect(languageMapper.findLocaleCode("English")).toBe("en");
		expect(languageMapper.findLocaleCode("Inglés")).toBe("en");
		expect(languageMapper.findLocaleCode("Español")).toBe("es");
		expect(languageMapper.findLocaleCode("Spanish")).toBe("es");
	});

	it("should be case-insensitive when finding locale code", () => {
		expect(languageMapper.findLocaleCode("english")).toBe("en");
		expect(languageMapper.findLocaleCode("eSpAñOl")).toBe("es");
	});

	it("should return undefined for unknown language names", () => {
		expect(languageMapper.findLocaleCode("German")).toBeUndefined();
	});

	it("should return all languages", () => {
		const languages = languageMapper.getAllLanguages();
		expect(languages).toHaveLength(2);
		expect(languages[0].code).toBe("en");
	});

	it("should get a language by code", () => {
		const language = languageMapper.getLanguage("en");
		expect(language?.code).toBe("en");
		expect(language?.nativeName).toBe("English");
	});

	it("should return undefined for unknown language code", () => {
		expect(languageMapper.getLanguage("de")).toBeUndefined();
	});

	it("should get the display name of a language", () => {
		expect(languageMapper.getDisplayName("en", "es")).toBe("Inglés");
		expect(languageMapper.getDisplayName("es", "en")).toBe("Spanish");
	});

	it("should fall back to native name if display name is not available", () => {
		expect(languageMapper.getDisplayName("en", "fr" as string)).toBe("English");
	});

	it("should return undefined for getDisplayName with unknown language code", () => {
		expect(languageMapper.getDisplayName("de", "en")).toBeUndefined();
	});

	it("should return undefined for findLocaleCode with undefined input", () => {
		expect(languageMapper.findLocaleCode(undefined)).toBeUndefined();
	});

	it("should return undefined for findLocaleCode with empty string", () => {
		expect(languageMapper.findLocaleCode("")).toBeUndefined();
	});

	it("should not re-initialize if already initialized", async () => {
		vi.mocked(getCollection).mockClear();
		await languageMapper.initialize();
		expect(getCollection).not.toHaveBeenCalled();
	});

	describe("when uninitialized", () => {
		it("should return undefined for findLocaleCode", () => {
			const freshMapper = new LanguageMapper();
			expect(freshMapper.findLocaleCode("English")).toBeUndefined();
		});

		it("should return empty array for getAllLanguages", () => {
			const freshMapper = new LanguageMapper();
			expect(freshMapper.getAllLanguages()).toEqual([]);
		});
	});

	describe("when initialization fails", () => {
		it("should handle errors gracefully and remain uninitialized", async () => {
			const errorMapper = new LanguageMapper();
			vi.mocked(getCollection).mockRejectedValueOnce(
				new Error("Collection not found"),
			);
			const consoleSpy = vi
				.spyOn(console, "error")
				.mockImplementation(() => {});
			try {
				await errorMapper.initialize();
				expect(consoleSpy).toHaveBeenCalledWith(
					"Failed to initialize LanguageMapper:",
					expect.any(Error),
				);
				expect(errorMapper.findLocaleCode("English")).toBeUndefined();
			} finally {
				consoleSpy.mockRestore();
			}
		});
	});
});
