import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { jsonToArticle } from '@models:Article';

export const GET = async (context) => {
	const publishedBlogEntriesPromises = (
		await getCollection('blog', ({ data }) => {
			return !data.draft;
		})
	).map(async (publishedBlogEntry) => await jsonToArticle(publishedBlogEntry));
	const publishedBlogEntries = await Promise.all(publishedBlogEntriesPromises);

	const language = 'en';

	return rss({
		title: 'Yuniel Acosta’s  Blog',
		description:
			'Blog about programming and web technologies, scalable, high availability and tips to be more productive.',
		site: context.site,
		items: publishedBlogEntries
			.map((post) => ({
				link: `posts/${post.url}`,
				title: post.title,
				pubDate: post.date,
				description: post.description,
			})),
		stylesheet: '/rss/styles.xsl',
	});
};
