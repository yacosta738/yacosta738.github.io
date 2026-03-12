import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./src/i18n/locales.ts";

export default defineConfig({
	i18n: {
		defaultLocale: DEFAULT_LOCALE_SETTING,
		locales: Object.keys(LOCALES_SETTING),
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false,
		},
	},
	integrations: [
		icon({
			iconDir: "./src/icons",
		}),
	],
});
