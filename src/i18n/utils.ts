import { ui, defaultLanguage, type UiTranslate } from './translation';

export const showDefaultLang = false;
type LanguageKey = keyof typeof ui;

export function getLangFromUrl(url: URL): keyof typeof ui {
	const pathSegments = url.pathname.split('/');
	let lang = defaultLanguage;

	for (const segment of pathSegments) {
		if (segment in ui) {
			lang = segment as keyof typeof ui;
			break;
		}
	}

	return lang;
}

export function useTranslations(lang: LanguageKey) {
	return function t(key: string, params?: { [key: string]: string | number }): string {
		const keys = key.split('.');
		let value: UiTranslate | string = ui[lang];

		for (const k of keys) {
			value = (value as UiTranslate)?.[k] as UiTranslate | string;

			if (!value) {
				const dLang = defaultLanguage;
				value = (ui[dLang] as UiTranslate)?.[k] as UiTranslate | string;
			}
		}

		value = interpolateParams(params, value);

		return typeof value === 'string' ? value : key;
	};
}

function interpolateParams(
	params: { [key: string]: string | number } | undefined,
	value: string | UiTranslate
) {
	if (params && typeof value === 'string') {
		for (const [paramKey, paramValue] of Object.entries(params)) {
			const regex = new RegExp(`{{${paramKey}}}`, 'g');
			value = value.replace(regex, String(paramValue));
		}
	}
	return value;
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		return !showDefaultLang && l === defaultLanguage ? path : `/${l}${path}`;
	};
}
