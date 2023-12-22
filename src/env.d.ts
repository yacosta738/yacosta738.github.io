/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
	readonly FORMSPREE: string;
	readonly GOOGLE_SITE_VERIFICATION: string;
	readonly GOOGLE_ANALYTICS: string;
	readonly APP_ID: string;
	readonly INDEX_NAME: string;
	readonly API_KEY: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
