import { getBlogBaseUrl, normalizeBaseUrl } from "@/utils/blog-url";
import type { MenuItem } from "./menu.type";

type NavigationMenuLink = {
	id: string;
	link: string;
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
