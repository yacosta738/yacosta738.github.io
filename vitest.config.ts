/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	test: {
		/* for example, use global to avoid globals imports (describe, test, expect): */
		// globals: true,
		dir: 'tests/unit',
	},
});
