"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortKeys = sortKeys;

function sortKeys(sortedKeys) {
  let selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a => a;
  return (a, b) => {
    const idxA = sortedKeys.indexOf(selector(a));
    const idxB = sortedKeys.indexOf(selector(b));
    if (idxA === -1 || idxB === -1) return 0;
    if (idxA > idxB) return 1;
    if (idxA < idxB) return -1;
    return 0;
  };
}