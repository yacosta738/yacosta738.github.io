import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("node:fs", async (importOriginal) => {
	const actual = await importOriginal<typeof import("node:fs")>();
	const readFileSync = vi.fn();
	return {
		...actual,
		readFileSync,
		default: { ...actual, readFileSync },
	};
});
vi.mock("node:path", async (importOriginal) => {
	const actual = await importOriginal<typeof import("node:path")>();
	const resolve = vi.fn();
	return {
		...actual,
		resolve,
		default: { ...actual, resolve },
	};
});

// Need to reset modules to clear the cache in getResumeData
beforeEach(() => {
	vi.clearAllMocks();
	vi.resetModules();
});

describe("getResumeData", () => {
	const mockResumeData = { basics: { name: "John Doe" } };
	const mockFilePath = "/path/to/resume.json";

	it("should read and parse the resume file when cache is empty", async () => {
		const fs = await import("node:fs");
		const path = await import("node:path");

		vi.mocked(path.resolve).mockReturnValue(mockFilePath);
		vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockResumeData));

		const { getResumeData: getResumeDataFresh } = await import(
			"./resume-parser"
		);
		const result = getResumeDataFresh();

		expect(path.resolve).toHaveBeenCalledWith(
			process.cwd(),
			"../../packages/shared/src/data/resume/es/resume.json",
		);
		expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, "utf-8");
		expect(result).toEqual(mockResumeData);
	});

	it("should return cached data on subsequent calls", async () => {
		const fs = await import("node:fs");
		const path = await import("node:path");

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
