import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("node:fs");

const MOCK_RESUME = {
	basics: { name: "Test User", label: "Engineer", email: "test@example.com" },
};

describe("getResumeData", () => {
	beforeEach(() => {
		vi.mocked(readFileSync).mockReturnValue(JSON.stringify(MOCK_RESUME));
	});

	afterEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});

	it("reads and parses the resume JSON file", async () => {
		const { getResumeData } = await import("@blog/lib/resume-parser");
		const result = getResumeData();
		expect(result).toEqual(MOCK_RESUME);
	});

	it("calls readFileSync exactly once on the first call", async () => {
		const { getResumeData } = await import("@blog/lib/resume-parser");
		getResumeData();
		expect(readFileSync).toHaveBeenCalledTimes(1);
	});

	it("returns the cached value on subsequent calls without re-reading the file", async () => {
		const { getResumeData } = await import("@blog/lib/resume-parser");
		getResumeData();
		getResumeData();
		getResumeData();
		expect(readFileSync).toHaveBeenCalledTimes(1);
	});
});
