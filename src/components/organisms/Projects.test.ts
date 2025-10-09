import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { Window } from "happy-dom";
import { expect, test, vi } from "vitest";
import type Project from "@/core/resume/project/project.model";
import Projects from "./Projects.astro";

// Mock i18n dependencies
vi.mock("@/i18n/ui", () => ({
	ui: {
		en: {
			projects: "Projects",
			viewProject: "View project {name}",
			viewSource: "View source",
			viewSourceOnGitHub: "View source on GitHub",
		},
		es: {
			projects: "Proyectos",
		},
	},
}));

vi.mock("@/i18n/types", () => ({
	DEFAULT_LOCALE: "en",
	LOCALES: { en: "English", es: "Spanish" },
	SHOW_DEFAULT_LANG_IN_URL: false,
}));

const mockProjects: Project[] = [
	{
		name: "Test Project 1",
		description: "Description for test project 1",
		url: "https://example.com/project1",
		github: "https://github.com/user/project1",
		highlights: ["Astro", "TypeScript"],
		isActive: true,
	},
	{
		name: "Test Project 2",
		description: "Description for test project 2",
		url: "https://example.com/project2",
		highlights: ["React", "JavaScript"],
		isActive: false,
	},
];

function parseHTML(html: string) {
	const window = new Window();
	const document = window.document;
	document.body.innerHTML = html;
	return document;
}

test("Projects component renders nothing when no projects are provided", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Projects, {
		props: { projects: [] },
	});
	expect(result.trim()).toBe("");
});

test("Projects component renders a list of projects", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Projects, {
		props: { projects: mockProjects },
		params: { lang: "en" },
	});

	const document = parseHTML(result);

	// Check for section title
	const title = document.querySelector("h2");
	expect(title).not.toBeNull();
	expect(title?.textContent).toContain("Projects");

	// Check for projects
	const projectElements = document.querySelectorAll("li");
	expect(projectElements.length).toBe(2);

	// Check for project 1 details
	const project1 = projectElements[0];
	expect(project1.textContent).toContain("Test Project 1");
	expect(project1.textContent).toContain("Description for test project 1");
	expect(
		project1.querySelector('a[href="https://example.com/project1"]'),
	).not.toBeNull();
	expect(
		project1.querySelector('a[href="https://github.com/user/project1"]'),
	).not.toBeNull();
	expect(project1.textContent).toContain("Astro");
	expect(project1.textContent).toContain("TypeScript");
	expect(project1.querySelector(".animate-flicker")).not.toBeNull(); // Active project indicator

	// Check for project 2 details
	const project2 = projectElements[1];
	expect(project2.textContent).toContain("Test Project 2");
	expect(project2.querySelector(".animate-flicker")).toBeNull(); // Inactive project
});

test("Projects component uses language from params", async () => {
	const container = await AstroContainer.create();
	const result = await container.renderToString(Projects, {
		props: { projects: mockProjects },
		params: { lang: "es" },
	});

	const document = parseHTML(result);
	const title = document.querySelector("h2");
	expect(title).not.toBeNull();
	expect(title?.textContent).toContain("Proyectos");
});
