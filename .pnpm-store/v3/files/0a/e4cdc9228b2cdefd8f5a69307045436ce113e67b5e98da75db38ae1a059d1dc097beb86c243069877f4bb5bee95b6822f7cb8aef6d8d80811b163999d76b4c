'use strict'

module.exports = list

var convert = require('hast-util-is-element/convert')
var has = require('hast-util-has-property')
var spread = require('../util/list-items-spread')
var wrapListItems = require('../util/wrap-list-items')

var ol = convert('ol')

function list(h, node) {
  var ordered = ol(node)
  var children = wrapListItems(h, node)
  var start = null

  if (ordered) {
    start = has(node, 'start') ? node.properties.start : 1
  }

  return h(
    node,
    'list',
    {ordered: ordered, start: start, spread: spread(children)},
    children
  )
}
