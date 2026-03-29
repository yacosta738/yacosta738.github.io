import { fileURLToPath } from "node:url";
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
import {
	filterBlogSitemapPage,
	serializeBlogSitemapItem,
} from "./src/configs/sitemap.ts";

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
			prefixDefaultLocale: false,
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
			{
				protocol: "https",
				hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "s3.us-west-2.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "**.amazonaws.com",
			},
			{
				protocol: "https",
				hostname: "media.licdn.com",
			},
		],
	},

	integrations: [
		icon({
			iconDir: "../../packages/shared/src/icons",
		}),
		pagefind(),
		sitemap({
			filter: filterBlogSitemapPage,
			i18n: {
				defaultLocale: DEFAULT_LOCALE_SETTING,
				locales: Object.fromEntries(
					Object.entries(LOCALES_SETTING).map(([key, value]) => [
						key,
						value.lang ?? key,
					]),
				),
			},
			serialize: serializeBlogSitemapItem,
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
				},
			}),
		),
		mdx(),
		// Critical CSS inlining for better PageSpeed scores
		// This inlines above-the-fold CSS and lazy-loads the rest
		critters({
			Critters: false,
			// Only inline critical CSS to reduce render-blocking
			pruneSource: false,
			// Use media attribute for non-critical CSS (print trick)
			preload: "media",
			// Inline fonts for faster initial render
			inlineFonts: false,
			// Remove unused CSS selectors
			reduceInlineStyles: true,
			// Skip legacy redirect pages under /en/
			Exclude: [/\/en\//],
		}),
	],

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@blog": fileURLToPath(new URL("./src", import.meta.url)),
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
