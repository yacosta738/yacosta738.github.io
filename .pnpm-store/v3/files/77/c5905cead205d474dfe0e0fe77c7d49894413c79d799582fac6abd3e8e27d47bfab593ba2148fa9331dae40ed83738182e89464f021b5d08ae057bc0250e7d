(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('slate')) :
	typeof define === 'function' && define.amd ? define(['exports', 'slate'], factory) :
	(factory((global.SlateBase64Serializer = {}),global.Slate));
}(this, (function (exports,slate) { 'use strict';

var atob = self.atob.bind(self);
var btoa = self.btoa.bind(self);

/**
 * Encode a JSON `object` as base-64 `string`.
 *
 * @param {Object} object
 * @return {String}
 */

function encode(object) {
  var string = JSON.stringify(object);
  var encoded = btoa(encodeURIComponent(string));
  return encoded;
}

/**
 * Decode a base-64 `string` to a JSON `object`.
 *
 * @param {String} string
 * @return {Object}
 */

function decode(string) {
  var decoded = decodeURIComponent(atob(string));
  var object = JSON.parse(decoded);
  return object;
}

/**
 * Deserialize a Value `string`.
 *
 * @param {String} string
 * @return {Value}
 */

function deserialize(string, options) {
  var raw = decode(string);
  var value = slate.Value.fromJSON(raw, options);
  return value;
}

/**
 * Deserialize a Node `string`.
 *
 * @param {String} string
 * @return {Node}
 */

function deserializeNode(string, options) {
  var raw = decode(string);
  var node = slate.Node.fromJSON(raw, options);
  return node;
}

/**
 * Serialize a `value`.
 *
 * @param {Value} value
 * @return {String}
 */

function serialize(value, options) {
  var raw = value.toJSON(options);
  var encoded = encode(raw);
  return encoded;
}

/**
 * Serialize a `node`.
 *
 * @param {Node} node
 * @return {String}
 */

function serializeNode(node, options) {
  var raw = node.toJSON(options);
  var encoded = encode(raw);
  return encoded;
}

/**
 * Export.
 *
 * @type {Object}
 */

var index = {
  deserialize: deserialize,
  deserializeNode: deserializeNode,
  serialize: serialize,
  serializeNode: serializeNode
};

exports.default = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
