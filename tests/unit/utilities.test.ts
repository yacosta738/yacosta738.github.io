import { assert, expect, test } from "vitest";
import { randomInt, urlize } from "../../src/utils/utilities";

test("randomInt", () => {
	const min = 1;
	const max = 10;
	const random = randomInt(min, max);
	expect(random).toBeGreaterThanOrEqual(min);
	expect(random).toBeLessThanOrEqual(max);
	assert.ok(random >= min);
	assert.ok(random <= max);
});

test("urlize", () => {
	const url = urlize("https://vitest.dev");
	expect(url).toBe("https://vitest.dev");
	assert.equal(url, "https://vitest.dev");
});

test("urlize with no protocol", () => {
	const url = urlize("vitest.dev");
	expect(url).toBe("vitest.dev");
	assert.equal(url, "vitest.dev");
});

test("urlize author name", () => {
	const url = urlize("yuniel acosta");
	expect(url).toBe("yuniel-acosta");
	assert.equal(url, "yuniel-acosta");
});
