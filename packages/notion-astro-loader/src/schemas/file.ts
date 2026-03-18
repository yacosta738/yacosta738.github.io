import { z } from "zod";

export const filePropertyResponse = z.object({
	type: z.literal("file"),
	file: z.object({
		url: z.string(),
		expiry_time: z.string(),
	}),
});
export const externalPropertyResponse = z.object({
	type: z.literal("external"),
	external: z.object({
		url: z.string(),
	}),
});
