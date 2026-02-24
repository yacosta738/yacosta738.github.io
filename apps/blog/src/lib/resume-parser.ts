import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { RawResumeData } from "./resume-types";

/**
 * An in-memory cache for the parsed resume data to avoid multiple file reads
 * during a single process.
 * @type {RawResumeData | null}
 */
let cachedResumeData: RawResumeData | null = null;

/**
 * Loads and parses the main `resume.json` file from the filesystem.
 * It caches the result in memory to ensure the file is only read and parsed once
 * per build or server process.
 *
 * @returns {RawResumeData} The parsed raw resume data.
 */
export const getResumeData = (): RawResumeData => {
	if (cachedResumeData === null) {
		const filePath = resolve(
			process.cwd(),
			"../../packages/shared/src/data/resume/es/resume.json",
		);
		const fileContent = readFileSync(filePath, "utf-8");
		cachedResumeData = JSON.parse(fileContent) as RawResumeData;
	}
	return cachedResumeData;
};
