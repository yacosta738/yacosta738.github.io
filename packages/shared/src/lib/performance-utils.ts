/**
 * Performance utilities to prevent forced reflows and optimize DOM operations
 */

/**
 * Throttle function calls using requestAnimationFrame
 * Ensures function only runs once per frame
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(fn: T): T {
	let rafId: number | null = null;

	const throttled = (...args: Parameters<T>) => {
		if (rafId !== null) return;

		rafId = requestAnimationFrame(() => {
			fn(...args);
			rafId = null;
		});
	};

	return throttled as T;
}

/**
 * Batch DOM reads and writes to prevent forced reflows
 * All reads happen first, then all writes
 */
export function batchDOMOperations(operations: {
	reads: Array<() => unknown>;
	writes: Array<() => void>;
}): void {
	// Perform all reads first
	for (const read of operations.reads) {
		read();
	}

	// Then perform all writes
	for (const write of operations.writes) {
		write();
	}
}

/**
 * Create a dimension cache with automatic invalidation
 */
export class DimensionCache {
	private cache = new WeakMap<
		Element,
		{ width: number; height: number; timestamp: number }
	>();
	private readonly ttl: number;

	constructor(ttlMs = 100) {
		this.ttl = ttlMs;
	}

	get(element: Element): { width: number; height: number } | null {
		const cached = this.cache.get(element);
		if (!cached) return null;

		if (performance.now() - cached.timestamp > this.ttl) {
			this.cache.delete(element);
			return null;
		}

		return { width: cached.width, height: cached.height };
	}

	set(element: Element, dimensions: { width: number; height: number }): void {
		this.cache.set(element, {
			...dimensions,
			timestamp: performance.now(),
		});
	}

	invalidate(element: Element): void {
		this.cache.delete(element);
	}

	clear(): void {
		this.cache = new WeakMap();
	}
}

/**
 * Debounce resize events to avoid excessive recalculations
 */
export function debounceResize(callback: () => void, delay = 100): () => void {
	let timeoutId: number | null = null;

	return () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}

		timeoutId = globalThis.setTimeout(callback, delay);
	};
}

/**
 * Create a ResizeObserver with automatic cleanup
 */
export function createManagedResizeObserver(
	callback: (entries: ResizeObserverEntry[]) => void,
	options?: ResizeObserverOptions,
): {
	observer: ResizeObserver | null;
	observe: (element: Element) => void;
	unobserve: (element: Element) => void;
	disconnect: () => void;
} {
	if (!globalThis.ResizeObserver) {
		// Fallback for browsers without ResizeObserver
		const noop = () => {};
		return {
			observer: null,
			observe: noop,
			unobserve: noop,
			disconnect: noop,
		};
	}

	const observer = new ResizeObserver(callback);

	return {
		observer,
		observe: (element: Element) => observer.observe(element, options),
		unobserve: (element: Element) => observer.unobserve(element),
		disconnect: () => observer.disconnect(),
	};
}

/**
 * Optimize style updates by batching them into a single operation
 */
export function batchStyleUpdates(
	element: HTMLElement,
	styles: Record<string, string>,
): void {
	// Use Object.assign to update multiple styles at once
	// This is more efficient than setting each style individually
	Object.assign(element.style, styles);
}

/**
 * Check if an element is visible without triggering layout
 * Uses faster checks before falling back to computed styles
 */
export function isElementVisible(element: Element): boolean {
	const htmlElement = element as HTMLElement;

	// Fast checks first (no style computation)
	if (!element.parentElement) return false;
	if (htmlElement.style.display === "none") return false;
	if (htmlElement.style.visibility === "hidden") return false;
	if (htmlElement.style.opacity === "0") return false;
	if (element.classList.contains("hidden")) return false;

	// Only compute styles if needed
	const computedStyle = getComputedStyle(element);
	return (
		computedStyle.display !== "none" &&
		computedStyle.visibility !== "hidden" &&
		Number.parseFloat(computedStyle.opacity) > 0
	);
}

/**
 * Scroll event throttling with passive listeners
 */
export function createThrottledScrollHandler(
	handler: (event: Event) => void,
	element: Element | Window = globalThis,
): () => void {
	let rafId: number | null = null;

	const throttledHandler = (event: Event) => {
		if (rafId !== null) return;

		rafId = requestAnimationFrame(() => {
			handler(event);
			rafId = null;
		});
	};

	element.addEventListener("scroll", throttledHandler, { passive: true });

	// Return cleanup function
	return () => {
		element.removeEventListener("scroll", throttledHandler);
	};
}
