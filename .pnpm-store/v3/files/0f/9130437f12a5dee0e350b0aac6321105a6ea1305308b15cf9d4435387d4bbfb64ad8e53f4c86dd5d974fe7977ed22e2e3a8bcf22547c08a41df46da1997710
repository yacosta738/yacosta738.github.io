function createCanonicalURL(url, trailingSlash, base) {
  let pathname = url.replace(/\/index.html$/, "");
  pathname = pathname.replace(/\/1\/?$/, "");
  if (trailingSlash === false) {
    pathname = pathname.replace(/(\/+)?$/, "");
  } else if (!getUrlExtension(url)) {
    pathname = pathname.replace(/(\/+)?$/, "/");
  }
  pathname = pathname.replace(/\/+/g, "/");
  return new URL(pathname, base);
}
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
  }
  return false;
}
function getUrlExtension(url) {
  const lastDot = url.lastIndexOf(".");
  const lastSlash = url.lastIndexOf("/");
  return lastDot > lastSlash ? url.slice(lastDot + 1) : "";
}
const flattenErrorPath = (errorPath) => errorPath.join(".");
const errorMap = (error, ctx) => {
  if (error.code === "invalid_type") {
    const badKeyPath = JSON.stringify(flattenErrorPath(error.path));
    if (error.received === "undefined") {
      return { message: `${badKeyPath} is required.` };
    } else {
      return { message: `${badKeyPath} should be ${error.expected}, not ${error.received}.` };
    }
  }
  return { message: ctx.defaultError };
};
export {
  createCanonicalURL,
  errorMap,
  isValidURL
};
