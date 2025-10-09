import { beforeEach, describe, expect, it } from "vitest";
import { generateMockArticle } from "@/utils/test/article.generator.mock";
import type Article from "../article.model";
import {
	getSelectionStrategy,
	NewestSelectionStrategy,
	PositionSelectionStrategy,
	RandomSelectionStrategy,
} from "../article-selection.strategy";

describe("ArticleSelectionStrategy", () => {
	let testArticles: Article[];

	beforeEach(() => {
		// Create test articles with consistent IDs and dates for predictable testing
		testArticles = [
			generateMockArticle({ id: "article-1", date: new Date("2023-01-01") }),
			generateMockArticle({ id: "article-2", date: new Date("2023-02-01") }),
			generateMockArticle({ id: "article-3", date: new Date("2023-03-01") }),
			generateMockArticle({ id: "article-4", date: new Date("2023-04-01") }),
			generateMockArticle({ id: "article-5", date: new Date("2023-05-01") }),
		];
	});

	describe("PositionSelectionStrategy", () => {
		it("should return articles in original order", () => {
			// Arrange
			const strategy = new PositionSelectionStrategy();

			// Act
			const result = strategy.select(testArticles, 3);

			// Assert
			expect(result).toEqual(testArticles.slice(0, 3));
			expect(result.length).toBe(3);
			expect(result[0].id).toBe("article-1");
			expect(result[1].id).toBe("article-2");
			expect(result[2].id).toBe("article-3");
		});

		it("should handle count larger than array length", () => {
			// Arrange
			const strategy = new PositionSelectionStrategy();

			// Act
			const result = strategy.select(testArticles, 10);

			// Assert
			expect(result).toEqual(testArticles);
			expect(result.length).toBe(testArticles.length);
		});
	});

	describe("NewestSelectionStrategy", () => {
		it("should sort articles by date, newest first", () => {
			// Arrange
			const strategy = new NewestSelectionStrategy();

			// Act
			const result = strategy.select(testArticles, 3);

			// Assert
			expect(result.length).toBe(3);
			expect(result[0].id).toBe("article-5"); // Most recent
			expect(result[1].id).toBe("article-4");
			expect(result[2].id).toBe("article-3");
		});

		it("should handle articles with missing dates", () => {
			// Arrange
			const strategy = new NewestSelectionStrategy();
			const articlesWithMissingDates: Article[] = [
				generateMockArticle({
					id: "article-no-date",
					date: undefined as unknown as Date,
				}),
				generateMockArticle({
					id: "article-older",
					date: new Date("2022-01-01"),
				}),
				generateMockArticle({
					id: "article-newest",
					date: new Date("2023-01-01"),
				}),
			];

			// Act
			const result = strategy.select(articlesWithMissingDates, 3);

			// Assert
			expect(result.length).toBe(3);
			expect(result[0].id).toBe("article-newest"); // Most recent
			expect(result[1].id).toBe("article-older");
			// Articles with no date should be last
			expect(result[2].id).toBe("article-no-date");
		});
	});

	describe("RandomSelectionStrategy", () => {
		it("should return the requested number of articles", () => {
			// Arrange
			const strategy = new RandomSelectionStrategy();

			// Act
			const result = strategy.select(testArticles, 2);

			// Assert
			expect(result.length).toBe(2);
			// We can't test the exact items due to randomness, but we can check they're from the original array
			expect(
				testArticles.some((article) => article.id === result[0].id),
			).toBeTruthy();
			expect(
				testArticles.some((article) => article.id === result[1].id),
			).toBeTruthy();
		});
	});

	describe("getSelectionStrategy", () => {
		it("should return NewestSelectionStrategy for 'newest'", () => {
			const strategy = getSelectionStrategy("newest");
			expect(strategy).toBeInstanceOf(NewestSelectionStrategy);
		});

		it("should return RandomSelectionStrategy for 'random'", () => {
			const strategy = getSelectionStrategy("random");
			expect(strategy).toBeInstanceOf(RandomSelectionStrategy);
		});

		it("should return PositionSelectionStrategy for 'position'", () => {
			const strategy = getSelectionStrategy("position");
			expect(strategy).toBeInstanceOf(PositionSelectionStrategy);
		});

		it("should return PositionSelectionStrategy as default", () => {
			// @ts-expect-error - Testing invalid input
			const strategy = getSelectionStrategy("invalid");
			expect(strategy).toBeInstanceOf(PositionSelectionStrategy);
		});
	});
});
