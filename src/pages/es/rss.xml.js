import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { jsonToArticle } from '@models:Article'

export const GET = async (context) => {
	const publishedBlogEntriesPromises = (
		await getCollection('blog', ({ data }) => {
			return !data.draft
		})
	).map(async (publishedBlogEntry) => await jsonToArticle(publishedBlogEntry))
	const publishedBlogEntries = await Promise.all(publishedBlogEntriesPromises)

	const language = 'es'

	return rss({
		title: 'Blog de Yuniel Acosta',
		description:
			'Blog sobre programación y tecnologías web, escalables, alta disponibilidad y consejos para ser más productivo.',
		site: context.site,
		items: publishedBlogEntries
			.filter((post) => post.lang === language)
			.map((post) => ({
				link: `posts/${post.url}`,
				title: post.title,
				pubDate: post.date,
				description: post.description
			})),
		stylesheet: '/rss/styles.xsl'
	})
}
