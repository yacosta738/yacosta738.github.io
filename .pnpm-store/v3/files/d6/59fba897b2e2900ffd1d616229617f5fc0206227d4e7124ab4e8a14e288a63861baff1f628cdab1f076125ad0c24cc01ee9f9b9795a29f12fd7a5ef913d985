'use strict'

module.exports = media

var convert = require('hast-util-is-element/convert')
var toString = require('mdast-util-to-string')
var visit = require('unist-util-visit')
var all = require('../all')
var resolve = require('../util/resolve')
var wrap = require('../util/wrap')

var source = convert('source')
var video = convert('video')

function media(h, node) {
  var nodes = all(h, node)
  var poster = video(node) && node.properties.poster
  var src = node.properties.src
  var index = -1
  var linkInFallbackContent

  visit({type: 'root', children: nodes}, 'link', findLink)

  // If the content links to something, or if it’s not phrasing…
  if (linkInFallbackContent || wrap.needed(nodes)) {
    return nodes
  }

  // Find the source.
  while (!src && ++index < node.children.length) {
    if (source(node.children[index])) {
      src = node.children[index].properties.src
    }
  }

  // If there’s a poster defined on the video, create an image.
  if (poster) {
    nodes = [
      {
        type: 'image',
        title: null,
        url: resolve(h, poster),
        alt: toString({children: nodes})
      }
    ]
  }

  // Link to the media resource.
  return {
    type: 'link',
    title: node.properties.title || null,
    url: resolve(h, src),
    children: nodes
  }

  function findLink() {
    linkInFallbackContent = true
    return visit.EXIT
  }
}
