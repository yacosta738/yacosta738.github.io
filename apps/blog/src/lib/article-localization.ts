import type Article from "@/core/article/article.model";
import { DEFAULT_LOCALE, type Lang } from "@/i18n";

export type LocalizedArticlePath = {
	params: { lang: string; id: string };
	props: {
		post: Article;
		usedLangs: Lang[];
	};
};

const getFallbackArticle = (
	articlesByLang: Map<Lang, Article>,
	availableLangs: Lang[],
): Article | undefined => {
	if (articlesByLang.has(DEFAULT_LOCALE)) {
		return articlesByLang.get(DEFAULT_LOCALE);
	}

	const fallbackLang = availableLangs[0];
	return fallbackLang ? articlesByLang.get(fallbackLang) : undefined;
};

export const buildLocalizedArticlePaths = (
	posts: Article[],
	routeLocales: readonly Lang[],
): LocalizedArticlePath[] => {
	const bySlug = new Map<string, Map<Lang, Article>>();

	for (const post of posts) {
		const [lang, ...id] = post.id.split("/");
		const idPath = id.join("/");
		if (!idPath) {
			continue;
		}

		const langKey = lang;
		const entry = bySlug.get(idPath) ?? new Map<Lang, Article>();
		entry.set(langKey, post);
		bySlug.set(idPath, entry);
	}

	const paths: LocalizedArticlePath[] = [];

	for (const [idPath, langMap] of bySlug.entries()) {
		const availableLangs = Array.from(langMap.keys());
		const fallbackPost = getFallbackArticle(langMap, availableLangs);
		if (!fallbackPost) {
			continue;
		}

		for (const lang of routeLocales) {
			const post = langMap.get(lang) ?? fallbackPost;
			paths.push({
				params: { lang, id: idPath },
				props: { post, usedLangs: availableLangs },
			});
		}
	}

	return paths;
};
