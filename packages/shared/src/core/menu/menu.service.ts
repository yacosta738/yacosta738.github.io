import type { MenuItem } from "./menu.type";

type NavigationMenuLink = {
	id: string;
	link: string;
};

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

/**
 * Check if hostname is localhost or loopback address
 */
const isLocalhost = (hostname: string): boolean => {
	return (
		hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
	);
};

/**
 * Get the blog base URL based on the environment
 * - Production: blog.yunielacosta.com (derived from domain)
 * - Development: localhost:4322 (blog port)
 */
const getBlogBaseUrl = (domain?: string): string => {
	// In production, use production blog URL
	if (process.env.NODE_ENV === "production") {
		const normalized = normalizeBaseUrl(domain);
		// If no domain configured in production, use default
		if (!normalized) {
			return "https://blog.yunielacosta.com";
		}
		const blogUrl = buildBlogBaseUrl(normalized);
		// If domain is malformed and buildBlogBaseUrl returns empty, use fallback
		return blogUrl || "https://blog.yunielacosta.com";
	}

	// In development or when no domain is configured, use localhost:4322
	// Normalize first to catch whitespace-only strings
	const normalized = normalizeBaseUrl(domain);
	if (!normalized) {
		return "http://localhost:4322";
	}

	// If domain is localhost, use localhost:4322 for blog
	try {
		const url = new URL(normalized);
		if (isLocalhost(url.hostname)) {
			return "http://localhost:4322";
		}
	} catch {
		// If URL parsing fails, return localhost as fallback
		return "http://localhost:4322";
	}

	// In other dev environments, derive blog URL from domain
	const blogUrl = buildBlogBaseUrl(normalized);
	return blogUrl || "http://localhost:4322";
};

/**
 * Filters menu items based on their condition property
 * @param items Array of menu items
 * @returns Filtered array of menu items where condition is not false
 */
export function filterMenuItems(items: MenuItem[]): MenuItem[] {
	return items.filter((item) => item.condition !== false);
}

export function resolveNavigationMenuHref(
	menu: NavigationMenuLink,
	translatePath: (path: string) => string,
	domain?: string,
): string {
	const localizedPath = translatePath(menu.link);

	if (menu.id === "blog") {
		const blogBaseUrl = getBlogBaseUrl(domain);
		return blogBaseUrl ? `${blogBaseUrl}${localizedPath}` : localizedPath;
	}

	const portfolioBaseUrl = normalizeBaseUrl(domain);
	return portfolioBaseUrl
		? `${portfolioBaseUrl}${localizedPath}`
		: localizedPath;
}
