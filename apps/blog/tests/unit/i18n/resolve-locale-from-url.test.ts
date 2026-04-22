import { describe, expect, it } from "vitest";
import { resolveLocaleFromUrl } from "@blog/i18n/utils/resolveLocaleFromUrl";

const url = (pathname: string) => new URL(`https://example.com${pathname}`);

describe("resolveLocaleFromUrl", () => {
	it("returns paramsLang when it is a valid locale", () => {
		const result = resolveLocaleFromUrl(url("/anything"), "en");
		expect(result).toBe("en");
	});

	it("prefers paramsLang over the URL segment when both are valid", () => {
		const result = resolveLocaleFromUrl(url("/es/some-post"), "en");
		expect(result).toBe("en");
	});

	it("falls through to the URL segment when paramsLang is absent", () => {
		const result = resolveLocaleFromUrl(url("/es/some-post"));
		expect(result).toBe("es");
	});

	it("falls through to the URL segment when paramsLang is invalid", () => {
		const result = resolveLocaleFromUrl(url("/es/some-post"), "zz");
		expect(result).toBe("es");
	});

	it("falls back to DEFAULT_LOCALE when neither paramsLang nor URL segment is valid", () => {
		const result = resolveLocaleFromUrl(url("/unknown/path"));
		expect(result).toBe("en");
	});

	it("falls back to DEFAULT_LOCALE on root path", () => {
		const result = resolveLocaleFromUrl(url("/"));
		expect(result).toBe("en");
	});

	it("returns 'es' locale from URL segment", () => {
		const result = resolveLocaleFromUrl(url("/es/"));
		expect(result).toBe("es");
	});
});
