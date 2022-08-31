/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
	readonly FORMSPREE: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
