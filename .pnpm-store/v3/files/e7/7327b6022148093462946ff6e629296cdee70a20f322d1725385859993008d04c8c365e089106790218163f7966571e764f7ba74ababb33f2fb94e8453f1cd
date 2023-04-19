import { Block, Mark, Node, Value } from 'slate';
import { Set } from 'immutable';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Deserialize a plain text `string` to a Slate value.
 *
 * @param {String} string
 * @param {Object} options
 *   @property {Boolean} toJSON
 *   @property {String|Object|Block} defaultBlock
 *   @property {Array|Set} defaultMarks
 * @return {Value}
 */

function deserialize(string) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$defaultBlock = options.defaultBlock,
      defaultBlock = _options$defaultBlock === undefined ? 'line' : _options$defaultBlock,
      _options$defaultMarks = options.defaultMarks,
      defaultMarks = _options$defaultMarks === undefined ? [] : _options$defaultMarks,
      _options$delimiter = options.delimiter,
      delimiter = _options$delimiter === undefined ? '\n' : _options$delimiter,
      _options$toJSON = options.toJSON,
      toJSON = _options$toJSON === undefined ? false : _options$toJSON;


  if (Set.isSet(defaultMarks)) {
    defaultMarks = defaultMarks.toArray();
  }

  defaultBlock = Node.createProperties(defaultBlock);
  defaultMarks = defaultMarks.map(Mark.createProperties);

  var json = {
    object: 'value',
    document: {
      object: 'document',
      data: {},
      nodes: string.split(delimiter).map(function (line) {
        return _extends({}, defaultBlock, {
          object: 'block',
          data: {},
          nodes: [{
            object: 'text',
            text: line,
            marks: defaultMarks
          }]
        });
      })
    }
  };

  var ret = toJSON ? json : Value.fromJSON(json);
  return ret;
}

/**
 * Serialize a Slate `value` to a plain text string.
 *
 * @param {Value} value
 * @return {String}
 */

function serialize(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return serializeNode(value.document, options);
}

/**
 * Serialize a `node` to plain text.
 *
 * @param {Node} node
 * @return {String}
 */

function serializeNode(node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$delimiter2 = options.delimiter,
      delimiter = _options$delimiter2 === undefined ? '\n' : _options$delimiter2;


  if (node.object === 'document' || node.object === 'block' && Block.isBlockList(node.nodes)) {
    return node.nodes.map(serializeNode).join(delimiter);
  } else {
    return node.text;
  }
}

/**
 * Export.
 *
 * @type {Object}
 */

var index = {
  deserialize: deserialize,
  serialize: serialize
};

export default index;
//# sourceMappingURL=slate-plain-serializer.es.js.map
