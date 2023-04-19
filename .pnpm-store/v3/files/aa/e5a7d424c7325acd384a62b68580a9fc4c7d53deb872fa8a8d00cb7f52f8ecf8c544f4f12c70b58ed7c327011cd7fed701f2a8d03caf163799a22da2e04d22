import type { AstroIntegration } from 'astro';
import type { ImageService, SSRImageService, TransformOptions } from './loaders/index.js';
import type { LoggerLevel } from './utils/logger.js';
export { getImage } from './lib/get-image.js';
export { getPicture } from './lib/get-picture.js';
interface ImageIntegration {
    loader?: ImageService;
    defaultLoader: SSRImageService;
    addStaticImage?: (transform: TransformOptions) => string;
}
declare global {
    var astroImage: ImageIntegration;
}
export interface IntegrationOptions {
    /**
     * Entry point for the @type {HostedImageService} or @type {LocalImageService} to be used.
     */
    serviceEntryPoint?: '@astrojs/image/squoosh' | '@astrojs/image/sharp' | string;
    logLevel?: LoggerLevel;
    cacheDir?: false | string;
}
export default function integration(options?: IntegrationOptions): AstroIntegration;
