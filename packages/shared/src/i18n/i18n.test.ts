import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mockShowDefaultLang = vi.fn().mockReturnValue(false);
const mockExtractTagSlugFromPath = vi.fn();
const mockGetTagLocalePaths = vi.fn();
const mockIsTagPage = vi.fn();

vi.mock("@/core/tag", () => ({
	extractTagSlugFromPath: mockExtractTagSlugFromPath,
	getTagLocalePaths: mockGetTagLocalePaths,
	isTagPage: mockIsTagPage,
}));

vi.mock("./types", async (importOriginal) => {
	const actual = await importOriginal<typeof import("./types")>();
	return {
		...actual,
		get SHOW_DEFAULT_LANG_IN_URL() {
			return mockShowDefaultLang();
		},
	};
});

vi.mock("astro:i18n", () => ({
	getRelativeLocaleUrl: vi.fn((lang: string, path: string) =>
		lang === "en" ? path : `/${lang}${path}`,
	),
}));

let getLocalePaths: typeof import("./i18n")["getLocalePaths"];
let getLocalePathsEnhanced: typeof import("./i18n")["getLocalePathsEnhanced"];
let localeParams: typeof import("./i18n")["localeParams"];
let localeRouteParams: typeof import("./i18n")["localeRouteParams"];
let retrieveLocalizedString: typeof import("./i18n")["retrieveLocalizedString"];
let useTranslatedPath: typeof import("./i18n")["useTranslatedPath"];

beforeAll(async () => {
	const mod = await import("./i18n");
	getLocalePaths = mod.getLocalePaths;
	getLocalePathsEnhanced = mod.getLocalePathsEnhanced;
	localeParams = mod.localeParams;
	localeRouteParams = mod.localeRouteParams;
	retrieveLocalizedString = mod.retrieveLocalizedString;
	useTranslatedPath = mod.useTranslatedPath;
});

describe("shared i18n helpers", () => {
	beforeEach(() => {
		mockShowDefaultLang.mockReset();
		mockShowDefaultLang.mockReturnValue(false);
		mockExtractTagSlugFromPath.mockReset();
		mockGetTagLocalePaths.mockReset();
		mockIsTagPage.mockReset();
		vi.stubEnv("LANG", "es");
	});

	it("builds translated paths for target languages", () => {
		const translatePath = useTranslatedPath("en");

		expect(translatePath("/about", "es")).toBe("/es/about");
		expect(translatePath("/es/about", "en")).toBe("/about");
	});

	it("returns locale paths for all languages", () => {
		const paths = getLocalePaths(new URL("https://example.com/en/about"));

		expect(paths).toEqual([
			{ lang: "en", path: "/about" },
			{ lang: "es", path: "/es/about" },
		]);
	});

	it("uses tag-aware paths for tag pages", async () => {
		mockIsTagPage.mockReturnValue(true);
		mockExtractTagSlugFromPath.mockReturnValue("security");
		mockGetTagLocalePaths.mockResolvedValue([
			{ lang: "en", path: "/tag/security", tagFound: true },
			{ lang: "es", path: { path: "/es/tag/seguridad" }, tagFound: true },
		]);

		const paths = await getLocalePathsEnhanced(
			new URL("https://example.com/en/tag/security"),
		);

		expect(paths).toEqual([
			{ lang: "en", path: "/tag/security" },
			{ lang: "es", path: "/es/tag/seguridad" },
		]);
	});

	it("falls back to the standard locale paths for non-tag pages", async () => {
		mockIsTagPage.mockReturnValue(false);

		const paths = await getLocalePathsEnhanced(
			new URL("https://example.com/en/about"),
		);

		expect(paths).toEqual([
			{ lang: "en", path: "/about" },
			{ lang: "es", path: "/es/about" },
		]);
	});

	it("exposes locale params based on the configured locales", () => {
		expect(localeParams).toEqual([
			{ params: { lang: "en" } },
			{ params: { lang: "es" } },
		]);
		expect(localeRouteParams).toEqual([{ params: { lang: "es" } }]);
	});

	it("retrieves localized strings using the current environment language", () => {
		expect(retrieveLocalizedString({ en: "Hello", es: "Hola" })).toBe("Hola");
	});
});
