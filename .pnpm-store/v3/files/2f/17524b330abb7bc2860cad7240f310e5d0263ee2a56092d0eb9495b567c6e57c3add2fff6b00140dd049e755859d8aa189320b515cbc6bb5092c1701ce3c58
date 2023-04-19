'use strict'

module.exports = root

var all = require('../all')
var wrap = require('../util/wrap')

function root(h, node) {
  var children = all(h, node)

  if (h.document || wrap.needed(children)) {
    children = wrap(children)
  }

  return h(node, 'root', children)
}
