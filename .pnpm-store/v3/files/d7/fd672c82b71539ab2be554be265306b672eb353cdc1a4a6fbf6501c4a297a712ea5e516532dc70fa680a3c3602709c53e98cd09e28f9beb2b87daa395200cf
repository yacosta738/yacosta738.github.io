'use strict'

module.exports = image

var resolve = require('../util/resolve')

function image(h, node) {
  return h(node, 'image', {
    url: resolve(h, node.properties.src),
    title: node.properties.title || null,
    alt: node.properties.alt || ''
  })
}
