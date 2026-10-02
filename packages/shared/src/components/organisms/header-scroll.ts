const CLEANUP_KEY = "__mainHeaderScrollCleanup";
const HIDE_CLASS = "hide";
const SCROLLED_CLASS = "scrolled";
const HIDDEN_CLASS = "is-hidden";
const ANIMATION_CLASSES = [
	"animate-fade-in-down",
	"animate-delay-100",
	"animate-duration-slower",
	"animate-fill-forwards",
];

type HeaderWindow = Window & { [CLEANUP_KEY]?: () => void };

const cleanup = () => {
	const target = window as HeaderWindow;
	target[CLEANUP_KEY]?.();
	target[CLEANUP_KEY] = undefined;
};

const initialize = () => {
	cleanup();
	const header = document.querySelector<HTMLElement>("[data-header-scroll]");
	if (!header) return;

	const scrollThreshold = Number(header.dataset.scrollThreshold);
	const hideThreshold = Number(header.dataset.hideThreshold);
	const mobileMenuButtonBox = document.getElementById(
		header.dataset.drawerMenuButtonBoxId ?? "",
	);
	let lastScrollY = window.scrollY;
	let ticking = false;
	let animationCleaned = false;
	let currentState = "";

	const batchUpdate = (newState: string, shouldHideButton: boolean) => {
		if (currentState === newState) return;
		currentState = newState;
		requestAnimationFrame(() => {
			const { classList } = header;
			switch (newState) {
				case "top":
					classList.remove(HIDE_CLASS, SCROLLED_CLASS);
					break;
				case "visible":
					classList.remove(HIDE_CLASS);
					classList.add(SCROLLED_CLASS);
					break;
				case "hidden":
					classList.add(HIDE_CLASS, SCROLLED_CLASS);
					break;
			}
			mobileMenuButtonBox?.classList.toggle(HIDDEN_CLASS, shouldHideButton);
		});
	};

	const cleanupAnimation = () => {
		if (animationCleaned) return;
		animationCleaned = true;
		requestAnimationFrame(() => {
			ANIMATION_CLASSES.forEach((className) => {
				header.classList.remove(className);
			});
		});
	};

	const updateHeader = () => {
		const y = window.scrollY;
		const delta = y - lastScrollY;
		if (!animationCleaned) cleanupAnimation();

		let newState: string;
		let shouldHideButton: boolean;
		if (y <= scrollThreshold) {
			newState = "top";
			shouldHideButton = false;
		} else if (delta < 0) {
			newState = "visible";
			shouldHideButton = false;
		} else if (delta > 0 && y > hideThreshold) {
			newState = "hidden";
			shouldHideButton = true;
		} else {
			ticking = false;
			return;
		}

		batchUpdate(newState, shouldHideButton);
		lastScrollY = y;
		ticking = false;
	};

	const handleScroll = () => {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(updateHeader);
		}
	};

	window.addEventListener("scroll", handleScroll, { passive: true });
	updateHeader();
	(window as HeaderWindow)[CLEANUP_KEY] = () => {
		window.removeEventListener("scroll", handleScroll);
	};
};

document.addEventListener("astro:page-load", initialize);
document.addEventListener("astro:before-preparation", cleanup);
