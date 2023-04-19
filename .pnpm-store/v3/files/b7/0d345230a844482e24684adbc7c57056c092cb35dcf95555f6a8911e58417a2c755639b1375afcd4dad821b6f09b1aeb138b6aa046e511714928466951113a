/// <reference types="node" />
import type { Operation } from '../vendor/squoosh/image.js';
import type { OutputFormat, TransformOptions } from './index.js';
import { BaseSSRService } from './index.js';
declare class SquooshService extends BaseSSRService {
    processAvif(image: any, transform: TransformOptions): Promise<{
        data: any;
        format: OutputFormat;
    }>;
    processJpeg(image: any, transform: TransformOptions): Promise<{
        data: any;
        format: OutputFormat;
    }>;
    processPng(image: any, transform: TransformOptions): Promise<{
        data: any;
        format: OutputFormat;
    }>;
    processWebp(image: any, transform: TransformOptions): Promise<{
        data: any;
        format: OutputFormat;
    }>;
    autorotate(transform: TransformOptions, inputBuffer: Buffer): Promise<Operation | undefined>;
    transform(inputBuffer: Buffer, transform: TransformOptions): Promise<{
        data: Buffer;
        format: "svg";
    } | {
        data: Buffer;
        format: "avif" | "jpeg" | "jpg" | "png" | "webp";
    }>;
}
declare const service: SquooshService;
export default service;
