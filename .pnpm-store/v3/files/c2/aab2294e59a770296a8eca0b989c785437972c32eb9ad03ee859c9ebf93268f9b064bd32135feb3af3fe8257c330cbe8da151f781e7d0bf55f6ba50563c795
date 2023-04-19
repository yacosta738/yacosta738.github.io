import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { debug, warn } from "../utils/logger.js";
const CACHE_FILE = `cache.json`;
class ImageCache {
  #cacheDir;
  #cacheFile;
  #cache = {};
  #logLevel;
  constructor(dir, logLevel) {
    this.#logLevel = logLevel;
    this.#cacheDir = dir;
    this.#cacheFile = this.#toAbsolutePath(CACHE_FILE);
  }
  #toAbsolutePath(file) {
    return new URL(path.join(this.#cacheDir.toString(), file));
  }
  async init() {
    try {
      const str = await fs.readFile(this.#cacheFile, "utf-8");
      this.#cache = JSON.parse(str);
    } catch {
      debug({ message: "no cache file found", level: this.#logLevel });
    }
  }
  async finalize() {
    try {
      await fs.mkdir(path.dirname(fileURLToPath(this.#cacheFile)), { recursive: true });
      await fs.writeFile(this.#cacheFile, JSON.stringify(this.#cache));
    } catch {
      warn({ message: "could not save the cache file", level: this.#logLevel });
    }
  }
  async get(file) {
    if (!this.has(file)) {
      return void 0;
    }
    try {
      const filepath = this.#toAbsolutePath(file);
      return await fs.readFile(filepath);
    } catch {
      warn({ message: `could not load cached file for "${file}"`, level: this.#logLevel });
      return void 0;
    }
  }
  async set(file, buffer, opts) {
    try {
      const filepath = this.#toAbsolutePath(file);
      await fs.mkdir(path.dirname(fileURLToPath(filepath)), { recursive: true });
      await fs.writeFile(filepath, buffer);
      this.#cache[file] = opts;
    } catch {
      warn({ message: `could not save cached copy of "${file}"`, level: this.#logLevel });
    }
  }
  has(file) {
    if (!(file in this.#cache)) {
      return false;
    }
    const { expires } = this.#cache[file];
    return expires > Date.now();
  }
}
export {
  ImageCache
};
