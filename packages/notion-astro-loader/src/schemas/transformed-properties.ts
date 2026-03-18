import type { z } from "zod";
import { dateToDateObjects, richTextToPlainText } from "../format.js";
import * as propertyType from "./raw-properties.js";

export const number: z.ZodTypeAny = propertyType.number.transform(
	(property) => property.number,
);
export const url: z.ZodTypeAny = propertyType.url.transform(
	(property) => property.url,
);
export const email: z.ZodTypeAny = propertyType.email.transform(
	(property) => property.email,
);
export const phone_number: z.ZodTypeAny = propertyType.phone_number.transform(
	(property) => property.phone_number,
);
export const checkbox: z.ZodTypeAny = propertyType.checkbox.transform(
	(property) => property.checkbox,
);

export const select: z.ZodTypeAny = propertyType.select.transform(
	(property) => property.select?.name ?? null,
);
export const multi_select: z.ZodTypeAny = propertyType.multi_select.transform(
	(property) => property.multi_select.map((option) => option.name),
);
export const status: z.ZodTypeAny = propertyType.status.transform(
	(property) => property.status?.name ?? null,
);

export const title: z.ZodTypeAny = propertyType.title.transform((property) =>
	richTextToPlainText(property.title),
);
export const rich_text: z.ZodTypeAny = propertyType.rich_text.transform(
	(property) => richTextToPlainText(property.rich_text),
);

export const date: z.ZodTypeAny = propertyType.date.transform((property) =>
	dateToDateObjects(property.date),
);
export const created_time: z.ZodTypeAny = propertyType.created_time.transform(
	(property) => new Date(property.created_time),
);
