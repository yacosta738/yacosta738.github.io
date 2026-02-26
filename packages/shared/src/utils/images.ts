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
		const localImages = import.meta.glob(
			"/src/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}",
		);
		const sharedImages = import.meta.glob(
			"/../../packages/shared/src/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}",
		);

		images = { ...localImages, ...sharedImages };
	} catch (_error) {
		// continue regardless of error
	}
	return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined;

/** */
export const fetchLocalImages = async () => {
	_images = _images || (await load());
	return _images;
};

// ============================================
// Helper functions for image resolution
// ============================================

const tryExactMatch = async (
	images: Record<string, () => Promise<unknown>>,
	imagePath: string,
): Promise<ImageMetadata | undefined> => {
	if (typeof images[imagePath] === "function") {
		try {
			const result = await images[imagePath]();
			return (result as { default: ImageMetadata }).default;
		} catch {
			return undefined;
		}
	}
	return undefined;
};

const trySuffixMatch = async (
	images: Record<string, () => Promise<unknown>>,
	keys: string[],
	searchPath: string,
): Promise<ImageMetadata | undefined> => {
	const match = keys.find((k) => k.endsWith(searchPath));
	if (match && typeof images[match] === "function") {
		try {
			const result = await images[match]();
			return (result as { default: ImageMetadata }).default;
		} catch {
			return undefined;
		}
	}
	return undefined;
};

const tryBasenameMatch = async (
	images: Record<string, () => Promise<unknown>>,
	keys: string[],
	basename: string,
): Promise<ImageMetadata | undefined> => {
	const match = keys.find(
		(k) => k.endsWith(`/${basename}`) || k.endsWith(basename),
	);
	if (match && typeof images[match] === "function") {
		try {
			const result = await images[match]();
			return (result as { default: ImageMetadata }).default;
		} catch {
			return undefined;
		}
	}
	return undefined;
};

const tryCandidateVariants = async (
	images: Record<string, () => Promise<unknown>>,
	keys: string[],
	imagePath: string,
	basename: string | undefined,
): Promise<ImageMetadata | undefined> => {
	const candidates = new Set<string>();

	// Build candidate set
	candidates.add(imagePath);
	candidates.add(imagePath.replace(/^\.\/?/, "/"));

	const pathInsideAssets = imagePath.includes("/assets/")
		? imagePath.substring(imagePath.indexOf("/assets/"))
		: imagePath;
	candidates.add(pathInsideAssets);
	candidates.add(`/src${pathInsideAssets}`);
	candidates.add(`./src${pathInsideAssets}`);
	candidates.add(`src${pathInsideAssets}`);
	candidates.add(`.${pathInsideAssets}`);

	// Add normalized keys
	for (const k of keys) {
		const kNorm = k.replace(/^\.\//, "/");
		if (
			kNorm === imagePath.replace(/^\.\/?/, "/") ||
			kNorm.endsWith(pathInsideAssets) ||
			kNorm.endsWith(`/${basename}`) ||
			(basename && kNorm.includes(basename))
		) {
			candidates.add(k);
			candidates.add(kNorm);
		}
	}

	// Try each candidate
	for (const candidate of candidates) {
		if (candidate && typeof images[candidate] === "function") {
			try {
				const mod = await images[candidate]();
				const meta = (mod as { default?: ImageMetadata }).default;
				if (meta) {
					return meta;
				}
			} catch {
				// ignore import failures
			}
		}
	}

	return undefined;
};

const tryFullMetadataScan = async (
	images: Record<string, () => Promise<unknown>>,
	keys: string[],
	imagePath: string,
	basename: string | undefined,
): Promise<ImageMetadata | undefined> => {
	for (const k of keys) {
		try {
			const mod = await images[k]();
			const meta = (mod as { default?: ImageMetadata }).default;
			if (meta) {
				const candidateSrc = String(meta.src || "");
				if (
					candidateSrc === imagePath ||
					candidateSrc.endsWith(`/${basename}`) ||
					(basename && candidateSrc.includes(basename))
				) {
					return meta;
				}
			}
		} catch {
			// ignore
		}
	}
	return undefined;
};

// ============================================
// Main resolution strategies
// ============================================

const resolveSourcePath = async (
	imagePath: string,
	images: Record<string, () => Promise<unknown>>,
): Promise<ImageMetadata | null> => {
	const keys = Object.keys(images);

	// Try exact match first
	const exact = await tryExactMatch(images, imagePath);
	if (exact) return exact;

	// Try suffix match
	const pathInsideAssets = imagePath.includes("/assets/")
		? imagePath.substring(imagePath.indexOf("/assets/"))
		: imagePath;

	const suffix = await trySuffixMatch(images, keys, pathInsideAssets);
	if (suffix) return suffix;

	// Try basename match
	const basename = pathInsideAssets.split("/").pop();
	if (basename) {
		const baseMatch = await tryBasenameMatch(images, keys, basename);
		if (baseMatch) return baseMatch;
	}

	// Try candidate variants
	const candidates = await tryCandidateVariants(
		images,
		keys,
		imagePath,
		basename,
	);
	if (candidates) return candidates;

	// Full metadata scan as last resort
	const scanned = await tryFullMetadataScan(images, keys, imagePath, basename);
	if (scanned) return scanned;

	return null;
};

const resolveRootRelativePath = async (
	imagePath: string,
	images: Record<string, () => Promise<unknown>>,
): Promise<ImageMetadata | null> => {
	const keys = Object.keys(images);

	// Try exact match
	const exact = await tryExactMatch(images, imagePath);
	if (exact) return exact;

	// Try suffix match
	const suffix = await trySuffixMatch(images, keys, imagePath);
	if (suffix) return suffix;

	// Try basename match
	const basename = imagePath.split("/").pop();
	if (basename) {
		const baseMatch = await tryBasenameMatch(images, keys, basename);
		if (baseMatch) return baseMatch;
	}

	// Try candidate variants
	const candidates = await tryCandidateVariants(
		images,
		keys,
		imagePath,
		basename,
	);
	if (candidates) return candidates;

	return null;
};

const logResolutionFailure = (
	imagePath: string,
	keys: string[],
	candidates: Set<string>,
): void => {
	try {
		// eslint-disable-next-line no-console
		console.warn(
			"[findImage] failed to resolve",
			imagePath,
			"candidates:",
			Array.from(candidates).slice(0, 20),
		);
		// eslint-disable-next-line no-console
		console.warn("[findImage] available keys (sample):", keys.slice(0, 30));
	} catch {
		// noop
	}
};

// ============================================
// Main findImage function
// ============================================

/** */
export const findImage = async (
	imagePath?: string | ImageMetadata | null,
): Promise<string | ImageMetadata | undefined | null> => {
	// Not string
	if (typeof imagePath !== "string") {
		return imagePath;
	}

	// Absolute URLs
	if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
		return imagePath;
	}

	const images = await fetchLocalImages();

	// If the path points into the source tree (for example '/src/assets/...')
	if (imagePath.startsWith("/src/") && images) {
		const result = await resolveSourcePath(imagePath, images);
		if (result) return result;
		logResolutionFailure(
			imagePath,
			Object.keys(images),
			new Set(Object.keys(images)),
		);
		return null;
	}

	// Root-relative paths (for example '/me.webp' or '/assets/...')
	if (imagePath.startsWith("/") && images) {
		const result = await resolveRootRelativePath(imagePath, images);
		if (result) return result;
	}

	// Relative paths or not "~/assets/"
	if (!imagePath.startsWith("~/assets/images")) {
		return imagePath;
	}

	// Resolve ~/assets/images path
	if (images) {
		const key = imagePath.replace("~/", "/src/");
		if (typeof images[key] === "function") {
			const result = await images[key]();
			return (result as { default: ImageMetadata }).default;
		}
	}

	return null;
};

// ============================================
// OpenGraph image adaptation
// ============================================

const adaptSingleImage = async (
	image: { url?: string },
	defaultWidth: number,
	defaultHeight: number,
	astroSite?: URL | undefined,
): Promise<{ url: string; width?: number; height?: number }> => {
	if (!image?.url) {
		return { url: "" };
	}

	const resolvedImage = (await findImage(image.url)) as
		| ImageMetadata
		| string
		| undefined;

	if (!resolvedImage) {
		return { url: "" };
	}

	// Try Unpic optimization for remote images
	if (
		typeof resolvedImage === "string" &&
		(resolvedImage.startsWith("http://") ||
			resolvedImage.startsWith("https://")) &&
		isUnpicCompatible(resolvedImage)
	) {
		try {
			const optimized = await unpicOptimizer(
				resolvedImage,
				[defaultWidth],
				defaultWidth,
				defaultHeight,
				"jpg",
			);
			const _image = optimized[0];
			if (_image && "src" in _image && typeof _image.src === "string") {
				const urlStr = astroSite
					? String(new URL(_image.src, astroSite))
					: _image.src;
				return {
					url: urlStr,
					width: "width" in _image ? _image.width : undefined,
					height: "height" in _image ? _image.height : undefined,
				};
			}
		} catch {
			// continue to Astro assets optimizer path
		}
	}

	// Use Astro assets optimizer for local images
	const dimensions =
		typeof resolvedImage !== "string" &&
		resolvedImage &&
		resolvedImage.width <= defaultWidth
			? [resolvedImage.width, resolvedImage.height]
			: [defaultWidth, defaultHeight];

	try {
		const optimized = await astroAssetsOptimizer(
			resolvedImage,
			[dimensions[0]],
			dimensions[0],
			dimensions[1],
			"jpg",
		);

		const _image = optimized[0];
		if (_image && "src" in _image && typeof _image.src === "string") {
			const urlStr = astroSite
				? String(new URL(_image.src, astroSite))
				: _image.src;
			return {
				url: urlStr,
				width: "width" in _image ? _image.width : undefined,
				height: "height" in _image ? _image.height : undefined,
			};
		}
	} catch {
		// return empty result on error
	}

	return { url: "" };
};

/** */
export const adaptOpenGraphImages = async (
	openGraph: OpenGraph = {},
	astroSite?: URL | undefined,
): Promise<OpenGraph> => {
	if (!openGraph?.images?.length) {
		return openGraph;
	}

	const defaultWidth = 1200;
	const defaultHeight = 626;
	const site = astroSite;

	const adaptedImages = await Promise.all(
		openGraph.images.map((image) =>
			adaptSingleImage(image, defaultWidth, defaultHeight, site),
		),
	);

	return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) };
};
