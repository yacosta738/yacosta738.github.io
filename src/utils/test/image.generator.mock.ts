import type { ImageMetadata } from "astro";

/**
 * Mock image generator for testing purposes
 * This utility creates mock ImageMetadata objects for tests
 */

/**
 * Generates a mock image metadata object for testing
 * @param {Object} options - Configuration options for the mock image
 * @param {string} [options.src] - Image source URL
 * @param {number} [options.width] - Image width in pixels
 * @param {number} [options.height] - Image height in pixels
 * @param {string} [options.format] - Image format (webp, jpeg, png, etc.)
 * @returns {ImageMetadata} A mock ImageMetadata object
 */
export function generateMockImage({
	src = "https://picsum.photos/900",
	width = 900,
	height = 600,
	format = "webp",
}: {
	src?: string;
	width?: number;
	height?: number;
	format?: string;
} = {}): ImageMetadata {
	return {
		src,
		width,
		height,
		format,
	} as ImageMetadata;
}

/**
 * Generates an array of mock image metadata objects
 * @param {number} count - Number of mock images to generate
 * @param {Object} options - Default options for all generated images
 * @returns {ImageMetadata[]} Array of mock ImageMetadata objects
 */
export function generateMockImageArray(
	count: number,
	options: {
		src?: string;
		width?: number;
		height?: number;
		format?: string;
	} = {},
): ImageMetadata[] {
	return Array(count)
		.fill(null)
		.map(() => generateMockImage(options));
}
