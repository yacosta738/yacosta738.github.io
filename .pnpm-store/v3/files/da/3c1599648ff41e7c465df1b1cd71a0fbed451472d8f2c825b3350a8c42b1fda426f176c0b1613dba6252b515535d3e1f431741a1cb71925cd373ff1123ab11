(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('slate')) :
	typeof define === 'function' && define.amd ? define(['exports', 'slate'], factory) :
	(factory((global.SlatePropTypes = {}),global.Slate));
}(this, (function (exports,slate) { 'use strict';

/**
 * Create a prop type checker for Slate objects with `name` and `validate`.
 *
 * @param {String} name
 * @param {Function} validate
 * @return {Function}
 */

function create(name, validate) {
  function check(isRequired, props, propName, componentName, location) {
    var value = props[propName];

    if (value == null && !isRequired) {
      return null;
    }

    if (value == null && isRequired) {
      return new Error('The ' + location + ' `' + propName + '` is marked as required in `' + componentName + '`, but it was not supplied.');
    }

    if (validate(value)) {
      return null;
    }

    return new Error('Invalid ' + location + ' `' + propName + '` supplied to `' + componentName + '`, expected a Slate `' + name + '` but received: ' + value);
  }

  function propType() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return check.apply(undefined, [false].concat(args));
  }

  propType.isRequired = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return check.apply(undefined, [true].concat(args));
  };

  return propType;
}

/**
 * Prop type checkers.
 *
 * @type {Object}
 */

var Types = {
  block: create('Block', function (v) {
    return slate.Block.isBlock(v);
  }),
  blocks: create('List<Block>', function (v) {
    return slate.Block.isBlockList(v);
  }),
  change: create('Change', function (v) {
    return slate.Change.isChange(v);
  }),
  data: create('Data', function (v) {
    return slate.Data.isData(v);
  }),
  document: create('Document', function (v) {
    return slate.Document.isDocument(v);
  }),
  inline: create('Inline', function (v) {
    return slate.Inline.isInline(v);
  }),
  inlines: create('Inline', function (v) {
    return slate.Inline.isInlineList(v);
  }),
  leaf: create('Leaf', function (v) {
    return slate.Leaf.isLeaf(v);
  }),
  leaves: create('List<Leaf>', function (v) {
    return slate.Leaf.isLeafList(v);
  }),
  mark: create('Mark', function (v) {
    return slate.Mark.isMark(v);
  }),
  marks: create('Set<Mark>', function (v) {
    return slate.Mark.isMarkSet(v);
  }),
  node: create('Node', function (v) {
    return slate.Node.isNode(v);
  }),
  nodes: create('List<Node>', function (v) {
    return slate.Node.isNodeList(v);
  }),
  range: create('Range', function (v) {
    return slate.Range.isRange(v);
  }),
  ranges: create('List<Range>', function (v) {
    return slate.Range.isRangeList(v);
  }),
  selection: create('Selection', function (v) {
    return slate.Selection.isSelection(v);
  }),
  value: create('Value', function (v) {
    return slate.Value.isValue(v);
  }),
  text: create('Text', function (v) {
    return slate.Text.isText(v);
  }),
  texts: create('List<Text>', function (v) {
    return slate.Text.isTextList(v);
  })

  /**
   * Export.
   *
   * @type {Object}
   */

};

exports.default = Types;

Object.defineProperty(exports, '__esModule', { value: true });

})));
