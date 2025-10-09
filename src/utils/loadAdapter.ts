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
					imageService: "passthrough", // or 'cloudflare' if using Cloudflare Images
					platformProxy: {
						enabled: true, // Enable Cloudflare bindings in dev
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
