import { describe, expect, it } from "vitest";
import type Tag from "./tag.model";
import { getTagSlug } from "./tag.utils";

describe("getTagSlug", () => {
	it("should return normalized id for CollectionEntry-like objects (has data property)", () => {
		const entry = {
			id: "en/security",
			data: { title: "Security" },
		};

		expect(getTagSlug(entry as never)).toBe("security");
	});

	it("should strip tags/ prefix from collection entry id", () => {
		const entry = {
			id: "en/tags/javascript",
			data: { title: "JavaScript" },
		};

		expect(getTagSlug(entry as never)).toBe("javascript");
	});

	it("should strip language prefix from collection entry id", () => {
		const entry = {
			id: "es/tags/seguridad",
			data: { title: "Seguridad" },
		};

		expect(getTagSlug(entry as never)).toBe("seguridad");
	});

	it("should return slug from Tag model when slug is defined", () => {
		const tag: Tag = {
			id: "en/security",
			slug: "security",
			title: "Security",
		};

		expect(getTagSlug(tag)).toBe("security");
	});

	it("should fall back to normalized id when slug is empty string", () => {
		const tag: Tag = {
			id: "en/javascript",
			slug: "",
			title: "JavaScript",
		};

		expect(getTagSlug(tag)).toBe("javascript");
	});

	it("should fall back to normalized id when slug is whitespace only", () => {
		const tag: Tag = {
			id: "en/tags/react",
			slug: "   ",
			title: "React",
		};

		expect(getTagSlug(tag)).toBe("react");
	});

	it("should return trimmed slug from Tag model", () => {
		const tag: Tag = {
			id: "en/security",
			slug: "  security  ",
			title: "Security",
		};

		expect(getTagSlug(tag)).toBe("security");
	});
});
