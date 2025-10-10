export const prerender = true;

/**
 * This is an Astro API route that dynamically generates the `robots.txt` file
 * for the site. It allows all user agents to crawl the site and includes a
 * dynamic link to the sitemap index.
 */
import type { APIRoute } from "astro";
import { LOCALES_SETTING } from "@/i18n/locales";

const getRobotsTxt = (sitemapURL: URL) => {
	const disallowRules = Object.keys(LOCALES_SETTING)
		.map(
			(lang) => `
Disallow: /${lang}/category/
Disallow: /${lang}/tag/`,
		)
		.join("");

	return `User-agent: *
Allow: /
${disallowRules}

Sitemap: ${sitemapURL.href}
`;
};

export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL("sitemap-index.xml", site);
	return new Response(getRobotsTxt(sitemapURL));
};
