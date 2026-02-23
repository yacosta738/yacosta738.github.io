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

	// If the path points into the source tree (for example '/src/assets/...'),
	// try to resolve it via the local images map. This covers consumers that
	// store absolute source paths in JSON (e.g. `/src/assets/images/me.webp`).
	if (imagePath.startsWith("/src/")) {
		const images = await fetchLocalImages();
		if (images) {
			if (typeof images[imagePath] === "function") {
				return ((await images[imagePath]()) as { default: ImageMetadata })
					.default;
			}

			// Fallback: try to find a glob key that ends with the same path
			// inside the assets folder, or that matches the basename. This
			// handles cases where import.meta.glob returns slightly different
			// keys (for example with a leading './' or other normalization).
			const pathInsideAssets = imagePath.includes("/assets/")
				? imagePath.substring(imagePath.indexOf("/assets/"))
				: imagePath;

			const keys = Object.keys(images);
			const suffixMatch = keys.find((k) => k.endsWith(pathInsideAssets));
			if (suffixMatch && typeof images[suffixMatch] === "function") {
				return ((await images[suffixMatch]()) as { default: ImageMetadata })
					.default;
			}

			// Last resort: match by basename (e.g. 'me.webp')
			const basename = pathInsideAssets.split("/").pop();
			if (basename) {
				const baseMatch = keys.find(
					(k) => k.endsWith(`/${basename}`) || k.endsWith(basename),
				);
				if (baseMatch && typeof images[baseMatch] === "function") {
					return ((await images[baseMatch]()) as { default: ImageMetadata })
						.default;
				}
			}
			// Final aggressive fallback: import candidates and inspect their
			// ImageMetadata (some build setups normalize keys differently). This
			// attempts to find a module whose metadata references the same
			// filename or whose original src contains the requested path.
			// Try a few normalized key variants before importing everything.
			const normalizedImagePath = imagePath.replace(/^\.\/?/, "/");
			const candidates = new Set<string>();

			// exact provided path
			candidates.add(imagePath);
			candidates.add(normalizedImagePath);

			// path inside assets (/assets/...) and with/without leading src/ or ./
			candidates.add(pathInsideAssets);
			candidates.add(`/src${pathInsideAssets}`);
			candidates.add(`./src${pathInsideAssets}`);
			candidates.add(`src${pathInsideAssets}`);
			candidates.add(`.${pathInsideAssets}`);

			// also try variants with and without leading './'
			for (const k of keys) {
				const kNorm = k.replace(/^\.\//, "/");
				if (
					kNorm === normalizedImagePath ||
					kNorm.endsWith(pathInsideAssets) ||
					kNorm.endsWith(`/${basename}`) ||
					kNorm.includes(basename || "")
				) {
					candidates.add(k);
					candidates.add(kNorm);
				}
			}

			for (const candidate of candidates) {
				if (candidate && typeof images[candidate] === "function") {
					try {
						const mod = await images[candidate]();
						const meta = (mod as { default?: ImageMetadata }).default;
						if (meta) {
							return meta;
						}
					} catch {
						// ignore import failures and continue
					}
				}
			}

			// As a last resort, import each module and inspect metadata to find a match
			for (const k of keys) {
				try {
					const mod = await images[k]();
					const meta = (mod as { default?: ImageMetadata }).default;
					if (meta) {
						const candidateSrc = String(meta.src || "");
						// Check for an exact match or filename match inside the resolved src
						if (
							candidateSrc === imagePath ||
							candidateSrc.endsWith(`/${basename}`) ||
							candidateSrc.includes(basename || "")
						) {
							return meta;
						}
					}
				} catch {
					// ignore occasional import failures and continue searching
				}
			}
			// If we reached here, resolution failed. Log a small debug snapshot so
			// we can inspect the glob keys and candidate variants during the build.
			try {
				// eslint-disable-next-line no-console
				console.warn(
					"[findImage] failed to resolve",
					imagePath,
					"candidates:",
					Array.from(candidates).slice(0, 20),
				);
				// eslint-disable-next-line no-console
				console.warn(
					"[findImage] available keys (sample):",
					Object.keys(images).slice(0, 30),
				);
			} catch (_e) {
				// noop
			}
		}

		return null;
	}

	// Try to resolve root-relative paths (for example '/me.webp' or '/assets/...')
	// Many content files store short absolute paths (starting with '/') that
	// actually point into `src/assets/images`. Try to find a matching image
	// module by suffix or basename so these still resolve to ImageMetadata.
	if (imagePath.startsWith("/")) {
		const images = await fetchLocalImages();
		if (images) {
			const keys = Object.keys(images);

			// If any key exactly matches the provided path, import it.
			if (typeof images[imagePath] === "function") {
				return ((await images[imagePath]()) as { default: ImageMetadata })
					.default;
			}

			// Try suffix match (keys that end with the path) and basename matches
			const suffixMatch = keys.find((k) => k.endsWith(imagePath));
			if (suffixMatch && typeof images[suffixMatch] === "function") {
				return ((await images[suffixMatch]()) as { default: ImageMetadata })
					.default;
			}

			const basename = imagePath.split("/").pop();
			if (basename) {
				const baseMatch = keys.find(
					(k) => k.endsWith(`/${basename}`) || k.endsWith(basename),
				);
				if (baseMatch && typeof images[baseMatch] === "function") {
					return ((await images[baseMatch]()) as { default: ImageMetadata })
						.default;
				}
			}

			// Try a few candidate variants before falling back to importing all
			const candidates = new Set<string>();
			candidates.add(imagePath);
			candidates.add(`/src${imagePath}`);
			candidates.add(`/assets${imagePath}`);
			candidates.add(`./src${imagePath}`);
			candidates.add(`./assets${imagePath}`);

			for (const k of keys) {
				const kNorm = k.replace(/^\.\//, "/");
				if (
					kNorm.endsWith(imagePath) ||
					(basename &&
						(kNorm.endsWith(`/${basename}`) || kNorm.includes(basename)))
				) {
					candidates.add(k);
					candidates.add(kNorm);
				}
			}

			for (const candidate of candidates) {
				if (candidate && typeof images[candidate] === "function") {
					try {
						const mod = await images[candidate]();
						const meta = (mod as { default?: ImageMetadata }).default;
						if (meta) {
							return meta;
						}
					} catch {
						// ignore import failures and continue
					}
				}
			}
		}
		// not resolved here -> fall through to the regular checks below
	}

	// Relative paths or not "~/assets/"
	if (!imagePath.startsWith("~/assets/images")) {
		return imagePath;
	}

	const images = await fetchLocalImages();
	const key = imagePath.replace("~/", "/src/");

	return images && typeof images[key] === "function"
		? ((await images[key]()) as { default: ImageMetadata }).default
		: null;
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
		images.map(async (image) => {
			if (image?.url) {
				const resolvedImage = (await findImage(image.url)) as
					| ImageMetadata
					| string
					| undefined;
				if (!resolvedImage) {
					return {
						url: "",
					};
				}

				let _image: { src: string; width: number } | undefined;

				if (
					typeof resolvedImage === "string" &&
					(resolvedImage.startsWith("http://") ||
						resolvedImage.startsWith("https://")) &&
					isUnpicCompatible(resolvedImage)
				) {
					_image = (
						await unpicOptimizer(
							resolvedImage,
							[defaultWidth],
							defaultWidth,
							defaultHeight,
							"jpg",
						)
					)[0];
				} else if (resolvedImage) {
					const dimensions =
						typeof resolvedImage !== "string" &&
						resolvedImage?.width <= defaultWidth
							? [resolvedImage?.width, resolvedImage?.height]
							: [defaultWidth, defaultHeight];
					_image = (
						await astroAssetsOptimizer(
							resolvedImage,
							[dimensions[0]],
							dimensions[0],
							dimensions[1],
							"jpg",
						)
					)[0];
				}

				if (typeof _image === "object") {
					return {
						url:
							"src" in _image && typeof _image.src === "string"
								? String(new URL(_image.src, astroSite))
								: "",
						width:
							"width" in _image && typeof _image.width === "number"
								? _image.width
								: undefined,
						height:
							"height" in _image && typeof _image.height === "number"
								? _image.height
								: undefined,
					};
				}
				return {
					url: "",
				};
			}

			return {
				url: "",
			};
		}),
	);

	return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) };
};
