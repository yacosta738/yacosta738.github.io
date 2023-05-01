import type { GenerateSWOptions } from 'workbox-build'

export const manifest = {
	name: 'Yuniel Acosta',
	short_name: 'YAP',
	theme_color: '#64ffda',
	start_url: '/',
	description: 'Yuniel Acosta Personal Website',
	icons: [
		{
			src: 'android-chrome-192x192.png',
			sizes: '192x192',
			type: 'image/png'
		},
		{
			src: 'android-chrome-512x512.png',
			sizes: '512x512',
			type: 'image/png'
		}
	]
}

export const workbox: Partial<GenerateSWOptions> = {
	navigateFallback: '/404',
	globPatterns: ['**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	globIgnores: ['**/node_modules/**', '**/dist/**'],
	runtimeCaching: [
		{
			// blog posts Network First (Network Falling Back to Cache). Cache is updated when user visits the page.
			urlPattern: /^blog\/.*/i,
			handler: 'NetworkFirst',
			options: {
				cacheName: 'blog-cache',
				expiration: {
					maxEntries: 1000,
					maxAgeSeconds: 60 * 60 * 24 // <== 1 day
				},
				cacheableResponse: {
					statuses: [0, 200]
				}
			}
		},
		// pdf, xml, json, txt, csv, and webmanifest files Network First (Network Falling Back to Cache). Cache is updated when user visits the page.
		{
			urlPattern: /^.*\.(?:pdf|xml|json|txt|csv|webmanifest)$/i,
			handler: 'NetworkFirst',
			options: {
				cacheName: 'files-cache',
				expiration: {
					maxEntries: 50,
					maxAgeSeconds: 60 * 60 * 24 // <== 1 day
				},
				cacheableResponse: {
					statuses: [0, 200]
				}
			}
		},
		// cache favicons and images
		{
			urlPattern: /\.(?:png|gif|jpg|jpeg|svg|ico|webp)$/i,
			handler: 'CacheFirst',
			options: {
				cacheName: 'images-cache',
				expiration: {
					maxEntries: 100,
					maxAgeSeconds: 60 * 60 * 24 * 3 // <== 3 days
				},
				cacheableResponse: {
					statuses: [0, 200]
				}
			}
		},
		{
			urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
			handler: 'CacheFirst',
			options: {
				cacheName: 'google-fonts-cache',
				expiration: {
					maxEntries: 10,
					maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
				},
				cacheableResponse: {
					statuses: [0, 200]
				}
			}
		},
		{
			urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
			handler: 'CacheFirst',
			options: {
				cacheName: 'gstatic-fonts-cache',
				expiration: {
					maxEntries: 10,
					maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
				},
				cacheableResponse: {
					statuses: [0, 200]
				}
			}
		}
	]
}
