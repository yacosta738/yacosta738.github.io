import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { HTMLAttributes } from "astro/types";
import { parseUrl, transformUrl } from "unpic";

type Layout =
	| "fixed"
	| "constrained"
	| "fullWidth"
	| "cover"
	| "responsive"
	| "contained";

export type ImageProps = Omit<HTMLAttributes<"img">, "src"> & {
	src?: string | ImageMetadata | null;
	width?: string | number | null;
	height?: string | number | null;
	alt?: string | null;
	loading?: "eager" | "lazy" | null;
	decoding?: "sync" | "async" | "auto" | null;
	style?: string;
	srcset?: string | null;
	sizes?: string | null;
	fetchpriority?: "high" | "low" | "auto" | null;
	layout?: Layout;
	widths?: number[] | null;
	aspectRatio?: string | number | null;
	objectPosition?: string;
	format?: string;
};

export type ImagesOptimizer = (
	image: ImageMetadata | string,
	breakpoints: number[],
	width?: number,
	height?: number,
	format?: string,
) => Promise<Array<{ src: string; width: number }>>;

type AspectRatioInput = number | string | null | undefined;
type OptionalStyleValue = string | undefined;

/* ******* */
const config = {
	// Reserved for future responsive tuning when source image is very small.
	imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

	deviceSizes: [
		640, // older and lower-end phones
		750, // iPhone 6-8
		828, // iPhone XR/11
		960, // older horizontal phones
		1080, // iPhone 6-8 Plus
		1280, // 720p
		1668, // Various iPads
		1920, // 1080p
		2048, // QXGA
		2560, // WQXGA
		3200, // QHD+
		3840, // 4K
		4480, // 4.5K
		5120, // 5K
		6016, // 6K
	],

	formats: ["image/webp"],
};

const computeHeight = (width: number, aspectRatio: number) => {
	return Math.floor(width / aspectRatio);
};

export const parseAspectRatio = (
	aspectRatio: AspectRatioInput,
): number | undefined => {
	if (typeof aspectRatio === "number") return aspectRatio;

	if (typeof aspectRatio === "string") {
		const s = aspectRatio.trim();
		if (s.length === 0) return undefined;

		const separators = [s.indexOf(":"), s.indexOf("/")].filter(
			(index) => index >= 0,
		);
		const sepIndex = separators.length > 0 ? Math.min(...separators) : -1;
		if (sepIndex !== -1) {
			const left = s.slice(0, sepIndex).trim();
			const right = s.slice(sepIndex + 1).trim();
			const num = Number(left);
			const den = Number(right);
			if (!Number.isNaN(num) && !Number.isNaN(den) && den !== 0)
				return num / den;
		}

		const numericValue = Number.parseFloat(s);
		if (!Number.isNaN(numericValue)) return numericValue;
	}

	return undefined;
};

/**
 * Gets the `sizes` attribute for an image, based on the layout and width
 */
export const getSizes = (
	width?: number,
	layout?: Layout,
): string | undefined => {
	if (!width || !layout) {
		return undefined;
	}
	switch (layout) {
		// If screen is wider than the max size, image width is the max size,
		// otherwise it's the width of the screen
		case "constrained":
			return `(min-width: ${width}px) ${width}px, 100vw`;

		// Image is always the same width, whatever the size of the screen
		case "fixed":
			return `${width}px`;

		// Image is always the width of the screen
		case "fullWidth":
			return "100vw";

		default:
			return undefined;
	}
};

const pixelate = (value?: number) =>
	value || value === 0 ? `${value}px` : undefined;

const getStyle = ({
	width,
	height,
	aspectRatio,
	layout,
	objectFit = "cover",
	objectPosition = "center",
	background,
}: {
	width?: number;
	height?: number;
	aspectRatio?: number;
	objectFit?: string;
	objectPosition?: string;
	layout?: string;
	background?: string;
}) => {
	const aspectRatioValue = aspectRatio ? `${aspectRatio}` : undefined;
	const styleEntries: Array<[prop: string, value: OptionalStyleValue]> = [
		["object-fit", objectFit],
		["object-position", objectPosition],
	];

	// If background is a URL, set it to cover the image and not repeat
	if (
		background?.startsWith("https:") ||
		background?.startsWith("http:") ||
		background?.startsWith("data:")
	) {
		styleEntries.push(
			["background-image", `url(${background})`],
			["background-size", "cover"],
			["background-repeat", "no-repeat"],
		);
	} else {
		styleEntries.push(["background", background]);
	}
	if (layout === "fixed") {
		styleEntries.push(
			["width", pixelate(width)],
			["height", pixelate(height)],
			["object-position", "top left"],
		);
	}
	if (layout === "constrained") {
		styleEntries.push(
			["max-width", pixelate(width)],
			["max-height", pixelate(height)],
			["aspect-ratio", aspectRatioValue],
			["width", "100%"],
		);
	}
	if (layout === "fullWidth") {
		styleEntries.push(
			["width", "100%"],
			["aspect-ratio", aspectRatioValue],
			["height", pixelate(height)],
		);
	}
	if (layout === "responsive") {
		styleEntries.push(
			["width", "100%"],
			["height", "auto"],
			["aspect-ratio", aspectRatioValue],
		);
	}
	if (layout === "contained") {
		styleEntries.push(
			["max-width", "100%"],
			["max-height", "100%"],
			["object-fit", "contain"],
			["aspect-ratio", aspectRatioValue],
		);
	}
	if (layout === "cover") {
		styleEntries.push(["max-width", "100%"], ["max-height", "100%"]);
	}

	const styles = Object.fromEntries(styleEntries.filter(([, value]) => value));

	return Object.entries(styles)
		.map(([key, value]) => `${key}: ${value};`)
		.join(" ");
};

const getBreakpoints = ({
	width,
	breakpoints,
	layout,
}: {
	width?: number;
	breakpoints?: number[];
	layout: Layout;
}): number[] => {
	if (
		layout === "fullWidth" ||
		layout === "cover" ||
		layout === "responsive" ||
		layout === "contained"
	) {
		return breakpoints || config.deviceSizes;
	}
	if (!width) {
		return [];
	}
	const doubleWidth = width * 2;
	if (layout === "fixed") {
		return [width, doubleWidth];
	}
	if (layout === "constrained") {
		return [
			// Always include the image at 1x and 2x the specified width
			width,
			doubleWidth,
			// Filter out any resolutions that are larger than the double-res image
			...(breakpoints || config.deviceSizes).filter((w) => w < doubleWidth),
		];
	}

	return [];
};

/* ** */
export const astroAssetsOptimizer: ImagesOptimizer = async (
	image,
	breakpoints,
	_width,
	_height,
	format = undefined,
) => {
	if (!image) {
		return [];
	}

	return Promise.all(
		breakpoints.map(async (w: number) => {
			const result = await getImage({
				src: image,
				width: w,
				inferSize: true,
				...(format ? { format: format } : {}),
			});

			return {
				src: result?.src,
				width: result?.attributes?.width ?? w,
				height: result?.attributes?.height,
			};
		}),
	);
};

export const isUnpicCompatible = (image: string) => {
	return parseUrl(image) !== undefined;
};

const toNumberOrUndefined = (
	value: string | number | null | undefined,
): number | undefined => {
	if (value === null || value === undefined || value === "") {
		return undefined;
	}

	const numeric = Number(value);
	return Number.isFinite(numeric) ? numeric : undefined;
};

const resolveBaseDimensions = (
	image: ImageMetadata | string,
	width: string | number | null | undefined,
	height: string | number | null | undefined,
): { width: number | undefined; height: number | undefined } => {
	let resolvedWidth = toNumberOrUndefined(width);
	let resolvedHeight = toNumberOrUndefined(height);

	if (typeof image !== "string") {
		resolvedWidth ??= Number(image.width) || undefined;
		if (resolvedHeight === undefined && typeof resolvedWidth === "number") {
			resolvedHeight = computeHeight(resolvedWidth, image.width / image.height);
		}
	}

	return { width: resolvedWidth, height: resolvedHeight };
};

const resolveAspectRatioAndDimensions = (
	image: ImageMetadata | string,
	layout: Layout,
	aspectRatio: AspectRatioInput,
	width: number | undefined,
	height: number | undefined,
): {
	aspectRatio: number | undefined;
	width: number | undefined;
	height: number | undefined;
} => {
	let resolvedAspectRatio = parseAspectRatio(aspectRatio);
	let resolvedWidth = width;
	let resolvedHeight = height;

	if (resolvedAspectRatio) {
		if (resolvedWidth && !resolvedHeight) {
			resolvedHeight = resolvedWidth / resolvedAspectRatio;
		} else if (!resolvedWidth && resolvedHeight) {
			resolvedWidth = Number(resolvedHeight * resolvedAspectRatio);
		} else if (!resolvedWidth && !resolvedHeight && layout !== "fullWidth") {
			console.error(
				"When aspectRatio is set, either width or height must also be set",
			);
			console.error("Image", image);
		}

		return {
			aspectRatio: resolvedAspectRatio,
			width: resolvedWidth,
			height: resolvedHeight,
		};
	}

	if (resolvedWidth && resolvedHeight) {
		resolvedAspectRatio = resolvedWidth / resolvedHeight;
	} else if (layout !== "fullWidth") {
		console.error("Either aspectRatio or both width and height must be set");
		console.error("Image", image);
	}

	return {
		aspectRatio: resolvedAspectRatio,
		width: resolvedWidth,
		height: resolvedHeight,
	};
};

/* ** */
export const unpicOptimizer: ImagesOptimizer = async (
	image,
	breakpoints,
	width,
	height,
	format = undefined,
) => {
	if (!image || typeof image !== "string") {
		return [];
	}

	const urlParsed = parseUrl(image);
	if (!urlParsed) {
		return [];
	}

	return Promise.all(
		breakpoints.map(async (w: number) => {
			const _height =
				width && height ? computeHeight(w, width / height) : height;
			const url =
				transformUrl({
					url: image,
					width: w,
					height: _height,
					cdn: urlParsed.cdn,
					...(format ? { format: format } : {}),
				}) || image;
			return {
				src: String(url),
				width: w,
				height: _height,
			};
		}),
	);
};

/* ** */
export async function getImagesOptimized(
	image: ImageMetadata | string,
	{
		src: _,
		width,
		height,
		sizes,
		aspectRatio,
		objectPosition,
		widths,
		layout = "constrained",
		style = "",
		format,
		...rest
	}: ImageProps,
	transform: ImagesOptimizer = () => Promise.resolve([]),
): Promise<{ src: string; attributes: HTMLAttributes<"img"> }> {
	const baseDimensions = resolveBaseDimensions(image, width, height);
	const resolvedDimensions = resolveAspectRatioAndDimensions(
		image,
		layout,
		aspectRatio,
		baseDimensions.width,
		baseDimensions.height,
	);

	const resolvedWidths = widths ?? config.deviceSizes;
	const resolvedSizes = sizes ?? getSizes(resolvedDimensions.width, layout);

	let breakpoints = getBreakpoints({
		width: resolvedDimensions.width,
		breakpoints: resolvedWidths,
		layout,
	});
	breakpoints = [...new Set(breakpoints)].sort((a, b) => a - b);

	const srcset = (
		await transform(
			image,
			breakpoints,
			resolvedDimensions.width,
			resolvedDimensions.height,
			format,
		)
	)
		.map(({ src, width }) => `${src} ${width}w`)
		.join(", ");

	return {
		src: typeof image === "string" ? image : image.src,
		attributes: {
			width: resolvedDimensions.width,
			height: resolvedDimensions.height,
			srcset: srcset || undefined,
			sizes: resolvedSizes,
			style: `${getStyle({
				width: resolvedDimensions.width,
				height: resolvedDimensions.height,
				aspectRatio: resolvedDimensions.aspectRatio,
				objectPosition,
				layout,
			})}${style ?? ""}`,
			...rest,
		},
	};
}
