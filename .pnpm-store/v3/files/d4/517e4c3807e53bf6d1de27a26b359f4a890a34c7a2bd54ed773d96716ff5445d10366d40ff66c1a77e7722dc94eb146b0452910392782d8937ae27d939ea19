'use strict'

module.exports = spread

function spread(children) {
  var index = -1

  if (children.length > 1) {
    while (++index < children.length) {
      if (children[index].spread) {
        return true
      }
    }
  }

  return false
}
