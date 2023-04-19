'use strict'

module.exports = select

var findSelectedOptions = require('../util/find-selected-options')
var wrapText = require('../util/wrap-text')

function select(h, node) {
  var values = findSelectedOptions(h, node)
  var index = -1
  var results = []
  var value

  while (++index < values.length) {
    value = values[index]
    results.push(value[1] ? value[1] + ' (' + value[0] + ')' : value[0])
  }

  if (results.length) {
    return h(node, 'text', wrapText(h, results.join(', ')))
  }
}
