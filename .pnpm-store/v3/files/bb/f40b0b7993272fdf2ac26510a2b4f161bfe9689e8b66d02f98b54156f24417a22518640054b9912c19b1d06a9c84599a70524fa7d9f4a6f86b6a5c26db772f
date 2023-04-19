'use strict'

module.exports = q

var all = require('../all')

function q(h, node) {
  var expected = h.quotes[h.qNesting % h.quotes.length]
  var contents

  h.qNesting++
  contents = all(h, node)
  h.qNesting--

  contents.unshift({type: 'text', value: expected.charAt(0)})

  contents.push({
    type: 'text',
    value: expected.length > 1 ? expected.charAt(1) : expected
  })

  return contents
}
