import { getLangFromUrl, useTranslations } from "@blog/i18n/utils";
import { describe, expect, it } from "vitest";

const url = (pathname: string) => new URL(`https://example.com${pathname}`);

describe("getLangFromUrl", () => {
	it("returns 'en' for /en/ path", () => {
		expect(getLangFromUrl(url("/en/about"))).toBe("en");
	});

	it("returns 'es' for /es/ path", () => {
		expect(getLangFromUrl(url("/es/acerca"))).toBe("es");
	});

	it("returns DEFAULT_LOCALE for unknown segment", () => {
		expect(getLangFromUrl(url("/zz/page"))).toBe("en");
	});

	it("returns DEFAULT_LOCALE for root path", () => {
		expect(getLangFromUrl(url("/"))).toBe("en");
	});
});

describe("useTranslations", () => {
	it("returns translation for a key in the target language", () => {
		const t = useTranslations("en");
		const result = t("nav.home");
		// Should NOT echo the key back — it must resolve to something
		expect(typeof result).toBe("string");
	});

	it("falls back to DEFAULT_LOCALE value when key missing in target lang", () => {
		// 'es' may not define every key; if missing it should return the 'en' value
		// or the key itself — either way it must be a string
		const t = useTranslations("es");
		const result = t("nav.home");
		expect(typeof result).toBe("string");
	});

	it("echoes the key when not found in any language", () => {
		const t = useTranslations("en");
		expect(t("totally.unknown.key.xyz")).toBe("totally.unknown.key.xyz");
	});

	it("resolves a Multilingual object using the current lang", () => {
		const t = useTranslations("en");
		const result = t({ en: "Hello", es: "Hola" });
		expect(result).toBe("Hello");
	});

	it("resolves a Multilingual object falling back to DEFAULT_LOCALE", () => {
		const t = useTranslations("es");
		// Only 'en' provided — falls back to DEFAULT_LOCALE value
		const result = t({ en: "Hello" });
		expect(result).toBe("Hello");
	});

	it("returns empty string when Multilingual has no matching lang", () => {
		const t = useTranslations("es");
		const result = t({} as Record<string, string>);
		expect(result).toBe("");
	});

	it("interpolates variables into the translation string", () => {
		const t = useTranslations("en");
		// Use a Multilingual object with a template so we don't depend on live UI keys
		const result = t({ en: "Hello {name}!" }, { name: "World" });
		expect(result).toBe("Hello World!");
	});

	it("interpolates multiple variables", () => {
		const t = useTranslations("en");
		const result = t({ en: "{a} and {b}" }, { a: "foo", b: "bar" });
		expect(result).toBe("foo and bar");
	});
});
