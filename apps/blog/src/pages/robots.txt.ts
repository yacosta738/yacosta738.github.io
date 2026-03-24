/**
 * This is an Astro API route that dynamically generates the `robots.txt` file
 * for the site. It allows all user agents to crawl the site and includes a
 * dynamic link to the sitemap index, blocks AI training bots, and rate-limits
 * aggressive scrapers.
 */
import type { APIRoute } from "astro";
import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "@/i18n/locales";

const getRobotsTxt = (sitemapURL: URL) => {
	const disallowRules = Object.keys(LOCALES_SETTING)
		.map((lang) => {
			const prefix = lang === DEFAULT_LOCALE_SETTING ? "" : `/${lang}`;
			return `Disallow: ${prefix}/category/
Disallow: ${prefix}/tag/`;
		})
		.join("\n");

	return `# robots.txt - dynamically generated
# ${sitemapURL.origin}

# Default: allow all
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin
Disallow: /_astro/
Disallow: /api/
${disallowRules}

# Sitemaps
Sitemap: ${sitemapURL.href}

# Block AI training bots
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

# Rate-limit aggressive scrapers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

# Block known bad bots
User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /
`;
};

export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL("sitemap-index.xml", site);
	return new Response(getRobotsTxt(sitemapURL), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
