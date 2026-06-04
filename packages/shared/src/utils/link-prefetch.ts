/**
 * Intelligent link prefetching utility
 * Preloads pages when users hover over important links for faster navigation
 */

interface NetworkInformation {
	effectiveType?: string;
	saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
	connection?: NetworkInformation;
}

interface PrefetchOptions {
	/**
	 * Delay before starting prefetch (ms)
	 * Prevents prefetching on accidental hovers
	 */
	hoverDelay?: number;

	/**
	 * Selector for links to prefetch
	 * Default: internal navigation links
	 */
	selector?: string;

	/**
	 * Maximum concurrent prefetches
	 */
	maxConcurrent?: number;

	/**
	 * Prefetch on touchstart for mobile
	 */
	prefetchOnTouch?: boolean;

	/**
	 * Prefetch priority
	 */
	priority?: "high" | "low" | "auto";
}

interface PrefetchState {
	prefetched: Set<string>;
	pending: Set<string>;
	hoverTimers: Map<string, number>;
	activeRequests: number;
}

const DEFAULT_OPTIONS: Required<PrefetchOptions> = {
	hoverDelay: 100,
	selector: 'a[href^="/"]',
	maxConcurrent: 3,
	prefetchOnTouch: true,
	priority: "low",
};

const state: PrefetchState = {
	prefetched: new Set(),
	pending: new Set(),
	hoverTimers: new Map(),
	activeRequests: 0,
};

/**
 * Checks if URL should be prefetched
 */
function shouldPrefetch(url: string): boolean {
	// Skip if already prefetched or pending
	if (state.prefetched.has(url) || state.pending.has(url)) {
		return false;
	}

	// Skip external links
	if (url.startsWith("http") && !url.startsWith(window.location.origin)) {
		return false;
	}

	// Skip anchors on same page
	const urlObj = new URL(url, window.location.origin);
	if (urlObj.pathname === window.location.pathname && urlObj.hash) {
		return false;
	}

	// Skip mailto, tel, etc.
	if (url.startsWith("mailto:") || url.startsWith("tel:")) {
		return false;
	}

	return true;
}

/**
 * Checks if user has data saver enabled
 */
function hasDataSaver(): boolean {
	// Check for Save-Data header support
	if ("connection" in navigator) {
		const conn = (navigator as NavigatorWithConnection).connection;
		if (conn?.saveData) {
			return true;
		}
	}
	return false;
}

/**
 * Checks if connection is slow
 */
function isSlowConnection(): boolean {
	if ("connection" in navigator) {
		const conn = (navigator as NavigatorWithConnection).connection;
		// 2g or slow-2g
		if (conn?.effectiveType && ["slow-2g", "2g"].includes(conn.effectiveType)) {
			return true;
		}
	}
	return false;
}

/**
 * Prefetches a URL using the appropriate method
 */
async function prefetchUrl(
	url: string,
	priority: "high" | "low" | "auto" = "low",
): Promise<void> {
	if (!shouldPrefetch(url)) {
		return;
	}

	state.pending.add(url);
	state.activeRequests++;

	try {
		// Use Speculation Rules API if available (Chrome 109+)
		if (
			"supports" in HTMLScriptElement &&
			HTMLScriptElement.supports("speculationrules")
		) {
			const script = document.createElement("script");
			script.type = "speculationrules";
			script.textContent = JSON.stringify({
				prefetch: [
					{
						source: "list",
						urls: [url],
						eagerness: priority === "high" ? "eager" : "moderate",
					},
				],
			});
			document.head.appendChild(script);
		}
		// Fallback to link prefetch
		else {
			const link = document.createElement("link");
			link.rel = "prefetch";
			link.href = url;
			link.as = "document";

			if (priority === "high") {
				link.setAttribute("importance", "high");
			}

			document.head.appendChild(link);
		}

		state.prefetched.add(url);
	} catch (error) {
		console.warn(`Failed to prefetch ${url}:`, error);
	} finally {
		state.pending.delete(url);
		state.activeRequests--;
	}
}

/**
 * Handles link hover event
 */
function handleLinkHover(
	event: MouseEvent,
	options: Required<PrefetchOptions>,
): void {
	const link = (event.target as HTMLElement).closest("a");
	if (!link) return;

	const href = link.getAttribute("href");
	if (!href) return;

	const url = new URL(href, window.location.origin).href;

	// Clear any existing timer for this URL
	const existingTimer = state.hoverTimers.get(url);
	if (existingTimer) {
		clearTimeout(existingTimer);
	}

	// Set new timer
	const timer = window.setTimeout(() => {
		// Check concurrent limit
		if (state.activeRequests >= options.maxConcurrent) {
			return;
		}

		// Determine priority based on link attributes
		let priority: "high" | "low" | "auto" = options.priority;
		if (link.dataset.prefetchPriority) {
			priority = link.dataset.prefetchPriority as "high" | "low" | "auto";
		}

		prefetchUrl(url, priority);
		state.hoverTimers.delete(url);
	}, options.hoverDelay);

	state.hoverTimers.set(url, timer);
}

/**
 * Handles link hover end
 */
function handleLinkHoverEnd(event: MouseEvent): void {
	const link = (event.target as HTMLElement).closest("a");
	if (!link) return;

	const href = link.getAttribute("href");
	if (!href) return;

	const url = new URL(href, window.location.origin).href;
	const timer = state.hoverTimers.get(url);

	if (timer) {
		clearTimeout(timer);
		state.hoverTimers.delete(url);
	}
}

/**
 * Handles touch start for mobile prefetching
 */
function handleTouchStart(
	event: TouchEvent,
	options: Required<PrefetchOptions>,
): void {
	if (!options.prefetchOnTouch) return;

	const link = (event.target as HTMLElement).closest("a");
	if (!link) return;

	const href = link.getAttribute("href");
	if (!href) return;

	const url = new URL(href, window.location.origin).href;

	// Check concurrent limit
	if (state.activeRequests >= options.maxConcurrent) {
		return;
	}

	// Immediate prefetch on touch (no delay)
	prefetchUrl(url, "high");
}

/**
 * Initializes link prefetching
 */
export function initLinkPrefetch(options: PrefetchOptions = {}): () => void {
	const opts = { ...DEFAULT_OPTIONS, ...options };

	// Skip if data saver is enabled
	if (hasDataSaver()) {
		console.info("[Prefetch] Data saver enabled, skipping prefetch");
		return () => {};
	}

	// Skip if connection is slow
	if (isSlowConnection()) {
		console.info("[Prefetch] Slow connection detected, skipping prefetch");
		return () => {};
	}

	// Event handlers
	const handleMouseOver = (e: MouseEvent) => handleLinkHover(e, opts);
	const handleMouseOut = (e: MouseEvent) => handleLinkHoverEnd(e);
	const handleTouch = (e: TouchEvent) => handleTouchStart(e, opts);

	// Attach listeners with delegation
	document.addEventListener("mouseover", handleMouseOver, { passive: true });
	document.addEventListener("mouseout", handleMouseOut, { passive: true });

	if (opts.prefetchOnTouch) {
		document.addEventListener("touchstart", handleTouch, { passive: true });
	}

	// Cleanup function
	return () => {
		document.removeEventListener("mouseover", handleMouseOver);
		document.removeEventListener("mouseout", handleMouseOut);
		document.removeEventListener("touchstart", handleTouch);

		// Clear all pending timers
		state.hoverTimers.forEach((timer) => {
			clearTimeout(timer);
		});
		state.hoverTimers.clear();
	};
}

/**
 * Manually prefetch a URL
 */
export function prefetch(
	url: string,
	priority?: "high" | "low" | "auto",
): void {
	prefetchUrl(url, priority);
}

/**
 * Get prefetch statistics
 */
export function getPrefetchStats() {
	return {
		prefetched: state.prefetched.size,
		pending: state.pending.size,
		active: state.activeRequests,
	};
}
