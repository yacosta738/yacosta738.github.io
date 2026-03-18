import { z } from "zod";
import { externalPropertyResponse, filePropertyResponse } from "./file.js";

function propertySchema<Type extends string, Schema extends z.ZodTypeAny>(
	type: Type,
	schema: Schema,
) {
	return z.object({
		type: z.literal(type),
		id: z.string(),
		[type]: schema,
	} as {
		type: z.ZodLiteral<Type>;
		id: z.ZodString;
	} & {
		[T in Type]: Schema;
	});
}

const userObjectResponse = z
	.object({
		id: z.string(),
		object: z.literal("user"),
	})
	.passthrough();

const selectPropertyResponse = z.object({
	id: z.string(),
	name: z.string(),
	color: z.string(),
});
const dateField = z.union([
	z.string().date(),
	z.string().datetime({ offset: true }),
]);
const dateResponse = z.object({
	start: dateField,
	end: dateField.nullable(),
	time_zone: z.string().nullable(),
});
const formulaPropertyResponse = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("string"),
		string: z.string().nullable(),
	}),
	z.object({
		type: z.literal("date"),
		date: z.string().datetime({ offset: true }).nullable(),
	}),
	z.object({
		type: z.literal("number"),
		number: z.number().nullable(),
	}),
	z.object({
		type: z.literal("boolean"),
		boolean: z.boolean().nullable(),
	}),
]);
const baseRichTextResponse = z.object({
	annotations: z
		.object({
			bold: z.boolean(),
			italic: z.boolean(),
			strikethrough: z.boolean(),
			underline: z.boolean(),
			code: z.boolean(),
			color: z.string(),
		})
		.passthrough(),
	plain_text: z.string(),
	href: z.string().nullable(),
});
const richTextItemResponse = z.discriminatedUnion("type", [
	baseRichTextResponse.extend({
		type: z.literal("text"),
		text: z.object({
			content: z.string(),
			link: z
				.object({
					url: z.string(),
				})
				.nullable(),
		}),
	}),
	baseRichTextResponse.extend({
		type: z.literal("mention"),
		mention: z
			.object({
				type: z.enum([
					"user",
					"date",
					"link_preview",
					"template_mention",
					"page",
					"database",
				]),
			})
			.passthrough(),
	}),
	baseRichTextResponse.extend({
		type: z.literal("equation"),
		equation: z.object({
			expression: z.string(),
		}),
	}),
]);
const relationResponse = z.object({ id: z.string() });

export const number = propertySchema("number", z.number().nullable());
export const url = propertySchema("url", z.string().nullable());
export const select = propertySchema(
	"select",
	selectPropertyResponse.nullable(),
);
export const multi_select = propertySchema(
	"multi_select",
	z.array(selectPropertyResponse),
);
export const status = propertySchema(
	"status",
	selectPropertyResponse.nullable(),
);
export const date = propertySchema("date", dateResponse.nullable());
export const email = propertySchema("email", z.string().nullable());
export const phone_number = propertySchema(
	"phone_number",
	z.string().nullable(),
);
export const checkbox = propertySchema("checkbox", z.boolean());
export const files = propertySchema(
	"files",
	z.array(
		z.discriminatedUnion("type", [
			filePropertyResponse.extend({ name: z.string() }),
			externalPropertyResponse.extend({ name: z.string() }),
		]),
	),
);
export const created_by = propertySchema("created_by", userObjectResponse);
export const created_time = propertySchema(
	"created_time",
	z.string().datetime({ offset: true }),
);
export const last_edited_by = propertySchema(
	"last_edited_by",
	userObjectResponse,
);
export const last_edited_time = propertySchema(
	"last_edited_time",
	z.string().datetime({ offset: true }),
);
export const formula = propertySchema("formula", formulaPropertyResponse);
export const title = propertySchema("title", z.array(richTextItemResponse));
export const rich_text = propertySchema(
	"rich_text",
	z.array(richTextItemResponse),
);
export const people = propertySchema("people", z.array(userObjectResponse));
export const relation = propertySchema("relation", z.array(relationResponse));
export const rollup = propertySchema(
	"rollup",
	z.discriminatedUnion("type", [
		z.object({
			function: z.string(),
			type: z.literal("number"),
			number: z.number().nullable(),
		}),
		z.object({
			function: z.string(),
			type: z.literal("date"),
			date: z.string().datetime({ offset: true }).nullable(),
		}),
		z.object({
			function: z.string(),
			type: z.literal("array"),
			array: z.array(
				z.discriminatedUnion("type", [
					z.object({
						type: z.literal("title"),
						title: z.array(richTextItemResponse),
					}),
					z.object({
						type: z.literal("rich_text"),
						rich_text: z.array(richTextItemResponse),
					}),
					z.object({
						type: z.literal("people"),
						people: z.array(userObjectResponse),
					}),
					z.object({
						type: z.literal("relation"),
						relation: z.array(relationResponse),
					}),
				]),
			),
		}),
	]),
);
export const unique_id = propertySchema("unique_id", z.any());
