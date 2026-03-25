import type { Element, Root as HastRoot } from "hast";
import type { Root as MdastRoot } from "mdast";
import { describe, expect, it } from "vitest";
import {
	lazyImagesRehypePlugin,
	readingTimeRemarkPlugin,
	responsiveTablesRehypePlugin,
} from "./markdown";

describe("readingTimeRemarkPlugin", () => {
	const plugin = readingTimeRemarkPlugin();

	it("should calculate reading time and set frontmatter fields", () => {
		const tree: MdastRoot = {
			type: "root",
			children: [{ type: "text", value: "word ".repeat(200) }],
		};
		const file = { data: { astro: { frontmatter: {} } } };

		plugin(tree, file as never);

		const fm = file.data.astro.frontmatter as Record<string, unknown>;
		expect(fm.readingTime).toBeDefined();
		expect(typeof fm.readingTime).toBe("number");
		expect(fm.readingTime).toBeGreaterThanOrEqual(1);
		expect(fm.readingTimeText).toBeDefined();
		expect(typeof fm.readingTimeText).toBe("string");
		expect(fm.minutesRead).toBeDefined();
		// minutesRead should not end with " read"
		expect((fm.minutesRead as string).endsWith(" read")).toBe(false);
	});

	it("should set readingTime to 1 for very short content", () => {
		const tree: MdastRoot = {
			type: "root",
			children: [{ type: "text", value: "hello" }],
		};
		const file = { data: { astro: { frontmatter: {} } } };

		plugin(tree, file as never);

		const fm = file.data.astro.frontmatter as Record<string, unknown>;
		expect(fm.readingTime).toBe(1);
	});

	it("should not throw when frontmatter is missing (no astro property)", () => {
		const tree: MdastRoot = { type: "root", children: [] };
		const file = { data: {} };

		expect(() => plugin(tree, file as never)).not.toThrow();
	});

	it("should not throw when astro.frontmatter is undefined", () => {
		const tree: MdastRoot = { type: "root", children: [] };
		const file = { data: { astro: {} } };

		expect(() => plugin(tree, file as never)).not.toThrow();
	});

	it("should handle empty tree", () => {
		const tree: MdastRoot = { type: "root", children: [] };
		const file = { data: { astro: { frontmatter: {} } } };

		plugin(tree, file as never);

		const fm = file.data.astro.frontmatter as Record<string, unknown>;
		// Math.ceil(0) = 0 for empty content
		expect(fm.readingTime).toBe(0);
	});
});

describe("responsiveTablesRehypePlugin", () => {
	const plugin = responsiveTablesRehypePlugin();

	it("should wrap table elements in a scrollable div", () => {
		const table: Element = {
			type: "element",
			tagName: "table",
			properties: {},
			children: [],
		};
		const tree: HastRoot = { type: "root", children: [table] };

		plugin(tree);

		const wrapper = tree.children[0] as Element;
		expect(wrapper.tagName).toBe("div");
		expect(wrapper.properties?.style).toBe("overflow:auto");
		expect(wrapper.children).toHaveLength(1);
		expect((wrapper.children[0] as Element).tagName).toBe("table");
	});

	it("should not wrap non-table elements", () => {
		const paragraph: Element = {
			type: "element",
			tagName: "p",
			properties: {},
			children: [],
		};
		const tree: HastRoot = { type: "root", children: [paragraph] };

		plugin(tree);

		expect((tree.children[0] as Element).tagName).toBe("p");
	});

	it("should handle mixed children with multiple tables", () => {
		const p: Element = {
			type: "element",
			tagName: "p",
			properties: {},
			children: [],
		};
		const table1: Element = {
			type: "element",
			tagName: "table",
			properties: {},
			children: [],
		};
		const table2: Element = {
			type: "element",
			tagName: "table",
			properties: {},
			children: [],
		};
		const tree: HastRoot = { type: "root", children: [p, table1, table2] };

		plugin(tree);

		// p stays as-is
		expect((tree.children[0] as Element).tagName).toBe("p");
		// table1 wrapped in div
		expect((tree.children[1] as Element).tagName).toBe("div");
		// table2 also wrapped in div
		expect((tree.children[2] as Element).tagName).toBe("div");
		expect(tree.children.length).toBe(3);
	});

	it("should handle tree with no children", () => {
		const tree = { type: "root", children: undefined } as unknown as HastRoot;
		expect(() => plugin(tree)).not.toThrow();
	});

	it("should skip non-element children (text nodes)", () => {
		const tree: HastRoot = {
			type: "root",
			children: [{ type: "text", value: "hello" }],
		};

		plugin(tree);

		expect(tree.children[0].type).toBe("text");
	});
});

describe("lazyImagesRehypePlugin", () => {
	const plugin = lazyImagesRehypePlugin();

	it("should add loading=lazy and decoding=async to img elements", () => {
		const img: Element = {
			type: "element",
			tagName: "img",
			properties: { src: "test.png" },
			children: [],
		};
		const tree: HastRoot = { type: "root", children: [img] };

		plugin(tree);

		expect(img.properties?.loading).toBe("lazy");
		expect(img.properties?.decoding).toBe("async");
	});

	it("should initialize properties if they are undefined", () => {
		const img: Element = {
			type: "element",
			tagName: "img",
			properties: undefined as never,
			children: [],
		};
		const tree: HastRoot = {
			type: "root",
			children: [
				{
					type: "element",
					tagName: "div",
					properties: {},
					children: [img],
				},
			],
		};

		plugin(tree);

		expect(img.properties).toBeDefined();
		expect(img.properties?.loading).toBe("lazy");
	});

	it("should not modify non-img elements", () => {
		const div: Element = {
			type: "element",
			tagName: "div",
			properties: {},
			children: [],
		};
		const tree: HastRoot = { type: "root", children: [div] };

		plugin(tree);

		expect(div.properties?.loading).toBeUndefined();
	});

	it("should handle deeply nested img elements", () => {
		const img: Element = {
			type: "element",
			tagName: "img",
			properties: { src: "deep.png" },
			children: [],
		};
		const tree: HastRoot = {
			type: "root",
			children: [
				{
					type: "element",
					tagName: "div",
					properties: {},
					children: [
						{
							type: "element",
							tagName: "p",
							properties: {},
							children: [img],
						},
					],
				},
			],
		};

		plugin(tree);

		expect(img.properties?.loading).toBe("lazy");
		expect(img.properties?.decoding).toBe("async");
	});

	it("should handle tree with no children", () => {
		const tree = { type: "root", children: undefined } as unknown as HastRoot;
		expect(() => plugin(tree)).not.toThrow();
	});
});
