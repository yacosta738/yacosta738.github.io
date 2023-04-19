/// <reference types="node" />
import type { LoggerLevel } from '../utils/logger.js';
interface Cache {
    [filename: string]: {
        expires: number;
    };
}
export declare class ImageCache {
    #private;
    constructor(dir: URL, logLevel: LoggerLevel);
    init(): Promise<void>;
    finalize(): Promise<void>;
    get(file: string): Promise<Buffer | undefined>;
    set(file: string, buffer: Buffer, opts: Cache['string']): Promise<void>;
    has(file: string): boolean;
}
export {};
