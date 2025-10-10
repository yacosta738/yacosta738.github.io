import { passthroughImageService } from "astro/config";

// Dynamic adapter loading based on DEPLOYMENT_ADAPTER env var
export const loadAdapter = async () => {
	const adapterName = (process.env.DEPLOYMENT_ADAPTER || "node").toLowerCase();

	try {
		switch (adapterName) {
			case "vercel": {
				const vercel = await import("@astrojs/vercel");
				return vercel.default();
			}
			case "cloudflare": {
				const cloudflare = await import("@astrojs/cloudflare");
				return cloudflare.default({
					platformProxy: {
						enabled: true,
						configPath: "wrangler.jsonc", // Explicitly specify your config file
						persist: true, // Enable local binding persistence for development
					},
					// Use passthrough image service when Cloudflare Images is not configured.
					// This prevents runtime sharp processing on the edge and avoids
					// image-service related errors when deploying to Workers.
					imageService: passthroughImageService(),
					routes: {
						extend: {
							// Exclude a few static patterns but DO NOT exclude /_astro/*
							// because those are the generated optimized assets that must
							// remain available as static files for the ASSETS binding.
							exclude: [{ pattern: "/fonts/*" }, { pattern: "/images/*" }],
						},
					},
				});
			}
			case "netlify": {
				const netlify = await import("@astrojs/netlify");
				return netlify.default({
					edgeMiddleware: false,
				});
			}
			default: {
				const node = await import("@astrojs/node");
				return node.default({
					mode: "standalone",
				});
			}
		}
	} catch (error) {
		console.warn(
			`Failed to load adapter "${adapterName}". Falling back to node adapter.`,
			error,
		);
		const node = await import("@astrojs/node");
		return node.default({ mode: "standalone" });
	}
};
