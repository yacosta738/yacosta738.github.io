export const getRelativeLocaleUrl = (lang: string, path: string): string => {
	if (!lang) {
		return path;
	}
	if (path === "/") {
		return `/${lang}/`;
	}
	return `/${lang}${path.startsWith("/") ? "" : "/"}${path}`;
};
