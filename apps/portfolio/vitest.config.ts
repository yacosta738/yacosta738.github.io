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
			reporter: ["text", "json", "html", "lcov"],
			include: ["src/**/*.ts", "src/**/*.astro"],
			exclude: [
				"src/env.d.ts",
				// Exclude all Astro pages - they are hard to unit test
				"src/pages/**/*.astro",
				"src/layouts/**/*.astro",
				// Exclude components that require Astro context
				"src/components/**/*.astro",
				// Exclude i18n components
				"src/i18n/components/**/*.astro",
				// Exclude RSC components
				"rsc/**/*.astro",
				// Exclude test mocks
				"src/utils/test/**/*.ts",
			],
		},
		exclude: ["tests/e2e/**/*.spec.ts"],
	},
});
