import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/configs/site.consts";
import { DEFAULT_LOCALE } from "@/i18n";

export async function GET(context) {
	const locale = DEFAULT_LOCALE;

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

	const items = posts.map((post) => ({
		title: post.data.title,
		pubDate: post.data.date,
		description: post.data.description,
		link: `/${post.id.split("/").slice(1).join("/")}/`,
	}));

	return rss({
		title: localeTitle,
		description: localeDescription,
		site: context.site,
		items,
		stylesheet: "/rss/styles.xsl",
	});
}
