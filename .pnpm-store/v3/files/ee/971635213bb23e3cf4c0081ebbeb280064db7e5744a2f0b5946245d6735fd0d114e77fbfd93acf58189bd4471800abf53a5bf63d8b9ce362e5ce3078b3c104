'use strict'

module.exports = cell

var all = require('../all')

function cell(h, node) {
  var wrap = h.wrapText
  var result

  h.wrapText = false
  result = h(node, 'tableCell', all(h, node))
  h.wrapText = wrap

  return result
}
