import rss from '@astrojs/rss'

const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true })
const posts = Object.values(postImportResult)

export const get = () =>
	rss({
		title: 'YAP’s  Blog',
		description:
			'Blog about programming and web technologies, scalable, high availability and tips to be more productive.',
		site: import.meta.env.SITE,
		items: posts
			.filter((post) => !post.frontmatter.draft)
			.map((post) => ({
				link: post.url,
				title: post.frontmatter.title,
				pubDate: new Date(post.frontmatter.date),
				description: post.frontmatter.description
			})),
		stylesheet: '/rss/styles.xsl'
	})
