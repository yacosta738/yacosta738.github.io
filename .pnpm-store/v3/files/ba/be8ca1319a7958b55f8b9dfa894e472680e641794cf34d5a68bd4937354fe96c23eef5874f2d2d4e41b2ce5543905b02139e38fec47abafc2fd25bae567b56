/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { Pattern } from "fast-glob";
import type { Stream } from "stream";
export type optionDebug = 0 | 1 | 2;
export type optionBuffer = string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | Stream;
export interface executions {
    fulfilled?: boolean | ((plan: optionExecutionsPlan) => Promise<false | string>);
    failed?: boolean | ((inputPath: optionExecutionsFile) => Promise<false | string>);
    accomplished?: boolean | ((ongoing: optionExecutionsFile) => Promise<false | string>);
    changed?: (plan: optionExecutionsPlan) => Promise<optionExecutionsPlan>;
    passed?: (ongoing: optionExecutionsFile) => Promise<boolean>;
    read?: (ongoing: optionExecutionsFile) => Promise<optionBuffer>;
    wrote?: (ongoing: optionExecutionsFile) => Promise<optionBuffer>;
}
export type optionExclude = string | RegExp | ((file: string) => boolean);
export type optionPath = string | URL | Map<string | URL, string | URL> | false;
export interface Options {
    [key: string]: unknown;
    path?: optionPath | optionPath[] | Set<optionPath>;
    exclude?: optionExclude | optionExclude[] | Set<optionExclude>;
    files?: Pattern | Pattern[];
    type?: string;
    pipe?: executions;
    logger?: optionDebug;
}
export interface optionExecutionsPlan {
    debug: optionDebug;
    files: number;
    info: unknown;
    paths: Map<string, string>;
    results: Map<string, string>;
    ongoing: optionExecutionsFile;
}
export interface optionExecutionsFile {
    inputPath: string;
    outputPath: string;
    fileSizeAfter: number;
    fileSizeBefore: number;
    buffer: optionBuffer;
}
declare const _default: {
    path: string;
    logger: 2;
    pipe: {
        wrote: (ongoing: optionExecutionsFile) => Promise<optionBuffer>;
        read: (ongoing: optionExecutionsFile) => Promise<string>;
        passed: () => Promise<true>;
        failed: (ongoing: optionExecutionsFile) => Promise<string>;
        accomplished: (ongoing: optionExecutionsFile) => Promise<string>;
        fulfilled: (plan: optionExecutionsPlan) => Promise<string | false>;
        changed: (plan: optionExecutionsPlan) => Promise<optionExecutionsPlan>;
    };
};
export default _default;
