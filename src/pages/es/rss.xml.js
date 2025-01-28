import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { jsonToArticle } from "@models:Article";

export const GET = async (context) => {
	const language = "es";
	const publishedBlogEntriesPromises = (
		await getCollection("blog", ({ data, id }) => {
			const idParts = id.split("/");
			const lang = idParts[0] === "es" ? "es" : "en";
			return !data.draft && lang === language;
		})
	).map(async (publishedBlogEntry) => await jsonToArticle(publishedBlogEntry));

	const publishedBlogEntries = await Promise.all(publishedBlogEntriesPromises);

	return rss({
		title: language === "en" ? "Yuniel Acosta’s Blog" : "Blog de Yuniel Acosta",
		description:
			language === "en"
				? "Blog about programming and web technologies, scalable, high availability and tips to be more productive."
				: "Blog sobre programación y tecnologías web, escalabilidad, alta disponibilidad y consejos para ser más productivo.",
		site: context.site,
		items: publishedBlogEntries.map((post) => ({
			link: `posts/${post.url}`,
			title: post.title,
			pubDate: post.date,
			description: post.description,
		})),
		stylesheet: "/rss/styles.xsl",
	});
};
