'use strict'

module.exports = input

var convert = require('hast-util-is-element/convert')
var repeat = require('repeat-string')
var findSelectedOptions = require('../util/find-selected-options')
var own = require('../util/own')
var resolve = require('../util/resolve')
var wrapText = require('../util/wrap-text')

var datalist = convert('datalist')

function input(h, node) {
  var props = node.properties
  var value = props.value || props.placeholder
  var results = []
  var values = []
  var index = -1
  var list

  if (props.disabled || props.type === 'hidden' || props.type === 'file') {
    return
  }

  if (props.type === 'checkbox' || props.type === 'radio') {
    return h(
      node,
      'text',
      wrapText(h, h[props.checked ? 'checked' : 'unchecked'])
    )
  }

  if (props.type === 'image') {
    return props.alt || value
      ? h(node, 'image', {
          url: resolve(h, props.src),
          title: (props.title && wrapText(h, props.title)) || null,
          alt: wrapText(h, props.alt || value)
        })
      : []
  }

  if (value) {
    values = [[value]]
  } else if (
    // `list` is not supported on these types:
    props.type !== 'password' &&
    props.type !== 'file' &&
    props.type !== 'submit' &&
    props.type !== 'reset' &&
    props.type !== 'button' &&
    props.list
  ) {
    list = String(props.list).toUpperCase()

    if (own.call(h.nodeById, list) && datalist(h.nodeById[list])) {
      values = findSelectedOptions(h, h.nodeById[list], props)
    }
  }

  if (!values.length) {
    return
  }

  // Hide password value.
  if (props.type === 'password') {
    // Passwords don’t support `list`.
    values[0] = [repeat('•', values[0][0].length)]
  }

  if (props.type === 'url' || props.type === 'email') {
    while (++index < values.length) {
      value = resolve(h, values[index][0])

      results.push(
        h(
          node,
          'link',
          {
            title: null,
            url: wrapText(h, props.type === 'email' ? 'mailto:' + value : value)
          },
          [{type: 'text', value: wrapText(h, values[index][1] || value)}]
        )
      )

      if (index !== values.length - 1) {
        results.push({type: 'text', value: ', '})
      }
    }

    return results
  }

  while (++index < values.length) {
    results.push(
      values[index][1]
        ? values[index][1] + ' (' + values[index][0] + ')'
        : values[index][0]
    )
  }

  return h(node, 'text', wrapText(h, results.join(', ')))
}
