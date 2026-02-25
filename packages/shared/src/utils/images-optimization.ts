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

type Nullable<T> = T | null | undefined;
type ImageSource = string | ImageMetadata;
type DimensionInput = string | number;
type OptionalImageDimension = Nullable<DimensionInput>;

export type ImageProps = Omit<HTMLAttributes<"img">, "src"> & {
	src?: Nullable<ImageSource>;
	width?: OptionalImageDimension;
	height?: OptionalImageDimension;
	alt?: Nullable<string>;
	loading?: Nullable<"eager" | "lazy">;
	decoding?: Nullable<"sync" | "async" | "auto">;
	style?: string;
	srcset?: Nullable<string>;
	sizes?: Nullable<string>;
	fetchpriority?: Nullable<"high" | "low" | "auto">;
	layout?: Layout;
	widths?: Nullable<number[]>;
	aspectRatio?: Nullable<string | number>;
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

const getRatioSeparatorIndex = (value: string): number => {
	const separators = [value.indexOf(":"), value.indexOf("/")].filter(
		(index) => index >= 0,
	);

	if (separators.length === 0) {
		return -1;
	}

	return Math.min(...separators);
};

const parseRatioValue = (value: string): number | undefined => {
	const parsed = Number(value);
	return parsed > 0 && Number.isFinite(parsed) ? parsed : undefined;
};

const parseRatioFromDelimitedString = (value: string): number | undefined => {
	const separatorIndex = getRatioSeparatorIndex(value);
	if (separatorIndex === -1) {
		return undefined;
	}

	const left = value.slice(0, separatorIndex).trim();
	const right = value.slice(separatorIndex + 1).trim();
	const numerator = parseRatioValue(left);
	const denominator = parseRatioValue(right);

	if (
		numerator === undefined ||
		denominator === undefined ||
		denominator === 0
	) {
		return undefined;
	}

	return numerator / denominator;
};

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
	if (typeof aspectRatio === "number") {
		return Number.isFinite(aspectRatio) ? aspectRatio : undefined;
	}

	if (typeof aspectRatio === "string") {
		const s = aspectRatio.trim();
		if (s.length === 0) {
			return undefined;
		}

		const ratioSeparatorIndex = getRatioSeparatorIndex(s);
		if (ratioSeparatorIndex !== -1) {
			return parseRatioFromDelimitedString(s);
		}

		const numericValue = Number.parseFloat(s);
		if (Number.isFinite(numericValue)) {
			return numericValue;
		}
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

const isBackgroundImageUrl = (background: string | undefined): boolean => {
	return (
		background?.startsWith("https:") === true ||
		background?.startsWith("http:") === true ||
		background?.startsWith("data:") === true
	);
};

const getBackgroundStyleEntries = (
	background: string | undefined,
): Array<[prop: string, value: OptionalStyleValue]> => {
	if (isBackgroundImageUrl(background)) {
		return [
			["background-image", `url(${background})`],
			["background-size", "cover"],
			["background-repeat", "no-repeat"],
		];
	}

	return [["background", background]];
};

const getLayoutStyleEntries = ({
	layout,
	width,
	height,
	aspectRatio,
	objectFit,
	objectPosition,
}: {
	layout: Layout | undefined;
	width: number | undefined;
	height: number | undefined;
	aspectRatio: string | undefined;
	objectFit?: string;
	objectPosition?: string;
}): Array<[prop: string, value: OptionalStyleValue]> => {
	if (layout === undefined) {
		return [];
	}

	switch (layout) {
		case "fixed": {
			const entries: Array<[prop: string, value: OptionalStyleValue]> = [
				["width", pixelate(width)],
				["height", pixelate(height)],
			];
			if (objectPosition === undefined) {
				entries.push(["object-position", "top left"]);
			}
			return entries;
		}
		case "constrained":
			return [
				["max-width", pixelate(width)],
				["max-height", pixelate(height)],
				["aspect-ratio", aspectRatio],
				["width", "100%"],
			];
		case "fullWidth":
			return [
				["width", "100%"],
				["aspect-ratio", aspectRatio],
				["height", pixelate(height)],
			];
		case "responsive":
			return [
				["width", "100%"],
				["height", "auto"],
				["aspect-ratio", aspectRatio],
			];
		case "contained": {
			const entries: Array<[prop: string, value: OptionalStyleValue]> = [
				["max-width", "100%"],
				["max-height", "100%"],
				["aspect-ratio", aspectRatio],
			];
			if (objectFit === undefined) {
				entries.push(["object-fit", "contain"]);
			}
			return entries;
		}
		case "cover":
			return [
				["max-width", "100%"],
				["max-height", "100%"],
			];
	}
};

const getStyle = ({
	width,
	height,
	aspectRatio,
	layout,
	objectFit,
	objectPosition,
	background,
}: {
	width?: number;
	height?: number;
	aspectRatio?: number;
	objectFit?: string;
	objectPosition?: string;
	layout?: Layout;
	background?: string;
}) => {
	const aspectRatioValue = aspectRatio ? `${aspectRatio}` : undefined;
	const baseStyleEntries: Array<[prop: string, value: OptionalStyleValue]> = [
		["object-fit", objectFit ?? "cover"],
		["object-position", objectPosition ?? "center"],
	];
	const styleEntries: Array<[prop: string, value: OptionalStyleValue]> = [
		...baseStyleEntries,
		...getBackgroundStyleEntries(background),
		...getLayoutStyleEntries({
			layout,
			width,
			height,
			aspectRatio: aspectRatioValue,
			objectFit,
			objectPosition,
		}),
	];

	const styles = Object.fromEntries(
		styleEntries.filter(([, value]) => value !== undefined),
	);

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
	image: ImageSource,
	width: OptionalImageDimension,
	height: OptionalImageDimension,
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

const logMissingAspectRatioInputs = (
	image: ImageSource,
	message: string,
): void => {
	console.error(message);
	const id = typeof image === "string" ? image : image.src || "unknown";
	const type = typeof image !== "string" ? ` (type: ${typeof image})` : "";
	console.error(`Image: ${id}${type}`);
};

const resolveDimensionsFromAspectRatio = ({
	image,
	layout,
	aspectRatio,
	width,
	height,
}: {
	image: ImageSource;
	layout: Layout;
	aspectRatio: number;
	width: number | undefined;
	height: number | undefined;
}): { width: number | undefined; height: number | undefined } => {
	if (width !== undefined && height === undefined) {
		return { width, height: Math.floor(width / aspectRatio) };
	}

	if (width === undefined && height !== undefined) {
		return { width: Math.floor(height * aspectRatio), height };
	}

	if (width === undefined && height === undefined && layout !== "fullWidth") {
		logMissingAspectRatioInputs(
			image,
			"When aspectRatio is set, either width or height must also be set",
		);
	}

	return { width, height };
};

const resolveAspectRatioAndDimensions = (
	image: ImageSource,
	layout: Layout,
	aspectRatio: AspectRatioInput,
	width: number | undefined,
	height: number | undefined,
): {
	aspectRatio: number | undefined;
	width: number | undefined;
	height: number | undefined;
} => {
	const resolvedAspectRatio = parseAspectRatio(aspectRatio);
	if (resolvedAspectRatio !== undefined) {
		const resolvedDimensions = resolveDimensionsFromAspectRatio({
			image,
			layout,
			aspectRatio: resolvedAspectRatio,
			width,
			height,
		});

		return {
			aspectRatio: resolvedAspectRatio,
			width: resolvedDimensions.width,
			height: resolvedDimensions.height,
		};
	}

	if (
		width !== undefined &&
		height !== undefined &&
		width > 0 &&
		height > 0 &&
		Number.isFinite(width) &&
		Number.isFinite(height)
	) {
		return {
			aspectRatio: width / height,
			width,
			height,
		};
	}

	if (layout !== "fullWidth") {
		logMissingAspectRatioInputs(
			image,
			"Either aspectRatio or both width and height must be set",
		);
	}

	return {
		aspectRatio: undefined,
		width,
		height,
	};
};

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
