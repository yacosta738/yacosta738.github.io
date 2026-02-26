// https://astro.build/config
// Resolve the site URL from common hosting provider env vars.
// Precedence (first found): VERCEL_URL, URL (Netlify), DEPLOY_PRIME_URL (Netlify PRs),
// CF_PAGES_URL (Cloudflare Pages), SITE_URL (manual), SITE_URL (env)
// Fallbacks:
// - Production: https://yunielacosta.com
// - Development: http://localhost:4321

const trimTrailingSlashes = (value: string): string => {
	let end = value.length;
	while (end > 0 && value.at(end - 1) === "/") {
		end -= 1;
	}

	return value.slice(0, end);
};

// Regex: starts with alphanumeric, contains valid hostname labels separated by dots
const HOSTNAME_REGEX =
	/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const isLikelyHostname = (value: string): boolean => {
	if (!value) {
		return false;
	}

	// Check for invalid characters: forward slash, or characters outside printable ASCII
	const hasInvalidChars = value.includes("/") || /[^\x21-\x7E]/.test(value);
	if (hasInvalidChars) {
		return false;
	}

	return HOSTNAME_REGEX.test(value);
};

const normalizeCandidate = (raw: string): string => {
	const value = raw.trim();
	if (/^https?:\/\//i.test(value)) {
		return trimTrailingSlashes(value);
	}

	const trimmed = trimTrailingSlashes(value);
	if (isLikelyHostname(trimmed)) {
		return `https://${trimmed}`;
	}

	return trimTrailingSlashes(value);
};

export const resolveSiteUrl = () => {
	// Known provider env vars (checked in order of preference)
	const candidates = [
		process.env.SITE_URL,
		process.env.DOMAIN,
		process.env.VERCEL_PROJECT_PRODUCTION_URL, // Vercel production domain
		process.env.VERCEL_URL, // vercel provides host without protocol
		process.env.VERCEL_BRANCH_URL, // Vercel branch domain
		process.env.URL, // Netlify exposes this
		process.env.DEPLOY_PRIME_URL, // Netlify preview
		process.env.CF_PAGES_URL, // Cloudflare Pages
	];

	for (const raw of candidates) {
		if (!raw) continue;
		return normalizeCandidate(String(raw));
	}

	if (process.env.NODE_ENV === "production") {
		return "https://yunielacosta.com";
	}

	return "http://localhost:4321";
};
