import type { Element, Root as HastRoot } from "hast";
import type { Root as MdastRoot } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

export type RemarkPlugin = Plugin<[], MdastRoot>;
export type RehypePlugin = Plugin<[], HastRoot>;

type AstroFrontmatter = Record<string, unknown> & {
	readingTime?: number;
	readingTimeText?: string;
	minutesRead?: string;
};

type AstroVFile = VFile & {
	data: VFile["data"] & {
		astro?: {
			frontmatter?: AstroFrontmatter;
		};
	};
};

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
	return (tree: MdastRoot, file: VFile) => {
		const textOnPage = mdastToString(tree);
		const readingTime = getReadingTime(textOnPage);

		// readingTime.minutes -> numeric minutes (float)
		// readingTime.text -> friendly string like "3 min read"
		const { data } = file as AstroVFile;
		const frontmatter = data.astro?.frontmatter;
		if (frontmatter) {
			// numeric rounded minutes
			frontmatter.readingTime = Math.ceil(readingTime.minutes);
			// friendly text (e.g. "3 min read")
			frontmatter.readingTimeText = readingTime.text;
			// store minutesRead as in the other implementation (without the " read" suffix)
			frontmatter.minutesRead = readingTime.text.replace(/\s?read$/i, "");
		}
	};
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
	return (tree: HastRoot) => {
		const { children } = tree;
		if (!children) return;

		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child?.type !== "element" || child.tagName !== "table") {
				continue;
			}

			const tableElement = child as Element;
			const wrapper: Element = {
				type: "element",
				tagName: "div",
				properties: { style: "overflow:auto" },
				children: [tableElement],
			};

			children[i] = wrapper;
			i++;
		}
	};
};

export const lazyImagesRehypePlugin: RehypePlugin = () => {
	return (tree: HastRoot) => {
		if (!tree.children) {
			return;
		}

		visit(tree, "element", (node: Element) => {
			if (node.tagName === "img") {
				node.properties = node.properties ?? {};
				node.properties.loading = "lazy";
			}
		});
	};
};
