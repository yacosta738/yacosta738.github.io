import languages from "./languages";

import en from "./en/index";

import es from "./es/index";

export const supportedLanguages = Object.keys(languages);

export type UiTranslate = {
	[key: string]: string | object | UiTranslate;
};

export const ui = {
	en: {
		...en,
	},
	es: {
		...es,
	},
} as const;

export const defaultLanguage = "en" as keyof typeof ui;
