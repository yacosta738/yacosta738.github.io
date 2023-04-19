'use strict'

module.exports = shallow

var own = require('./own')

// Shallow copy of a node, excluding its children.
function shallow(node) {
  var copy = {}
  var key

  for (key in node) {
    if (own.call(node, key) && key !== 'children') {
      copy[key] = node[key]
    }
  }

  return copy
}
