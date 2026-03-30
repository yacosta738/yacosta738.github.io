import {
	type Client,
	isFullDatabase,
	isFullDataSource,
} from "@notionhq/client";
import { z } from "zod";
import * as rawPropertyType from "./schemas/raw-properties.js";
import type { DatabasePropertyConfigResponse } from "./types.js";

export async function propertiesSchemaForDatabase(
	client: Client,
	databaseId: string,
) {
	const database = await client.databases.retrieve({ database_id: databaseId });
	if (!isFullDatabase(database)) {
		throw new Error(`Expected full database response for ${databaseId}`);
	}

	const dataSourceId = database.data_sources[0]?.id;
	if (!dataSourceId) {
		throw new Error(`Database ${databaseId} has no data sources`);
	}

	const dataSource = await client.dataSources.retrieve({
		data_source_id: dataSourceId,
	});
	if (!isFullDataSource(dataSource)) {
		throw new Error(`Expected full data source response for ${dataSourceId}`);
	}

	const schemaByType: Record<string, z.ZodTypeAny> = {
		number: rawPropertyType.number,
		url: rawPropertyType.url,
		select: rawPropertyType.select,
		multi_select: rawPropertyType.multi_select,
		status: rawPropertyType.status,
		date: rawPropertyType.date,
		email: rawPropertyType.email,
		phone_number: rawPropertyType.phone_number,
		checkbox: rawPropertyType.checkbox,
		files: rawPropertyType.files,
		created_by: rawPropertyType.created_by,
		created_time: rawPropertyType.created_time,
		last_edited_by: rawPropertyType.last_edited_by,
		last_edited_time: rawPropertyType.last_edited_time,
		formula: rawPropertyType.formula,
		title: rawPropertyType.title,
		rich_text: rawPropertyType.rich_text,
		people: rawPropertyType.people,
		relation: rawPropertyType.relation,
		rollup: rawPropertyType.rollup,
		unique_id: rawPropertyType.unique_id,
	};

	const schemaForDatabaseProperty = (
		propertyConfig: DatabasePropertyConfigResponse,
	): z.ZodTypeAny => schemaByType[propertyConfig.type] ?? z.any();

	const schema = Object.fromEntries(
		Object.entries(dataSource.properties).map(
			([key, value]: [string, DatabasePropertyConfigResponse]) => {
				let propertySchema = schemaForDatabaseProperty(value);
				if (value.description) {
					propertySchema = propertySchema.describe(value.description);
				}
				if (key !== "Name") {
					propertySchema = propertySchema.optional();
				}

				return [key, propertySchema];
			},
		),
	) as Record<string, z.ZodTypeAny>;

	return z.object(schema);
}
