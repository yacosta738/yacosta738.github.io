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
	/**
	 * Create a new RandomSelectionStrategy.
	 * @param rng Optional RNG function that accepts a positive integer n and returns
	 * an integer in the range [0, n). By default this uses Math.random().
	 *
	 * Notes on safety: Math.random() is a non-cryptographic PRNG and is acceptable
	 * for UI-level randomness such as shuffling articles for display. It should
	 * NOT be used where cryptographic unpredictability is required (for example,
	 * for session tokens, authentication, or security-sensitive randomness).
	 *
	 * If you need a cryptographically secure RNG, pass one in. In Node you can
	 * use `randomInt` from the built-in `crypto` module, for example:
	 *
	 *   import { randomInt } from 'crypto';
	 *   const strategy = new RandomSelectionStrategy((n) => randomInt(0, n));
	 *
	 * Tests can also inject a deterministic RNG for reproducibility.
	 */
	constructor(private rng?: (n: number) => number) {}

	select(articles: Article[], count: number): Article[] {
		const rng = this.rng ?? ((n: number) => Math.floor(Math.random() * n));
		const shuffled = [...articles];
		// Fisher-Yates shuffle algorithm using the provided RNG to pick indices
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = rng(i + 1);
			// Ensure j is an integer within [0, i]
			const jj = Math.max(0, Math.min(i, Math.floor(j)));
			[shuffled[i], shuffled[jj]] = [shuffled[jj], shuffled[i]];
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
