'use strict'

module.exports = iframe

var resolve = require('../util/resolve')
var wrapText = require('../util/wrap-text')

function iframe(h, node) {
  var src = node.properties.src
  var title = node.properties.title

  // Only create a link if there is a title.
  // We can’t use the content of the frame because conforming HTML parsers treat
  // it as text, whereas legacy parsers treat it as HTML, so it will likely
  // contain tags that will show up in text.
  if (src && title) {
    return {
      type: 'link',
      title: null,
      url: resolve(h, src),
      children: [{type: 'text', value: wrapText(h, title)}]
    }
  }
}
