import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

// const posts = await pagesGlobToRssItems(
// 	import.meta.glob('./blog/*.{md,mdx}')
// )
// const posts = Object.values(postImportResult)

export const GET = async (context) => {
	const blog = await getCollection('blog')
	return rss({
		title: 'YAP’s  Blog',
		description:
			'Blog about programming and web technologies, scalable, high availability and tips to be more productive.',
		site: context.site,
		items: blog
			// .filter((post) => !post.frontmatter.draft)
			.map((post) => ({
				link: `/blog/${post.slug}/`,
				title: post.data.title,
				pubDate: post.data.date,
				description: post.data.description
			})),
		stylesheet: '/rss/styles.xsl'
	})
}
