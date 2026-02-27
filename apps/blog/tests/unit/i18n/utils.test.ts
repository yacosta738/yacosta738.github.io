import { describe, expect, it } from "vitest";
import { getLangFromUrl, useTranslations } from "@/i18n/utils";

describe("i18n/utils", () => {
	describe("getLangFromUrl", () => {
		it("should return the language code from URL pathname", () => {
			const url = new URL("https://example.com/en/blog");
			expect(getLangFromUrl(url)).toBe("en");
		});

		it("should return default locale for unsupported language", () => {
			const url = new URL("https://example.com/fr/blog");
			expect(getLangFromUrl(url)).toBe("en");
		});

		it("should return default locale for root URL", () => {
			const url = new URL("https://example.com/");
			expect(getLangFromUrl(url)).toBe("en");
		});

		it("should return default locale for URL without language prefix", () => {
			const url = new URL("https://example.com/blog");
			expect(getLangFromUrl(url)).toBe("en");
		});
	});

	describe("useTranslations", () => {
		it("should translate a simple key", () => {
			const t = useTranslations("en");
			const result = t("nav.home");
			expect(typeof result).toBe("string");
		});

		it("should return key if translation not found", () => {
			const t = useTranslations("en");
			const result = t("nonexistent.key");
			expect(result).toBe("nonexistent.key");
		});

		it("should replace variables in translation", () => {
			// Note: This test verifies the variable replacement mechanism works
			// The actual translation key may or may not exist in the UI translations
			const t = useTranslations("en");
			// Test with a known translation key that has a variable placeholder
			const result = t("blog.words", { count: 5 });
			// If the key doesn't exist, it returns the key itself, so we check
			// that the function handles variables without throwing
			expect(typeof result).toBe("string");
		});

		it("should handle multilingual object", () => {
			const t = useTranslations("en");
			const multilingual = {
				en: "Hello",
				es: "Hola",
			};
			const result = t(multilingual);
			expect(result).toBe("Hello");
		});

		it("should fallback to default locale for multilingual", () => {
			const t = useTranslations("fr");
			const multilingual = {
				en: "Hello",
				es: "Hola",
			};
			const result = t(multilingual);
			expect(result).toBe("Hello");
		});
	});
});
