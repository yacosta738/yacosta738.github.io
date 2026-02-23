// Compatibility wrapper: re-export the utilities from the canonical location
// to preserve legacy import paths like `@/lib/images`.
export * from "@/utils/images";

import type { ImageMetadata } from "astro";

const load = async () => {
	let images: Record<string, () => Promise<unknown>> | undefined;
	try {
		images = import.meta.glob(
			"~/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}",
		);
	} catch {
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

	// Absolute paths
	if (
		imagePath.startsWith("http://") ||
		imagePath.startsWith("https://") ||
		imagePath.startsWith("/")
	) {
		return imagePath;
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
