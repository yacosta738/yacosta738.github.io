import { localizePath } from 'astro-i18next'
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

/**
 * markdownfy the string
 * @param {string} str String to markdownfy
 * @returns {string}
 */
export const markdownfy = (str: string): string => marked.parse(str)

export const urlize = (term: string): string => term.trim().toLowerCase().replace(/\s+/g, '-')

export const localizeUrl = (path: string = '/', locale: string | null = null): string => {
	const link = localizePath(path, locale)
	// if link ends with / then remove / from the end of the link. If the url is just / then return /
	return link?.endsWith('/') && link !== '/' ? link.slice(0, -1) : link
}
