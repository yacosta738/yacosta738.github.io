import type { Lang, UIDict, UIMultilingual } from "./types";

// Use import.meta.glob to get all translation files
const translationModules = import.meta.glob<
	Record<string, Record<Lang, UIDict>>
>("./translations/*.ts", { eager: true });

// Initialize the UI multilingual object with empty objects for each language
const initialUI: UIMultilingual = {
	en: {},
	es: {},
};

/**
 * The main UI translations object.
 * This object is dynamically built by importing all translation files from the
 * `./translations/` directory and merging them. This allows for modular translation
 * management while providing a single source of truth for the application.
 *
 * @type {UIMultilingual}
 */
export const ui: UIMultilingual = Object.values(translationModules).reduce(
	(acc, module) => {
		// Extract the first export from the module (the translation object)
		const translationExport = Object.values(module)[0];

		if (!translationExport) return acc;

		// For each language in the export
		for (const [lang, translations] of Object.entries(translationExport)) {
			if (lang in acc) {
				// Merge translations into the accumulated object
				acc[lang as Lang] = {
					...acc[lang as Lang],
					...(translations as UIDict),
				};
			}
		}

		return acc;
	},
	initialUI,
);

// Enhanced debug log to check what was loaded
if (process.env.NODE_ENV === "development") {
	console.log(
		"㊙︎ Loaded translations:",
		Object.keys(ui)
			.map((lang) => `${lang}: ${Object.keys(ui[lang]).length} keys`)
			.join(", "),
	);
}
