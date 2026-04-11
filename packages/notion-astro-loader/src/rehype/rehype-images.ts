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

const HEX_IMAGE_ID_PATTERN = /^[0-9a-f]{32}$/i;
const UUID_IMAGE_ID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isOpaqueImageId = (value: string): boolean =>
	HEX_IMAGE_ID_PATTERN.test(value) || UUID_IMAGE_ID_PATTERN.test(value);

const getImageCaption = (
	properties: Record<string, unknown>,
): string | undefined => {
	if (typeof properties.title === "string") {
		return properties.title;
	}

	return typeof properties["data-caption"] === "string"
		? properties["data-caption"]
		: undefined;
};

const getFallbackAltText = (src: string, caption?: string): string => {
	const normalizedCaption = caption?.trim();
	if (normalizedCaption) {
		return normalizedCaption;
	}

	try {
		const normalizedUrl = src.startsWith("http")
			? new URL(src)
			: new URL(src, "https://blog.yunielacosta.com");
		const fileName =
			normalizedUrl.pathname
				.split("/")
				.filter(Boolean)
				.findLast(() => true) || "";
		const baseName = fileName.replace(/\.[^.]+$/, "");
		if (isOpaqueImageId(baseName)) {
			return "";
		}
		const normalized = baseName
			.replaceAll(/[-_]+/g, " ")
			.replaceAll(/\s+/g, " ")
			.trim();
		if (!normalized) {
			return "";
		}
		const compactNormalized = normalized.replaceAll(/\s+/g, "");
		return isOpaqueImageId(compactNormalized) ? "" : normalized;
	} catch {
		return "";
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
		const caption = getImageCaption(node.properties);
		node.properties.alt = getFallbackAltText(
			node.properties.src as string,
			caption,
		);
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
