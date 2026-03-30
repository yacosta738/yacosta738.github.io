import {
	type Client,
	type DataSourceObjectResponse,
	isFullDatabase,
	isFullDataSource,
} from "@notionhq/client";

export interface ResolveDataSourceOptions {
	dataSourceId?: string;
}

export async function resolveDataSourceForDatabase(
	client: Client,
	databaseId: string,
	options: ResolveDataSourceOptions = {},
): Promise<DataSourceObjectResponse> {
	const database = await client.databases.retrieve({ database_id: databaseId });
	if (!isFullDatabase(database)) {
		throw new Error(`Expected full database response for ${databaseId}`);
	}

	const availableDataSources = database.data_sources;
	if (availableDataSources.length === 0) {
		throw new Error(`Database ${databaseId} has no data sources`);
	}

	const requestedDataSourceId = options.dataSourceId;
	if (!requestedDataSourceId && availableDataSources.length > 1) {
		const dataSourceList = availableDataSources.map((source) => source.id).join(", ");
		throw new Error(
			`Database ${databaseId} has multiple data sources (${dataSourceList}). Pass data_source_id explicitly.`,
		);
	}

	const resolvedDataSourceId = requestedDataSourceId ?? availableDataSources[0]?.id;
	if (!resolvedDataSourceId) {
		throw new Error(`Database ${databaseId} has no resolvable data source id`);
	}

	if (
		requestedDataSourceId &&
		!availableDataSources.some((source) => source.id === requestedDataSourceId)
	) {
		throw new Error(
			`Data source ${requestedDataSourceId} does not belong to database ${databaseId}`,
		);
	}

	const dataSource = await client.dataSources.retrieve({
		data_source_id: resolvedDataSourceId,
	});
	if (!isFullDataSource(dataSource)) {
		throw new Error(
			`Expected full data source response for ${resolvedDataSourceId}`,
		);
	}

	return dataSource;
}
