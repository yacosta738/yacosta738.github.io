import { describe, expect, it } from "vitest";
import type { EnhancedProject } from "@/core/resume/project/project.service";
import {
	enhanceProjectsForSorting,
	sortProjectsByDate,
} from "./project-sorter";

// Mock project data for testing
const createMockProject = (
	overrides: Partial<EnhancedProject> = {},
): EnhancedProject => ({
	name: "Test Project",
	description: "Test description",
	startDate: undefined,
	url: "https://example.com",
	metadata: null,
	...overrides,
});

describe("project-sorter", () => {
	describe("enhanceProjectsForSorting", () => {
		it("should add sort timestamp and display year to projects", () => {
			const projects: EnhancedProject[] = [
				createMockProject({
					name: "Project A",
					startDate: new Date("2023-01-01"),
				}),
				createMockProject({
					name: "Project B",
					metadata: {
						title: "Project B",
						date: "2022-01-01T00:00:00.000Z",
						company: "Test Company",
						featured: false,
						tech: [],
						showInProjects: true,
						published: true,
						priority: 0,
						year: 2022,
					},
				}),
			];

			const enhanced = enhanceProjectsForSorting(projects);

			expect(enhanced[0]._sortTimestamp).toBeGreaterThan(0);
			expect(enhanced[0]._displayYear).toBe("2023");
			expect(enhanced[1]._displayYear).toBe("2022");
		});
	});

	describe("sortProjectsByDate", () => {
		it("should sort projects by date, newest first", () => {
			const projects: EnhancedProject[] = [
				createMockProject({
					name: "Old Project",
					startDate: new Date("2020-01-01"),
				}),
				createMockProject({
					name: "New Project",
					startDate: new Date("2023-01-01"),
				}),
				createMockProject({
					name: "Middle Project",
					startDate: new Date("2021-01-01"),
				}),
			];

			const sorted = sortProjectsByDate(projects);

			expect(sorted[0].name).toBe("New Project");
			expect(sorted[1].name).toBe("Middle Project");
			expect(sorted[2].name).toBe("Old Project");
		});

		it("should fallback to metadata.year when startDate is missing", () => {
			const createMetadata = (year: number) => ({
				title: "Test",
				date: `${year}-01-01T00:00:00.000Z`,
				company: "Test Company",
				featured: false,
				tech: [],
				showInProjects: true,
				published: true,
				priority: 0,
				year,
			});

			const projects: EnhancedProject[] = [
				createMockProject({
					name: "Project A",
					metadata: createMetadata(2020),
				}),
				createMockProject({
					name: "Project B",
					metadata: createMetadata(2023),
				}),
			];

			const sorted = sortProjectsByDate(projects);

			expect(sorted[0].name).toBe("Project B"); // 2023
			expect(sorted[1].name).toBe("Project A"); // 2020
		});

		it("should sort by name when dates are equal", () => {
			const projects: EnhancedProject[] = [
				createMockProject({
					name: "Zebra Project",
					startDate: new Date("2023-01-01"),
				}),
				createMockProject({
					name: "Alpha Project",
					startDate: new Date("2023-01-01"),
				}),
			];

			const sorted = sortProjectsByDate(projects);

			expect(sorted[0].name).toBe("Alpha Project");
			expect(sorted[1].name).toBe("Zebra Project");
		});

		it("should handle empty input gracefully", () => {
			const sorted = sortProjectsByDate([]);
			expect(sorted).toEqual([]);
		});

		it("should handle projects with no dates", () => {
			const projects: EnhancedProject[] = [
				createMockProject({ name: "Project B" }),
				createMockProject({ name: "Project A" }),
			];

			const sorted = sortProjectsByDate(projects);

			expect(sorted[0].name).toBe("Project A");
			expect(sorted[1].name).toBe("Project B");
		});
	});
});
