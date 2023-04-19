import vue from "@vitejs/plugin-vue";
function getRenderer() {
  return {
    name: "@astrojs/vue",
    clientEntrypoint: "@astrojs/vue/client.js",
    serverEntrypoint: "@astrojs/vue/server.js"
  };
}
function getJsxRenderer() {
  return {
    name: "@astrojs/vue (jsx)",
    clientEntrypoint: "@astrojs/vue/client.js",
    serverEntrypoint: "@astrojs/vue/server.js",
    jsxImportSource: "vue",
    jsxTransformOptions: async () => {
      const jsxPlugin = (await import("@vue/babel-plugin-jsx")).default;
      return {
        plugins: [jsxPlugin]
      };
    }
  };
}
function virtualAppEntrypoint(options) {
  const virtualModuleId = "virtual:@astrojs/vue/app";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  return {
    name: "@astrojs/vue/virtual-app",
    resolveId(id) {
      if (id == virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        if (options == null ? void 0 : options.appEntrypoint) {
          return `export { default as setup } from "${options.appEntrypoint}";`;
        }
        return `export const setup = () => {};`;
      }
    }
  };
}
async function getViteConfiguration(options) {
  var _a;
  const config = {
    optimizeDeps: {
      include: ["@astrojs/vue/client.js", "vue"],
      exclude: ["@astrojs/vue/server.js", "virtual:@astrojs/vue/app"]
    },
    plugins: [vue(options), virtualAppEntrypoint(options)],
    ssr: {
      external: ["@vue/server-renderer"],
      noExternal: ["vuetify", "vueperslides", "primevue"]
    }
  };
  if (options == null ? void 0 : options.jsx) {
    const vueJsx = (await import("@vitejs/plugin-vue-jsx")).default;
    const jsxOptions = typeof options.jsx === "object" ? options.jsx : void 0;
    (_a = config.plugins) == null ? void 0 : _a.push(vueJsx(jsxOptions));
  }
  return config;
}
function src_default(options) {
  return {
    name: "@astrojs/vue",
    hooks: {
      "astro:config:setup": async ({ addRenderer, updateConfig }) => {
        addRenderer(getRenderer());
        if (options == null ? void 0 : options.jsx) {
          addRenderer(getJsxRenderer());
        }
        updateConfig({ vite: await getViteConfiguration(options) });
      }
    }
  };
}
export {
  src_default as default
};
