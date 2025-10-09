export const prerender = true;

import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/configs/site.consts";
import { localeParams } from "@/i18n";

export const getStaticPaths = () => localeParams;

export async function GET(context) {
	const locale = context.params.lang;

	const localeTitle =
		typeof SITE_TITLE === "string" ? SITE_TITLE : SITE_TITLE[locale];
	const localeDescription =
		typeof SITE_DESCRIPTION === "string"
			? SITE_DESCRIPTION
			: SITE_DESCRIPTION[locale];

	const posts = await getCollection("articles", ({ id, data }) => {
		return !data.draft && id.split("/")[0] === locale;
	});
	posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

	// Map posts and newsletters to RSS items
	const postItems = posts.map((post) => ({
		title: post.data.title,
		pubDate: post.data.date,
		description: post.data.description,
		link: `/${locale}/blog/${post.id.split("/")[1]}/`,
	}));

	// Combine and sort all items by date
	const allItems = [...postItems].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
	);

	return rss({
		title: localeTitle,
		description: localeDescription,
		site: context.site,
		items: allItems,
		stylesheet: "/rss/styles.xsl",
	});
}
