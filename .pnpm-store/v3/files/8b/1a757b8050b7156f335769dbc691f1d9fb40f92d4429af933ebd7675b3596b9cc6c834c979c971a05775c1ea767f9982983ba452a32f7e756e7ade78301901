'use strict'

module.exports = toMdast

var has = require('hast-util-has-property')
var minify = require('rehype-minify-whitespace')
var convert = require('unist-util-is/convert')
var visit = require('unist-util-visit')
var xtend = require('xtend')
var one = require('./lib/one')
var handlers = require('./lib/handlers')
var own = require('./lib/util/own')

var block = convert(['heading', 'paragraph', 'root'])

function toMdast(tree, options) {
  var settings = options || {}
  var byId = {}
  var mdast

  h.nodeById = byId
  h.baseFound = false
  h.frozenBaseUrl = null
  h.wrapText = true
  h.qNesting = 0

  h.handlers = settings.handlers ? xtend(handlers, settings.handlers) : handlers
  h.augment = augment

  h.document = settings.document
  h.checked = settings.checked || '[x]'
  h.unchecked = settings.unchecked || '[ ]'
  h.quotes = settings.quotes || ['"']

  visit(tree, 'element', onelement)

  minify({newlines: settings.newlines === true})(tree)

  mdast = one(h, tree, null)

  visit(mdast, 'text', ontext)

  return mdast

  function h(node, type, props, children) {
    var result

    if (
      !children &&
      (typeof props === 'string' ||
        (typeof props === 'object' && 'length' in props))
    ) {
      children = props
      props = {}
    }

    result = xtend({type: type}, props)

    if (typeof children === 'string') {
      result.value = children
    } else if (children) {
      result.children = children
    }

    return augment(node, result)
  }

  // To do: inline in a future major.
  // `right` is the finalized mdast node, created from `left`, a hast node.
  function augment(left, right) {
    if (left.position) {
      right.position = left.position
    }

    return right
  }

  function onelement(node) {
    var id = has(node, 'id') && String(node.properties.id).toUpperCase()

    if (id && !own.call(byId, id)) {
      byId[id] = node
    }
  }

  // Collapse text nodes, and fix whitespace.
  // Most of this is taken care of by `rehype-minify-whitespace`, but
  // we’re generating some whitespace too, and some nodes are in the end
  // ignored.
  // So clean up:
  function ontext(node, index, parent) {
    var previous = parent.children[index - 1]

    if (previous && node.type === previous.type) {
      previous.value += node.value

      parent.children.splice(index, 1)

      if (previous.position && node.position) {
        previous.position.end = node.position.end
      }

      // Iterate over the previous node again, to handle its total value.
      return index - 1
    }

    node.value = node.value.replace(/[\t ]*(\r?\n|\r)[\t ]*/, '$1')

    // We don’t care about other phrasing nodes in between (e.g., `[ asd ]()`),
    // as there the whitespace matters.
    if (block(parent)) {
      if (!index) {
        node.value = node.value.replace(/^[\t ]+/, '')
      }

      if (index === parent.children.length - 1) {
        node.value = node.value.replace(/[\t ]+$/, '')
      }
    }

    if (!node.value) {
      parent.children.splice(index, 1)
      return index
    }
  }
}
