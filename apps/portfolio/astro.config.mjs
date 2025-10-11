import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sharpImageService } from "astro/config";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./src/i18n/locales.ts";
import envSchema from "./src/utils/env-schema.ts";
import { whenExternalScripts } from "./src/utils/externalScripts.ts";
import {
	lazyImagesRehypePlugin,
	readingTimeRemarkPlugin,
	responsiveTablesRehypePlugin,
} from "./src/utils/markdown.ts";
import { resolveSiteUrl } from "./src/utils/resolveSiteUrl.ts";

export default defineConfig({
	site: resolveSiteUrl(),
	output: "static",

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
			filter: (page) => new URL(page).pathname !== "/admin/",
			i18n: {
				defaultLocale: DEFAULT_LOCALE_SETTING,
				locales: Object.fromEntries(
					Object.entries(LOCALES_SETTING).map(([key, value]) => [
						key,
						value.lang ?? key,
					]),
				),
			},
		}),
		(await import("astro-compress")).default({
			CSS: true,
			HTML: {
				"html-minifier-terser": {
					removeAttributeQuotes: false,
				},
			},
			Image: false,
			JavaScript: true,
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
	],

	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		remarkPlugins: [readingTimeRemarkPlugin],
		rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
	},
});
