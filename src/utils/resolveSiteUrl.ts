// https://astro.build/config
// Resolve the site URL from common hosting provider env vars.
// Precedence (first found): VERCEL_URL, URL (Netlify), DEPLOY_PRIME_URL (Netlify PRs),
// CF_PAGES_URL (Cloudflare Pages), SITE_URL (manual), SITE_URL (env), BASE_URL_PROD, BASE_URL_LOCAL
// Fallback: http://localhost:4321
export const resolveSiteUrl = () => {
	// Known provider env vars (checked in order of preference)
	const candidates = [
		process.env.SITE_URL,
		process.env.VERCEL_PROJECT_PRODUCTION_URL, // Vercel production domain
		process.env.VERCEL_URL, // vercel provides host without protocol
		process.env.VERCEL_BRANCH_URL, // Vercel branch domain
		process.env.URL, // Netlify exposes this
		process.env.DEPLOY_PRIME_URL, // Netlify preview
		process.env.CF_PAGES_URL, // Cloudflare Pages
		process.env.BASE_URL_PROD,
		process.env.BASE_URL_LOCAL,
		process.env.HOST, // generic
	];

	for (const raw of candidates) {
		if (!raw) continue;

		const value = String(raw).trim();

		// If value starts with protocol, return as-is (after trimming trailing slash)
		if (/^https?:\/\//i.test(value)) {
			return value.replace(/\/+$/g, "");
		}

		// If value looks like host (no protocol), add https://
		if (/^[^\s/]+(\.[^\s/]+)+/.test(value)) {
			return `https://${value.replace(/\/+$/g, "")}`;
		}

		// As a last resort, if it's something else, try to return it normalized
		if (value) return value.replace(/\/+$/g, "");
	}

	return "http://localhost:4321";
};
