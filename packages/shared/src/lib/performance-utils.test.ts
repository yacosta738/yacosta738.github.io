import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	batchDOMOperations,
	batchStyleUpdates,
	createManagedResizeObserver,
	createThrottledScrollHandler,
	DimensionCache,
	debounceResize,
	isElementVisible,
	rafThrottle,
} from "./performance-utils";

// Mock requestAnimationFrame / cancelAnimationFrame
let rafCallbacks: Array<FrameRequestCallback> = [];
let rafIdCounter = 1;
let rafMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
	rafCallbacks = [];
	rafIdCounter = 1;
	rafMock = vi.fn((cb: FrameRequestCallback) => {
		rafCallbacks.push(cb);
		return rafIdCounter++;
	});
	// Only fake setTimeout/setInterval — do NOT fake requestAnimationFrame
	// (we manage RAF ourselves via rafMock)
	vi.useFakeTimers({
		toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"],
	});
	vi.stubGlobal("requestAnimationFrame", rafMock);
	vi.stubGlobal("cancelAnimationFrame", vi.fn());
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

function flushRaf() {
	const cbs = [...rafCallbacks];
	rafCallbacks = [];
	for (const cb of cbs) {
		cb(performance.now());
	}
}

// Helper to create a mock Element-like object (no real DOM needed)
function mockElement(overrides: Record<string, unknown> = {}): Element {
	return {
		parentElement: null,
		classList: { contains: vi.fn(() => false) },
		style: {},
		...overrides,
	} as unknown as Element;
}

function mockHTMLElement(overrides: Record<string, unknown> = {}): HTMLElement {
	return {
		parentElement: {},
		classList: { contains: vi.fn(() => false) },
		style: {} as CSSStyleDeclaration,
		...overrides,
	} as unknown as HTMLElement;
}

describe("rafThrottle", () => {
	it("calls the function on the next animation frame", () => {
		const fn = vi.fn();
		const throttled = rafThrottle(fn);
		throttled("a", "b");
		expect(fn).not.toHaveBeenCalled();
		flushRaf();
		expect(fn).toHaveBeenCalledWith("a", "b");
	});

	it("ignores subsequent calls until the frame fires", () => {
		const fn = vi.fn();
		const throttled = rafThrottle(fn);
		throttled("first");
		throttled("second");
		throttled("third");
		flushRaf();
		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith("first");
	});

	it("allows a new call after the frame fires", () => {
		const fn = vi.fn();
		const throttled = rafThrottle(fn);
		throttled("a");
		flushRaf();
		throttled("b");
		flushRaf();
		expect(fn).toHaveBeenCalledTimes(2);
	});
});

describe("batchDOMOperations", () => {
	it("executes all reads before all writes", () => {
		const order: string[] = [];
		batchDOMOperations({
			reads: [() => order.push("read1"), () => order.push("read2")],
			writes: [() => order.push("write1"), () => order.push("write2")],
		});
		expect(order).toEqual(["read1", "read2", "write1", "write2"]);
	});

	it("handles empty arrays", () => {
		expect(() => batchDOMOperations({ reads: [], writes: [] })).not.toThrow();
	});
});

describe("DimensionCache", () => {
	it("returns null for uncached elements", () => {
		const cache = new DimensionCache();
		const el = mockElement();
		expect(cache.get(el)).toBeNull();
	});

	it("stores and retrieves dimensions", () => {
		const cache = new DimensionCache(1000);
		const el = mockElement();
		cache.set(el, { width: 100, height: 50 });
		expect(cache.get(el)).toEqual({ width: 100, height: 50 });
	});

	it("returns null after TTL expires", () => {
		const cache = new DimensionCache(50);
		const el = mockElement();
		cache.set(el, { width: 10, height: 20 });

		// Mock performance.now to simulate time passing
		const startTime = performance.now();
		const spy = vi.spyOn(performance, "now").mockReturnValue(startTime + 100);

		try {
			expect(cache.get(el)).toBeNull();
		} finally {
			spy.mockRestore();
		}
	});

	it("invalidates a specific element", () => {
		const cache = new DimensionCache(10000);
		const el = mockElement();
		cache.set(el, { width: 1, height: 2 });
		cache.invalidate(el);
		expect(cache.get(el)).toBeNull();
	});

	it("clears all cached entries", () => {
		const cache = new DimensionCache(10000);
		const el1 = mockElement();
		const el2 = mockElement();
		cache.set(el1, { width: 1, height: 1 });
		cache.set(el2, { width: 2, height: 2 });
		cache.clear();
		expect(cache.get(el1)).toBeNull();
		expect(cache.get(el2)).toBeNull();
	});

	it("uses default TTL of 100ms", () => {
		const cache = new DimensionCache();
		const el = mockElement();
		cache.set(el, { width: 5, height: 5 });
		expect(cache.get(el)).toEqual({ width: 5, height: 5 });
	});
});

describe("debounceResize", () => {
	it("calls the callback after the delay", () => {
		const cb = vi.fn();
		const debounced = debounceResize(cb, 200);
		debounced();
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(200);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it("resets the timer on subsequent calls", () => {
		const cb = vi.fn();
		const debounced = debounceResize(cb, 100);
		debounced();
		vi.advanceTimersByTime(50);
		debounced(); // reset
		vi.advanceTimersByTime(50);
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(50);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it("uses default delay of 100ms", () => {
		const cb = vi.fn();
		const debounced = debounceResize(cb);
		debounced();
		vi.advanceTimersByTime(99);
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});
});

describe("createManagedResizeObserver", () => {
	it("returns noop functions when ResizeObserver is unavailable", () => {
		vi.stubGlobal("ResizeObserver", undefined);

		const result = createManagedResizeObserver(vi.fn());
		expect(result.observer).toBeNull();
		expect(() => result.observe(mockElement())).not.toThrow();
		expect(() => result.unobserve(mockElement())).not.toThrow();
		expect(() => result.disconnect()).not.toThrow();
	});

	it("creates a working observer when ResizeObserver exists", () => {
		const mockObserve = vi.fn();
		const mockUnobserve = vi.fn();
		const mockDisconnect = vi.fn();

		// Must be a real class so `new ResizeObserver(...)` works
		class MockResizeObserver {
			observe = mockObserve;
			unobserve = mockUnobserve;
			disconnect = mockDisconnect;
		}
		vi.stubGlobal("ResizeObserver", MockResizeObserver);

		const cb = vi.fn();
		const result = createManagedResizeObserver(cb, { box: "border-box" });
		expect(result.observer).not.toBeNull();

		const el = mockElement();
		result.observe(el);
		expect(mockObserve).toHaveBeenCalledWith(el, { box: "border-box" });

		result.unobserve(el);
		expect(mockUnobserve).toHaveBeenCalledWith(el);

		result.disconnect();
		expect(mockDisconnect).toHaveBeenCalled();
	});
});

describe("batchStyleUpdates", () => {
	it("applies multiple styles at once", () => {
		const el = mockHTMLElement();
		batchStyleUpdates(el, { color: "red", fontSize: "16px" });
		expect((el.style as Record<string, string>).color).toBe("red");
		expect((el.style as Record<string, string>).fontSize).toBe("16px");
	});
});

describe("isElementVisible", () => {
	it("returns false when element has no parent", () => {
		const el = mockElement({ parentElement: null });
		expect(isElementVisible(el)).toBe(false);
	});

	it("returns false when display is none", () => {
		const el = mockHTMLElement({ style: { display: "none" } });
		expect(isElementVisible(el)).toBe(false);
	});

	it("returns false when visibility is hidden", () => {
		const el = mockHTMLElement({ style: { visibility: "hidden" } });
		expect(isElementVisible(el)).toBe(false);
	});

	it("returns false when opacity is 0", () => {
		const el = mockHTMLElement({ style: { opacity: "0" } });
		expect(isElementVisible(el)).toBe(false);
	});

	it("returns false when element has hidden class", () => {
		const el = mockHTMLElement({
			classList: { contains: vi.fn((cls: string) => cls === "hidden") },
		});
		expect(isElementVisible(el)).toBe(false);
	});

	it("returns true for a visible element (computed styles check)", () => {
		const el = mockHTMLElement({ style: {} });
		vi.stubGlobal(
			"getComputedStyle",
			vi.fn(() => ({
				display: "block",
				visibility: "visible",
				opacity: "1",
			})),
		);
		expect(isElementVisible(el)).toBe(true);
	});

	it("returns false when computed display is none", () => {
		const el = mockHTMLElement({ style: {} });
		vi.stubGlobal(
			"getComputedStyle",
			vi.fn(() => ({
				display: "none",
				visibility: "visible",
				opacity: "1",
			})),
		);
		expect(isElementVisible(el)).toBe(false);
	});

	it("returns false when computed visibility is hidden", () => {
		const el = mockHTMLElement({ style: {} });
		vi.stubGlobal(
			"getComputedStyle",
			vi.fn(() => ({
				display: "block",
				visibility: "hidden",
				opacity: "1",
			})),
		);
		expect(isElementVisible(el)).toBe(false);
	});

	it("returns false when computed opacity is 0", () => {
		const el = mockHTMLElement({ style: {} });
		vi.stubGlobal(
			"getComputedStyle",
			vi.fn(() => ({
				display: "block",
				visibility: "visible",
				opacity: "0",
			})),
		);
		expect(isElementVisible(el)).toBe(false);
	});
});

describe("createThrottledScrollHandler", () => {
	it("registers a passive scroll listener and returns cleanup", () => {
		const handler = vi.fn();
		const el = {
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		} as unknown as Element;

		const cleanup = createThrottledScrollHandler(handler, el);

		expect(
			(el as unknown as Record<string, unknown>).addEventListener,
		).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });

		cleanup();
		expect(
			(el as unknown as Record<string, unknown>).removeEventListener,
		).toHaveBeenCalledWith("scroll", expect.any(Function));
	});

	it("throttles scroll events via requestAnimationFrame", () => {
		const handler = vi.fn();
		const listeners: Record<string, EventListener> = {};
		const el = {
			addEventListener: vi.fn(
				(event: string, fn: EventListener, _opts?: unknown) => {
					listeners[event] = fn;
				},
			),
			removeEventListener: vi.fn(),
		} as unknown as Element;

		createThrottledScrollHandler(handler, el);

		const scrollEvent = new Event("scroll");
		listeners.scroll(scrollEvent);

		// requestAnimationFrame should have been called once
		expect(rafMock).toHaveBeenCalledTimes(1);

		listeners.scroll(scrollEvent); // should be ignored (rafId not null)
		expect(rafMock).toHaveBeenCalledTimes(1); // no additional call

		expect(handler).not.toHaveBeenCalled();

		// Flush the RAF callback
		flushRaf();

		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith(scrollEvent);
	});

	it("uses globalThis as default element", () => {
		const addSpy = vi.fn();
		const removeSpy = vi.fn();
		vi.stubGlobal("addEventListener", addSpy);
		vi.stubGlobal("removeEventListener", removeSpy);

		const cleanup = createThrottledScrollHandler(vi.fn());
		expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), {
			passive: true,
		});

		cleanup();
		expect(removeSpy).toHaveBeenCalled();
	});
});
