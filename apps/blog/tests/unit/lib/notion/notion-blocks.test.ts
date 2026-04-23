import { notionBlockFallbacks } from "@blog/lib/notion/notion-blocks";
import type { Element } from "hast";
import { describe, expect, it } from "vitest";

// Build a minimal HAST root tree containing a single element node so we can
// run the plugin without a real unified pipeline.
const makeTree = (node: Element) => ({ type: "root", children: [node] });

const makeElement = (
	tagName: string,
	properties: Record<string, unknown> = {},
	children: Element["children"] = [],
): Element => ({ type: "element", tagName, properties, children });

// Invoke the plugin synchronously — it returns a transformer function.
const run = (node: Element) => {
	const tree = makeTree(node);
	(notionBlockFallbacks as () => (tree: unknown) => void)()(tree);
	return node;
};

// ---------------------------------------------------------------------------
// callout / aside normalization
// ---------------------------------------------------------------------------
describe("notionBlockFallbacks — callout", () => {
	it("adds 'callout' class to an <aside> element", () => {
		const node = makeElement("aside");
		run(node);
		expect(node.properties?.className).toEqual(["callout"]);
	});

	it("adds 'callout' class to a <div> with notion-callout class (string)", () => {
		const node = makeElement("div", { className: "notion-callout" });
		run(node);
		expect(node.properties?.className).toContain("callout");
	});

	it("adds 'callout' class to a <div> with notion-callout class (array)", () => {
		const node = makeElement("div", { className: ["notion-callout"] });
		run(node);
		expect(node.properties?.className).toContain("callout");
	});

	it("does not duplicate 'callout' class when already present", () => {
		const node = makeElement("aside", { className: ["callout"] });
		run(node);
		const classes = node.properties?.className as string[];
		expect(classes.filter((c) => c === "callout")).toHaveLength(1);
	});
});

// ---------------------------------------------------------------------------
// image normalization
// ---------------------------------------------------------------------------
describe("notionBlockFallbacks — image", () => {
	it("replaces an <img> with an empty src with a fallback <p>", () => {
		const node = makeElement("img", { src: "" });
		run(node);
		expect(node.tagName).toBe("p");
		expect((node.properties?.className as string[]).join(" ")).toContain(
			"notion-embed-fallback",
		);
	});

	it("replaces an <img> with no src property with a fallback <p>", () => {
		const node = makeElement("img", {});
		run(node);
		expect(node.tagName).toBe("p");
	});

	it("keeps a valid <img> and adds alt='' when alt is missing", () => {
		const node = makeElement("img", { src: "https://example.com/photo.jpg" });
		run(node);
		expect(node.tagName).toBe("img");
		expect(node.properties?.alt).toBe("");
	});

	it("keeps a valid <img> and adds loading='lazy' when loading is missing", () => {
		const node = makeElement("img", { src: "https://example.com/photo.jpg" });
		run(node);
		expect(node.properties?.loading).toBe("lazy");
	});

	it("preserves an existing alt attribute on a valid <img>", () => {
		const node = makeElement("img", {
			src: "https://example.com/photo.jpg",
			alt: "A landscape",
		});
		run(node);
		expect(node.properties?.alt).toBe("A landscape");
	});
});

// ---------------------------------------------------------------------------
// embed / iframe normalization
// ---------------------------------------------------------------------------
describe("notionBlockFallbacks — embed", () => {
	it("keeps an <iframe> pointing to an allowed host unchanged", () => {
		const node = makeElement("iframe", {
			src: "https://www.youtube.com/embed/abc",
		});
		run(node);
		expect(node.tagName).toBe("iframe");
	});

	it("replaces an <iframe> pointing to a disallowed host with a fallback <p>", () => {
		const node = makeElement("iframe", {
			src: "https://evil.example.com/embed",
		});
		run(node);
		expect(node.tagName).toBe("p");
		expect((node.properties?.className as string[]).join(" ")).toContain(
			"notion-embed-fallback",
		);
	});

	it("replaces an <embed> with an invalid src with a fallback <p>", () => {
		const node = makeElement("embed", { src: "not-a-url" });
		run(node);
		expect(node.tagName).toBe("p");
	});

	it("replaces an <iframe> with a non-string src with a fallback <p> and no link", () => {
		const node = makeElement("iframe", { src: 42 });
		run(node);
		expect(node.tagName).toBe("p");
		// No <a> child because url is null
		const hasLink = node.children.some(
			(c) => c.type === "element" && (c as Element).tagName === "a",
		);
		expect(hasLink).toBe(false);
	});

	it("includes an anchor link in the fallback when the src is a valid but disallowed URL", () => {
		const node = makeElement("iframe", {
			src: "https://evil.example.com/embed",
		});
		run(node);
		const link = node.children.find(
			(c) => c.type === "element" && (c as Element).tagName === "a",
		) as Element | undefined;
		expect(link).toBeDefined();
		expect(link?.properties?.href).toBe("https://evil.example.com/embed");
	});
});
