/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue}'],
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/aspect-ratio')
	],
	theme: {
		container: {
			center: true
		},
		extend: {
			spacing: {
				80: '20rem',
				108: '27rem'
			},
			lineClamp: {
				7: '7',
				8: '8',
				9: '9',
				10: '10'
			},
			borderWidth: {
				14: '14px'
			},
			colors: {
				background: {
					primary: '#0a192f',
					secondary: '#102c44',
					tertiary: '#1e3951',

					form: '#1a202c'
				},

				copy: {
					primary: '#cbd5e0',
					secondary: '#e2e8f0'
				},

				'border-color': {
					primary: '#1a202c'
				},

				transparent: 'transparent',

				black: '#000',
				white: '#fff',
				'dark-navy': '#020c1b',
				navy: '#0a192f',
				'light-navy': '#112240',
				'lightest-navy': '#233554',
				slate: '#8892b0',
				'light-slate': '#a8b2d1',
				'lightest-slate': '#ccd6f6',

				green: {
					100: '#d5f3ec',
					200: '#b4eee0',
					300: '#98efdb',
					400: '#87fde1',
					500: '#64ffda',
					600: '#4cbfa4',
					700: '#388c78',
					800: '#2b6658',
					900: '#133040'
				},

				gray: {
					100: '#f7fafc',
					200: '#edf2f7',
					300: '#e2e8f0',
					400: '#cbd5e0',
					500: '#a0aec0',
					600: '#718096',
					700: '#4a5568',
					800: '#2d3748',
					900: '#1a202c'
				}
			},
			fontFamily: {
				sans: ['"Inter var"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	variants: {
		extend: {}
	}
}
