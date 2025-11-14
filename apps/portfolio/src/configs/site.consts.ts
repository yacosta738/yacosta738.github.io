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
export const SITE_TITLE: string | Multilingual = {
	en: import.meta.env.SITE_TITLE_EN || "Yuniel Acosta — Senior Software Engineer & Software Architect",
	es: import.meta.env.SITE_TITLE_ES || "Yuniel Acosta — Ingeniero de Software Senior y Arquitecto de Software",
};

/**
 * The description of the site. A multilingual object with descriptions for each supported language.
 * Used for the meta description tag and for SEO.
 * @type {Multilingual}
 */
export const SITE_DESCRIPTION: Multilingual = {
	en:
		import.meta.env.SITE_DESCRIPTION_EN ||
		"Building scalable systems using Kotlin, Spring Boot, and Clean Architecture. Senior Software Engineer specialized in distributed systems, DDD, and event-driven architecture.",
	es:
		import.meta.env.SITE_DESCRIPTION_ES ||
		"Construyendo sistemas escalables usando Kotlin, Spring Boot y Arquitectura Limpia. Ingeniero de Software Senior especializado en sistemas distribuidos, DDD y arquitectura orientada a eventos.",
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

/**
 * Current employer information for structured data
 * @type {string}
 */
export const CURRENT_EMPLOYER =
	import.meta.env.CURRENT_EMPLOYER || "Deutsche Bank";

/**
 * Alumni institution for structured data
 * @type {string}
 */
export const ALUMNI_INSTITUTION =
	import.meta.env.ALUMNI_INSTITUTION ||
	"Universidad de las Ciencias Informáticas";

/**
 * Calendly scheduling URL
 * @type {string}
 */
export const CALENDLY_URL =
	import.meta.env.CALENDLY_URL || "https://calendly.com/yacosta738";
