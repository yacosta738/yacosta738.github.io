import { describe, expect, it, vi } from "vitest";
import { filterMenuItems, resolveNavigationMenuHref } from "./menu.service";
import type { MenuItem } from "./menu.type";

vi.mock("@/utils/blog-url", () => ({
	getBlogBaseUrl: vi.fn((domain?: string) => {
		if (!domain) return "http://localhost:4322";
		return `https://blog.${domain}`;
	}),
	normalizeBaseUrl: vi.fn((domain?: string) => {
		if (!domain) return "";
		return `https://${domain}`;
	}),
}));

describe("filterMenuItems", () => {
	it("returns items where condition is not false", () => {
		const items: MenuItem[] = [
			{ href: "/home", translationKey: "home", condition: true },
			{ href: "/about", translationKey: "about", condition: false },
			{ href: "/blog", translationKey: "blog" },
		];

		const result = filterMenuItems(items);

		expect(result).toHaveLength(2);
		expect(result[0].href).toBe("/home");
		expect(result[1].href).toBe("/blog");
	});

	it("returns all items when none have condition: false", () => {
		const items: MenuItem[] = [
			{ href: "/a", translationKey: "a" },
			{ href: "/b", translationKey: "b", condition: true },
		];

		expect(filterMenuItems(items)).toHaveLength(2);
	});

	it("returns empty array when all items have condition: false", () => {
		const items: MenuItem[] = [
			{ href: "/a", translationKey: "a", condition: false },
			{ href: "/b", translationKey: "b", condition: false },
		];

		expect(filterMenuItems(items)).toHaveLength(0);
	});

	it("returns empty array for empty input", () => {
		expect(filterMenuItems([])).toHaveLength(0);
	});
});

describe("resolveNavigationMenuHref", () => {
	const translatePath = (path: string) => `/en${path}`;

	it("resolves blog menu link using blog base URL with domain", () => {
		const menu = { id: "blog", link: "/blog" };
		const result = resolveNavigationMenuHref(
			menu,
			translatePath,
			"yunielacosta.com",
		);

		expect(result).toBe("https://blog.yunielacosta.com/en/blog");
	});

	it("resolves blog menu link without domain (fallback)", () => {
		const menu = { id: "blog", link: "/blog" };
		const result = resolveNavigationMenuHref(menu, translatePath);

		expect(result).toBe("http://localhost:4322/en/blog");
	});

	it("resolves non-blog menu link with domain", () => {
		const menu = { id: "about", link: "/about" };
		const result = resolveNavigationMenuHref(
			menu,
			translatePath,
			"yunielacosta.com",
		);

		expect(result).toBe("https://yunielacosta.com/en/about");
	});

	it("resolves non-blog menu link without domain (local path only)", () => {
		const menu = { id: "about", link: "/about" };
		const result = resolveNavigationMenuHref(menu, translatePath);

		// normalizeBaseUrl("") returns "", so portfolioBaseUrl is falsy
		expect(result).toBe("/en/about");
	});

	it("uses blog base URL when getBlogBaseUrl returns empty string", async () => {
		const { getBlogBaseUrl } = await import("@/utils/blog-url");
		vi.mocked(getBlogBaseUrl).mockReturnValueOnce("");

		const menu = { id: "blog", link: "/posts" };
		const result = resolveNavigationMenuHref(menu, translatePath, "test.com");

		// blogBaseUrl is "", so fallback to localizedPath
		expect(result).toBe("/en/posts");
	});

	it("uses portfolio base URL when normalizeBaseUrl returns empty", async () => {
		const { normalizeBaseUrl } = await import("@/utils/blog-url");
		vi.mocked(normalizeBaseUrl).mockReturnValueOnce("");

		const menu = { id: "home", link: "/" };
		const result = resolveNavigationMenuHref(menu, translatePath, "test.com");

		expect(result).toBe("/en/");
	});
});
