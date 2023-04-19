import type { AstroConfig } from 'astro';
import type { SSRImageService, TransformOptions } from '../loaders/index.js';
import { type LoggerLevel } from '../utils/logger.js';
export interface SSGBuildParams {
    loader: SSRImageService;
    staticImages: Map<string, Map<string, TransformOptions>>;
    config: AstroConfig;
    outDir: URL;
    logLevel: LoggerLevel;
    cacheDir?: URL;
}
export declare function ssgBuild({ loader, staticImages, config, outDir, logLevel, cacheDir, }: SSGBuildParams): Promise<void>;
