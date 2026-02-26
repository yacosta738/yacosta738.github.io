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
 * Get the blog base URL based on the environment
 * - Production: blog.yunielacosta.com (derived from domain)
 * - Development: localhost:4322 (blog port)
 */
const getBlogBaseUrl = (domain?: string): string => {
	// In development or when no domain is configured, use localhost:4322
	if (!domain) {
		return "http://localhost:4322";
	}

	const normalized = normalizeBaseUrl(domain);

	// If domain is localhost, use localhost:4322 for blog
	if (normalized.includes("localhost")) {
		return "http://localhost:4322";
	}

	// In production, derive blog URL from domain (e.g., yunielacosta.com -> blog.yunielacosta.com)
	return buildBlogBaseUrl(normalized);
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
