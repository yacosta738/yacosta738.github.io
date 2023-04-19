import { Block, Change, Data, Document, Inline, Leaf, Mark, Node, Range, Selection, Value, Text } from 'slate';

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
    return Block.isBlock(v);
  }),
  blocks: create('List<Block>', function (v) {
    return Block.isBlockList(v);
  }),
  change: create('Change', function (v) {
    return Change.isChange(v);
  }),
  data: create('Data', function (v) {
    return Data.isData(v);
  }),
  document: create('Document', function (v) {
    return Document.isDocument(v);
  }),
  inline: create('Inline', function (v) {
    return Inline.isInline(v);
  }),
  inlines: create('Inline', function (v) {
    return Inline.isInlineList(v);
  }),
  leaf: create('Leaf', function (v) {
    return Leaf.isLeaf(v);
  }),
  leaves: create('List<Leaf>', function (v) {
    return Leaf.isLeafList(v);
  }),
  mark: create('Mark', function (v) {
    return Mark.isMark(v);
  }),
  marks: create('Set<Mark>', function (v) {
    return Mark.isMarkSet(v);
  }),
  node: create('Node', function (v) {
    return Node.isNode(v);
  }),
  nodes: create('List<Node>', function (v) {
    return Node.isNodeList(v);
  }),
  range: create('Range', function (v) {
    return Range.isRange(v);
  }),
  ranges: create('List<Range>', function (v) {
    return Range.isRangeList(v);
  }),
  selection: create('Selection', function (v) {
    return Selection.isSelection(v);
  }),
  value: create('Value', function (v) {
    return Value.isValue(v);
  }),
  text: create('Text', function (v) {
    return Text.isText(v);
  }),
  texts: create('List<Text>', function (v) {
    return Text.isTextList(v);
  })

  /**
   * Export.
   *
   * @type {Object}
   */

};

export default Types;
//# sourceMappingURL=slate-prop-types.es.js.map
