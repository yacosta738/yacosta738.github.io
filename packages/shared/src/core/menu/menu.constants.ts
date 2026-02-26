import type { MenuItem } from "./menu.type";

// Mobile drawer constants
export const DRAWER_MENU_ID = "mobile-drawer";
export const DRAWER_MENU_BUTTON_ID = "drawer-menu-button";
export const DRAWER_MENU_BUTTON_BOX_ID = "drawer-menu-button-box";
export const DRAWER_MENU_LABEL = "drawer-menu-label";

// Define navigation menu items
export const navMenus = [
	{
		id: "about",
		title: "nav.about",
		link: "/#about",
	},
	{
		id: "experience",
		title: "nav.experience",
		link: "/#experience",
	},
	{
		id: "work",
		title: "nav.work",
		link: "/#projects",
	},
	{
		id: "contact",
		title: "nav.contact",
		link: "/#contact",
	},
	{
		id: "blog",
		title: "nav.blog",
		link: "/",
	},
];

// Navigation links array with translation keys and conditions
export const navLinks: MenuItem[] = [
	{
		href: "/about/",
		translationKey: "blog.footer.about",
		ariaLabelKey: "blog.footer.aria.about",
		condition: true,
	},
	{
		href: "/#contact",
		translationKey: "blog.footer.contact",
		ariaLabelKey: "blog.footer.aria.contact",
		condition: true,
	},
	{
		href: "/support/",
		translationKey: "blog.footer.donate",
		ariaLabelKey: "blog.footer.aria.donate",
		condition: true,
	},
	{
		href: "/rss.xml",
		translationKey: "blog.footer.rss",
		ariaLabelKey: "blog.footer.aria.rss",
		target: "_blank",
		condition: true,
	},
];
