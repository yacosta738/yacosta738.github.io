import { DEFAULT_LOCALE, type Lang, type Multilingual } from "./types";
import { ui } from "./ui";

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as Lang;
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
				return result.replace(new RegExp(`{${key}}`, "g"), String(value));
			}, text);
		}

		return text;
	};
}
