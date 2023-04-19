/// <reference types="astro/astro-jsx" />
import type { TransformOptions } from '../loaders/index.js';
import type { ImageMetadata } from '../vite-plugin-astro-image.js';
export interface GetImageTransform extends Omit<TransformOptions, 'src'> {
    src: string | ImageMetadata | Promise<{
        default: ImageMetadata;
    }>;
    alt: string;
}
/**
 * Gets the HTML attributes required to build an `<img />` for the transformed image.
 *
 * @param transform @type {TransformOptions} The transformations requested for the optimized image.
 * @returns @type {ImageAttributes} The HTML attributes to be included on the built `<img />` element.
 */
export declare function getImage(transform: GetImageTransform): Promise<astroHTML.JSX.ImgHTMLAttributes>;
