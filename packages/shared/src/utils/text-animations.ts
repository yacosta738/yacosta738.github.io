/**
 * Text Animation Utilities using Web Animations API (WAAPI)
 * Based on animate-text skill catalog with professional effects
 */

interface AnimationConfig {
	duration: number;
	stagger: number;
	easing: string;
	from: Record<string, number>;
	to: Record<string, number>;
}

interface RuntimeConfig {
	speedMultiplier: number;
	yTravelMultiplier: number;
	initialDelayRange: [number, number];
}

const DEFAULT_RUNTIME: RuntimeConfig = {
	speedMultiplier: 0.68,
	yTravelMultiplier: 0.5,
	initialDelayRange: [0, 140],
};

const DEFAULT_OBSERVER_OPTIONS: IntersectionObserverInit = {
	threshold: 0.1,
	rootMargin: "0px 0px -10% 0px",
};

/**
 * Creates transform string from animation frame
 */
function createTransform(
	x = 0,
	y = 0,
	z = 0,
	scale = 1,
	yMultiplier = 0.58,
): string {
	const adjustedY = y * yMultiplier;
	return `translate3d(${x}px, ${adjustedY}px, ${z}px) scale(${scale})`;
}

/**
 * Splits text into animated units based on target type
 */
function splitText(
	text: string,
	target: "whole" | "per-character" | "per-word" | "per-line",
): string[] {
	switch (target) {
		case "whole":
			return [text];
		case "per-character":
			return Array.from(text);
		case "per-word":
			// Split by words and whitespace, but only animate non-whitespace
			return text.match(/(\S+|\s+)/g) || [];
		case "per-line":
			return text.split("\n");
		default:
			return [text];
	}
}

/**
 * Checks if unit should be animated (skip whitespace for per-word)
 */
function shouldAnimate(unit: string, target: string): boolean {
	if (target === "per-word") {
		return /\S/.test(unit);
	}
	return true;
}

/**
 * Wraps text in animation-ready spans
 */
function wrapTextUnits(
	element: HTMLElement,
	target: "whole" | "per-character" | "per-word" | "per-line",
): HTMLElement[] {
	const text = element.textContent || "";
	const units = splitText(text, target);

	element.innerHTML = "";
	const wrappedUnits: HTMLElement[] = [];

	units.forEach((unit) => {
		const span = document.createElement("span");
		span.className = "text-animation-unit";
		span.textContent = unit;

		// Style based on target
		span.style.display = target === "per-line" ? "block" : "inline-block";
		span.style.whiteSpace = "pre";
		span.style.backfaceVisibility = "hidden";
		span.style.transformOrigin = "50% 55%";
		span.style.willChange = "transform, opacity";

		element.appendChild(span);

		if (shouldAnimate(unit, target)) {
			wrappedUnits.push(span);
		}
	});

	return wrappedUnits;
}

/**
 * Applies initial animation state to elements
 */
function applyInitialState(
	elements: HTMLElement[],
	config: AnimationConfig,
	runtime: RuntimeConfig,
): void {
	elements.forEach((el) => {
		el.style.opacity = String(config.from.opacity ?? 1);
		el.style.transform = createTransform(
			config.from.x_px,
			config.from.y_px,
			config.from.z_px,
			config.from.scale,
			runtime.yTravelMultiplier,
		);
	});
}

/**
 * Soft Blur In - Per-character fade with gentle blur and upward motion
 * Apple's signature hero-title reveal
 */
export async function softBlurIn(
	element: HTMLElement,
	runtime: RuntimeConfig = DEFAULT_RUNTIME,
): Promise<void> {
	const config: AnimationConfig = {
		duration: 900 * runtime.speedMultiplier,
		stagger: 25 * runtime.speedMultiplier,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		from: { opacity: 0, y_px: 16 },
		to: { opacity: 1, y_px: 0 },
	};

	const units = wrapTextUnits(element, "per-character");
	applyInitialState(units, config, runtime);

	// Random initial delay
	const [min, max] = runtime.initialDelayRange;
	const initialDelay = Math.random() * (max - min) + min;

	await new Promise((resolve) => setTimeout(resolve, initialDelay));

	const animations = units.map((unit, index) => {
		const delay = index * config.stagger;

		return unit.animate(
			[
				{
					opacity: config.from.opacity,
					transform: createTransform(
						0,
						config.from.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
				{
					opacity: config.to.opacity,
					transform: createTransform(
						0,
						config.to.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
			],
			{
				delay,
				duration: config.duration,
				easing: config.easing,
				fill: "forwards",
			},
		);
	});

	await Promise.all(animations.map((anim) => anim.finished));
}

/**
 * Micro Scale Fade - Calm, tiny scale pop for labels and headings
 * Subtle premium polish
 */
export async function microScaleFade(
	element: HTMLElement,
	runtime: RuntimeConfig = DEFAULT_RUNTIME,
): Promise<void> {
	const config: AnimationConfig = {
		duration: 600 * runtime.speedMultiplier,
		stagger: 0,
		easing: "cubic-bezier(0.32, 0.72, 0, 1)",
		from: { opacity: 0, scale: 0.96 },
		to: { opacity: 1, scale: 1 },
	};

	const units = wrapTextUnits(element, "whole");
	applyInitialState(units, config, runtime);

	const [min, max] = runtime.initialDelayRange;
	const initialDelay = Math.random() * (max - min) + min;

	await new Promise((resolve) => setTimeout(resolve, initialDelay));

	const animations = units.map((unit) => {
		return unit.animate(
			[
				{
					opacity: config.from.opacity,
					transform: createTransform(
						0,
						0,
						0,
						config.from.scale,
						runtime.yTravelMultiplier,
					),
				},
				{
					opacity: config.to.opacity,
					transform: createTransform(
						0,
						0,
						0,
						config.to.scale,
						runtime.yTravelMultiplier,
					),
				},
			],
			{
				duration: config.duration,
				easing: config.easing,
				fill: "forwards",
			},
		);
	});

	await Promise.all(animations.map((anim) => anim.finished));
}

/**
 * Per-Word Crossfade - Words fade in one after another with vertical drift
 * Calm keynote rhythm for headings
 */
export async function perWordCrossfade(
	element: HTMLElement,
	runtime: RuntimeConfig = DEFAULT_RUNTIME,
): Promise<void> {
	const config: AnimationConfig = {
		duration: 700 * runtime.speedMultiplier,
		stagger: 70 * runtime.speedMultiplier,
		easing: "cubic-bezier(0.16, 1, 0.3, 1)",
		from: { opacity: 0, y_px: 8 },
		to: { opacity: 1, y_px: 0 },
	};

	const units = wrapTextUnits(element, "per-word");
	applyInitialState(units, config, runtime);

	const [min, max] = runtime.initialDelayRange;
	const initialDelay = Math.random() * (max - min) + min;

	await new Promise((resolve) => setTimeout(resolve, initialDelay));

	const animations = units.map((unit, index) => {
		const delay = index * config.stagger;

		return unit.animate(
			[
				{
					opacity: config.from.opacity,
					transform: createTransform(
						0,
						config.from.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
				{
					opacity: config.to.opacity,
					transform: createTransform(
						0,
						config.to.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
			],
			{
				delay,
				duration: config.duration,
				easing: config.easing,
				fill: "forwards",
			},
		);
	});

	await Promise.all(animations.map((anim) => anim.finished));
}

/**
 * Per-Character Rise - Letters slide up from below with no blur
 * Apple's clean tvOS-style reveal
 */
export async function perCharacterRise(
	element: HTMLElement,
	runtime: RuntimeConfig = DEFAULT_RUNTIME,
): Promise<void> {
	const config: AnimationConfig = {
		duration: 700 * runtime.speedMultiplier,
		stagger: 24 * runtime.speedMultiplier,
		easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
		from: { opacity: 0, y_px: 32 },
		to: { opacity: 1, y_px: 0 },
	};

	const units = wrapTextUnits(element, "per-character");
	applyInitialState(units, config, runtime);

	const [min, max] = runtime.initialDelayRange;
	const initialDelay = Math.random() * (max - min) + min;

	await new Promise((resolve) => setTimeout(resolve, initialDelay));

	const animations = units.map((unit, index) => {
		const delay = index * config.stagger;

		return unit.animate(
			[
				{
					opacity: config.from.opacity,
					transform: createTransform(
						0,
						config.from.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
				{
					opacity: config.to.opacity,
					transform: createTransform(
						0,
						config.to.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
			],
			{
				delay,
				duration: config.duration,
				easing: config.easing,
				fill: "forwards",
			},
		);
	});

	await Promise.all(animations.map((anim) => anim.finished));
}

/**
 * Spring Scale In - Words pop in with soft overshoot scale
 * iOS app icons bouncing into home screen
 */
export async function springScaleIn(
	element: HTMLElement,
	runtime: RuntimeConfig = DEFAULT_RUNTIME,
): Promise<void> {
	const config: AnimationConfig = {
		duration: 360 * runtime.speedMultiplier,
		stagger: 95 * runtime.speedMultiplier,
		easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
		from: { opacity: 0, scale: 0.7 },
		to: { opacity: 1, scale: 1 },
	};

	const units = wrapTextUnits(element, "per-word");
	applyInitialState(units, config, runtime);

	const [min, max] = runtime.initialDelayRange;
	const initialDelay = Math.random() * (max - min) + min;

	await new Promise((resolve) => setTimeout(resolve, initialDelay));

	const animations = units.map((unit, index) => {
		const delay = index * config.stagger;

		return unit.animate(
			[
				{
					opacity: config.from.opacity,
					transform: createTransform(
						0,
						0,
						0,
						config.from.scale,
						runtime.yTravelMultiplier,
					),
				},
				{
					opacity: config.to.opacity,
					transform: createTransform(
						0,
						0,
						0,
						config.to.scale,
						runtime.yTravelMultiplier,
					),
				},
			],
			{
				delay,
				duration: config.duration,
				easing: config.easing,
				fill: "forwards",
			},
		);
	});

	await Promise.all(animations.map((anim) => anim.finished));
}

/**
 * Line-by-Line Slide - Each line enters from left with staggered slide
 * Apple landing page subheads
 */
export async function lineByLineSlide(
	element: HTMLElement,
	runtime: RuntimeConfig = DEFAULT_RUNTIME,
): Promise<void> {
	const config: AnimationConfig = {
		duration: 900 * runtime.speedMultiplier,
		stagger: 120 * runtime.speedMultiplier,
		easing: "cubic-bezier(0.22, 1, 0.36, 1)",
		from: { opacity: 0, x_px: -48 },
		to: { opacity: 1, x_px: 0 },
	};

	const units = wrapTextUnits(element, "per-line");
	applyInitialState(units, config, runtime);

	const [min, max] = runtime.initialDelayRange;
	const initialDelay = Math.random() * (max - min) + min;

	await new Promise((resolve) => setTimeout(resolve, initialDelay));

	const animations = units.map((unit, index) => {
		const delay = index * config.stagger;

		return unit.animate(
			[
				{
					opacity: config.from.opacity,
					transform: createTransform(
						config.from.x_px,
						0,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
				{
					opacity: config.to.opacity,
					transform: createTransform(
						config.to.x_px,
						0,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
			],
			{
				delay,
				duration: config.duration,
				easing: config.easing,
				fill: "forwards",
			},
		);
	});

	await Promise.all(animations.map((anim) => anim.finished));
}

/**
 * Bottom-Up Letters - Letters rise from below in pronounced staircase
 * Zero blur, one symbol at a time
 */
export async function bottomUpLetters(
	element: HTMLElement,
	runtime: RuntimeConfig = DEFAULT_RUNTIME,
): Promise<void> {
	const config: AnimationConfig = {
		duration: 600 * runtime.speedMultiplier,
		stagger: 35 * runtime.speedMultiplier,
		easing: "cubic-bezier(0.16, 1, 0.3, 1)",
		from: { opacity: 0, y_px: 48 },
		to: { opacity: 1, y_px: 0 },
	};

	const units = wrapTextUnits(element, "per-character");
	applyInitialState(units, config, runtime);

	const [min, max] = runtime.initialDelayRange;
	const initialDelay = Math.random() * (max - min) + min;

	await new Promise((resolve) => setTimeout(resolve, initialDelay));

	const animations = units.map((unit, index) => {
		const delay = index * config.stagger;

		return unit.animate(
			[
				{
					opacity: config.from.opacity,
					transform: createTransform(
						0,
						config.from.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
				{
					opacity: config.to.opacity,
					transform: createTransform(
						0,
						config.to.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
			],
			{
				delay,
				duration: config.duration,
				easing: config.easing,
				fill: "forwards",
			},
		);
	});

	await Promise.all(animations.map((anim) => anim.finished));
}

/**
 * Mask Reveal Up - Lines reveal upward with soft masked feel
 */
export async function maskRevealUp(
	element: HTMLElement,
	runtime: RuntimeConfig = DEFAULT_RUNTIME,
): Promise<void> {
	const config: AnimationConfig = {
		duration: 800 * runtime.speedMultiplier,
		stagger: 90 * runtime.speedMultiplier,
		easing: "cubic-bezier(0.16, 1, 0.3, 1)",
		from: { opacity: 0, y_px: 24 },
		to: { opacity: 1, y_px: 0 },
	};

	const units = wrapTextUnits(element, "per-line");

	// Add overflow hidden to parent for mask effect
	element.style.overflow = "hidden";

	applyInitialState(units, config, runtime);

	const [min, max] = runtime.initialDelayRange;
	const initialDelay = Math.random() * (max - min) + min;

	await new Promise((resolve) => setTimeout(resolve, initialDelay));

	const animations = units.map((unit, index) => {
		const delay = index * config.stagger;

		return unit.animate(
			[
				{
					opacity: config.from.opacity,
					transform: createTransform(
						0,
						config.from.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
				{
					opacity: config.to.opacity,
					transform: createTransform(
						0,
						config.to.y_px,
						0,
						1,
						runtime.yTravelMultiplier,
					),
				},
			],
			{
				delay,
				duration: config.duration,
				easing: config.easing,
				fill: "forwards",
			},
		);
	});

	await Promise.all(animations.map((anim) => anim.finished));
}

/**
 * Observes elements and triggers animation when they enter viewport
 */
export function observeAndAnimate(
	selector: string,
	animationFn: (el: HTMLElement) => Promise<void>,
	options: IntersectionObserverInit = DEFAULT_OBSERVER_OPTIONS,
): () => void {
	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	if (prefersReducedMotion) {
		// Skip animations but still make elements visible
		const elements = document.querySelectorAll<HTMLElement>(selector);
		elements.forEach((el) => {
			el.classList.add("text-animation--initialized");
		});
		return () => {};
	}

	const elements = document.querySelectorAll<HTMLElement>(selector);
	const animated = new WeakSet<HTMLElement>();

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !animated.has(entry.target as HTMLElement)) {
				const element = entry.target as HTMLElement;
				animated.add(element);
				element.classList.add("text-animation--initialized");
				observer.unobserve(element);
				animationFn(element).catch(console.error);
			}
		});
	}, options);

	elements.forEach((el) => {
		observer.observe(el);
	});

	// Return cleanup function
	return () => {
		observer.disconnect();
	};
}
