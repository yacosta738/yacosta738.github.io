/// <reference types="vitest" />

import path from "node:path";
import { getViteConfig } from "astro/config";

export default getViteConfig({
	resolve: {
		alias: [
			{
				find: "@/",
				replacement: `${path.resolve("../../packages/shared/src")}/`,
			},
			{ find: "@", replacement: path.resolve("../../packages/shared/src") },
		],
	},
	// @ts-expect-error
	test: {
		/* for example, use 'happy-dom' to run tests in a browser-like environment */
		environment: "happy-dom",
		setupFiles: ["./tests/unit/test-setup.ts"],
		include: ["tests/unit/**/*.test.ts"],
		coverage: {
			enabled: true,
			reporter: ["text", "json", "html"],
			include: ["src/**/*.ts", "src/**/*.astro"],
			exclude: [
				"src/env.d.ts",
				"src/pages/admin.astro",
				"src/pages/index.astro",
				"src/pages/[lang]/index.astro",
				"src/layouts/Layout.astro",
				"src/components/atoms/Analytics.astro",
				"src/components/atoms/AppScripts.astro",
				"src/components/molecules/EnhancedProjectCard.astro",
				"src/components/atoms/OptimizedPicture.astro",
				"rsc/components/atoms/TorchEffect.astro",
				"src/components/molecules/Email.astro",
				"src/components/molecules/Menu.astro",
				"src/components/molecules/Social.astro",
				"src/components/organisms/Hero.astro",
				"src/i18n/components/LocaleSelect.astro",
				"src/i18n/components/LocaleSelectSingle.astro",
				"src/i18n/components/LocaleSuggest.astro",
				"src/i18n/components/LocalesHomeList.astro",
				"src/i18n/components/NotTranslateCaution.astro",
			],
		},
		exclude: ["tests/e2e/**/*.spec.ts"],
	},
});
