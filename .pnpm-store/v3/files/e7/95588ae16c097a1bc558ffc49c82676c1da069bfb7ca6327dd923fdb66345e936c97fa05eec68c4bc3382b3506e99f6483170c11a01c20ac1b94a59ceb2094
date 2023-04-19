'use strict'

module.exports = comment

var wrapText = require('../util/wrap-text')

function comment(h, node) {
  return h(node, 'html', '<!--' + wrapText(h, node.value) + '-->')
}
