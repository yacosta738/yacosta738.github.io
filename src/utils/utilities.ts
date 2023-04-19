import i18next from 'i18next'
// import DOMPurify from 'dompurify';
import { marked } from 'marked'

export const randomInt = (min: number, max: number) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const inlineLinks = (className: string) => {
	const elements = Array.from(document.querySelectorAll(className))
	// eslint-disable-next-line no-array-constructor
	const allLinks = new Array<HTMLElement[]>()
	elements.forEach((el) => allLinks.push(Array.from(el.querySelectorAll('a'))))
	if (allLinks.length > 0) {
		allLinks.forEach((links) => {
			links.forEach((link) => link.classList.add('inline-link'))
		})
	}
}

export const localizePath = (path: string = '/', locale: string | null = null): string => {
	if (!locale) {
		locale = i18next.language
	}

	if (!(i18next.options.supportedLngs as string[])?.includes(locale)) {
		return path
	}

	// remove all leading slashes
	path = path.replace(/^\/+/g, '')

	let pathSegments = path.split('/')

	if (
		JSON.stringify(pathSegments) === JSON.stringify(['']) ||
		JSON.stringify(pathSegments) === JSON.stringify(['', ''])
	) {
		const supportedLanguages = i18next.options.supportedLngs
		if (supportedLanguages) return locale === supportedLanguages[0] ? `/` : `/${locale}/`
		else return `/`
	}

	// make a copy of i18next's supportedLngs
	const otherLocales = [...(i18next.options.supportedLngs as string[])]
	otherLocales.slice(1) // remove base locale (first index)

	// loop over all locales except the base one
	for (const otherLocale of otherLocales) {
		if (pathSegments[0] === otherLocale) {
			// if the path starts with one of the other locales, remove it from the path
			pathSegments.shift()
			break // no need to continue
		}
	}

	const supportedLanguages = i18next.options.supportedLngs
	// prepend the given locale if it's not the base one
	if (supportedLanguages && locale !== supportedLanguages[0]) {
		pathSegments = [locale, ...pathSegments]
	}

	return '/' + pathSegments.join('/')
}

/**
 * markdownfy the string
 * @param {string} str String to markdownfy
 * @returns {string}
 */
export const markdownfy = (str: string): string => marked.parse(str)

export const urlize = (term: string): string => term.trim().toLowerCase().replace(/\s+/g, '-')
