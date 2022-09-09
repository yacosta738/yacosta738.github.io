import rss from '@astrojs/rss'

export const get = () =>
	rss({
		title: 'YAP’s  Blog',
		description: 'A humble Astronaut’s guide to the stars',
		site: import.meta.env.SITE,
		items: import.meta.glob('./blog/**/*.md'),
		stylesheet: '/rss/styles.xsl'
	})
