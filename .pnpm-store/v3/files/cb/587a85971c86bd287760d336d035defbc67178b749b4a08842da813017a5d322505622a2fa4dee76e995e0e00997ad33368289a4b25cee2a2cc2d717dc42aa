/// <reference types="astro/astro-jsx" />
import { type OutputFormat, type TransformOptions } from '../loaders/index.js';
import type { ImageMetadata } from '../vite-plugin-astro-image.js';
export interface GetPictureParams {
    src: string | ImageMetadata | Promise<{
        default: ImageMetadata;
    }>;
    alt: string;
    widths: number[];
    formats: OutputFormat[];
    aspectRatio?: TransformOptions['aspectRatio'];
    fit?: TransformOptions['fit'];
    background?: TransformOptions['background'];
    position?: TransformOptions['position'];
}
export interface GetPictureResult {
    image: astroHTML.JSX.ImgHTMLAttributes;
    sources: {
        type: string;
        srcset: string;
    }[];
}
export declare function getPicture(params: GetPictureParams): Promise<GetPictureResult>;
