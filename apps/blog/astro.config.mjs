import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sharpImageService } from "astro/config";
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
			// NOTE: keep CSS post-processing off.
			// csso strips Tailwind v4's @media (width>=…) responsive breakpoint
			// wrappers even with restructure:false, breaking all responsive utilities.
			// See: portfolio astro.config.mjs for the same fix.
			CSS: false,
			HTML: {
				"html-minifier-terser": {
					removeAttributeQuotes: false,
					// Preserve data attributes used for Astro scoping
					removeEmptyAttributes: false,
					// Don't collapse whitespace aggressively to preserve readability
					conservativeCollapse: true,
					// Keep CSS minification off to preserve Tailwind v4 media queries
					// in inline <style> tags
					minifyCSS: false,
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
	],

	vite: {
		plugins: [
			tailwindcss(),
			{
				name: "legacy-media-queries-for-cloudflare",
				enforce: "post",
				generateBundle(_, bundle) {
					for (const chunk of Object.values(bundle)) {
						if (chunk.type === "asset" && chunk.fileName.endsWith(".css")) {
							let css = chunk.source.toString();
							css = css.replaceAll(
								/\(\s*width\s*>=\s*([^)]+)\s*\)/g,
								"(min-width: $1)",
							);
							css = css.replaceAll(
								/\(\s*width\s*<=\s*([^)]+)\s*\)/g,
								"(max-width: $1)",
							);
							css = css.replaceAll(
								/\(\s*width\s*>\s*([^)]+)\s*\)/g,
								"(min-width: calc($1 + 0.1px))",
							);
							css = css.replaceAll(
								/\(\s*width\s*<\s*([^)]+)\s*\)/g,
								"(max-width: calc($1 - 0.1px))",
							);
							css = css.replaceAll(
								/\(\s*width\s*==\s*([^)]+)\s*\)/g,
								"(width: $1)",
							);
							chunk.source = css;
						}
					}
				},
			},
		],
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
