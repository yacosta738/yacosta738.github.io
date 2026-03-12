import type { Element } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

type ElementNode = Element & {
	properties?: Record<string, unknown>;
};

const ALLOWED_EMBED_HOSTS = new Set([
	"youtube.com",
	"www.youtube.com",
	"youtu.be",
	"player.vimeo.com",
	"vimeo.com",
	"codepen.io",
	"codesandbox.io",
	"twitter.com",
	"x.com",
]);

const getClassList = (node: ElementNode): string[] => {
	const value = node.properties?.className;
	if (Array.isArray(value)) {
		return value.filter((item): item is string => typeof item === "string");
	}
	if (typeof value === "string") {
		return value.split(" ").filter(Boolean);
	}
	return [];
};

const setClassList = (node: ElementNode, classes: string[]) => {
	if (!node.properties) {
		node.properties = {};
	}
	node.properties.className = classes;
};

const appendClass = (node: ElementNode, className: string) => {
	const classList = getClassList(node);
	if (!classList.includes(className)) {
		classList.push(className);
	}
	setClassList(node, classList);
};

const toUrl = (value: unknown): URL | null => {
	if (typeof value !== "string") {
		return null;
	}

	try {
		return new URL(value);
	} catch {
		return null;
	}
};

const isAllowedEmbed = (url: URL | null): boolean => {
	if (!url) {
		return false;
	}

	return ALLOWED_EMBED_HOSTS.has(url.hostname);
};

const replaceWithFallback = (
	node: ElementNode,
	message: string,
	url: URL | null,
) => {
	node.tagName = "p";
	appendClass(node, "notion-embed-fallback");
	const linkText = url ? url.toString() : undefined;
	const children = [] as ElementNode["children"];
	children.push({
		type: "text",
		value: message,
	} as ElementNode["children"][number]);
	if (linkText) {
		children.push({
			type: "element",
			tagName: "a",
			properties: {
				href: linkText,
				rel: "noopener noreferrer",
				target: "_blank",
			},
			children: [{ type: "text", value: linkText }],
		} as ElementNode["children"][number]);
	}
	node.children = children;
};

const normalizeImage = (node: ElementNode) => {
	const src = node.properties?.src;
	if (typeof src !== "string" || src.trim().length === 0) {
		replaceWithFallback(node, "Image unavailable.", null);
		return;
	}

	if (typeof node.properties?.alt !== "string") {
		node.properties = { ...node.properties, alt: "" };
	}

	if (!node.properties?.loading) {
		node.properties = { ...node.properties, loading: "lazy" };
	}
};

const normalizeCallout = (node: ElementNode) => {
	appendClass(node, "callout");
};

const normalizeEmbed = (node: ElementNode) => {
	const src = node.properties?.src;
	const url = toUrl(src);
	if (!isAllowedEmbed(url)) {
		replaceWithFallback(node, "Embed unavailable.", url);
	}
};

export const notionBlockFallbacks: Plugin = () => (tree) => {
	visit(tree as unknown as ElementNode, "element", (node: ElementNode) => {
		const classList = getClassList(node);
		if (node.tagName === "aside" || classList.includes("notion-callout")) {
			normalizeCallout(node);
			return;
		}

		if (node.tagName === "img") {
			normalizeImage(node);
			return;
		}

		if (node.tagName === "iframe" || node.tagName === "embed") {
			normalizeEmbed(node);
		}
	});
};
