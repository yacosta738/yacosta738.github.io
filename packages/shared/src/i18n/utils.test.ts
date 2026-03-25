import { describe, expect, it } from "vitest";
import { getLangFromUrl, useTranslations } from "./utils";

describe("getLangFromUrl", () => {
	it("should return the language from the URL path", () => {
		const url = new URL("https://example.com/es/about");
		expect(getLangFromUrl(url)).toBe("es");
	});

	it("should return default locale for unsupported language", () => {
		const url = new URL("https://example.com/fr/about");
		expect(getLangFromUrl(url)).toBe("en");
	});

	it("should return default locale for root URL", () => {
		const url = new URL("https://example.com/");
		expect(getLangFromUrl(url)).toBe("en");
	});

	it("should return 'en' for English path", () => {
		const url = new URL("https://example.com/en/about");
		expect(getLangFromUrl(url)).toBe("en");
	});

	it("should return default locale when path has no language prefix", () => {
		const url = new URL("https://example.com/about");
		expect(getLangFromUrl(url)).toBe("en");
	});
});

describe("useTranslations", () => {
	it("should return a translation function", () => {
		const t = useTranslations("en");
		expect(typeof t).toBe("function");
	});

	describe("with string key", () => {
		it("should return the key itself when no translation found", () => {
			const t = useTranslations("en");
			expect(t("nonexistent.key")).toBe("nonexistent.key");
		});
	});

	describe("with Multilingual object", () => {
		it("should return text for the requested language", () => {
			const t = useTranslations("en");
			const result = t({ en: "Hello", es: "Hola" });
			expect(result).toBe("Hello");
		});

		it("should return Spanish text for es locale", () => {
			const t = useTranslations("es");
			const result = t({ en: "Hello", es: "Hola" });
			expect(result).toBe("Hola");
		});

		it("should fall back to default locale when target language is missing", () => {
			const t = useTranslations("es");
			const result = t({ en: "Hello" });
			expect(result).toBe("Hello");
		});

		it("should return empty string when no language matches", () => {
			const t = useTranslations("es");
			const result = t({});
			expect(result).toBe("");
		});
	});

	describe("variable interpolation", () => {
		it("should replace variables in the text", () => {
			const t = useTranslations("en");
			const result = t({ en: "Hello {name}!" }, { name: "World" });
			expect(result).toBe("Hello World!");
		});

		it("should replace multiple variables", () => {
			const t = useTranslations("en");
			const result = t(
				{ en: "{greeting} {name}!" },
				{
					greeting: "Hi",
					name: "Alice",
				},
			);
			expect(result).toBe("Hi Alice!");
		});

		it("should handle numeric variable values", () => {
			const t = useTranslations("en");
			const result = t({ en: "Page {num} of {total}" }, { num: 1, total: 10 });
			expect(result).toBe("Page 1 of 10");
		});

		it("should replace all occurrences of a variable", () => {
			const t = useTranslations("en");
			const result = t({ en: "{x} and {x}" }, { x: "A" });
			expect(result).toBe("A and A");
		});

		it("should work with string key and variables", () => {
			const t = useTranslations("en");
			// When key not found in ui, returns the key, then replaces vars in it
			const result = t("hello {name}", { name: "Bob" });
			expect(result).toBe("hello Bob");
		});
	});
});
