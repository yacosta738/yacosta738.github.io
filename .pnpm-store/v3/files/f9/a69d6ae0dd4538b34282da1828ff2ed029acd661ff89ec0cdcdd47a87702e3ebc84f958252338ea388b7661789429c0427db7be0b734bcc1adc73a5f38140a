export type LoggerLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
export interface LogMessage {
    level: LoggerLevel;
    message: string;
    prefix?: boolean;
    timestamp?: boolean;
}
export declare const levels: Record<LoggerLevel, number>;
export declare const info: ({ message, level, prefix, timestamp }: LogMessage) => void;
export declare const debug: ({ message, level, prefix, timestamp }: LogMessage) => void;
export declare const warn: ({ message, level, prefix, timestamp }: LogMessage) => void;
export declare const error: ({ message, level, prefix, timestamp }: LogMessage) => void;
