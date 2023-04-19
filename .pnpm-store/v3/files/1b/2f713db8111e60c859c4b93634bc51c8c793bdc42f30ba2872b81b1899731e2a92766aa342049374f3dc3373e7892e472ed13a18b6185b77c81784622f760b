/// <reference types="astro/astro-jsx" />
/// <reference types="node" />
import { type NamedColor } from '../utils/colornames.js';
export type InputFormat = 'heic' | 'heif' | 'avif' | 'jpeg' | 'jpg' | 'png' | 'tiff' | 'webp' | 'gif' | 'svg';
export type OutputFormatSupportsAlpha = 'avif' | 'png' | 'webp';
export type OutputFormat = OutputFormatSupportsAlpha | 'jpeg' | 'jpg' | 'svg';
export type ColorDefinition = NamedColor | `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgb(${number},${number},${number})` | `rgba(${number}, ${number}, ${number}, ${number})` | `rgba(${number},${number},${number},${number})`;
export type CropFit = 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
export type CropPosition = 'top' | 'right top' | 'right' | 'right bottom' | 'bottom' | 'left bottom' | 'left' | 'left top' | 'north' | 'northeast' | 'east' | 'southeast' | 'south' | 'southwest' | 'west' | 'northwest' | 'center' | 'centre' | 'cover' | 'entropy' | 'attention';
export declare function isOutputFormat(value: string): value is OutputFormat;
export declare function isOutputFormatSupportsAlpha(value: string): value is OutputFormatSupportsAlpha;
export declare function isAspectRatioString(value: string): value is `${number}:${number}`;
export declare function isColor(value: string): value is ColorDefinition;
export declare function parseAspectRatio(aspectRatio: TransformOptions['aspectRatio']): number | undefined;
/**
 * Defines the original image and transforms that need to be applied to it.
 */
export interface TransformOptions {
    /**
     * Source for the original image file.
     *
     * For images in your project's repository, use the `src` relative to the `public` directory.
     * For remote images, provide the full URL.
     */
    src: string;
    /**
     * The alt tag of the image. This is used for accessibility and will be made required in a future version.
     * Empty string is allowed.
     */
    alt?: string;
    /**
     * The output format to be used in the optimized image.
     *
     * @default undefined The original image format will be used.
     */
    format?: OutputFormat | undefined;
    /**
     * The compression quality used during optimization.
     *
     * @default undefined Allows the image service to determine defaults.
     */
    quality?: number | undefined;
    /**
     * The desired width of the output image. Combine with `height` to crop the image
     * to an exact size, or `aspectRatio` to automatically calculate and crop the height.
     */
    width?: number | undefined;
    /**
     * The desired height of the output image. Combine with `height` to crop the image
     * to an exact size, or `aspectRatio` to automatically calculate and crop the width.
     */
    height?: number | undefined;
    /**
     * The desired aspect ratio of the output image. Combine with either `width` or `height`
     * to automatically calculate and crop the other dimension.
     *
     * @example 1.777 - numbers can be used for computed ratios, useful for doing `{width/height}`
     * @example "16:9" - strings can be used in the format of `{ratioWidth}:{ratioHeight}`.
     */
    aspectRatio?: number | `${number}:${number}` | undefined;
    /**
     * The background color to use when converting from a transparent image format to a
     * non-transparent format. This is useful for converting PNGs to JPEGs.
     *
     * @example "white" - a named color
     * @example "#ffffff" - a hex color
     * @example "rgb(255, 255, 255)" - an rgb color
     */
    background?: ColorDefinition | undefined;
    /**
     * How the image should be resized to fit both `height` and `width`.
     *
     * @default 'cover'
     */
    fit?: CropFit | undefined;
    /**
     * Position of the crop when fit is `cover` or `contain`.
     *
     * @default 'centre'
     */
    position?: CropPosition | undefined;
}
export interface HostedImageService<T extends TransformOptions = TransformOptions> {
    /**
     * Gets the HTML attributes needed for the server rendered `<img />` element.
     */
    getImageAttributes(transform: T): Promise<astroHTML.JSX.ImgHTMLAttributes>;
}
export interface SSRImageService<T extends TransformOptions = TransformOptions> extends HostedImageService<T> {
    /**
     * Gets the HTML attributes needed for the server rendered `<img />` element.
     */
    getImageAttributes(transform: T): Promise<Exclude<astroHTML.JSX.ImgHTMLAttributes, 'src'>>;
    /**
     * Serializes image transformation properties to URLSearchParams, used to build
     * the final `src` that points to the self-hosted SSR endpoint.
     *
     * @param transform @type {TransformOptions} defining the requested image transformation.
     */
    serializeTransform(transform: T): {
        searchParams: URLSearchParams;
    };
    /**
     * The reverse of `serializeTransform(transform)`, this parsed the @type {TransformOptions} back out of a given URL.
     *
     * @param searchParams @type {URLSearchParams}
     * @returns @type {TransformOptions} used to generate the URL, or undefined if the URL isn't valid.
     */
    parseTransform(searchParams: URLSearchParams): T | undefined;
    /**
     * Performs the image transformations on the input image and returns both the binary data and
     * final image format of the optimized image.
     *
     * @param inputBuffer Binary buffer containing the original image.
     * @param transform @type {TransformOptions} defining the requested transformations.
     */
    transform(inputBuffer: Buffer, transform: T): Promise<{
        data: Buffer;
        format: OutputFormat;
    }>;
}
export type ImageService<T extends TransformOptions = TransformOptions> = HostedImageService<T> | SSRImageService<T>;
export declare function isHostedService(service: ImageService): service is ImageService;
export declare function isSSRService(service: ImageService): service is SSRImageService;
export declare abstract class BaseSSRService implements SSRImageService {
    getImageAttributes(transform: TransformOptions): Promise<{
        width: number | undefined;
        height: number | undefined;
        /**
         * The alt tag of the image. This is used for accessibility and will be made required in a future version.
         * Empty string is allowed.
         */
        alt?: string | undefined;
        /**
         * The background color to use when converting from a transparent image format to a
         * non-transparent format. This is useful for converting PNGs to JPEGs.
         *
         * @example "white" - a named color
         * @example "#ffffff" - a hex color
         * @example "rgb(255, 255, 255)" - an rgb color
         */
        background?: ColorDefinition | undefined;
        /**
         * How the image should be resized to fit both `height` and `width`.
         *
         * @default 'cover'
         */
        fit?: CropFit | undefined;
        /**
         * Position of the crop when fit is `cover` or `contain`.
         *
         * @default 'centre'
         */
        position?: CropPosition | undefined;
    }>;
    serializeTransform(transform: TransformOptions): {
        searchParams: URLSearchParams;
    };
    parseTransform(searchParams: URLSearchParams): TransformOptions | undefined;
    abstract transform(inputBuffer: Buffer, transform: TransformOptions): Promise<{
        data: Buffer;
        format: OutputFormat;
    }>;
}
