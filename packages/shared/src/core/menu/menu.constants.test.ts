import { describe, expect, it } from "vitest";
import {
	DRAWER_MENU_BUTTON_BOX_ID,
	DRAWER_MENU_BUTTON_ID,
	DRAWER_MENU_ID,
	DRAWER_MENU_LABEL,
	navLinks,
	navMenus,
} from "./menu.constants";

describe("drawer menu constants", () => {
	it("DRAWER_MENU_ID is defined", () => {
		expect(DRAWER_MENU_ID).toBe("mobile-drawer");
	});

	it("DRAWER_MENU_BUTTON_ID is defined", () => {
		expect(DRAWER_MENU_BUTTON_ID).toBe("drawer-menu-button");
	});

	it("DRAWER_MENU_BUTTON_BOX_ID is defined", () => {
		expect(DRAWER_MENU_BUTTON_BOX_ID).toBe("drawer-menu-button-box");
	});

	it("DRAWER_MENU_LABEL is defined", () => {
		expect(DRAWER_MENU_LABEL).toBe("drawer-menu-label");
	});
});

describe("navMenus", () => {
	it("is a non-empty array", () => {
		expect(Array.isArray(navMenus)).toBe(true);
		expect(navMenus.length).toBeGreaterThan(0);
	});

	it("every item has id, title, and link", () => {
		for (const item of navMenus) {
			expect(item).toHaveProperty("id");
			expect(item).toHaveProperty("title");
			expect(item).toHaveProperty("link");
		}
	});

	it("contains expected navigation sections", () => {
		const ids = navMenus.map((m) => m.id);
		expect(ids).toContain("about");
		expect(ids).toContain("experience");
		expect(ids).toContain("work");
		expect(ids).toContain("contact");
		expect(ids).toContain("blog");
	});
});

describe("navLinks", () => {
	it("is a non-empty array", () => {
		expect(Array.isArray(navLinks)).toBe(true);
		expect(navLinks.length).toBeGreaterThan(0);
	});

	it("every item has href, translationKey, ariaLabelKey, and condition", () => {
		for (const link of navLinks) {
			expect(link).toHaveProperty("href");
			expect(link).toHaveProperty("translationKey");
			expect(link).toHaveProperty("ariaLabelKey");
			expect(link).toHaveProperty("condition");
		}
	});

	it("all conditions are true", () => {
		expect(navLinks.every((l) => l.condition === true)).toBe(true);
	});

	it("RSS link opens in _blank", () => {
		const rss = navLinks.find((l) => l.href === "/rss.xml");
		expect(rss).toBeDefined();
		expect(rss?.target).toBe("_blank");
	});
});
