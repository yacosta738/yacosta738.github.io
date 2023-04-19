'use strict'

module.exports = link

var all = require('../all')
var resolve = require('../util/resolve')

function link(h, node) {
  return h(
    node,
    'link',
    {
      title: node.properties.title || null,
      url: resolve(h, node.properties.href)
    },
    all(h, node)
  )
}
