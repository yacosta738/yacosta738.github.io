import type Article from "@/core/article/article.model";
import type ExternalArticle from "@/core/external-article/external-article.model";

/**
 * Union type for both regular and external articles
 */
export type BlogPost = Article | ExternalArticle;

/**
 * Type guard to check if a blog post is an external article
 */
export function isExternalArticle(post: BlogPost): post is ExternalArticle {
	return "link" in post && "isExternal" in post && post.isExternal === true;
}

/**
 * Type guard to check if a blog post is a regular article
 */
export function isArticle(post: BlogPost): post is Article {
	return "body" in post && !("link" in post);
}

/**
 * Get the URL for a blog post (internal slug or external link)
 */
export function getBlogPostUrl(post: BlogPost, lang: string): string {
	if (isExternalArticle(post)) {
		return post.link;
	}
	// For regular articles, create internal URL
	return `/${lang}/blog/${post.id.split("/").slice(1).join("/")}`;
}

/**
 * Get the target attribute for a blog post link
 */
export function getBlogPostTarget(post: BlogPost): "_blank" | undefined {
	return isExternalArticle(post) ? "_blank" : undefined;
}

/**
 * Get the rel attribute for a blog post link
 */
export function getBlogPostRel(post: BlogPost): string | undefined {
	return isExternalArticle(post) ? "noopener noreferrer" : undefined;
}
