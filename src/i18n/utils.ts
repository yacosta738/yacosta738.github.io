import { ui, defaultLanguage } from './translation'

export const showDefaultLang = false

export function getLangFromUrl (url: URL): keyof typeof ui {
	const pathSegments = url.pathname.split('/')
	let lang = defaultLanguage

	for (const segment of pathSegments) {
		if (segment in ui) {
			lang = segment as keyof typeof ui
			break
		}
	}

	return lang
}

export function useTranslations (lang: keyof typeof ui) {
	return function t (key: string, params?: { [key: string]: string | number }) {
		const keys = key.split('.')
		let value: any = ui[lang]
		for (const k of keys) {
			value = value?.[k]
			if (!value) {
				value = (ui[defaultLanguage as keyof typeof ui] as any)?.[k]
			}
		}
		value = interpolateParams(params, value)

		return value ?? key
	}
}

function interpolateParams (params: { [key: string]: string | number } | undefined, value: any) {
	if (params && typeof value === 'string') {
		for (const [paramKey, paramValue] of Object.entries(params)) {
			const regex = new RegExp(`{{${paramKey}}}`, 'g')
			value = value.replace(regex, String(paramValue))
		}
	}
	return value
}

export function useTranslatedPath (lang: keyof typeof ui) {
	return function translatePath (path: string, l: string = lang) {
		return !showDefaultLang && l === defaultLanguage ? path : `/${l}${path}`
	}
}
