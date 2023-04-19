'use strict'

module.exports = textarea

var toText = require('hast-util-to-text')
var wrapText = require('../util/wrap-text')

function textarea(h, node) {
  return h(node, 'text', wrapText(h, toText(node)))
}
