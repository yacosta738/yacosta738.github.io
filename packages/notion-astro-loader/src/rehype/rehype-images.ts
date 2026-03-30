import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

interface Config {
	imagePaths?: string[];
}

type VisitableNode = Parameters<typeof visit>[0];
type ElementLikeNode = VisitableNode & {
	tagName?: string;
	properties?: Record<string, unknown>;
};

const decodeImageSrc = (src: string): string => {
	try {
		return decodeURI(src);
	} catch {
		return src;
	}
};

const getFallbackAltText = (src: string): string => {
	try {
		const normalizedUrl = src.startsWith("http")
			? new URL(src)
			: new URL(src, "https://blog.yunielacosta.com");
		const fileName =
			normalizedUrl.pathname.split("/").filter(Boolean).at(-1) || "";
		const baseName = fileName.replace(/\.[^.]+$/, "");
		const normalized = baseName
			.replace(/[-_]+/g, " ")
			.replace(/\s+/g, " ")
			.trim();
		return normalized || "Article image";
	} catch {
		return "Article image";
	}
};

const processImageNode = (
	node: ElementLikeNode,
	file: VFile,
	imagePaths: string[] | undefined,
	imageOccurrenceMap: Map<string, number>,
) => {
	if (node.type !== "element" || node.tagName !== "img") {
		return;
	}
	if (!node.properties?.src) {
		return;
	}

	const src = node.properties.src as string;
	node.properties.src = decodeImageSrc(src);
	const alt =
		typeof node.properties.alt === "string" ? node.properties.alt.trim() : "";
	if (!alt) {
		node.properties.alt = getFallbackAltText(node.properties.src as string);
	}

	const astroData = file.data.astro as { imagePaths?: string[] } | undefined;
	if (astroData) {
		astroData.imagePaths = imagePaths;
	}

	if (!imagePaths?.includes(node.properties.src as string)) {
		return;
	}

	const { ...props } = node.properties;
	const index = imageOccurrenceMap.get(node.properties.src as string) || 0;
	imageOccurrenceMap.set(node.properties.src as string, index + 1);

	node.properties.__ASTRO_IMAGE_ = JSON.stringify({
		...props,
		index,
	});

	Object.keys(props).forEach((prop) => {
		delete node.properties?.[prop];
	});
};

export function rehypeImages() {
	return ({ imagePaths }: Config) =>
		(tree: unknown, file: VFile) => {
			const imageOccurrenceMap = new Map<string, number>();
			visit(tree as VisitableNode, (node) => {
				processImageNode(node, file, imagePaths, imageOccurrenceMap);
			});
		};
}
