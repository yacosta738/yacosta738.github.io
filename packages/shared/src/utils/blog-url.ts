const normalizeBaseUrl = (value?: string): string => {
	if (!value) return "";
	const trimmed = value.trim();
	if (!trimmed) return "";
	const withoutSlash = trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
	if (/^https?:\/\//i.test(withoutSlash)) return withoutSlash;
	return `https://${withoutSlash}`;
};

const buildBlogBaseUrl = (baseUrl: string): string => {
	if (!baseUrl) return "";
	try {
		const url = new URL(baseUrl);
		if (!url.hostname.startsWith("blog.")) {
			url.hostname = `blog.${url.hostname}`;
		}
		return url.origin;
	} catch {
		return "";
	}
};

const isLocalhost = (hostname: string): boolean => {
	return (
		hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
	);
};

export const getBlogBaseUrl = (domain?: string): string => {
	if (process.env.NODE_ENV === "production") {
		const normalized = normalizeBaseUrl(domain);
		if (!normalized) {
			return "https://blog.yunielacosta.com";
		}
		const blogUrl = buildBlogBaseUrl(normalized);
		return blogUrl || "https://blog.yunielacosta.com";
	}

	const normalized = normalizeBaseUrl(domain);
	if (!normalized) {
		return "http://localhost:4322";
	}

	try {
		const url = new URL(normalized);
		if (isLocalhost(url.hostname)) {
			return "http://localhost:4322";
		}
	} catch {
		return "http://localhost:4322";
	}

	const blogUrl = buildBlogBaseUrl(normalized);
	return blogUrl || "http://localhost:4322";
};

export const buildBlogUrl = (path: string, domain?: string): string => {
	const blogBaseUrl = getBlogBaseUrl(domain);
	return blogBaseUrl ? `${blogBaseUrl}${path}` : path;
};

export { normalizeBaseUrl };
