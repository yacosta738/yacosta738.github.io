/**
 * Giscus Comments Configuration
 *
 * Configuration for GitHub Discussions-based comments on blog posts.
 * @see https://giscus.app
 */

export interface GiscusConfig {
	/** GitHub repository in format: owner/repo */
	repo: string;
	/** Repository ID from Giscus configuration */
	repoId: string;
	/** Discussion category name */
	category: string;
	/** Category ID from Giscus configuration */
	categoryId: string;
	/** How to map page to discussion */
	mapping: "pathname" | "url" | "title" | "og:title";
	/** Enable emoji reactions on comments */
	reactionsEnabled: boolean;
	/** Emit discussion metadata */
	emitMetadata: boolean;
	/** Position of comment input box */
	inputPosition: "top" | "bottom";
	/** Allow strict title matching */
	strict: boolean;
}

/**
 * Default Giscus configuration for blog post comments
 */
export const giscusConfig: Readonly<GiscusConfig> = {
	repo: "yacosta738/yacosta738.github.io",
	repoId: "R_kgDOH2l9sw",
	category: "Blog Comments",
	categoryId: "DIC_kwDOH2l9s84CwlKz",
	mapping: "pathname",
	reactionsEnabled: true,
	emitMetadata: false,
	inputPosition: "bottom",
	strict: false,
} as const;

/**
 * Map site theme to Giscus theme
 */
export function getGiscusTheme(isDark: boolean): string {
	return isDark ? "dark" : "light";
}

/**
 * Map site locale to Giscus language code
 * Falls back to 'en' for unsupported locales
 */
export function getGiscusLang(locale: string): string {
	const supportedLocales: Record<string, string> = {
		en: "en",
		es: "es",
	};

	return supportedLocales[locale] || "en";
}
