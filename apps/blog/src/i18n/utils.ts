import { DEFAULT_LOCALE, type Lang, type Multilingual } from "./types";
import { ui } from "./ui";

const isSupportedLang = (value: string): value is Lang => {
	return Object.hasOwn(ui, value);
};

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (isSupportedLang(lang)) return lang;
	return DEFAULT_LOCALE;
}

export function useTranslations(lang: Lang) {
	return function t(
		multilingualOrKey: Multilingual | string,
		variables?: Record<string, string | number>,
	): string {
		let text: string;

		if (typeof multilingualOrKey === "string") {
			const langUI = ui[lang] || {};
			const defaultUI = ui[DEFAULT_LOCALE] || {};

			text =
				langUI[multilingualOrKey] ??
				defaultUI[multilingualOrKey] ??
				multilingualOrKey;
		} else {
			text = multilingualOrKey[lang] ?? multilingualOrKey[DEFAULT_LOCALE] ?? "";
		}

		if (variables) {
			return Object.entries(variables).reduce((result, [key, value]) => {
				return result.replaceAll(`{${key}}`, String(value));
			}, text);
		}

		return text;
	};
}
