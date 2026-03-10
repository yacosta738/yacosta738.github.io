import type { Lang } from "@/i18n";
import { type BlogPost, isArticle } from "@/lib/blog-post.utils";

const sortByDateDesc = (a: BlogPost, b: BlogPost) =>
	new Date(b.date).valueOf() - new Date(a.date).valueOf();

type BlogListingInput = {
	articles: BlogPost[];
	externalArticles: BlogPost[];
	locale: Lang;
	featuredLimit?: number;
};

type BlogListingResult = {
	sortedPosts: BlogPost[];
	featuredPosts: BlogPost[];
	visiblePosts: BlogPost[];
};

export const buildBlogListing = ({
	articles,
	externalArticles,
	locale,
	featuredLimit = 3,
}: BlogListingInput): BlogListingResult => {
	const localizedArticles = articles.filter(
		(post) => post.id.split("/")[0] === locale,
	);
	const localizedExternal = externalArticles.filter(
		(post) => post.id.split("/")[0] === locale,
	);
	const combinedPosts = [...localizedArticles, ...localizedExternal];
	const sortedPosts = [...combinedPosts].sort(sortByDateDesc);
	const featuredPosts = [...localizedArticles]
		.filter((post) => isArticle(post) && post.featured)
		.sort(sortByDateDesc)
		.slice(0, featuredLimit);
	const featuredIds = new Set(featuredPosts.map((post) => post.id));
	const visiblePosts = sortedPosts.filter((post) => !featuredIds.has(post.id));

	return { sortedPosts, featuredPosts, visiblePosts };
};
