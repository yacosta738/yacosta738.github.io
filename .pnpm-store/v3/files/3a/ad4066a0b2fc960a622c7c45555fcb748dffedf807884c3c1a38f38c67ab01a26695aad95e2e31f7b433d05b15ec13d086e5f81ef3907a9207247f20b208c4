import { doWork } from "@altano/tiny-async-pool";
import CachePolicy from "http-cache-semantics";
import { bgGreen, black, cyan, dim, green } from "kleur/colors";
import fs from "node:fs/promises";
import OS from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { debug, info, warn } from "../utils/logger.js";
import { isRemoteImage, prependForwardSlash } from "../utils/paths.js";
import { ImageCache } from "./cache.js";
async function loadLocalImage(src) {
  try {
    const data = await fs.readFile(src);
    const timeToLive = /* @__PURE__ */ new Date();
    timeToLive.setFullYear(timeToLive.getFullYear() + 1);
    return {
      data,
      expires: timeToLive.getTime()
    };
  } catch {
    return void 0;
  }
}
function webToCachePolicyRequest({ url, method, headers: _headers }) {
  let headers = {};
  try {
    headers = Object.fromEntries(_headers.entries());
  } catch {
  }
  return {
    method,
    url,
    headers
  };
}
function webToCachePolicyResponse({ status, headers: _headers }) {
  let headers = {};
  try {
    headers = Object.fromEntries(_headers.entries());
  } catch {
  }
  return {
    status,
    headers
  };
}
async function loadRemoteImage(src) {
  try {
    if (src.startsWith("//")) {
      src = `https:${src}`;
    }
    const req = new Request(src);
    const res = await fetch(req);
    if (!res.ok) {
      return void 0;
    }
    const policy = new CachePolicy(webToCachePolicyRequest(req), webToCachePolicyResponse(res));
    const expires = policy.storable() ? policy.timeToLive() : 0;
    return {
      data: Buffer.from(await res.arrayBuffer()),
      expires: Date.now() + expires
    };
  } catch (err) {
    console.error(err);
    return void 0;
  }
}
function getTimeStat(timeStart, timeEnd) {
  const buildTime = timeEnd - timeStart;
  return buildTime < 750 ? `${Math.round(buildTime)}ms` : `${(buildTime / 1e3).toFixed(2)}s`;
}
async function ssgBuild({
  loader,
  staticImages,
  config,
  outDir,
  logLevel,
  cacheDir
}) {
  let cache = void 0;
  if (cacheDir) {
    cache = new ImageCache(cacheDir, logLevel);
    await cache.init();
  }
  const timer = performance.now();
  const cpuCount = OS.cpus().length;
  info({
    level: logLevel,
    prefix: false,
    message: `${bgGreen(
      black(
        ` optimizing ${staticImages.size} image${staticImages.size > 1 ? "s" : ""} in batches of ${cpuCount} `
      )
    )}`
  });
  async function processStaticImage([src, transformsMap]) {
    let inputFile = void 0;
    let inputBuffer = void 0;
    let expires = 0;
    if (config.build.assetsPrefix) {
      if (src.startsWith(config.build.assetsPrefix)) {
        src = prependForwardSlash(src.slice(config.build.assetsPrefix.length));
      }
    } else if (config.base) {
      if (src.startsWith(config.base)) {
        src = prependForwardSlash(src.slice(config.base.length));
      }
    }
    if (isRemoteImage(src)) {
      const res = await loadRemoteImage(src);
      inputBuffer = res == null ? void 0 : res.data;
      expires = (res == null ? void 0 : res.expires) || 0;
    } else {
      const inputFileURL = new URL(`.${src}`, outDir);
      inputFile = fileURLToPath(inputFileURL);
      const res = await loadLocalImage(inputFile);
      inputBuffer = res == null ? void 0 : res.data;
      expires = (res == null ? void 0 : res.expires) || 0;
    }
    if (!inputBuffer) {
      warn({ level: logLevel, message: `"${src}" image could not be fetched` });
      return;
    }
    const transforms = Array.from(transformsMap.entries());
    debug({ level: logLevel, prefix: false, message: `${green("\u25B6")} transforming ${src}` });
    let timeStart = performance.now();
    for (const [filename, transform] of transforms) {
      timeStart = performance.now();
      let outputFile;
      let outputFileURL;
      if (isRemoteImage(src)) {
        outputFileURL = new URL(
          path.join(`./${config.build.assets}`, path.basename(filename)),
          outDir
        );
        outputFile = fileURLToPath(outputFileURL);
      } else {
        outputFileURL = new URL(path.join(`./${config.build.assets}`, filename), outDir);
        outputFile = fileURLToPath(outputFileURL);
      }
      const pathRelative = outputFile.replace(fileURLToPath(outDir), "");
      let data;
      if (cache == null ? void 0 : cache.has(pathRelative)) {
        data = await cache.get(pathRelative);
      }
      if (!data) {
        const transformed = await loader.transform(inputBuffer, transform);
        data = transformed.data;
        if (cache) {
          await cache.set(pathRelative, data, { expires });
        }
      }
      const outputFolder = new URL("./", outputFileURL);
      await fs.mkdir(outputFolder, { recursive: true });
      await fs.writeFile(outputFile, data);
      const timeEnd = performance.now();
      const timeChange = getTimeStat(timeStart, timeEnd);
      const timeIncrease = `(+${timeChange})`;
      debug({
        level: logLevel,
        prefix: false,
        message: `  ${cyan("created")} ${dim(pathRelative)} ${dim(timeIncrease)}`
      });
    }
  }
  await doWork(cpuCount, staticImages, processStaticImage);
  if (cache) {
    await cache.finalize();
  }
  info({
    level: logLevel,
    prefix: false,
    message: dim(`Completed in ${getTimeStat(timer, performance.now())}.
`)
  });
}
export {
  ssgBuild
};
