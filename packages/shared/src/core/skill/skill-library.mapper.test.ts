import { describe, expect, it } from "vitest";
import { toSkill, toSkills } from "./skill-library.mapper";
import type Skill from "./skill-library.model";

// skill-library.mapper imports CollectionEntry<"skillsLibrary"> only as a type,
// so we can pass a plain object cast to that shape without needing the Astro runtime.

type FakeEntry = {
	id: string;
	data: { name: string; icon: string };
};

function makeEntry(overrides: Partial<FakeEntry> = {}): FakeEntry {
	return {
		id: "typescript",
		data: { name: "TypeScript", icon: "ts-icon" },
		...overrides,
	};
}

describe("toSkill", () => {
	it("maps id, name, and icon from the entry", () => {
		// biome-ignore lint/suspicious/noExplicitAny: test-only cast
		const result: Skill = toSkill(makeEntry() as any);

		expect(result.id).toBe("typescript");
		expect(result.name).toBe("TypeScript");
		expect(result.icon).toBe("ts-icon");
	});

	it("handles entries with different values", () => {
		const result = toSkill(
			makeEntry({
				id: "react",
				data: { name: "React", icon: "react-icon" },
			}) as any,
		);

		expect(result).toEqual({ id: "react", name: "React", icon: "react-icon" });
	});
});

describe("toSkills", () => {
	it("resolves to an empty array when given no entries", async () => {
		const result = await toSkills([]);
		expect(result).toEqual([]);
	});

	it("maps all entries to Skill models", async () => {
		const entries = [
			makeEntry({ id: "ts", data: { name: "TypeScript", icon: "ts" } }),
			makeEntry({ id: "go", data: { name: "Go", icon: "go" } }),
		];
		// biome-ignore lint/suspicious/noExplicitAny: test-only cast
		const result = await toSkills(entries as any);

		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({ id: "ts", name: "TypeScript", icon: "ts" });
		expect(result[1]).toEqual({ id: "go", name: "Go", icon: "go" });
	});
});
