'use strict'

module.exports = code

var has = require('hast-util-has-property')
var convert = require('hast-util-is-element/convert')
var toText = require('hast-util-to-text')
var trim = require('trim-trailing-lines')
var wrapText = require('../util/wrap-text')

var prefix = 'language-'

var pre = convert('pre')
var isCode = convert('code')

function code(h, node) {
  var children = node.children
  var index = -1
  var classList
  var lang

  if (pre(node)) {
    while (++index < children.length) {
      if (isCode(children[index]) && has(children[index], 'className')) {
        classList = children[index].properties.className
        break
      }
    }
  }

  if (classList) {
    index = -1

    while (++index < classList.length) {
      if (classList[index].slice(0, prefix.length) === prefix) {
        lang = classList[index].slice(prefix.length)
        break
      }
    }
  }

  return h(
    node,
    'code',
    {lang: lang || null, meta: null},
    trim(wrapText(h, toText(node)))
  )
}
