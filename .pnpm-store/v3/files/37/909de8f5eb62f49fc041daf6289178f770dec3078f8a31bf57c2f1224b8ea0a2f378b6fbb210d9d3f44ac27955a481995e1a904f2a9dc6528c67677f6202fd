'use strict'

module.exports = heading

var all = require('../all')

function heading(h, node) {
  /* istanbul ignore next - `else` shouldn’t happen, of course… */
  var depth = Number(node.tagName.charAt(1)) || 1
  var wrap = h.wrapText
  var result

  h.wrapText = false
  result = h(node, 'heading', {depth: depth}, all(h, node))
  h.wrapText = wrap

  return result
}
