'use strict'

module.exports = dl

var convert = require('hast-util-is-element/convert')
var spread = require('../util/list-items-spread')
var wrapListItems = require('../util/wrap-list-items')

var div = convert('div')
var dt = convert('dt')
var dd = convert('dd')

function dl(h, node) {
  var children = node.children
  var index = -1
  var clean = []
  var groups = []
  var group = {titles: [], definitions: []}
  var content
  var child

  // Unwrap `<div>`s
  while (++index < children.length) {
    child = children[index]
    clean = clean.concat(div(child) ? child.children : child)
  }

  index = -1

  // Group titles and definitions.
  while (++index < clean.length) {
    child = clean[index]

    if (dt(child)) {
      if (dd(clean[index - 1])) {
        groups.push(group)
        group = {titles: [], definitions: []}
      }

      group.titles.push(child)
    } else {
      group.definitions.push(child)
    }
  }

  groups.push(group)

  // Create items.
  index = -1
  content = []

  while (++index < groups.length) {
    group = handle(h, groups[index].titles).concat(
      handle(h, groups[index].definitions)
    )

    if (group.length) {
      content.push({
        type: 'listItem',
        spread: group.length > 1,
        checked: null,
        children: group
      })
    }
  }

  // Create a list if there are items.
  if (content.length) {
    return h(
      node,
      'list',
      {ordered: false, start: null, spread: spread(content)},
      content
    )
  }
}

function handle(h, children) {
  var nodes = wrapListItems(h, {children: children})

  if (!nodes.length) {
    return nodes
  }

  if (nodes.length === 1) {
    return nodes[0].children
  }

  return [
    {
      type: 'list',
      ordered: false,
      start: null,
      spread: spread(nodes),
      children: nodes
    }
  ]
}
