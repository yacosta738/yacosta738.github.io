import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const appRoot = resolve(process.cwd());

const snapshotModuleUrl = pathToFileURL(
	resolve(appRoot, "src", "lib", "notion", "notion-snapshot.ts"),
).href;

const snapshotPath = resolve(appRoot, ".cache", "notion-loader.json");

const run = async () => {
	const {
		assertNoRemoteNotionImages,
		collectLocalNotionAssetPaths,
		readSnapshot,
	} = await import(snapshotModuleUrl);

	const snapshot = readSnapshot(snapshotPath);
	assertNoRemoteNotionImages(snapshot.entries);

	for (const assetPath of collectLocalNotionAssetPaths(snapshot.entries)) {
		const absolutePath = resolve(appRoot, "public", `.${assetPath}`);
		if (!existsSync(absolutePath)) {
			throw new Error(`Missing local Notion asset: ${assetPath}`);
		}
	}

	console.log(
		`[notion:validate] validated ${snapshot.entries.length} entries from ${snapshotPath}`,
	);
};

run().catch((error) => {
	console.error("[notion:validate] failed", error);
	process.exitCode = 1;
});
