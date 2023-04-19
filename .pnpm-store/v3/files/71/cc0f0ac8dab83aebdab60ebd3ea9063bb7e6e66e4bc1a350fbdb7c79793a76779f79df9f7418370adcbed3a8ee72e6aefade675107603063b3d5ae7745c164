'use strict'

module.exports = inlineCode

var toText = require('hast-util-to-text')
var wrapText = require('../util/wrap-text')

function inlineCode(h, node) {
  return h(node, 'inlineCode', wrapText(h, toText(node)))
}
