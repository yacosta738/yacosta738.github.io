import fs from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("node:fs");
vi.mock("node:path");

// Need to reset modules to clear the cache in getResumeData
beforeEach(() => {
	vi.clearAllMocks();
	vi.resetModules();
});

describe("getResumeData", () => {
	const mockResumeData = { basics: { name: "John Doe" } };
	const mockFilePath = "/path/to/resume.json";

	it("should read and parse the resume file when cache is empty", async () => {
		vi.mocked(path.resolve).mockReturnValue(mockFilePath);
		vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockResumeData));

		const { getResumeData: getResumeDataFresh } = await import(
			"./resume-parser"
		);
		const result = getResumeDataFresh();

		expect(path.resolve).toHaveBeenCalledWith(
			process.cwd(),
			"src/data/resume/es/resume.json",
		);
		expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, "utf-8");
		expect(result).toEqual(mockResumeData);
	});

	it("should return cached data on subsequent calls", async () => {
		vi.mocked(path.resolve).mockReturnValue(mockFilePath);
		vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockResumeData));

		const { getResumeData: getResumeDataCached } = await import(
			"./resume-parser"
		);
		getResumeDataCached(); // First call to populate cache
		const result = getResumeDataCached(); // Second call

		expect(fs.readFileSync).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockResumeData);
	});
});
