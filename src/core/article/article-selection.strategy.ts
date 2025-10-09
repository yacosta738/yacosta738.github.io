import type Article from "@/core/article/article.model";

// Strategy interface
/**
 * Interface defining a strategy for selecting a subset of articles from a collection.
 *
 * Each implementation of this interface provides a different algorithm for selecting articles.
 */
export interface ArticleSelectionStrategy {
	select(articles: Article[], count: number): Article[];
}

// Concrete strategy: Position-based selection (original order)
/**
 * Implements the ArticleSelectionStrategy interface to select articles based on their original position.
 *
 * This strategy preserves the original order of articles and limits the selection to the specified count.
 * It simply returns a slice of the input array from index 0 to the requested count.
 *
 * @implements {ArticleSelectionStrategy}
 */
export class PositionSelectionStrategy implements ArticleSelectionStrategy {
	select(articles: Article[], count: number): Article[] {
		// Simply return the articles in their original order
		return articles.slice(0, count);
	}
}

// Concrete strategy: Newest-first selection
export class NewestSelectionStrategy implements ArticleSelectionStrategy {
	select(articles: Article[], count: number): Article[] {
		// Sort by date, newest first
		return [...articles]
			.sort((a, b) => {
				const dateA = a.date ? new Date(a.date) : new Date(0);
				const dateB = b.date ? new Date(b.date) : new Date(0);
				return dateB.getTime() - dateA.getTime();
			})
			.slice(0, count);
	}
}

// Concrete strategy: Random selection
export class RandomSelectionStrategy implements ArticleSelectionStrategy {
	select(articles: Article[], count: number): Article[] {
		const shuffled = [...articles];
		// Fisher-Yates shuffle algorithm
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled.slice(0, count);
	}
}
export type SortingStrategy = "newest" | "position" | "random";
// Factory to get the appropriate strategy
export function getSelectionStrategy(
	strategy: SortingStrategy,
): ArticleSelectionStrategy {
	switch (strategy) {
		case "newest":
			return new NewestSelectionStrategy();
		case "random":
			return new RandomSelectionStrategy();
		default:
			return new PositionSelectionStrategy();
	}
}
