'use strict'

module.exports = resolve

function resolve(h, url) {
  if (url === null || url === undefined) {
    return ''
  }

  /* istanbul ignore next - ignored for older Node */
  if (h.frozenBaseUrl && typeof URL !== 'undefined') {
    return String(new URL(url, h.frozenBaseUrl))
  }

  return url
}
