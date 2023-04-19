import { ssgBuild } from "./build/ssg.js";
import { joinPaths, prependForwardSlash, propsToFilename } from "./utils/paths.js";
import { createPlugin } from "./vite-plugin-astro-image.js";
import { getImage } from "./lib/get-image.js";
import { getPicture } from "./lib/get-picture.js";
const PKG_NAME = "@astrojs/image";
const ROUTE_PATTERN = "/_image";
const UNSUPPORTED_ADAPTERS = /* @__PURE__ */ new Set([
  "@astrojs/cloudflare",
  "@astrojs/deno",
  "@astrojs/netlify/edge-functions",
  "@astrojs/vercel/edge"
]);
function integration(options = {}) {
  const resolvedOptions = {
    serviceEntryPoint: "@astrojs/image/squoosh",
    logLevel: "info",
    cacheDir: "./node_modules/.astro/image",
    ...options
  };
  let _config;
  let _buildConfig;
  const staticImages = /* @__PURE__ */ new Map();
  function getViteConfiguration(isDev) {
    return {
      plugins: [createPlugin(_config, resolvedOptions)],
      build: {
        rollupOptions: {
          external: ["sharp"]
        }
      },
      ssr: {
        noExternal: ["@astrojs/image", resolvedOptions.serviceEntryPoint],
        // Externalize CJS dependencies used by `serviceEntryPoint`. Vite dev mode has trouble
        // loading these modules with `ssrLoadModule`, but works in build.
        external: isDev ? ["http-cache-semantics", "image-size", "mime"] : []
      },
      assetsInclude: ["**/*.wasm"]
    };
  }
  return {
    name: PKG_NAME,
    hooks: {
      "astro:config:setup": async ({ command, config, updateConfig, injectRoute }) => {
        _config = config;
        updateConfig({
          vite: getViteConfiguration(command === "dev")
        });
        if (command === "dev" || config.output === "server") {
          injectRoute({
            pattern: ROUTE_PATTERN,
            entryPoint: "@astrojs/image/endpoint"
          });
        }
        const { default: defaultLoader } = await (resolvedOptions.serviceEntryPoint === "@astrojs/image/sharp" ? import("./loaders/sharp.js") : import("./loaders/squoosh.js"));
        globalThis.astroImage = {
          defaultLoader
        };
      },
      "astro:config:done": ({ config }) => {
        _config = config;
        _buildConfig = config.build;
      },
      "astro:build:start": () => {
        var _a;
        const adapterName = (_a = _config.adapter) == null ? void 0 : _a.name;
        if (adapterName && UNSUPPORTED_ADAPTERS.has(adapterName)) {
          throw new Error(
            `@astrojs/image is not supported with the ${adapterName} adapter. Please choose a Node.js compatible adapter.`
          );
        }
      },
      "astro:build:setup": async () => {
        function addStaticImage(transform) {
          const srcTranforms = staticImages.has(transform.src) ? staticImages.get(transform.src) : /* @__PURE__ */ new Map();
          const filename = propsToFilename(transform, resolvedOptions.serviceEntryPoint);
          srcTranforms.set(filename, transform);
          staticImages.set(transform.src, srcTranforms);
          if (_config.build.assetsPrefix) {
            return joinPaths(_config.build.assetsPrefix, _buildConfig.assets, filename);
          } else {
            return prependForwardSlash(joinPaths(_config.base, _buildConfig.assets, filename));
          }
        }
        if (_config.output === "static") {
          globalThis.astroImage.addStaticImage = addStaticImage;
        }
      },
      "astro:build:generated": async ({ dir }) => {
        var _a;
        const loader = (_a = globalThis == null ? void 0 : globalThis.astroImage) == null ? void 0 : _a.loader;
        if (loader && "transform" in loader && staticImages.size > 0) {
          const cacheDir = !!resolvedOptions.cacheDir ? new URL(resolvedOptions.cacheDir, _config.root) : void 0;
          await ssgBuild({
            loader,
            staticImages,
            config: _config,
            outDir: dir,
            logLevel: resolvedOptions.logLevel,
            cacheDir
          });
        }
      }
    }
  };
}
export {
  integration as default,
  getImage,
  getPicture
};
