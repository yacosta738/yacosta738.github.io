/**
 * The default locale setting for the site. This is the language that will be used
 * if no other language is specified or if a translation is missing.
 * @type {string}
 */
export const DEFAULT_LOCALE_SETTING: string = "en";

/**
 * Defines the structure for a single locale's settings.
 *
 * @property {string} label - The display name for the language (e.g., "English").
 * @property {string} [lang] - The BCP 47 language tag (e.g., "en-US"). Defaults to the locale key.
 * @property {"rtl" | "ltr"} [dir] - The text direction. Defaults to "ltr".
 * @property {string} [flag] - An optional flag emoji for the language.
 */
interface LocaleSetting {
	[key: Lowercase<string>]: {
		label: string;
		lang?: string;
		dir?: "rtl" | "ltr";
		flag?: string;
	};
}

/**
 * A configuration object containing the settings for all supported locales.
 * The keys should be lowercase language codes (e.g., "en", "es").
 * @type {LocaleSetting}
 */
export const LOCALES_SETTING: LocaleSetting = {
	en: {
		label: "English",
		lang: "en-US",
		flag: "🇬🇧",
	},
	es: {
		label: "Español",
		flag: "🇪🇸",
	},
};
