// https://astro.build/config
// Resolve the site URL from common hosting provider env vars.
// Precedence (first found): VERCEL_URL, URL (Netlify), DEPLOY_PRIME_URL (Netlify PRs),
// CF_PAGES_URL (Cloudflare Pages), SITE_URL (manual), SITE_URL (env)
// Fallback: http://localhost:4321
const trimTrailingSlashes = (value: string): string => {
	let end = value.length;
	while (end > 0 && value.at(end - 1) === "/") {
		end -= 1;
	}

	return value.slice(0, end);
};

const hasInvalidHostnameChars = (value: string): boolean => {
	for (const char of value) {
		const codePoint = char.codePointAt(0);
		if (codePoint === undefined) {
			return true;
		}

		if (codePoint === 0x2f || codePoint <= 0x20) {
			return true;
		}
	}

	return false;
};

const hasValidHostnameLabels = (value: string): boolean => {
	const parts = value.split(".");
	if (parts.length < 2) {
		return false;
	}

	for (const part of parts) {
		if (part.length === 0) {
			return false;
		}

		let hasAlphanumeric = false;
		for (const char of part) {
			const codePoint = char.codePointAt(0);
			if (codePoint === undefined) {
				return false;
			}

			const isDigit = codePoint >= 48 && codePoint <= 57;
			const isUpperCase = codePoint >= 65 && codePoint <= 90;
			const isLowerCase = codePoint >= 97 && codePoint <= 122;
			if (isDigit || isUpperCase || isLowerCase) {
				hasAlphanumeric = true;
				continue;
			}

			if (codePoint !== 45) {
				return false;
			}
		}

		if (!hasAlphanumeric) {
			return false;
		}
	}

	return true;
};

const isLikelyHostname = (value: string): boolean => {
	if (!value) {
		return false;
	}

	if (hasInvalidHostnameChars(value)) {
		return false;
	}

	return hasValidHostnameLabels(value);
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
		process.env.VERCEL_PROJECT_PRODUCTION_URL, // Vercel production domain
		process.env.VERCEL_URL, // vercel provides host without protocol
		process.env.VERCEL_BRANCH_URL, // Vercel branch domain
		process.env.URL, // Netlify exposes this
		process.env.DEPLOY_PRIME_URL, // Netlify preview
		process.env.CF_PAGES_URL, // Cloudflare Pages
		process.env.HOST, // generic
	];

	for (const raw of candidates) {
		if (!raw) continue;
		return normalizeCandidate(String(raw));
	}

	return "http://localhost:4321";
};
