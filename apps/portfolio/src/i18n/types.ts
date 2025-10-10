import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./locales";

type LocaleConfig = {
	readonly label: string;
	readonly lang?: string;
	readonly dir?: "ltr" | "rtl";
	readonly flag?: string;
};

export const LOCALES = LOCALES_SETTING as Record<string, LocaleConfig>;

export const SHOW_DEFAULT_LANG_IN_URL: boolean = true;

/**
 * Represents a dictionary of translations for multiple languages.
 * The outer key is the language code, and the inner key is the translation key.
 * @example { en: { "nav.home": "Home" }, es: { "nav.home": "Inicio" } }
 * @type {Record<string, Record<string, string>>}
 */
export type Translations = Record<string, Record<string, string>>;

/**
 * Represents the available language codes for the site (e.g., "en", "es").
 * @type {keyof typeof LOCALES}
 */
export type Lang = keyof typeof LOCALES;

export const DEFAULT_LOCALE = DEFAULT_LOCALE_SETTING as Lang;

/**
 * Represents a dictionary of UI strings for a single language.
 * @type {Record<string, string>}
 */
export type UIDict = Record<string, string>;

/**
 * Represents a multilingual dictionary of UI strings.
 * The key is the language code (`Lang`), and the value is a `UIDict`.
 * @type {{ [key in Lang]: UIDict }}
 */
export type UIMultilingual = { [key in Lang]: UIDict };

/**
 * Represents a string that can have different values for each language.
 * @type {{ [key in Lang]?: string }}
 */
export type Multilingual = { [key in Lang]?: string };
