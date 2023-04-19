import { z } from 'astro/zod';
export declare const rssSchema: z.ZodObject<{
    title: z.ZodString;
    pubDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodDate]>, Date, string | number | Date>;
    description: z.ZodOptional<z.ZodString>;
    customData: z.ZodOptional<z.ZodString>;
    draft: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    customData?: string | undefined;
    draft?: boolean | undefined;
    title: string;
    pubDate: Date;
}, {
    description?: string | undefined;
    customData?: string | undefined;
    draft?: boolean | undefined;
    title: string;
    pubDate: string | number | Date;
}>;
