/// <reference types="vitest/config" />

import path from "node:path";
import { getViteConfig } from "astro/config";

export default getViteConfig({
	resolve: {
		alias: [
			{ find: "@/", replacement: `${path.resolve("./src")}/` },
			{ find: "@", replacement: path.resolve("./src") },
			{
				find: "astro:content",
				replacement: path.resolve("./tests/mocks/astro-content.ts"),
			},
			{
				find: "astro:i18n",
				replacement: path.resolve("./tests/mocks/astro-i18n.ts"),
			},
			{
				find: "astro:assets",
				replacement: path.resolve("./tests/mocks/astro-assets.ts"),
			},
			{
				find: "astro:env/client",
				replacement: path.resolve("./tests/mocks/astro-env-client.ts"),
			},
			{
				find: "virtual:astro-icon",
				replacement: path.resolve("./tests/mocks/astro-icon.ts"),
			},
			{
				find: "astro-icon/components/Icon.astro",
				replacement: path.resolve("./tests/mocks/Icon.astro"),
			},
			{
				find: "astro-icon/components",
				replacement: path.resolve("./tests/mocks/astro-icon-components.ts"),
			},
		],
	},
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
		coverage: {
			enabled: true,
			reporter: ["text", "json", "html", "lcov"],
			include: ["src/**/*.ts", "src/**/*.astro"],
			exclude: [
				"src/env.d.ts",
				"src/pages/**/*.astro",
				"src/layouts/**/*.astro",
				"src/components/**/*.astro",
				"src/i18n/components/**/*.astro",
				"rsc/**/*.astro",
				"src/utils/test/**/*.ts",
			],
		},
	},
});
