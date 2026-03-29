type SitemapItem = {
	url: string;
	lastmod?: Date;
	changefreq?: string;
	priority?: number;
};

export const BLOG_SITEMAP_EXCLUDED_PATHS = [
	"/admin/",
	"/admin",
	"/search",
	"/404",
	"/blog/",
	"/es/blog/",
	"/en/",
];

export function filterBlogSitemapPage(page: string): boolean {
	const pathname = new URL(page).pathname;
	return !BLOG_SITEMAP_EXCLUDED_PATHS.some((path) => pathname.includes(path));
}

export function serializeBlogSitemapItem(item: SitemapItem): SitemapItem {
	const serializedItem = { ...item };
	const pathname = new URL(serializedItem.url).pathname;

	serializedItem.lastmod = new Date();

	if (pathname === "/" || /^\/es\/?$/.test(pathname)) {
		serializedItem.changefreq = "weekly";
		serializedItem.priority = 1;
		return serializedItem;
	}

	if (pathname.includes("/blog/") && !pathname.includes("/page/")) {
		if (/\/blog\/[^/]+$/.test(pathname)) {
			serializedItem.changefreq = "monthly";
			serializedItem.priority = 0.8;
			return serializedItem;
		}

		serializedItem.changefreq = "weekly";
		serializedItem.priority = 0.7;
		return serializedItem;
	}

	if (pathname.includes("/projects")) {
		serializedItem.changefreq = "monthly";
		serializedItem.priority = 0.8;
		return serializedItem;
	}

	if (pathname.includes("/tag/") || pathname.includes("/category/")) {
		serializedItem.changefreq = "weekly";
		serializedItem.priority = 0.5;
		return serializedItem;
	}

	if (pathname.includes("/author/")) {
		serializedItem.changefreq = "monthly";
		serializedItem.priority = 0.4;
		return serializedItem;
	}

	serializedItem.changefreq = "monthly";
	serializedItem.priority = 0.6;
	return serializedItem;
}
