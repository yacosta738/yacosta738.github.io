import { getCollection } from "astro:content";
import type { Lang } from "@/i18n";

/**
 * Represents a language entry in the language library.
 *
 * @property {string} code - The BCP 47 language code (e.g., "en", "es").
 * @property {string} nativeName - The name of the language in its own language (e.g., "English", "Español").
 * @property {Record<string, string>} names - A map of locale codes to the language's name in that locale.
 * @property {string} [flag] - An optional flag emoji for the language.
 * @property {"ltr" | "rtl"} direction - The text direction of the language.
 */
export interface LanguageEntry {
	code: string;
	nativeName: string;
	names: Record<string, string>;
	flag?: string;
	direction: "ltr" | "rtl";
}

/**
 * A service class for resolving language names to locale codes and vice versa.
 * It initializes its data from the `languagesLibrary` content collection.
 */
export class LanguageMapper {
	private readonly languagesMap: Map<string, LanguageEntry> = new Map();
	private readonly nameToCodeMap: Map<string, string> = new Map();
	private initialized = false;

	/**
	 * Initializes the language mapper by loading data from the content collection.
	 * This method should be called once before using the mapper.
	 * @returns {Promise<void>}
	 */
	async initialize(): Promise<void> {
		if (this.initialized) return;

		try {
			const languageEntries = await getCollection("languagesLibrary");

			for (const entry of languageEntries) {
				const lang: LanguageEntry = {
					code: entry.data.code,
					nativeName: entry.data.nativeName,
					names: entry.data.names,
					flag: entry.data.flag,
					direction: entry.data.direction,
				};

				this.languagesMap.set(lang.code, lang);

				// Build reverse mapping from any known name to the language code
				Object.values(lang.names).forEach((name) => {
					this.nameToCodeMap.set(name.toLowerCase(), lang.code);
				});
				this.nameToCodeMap.set(lang.nativeName.toLowerCase(), lang.code);
			}

			this.initialized = true;
		} catch (error) {
			console.error("Failed to initialize LanguageMapper:", error);
		}
	}

	/**
	 * Finds the locale code for a given language name.
	 * @param {string} [languageName] - The language name to look up (e.g., "English", "Inglés").
	 * @returns {string | undefined} The locale code (e.g., "en") or undefined if not found.
	 */
	findLocaleCode(languageName?: string): string | undefined {
		if (!languageName || !this.initialized) return undefined;

		const normalizedName = languageName.toLowerCase().trim();
		return this.nameToCodeMap.get(normalizedName);
	}

	/**
	 * Gets all supported language entries from the library.
	 * @returns {LanguageEntry[]} An array of all language entries.
	 */
	getAllLanguages(): LanguageEntry[] {
		return Array.from(this.languagesMap.values());
	}

	/**
	 * Gets a specific language entry by its code.
	 * @param {string} code - The language code (e.g., "en").
	 * @returns {LanguageEntry | undefined} The language entry or undefined if not found.
	 */
	getLanguage(code: string): LanguageEntry | undefined {
		return this.languagesMap.get(code);
	}

	/**
	 * Gets the display name of a language in a specific locale.
	 * @param {string} languageCode - The code of the language to get the name for.
	 * @param {Lang} displayLocale - The locale to display the name in.
	 * @returns {string | undefined} The display name or undefined if not found.
	 */
	getDisplayName(
		languageCode: string,
		displayLocale: Lang,
	): string | undefined {
		const language = this.languagesMap.get(languageCode);
		return language?.names[displayLocale] || language?.nativeName;
	}
}

/**
 * A global singleton instance of the `LanguageMapper`.
 * Remember to call `languageMapper.initialize()` before using it.
 */
export const languageMapper = new LanguageMapper();
