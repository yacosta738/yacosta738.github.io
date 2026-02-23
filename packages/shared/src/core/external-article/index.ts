export type { ExternalArticleCriteria } from "./external-article.criteria";
export {
	toExternalArticle,
	toExternalArticles,
} from "./external-article.mapper";
export type { default as ExternalArticle } from "./external-article.model";
export {
	getExternalArticleById,
	getExternalArticles,
	hasExternalArticles,
} from "./external-article.service";
