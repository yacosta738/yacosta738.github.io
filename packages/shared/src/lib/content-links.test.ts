import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const articlesDir = path.resolve(import.meta.dirname, "../data/articles");
const brokenRootLevelArticleLinkPattern =
	/\]\(\/(?:[a-z]+(?:-[a-z]+)?\/)?[a-z0-9-]+\/?\)/g;

const getArticleFiles = (directory: string): string[] => {
	return readdirSync(directory).flatMap((entry) => {
		const entryPath = path.join(directory, entry);
		const stats = statSync(entryPath);

		if (stats.isDirectory()) {
			return getArticleFiles(entryPath);
		}

		return entryPath.endsWith(".mdx") ? [entryPath] : [];
	});
};

describe("article content internal links", () => {
	it("does not contain root-level article links that skip the dated permalink", () => {
		const brokenLinks = getArticleFiles(articlesDir).flatMap((filePath) => {
			const content = readFileSync(filePath, "utf8");
			const matches = content.match(brokenRootLevelArticleLinkPattern) ?? [];

			return matches.map((match) => ({
				filePath: path.relative(articlesDir, filePath),
				match,
			}));
		});

		expect(brokenLinks).toEqual([]);
	});
});
