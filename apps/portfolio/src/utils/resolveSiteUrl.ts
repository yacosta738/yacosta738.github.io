// https://astro.build/config
// Resolve the site URL from common hosting provider env vars.
// Precedence (first found): VERCEL_URL, URL (Netlify), DEPLOY_PRIME_URL (Netlify PRs),
// CF_PAGES_URL (Cloudflare Pages), SITE_URL (manual), SITE_URL (env)
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
		process.env.HOST, // generic
	];

	for (const raw of candidates) {
		if (!raw) continue;

		const value = String(raw).trim();

		// Helper: trim trailing slashes in linear time to avoid regex backtracking issues
		const trimTrailingSlashes = (s: string) => {
			let end = s.length;
			while (end > 0 && s.charAt(end - 1) === "/") end--;
			return s.slice(0, end);
		};

		// If value starts with protocol, return as-is (after trimming trailing slash)
		if (/^https?:\/\//i.test(value)) {
			return trimTrailingSlashes(value);
		}

		// If value looks like host (no protocol), add https://
		// Use a linear-time validator instead of a regex to avoid any ReDoS risk.
		const isLikelyHostname = (s: string) => {
			if (!s || s.length === 0) return false;
			// Fast reject common invalid chars
			for (let i = 0; i < s.length; i++) {
				const ch = s.charCodeAt(i);
				if (ch === 0x2f) return false; // '/'
				if (ch <= 0x20) return false; // control or whitespace
			}

			const parts = s.split(".");
			if (parts.length < 2) return false; // require at least one dot

			for (const part of parts) {
				if (part.length === 0) return false; // empty label
				let hasAlnum = false;
				for (let j = 0; j < part.length; j++) {
					const c = part.charCodeAt(j);
					// allow a-z, A-Z, 0-9 and '-'
					if (c >= 48 && c <= 57)
						hasAlnum = true; // 0-9
					else if (c >= 65 && c <= 90)
						hasAlnum = true; // A-Z
					else if (c >= 97 && c <= 122)
						hasAlnum = true; // a-z
					else if (c === 45) {
						// hyphen allowed
					} else {
						return false; // other chars not allowed
					}
				}
				if (!hasAlnum) return false; // label must contain at least one alphanumeric
			}
			return true;
		};

		// Check hostname against the trimmed value so values like "example.com/" are
		// recognized as hostnames (matching previous behavior).
		const trimmed = trimTrailingSlashes(value);
		if (isLikelyHostname(trimmed)) {
			return `https://${trimmed}`;
		}

		// As a last resort, if it's something else, try to return it normalized
		if (value) return trimTrailingSlashes(value);
	}

	return "http://localhost:4321";
};
