import type { Multilingual } from "@/i18n";

/**
 * The brand name of the site. Can be a single string or a multilingual object.
 * Defaults to "Yuniel Acosta - Full Stack Developer".
 * @type {string | Multilingual}
 */
export const BRAND_NAME: string | Multilingual =
	import.meta.env.BRAND_NAME || "Yuniel Acosta - Full Stack Developer";

/**
 * The title of the site. Can be a single string or a multilingual object.
 * Used in the `<title>` tag and for SEO.
 * @type {string | Multilingual}
 */
export const SITE_TITLE: string | Multilingual =
	import.meta.env.SITE_TITLE ||
	"Yuniel Acosta - Senior Software Engineer & Architect";

/**
 * The description of the site. A multilingual object with descriptions for each supported language.
 * Used for the meta description tag and for SEO.
 * @type {Multilingual}
 */
export const SITE_DESCRIPTION: Multilingual = {
	en:
		import.meta.env.SITE_DESCRIPTION_EN ||
		"Portfolio of Yuniel Acosta, Senior Software Engineer & Software Architect specializing in Distributed Systems and DDD.",
	es: "Portafolio de Yuniel Acosta, Ingeniero de Software Senior y Arquitecto de Software especializado en Sistemas Distribuidos y DDD.",
};

/**
 * The X (formerly Twitter) account associated with the site.
 * @type {string | Multilingual}
 */
export const X_ACCOUNT: string | Multilingual =
	import.meta.env.X_ACCOUNT || "@yacosta738";

/**
 * A caution message to display when a page is not translated into the user's selected language.
 * @type {Multilingual}
 */
export const NOT_TRANSLATED_CAUTION: Multilingual = {
	en:
		import.meta.env.NOT_TRANSLATED_CAUTION_EN ||
		"This page is not available in your language.",
	es:
		import.meta.env.NOT_TRANSLATED_CAUTION_ES ||
		"Esta página no está disponible en tu idioma.",
};
