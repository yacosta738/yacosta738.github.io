import type { ManifestOptions } from 'vite-plugin-pwa'

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest: Partial<ManifestOptions> = {
	name: 'Yuniel Acosta | Software Engineer',
	short_name: 'Acosta',
	description:
		'Programmer, writer, technology and science enthusiast, specialized in building web applications. Interested in Vue, Typescript, Node.js, Java/Kotlin and Spring Boot.', // Change this to your websites description.
	theme_color: '#64ffda',
	background_color: '#0a192f',
	display: 'minimal-ui',
	icons: [
		{
			src: '/favicons/favicon-192x192.png',
			sizes: '192x192',
			type: 'image/png'
		},
		{
			src: '/favicons/favicon-512x512.png',
			sizes: '512x512',
			type: 'image/png'
		},
		{
			src: '/favicons/favicon-512x512.png',
			sizes: '512x512',
			type: 'image/png',
			purpose: 'any maskable'
		}
	]
}
