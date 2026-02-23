export type SocialIcon = Record<string, string | unknown>;

// Theme system types
export type Theme = "light" | "dark";

export interface ThemeSystem {
	toggle: () => void;
	set: (theme: Theme) => void;
	get: () => Theme;
	getStored: () => Theme | null;
	getSystem: () => Theme;
}

export interface OpenGraph {
	url?: string;
	type?: string;
	title?: string;
	description?: string;
	images?: ReadonlyArray<OpenGraphMedia>;
	videos?: ReadonlyArray<OpenGraphMedia>;
	defaultImageHeight?: number;
	defaultImageWidth?: number;
	locale?: string;
	site_name?: string;
	profile?: OpenGraphProfile;
	book?: OpenGraphBook;
	article?: OpenGraphArticle;
	video?: OpenGraphVideo;
}

export interface OpenGraphProfile {
	firstName?: string;
	lastName?: string;
	username?: string;
	gender?: string;
}

export interface OpenGraphBook {
	authors?: ReadonlyArray<string>;
	isbn?: string;
	releaseDate?: string;
	tags?: ReadonlyArray<string>;
}

export interface OpenGraphArticle {
	publishedTime?: string;
	modifiedTime?: string;
	expirationTime?: string;

	authors?: ReadonlyArray<string>;
	section?: string;
	tags?: ReadonlyArray<string>;
}

export interface OpenGraphVideo {
	actors?: ReadonlyArray<OpenGraphVideoActors>;
	directors?: ReadonlyArray<string>;
	writers?: ReadonlyArray<string>;
	duration?: number;
	releaseDate?: string;
	tags?: ReadonlyArray<string>;
	series?: string;
}

// Global theme system API
declare global {
	interface Window {
		themeSystem?: ThemeSystem;
		// Minimal Pagefind UI global (injected by pagefind script at runtime)
		PagefindUI?: {
			// Construct with an options object; methods unknown so keep minimal
			new (options?: Record<string, unknown>): unknown;
		};
	}

	interface HTMLElementEventMap {
		themechange: CustomEvent<{ theme: Theme; timestamp: number }>;
	}
}
