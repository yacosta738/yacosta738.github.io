import type { ImageMetadata } from "astro";
import type { OpenGraph } from "@/types";
import {
	astroAssetsOptimizer,
	isUnpicCompatible,
	unpicOptimizer,
} from "./images-optimization";

const load = async () => {
	let images: Record<string, () => Promise<unknown>> | undefined;
	try {
		// Use an absolute /src/ glob so Vite can resolve assets inside the project
		images = import.meta.glob(
			"/src/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}",
		);
	} catch (error) {
		console.warn("[images] failed to load local image glob", error);
	}
	return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined;

type ImageLoaders = Record<string, () => Promise<unknown>>;

const loadImageFromKey = async (
	images: ImageLoaders,
	key: string,
): Promise<ImageMetadata | null> => {
	if (typeof images[key] !== "function") {
		return null;
	}

	try {
		const moduleResult = await images[key]();
		return (moduleResult as { default?: ImageMetadata }).default ?? null;
	} catch (error) {
		console.debug("[images] failed loading image module", key, error);
		return null;
	}
};

const findBySuffixOrBasename = (
	keys: string[],
	suffix: string,
	basename: string | undefined,
): string | undefined => {
	const suffixMatch = keys.find((key) => key.endsWith(suffix));
	if (suffixMatch) {
		return suffixMatch;
	}

	if (!basename) {
		return undefined;
	}

	return keys.find(
		(key) => key.endsWith(`/${basename}`) || key.endsWith(basename),
	);
};

const importFirstFromCandidates = async (
	images: ImageLoaders,
	candidates: Iterable<string>,
): Promise<ImageMetadata | null> => {
	for (const candidate of candidates) {
		if (!candidate) {
			continue;
		}

		const resolved = await loadImageFromKey(images, candidate);
		if (resolved) {
			return resolved;
		}
	}

	return null;
};

const findByInspectingModules = async (
	images: ImageLoaders,
	keys: string[],
	imagePath: string,
	basename: string | undefined,
): Promise<ImageMetadata | null> => {
	for (const key of keys) {
		const meta = await loadImageFromKey(images, key);
		if (!meta) {
			continue;
		}

		const candidateSrc = String(meta.src || "");
		if (
			candidateSrc === imagePath ||
			candidateSrc.endsWith(`/${basename}`) ||
			candidateSrc.includes(basename || "")
		) {
			return meta;
		}
	}

	return null;
};

const logFindImageFailure = (
	imagePath: string,
	candidates: Set<string>,
	images: ImageLoaders,
): void => {
	try {
		console.warn(
			"[findImage] failed to resolve",
			imagePath,
			"candidates:",
			Array.from(candidates).slice(0, 20),
		);
		console.warn(
			"[findImage] available keys (sample):",
			Object.keys(images).slice(0, 30),
		);
	} catch (error) {
		console.debug("[findImage] failed logging diagnostics", error);
	}
};

const resolveOptimizedOpenGraphImage = async (
	resolvedImage: ImageMetadata | string,
	defaultWidth: number,
	defaultHeight: number,
): Promise<{ src: string; width?: number; height?: number } | undefined> => {
	if (
		typeof resolvedImage === "string" &&
		(resolvedImage.startsWith("http://") ||
			resolvedImage.startsWith("https://")) &&
		isUnpicCompatible(resolvedImage)
	) {
		return (
			await unpicOptimizer(
				resolvedImage,
				[defaultWidth],
				defaultWidth,
				defaultHeight,
				"jpg",
			)
		)[0];
	}

	const dimensions =
		typeof resolvedImage !== "string" && resolvedImage.width <= defaultWidth
			? [resolvedImage.width, resolvedImage.height]
			: [defaultWidth, defaultHeight];

	return (
		await astroAssetsOptimizer(
			resolvedImage,
			[dimensions[0]],
			dimensions[0],
			dimensions[1],
			"jpg",
		)
	)[0];
};

const adaptSingleOpenGraphImage = async (
	image: { url?: string },
	astroSite: URL | undefined,
	defaultWidth: number,
	defaultHeight: number,
): Promise<{ url: string; width?: number; height?: number }> => {
	if (!image?.url) {
		return { url: "" };
	}

	const resolvedImage = await findImage(image.url);
	if (!resolvedImage) {
		return { url: "" };
	}

	const optimized = await resolveOptimizedOpenGraphImage(
		resolvedImage,
		defaultWidth,
		defaultHeight,
	);
	if (!optimized || typeof optimized.src !== "string") {
		return { url: "" };
	}

	return {
		url: String(new URL(optimized.src, astroSite)),
		width: typeof optimized.width === "number" ? optimized.width : undefined,
		height: typeof optimized.height === "number" ? optimized.height : undefined,
	};
};

const resolveSrcPathImage = async (
	imagePath: string,
	images: ImageLoaders,
): Promise<ImageMetadata | null> => {
	const direct = await loadImageFromKey(images, imagePath);
	if (direct) {
		return direct;
	}

	const pathInsideAssets = imagePath.includes("/assets/")
		? imagePath.substring(imagePath.indexOf("/assets/"))
		: imagePath;
	const keys = Object.keys(images);
	const basename = pathInsideAssets.split("/").pop();

	const suffixMatch = findBySuffixOrBasename(keys, pathInsideAssets, basename);
	if (suffixMatch) {
		const matched = await loadImageFromKey(images, suffixMatch);
		if (matched) {
			return matched;
		}
	}

	const normalizedImagePath = imagePath.replace(/^\.\/?/, "/");
	const candidates = new Set<string>([
		imagePath,
		normalizedImagePath,
		pathInsideAssets,
		`/src${pathInsideAssets}`,
		`./src${pathInsideAssets}`,
		`src${pathInsideAssets}`,
		`.${pathInsideAssets}`,
	]);

	const appendSrcCandidates = (key: string) => {
		const normalizedKey = key.replace(/^\.\//, "/");
		const shouldInclude =
			normalizedKey === normalizedImagePath ||
			normalizedKey.endsWith(pathInsideAssets) ||
			normalizedKey.endsWith(`/${basename}`) ||
			normalizedKey.includes(basename || "");

		if (!shouldInclude) {
			return;
		}

		candidates.add(key);
		candidates.add(normalizedKey);
	};

	keys.forEach(appendSrcCandidates);

	const fromCandidates = await importFirstFromCandidates(images, candidates);
	if (fromCandidates) {
		return fromCandidates;
	}

	const fromInspection = await findByInspectingModules(
		images,
		keys,
		imagePath,
		basename,
	);
	if (fromInspection) {
		return fromInspection;
	}

	logFindImageFailure(imagePath, candidates, images);
	return null;
};

const resolveRootRelativeImage = async (
	imagePath: string,
	images: ImageLoaders,
): Promise<ImageMetadata | null> => {
	const keys = Object.keys(images);
	const direct = await loadImageFromKey(images, imagePath);
	if (direct) {
		return direct;
	}

	const basename = imagePath.split("/").pop();
	const suffixMatch = findBySuffixOrBasename(keys, imagePath, basename);
	if (suffixMatch) {
		const matched = await loadImageFromKey(images, suffixMatch);
		if (matched) {
			return matched;
		}
	}

	const candidates = new Set<string>([
		imagePath,
		`/src${imagePath}`,
		`/assets${imagePath}`,
		`./src${imagePath}`,
		`./assets${imagePath}`,
	]);

	for (const key of keys) {
		const normalizedKey = key.replace(/^\.\//, "/");
		if (
			normalizedKey.endsWith(imagePath) ||
			(basename &&
				(normalizedKey.endsWith(`/${basename}`) ||
					normalizedKey.includes(basename)))
		) {
			candidates.add(key);
			candidates.add(normalizedKey);
		}
	}

	return importFirstFromCandidates(images, candidates);
};

const resolveWithImages = async (
	imagePath: string,
	resolver: (
		path: string,
		images: ImageLoaders,
	) => Promise<ImageMetadata | null>,
): Promise<ImageMetadata | null> => {
	const images = await fetchLocalImages();
	if (!images) {
		return null;
	}

	return resolver(imagePath, images);
};

/** */
export const fetchLocalImages = async () => {
	_images = _images || (await load());
	return _images;
};

/** */
export const findImage = async (
	imagePath?: string | ImageMetadata | null,
): Promise<string | ImageMetadata | undefined | null> => {
	if (typeof imagePath !== "string") {
		return imagePath;
	}

	if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
		return imagePath;
	}

	if (imagePath.startsWith("/src/")) {
		return resolveWithImages(imagePath, resolveSrcPathImage);
	}

	if (imagePath.startsWith("/")) {
		const resolved = await resolveWithImages(
			imagePath,
			resolveRootRelativeImage,
		);
		if (resolved) {
			return resolved;
		}
	}

	if (!imagePath.startsWith("~/assets/images")) {
		return imagePath;
	}

	const images = await fetchLocalImages();
	if (!images) {
		return null;
	}

	const key = imagePath.replace("~/", "/src/");
	return loadImageFromKey(images, key);
};

/** */
export const adaptOpenGraphImages = async (
	openGraph: OpenGraph = {},
	astroSite: URL | undefined = new URL(""),
): Promise<OpenGraph> => {
	if (!openGraph?.images?.length) {
		return openGraph;
	}

	const images = openGraph.images;
	const defaultWidth = 1200;
	const defaultHeight = 626;

	const adaptedImages = await Promise.all(
		images.map((image) =>
			adaptSingleOpenGraphImage(image, astroSite, defaultWidth, defaultHeight),
		),
	);

	return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) };
};
