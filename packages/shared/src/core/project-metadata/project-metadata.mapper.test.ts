import { describe, expect, it } from "vitest";
import {
	applyCriteria,
	createLookupMap,
	fromContentEntry,
} from "./project-metadata.mapper";
import type ProjectMetadata from "./project-metadata.model";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeEntry(
	overrides: Partial<{
		title: string;
		cover: string;
		date: string | Date;
		repository: string;
		url: string;
		company: string;
		tech: Array<{ id: string } | string>;
		showInProjects: boolean;
		featured: boolean;
		priority: number;
		published: boolean;
	}> = {},
) {
	return {
		data: {
			title: "My Project",
			date: "2024-03-15",
			company: "Acme Corp",
			showInProjects: true,
			featured: false,
			priority: 1,
			published: true,
			...overrides,
		},
	};
}

function makeProject(
	overrides: Partial<ProjectMetadata> = {},
): ProjectMetadata {
	return {
		title: "Project A",
		date: "2024-01-01",
		company: "Corp",
		showInProjects: true,
		featured: false,
		priority: 1,
		published: true,
		tech: [],
		...overrides,
	};
}

// ---------------------------------------------------------------------------
// fromContentEntry
// ---------------------------------------------------------------------------

describe("fromContentEntry", () => {
	it("maps a basic entry with a string date", () => {
		const entry = makeEntry();
		const result = fromContentEntry(entry);

		expect(result.title).toBe("My Project");
		expect(result.company).toBe("Acme Corp");
		expect(result.date).toBe("2024-03-15");
		expect(result.year).toBe(2024);
		expect(result.tech).toEqual([]);
		expect(result.showInProjects).toBe(true);
		expect(result.featured).toBe(false);
		expect(result.priority).toBe(1);
		expect(result.published).toBe(true);
	});

	it("maps a Date object for date and produces ISO string", () => {
		const d = new Date("2023-07-04T00:00:00.000Z");
		const entry = makeEntry({ date: d });
		const result = fromContentEntry(entry);

		expect(result.date).toBe(d.toISOString());
		expect(result.year).toBe(d.getFullYear());
	});

	it("maps a UTC boundary Date and produces correct ISO string and UTC year", () => {
		const d = new Date("2024-01-01T00:00:00.000Z");
		const entry = makeEntry({ date: d });
		const result = fromContentEntry(entry);

		expect(result.date).toBe(d.toISOString());
		expect(result.year).toBe(d.getUTCFullYear());
	});

	it("maps tech refs that are objects with id", () => {
		const entry = makeEntry({ tech: [{ id: "typescript" }, { id: "react" }] });
		const result = fromContentEntry(entry);

		expect(result.tech).toEqual(["typescript", "react"]);
	});

	it("maps tech refs that are plain strings", () => {
		const entry = makeEntry({ tech: ["go", "rust"] });
		const result = fromContentEntry(entry);

		expect(result.tech).toEqual(["go", "rust"]);
	});

	it("maps mixed tech refs (objects and strings)", () => {
		const entry = makeEntry({ tech: [{ id: "typescript" }, "go"] });
		const result = fromContentEntry(entry);

		expect(result.tech).toEqual(["typescript", "go"]);
	});

	it("returns empty tech array when tech is undefined", () => {
		const entry = makeEntry({ tech: undefined });
		const result = fromContentEntry(entry);

		expect(result.tech).toEqual([]);
	});

	it("preserves optional fields cover, repository, url when provided", () => {
		const entry = makeEntry({
			cover: "/images/cover.png",
			repository: "https://github.com/user/repo",
			url: "https://example.com",
		});
		const result = fromContentEntry(entry);

		expect(result.cover).toBe("/images/cover.png");
		expect(result.repository).toBe("https://github.com/user/repo");
		expect(result.url).toBe("https://example.com");
	});

	it("returns undefined year for an invalid date string", () => {
		const entry = makeEntry({ date: "not-a-date" });
		const result = fromContentEntry(entry);

		expect(result.year).toBeUndefined();
	});
});

// ---------------------------------------------------------------------------
// applyCriteria
// ---------------------------------------------------------------------------

describe("applyCriteria", () => {
	const projects: ProjectMetadata[] = [
		makeProject({
			title: "Alpha",
			featured: true,
			published: true,
			showInProjects: true,
			priority: 3,
			company: "Acme",
			tech: ["react"],
			url: "https://a.com",
			cover: "/a.png",
		}),
		makeProject({
			title: "Beta",
			featured: false,
			published: true,
			showInProjects: false,
			priority: 1,
			company: "Beta Inc",
			tech: ["vue"],
			repository: "https://repo.com",
		}),
		makeProject({
			title: "Gamma",
			featured: true,
			published: false,
			showInProjects: true,
			priority: 2,
			company: "Acme",
			tech: ["react", "typescript"],
		}),
	];

	it("returns all items when criteria is undefined", () => {
		expect(applyCriteria(projects)).toHaveLength(3);
	});

	it("filters by featured", () => {
		const result = applyCriteria(projects, { featured: true });
		expect(result.every((p) => p.featured)).toBe(true);
		expect(result).toHaveLength(2);
	});

	it("filters by published", () => {
		const result = applyCriteria(projects, { published: false });
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe("Gamma");
	});

	it("filters by showInProjects", () => {
		const result = applyCriteria(projects, { showInProjects: false });
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe("Beta");
	});

	it("filters by tech (single)", () => {
		const result = applyCriteria(projects, { tech: ["vue"] });
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe("Beta");
	});

	it("filters by tech (multiple — OR logic)", () => {
		const result = applyCriteria(projects, { tech: ["vue", "typescript"] });
		expect(result).toHaveLength(2);
	});

	it("does not filter tech when array is empty", () => {
		const result = applyCriteria(projects, { tech: [] });
		expect(result).toHaveLength(3);
	});

	it("filters hasRepository: true", () => {
		const result = applyCriteria(projects, { hasRepository: true });
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe("Beta");
	});

	it("filters hasRepository: false", () => {
		const result = applyCriteria(projects, { hasRepository: false });
		expect(result).toHaveLength(2);
	});

	it("filters hasUrl: true", () => {
		const result = applyCriteria(projects, { hasUrl: true });
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe("Alpha");
	});

	it("filters hasUrl: false", () => {
		const result = applyCriteria(projects, { hasUrl: false });
		expect(result).toHaveLength(2);
	});

	it("filters hasCover: true", () => {
		const result = applyCriteria(projects, { hasCover: true });
		expect(result).toHaveLength(1);
		expect(result[0].title).toBe("Alpha");
	});

	it("filters hasCover: false", () => {
		const result = applyCriteria(projects, { hasCover: false });
		expect(result).toHaveLength(2);
	});

	it("filters by company (case-insensitive partial match)", () => {
		const result = applyCriteria(projects, { company: "acme" });
		expect(result).toHaveLength(2);
	});

	it("sorts by priority asc", () => {
		const result = applyCriteria(projects, {
			sortBy: "priority",
			sortDirection: "asc",
		});
		expect(result.map((p) => p.priority)).toEqual([1, 2, 3]);
	});

	it("sorts by priority desc", () => {
		const result = applyCriteria(projects, {
			sortBy: "priority",
			sortDirection: "desc",
		});
		expect(result.map((p) => p.priority)).toEqual([3, 2, 1]);
	});

	it("sorts by title asc", () => {
		const result = applyCriteria(projects, { sortBy: "title" });
		expect(result.map((p) => p.title)).toEqual(["Alpha", "Beta", "Gamma"]);
	});

	it("sorts by title desc", () => {
		const result = applyCriteria(projects, {
			sortBy: "title",
			sortDirection: "desc",
		});
		expect(result.map((p) => p.title)).toEqual(["Gamma", "Beta", "Alpha"]);
	});

	it("sorts by featured desc (featured first)", () => {
		const result = applyCriteria(projects, { sortBy: "featured" });
		expect(result[0].featured).toBe(true);
	});

	it("sorts by date asc", () => {
		const dated = [
			makeProject({ title: "C", date: "2023-01-01" }),
			makeProject({ title: "A", date: "2021-01-01" }),
			makeProject({ title: "B", date: "2022-01-01" }),
		];
		const result = applyCriteria(dated, { sortBy: "date" });
		expect(result.map((p) => p.title)).toEqual(["A", "B", "C"]);
	});

	it("applies limit", () => {
		const result = applyCriteria(projects, { limit: 2 });
		expect(result).toHaveLength(2);
	});

	it("ignores limit when 0", () => {
		const result = applyCriteria(projects, { limit: 0 });
		expect(result).toHaveLength(3);
	});
});

// ---------------------------------------------------------------------------
// createLookupMap
// ---------------------------------------------------------------------------

describe("createLookupMap", () => {
	it("creates a map keyed by title", () => {
		const projects = [
			makeProject({ title: "Alpha" }),
			makeProject({ title: "Beta" }),
		];
		const map = createLookupMap(projects);

		expect(map.size).toBe(2);
		expect(map.get("Alpha")).toBe(projects[0]);
		expect(map.get("Beta")).toBe(projects[1]);
	});

	it("returns an empty map for empty input", () => {
		expect(createLookupMap([])).toEqual(new Map());
	});
});
