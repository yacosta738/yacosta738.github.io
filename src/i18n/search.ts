import type { DocSearchTranslation } from "@i18n:search-translation";
import type { AstroGlobal } from "astro";

/**
 * Convert the map of modules returned by `import.meta.globEager` to an object
 * mapping the language code from each module’s filepath to the module’s default export.
 */
function mapDefaultExports<T>(modules: Record<string, { default: T }>) {
	const exportMap: Record<string, T> = {};
	for (const [path, module] of Object.entries(modules)) {
		const [_dot, lang] = path.split("/");
		exportMap[lang] = module.default;
	}
	return exportMap;
}

const docsearchTranslations = mapDefaultExports<DocSearchTranslation>(
	import.meta.glob("./*/docsearch.ts", {
		eager: true,
	}),
);

const fallbackLang = "en";

/** Returns a dictionary of strings for use with DocSearch. */
export function getDocSearchStrings(Astro: AstroGlobal): DocSearchTranslation {
	const lang = getLanguageFromURL(Astro.url.pathname) || fallbackLang;
	// A shallow merge is sufficient here as most of the actual fallbacks are provided by DocSearch.
	return {
		...docsearchTranslations[fallbackLang],
		...docsearchTranslations[lang],
	};
}

export function getLanguageFromURL(pathname: string) {
	const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//);
	return langCodeMatch ? langCodeMatch[1] : "en";
}
