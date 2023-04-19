'use strict'

module.exports = table

var convert = require('hast-util-is-element/convert')
var visit = require('unist-util-visit')
var all = require('../all')

var thead = convert('thead')
var tr = convert('tr')
var cell = convert(['th', 'td'])

function table(h, node) {
  var info = inspect(node)
  return h(node, 'table', {align: info.align}, toRows(all(h, node), info))
}

// Infer whether the HTML table has a head and how it aligns.
function inspect(node) {
  var headless = true
  var align = [null]
  var rowIndex = 0
  var cellIndex = 0

  visit(node, 'element', visitor)

  return {align: align, headless: headless}

  function visitor(child) {
    // If there is a `thead`, assume there is a header row.
    if (thead(child)) {
      headless = false
    } else if (tr(child)) {
      rowIndex++
      cellIndex = 0
    } else if (cell(child)) {
      if (!align[cellIndex]) {
        align[cellIndex] = child.properties.align || null
      }

      // If there is a th in the first row, assume there is a header row.
      if (headless && rowIndex < 2 && child.tagName === 'th') {
        headless = false
      }

      cellIndex++
    }
  }
}

// Ensure the rows are properly structured.
function toRows(children, info) {
  var nodes = []
  var index = -1
  var node
  var queue

  // Add an empty header row.
  if (info.headless) {
    nodes.push({type: 'tableRow', children: []})
  }

  while (++index < children.length) {
    node = children[index]

    if (node.type === 'tableRow') {
      if (queue) {
        node.children = queue.concat(node.children)
        queue = undefined
      }

      nodes.push(node)
    } else {
      if (!queue) queue = []
      queue.push(node)
    }
  }

  if (queue) {
    node = nodes[nodes.length - 1]
    node.children = node.children.concat(queue)
  }

  index = -1

  while (++index < nodes.length) {
    node = nodes[index]
    node.children = toCells(node.children, info)
  }

  return nodes
}

// Ensure the cells in a row are properly structured.
function toCells(children, info) {
  var nodes = []
  var index = -1
  var node
  var queue

  while (++index < children.length) {
    node = children[index]

    if (node.type === 'tableCell') {
      if (queue) {
        node.children = queue.concat(node.children)
        queue = undefined
      }

      nodes.push(node)
    } else {
      if (!queue) queue = []
      queue.push(node)
    }
  }

  if (queue) {
    node = nodes[nodes.length - 1]

    if (!node) {
      node = {type: 'tableCell', children: []}
      nodes.push(node)
    }

    node.children = node.children.concat(queue)
  }

  index = nodes.length - 1

  while (++index < info.align.length) {
    nodes.push({type: 'tableCell', children: []})
  }

  return nodes
}
