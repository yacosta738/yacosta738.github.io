// src/doWorkAndYield.ts
async function* doWorkAndYield(concurrentCount, iterable, iteratorFn) {
  const executing = /* @__PURE__ */ new Set();
  async function consume() {
    const [promise, value] = await Promise.race(executing);
    executing.delete(promise);
    return value;
  }
  for (const item of iterable) {
    const result = iteratorFn(item, iterable);
    const promise = result.then((value) => [
      promise,
      value
    ]);
    executing.add(promise);
    if (executing.size >= concurrentCount) {
      yield await consume();
    }
  }
  while (executing.size) {
    yield await consume();
  }
}

// src/doWork.ts
async function doWork(...args) {
  for await (const _result of doWorkAndYield(...args)) {
  }
}
export {
  doWork,
  doWorkAndYield
};
