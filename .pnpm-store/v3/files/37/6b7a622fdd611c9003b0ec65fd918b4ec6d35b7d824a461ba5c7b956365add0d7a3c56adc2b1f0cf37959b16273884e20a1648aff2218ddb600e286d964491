'use strict'

module.exports = one

var all = require('./all')
var own = require('./util/own')
var wrapText = require('./util/wrap-text')

function one(h, node, parent) {
  var fn

  if (node.type === 'element') {
    if (node.properties && node.properties.dataMdast === 'ignore') {
      return
    }

    if (own.call(h.handlers, node.tagName)) {
      fn = h.handlers[node.tagName]
    }
  } else if (own.call(h.handlers, node.type)) {
    fn = h.handlers[node.type]
  }

  return (typeof fn === 'function' ? fn : unknown)(h, node, parent)
}

function unknown(h, node) {
  if (node.value) {
    return h(node, 'text', wrapText(h, node.value))
  }

  return all(h, node)
}
