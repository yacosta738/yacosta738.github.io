import { describe, expect, it } from "vitest";
import { cleanEntityId, parseEntityId } from "@/lib/collection.entity";

describe("parseEntityId function", () => {
	it("should correctly parse an entity ID with an 'en' language prefix", () => {
		const result = parseEntityId("en/yuniel-acosta");
		expect(result).toEqual({ lang: "en", path: "yuniel-acosta" });
	});

	it("should correctly parse an entity ID with a composite language prefix", () => {
		const result = parseEntityId("zh-cn/yuniel-acosta");
		expect(result).toEqual({ lang: "zh-cn", path: "yuniel-acosta" });
	});

	it("should correctly parse an entity ID without a language prefix", () => {
		const result = parseEntityId("yuniel-acosta");
		expect(result).toEqual({ lang: null, path: "yuniel-acosta" });
	});

	it("should handle entity IDs with multiple slashes", () => {
		const result = parseEntityId("en/blog/my-post");
		expect(result).toEqual({ lang: "en", path: "blog/my-post" });
	});

	it("should handle entity IDs with numbers", () => {
		const result = parseEntityId("es/article-123");
		expect(result).toEqual({ lang: "es", path: "article-123" });
	});
});

describe("cleanEntityId function", () => {
	it("should remove 'en' language prefix from entity ID", () => {
		const result = cleanEntityId("en/yuniel-acosta");
		expect(result).toBe("yuniel-acosta");
	});

	it("should remove composite language prefix from entity ID", () => {
		const result = cleanEntityId("zh-cn/yuniel-acosta");
		expect(result).toBe("yuniel-acosta");
	});

	it("should return the original entity ID when no language prefix exists", () => {
		const result = cleanEntityId("yuniel-acosta");
		expect(result).toBe("yuniel-acosta");
	});

	it("should handle entity IDs with multiple path segments", () => {
		const result = cleanEntityId("fr/blog/tech/article");
		expect(result).toBe("blog/tech/article");
	});
});
