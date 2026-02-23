import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sharpImageService } from "astro/config";
import critters from "astro-critters";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import {
	DEFAULT_LOCALE_SETTING,
	LOCALES_SETTING,
} from "../../packages/shared/src/i18n/locales.ts";
import envSchema from "../../packages/shared/src/utils/env-schema.ts";
import { whenExternalScripts } from "../../packages/shared/src/utils/externalScripts.ts";
import {
	lazyImagesRehypePlugin,
	readingTimeRemarkPlugin,
	responsiveTablesRehypePlugin,
} from "../../packages/shared/src/utils/markdown.ts";
import { resolveSiteUrl } from "../../packages/shared/src/utils/resolveSiteUrl.ts";

export default defineConfig({
	site: resolveSiteUrl(),
	output: "static",

	// Disable dev toolbar during E2E tests to prevent UI interference
	devToolbar: {
		enabled: process.env.PLAYWRIGHT_TEST !== "true",
	},

	env: {
		schema: envSchema,
		validateSecrets: false,
	},

	i18n: {
		defaultLocale: DEFAULT_LOCALE_SETTING,
		locales: Object.keys(LOCALES_SETTING),
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},

	image: {
		service: sharpImageService(),
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.unsplash.com",
			},
		],
	},

	integrations: [
		icon({
			iconDir: "./src/icons",
		}),
		pagefind(),
		sitemap({
			filter: (page) => {
				const pathname = new URL(page).pathname;
				// Exclude admin, api, and search pages from sitemap
				const excludedPaths = ["/admin/", "/admin", "/search", "/404"];
				return !excludedPaths.some((path) => pathname.includes(path));
			},
			i18n: {
				defaultLocale: DEFAULT_LOCALE_SETTING,
				locales: Object.fromEntries(
					Object.entries(LOCALES_SETTING).map(([key, value]) => [
						key,
						value.lang ?? key,
					]),
				),
			},
			// Serialize function for per-page customization
			serialize(item) {
				const url = new URL(item.url);
				const pathname = url.pathname;

				// Set lastmod to current date for dynamic content
				item.lastmod = new Date();

				// Homepage - highest priority
				if (pathname === "/" || pathname.match(/^\/(en|es)\/?$/)) {
					item.changefreq = "weekly";
					item.priority = 1.0;
					return item;
				}

				// Blog posts - high priority, updated frequently
				if (pathname.includes("/blog/") && !pathname.includes("/page/")) {
					// Individual blog post
					if (pathname.match(/\/blog\/[^/]+$/)) {
						item.changefreq = "monthly";
						item.priority = 0.8;
						return item;
					}
					// Blog index pages
					item.changefreq = "weekly";
					item.priority = 0.7;
					return item;
				}

				// Projects page
				if (pathname.includes("/projects")) {
					item.changefreq = "monthly";
					item.priority = 0.8;
					return item;
				}

				// Tag and category pages
				if (pathname.includes("/tag/") || pathname.includes("/category/")) {
					item.changefreq = "weekly";
					item.priority = 0.5;
					return item;
				}

				// Author pages
				if (pathname.includes("/author/")) {
					item.changefreq = "monthly";
					item.priority = 0.4;
					return item;
				}

				// Default for other pages
				item.changefreq = "monthly";
				item.priority = 0.6;
				return item;
			},
		}),
		(await import("astro-compress")).default({
			// Re-enable CSS compression now that the scoping issue is fixed
			CSS: {
				// Use csso for better CSS minification
				csso: {
					restructure: true,
					forceMediaMerge: false,
					comments: false,
				},
			},
			HTML: {
				"html-minifier-terser": {
					removeAttributeQuotes: false,
					// Preserve data attributes used for Astro scoping
					removeEmptyAttributes: false,
					// Don't collapse whitespace aggressively to preserve readability
					conservativeCollapse: true,
					minifyCSS: true,
					minifyJS: true,
					removeComments: true,
					collapseWhitespace: true,
				},
			},
			Image: false,
			JavaScript: {
				// Use terser for better JS minification
				terser: {
					compress: {
						drop_console: true,
						passes: 2,
					},
					mangle: true,
					format: {
						comments: false,
					},
				},
			},
			SVG: true,
			Logger: 1,
		}),
		// Only include Partytown if external scripts are enabled
		// This reduces ~40KB from the initial bundle when not needed
		...whenExternalScripts(() =>
			partytown({
				config: {
					forward: ["dataLayer.push"],
					// Optimize Partytown loading
					resolveUrl: (url) => {
						// Only process analytics scripts
						if (url.hostname === "analytics.ahrefs.com") {
							return url;
						}
						return url;
					},
				},
			}),
		),
		mdx(),
		// Critical CSS inlining for better PageSpeed scores
		// This inlines above-the-fold CSS and lazy-loads the rest
		critters({
			// Only inline critical CSS to reduce render-blocking
			pruneSource: false,
			// Use media attribute for non-critical CSS (print trick)
			preload: "media",
			// Inline fonts for faster initial render
			inlineFonts: false,
			// Remove unused CSS selectors
			reduceInlineStyles: true,
		}),
	],

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": "/../../packages/shared/src",
				"@assets": "/../../packages/shared/src/assets",
				"@components": "/../../packages/shared/src/components",
				"@configs": "/../../packages/shared/src/configs",
				"@core": "/../../packages/shared/src/core",
				"@data": "/../../packages/shared/src/data",
				"@i18n": "/../../packages/shared/src/i18n",
				"@layouts": "/../../packages/shared/src/layouts",
				"@lib": "/../../packages/shared/src/lib",
				"@styles": "/../../packages/shared/src/styles",
				"@utils": "/../../packages/shared/src/utils",
				"@atoms": "/../../packages/shared/src/components/atoms",
			},
		},
	},
	markdown: {
		remarkPlugins: [readingTimeRemarkPlugin],
		rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
	},
});
