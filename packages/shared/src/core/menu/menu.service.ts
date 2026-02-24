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
	const portfolioBaseUrl = normalizeBaseUrl(domain);

	if (!portfolioBaseUrl) return localizedPath;

	if (menu.id === "blog") {
		const blogBaseUrl = buildBlogBaseUrl(portfolioBaseUrl);
		return blogBaseUrl ? `${blogBaseUrl}${localizedPath}` : localizedPath;
	}

	return `${portfolioBaseUrl}${localizedPath}`;
}
