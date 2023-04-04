/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
	readonly FORMSPREE: string
	readonly GOOGLE_SITE_VERIFICATION: string
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
	readonly env: ImportMetaEnv
}
