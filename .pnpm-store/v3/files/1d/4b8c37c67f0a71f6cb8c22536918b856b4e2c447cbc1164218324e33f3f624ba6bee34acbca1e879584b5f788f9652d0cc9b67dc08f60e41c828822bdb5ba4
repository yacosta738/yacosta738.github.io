import { produce } from 'immer';
import { reverse } from 'esrever';
import isPlainObject from 'is-plain-object';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

/**
 * Weak maps to keep track of instance-level editor state.
 */
var DIRTY_PATHS = new WeakMap();
var NORMALIZING = new WeakMap();
var FLUSHING = new WeakMap();
var PATH_REFS = new WeakMap();
var POINT_REFS = new WeakMap();
var RANGE_REFS = new WeakMap();
/**
 * Constants for string distance checking.
 */

var SPACE = /\s/;
var PUNCTUATION = /[\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
var CHAMELEON = /['\u2018\u2019]/;
var SURROGATE_START = 0xd800;
var SURROGATE_END = 0xdfff;
/**
 * Check if a character is a word character. The `remaining` argument is used
 * because sometimes you must read subsequent characters to truly determine it.
 */

var isWordCharacter = function isWordCharacter(_char, remaining) {
  if (SPACE.test(_char)) {
    return false;
  } // Chameleons count as word characters as long as they're in a word, so
  // recurse to see if the next one is a word character or not.


  if (CHAMELEON.test(_char)) {
    var next = remaining.charAt(0);
    var length = getCharacterDistance(next);
    next = remaining.slice(0, length);
    var rest = remaining.slice(length);

    if (isWordCharacter(next, rest)) {
      return true;
    }
  }

  if (PUNCTUATION.test(_char)) {
    return false;
  }

  return true;
};
/**
 * Get the distance to the end of the first character in a string of text.
 */

var getCharacterDistance = function getCharacterDistance(text) {
  var code = text.charCodeAt(0);
  var isSurrogate = SURROGATE_START <= code && code <= SURROGATE_END;
  return isSurrogate ? 2 : 1;
};
/**
 * Get the distance to the end of the first word in a string of text.
 */

var getWordDistance = function getWordDistance(text) {
  var length = 0;
  var i = 0;
  var started = false;

  var _char2;

  while (_char2 = text.charAt(i)) {
    var l = getCharacterDistance(_char2);
    _char2 = text.slice(i, i + l);
    var rest = text.slice(i + l);

    if (isWordCharacter(_char2, rest)) {
      started = true;
      length += l;
    } else if (!started) {
      length += l;
    } else {
      break;
    }

    i += l;
  }

  return length;
};

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var AnnotationCommands =
/*#__PURE__*/
function () {
  function AnnotationCommands() {
    classCallCheck(this, AnnotationCommands);
  }

  createClass(AnnotationCommands, [{
    key: "addAnnotation",

    /**
     * Add a new `annotation` object with a `key`.
     */
    value: function addAnnotation(key, annotation) {
      this.apply({
        type: 'add_annotation',
        key: key,
        annotation: annotation
      });
    }
    /**
     * Remove an existing annotation object by `key`.
     */

  }, {
    key: "removeAnnotation",
    value: function removeAnnotation(key) {
      var annotations = this.value.annotations;

      if (!(key in annotations)) {
        throw new Error("Unable to remove annotation by ".concat(key, " because it does not exist."));
      }

      var annotation = annotations[key];
      this.apply({
        type: 'remove_annotation',
        key: key,
        annotation: annotation
      });
    }
    /**
     * Set new properties on an annotation object with `key`.
     */

  }, {
    key: "setAnnotation",
    value: function setAnnotation(key, props) {
      var annotations = this.value.annotations;

      if (!(key in annotations)) {
        throw new Error("Unable to set new properties on annotation by ".concat(key, " because it does not exist."));
      }

      var annotation = annotations[key];
      var newProps = {};
      var prevProps = {};

      for (var k in props) {
        var isPoint = k === 'anchor' || k === 'focus';

        if (isPoint && !Point.equals(props[k], annotation[k]) || !isPoint && props[k] !== annotation[k]) {
          newProps[k] = props[k];
          prevProps[k] = annotation[k];
        }
      }

      if (Object.keys(newProps).length > 0) {
        this.apply({
          type: 'set_annotation',
          key: key,
          properties: prevProps,
          newProperties: newProps
        });
      }
    }
  }]);

  return AnnotationCommands;
}();

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var DeletingCommands =
/*#__PURE__*/
function () {
  function DeletingCommands() {
    classCallCheck(this, DeletingCommands);
  }

  createClass(DeletingCommands, [{
    key: "delete",

    /**
     * Delete content in the editor.
     */
    value: function _delete() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.withoutNormalizing(function () {
        var _options$reverse = options.reverse,
            reverse = _options$reverse === void 0 ? false : _options$reverse,
            _options$unit = options.unit,
            unit = _options$unit === void 0 ? 'character' : _options$unit,
            _options$distance = options.distance,
            distance = _options$distance === void 0 ? 1 : _options$distance;
        var _options$at = options.at,
            at = _options$at === void 0 ? _this.value.selection : _options$at,
            _options$hanging = options.hanging,
            hanging = _options$hanging === void 0 ? false : _options$hanging;

        if (!at) {
          return;
        }

        if (Range.isRange(at) && Range.isCollapsed(at)) {
          at = at.anchor;
        }

        if (Point.isPoint(at)) {
          var furthestVoid = _this.getMatch(at.path, 'void');

          if (furthestVoid) {
            var _furthestVoid = slicedToArray(furthestVoid, 2),
                voidPath = _furthestVoid[1];

            at = voidPath;
          } else {
            var opts = {
              unit: unit,
              distance: distance
            };
            var target = reverse ? _this.getBefore(at, opts) || _this.getStart([]) : _this.getAfter(at, opts) || _this.getEnd([]);
            at = {
              anchor: at,
              focus: target
            };
            hanging = true;
          }
        }

        if (Path.isPath(at)) {
          _this.removeNodes({
            at: at
          });

          return;
        }

        if (Range.isCollapsed(at)) {
          return;
        }

        if (!hanging) {
          at = _this.unhangRange(at);
        }

        var _Range$edges = Range.edges(at),
            _Range$edges2 = slicedToArray(_Range$edges, 2),
            start = _Range$edges2[0],
            end = _Range$edges2[1];

        var _this$getAncestor = _this.getAncestor(at),
            _this$getAncestor2 = slicedToArray(_this$getAncestor, 1),
            ancestor = _this$getAncestor2[0];

        var isSingleText = Path.equals(start.path, end.path);

        var startVoid = _this.getMatch(start.path, 'void');

        var endVoid = _this.getMatch(end.path, 'void'); // If the start or end points are inside an inline void, nudge them out.


        if (startVoid) {
          var block = _this.getMatch(start.path, 'block');

          var before = _this.getBefore(start);

          if (before && block && Path.isAncestor(block[1], before.path)) {
            start = before;
          }
        }

        if (endVoid) {
          var _block = _this.getMatch(end.path, 'block');

          var after = _this.getAfter(end);

          if (after && _block && Path.isAncestor(_block[1], after.path)) {
            end = after;
          }
        } // Get the highest nodes that are completely inside the range, as well as
        // the start and end nodes.


        var matches = _this.matches({
          at: at,
          match: function match(_ref) {
            var _ref2 = slicedToArray(_ref, 2),
                n = _ref2[0],
                p = _ref2[1];

            return Element.isElement(n) && _this.isVoid(n) || !Path.isCommon(p, start.path) && !Path.isCommon(p, end.path);
          }
        });

        var pathRefs = Array.from(matches, function (_ref3) {
          var _ref4 = slicedToArray(_ref3, 2),
              p = _ref4[1];

          return _this.createPathRef(p);
        });

        var startRef = _this.createPointRef(start);

        var endRef = _this.createPointRef(end);

        if (!isSingleText && !startVoid) {
          var _point = startRef.current;

          var _this$getLeaf = _this.getLeaf(_point),
              _this$getLeaf2 = slicedToArray(_this$getLeaf, 1),
              node = _this$getLeaf2[0];

          var path = _point.path;
          var _start = start,
              offset = _start.offset;
          var text = node.text.slice(offset);

          _this.apply({
            type: 'remove_text',
            path: path,
            offset: offset,
            text: text
          });
        }

        for (var _i = 0, _pathRefs = pathRefs; _i < _pathRefs.length; _i++) {
          var pathRef = _pathRefs[_i];

          var _path2 = pathRef.unref();

          _this.removeNodes({
            at: _path2
          });
        }

        if (!endVoid) {
          var _point2 = endRef.current;

          var _this$getLeaf3 = _this.getLeaf(_point2),
              _this$getLeaf4 = slicedToArray(_this$getLeaf3, 1),
              _node = _this$getLeaf4[0];

          var _path = _point2.path;

          var _offset = isSingleText ? start.offset : 0;

          var _text = _node.text.slice(_offset, end.offset);

          _this.apply({
            type: 'remove_text',
            path: _path,
            offset: _offset,
            text: _text
          });
        }

        var isBlockAncestor = Value.isValue(ancestor) || Element.isElement(ancestor) && !_this.isInline(ancestor);

        if (!isSingleText && isBlockAncestor && endRef.current && startRef.current) {
          _this.mergeNodes({
            at: endRef.current,
            hanging: true
          });
        }

        var point = endRef.unref() || startRef.unref();

        if (options.at == null && point) {
          _this.select(point);
        }
      });
    }
    /**
     * Insert a fragment at a specific location in the editor.
     */

  }, {
    key: "insertFragment",
    value: function insertFragment(fragment) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var selection = _this2.value.selection;
        var at = options.at;
        var isSelection = false;

        if (!at && selection) {
          at = selection;
          isSelection = true;
        }

        if (Range.isRange(at) && Range.isCollapsed(at)) {
          at = at.anchor;
        }

        if (Range.isRange(at)) {
          var _Range$edges3 = Range.edges(at),
              _Range$edges4 = slicedToArray(_Range$edges3, 2),
              end = _Range$edges4[1];

          var _pointRef = _this2.createPointRef(end);

          _this2["delete"]({
            at: at
          });

          at = _pointRef.unref();
        }

        if (!Point.isPoint(at) || _this2.getMatch(at.path, 'void')) {
          return;
        }

        var pointRef = _this2.createPointRef(at);

        _this2.splitNodes({
          at: at,
          always: true
        });

        if (pointRef.current) {
          var _this2$getMatch = _this2.getMatch(pointRef.current.path, 'block'),
              _this2$getMatch2 = slicedToArray(_this2$getMatch, 2),
              insertPath = _this2$getMatch2[1];

          _this2.insertNodes(fragment.nodes, {
            at: insertPath
          });

          var afterClosest = _this2.getMatch(pointRef.current.path, 'block');

          var beforeClosest = _this2.getMatch(at.path, 'block');

          if (afterClosest && beforeClosest) {
            var _afterClosest = slicedToArray(afterClosest, 2),
                afterPath = _afterClosest[1];

            var _beforeClosest = slicedToArray(beforeClosest, 2),
                beforePath = _beforeClosest[1];

            var startPath = Path.next(beforePath);

            _this2.mergeNodes({
              at: afterPath
            });

            _this2.mergeNodes({
              at: startPath
            });
          }
        }

        if (isSelection) {
          _this2.select(pointRef.current);
        }

        pointRef.unref();
      });
    }
    /**
     * Insert a string of text in the editor.
     */

  }, {
    key: "insertText",
    value: function insertText(text) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var selection = _this3.value.selection;
        var at = options.at;

        if (!at && selection) {
          at = selection;
        }

        if (Range.isRange(at)) {
          if (Range.isCollapsed(at)) {
            at = at.anchor;
          } else {
            var pointRef = _this3.createPointRef(Range.end(at));

            _this3["delete"]({
              at: at
            });

            at = pointRef.unref();
          }
        }

        if (Point.isPoint(at) && !_this3.getMatch(at.path, 'void')) {
          var _at = at,
              path = _at.path,
              offset = _at.offset;

          _this3.apply({
            type: 'insert_text',
            path: path,
            offset: offset,
            text: text
          });
        }
      });
    }
    /**
     * Remove a string of text in the editor.
     */

  }, {
    key: "removeText",
    value: function removeText(text) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var _options$at2 = options.at,
            at = _options$at2 === void 0 ? _this4.value.selection : _options$at2;

        if (!at || Range.isCollapsed(at)) {
          return;
        }

        var _Range$edges5 = Range.edges(at),
            _Range$edges6 = slicedToArray(_Range$edges5, 2),
            start = _Range$edges6[0],
            end = _Range$edges6[1];

        var texts = _this4.texts({
          at: at
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this4.texts({
            at: at
          })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = slicedToArray(_step.value, 2),
                node = _step$value[0],
                path = _step$value[1];

            if (Point.isPoint(at) && !_this4.getMatch(at.path, 'void')) {
              var _path3 = at.path,
                  offset = at.offset;

              _this4.apply({
                type: 'insert_text',
                path: _path3,
                offset: offset,
                text: text
              });
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  }]);

  return DeletingCommands;
}();

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var NodeCommands =
/*#__PURE__*/
function () {
  function NodeCommands() {
    classCallCheck(this, NodeCommands);
  }

  createClass(NodeCommands, [{
    key: "insertNodes",

    /**
     * Insert nodes at a specific location in the editor.
     */
    value: function insertNodes(nodes) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var selection = _this.value.selection;
        var at = options.at,
            match = options.match;
        var select = false;

        if (Node.isNode(nodes)) {
          nodes = [nodes];
        }

        if (nodes.length === 0) {
          return;
        }

        var _nodes = nodes,
            _nodes2 = slicedToArray(_nodes, 1),
            node = _nodes2[0];

        if (match == null) {
          if (Path.isPath(at)) {
            match = at.length;
          } else if (Text.isText(node)) {
            match = 'text';
          } else if (_this.isInline(node)) {
            match = 'inline';
          } else {
            match = 'block';
          }
        } // By default, use the selection as the target location. But if there is
        // no selection, insert at the end of the document since that is such a
        // common use case when inserting from a non-selected state.


        if (!at) {
          at = selection || _this.getEnd([]) || [_this.value.nodes.length];
          select = true;
        }

        if (Range.isRange(at)) {
          if (Range.isCollapsed(at)) {
            at = at.anchor;
          } else {
            var _Range$edges = Range.edges(at),
                _Range$edges2 = slicedToArray(_Range$edges, 2),
                end = _Range$edges2[1];

            var pointRef = _this.createPointRef(end);

            _this["delete"]({
              at: at
            });

            at = pointRef.unref();
          }
        }

        if (Point.isPoint(at)) {
          var atMatch = _this.getMatch(at.path, match);

          if (atMatch) {
            var _atMatch = slicedToArray(atMatch, 2),
                matchPath = _atMatch[1];

            var pathRef = _this.createPathRef(matchPath);

            var isAtEnd = _this.isEnd(at, matchPath);

            _this.splitNodes({
              at: at,
              match: match
            });

            var path = pathRef.unref();
            at = isAtEnd ? Path.next(path) : path;
          } else {
            return;
          }
        }

        var parentPath = Path.parent(at);
        var index = at[at.length - 1];

        if (_this.getMatch(parentPath, 'void')) {
          return;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _node = _step.value;

            var _path = parentPath.concat(index);

            index++;

            _this.apply({
              type: 'insert_node',
              path: _path,
              node: _node
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (select) {
          var point = _this.getEnd(at);

          if (point) {
            _this.select(point);
          }
        }
      });
    }
    /**
     * Lift nodes at a specific location upwards in the document tree, splitting
     * their parent in two if necessary.
     */

  }, {
    key: "liftNodes",
    value: function liftNodes(options) {
      var _this2 = this;

      this.withoutNormalizing(function () {
        var _options$at = options.at,
            at = _options$at === void 0 ? _this2.value.selection : _options$at,
            _options$match = options.match,
            match = _options$match === void 0 ? Path.isPath(at) ? at.length : 'block' : _options$match;

        if (!at) {
          return;
        }

        var matches = _this2.matches({
          at: at,
          match: match
        });

        var pathRefs = Array.from(matches, function (_ref) {
          var _ref2 = slicedToArray(_ref, 2),
              p = _ref2[1];

          return _this2.createPathRef(p);
        });

        for (var _i = 0, _pathRefs = pathRefs; _i < _pathRefs.length; _i++) {
          var pathRef = _pathRefs[_i];
          var path = pathRef.unref();

          if (path.length < 2) {
            throw new Error("Cannot lift node at a path [".concat(path, "] because it has a depth of less than `2`."));
          }

          var _this2$getNode = _this2.getNode(Path.parent(path)),
              _this2$getNode2 = slicedToArray(_this2$getNode, 2),
              parent = _this2$getNode2[0],
              parentPath = _this2$getNode2[1];

          var index = path[path.length - 1];
          var length = parent.nodes.length;

          if (length === 1) {
            _this2.moveNodes({
              at: path,
              to: Path.next(parentPath)
            });

            _this2.removeNodes({
              at: parentPath
            });
          } else if (index === 0) {
            _this2.moveNodes({
              at: path,
              to: parentPath
            });
          } else if (index === length - 1) {
            _this2.moveNodes({
              at: path,
              to: Path.next(parentPath)
            });
          } else {
            _this2.splitNodes({
              at: Path.next(path)
            });

            _this2.moveNodes({
              at: path,
              to: Path.next(parentPath)
            });
          }
        }
      });
    }
    /**
     * Merge a node at a location with the previous node of the same depth,
     * removing any empty containing nodes after the merge if necessary.
     */

  }, {
    key: "mergeNodes",
    value: function mergeNodes() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.withoutNormalizing(function () {
        var _options$at2 = options.at,
            at = _options$at2 === void 0 ? _this3.value.selection : _options$at2;
        var _options$match2 = options.match,
            match = _options$match2 === void 0 ? Path.isPath(at) ? at.length : 'block' : _options$match2,
            _options$hanging = options.hanging,
            hanging = _options$hanging === void 0 ? false : _options$hanging;

        if (!at) {
          return;
        }

        if (!hanging && Range.isRange(at)) {
          at = _this3.unhangRange(at);
        }

        if (Range.isRange(at)) {
          if (Range.isCollapsed(at)) {
            at = at.anchor;
          } else {
            var _Range$edges3 = Range.edges(at),
                _Range$edges4 = slicedToArray(_Range$edges3, 2),
                end = _Range$edges4[1];

            var pointRef = _this3.createPointRef(end);

            _this3["delete"]({
              at: at
            });

            at = pointRef.unref();

            if (options.at == null) {
              _this3.select(at);
            }
          }
        }

        var current = _this3.getMatch(at, match);

        var prev = _this3.getPrevious(at, match);

        if (!current || !prev) {
          return;
        }

        var _current = slicedToArray(current, 2),
            node = _current[0],
            path = _current[1];

        var _prev = slicedToArray(prev, 2),
            prevNode = _prev[0],
            prevPath = _prev[1];

        var newPath = Path.next(prevPath);
        var commonPath = Path.common(path, prevPath);
        var isPreviousSibling = Path.isSibling(path, prevPath); // Determine if the merge will leave an ancestor of the path empty as a
        // result, in which case we'll want to remove it after merging.

        var emptyAncestor = Node.furthest(_this3.value, path, function (_ref3) {
          var _ref4 = slicedToArray(_ref3, 2),
              n = _ref4[0],
              p = _ref4[1];

          return Path.isDescendant(p, commonPath) && Path.isAncestor(p, path) && Element.isElement(n) && n.nodes.length === 1;
        });

        var emptyRef = emptyAncestor && _this3.createPathRef(emptyAncestor[1]);

        var properties;
        var position; // Ensure that the nodes are equivalent, and figure out what the position
        // and extra properties of the merge will be.

        if (Text.isText(node) && Text.isText(prevNode)) {
          var text = node.text,
              marks = node.marks,
              rest = objectWithoutProperties(node, ["text", "marks"]);

          position = prevNode.text.length;
          properties = rest;
        } else if (Element.isElement(node) && Element.isElement(prevNode)) {
          var nodes = node.nodes,
              _rest = objectWithoutProperties(node, ["nodes"]);

          position = prevNode.nodes.length;
          properties = _rest;
        } else {
          throw new Error("Cannot merge the node at path [".concat(path, "] with the previous sibling because it is not the same kind: ").concat(JSON.stringify(node), " ").concat(JSON.stringify(prevNode)));
        } // If the node isn't already the next sibling of the previous node, move
        // it so that it is before merging.


        if (!isPreviousSibling) {
          _this3.moveNodes({
            at: path,
            to: newPath
          });
        } // If there was going to be an empty ancestor of the node that was merged,
        // we remove it from the tree.


        if (emptyRef) {
          _this3.removeNodes({
            at: emptyRef.current
          });
        } // If the target node that we're merging with is empty, remove it instead
        // of merging the two. This is a common rich text editor behavior to
        // prevent losing formatting when deleting entire nodes when you have a
        // hanging selection.


        if (Element.isElement(prevNode) && _this3.isEmpty(prevNode) || Text.isText(prevNode) && prevNode.text === '') {
          _this3.removeNodes({
            at: prevPath
          });
        } else {
          _this3.apply({
            type: 'merge_node',
            path: newPath,
            position: position,
            target: null,
            properties: properties
          });
        }

        if (emptyRef) {
          emptyRef.unref();
        }
      });
    }
    /**
     * Move the nodes at a location to a new location.
     */

  }, {
    key: "moveNodes",
    value: function moveNodes(options) {
      var _this4 = this;

      this.withoutNormalizing(function () {
        var to = options.to,
            _options$at3 = options.at,
            at = _options$at3 === void 0 ? _this4.value.selection : _options$at3,
            _options$match3 = options.match,
            match = _options$match3 === void 0 ? Path.isPath(at) ? at.length : 'block' : _options$match3;

        if (!at) {
          return;
        }

        var toRef = _this4.createPathRef(to);

        var targets = _this4.matches({
          at: at,
          match: match
        });

        var pathRefs = Array.from(targets, function (_ref5) {
          var _ref6 = slicedToArray(_ref5, 2),
              p = _ref6[1];

          return _this4.createPathRef(p);
        });

        for (var _i2 = 0, _pathRefs2 = pathRefs; _i2 < _pathRefs2.length; _i2++) {
          var pathRef = _pathRefs2[_i2];
          var path = pathRef.unref();
          var newPath = toRef.current;

          if (path.length !== 0) {
            _this4.apply({
              type: 'move_node',
              path: path,
              newPath: newPath
            });
          }
        }

        toRef.unref();
      });
    }
    /**
     * Normalize a node at a path, returning it to a valid state if it is
     * currently invalid.
     */

  }, {
    key: "normalizeNodes",
    value: function normalizeNodes(options) {
      var at = options.at;

      var _this$getNode = this.getNode(at),
          _this$getNode2 = slicedToArray(_this$getNode, 1),
          node = _this$getNode2[0]; // There are no core normalizations for text nodes.


      if (Text.isText(node)) {
        return;
      } // Ensure that block and inline nodes have at least one text child.


      if (Element.isElement(node) && node.nodes.length === 0) {
        var child = {
          text: '',
          marks: []
        };
        this.insertNodes(child, {
          at: at.concat(0)
        });
        return;
      } // Determine whether the node should have block or inline children.


      var shouldHaveInlines = Element.isElement(node) && (this.isInline(node) || node.nodes.length === 0 || Text.isText(node.nodes[0]) || this.isInline(node.nodes[0])); // Since we'll be applying operations while iterating, keep track of an
      // index that accounts for any added/removed nodes.

      var n = 0;

      for (var i = 0; i < node.nodes.length; i++, n++) {
        var _child = node.nodes[i];
        var prev = node.nodes[i - 1];
        var isLast = i === node.nodes.length - 1;

        if (Element.isElement(_child)) {
          var isInline = this.isInline(_child); // Only allow block nodes in the top-level value and parent blocks that
          // only contain block nodes. Similarly, only allow inline nodes in other
          // inline nodes, or parent blocks that only contain inlines and text.

          if (isInline !== shouldHaveInlines) {
            this.removeNodes({
              at: at.concat(n)
            });
            n--;
            continue;
          } // Ensure that inline nodes are surrounded by text nodes.


          if (isInline) {
            if (prev == null || !Text.isText(prev)) {
              var _child2 = {
                text: '',
                marks: []
              };
              this.insertNodes(_child2, {
                at: at.concat(n)
              });
              n++;
              continue;
            }

            if (isLast) {
              var _child3 = {
                text: '',
                marks: []
              };
              this.insertNodes(_child3, {
                at: at.concat(n + 1)
              });
              n++;
              continue;
            }
          }
        } else {
          // Merge adjacent text nodes that are empty or have matching marks.
          if (prev != null && Text.isText(prev)) {
            if (Text.matches(_child, prev)) {
              this.mergeNodes({
                at: at.concat(n)
              });
              n--;
              continue;
            } else if (prev.text === '') {
              this.removeNodes({
                at: at.concat(n - 1)
              });
              n--;
              continue;
            } else if (isLast && _child.text === '') {
              this.removeNodes({
                at: at.concat(n)
              });
              n--;
              continue;
            }
          }
        }
      }
    }
    /**
     * Remove the nodes at a specific location in the document.
     */

  }, {
    key: "removeNodes",
    value: function removeNodes() {
      var _this5 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.withoutNormalizing(function () {
        var _options$at4 = options.at,
            at = _options$at4 === void 0 ? _this5.value.selection : _options$at4;
        var _options$match4 = options.match,
            match = _options$match4 === void 0 ? Path.isPath(at) ? at.length : 'block' : _options$match4,
            _options$hanging2 = options.hanging,
            hanging = _options$hanging2 === void 0 ? false : _options$hanging2;

        if (!at) {
          return;
        }

        if (!hanging && Range.isRange(at)) {
          at = _this5.unhangRange(at);
        }

        var depths = _this5.matches({
          at: at,
          match: match
        });

        var pathRefs = Array.from(depths, function (_ref7) {
          var _ref8 = slicedToArray(_ref7, 2),
              p = _ref8[1];

          return _this5.createPathRef(p);
        });

        for (var _i3 = 0, _pathRefs3 = pathRefs; _i3 < _pathRefs3.length; _i3++) {
          var pathRef = _pathRefs3[_i3];
          var path = pathRef.unref();

          var _this5$getNode = _this5.getNode(path),
              _this5$getNode2 = slicedToArray(_this5$getNode, 1),
              node = _this5$getNode2[0];

          _this5.apply({
            type: 'remove_node',
            path: path,
            node: node
          });
        }
      });
    }
    /**
     * Set new properties on the nodes ...
     */

  }, {
    key: "setNodes",
    value: function setNodes(props) {
      var _this6 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var _options$at5 = options.at,
            at = _options$at5 === void 0 ? _this6.value.selection : _options$at5;
        var _options$match5 = options.match,
            match = _options$match5 === void 0 ? Path.isPath(at) ? at.length : 'block' : _options$match5,
            _options$hanging3 = options.hanging,
            hanging = _options$hanging3 === void 0 ? false : _options$hanging3;

        if (!at) {
          return;
        }

        if (!hanging && Range.isRange(at)) {
          at = _this6.unhangRange(at);
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _this6.matches({
            at: at,
            match: match
          })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = slicedToArray(_step2.value, 2),
                node = _step2$value[0],
                path = _step2$value[1];

            var properties = {};
            var newProperties = {};

            for (var k in props) {
              if (k === 'annotations' || k === 'marks' || k === 'nodes' || k === 'selection' || k === 'text') {
                continue;
              }

              if (props[k] !== node[k]) {
                properties[k] = node[k];
                newProperties[k] = props[k];
              }
            }

            if (Object.keys(newProperties).length !== 0) {
              _this6.apply({
                type: 'set_node',
                path: path,
                properties: properties,
                newProperties: newProperties
              });
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      });
    }
    /**
     * Split the nodes at a specific location.
     */

  }, {
    key: "splitNodes",
    value: function splitNodes() {
      var _this7 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.withoutNormalizing(function () {
        var match = options.match,
            _options$at6 = options.at,
            at = _options$at6 === void 0 ? _this7.value.selection : _options$at6,
            _options$height = options.height,
            height = _options$height === void 0 ? 0 : _options$height,
            _options$always = options.always,
            always = _options$always === void 0 ? false : _options$always;

        if (match == null) {
          match = Path.isPath(at) ? at.length : 'block';
        }

        if (Range.isRange(at)) {
          at = deleteRange(_this7, at);
        } // If the target is a path, the default height-skipping and position
        // counters need to account for us potentially splitting at a non-leaf.


        if (Path.isPath(at)) {
          var point = _this7.getPoint(at);

          match = at.length - 1;
          height = point.path.length - at.length + 1;
          at = point;
          always = true;
        }

        if (!at) {
          return;
        }

        var beforeRef = _this7.createPointRef(at, {
          affinity: 'backward'
        });

        var highest = _this7.getMatch(at, match);

        if (!highest) {
          return;
        }

        var voidMatch = _this7.getMatch(at, 'void');

        var nudge = 0;

        if (voidMatch) {
          var _voidMatch = slicedToArray(voidMatch, 2),
              voidNode = _voidMatch[0],
              voidPath = _voidMatch[1];

          if (Element.isElement(voidNode) && _this7.isInline(voidNode)) {
            var after = _this7.getAfter(voidPath);

            if (!after) {
              var text = {
                text: '',
                marks: []
              };
              var afterPath = Path.next(voidPath);

              _this7.insertNodes(text, {
                at: afterPath
              });

              after = _this7.getPoint(afterPath);
            }

            at = after;
            always = true;
          }

          var siblingHeight = at.path.length - voidPath.length;
          height = siblingHeight + 1;
          always = true;
        }

        var afterRef = _this7.createPointRef(at);

        var depth = at.path.length - height;

        var _highest = slicedToArray(highest, 2),
            highestPath = _highest[1];

        var lowestPath = at.path.slice(0, depth);
        var position = height === 0 ? at.offset : at.path[depth] + nudge;
        var target = null;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _this7.levels({
            at: lowestPath,
            reverse: true
          })[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = slicedToArray(_step3.value, 2),
                node = _step3$value[0],
                path = _step3$value[1];

            var split = false;

            if (path.length < highestPath.length || path.length === 0 || Element.isElement(node) && _this7.isVoid(node)) {
              break;
            }

            if (always || !beforeRef || !_this7.isEdge(beforeRef.current, path)) {
              var _text = node.text,
                  marks = node.marks,
                  nodes = node.nodes,
                  properties = objectWithoutProperties(node, ["text", "marks", "nodes"]);

              _this7.apply({
                type: 'split_node',
                path: path,
                position: position,
                target: target,
                properties: properties
              });

              split = true;
            }

            target = position;
            position = path[path.length - 1] + (split ? 1 : 0);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (options.at == null) {
          var _point = afterRef.current || _this7.getEnd([]);

          _this7.select(_point);
        }

        beforeRef.unref();
        afterRef.unref();
      });
    }
    /**
     * Unwrap the nodes at a location from a parent node, splitting the parent if
     * necessary to ensure that only the content in the range is unwrapped.
     */

  }, {
    key: "unwrapNodes",
    value: function unwrapNodes(options) {
      var _this8 = this;

      this.withoutNormalizing(function () {
        var _options$at7 = options.at,
            at = _options$at7 === void 0 ? _this8.value.selection : _options$at7,
            _options$match6 = options.match,
            match = _options$match6 === void 0 ? Path.isPath(at) ? at.length : 'block' : _options$match6,
            _options$split = options.split,
            split = _options$split === void 0 ? false : _options$split;

        if (!at) {
          return;
        }

        var matches = _this8.matches({
          at: at,
          match: match
        });

        var pathRefs = Array.from(matches, function (_ref9) {
          var _ref10 = slicedToArray(_ref9, 2),
              p = _ref10[1];

          return _this8.createPathRef(p);
        });

        for (var _i4 = 0, _pathRefs4 = pathRefs; _i4 < _pathRefs4.length; _i4++) {
          var pathRef = _pathRefs4[_i4];
          var path = pathRef.unref();
          var depth = path.length + 1;

          var range = _this8.getRange(path);

          if (split && Range.isRange(at)) {
            range = Range.intersection(at, range);
          }

          _this8.liftNodes({
            at: range,
            match: depth
          });
        }
      });
    }
    /**
     * Wrap the nodes at a location in a new container node, splitting the edges
     * of the range first to ensure that only the content in the range is wrapped.
     */

  }, {
    key: "wrapNodes",
    value: function wrapNodes(element) {
      var _this9 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var _options$split2 = options.split,
            split = _options$split2 === void 0 ? false : _options$split2;
        var match = options.match,
            _options$at8 = options.at,
            at = _options$at8 === void 0 ? _this9.value.selection : _options$at8;

        if (!at) {
          return;
        }

        if (match == null) {
          if (Path.isPath(at)) {
            match = at.length;
          } else if (_this9.isInline(element)) {
            match = 'inline';
          } else {
            match = 'block';
          }
        }

        if (split && Range.isRange(at)) {
          var _Range$edges5 = Range.edges(at),
              _Range$edges6 = slicedToArray(_Range$edges5, 2),
              start = _Range$edges6[0],
              end = _Range$edges6[1];

          var rangeRef = _this9.createRangeRef(at, {
            affinity: 'inward'
          });

          _this9.splitNodes({
            at: end,
            match: match
          });

          _this9.splitNodes({
            at: start,
            match: match
          });

          at = rangeRef.unref();

          if (options.at == null) {
            _this9.select(at);
          }
        }

        var roots = _this9.isInline(element) ? Array.from(_this9.matches(_objectSpread({}, options, {
          at: at,
          match: 'block'
        }))) : [[_this9.value, []]];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = roots[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _step4$value = slicedToArray(_step4.value, 2),
                rootPath = _step4$value[1];

            var a = Range.isRange(at) ? Range.intersection(at, _this9.getRange(rootPath)) : at;

            if (!a) {
              continue;
            }

            var matches = Array.from(_this9.matches(_objectSpread({}, options, {
              at: a,
              match: match
            })));

            if (matches.length > 0) {
              var _matches = slicedToArray(matches, 1),
                  first = _matches[0];

              var last = matches[matches.length - 1];

              var _first = slicedToArray(first, 2),
                  firstPath = _first[1];

              var _last = slicedToArray(last, 2),
                  lastPath = _last[1];

              var commonPath = Path.equals(firstPath, lastPath) ? Path.parent(firstPath) : Path.common(firstPath, lastPath);

              var range = _this9.getRange(firstPath, lastPath);

              var depth = commonPath.length + 1;
              var wrapperPath = Path.next(lastPath).slice(0, depth);

              var wrapper = _objectSpread({}, element, {
                nodes: []
              });

              _this9.insertNodes(wrapper, {
                at: wrapperPath
              });

              _this9.moveNodes({
                at: range,
                match: depth,
                to: wrapperPath.concat(0)
              });
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      });
    }
  }]);

  return NodeCommands;
}();
/**
 * Convert a range into a point by deleting it's content.
 */


var deleteRange = function deleteRange(editor, range) {
  if (Range.isCollapsed(range)) {
    return range.anchor;
  } else {
    var _Range$edges7 = Range.edges(range),
        _Range$edges8 = slicedToArray(_Range$edges7, 2),
        end = _Range$edges8[1];

    var pointRef = editor.createPointRef(end);
    editor["delete"]({
      at: range
    });
    return pointRef.unref();
  }
};

var MarkCommands =
/*#__PURE__*/
function () {
  function MarkCommands() {
    classCallCheck(this, MarkCommands);
  }

  createClass(MarkCommands, [{
    key: "addMarks",

    /**
     * Add a set of marks to the text nodes at a location.
     */
    value: function addMarks(marks) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var at = splitLocation(_this, options);

        if (!at) {
          return;
        } // De-dupe the marks being added to ensure the set is unique.


        var set = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = marks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mark = _step.value;

            if (!Mark.exists(mark, set)) {
              set.push(mark);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _this.texts({
            at: at
          })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = slicedToArray(_step2.value, 2),
                node = _step2$value[0],
                path = _step2$value[1];

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = set[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _mark = _step3.value;

                if (!Mark.exists(_mark, node.marks)) {
                  _this.apply({
                    type: 'add_mark',
                    path: path,
                    mark: _mark
                  });
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      });
    }
  }, {
    key: "removeMarks",
    value: function removeMarks(marks) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var at = splitLocation(_this2, options);

        if (at) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = _this2.marks({
              at: at
            })[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _step4$value = slicedToArray(_step4.value, 4),
                  mark = _step4$value[0],
                  i = _step4$value[1],
                  node = _step4$value[2],
                  path = _step4$value[3];

              if (Mark.exists(mark, marks)) {
                _this2.apply({
                  type: 'remove_mark',
                  path: path,
                  mark: mark
                });
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      });
    }
  }, {
    key: "setMarks",
    value: function setMarks(marks, props) {
      var _this3 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.withoutNormalizing(function () {
        var at = splitLocation(_this3, options);

        if (at) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = _this3.marks({
              at: at
            })[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _step5$value = slicedToArray(_step5.value, 4),
                  mark = _step5$value[0],
                  i = _step5$value[1],
                  node = _step5$value[2],
                  path = _step5$value[3];

              if (Mark.exists(mark, marks)) {
                var newProps = {};

                for (var k in props) {
                  if (props[k] !== mark[k]) {
                    newProps[k] = props[k];
                  }
                }

                if (Object.keys(newProps).length > 0) {
                  _this3.apply({
                    type: 'set_mark',
                    path: path,
                    properties: mark,
                    newProperties: newProps
                  });
                }
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                _iterator5["return"]();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      });
    }
  }, {
    key: "toggleMarks",
    value: function toggleMarks(marks) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.withoutNormalizing(function () {
        var existing = _this4.getActiveMarks(options);

        var exists = marks.every(function (m) {
          return Mark.exists(m, existing);
        });

        if (exists) {
          _this4.removeMarks(marks, options);
        } else {
          _this4.addMarks(marks, options);
        }
      });
    }
  }]);

  return MarkCommands;
}();
/**
 * Split the text nodes at a range's edges to prepare for adding/removing marks.
 */


var splitLocation = function splitLocation(editor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$at = options.at,
      at = _options$at === void 0 ? editor.value.selection : _options$at,
      _options$hanging = options.hanging,
      hanging = _options$hanging === void 0 ? false : _options$hanging;

  if (!at) {
    return;
  }

  if (Range.isRange(at)) {
    if (!hanging) {
      at = editor.unhangRange(at);
    }

    var rangeRef = editor.createRangeRef(at, {
      affinity: 'inward'
    });

    var _Range$edges = Range.edges(at),
        _Range$edges2 = slicedToArray(_Range$edges, 2),
        start = _Range$edges2[0],
        end = _Range$edges2[1];

    editor.splitNodes({
      at: end,
      match: 'text'
    });
    editor.splitNodes({
      at: start,
      match: 'text'
    });
    var range = rangeRef.unref();

    if (options.at == null) {
      editor.select(range);
    }

    return range;
  }

  return at;
};

var SelectionCommands =
/*#__PURE__*/
function () {
  function SelectionCommands() {
    classCallCheck(this, SelectionCommands);
  }

  createClass(SelectionCommands, [{
    key: "collapse",

    /**
     * Collapse the selection.
     */
    value: function collapse() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$edge = options.edge,
          edge = _options$edge === void 0 ? 'anchor' : _options$edge;
      var selection = this.value.selection;

      if (!selection) {
        return;
      } else if (edge === 'anchor') {
        this.select(selection.anchor);
      } else if (edge === 'focus') {
        this.select(selection.focus);
      } else if (edge === 'start') {
        var _Range$edges = Range.edges(selection),
            _Range$edges2 = slicedToArray(_Range$edges, 1),
            start = _Range$edges2[0];

        this.select(start);
      } else if (edge === 'end') {
        var _Range$edges3 = Range.edges(selection),
            _Range$edges4 = slicedToArray(_Range$edges3, 2),
            end = _Range$edges4[1];

        this.select(end);
      }
    }
    /**
     * Unset the selection.
     */

  }, {
    key: "deselect",
    value: function deselect() {
      var selection = this.value.selection;

      if (selection) {
        this.apply({
          type: 'set_selection',
          properties: selection,
          newProperties: null
        });
      }
    }
    /**
     * Move the selection's point forward or backward.
     */

  }, {
    key: "move",
    value: function move() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var selection = this.value.selection;
      var _options$distance = options.distance,
          distance = _options$distance === void 0 ? 1 : _options$distance,
          _options$unit = options.unit,
          unit = _options$unit === void 0 ? 'character' : _options$unit,
          _options$reverse = options.reverse,
          reverse = _options$reverse === void 0 ? false : _options$reverse;
      var _options$edge2 = options.edge,
          edge = _options$edge2 === void 0 ? null : _options$edge2;

      if (!selection) {
        return;
      }

      if (edge === 'start') {
        edge = Range.isBackward(selection) ? 'focus' : 'anchor';
      }

      if (edge === 'end') {
        edge = Range.isBackward(selection) ? 'anchor' : 'focus';
      }

      var anchor = selection.anchor,
          focus = selection.focus;
      var opts = {
        distance: distance,
        unit: unit
      };
      var props = {};

      if (edge == null || edge === 'anchor') {
        var point = reverse ? this.getBefore(anchor, opts) : this.getAfter(anchor, opts);

        if (point) {
          props.anchor = point;
        }
      }

      if (edge == null || edge === 'focus') {
        var _point = reverse ? this.getBefore(focus, opts) : this.getAfter(focus, opts);

        if (_point) {
          props.focus = _point;
        }
      }

      this.setSelection(props);
    }
    /**
     * Set the selection to a new value.
     */

  }, {
    key: "select",
    value: function select(target) {
      var selection = this.value.selection;
      target = this.getRange(target);

      if (selection) {
        this.setSelection(target);
        return;
      }

      if (!Range.isRange(target)) {
        throw new Error("When setting the selection and the current selection is `null` you must provide at least an `anchor` and `focus`, but you passed: ".concat(JSON.stringify(target)));
      }

      this.apply({
        type: 'set_selection',
        properties: selection,
        newProperties: target
      });
    }
    /**
     * Set new properties on one of the selection's points.
     */

  }, {
    key: "setPoint",
    value: function setPoint(props, options) {
      var selection = this.value.selection;
      var _options$edge3 = options.edge,
          edge = _options$edge3 === void 0 ? 'both' : _options$edge3;

      if (!selection) {
        return;
      }

      if (edge === 'start') {
        edge = Range.isBackward(selection) ? 'focus' : 'anchor';
      }

      if (edge === 'end') {
        edge = Range.isBackward(selection) ? 'anchor' : 'focus';
      }

      var anchor = selection.anchor,
          focus = selection.focus;
      var point = edge === 'anchor' ? anchor : focus;
      var newPoint = Object.assign(point, props);

      if (edge === 'anchor') {
        this.setSelection({
          anchor: newPoint
        });
      } else {
        this.setSelection({
          focus: newPoint
        });
      }
    }
    /**
     * Set new properties on the selection.
     */

  }, {
    key: "setSelection",
    value: function setSelection(props) {
      var selection = this.value.selection;
      var oldProps = {};
      var newProps = {};

      if (!selection) {
        return;
      }

      for (var k in props) {
        if (k === 'anchor' && props.anchor != null && !Point.equals(props.anchor, selection.anchor) || k === 'focus' && props.focus != null && !Point.equals(props.focus, selection.focus) || k !== 'anchor' && k !== 'focus' && props[k] !== selection[k]) {
          oldProps[k] = selection[k];
          newProps[k] = props[k];
        }
      }

      if (Object.keys(oldProps).length > 0) {
        this.apply({
          type: 'set_selection',
          properties: oldProps,
          newProperties: newProps
        });
      }
    }
  }]);

  return SelectionCommands;
}();

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

var GeneralCommands =
/*#__PURE__*/
function () {
  function GeneralCommands() {
    classCallCheck(this, GeneralCommands);
  }

  createClass(GeneralCommands, [{
    key: "apply",
    value: function apply(op) {
      var _this = this;

      this.value = Value.transform(this.value, op);
      this.operations.push(op);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = PATH_REFS.get(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ref = _step.value;
          ref.transform(op);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = POINT_REFS.get(this)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref = _step2.value;

          _ref.transform(op);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = RANGE_REFS.get(this)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref2 = _step3.value;

          _ref2.transform(op);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var pathCache = {};
      var dirtyPaths = [];

      var add = function add(path) {
        if (path == null) {
          return;
        }

        var key = path.join(',');

        if (key in pathCache) {
          return;
        }

        pathCache[key] = true;
        dirtyPaths.push(path);
      };

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = DIRTY_PATHS.get(this)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var path = _step4.value;
          add(Path.transform(path, op));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = getDirtyPaths(op)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _path = _step5.value;
          add(_path);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      DIRTY_PATHS.set(this, dirtyPaths);
      this.normalize();

      if (!FLUSHING.get(this)) {
        FLUSHING.set(this, true);
        Promise.resolve().then(function () {
          return _this.flush();
        });
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      FLUSHING.set(this, false);
      var value = this.value,
          operations = this.operations;

      if (operations.length !== 0) {
        this.operations = [];
        this.onChange(value, operations);
      }
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$force = options.force,
          force = _options$force === void 0 ? false : _options$force;

      if (!NORMALIZING.get(this)) {
        return;
      }

      if (force) {
        var allPaths = Array.from(Node.nodes(this.value), function (_ref3) {
          var _ref4 = slicedToArray(_ref3, 2),
              p = _ref4[1];

          return p;
        });
        DIRTY_PATHS.set(this, allPaths);
      }

      if (DIRTY_PATHS.get(this).length === 0) {
        return;
      }

      this.withoutNormalizing(function () {
        var max = DIRTY_PATHS.get(_this2).length * 42; // HACK: better way to do this?

        var m = 0;

        while (DIRTY_PATHS.get(_this2).length !== 0) {
          if (m > max) {
            throw new Error("\n            Could not completely normalize the value after ".concat(max, " iterations! This is usually due to incorrect normalization logic that leaves a node in an invalid state.\n          "));
          }

          var path = DIRTY_PATHS.get(_this2).pop();

          _this2.normalizeNodes({
            at: path
          });

          m++;
        }
      });
    }
  }, {
    key: "withoutNormalizing",
    value: function withoutNormalizing(fn) {
      var value = NORMALIZING.get(this);
      NORMALIZING.set(this, false);
      fn();
      NORMALIZING.set(this, value);
      this.normalize();
    }
  }]);

  return GeneralCommands;
}();
/**
 * Get the "dirty" paths generated from an operation.
 */


var getDirtyPaths = function getDirtyPaths(op) {
  switch (op.type) {
    case 'add_mark':
    case 'insert_text':
    case 'remove_mark':
    case 'remove_text':
    case 'set_mark':
    case 'set_node':
      {
        var path = op.path;
        return Path.levels(path);
      }

    case 'insert_node':
      {
        var node = op.node,
            _path2 = op.path;
        var levels = Path.levels(_path2);
        var descendants = Text.isText(node) ? [] : Array.from(Node.nodes(node), function (_ref5) {
          var _ref6 = slicedToArray(_ref5, 2),
              p = _ref6[1];

          return _path2.concat(p);
        });
        return [].concat(toConsumableArray(levels), toConsumableArray(descendants));
      }

    case 'merge_node':
      {
        var _path3 = op.path;
        var ancestors = Path.ancestors(_path3);
        var previousPath = Path.previous(_path3);
        return [].concat(toConsumableArray(ancestors), [previousPath]);
      }

    case 'move_node':
      {
        var _path4 = op.path,
            newPath = op.newPath;

        if (Path.equals(_path4, newPath)) {
          return [];
        }

        var oldAncestors = [];
        var newAncestors = [];
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = Path.ancestors(_path4)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var ancestor = _step6.value;

            var _path5 = Path.transform(ancestor, op);

            oldAncestors.push(_path5);
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = Path.ancestors(newPath)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _ancestor = _step7.value;

            var _path6 = Path.transform(_ancestor, op);

            newAncestors.push(_path6);
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        return [].concat(oldAncestors, newAncestors);
      }

    case 'remove_node':
      {
        var _path7 = op.path;

        var _ancestors = Path.ancestors(_path7);

        return toConsumableArray(_ancestors);
      }

    case 'split_node':
      {
        var _path8 = op.path;

        var _levels = Path.levels(_path8);

        var nextPath = Path.next(_path8);
        return [].concat(toConsumableArray(_levels), [nextPath]);
      }

    default:
      {
        return [];
      }
  }
};

var ElementQueries =
/*#__PURE__*/
function () {
  function ElementQueries() {
    classCallCheck(this, ElementQueries);
  }

  createClass(ElementQueries, [{
    key: "hasBlocks",

    /**
     * Check if a node has block children.
     */
    value: function hasBlocks(element) {
      var _this = this;

      return element.nodes.some(function (n) {
        return Element.isElement(n) && !_this.isInline(n);
      });
    }
    /**
     * Check if a node has inline and text children.
     */

  }, {
    key: "hasInlines",
    value: function hasInlines(element) {
      var _this2 = this;

      return element.nodes.some(function (n) {
        return Text.isText(n) || Element.isElement(n) && _this2.isInline(n);
      });
    }
    /**
     * Check if a node has text children.
     */

  }, {
    key: "hasTexts",
    value: function hasTexts(element) {
      return element.nodes.every(function (n) {
        return Text.isText(n);
      });
    }
    /**
     * Check if an element is empty, accounting for void nodes.
     */

  }, {
    key: "isEmpty",
    value: function isEmpty(element) {
      var nodes = element.nodes;

      var _nodes = slicedToArray(nodes, 1),
          first = _nodes[0];

      return nodes.length === 0 || nodes.length === 1 && Text.isText(first) && first.text === '' && !this.isVoid(element);
    }
    /**
     * Check if a node is an inline, meaning that it lives intermixed with text
     * nodes in the document tree.
     */

  }, {
    key: "isInline",
    value: function isInline(element) {
      return false;
    }
    /**
     * Check if a node is a void, meaning that Slate considers its content a black
     * box. It will be edited as if it has no content.
     */

  }, {
    key: "isVoid",
    value: function isVoid(element) {
      return false;
    }
  }]);

  return ElementQueries;
}();

var GeneralQueries =
/*#__PURE__*/
function () {
  function GeneralQueries() {
    classCallCheck(this, GeneralQueries);
  }

  createClass(GeneralQueries, [{
    key: "createPathRef",

    /**
     * Create a mutable ref for a `Path` object, which will stay in sync as new
     * operations are applied to the this.
     */
    value: function createPathRef(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$affinity = options.affinity,
          affinity = _options$affinity === void 0 ? 'forward' : _options$affinity;
      var ref = new PathRef({
        path: path,
        affinity: affinity,
        editor: this
      });
      return ref;
    }
    /**
     * Create a mutable ref for a `Point` object, which will stay in sync as new
     * operations are applied to the this.
     */

  }, {
    key: "createPointRef",
    value: function createPointRef(point) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$affinity2 = options.affinity,
          affinity = _options$affinity2 === void 0 ? 'forward' : _options$affinity2;
      var ref = new PointRef({
        point: point,
        affinity: affinity,
        editor: this
      });
      return ref;
    }
    /**
     * Create a mutable ref for a `Range` object, which will stay in sync as new
     * operations are applied to the this.
     */

  }, {
    key: "createRangeRef",
    value: function createRangeRef(range) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$affinity3 = options.affinity,
          affinity = _options$affinity3 === void 0 ? 'forward' : _options$affinity3;
      var ref = new RangeRef({
        range: range,
        affinity: affinity,
        editor: this
      });
      return ref;
    }
  }]);

  return GeneralQueries;
}();

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LocationQueries =
/*#__PURE__*/
function () {
  function LocationQueries() {
    classCallCheck(this, LocationQueries);
  }

  createClass(LocationQueries, [{
    key: "annotations",

    /**
     * Iterate through all of the annotations in the editor.
     */
    value:
    /*#__PURE__*/
    regenerator.mark(function annotations() {
      var options,
          _this$value,
          annotations,
          selection,
          _options$at,
          at,
          range,
          key,
          annotation,
          _args = arguments;

      return regenerator.wrap(function annotations$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              _this$value = this.value, annotations = _this$value.annotations, selection = _this$value.selection;
              _options$at = options.at, at = _options$at === void 0 ? selection : _options$at;

              if (at) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              range = this.getRange(at);
              _context.t0 = regenerator.keys(annotations);

            case 7:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 16;
                break;
              }

              key = _context.t1.value;
              annotation = annotations[key];

              if (!(at && !Range.includes(range, annotation))) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("continue", 7);

            case 12:
              _context.next = 14;
              return [annotation, key];

            case 14:
              _context.next = 7;
              break;

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, annotations, this);
    })
    /**
     * Iterate through all of the elements in the editor.
     */

  }, {
    key: "elements",
    value:
    /*#__PURE__*/
    regenerator.mark(function elements() {
      var _this = this;

      var options,
          _options$at2,
          at,
          _getSpan,
          _getSpan2,
          from,
          to,
          _args2 = arguments;

      return regenerator.wrap(function elements$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              _options$at2 = options.at, at = _options$at2 === void 0 ? this.value.selection : _options$at2;

              if (at) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return");

            case 4:
              _getSpan = getSpan(this, at, options), _getSpan2 = slicedToArray(_getSpan, 2), from = _getSpan2[0], to = _getSpan2[1];
              return _context2.delegateYield(Node.elements(this.value, _objectSpread$1({}, options, {
                from: from,
                to: to,
                pass: function pass(_ref) {
                  var _ref2 = slicedToArray(_ref, 1),
                      n = _ref2[0];

                  return Element.isElement(n) && _this.isVoid(n);
                }
              })), "t0", 6);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, elements, this);
    })
    /**
     * Get the marks that are "active" at a location. These are the
     * marks that will be added to any text that is inserted.
     *
     * The `union: true` option can be passed to create a union of marks across
     * the text nodes in the selection, instead of creating an intersection, which
     * is the default.
     *
     * Note: to obey common rich text behavior, if the selection is collapsed at
     * the start of a text node and there are previous text nodes in the same
     * block, it will carry those marks forward from the previous text node. This
     * allows for continuation of marks from previous words.
     */

  }, {
    key: "getActiveMarks",
    value: function getActiveMarks() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$union = options.union,
          union = _options$union === void 0 ? false : _options$union,
          _options$hanging = options.hanging,
          hanging = _options$hanging === void 0 ? false : _options$hanging;
      var _options$at3 = options.at,
          at = _options$at3 === void 0 ? this.value.selection : _options$at3;

      if (!at) {
        return [];
      }

      at = this.getRange(at);

      if (!hanging) {
        at = this.unhangRange(at);
      } // If the range is collapsed at the start of a text node, it should carry
      // over the marks from the previous text node in the same block.


      if (Range.isCollapsed(at) && at.anchor.offset === 0) {
        var _at = at,
            anchor = _at.anchor;
        var prev = this.getPrevious(anchor, 'text');

        if (prev && Path.isSibling(anchor.path, prev[1])) {
          var _prev = slicedToArray(prev, 2),
              prevNode = _prev[0],
              prevPath = _prev[1];

          if (Text.isText(prevNode)) {
            at = this.getRange(prevPath);
          }
        }
      }

      var marks = [];
      var first = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.texts({
          at: at
        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = slicedToArray(_step.value, 1),
              node = _step$value[0];

          if (first) {
            marks.push.apply(marks, toConsumableArray(node.marks));
            first = false;
            continue;
          }

          if (union) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = node.marks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var mark = _step2.value;

                if (!Mark.exists(mark, marks)) {
                  marks.push(mark);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          } else {
            // PERF: If we're doing an intersection and the result hits zero it can
            // never increase again, so we can exit early.
            if (marks.length === 0) {
              break;
            } // Iterate backwards so that removing marks doesn't impact indexing.


            for (var i = marks.length - 1; i >= 0; i--) {
              var existing = marks[i];

              if (!Mark.exists(existing, node.marks)) {
                marks.splice(i, 1);
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return marks;
    }
    /**
     * Get the point after a location.
     */

  }, {
    key: "getAfter",
    value: function getAfter(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var anchor = this.getPoint(at, {
        edge: 'end'
      });
      var focus = this.getEnd([]);
      var range = {
        anchor: anchor,
        focus: focus
      };
      var _options$distance = options.distance,
          distance = _options$distance === void 0 ? 1 : _options$distance;
      var d = 0;
      var target;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.positions(_objectSpread$1({}, options, {
          at: range
        }))[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var p = _step3.value;

          if (d > distance) {
            break;
          }

          if (d !== 0) {
            target = p;
          }

          d++;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return target;
    }
    /**
     * Get the common ancestor node of a location.
     */

  }, {
    key: "getAncestor",
    value: function getAncestor(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (Path.isPath(at) || Point.isPoint(at)) {
        return this.getParent(at, options);
      }

      var path = this.getPath(at, options);
      var ancestorPath = Path.equals(at.anchor.path, at.focus.path) ? Path.parent(path) : path;
      var ancestor = Node.get(this.value, ancestorPath);
      return [ancestor, ancestorPath];
    }
    /**
     * Get the point before a location.
     */

  }, {
    key: "getBefore",
    value: function getBefore(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var anchor = this.getStart([]);
      var focus = this.getPoint(at, {
        edge: 'start'
      });
      var range = {
        anchor: anchor,
        focus: focus
      };
      var _options$distance2 = options.distance,
          distance = _options$distance2 === void 0 ? 1 : _options$distance2;
      var d = 0;
      var target;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.positions(_objectSpread$1({}, options, {
          at: range,
          reverse: true
        }))[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var p = _step4.value;

          if (d > distance) {
            break;
          }

          if (d !== 0) {
            target = p;
          }

          d++;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return target;
    }
    /**
     * Get the start and end points of a location.
     */

  }, {
    key: "getEdges",
    value: function getEdges(at) {
      return [this.getStart(at), this.getEnd(at)];
    }
    /**
     * Get the end point of a location.
     */

  }, {
    key: "getEnd",
    value: function getEnd(at) {
      return this.getPoint(at, {
        edge: 'end'
      });
    }
    /**
     * Get the first node at a location.
     */

  }, {
    key: "getFirst",
    value: function getFirst(at) {
      var path = this.getPath(at, {
        edge: 'start'
      });
      return this.getNode(path);
    }
    /**
     * Get the fragment at a location.
     */

  }, {
    key: "getFragment",
    value: function getFragment(at) {
      var range = this.getRange(at);
      var fragment = Node.fragment(this.value, range);
      return fragment;
    }
    /**
     * Get the last node at a location.
     */

  }, {
    key: "getLast",
    value: function getLast(at) {
      var path = this.getPath(at, {
        edge: 'end'
      });
      return this.getNode(path);
    }
    /**
     * Get the leaf text node at a location.
     */

  }, {
    key: "getLeaf",
    value: function getLeaf(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var path = this.getPath(at, options);
      var node = Node.leaf(this.value, path);
      return [node, path];
    }
    /**
     * Get the first matching node in a single branch of the document.
     */

  }, {
    key: "getMatch",
    value: function getMatch(at, match) {
      // PERF: If the match is a path, don't traverse.
      if (Path.isPath(match)) {
        return this.getNode(match);
      } // PERF: If the target is a path and the match is a depth, don't traverse.


      if (typeof match === 'number' && match <= at.length && Path.isPath(at)) {
        var p = at.slice(0, match);
        return this.getNode(p);
      }

      var path = this.getPath(at);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.levels({
          at: path
        })[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var entry = _step5.value;

          if (isMatch(this, entry, match)) {
            return entry;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
    /**
     * Get the matching node in the branch of the document after a location.
     */

  }, {
    key: "getNext",
    value: function getNext(at, match) {
      var _this$getLast = this.getLast(at),
          _this$getLast2 = slicedToArray(_this$getLast, 2),
          from = _this$getLast2[1];

      var _this$getLast3 = this.getLast([]),
          _this$getLast4 = slicedToArray(_this$getLast3, 2),
          to = _this$getLast4[1];

      var span = [from, to];
      var i = 0;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.matches({
          at: span,
          match: match
        })[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var entry = _step6.value;

          if (i === 1) {
            return entry;
          }

          i++;
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
    /**
     * Get the node at a location.
     */

  }, {
    key: "getNode",
    value: function getNode(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var path = this.getPath(at, options);
      var node = Node.get(this.value, path);
      return [node, path];
    }
    /**
     * Get the parent node of a location.
     */

  }, {
    key: "getParent",
    value: function getParent(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var path = this.getPath(at, options);
      var parentPath = Path.parent(path);
      var entry = this.getNode(parentPath);
      return entry;
    }
    /**
     * Get the path of a location.
     */

  }, {
    key: "getPath",
    value: function getPath(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var depth = options.depth,
          edge = options.edge;

      if (Path.isPath(at)) {
        if (edge === 'start') {
          var _Node$first = Node.first(this.value, at),
              _Node$first2 = slicedToArray(_Node$first, 2),
              firstPath = _Node$first2[1];

          at = firstPath;
        } else if (edge === 'end') {
          var _Node$last = Node.last(this.value, at),
              _Node$last2 = slicedToArray(_Node$last, 2),
              lastPath = _Node$last2[1];

          at = lastPath;
        }
      }

      if (Range.isRange(at)) {
        if (edge === 'start') {
          at = Range.start(at);
        } else if (edge === 'end') {
          at = Range.end(at);
        } else {
          at = Path.common(at.anchor.path, at.focus.path);
        }
      }

      if (Point.isPoint(at)) {
        at = at.path;
      }

      if (depth != null) {
        at = at.slice(0, depth);
      }

      return at;
    }
    /**
     * Get the start or end point of a location.
     */

  }, {
    key: "getPoint",
    value: function getPoint(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$edge = options.edge,
          edge = _options$edge === void 0 ? 'start' : _options$edge;

      if (Path.isPath(at)) {
        var path;

        if (edge === 'end') {
          var _Node$last3 = Node.last(this.value, at),
              _Node$last4 = slicedToArray(_Node$last3, 2),
              lastPath = _Node$last4[1];

          path = lastPath;
        } else {
          var _Node$first3 = Node.first(this.value, at),
              _Node$first4 = slicedToArray(_Node$first3, 2),
              firstPath = _Node$first4[1];

          path = firstPath;
        }

        var node = Node.get(this.value, path);

        if (!Text.isText(node)) {
          throw new Error("Cannot get the ".concat(edge, " point in the node at path [").concat(at, "] because it has no ").concat(edge, " text node."));
        }

        return {
          path: path,
          offset: edge === 'end' ? node.text.length : 0
        };
      }

      if (Range.isRange(at)) {
        var _Range$edges = Range.edges(at),
            _Range$edges2 = slicedToArray(_Range$edges, 2),
            start = _Range$edges2[0],
            end = _Range$edges2[1];

        return edge === 'start' ? start : end;
      }

      return at;
    }
    /**
     * Get the matching node in the branch of the document before a location.
     */

  }, {
    key: "getPrevious",
    value: function getPrevious(at, match) {
      var _this$getFirst = this.getFirst(at),
          _this$getFirst2 = slicedToArray(_this$getFirst, 2),
          from = _this$getFirst2[1];

      var _this$getFirst3 = this.getFirst([]),
          _this$getFirst4 = slicedToArray(_this$getFirst3, 2),
          to = _this$getFirst4[1];

      var span = [from, to];
      var i = 0;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.matches({
          match: match,
          at: span,
          reverse: true
        })[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var entry = _step7.value;

          if (i === 1) {
            return entry;
          }

          i++;
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
    /**
     * Get a range of a location.
     */

  }, {
    key: "getRange",
    value: function getRange(at, to) {
      if (Range.isRange(at) && !to) {
        return at;
      }

      var start = this.getStart(at);
      var end = this.getEnd(to || at);
      return {
        anchor: start,
        focus: end
      };
    }
    /**
     * Get the start point of a location.
     */

  }, {
    key: "getStart",
    value: function getStart(at) {
      return this.getPoint(at, {
        edge: 'start'
      });
    }
    /**
     * Get the text content of a location.
     *
     * Note: the text of void nodes is presumed to be an empty string, regardless
     * of what their actual content is.
     */

  }, {
    key: "getText",
    value: function getText(at) {
      var range = this.getRange(at);

      var _Range$edges3 = Range.edges(range),
          _Range$edges4 = slicedToArray(_Range$edges3, 2),
          start = _Range$edges4[0],
          end = _Range$edges4[1];

      var text = '';
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.texts({
          at: range
        })[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _step8$value = slicedToArray(_step8.value, 2),
              node = _step8$value[0],
              path = _step8$value[1];

          var t = node.text;

          if (Path.equals(path, end.path)) {
            t = t.slice(0, end.offset);
          }

          if (Path.equals(path, start.path)) {
            t = t.slice(start.offset);
          }

          text += t;
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return text;
    }
    /**
     * Check if there is a node at a location.
     */

  }, {
    key: "hasNode",
    value: function hasNode(at) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var path = this.getPath(at, options);
      var exists = Node.has(this.value, path);
      return exists;
    }
    /**
     * Check if a point the start point of a location.
     */

  }, {
    key: "isStart",
    value: function isStart(point, at) {
      // PERF: If the offset isn't `0` we know it's not the start.
      if (point.offset !== 0) {
        return false;
      }

      var start = this.getStart(at);
      return Point.equals(point, start);
    }
    /**
     * Check if a point is the end point of a location.
     */

  }, {
    key: "isEnd",
    value: function isEnd(point, at) {
      var end = this.getEnd(at);
      return Point.equals(point, end);
    }
    /**
     * Check if a point is an edge of a location.
     */

  }, {
    key: "isEdge",
    value: function isEdge(point, at) {
      return this.isStart(point, at) || this.isEnd(point, at);
    }
    /**
     * Iterate through all of the levels at a location.
     */

  }, {
    key: "levels",
    value:
    /*#__PURE__*/
    regenerator.mark(function levels() {
      var options,
          _options$at4,
          at,
          _options$reverse,
          reverse,
          levels,
          path,
          _iteratorNormalCompletion9,
          _didIteratorError9,
          _iteratorError9,
          _iterator9,
          _step9,
          _step9$value,
          n,
          p,
          _args3 = arguments;

      return regenerator.wrap(function levels$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              _options$at4 = options.at, at = _options$at4 === void 0 ? this.value.selection : _options$at4, _options$reverse = options.reverse, reverse = _options$reverse === void 0 ? false : _options$reverse;

              if (at) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return");

            case 4:
              levels = [];
              path = this.getPath(at);
              _iteratorNormalCompletion9 = true;
              _didIteratorError9 = false;
              _iteratorError9 = undefined;
              _context3.prev = 9;
              _iterator9 = Node.levels(this.value, path)[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                _context3.next = 19;
                break;
              }

              _step9$value = slicedToArray(_step9.value, 2), n = _step9$value[0], p = _step9$value[1];
              levels.push([n, p]);

              if (!(Element.isElement(n) && this.isVoid(n))) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("break", 19);

            case 16:
              _iteratorNormalCompletion9 = true;
              _context3.next = 11;
              break;

            case 19:
              _context3.next = 25;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](9);
              _didIteratorError9 = true;
              _iteratorError9 = _context3.t0;

            case 25:
              _context3.prev = 25;
              _context3.prev = 26;

              if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
                _iterator9["return"]();
              }

            case 28:
              _context3.prev = 28;

              if (!_didIteratorError9) {
                _context3.next = 31;
                break;
              }

              throw _iteratorError9;

            case 31:
              return _context3.finish(28);

            case 32:
              return _context3.finish(25);

            case 33:
              if (reverse) {
                levels.reverse();
              }

              return _context3.delegateYield(levels, "t1", 35);

            case 35:
            case "end":
              return _context3.stop();
          }
        }
      }, levels, this, [[9, 21, 25, 33], [26,, 28, 32]]);
    })
    /**
     * Iterate through all of the text nodes in the editor.
     */

  }, {
    key: "marks",
    value:
    /*#__PURE__*/
    regenerator.mark(function marks() {
      var _this2 = this;

      var options,
          _options$at5,
          at,
          _getSpan3,
          _getSpan4,
          from,
          to,
          _args4 = arguments;

      return regenerator.wrap(function marks$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
              _options$at5 = options.at, at = _options$at5 === void 0 ? this.value.selection : _options$at5;

              if (at) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return");

            case 4:
              _getSpan3 = getSpan(this, at, options), _getSpan4 = slicedToArray(_getSpan3, 2), from = _getSpan4[0], to = _getSpan4[1];
              return _context4.delegateYield(Node.marks(this.value, _objectSpread$1({}, options, {
                from: from,
                to: to,
                pass: function pass(_ref3) {
                  var _ref4 = slicedToArray(_ref3, 1),
                      n = _ref4[0];

                  return Element.isElement(n) && _this2.isVoid(n);
                }
              })), "t0", 6);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, marks, this);
    })
    /**
     * Iterate through all of the nodes that match.
     */

  }, {
    key: "matches",
    value:
    /*#__PURE__*/
    regenerator.mark(function matches(options) {
      var _options$at6, at, _options$match, match, _options$reverse2, reverse, prevPath, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, _step10$value, n, p;

      return regenerator.wrap(function matches$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _options$at6 = options.at, at = _options$at6 === void 0 ? this.value.selection : _options$at6, _options$match = options.match, match = _options$match === void 0 ? Path.isPath(at) ? at : function () {
                return true;
              } : _options$match, _options$reverse2 = options.reverse, reverse = _options$reverse2 === void 0 ? false : _options$reverse2;

              if (at) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt("return");

            case 3:
              _iteratorNormalCompletion10 = true;
              _didIteratorError10 = false;
              _iteratorError10 = undefined;
              _context5.prev = 6;
              _iterator10 = this.nodes({
                at: at,
                reverse: reverse
              })[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                _context5.next = 19;
                break;
              }

              _step10$value = slicedToArray(_step10.value, 2), n = _step10$value[0], p = _step10$value[1];

              if (!(prevPath && Path.compare(p, prevPath) === 0)) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("continue", 16);

            case 12:
              if (!isMatch(this, [n, p], match)) {
                _context5.next = 16;
                break;
              }

              prevPath = p;
              _context5.next = 16;
              return [n, p];

            case 16:
              _iteratorNormalCompletion10 = true;
              _context5.next = 8;
              break;

            case 19:
              _context5.next = 25;
              break;

            case 21:
              _context5.prev = 21;
              _context5.t0 = _context5["catch"](6);
              _didIteratorError10 = true;
              _iteratorError10 = _context5.t0;

            case 25:
              _context5.prev = 25;
              _context5.prev = 26;

              if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                _iterator10["return"]();
              }

            case 28:
              _context5.prev = 28;

              if (!_didIteratorError10) {
                _context5.next = 31;
                break;
              }

              throw _iteratorError10;

            case 31:
              return _context5.finish(28);

            case 32:
              return _context5.finish(25);

            case 33:
            case "end":
              return _context5.stop();
          }
        }
      }, matches, this, [[6, 21, 25, 33], [26,, 28, 32]]);
    })
    /**
     * Iterate through all of the nodes in the editor.
     */

  }, {
    key: "nodes",
    value:
    /*#__PURE__*/
    regenerator.mark(function nodes() {
      var _this3 = this;

      var options,
          _options$at7,
          at,
          _getSpan5,
          _getSpan6,
          from,
          to,
          iterable,
          _iteratorNormalCompletion11,
          _didIteratorError11,
          _iteratorError11,
          _iterator11,
          _step11,
          entry,
          _args6 = arguments;

      return regenerator.wrap(function nodes$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              options = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
              _options$at7 = options.at, at = _options$at7 === void 0 ? this.value.selection : _options$at7;

              if (at) {
                _context6.next = 4;
                break;
              }

              return _context6.abrupt("return");

            case 4:
              _getSpan5 = getSpan(this, at, options), _getSpan6 = slicedToArray(_getSpan5, 2), from = _getSpan6[0], to = _getSpan6[1];
              iterable = Node.nodes(this.value, _objectSpread$1({}, options, {
                from: from,
                to: to,
                pass: function pass(_ref5) {
                  var _ref6 = slicedToArray(_ref5, 1),
                      n = _ref6[0];

                  return Element.isElement(n) && _this3.isVoid(n);
                }
              }));
              _iteratorNormalCompletion11 = true;
              _didIteratorError11 = false;
              _iteratorError11 = undefined;
              _context6.prev = 9;
              _iterator11 = iterable[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
                _context6.next = 18;
                break;
              }

              entry = _step11.value;
              _context6.next = 15;
              return entry;

            case 15:
              _iteratorNormalCompletion11 = true;
              _context6.next = 11;
              break;

            case 18:
              _context6.next = 24;
              break;

            case 20:
              _context6.prev = 20;
              _context6.t0 = _context6["catch"](9);
              _didIteratorError11 = true;
              _iteratorError11 = _context6.t0;

            case 24:
              _context6.prev = 24;
              _context6.prev = 25;

              if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
                _iterator11["return"]();
              }

            case 27:
              _context6.prev = 27;

              if (!_didIteratorError11) {
                _context6.next = 30;
                break;
              }

              throw _iteratorError11;

            case 30:
              return _context6.finish(27);

            case 31:
              return _context6.finish(24);

            case 32:
            case "end":
              return _context6.stop();
          }
        }
      }, nodes, this, [[9, 20, 24, 32], [25,, 27, 31]]);
    })
    /**
     * Iterate through all of the positions in the document where a `Point` can be
     * placed.
     *
     * By default it will move forward by individual offsets at a time,  but you
     * can pass the `unit: 'character'` option to moved forward one character, word,
     * or line at at time.
     *
     * Note: void nodes are treated as a single point, and iteration will not
     * happen inside their content.
     */

  }, {
    key: "positions",
    value:
    /*#__PURE__*/
    regenerator.mark(function positions() {
      var options,
          _options$at8,
          at,
          _options$unit,
          unit,
          _options$reverse3,
          reverse$1,
          range,
          _Range$edges5,
          _Range$edges6,
          start,
          end,
          first,
          string,
          available,
          offset,
          distance,
          isNewBlock,
          advance,
          _iteratorNormalCompletion12,
          _didIteratorError12,
          _iteratorError12,
          _iterator12,
          _step12,
          _step12$value,
          node,
          path,
          e,
          s,
          text,
          isFirst,
          _args7 = arguments;

      return regenerator.wrap(function positions$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              options = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
              _options$at8 = options.at, at = _options$at8 === void 0 ? this.value.selection : _options$at8, _options$unit = options.unit, unit = _options$unit === void 0 ? 'offset' : _options$unit, _options$reverse3 = options.reverse, reverse$1 = _options$reverse3 === void 0 ? false : _options$reverse3;

              if (at) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt("return");

            case 4:
              range = this.getRange(at);
              _Range$edges5 = Range.edges(range), _Range$edges6 = slicedToArray(_Range$edges5, 2), start = _Range$edges6[0], end = _Range$edges6[1];
              first = reverse$1 ? end : start;
              string = '';
              available = 0;
              offset = 0;
              distance = null;
              isNewBlock = false;

              advance = function advance() {
                if (distance == null) {
                  if (unit === 'character') {
                    distance = getCharacterDistance(string);
                  } else if (unit === 'word') {
                    distance = getWordDistance(string);
                  } else if (unit === 'line' || unit === 'block') {
                    distance = string.length;
                  } else {
                    distance = 1;
                  }

                  string = string.slice(distance);
                } // Add or substract the offset.


                offset = reverse$1 ? offset - distance : offset + distance; // Subtract the distance traveled from the available text.

                available = available - distance; // If the available had room to spare, reset the distance so that it will
                // advance again next time. Otherwise, set it to the overflow amount.

                distance = available >= 0 ? null : 0 - available;
              };

              _iteratorNormalCompletion12 = true;
              _didIteratorError12 = false;
              _iteratorError12 = undefined;
              _context7.prev = 16;
              _iterator12 = this.nodes({
                at: at,
                reverse: reverse$1
              })[Symbol.iterator]();

            case 18:
              if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                _context7.next = 54;
                break;
              }

              _step12$value = slicedToArray(_step12.value, 2), node = _step12$value[0], path = _step12$value[1];

              if (!Element.isElement(node)) {
                _context7.next = 28;
                break;
              }

              if (!this.isVoid(node)) {
                _context7.next = 25;
                break;
              }

              _context7.next = 24;
              return this.getStart(path);

            case 24:
              return _context7.abrupt("continue", 51);

            case 25:
              if (!this.isInline(node)) {
                _context7.next = 27;
                break;
              }

              return _context7.abrupt("continue", 51);

            case 27:
              if (this.hasInlines(node)) {
                e = Path.isAncestor(path, end.path) ? end : this.getEnd(path);
                s = Path.isAncestor(path, start.path) ? start : this.getStart(path);
                text = this.getText({
                  anchor: s,
                  focus: e
                });
                string = reverse$1 ? reverse(text) : text;
                isNewBlock = true;
              }

            case 28:
              if (!Text.isText(node)) {
                _context7.next = 51;
                break;
              }

              isFirst = Path.equals(path, first.path);
              available = node.text.length;
              offset = reverse$1 ? available : 0;

              if (isFirst) {
                available = reverse$1 ? first.offset : available - first.offset;
                offset = first.offset;
              }

              if (!(isFirst || isNewBlock || unit === 'offset')) {
                _context7.next = 36;
                break;
              }

              _context7.next = 36;
              return {
                path: path,
                offset: offset
              };

            case 36:

              if (!(string === '')) {
                _context7.next = 41;
                break;
              }

              return _context7.abrupt("break", 50);

            case 41:
              advance();

            case 42:
              if (!(available >= 0)) {
                _context7.next = 47;
                break;
              }

              _context7.next = 45;
              return {
                path: path,
                offset: offset
              };

            case 45:
              _context7.next = 48;
              break;

            case 47:
              return _context7.abrupt("break", 50);

            case 48:
              _context7.next = 36;
              break;

            case 50:
              isNewBlock = false;

            case 51:
              _iteratorNormalCompletion12 = true;
              _context7.next = 18;
              break;

            case 54:
              _context7.next = 60;
              break;

            case 56:
              _context7.prev = 56;
              _context7.t0 = _context7["catch"](16);
              _didIteratorError12 = true;
              _iteratorError12 = _context7.t0;

            case 60:
              _context7.prev = 60;
              _context7.prev = 61;

              if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                _iterator12["return"]();
              }

            case 63:
              _context7.prev = 63;

              if (!_didIteratorError12) {
                _context7.next = 66;
                break;
              }

              throw _iteratorError12;

            case 66:
              return _context7.finish(63);

            case 67:
              return _context7.finish(60);

            case 68:
            case "end":
              return _context7.stop();
          }
        }
      }, positions, this, [[16, 56, 60, 68], [61,, 63, 67]]);
    })
    /**
     * Iterate through all of the text nodes in the editor.
     */

  }, {
    key: "texts",
    value:
    /*#__PURE__*/
    regenerator.mark(function texts() {
      var _this4 = this;

      var options,
          _options$at9,
          at,
          _getSpan7,
          _getSpan8,
          from,
          to,
          _args8 = arguments;

      return regenerator.wrap(function texts$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              options = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
              _options$at9 = options.at, at = _options$at9 === void 0 ? this.value.selection : _options$at9;

              if (at) {
                _context8.next = 4;
                break;
              }

              return _context8.abrupt("return");

            case 4:
              _getSpan7 = getSpan(this, at, options), _getSpan8 = slicedToArray(_getSpan7, 2), from = _getSpan8[0], to = _getSpan8[1];
              return _context8.delegateYield(Node.texts(this.value, _objectSpread$1({}, options, {
                from: from,
                to: to,
                pass: function pass(_ref7) {
                  var _ref8 = slicedToArray(_ref7, 1),
                      n = _ref8[0];

                  return Element.isElement(n) && _this4.isVoid(n);
                }
              })), "t0", 6);

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, texts, this);
    })
  }]);

  return LocationQueries;
}();
/**
 * Get the from and to path span from a location.
 */


var getSpan = function getSpan(editor, at) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$reverse4 = options.reverse,
      reverse = _options$reverse4 === void 0 ? false : _options$reverse4;

  if (Span.isSpan(at)) {
    return at;
  }

  var first = editor.getPath(at, {
    edge: 'start'
  });
  var last = editor.getPath(at, {
    edge: 'end'
  });
  var from = reverse ? last : first;
  var to = reverse ? first : last;
  return [from, to];
};
/**
 * Check if a node is a match.
 */


var isMatch = function isMatch(editor, entry, match) {
  var _entry = slicedToArray(entry, 2),
      node = _entry[0],
      path = _entry[1];

  if (typeof match === 'function') {
    return match(entry);
  } else if (typeof match === 'number') {
    return path.length === match;
  } else if (match === 'text') {
    return Text.isText(node);
  } else if (match === 'value') {
    return Value.isValue(node);
  } else if (match === 'inline') {
    return Element.isElement(node) && editor.isInline(node) || Text.isText(node);
  } else if (match === 'block') {
    return Element.isElement(node) && !editor.isInline(node) && editor.hasInlines(node);
  } else if (match === 'void') {
    return Element.isElement(node) && editor.isVoid(node);
  } else if (Path.isPath(match)) {
    return Path.equals(path, match);
  } else {
    return Node.matches(node, match);
  }
};

var RangeQueries =
/*#__PURE__*/
function () {
  function RangeQueries() {
    classCallCheck(this, RangeQueries);
  }

  createClass(RangeQueries, [{
    key: "unhangRange",

    /**
     * Convert a range into a non-hanging one.
     */
    value: function unhangRange(range) {
      var _Range$edges = Range.edges(range),
          _Range$edges2 = slicedToArray(_Range$edges, 2),
          start = _Range$edges2[0],
          end = _Range$edges2[1]; // PERF: exit early if we can guarantee that the range isn't hanging.


      if (start.offset !== 0 || end.offset !== 0 || Range.isCollapsed(range)) {
        return range;
      }

      var closestBlock = this.getMatch(end.path, 'block');
      var blockPath = closestBlock ? closestBlock[1] : [];
      var first = this.getStart([]);
      var before = {
        anchor: first,
        focus: end
      };
      var skip = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.texts({
          at: before,
          reverse: true
        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = slicedToArray(_step.value, 2),
              node = _step$value[0],
              path = _step$value[1];

          if (skip) {
            skip = false;
            continue;
          }

          if (node.text !== '' || Path.isBefore(path, blockPath)) {
            end = {
              path: path,
              offset: node.text.length
            };
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return {
        anchor: start,
        focus: end
      };
    }
  }]);

  return RangeQueries;
}();

/**
 * The `Editor` class stores all the state of a Slate editor. It is extended by
 * plugins that wish to add their own methods that implement new behaviors.
 */

var Editor = function Editor() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  classCallCheck(this, Editor);

  var _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {} : _props$onChange,
      _props$value = props.value,
      value = _props$value === void 0 ? produce({
    nodes: [],
    selection: null,
    annotations: {}
  }, function () {}) : _props$value;
  this.onChange = onChange;
  this.operations = [];
  this.value = value;
  DIRTY_PATHS.set(this, []);
  FLUSHING.set(this, false);
  NORMALIZING.set(this, true);
  PATH_REFS.set(this, new Set());
  POINT_REFS.set(this, new Set());
  RANGE_REFS.set(this, new Set());
};

var mixin = function mixin(Mixins) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var Mixin = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.getOwnPropertyNames(Mixin.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          if (key !== 'constructor') {
            Editor.prototype[key] = Mixin.prototype[key];
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

mixin([AnnotationCommands, DeletingCommands, NodeCommands, MarkCommands, SelectionCommands, GeneralCommands, ElementQueries, GeneralQueries, LocationQueries, RangeQueries]);

/**
 * `PathRef` objects keep a specific path in a document synced over time as new
 * operations are applied to the editor. You can access their `current` property
 * at any time for the up-to-date path value.
 */

var PathRef =
/*#__PURE__*/
function () {
  function PathRef(props) {
    classCallCheck(this, PathRef);

    var path = props.path,
        affinity = props.affinity,
        editor = props.editor;
    this.current = path;
    this.affinity = affinity;
    this.editor = editor;
    var pathRefs = PATH_REFS.get(editor);
    pathRefs.add(this);
  }
  /**
   * Transform the path ref's current value by an operation.
   */


  createClass(PathRef, [{
    key: "transform",
    value: function transform(op) {
      var current = this.current,
          affinity = this.affinity;

      if (current == null) {
        return;
      }

      var path = Path.transform(current, op, {
        affinity: affinity
      });
      this.current = path;

      if (path == null) {
        this.unref();
      }
    }
    /**
     * Unreference the ref, allowing the editor to stop updating its value.
     */

  }, {
    key: "unref",
    value: function unref() {
      var current = this.current,
          editor = this.editor;
      var pathRefs = PATH_REFS.get(editor);
      pathRefs["delete"](this);
      this.current = null;
      return current;
    }
  }]);

  return PathRef;
}();

/**
 * `PointRef` objects keep a specific point in a document synced over time as new
 * operations are applied to the editor. You can access their `current` property
 * at any time for the up-to-date point value.
 */

var PointRef =
/*#__PURE__*/
function () {
  function PointRef(props) {
    classCallCheck(this, PointRef);

    var point = props.point,
        affinity = props.affinity,
        editor = props.editor;
    this.current = point;
    this.affinity = affinity;
    this.editor = editor;
    var pointRefs = POINT_REFS.get(editor);
    pointRefs.add(this);
  }
  /**
   * Transform the point ref's current value by an operation.
   */


  createClass(PointRef, [{
    key: "transform",
    value: function transform(op) {
      var current = this.current,
          affinity = this.affinity;

      if (current == null) {
        return;
      }

      var point = Point.transform(current, op, {
        affinity: affinity
      });
      this.current = point;

      if (point == null) {
        this.unref();
      }
    }
    /**
     * Unreference the ref, allowing the editor to stop updating its value.
     */

  }, {
    key: "unref",
    value: function unref() {
      var current = this.current,
          editor = this.editor;
      var pointRefs = POINT_REFS.get(editor);
      pointRefs["delete"](this);
      this.current = null;
      return current;
    }
  }]);

  return PointRef;
}();

/**
 * `RangeRef` objects keep a specific range in a document synced over time as new
 * operations are applied to the editor. You can access their `current` property
 * at any time for the up-to-date range value.
 */

var RangeRef =
/*#__PURE__*/
function () {
  function RangeRef(props) {
    classCallCheck(this, RangeRef);

    var range = props.range,
        affinity = props.affinity,
        editor = props.editor;
    this.current = range;
    this.affinity = affinity;
    this.editor = editor;
    var rangeRefs = RANGE_REFS.get(editor);
    rangeRefs.add(this);
  }
  /**
   * Transform the range ref's current value by an operation.
   */


  createClass(RangeRef, [{
    key: "transform",
    value: function transform(op) {
      var current = this.current,
          affinity = this.affinity;

      if (current == null) {
        return;
      }

      var range = Range.transform(current, op, {
        affinity: affinity
      });
      this.current = range;

      if (range == null) {
        this.unref();
      }
    }
    /**
     * Unreference the ref, allowing the editor to stop updating its value.
     */

  }, {
    key: "unref",
    value: function unref() {
      var current = this.current,
          editor = this.editor;
      var rangeRefs = RANGE_REFS.get(editor);
      rangeRefs["delete"](this);
      this.current = null;
      return current;
    }
  }]);

  return RangeRef;
}();

var Element;

(function (Element) {
  /**
   * Check if a value implements the `Element` interface.
   */
  Element.isElement = function (value) {
    return isPlainObject(value) && Node.isNodeList(value.nodes) && !Value.isValue(value);
  };
  /**
   * Check if a value is an array of `Element` objects.
   */


  Element.isElementList = function (value) {
    return Array.isArray(value) && (value.length === 0 || Element.isElement(value[0]));
  };
  /**
   * Check if an element matches set of properties.
   *
   * Note: the is for checking custom properties, and it does not ensure that
   * any children in the `nodes` property are equal.
   */


  Element.matches = function (element, props) {
    for (var key in props) {
      if (key === 'nodes') {
        continue;
      }

      if (element[key] !== props[key]) {
        return false;
      }
    }

    return true;
  };
})(Element || (Element = {}));

var Fragment;

(function (Fragment) {
  /**
   * Check if a value implements the `Fragment` interface.
   */
  Fragment.isFragment = function (value) {
    return isPlainObject(value) && Node.isNodeList(value.nodes);
  };
})(Fragment || (Fragment = {}));

var Location;

(function (Location) {
  /**
   * Check if a value implements the `Location` interface.
   */
  Location.isLocation = function (value) {
    return Path.isPath(value) || Point.isPoint(value) || Range.isRange(value);
  };
})(Location || (Location = {}));

var Span;

(function (Span) {
  /**
   * Check if a value implements the `Span` interface.
   */
  Span.isSpan = function (value) {
    return Array.isArray(value) && value.length === 2 && value.every(Path.isPath);
  };
})(Span || (Span = {}));

var Mark;

(function (Mark) {
  /**
   * Check if a mark exists in a set of marks.
   */
  Mark.exists = function (mark, marks) {
    return !!marks.find(function (f) {
      return Mark.matches(f, mark);
    });
  };
  /**
   * Check if a value implements the `Mark` interface.
   */


  Mark.isMark = function (value) {
    return isPlainObject(value);
  };
  /**
   * Check if a value is an array of `Mark` objects.
   */


  Mark.isMarkSet = function (value) {
    return Array.isArray(value) && (value.length === 0 || Mark.isMark(value[0]));
  };
  /**
   * Check if a mark matches set of properties.
   */


  Mark.matches = function (mark, props) {
    for (var key in props) {
      if (mark[key] !== props[key]) {
        return false;
      }
    }

    return true;
  };
})(Mark || (Mark = {}));

var Node;

(function (Node) {
  var _marked =
  /*#__PURE__*/
  regenerator.mark(ancestors),
      _marked2 =
  /*#__PURE__*/
  regenerator.mark(descendants),
      _marked3 =
  /*#__PURE__*/
  regenerator.mark(elements),
      _marked4 =
  /*#__PURE__*/
  regenerator.mark(levels),
      _marked5 =
  /*#__PURE__*/
  regenerator.mark(marks),
      _marked6 =
  /*#__PURE__*/
  regenerator.mark(nodes),
      _marked7 =
  /*#__PURE__*/
  regenerator.mark(texts);

  Node.matches = function (node, props) {
    return Value.isValue(node) && Value.matches(node, props) || Element.isElement(node) && Element.matches(node, props) || Text.isText(node) && Text.matches(node, props);
  };
  /**
   * Get the node at a specific path, asserting that it's an ancestor node.
   */


  Node.ancestor = function (root, path) {
    var node = Node.get(root, path);

    if (Text.isText(node)) {
      throw new Error("Cannot get the ancestor node at path [".concat(path, "] because it refers to a text node instead: ").concat(node));
    }

    return node;
  };
  /**
   * Return an iterable of all the ancestor nodes above a specific path.
   *
   * By default the order is bottom-up, from lowest to highest ancestor in
   * the tree, but you can pass the `reverse: true` option to go top-down.
   */


  function ancestors(root, path) {
    var options,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
        _iterator,
        _step,
        p,
        n,
        entry,
        _args = arguments;

    return regenerator.wrap(function ancestors$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = Path.ancestors(path, options)[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 15;
              break;
            }

            p = _step.value;
            n = Node.ancestor(root, p);
            entry = [n, p];
            _context.next = 12;
            return entry;

          case 12:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError) {
              _context.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, null, [[4, 17, 21, 29], [22,, 24, 28]]);
  }

  Node.ancestors = ancestors;
  /**
   * Get the child of a node at a specific index.
   */

  Node.child = function (root, index) {
    if (Text.isText(root)) {
      throw new Error("Cannot get the child of a text node: ".concat(JSON.stringify(root)));
    }

    var c = root.nodes[index];

    if (c == null) {
      throw new Error("Cannot get child at index `".concat(index, "` in node: ").concat(JSON.stringify(root)));
    }

    return c;
  };
  /**
   * Find the closest matching node entry starting from a specific path.
   */


  Node.closest = function (root, path, predicate) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Node.levels(root, path, {
        reverse: true
      })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var entry = _step2.value;

        if (predicate(entry)) {
          return entry;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };
  /**
   * Get an entry for the common ancesetor node of two paths.
   */


  Node.common = function (root, path, another) {
    var p = Path.common(path, another);
    var n = Node.get(root, p);
    return [n, p];
  };
  /**
   * Get the node at a specific path, asserting that it's a descendant node.
   */


  Node.descendant = function (root, path) {
    var node = Node.get(root, path);

    if (Value.isValue(node)) {
      throw new Error("Cannot get the descendant node at path [".concat(path, "] because it refers to a value node instead: ").concat(node));
    }

    return node;
  };
  /**
   * Return an iterable of all the descendant node entries inside a root node.
   */


  function descendants(root) {
    var options,
        _iteratorNormalCompletion3,
        _didIteratorError3,
        _iteratorError3,
        _iterator3,
        _step3,
        _step3$value,
        node,
        path,
        _args2 = arguments;

    return regenerator.wrap(function descendants$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context2.prev = 4;
            _iterator3 = Node.nodes(root, options)[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context2.next = 14;
              break;
            }

            _step3$value = slicedToArray(_step3.value, 2), node = _step3$value[0], path = _step3$value[1];

            if (!(path.length !== 0)) {
              _context2.next = 11;
              break;
            }

            _context2.next = 11;
            return [node, path];

          case 11:
            _iteratorNormalCompletion3 = true;
            _context2.next = 6;
            break;

          case 14:
            _context2.next = 20;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError3 = true;
            _iteratorError3 = _context2.t0;

          case 20:
            _context2.prev = 20;
            _context2.prev = 21;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 23:
            _context2.prev = 23;

            if (!_didIteratorError3) {
              _context2.next = 26;
              break;
            }

            throw _iteratorError3;

          case 26:
            return _context2.finish(23);

          case 27:
            return _context2.finish(20);

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _marked2, null, [[4, 16, 20, 28], [21,, 23, 27]]);
  }

  Node.descendants = descendants;
  /**
   * Return an iterable of all the element nodes inside a root node. Each iteration
   * will return an `ElementEntry` tuple consisting of `[Element, Path]`. If the
   * root node is an element it will be included in the iteration as well.
   */

  function elements(root) {
    var options,
        _iteratorNormalCompletion4,
        _didIteratorError4,
        _iteratorError4,
        _iterator4,
        _step4,
        _step4$value,
        node,
        path,
        _args3 = arguments;

    return regenerator.wrap(function elements$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context3.prev = 4;
            _iterator4 = Node.nodes(root, options)[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context3.next = 14;
              break;
            }

            _step4$value = slicedToArray(_step4.value, 2), node = _step4$value[0], path = _step4$value[1];

            if (!Element.isElement(node)) {
              _context3.next = 11;
              break;
            }

            _context3.next = 11;
            return [node, path];

          case 11:
            _iteratorNormalCompletion4 = true;
            _context3.next = 6;
            break;

          case 14:
            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](4);
            _didIteratorError4 = true;
            _iteratorError4 = _context3.t0;

          case 20:
            _context3.prev = 20;
            _context3.prev = 21;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 23:
            _context3.prev = 23;

            if (!_didIteratorError4) {
              _context3.next = 26;
              break;
            }

            throw _iteratorError4;

          case 26:
            return _context3.finish(23);

          case 27:
            return _context3.finish(20);

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _marked3, null, [[4, 16, 20, 28], [21,, 23, 27]]);
  }

  Node.elements = elements;
  /**
   * Get the first node entry in a root node from a path.
   */

  Node.first = function (root, path) {
    var p = path.slice();
    var n = Node.get(root, p);

    while (n) {
      if (Text.isText(n) || n.nodes.length === 0) {
        break;
      } else {
        n = n.nodes[0];
        p.push(0);
      }
    }

    return [n, p];
  };
  /**
   * Get the sliced fragment represented by a range inside a root node.
   */


  Node.fragment = function (root, range) {
    if (Text.isText(root)) {
      throw new Error("Cannot get a fragment starting from a root text node: ".concat(JSON.stringify(root)));
    }

    return produce(root, function (r) {
      var _Range$edges = Range.edges(range),
          _Range$edges2 = slicedToArray(_Range$edges, 2),
          start = _Range$edges2[0],
          end = _Range$edges2[1];

      var iterable = Node.nodes(r, {
        reverse: true,
        pass: function pass(_ref) {
          var _ref2 = slicedToArray(_ref, 2),
              path = _ref2[1];

          return !Range.includes(range, path);
        }
      });
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = iterable[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = slicedToArray(_step5.value, 2),
              path = _step5$value[1];

          if (!Range.includes(range, path)) {
            var parent = Node.parent(r, path);
            var index = path[path.length - 1];
            parent.nodes.splice(index, 1);
          }

          if (Path.equals(path, end.path)) {
            var leaf = Node.leaf(r, path);
            leaf.text = leaf.text.slice(0, end.offset);
          }

          if (Path.equals(path, start.path)) {
            var _leaf = Node.leaf(r, path);

            _leaf.text = _leaf.text.slice(start.offset);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      delete r.annotations;
      delete r.selection;
    });
  };
  /**
   * Find the furthest matching node entry starting from a specific path.
   */


  Node.furthest = function (root, path, predicate) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = Node.levels(root, path)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var entry = _step6.value;

        if (predicate(entry)) {
          return entry;
        }
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  };
  /**
   * Get the descendant node referred to by a specific path. If the path is an
   * empty array, it refers to the root node itself.
   */


  Node.get = function (root, path) {
    var node = root;

    for (var i = 0; i < path.length; i++) {
      var p = path[i];

      if (Text.isText(node) || !node.nodes[p]) {
        throw new Error("Cannot find a descendant at path [".concat(path, "] in node: ").concat(JSON.stringify(root)));
      }

      node = node.nodes[p];
    }

    return node;
  };
  /**
   * Check if a descendant node exists at a specific path.
   */


  Node.has = function (root, path) {
    var node = root;

    for (var i = 0; i < path.length; i++) {
      var p = path[i];

      if (Text.isText(node) || !node.nodes[p]) {
        return false;
      }

      node = node.nodes[p];
    }

    return true;
  };
  /**
   * Check if a value implements the `Node` interface.
   */


  Node.isNode = function (value) {
    return Text.isText(value) || Element.isElement(value) || Value.isValue(value);
  };
  /**
   * Check if a value is a list of `Node` objects.
   */


  Node.isNodeList = function (value) {
    return Array.isArray(value) && (value.length === 0 || Node.isNode(value[0]));
  };
  /**
   * Get the lash node entry in a root node from a path.
   */


  Node.last = function (root, path) {
    var p = path.slice();
    var n = Node.get(root, p);

    while (n) {
      if (Text.isText(n) || n.nodes.length === 0) {
        break;
      } else {
        var i = n.nodes.length - 1;
        n = n.nodes[i];
        p.push(i);
      }
    }

    return [n, p];
  };
  /**
   * Get the node at a specific path, ensuring it's a leaf text node.
   */


  Node.leaf = function (root, path) {
    var node = Node.get(root, path);

    if (!Text.isText(node)) {
      throw new Error("Cannot get the leaf node at path [".concat(path, "] because it refers to a non-leaf node: ").concat(node));
    }

    return node;
  };
  /**
   * Return an iterable of the in a branch of the tree, from a specific path.
   *
   * By default the order is bottom-up, from lowest to highest node in the
   * tree, but you can pass the `reverse: true` option to go top-down.
   */


  function levels(root, path) {
    var options,
        _iteratorNormalCompletion7,
        _didIteratorError7,
        _iteratorError7,
        _iterator7,
        _step7,
        p,
        n,
        _args4 = arguments;

    return regenerator.wrap(function levels$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context4.prev = 4;
            _iterator7 = Path.levels(path, options)[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
              _context4.next = 14;
              break;
            }

            p = _step7.value;
            n = Node.get(root, p);
            _context4.next = 11;
            return [n, p];

          case 11:
            _iteratorNormalCompletion7 = true;
            _context4.next = 6;
            break;

          case 14:
            _context4.next = 20;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](4);
            _didIteratorError7 = true;
            _iteratorError7 = _context4.t0;

          case 20:
            _context4.prev = 20;
            _context4.prev = 21;

            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }

          case 23:
            _context4.prev = 23;

            if (!_didIteratorError7) {
              _context4.next = 26;
              break;
            }

            throw _iteratorError7;

          case 26:
            return _context4.finish(23);

          case 27:
            return _context4.finish(20);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _marked4, null, [[4, 16, 20, 28], [21,, 23, 27]]);
  }

  Node.levels = levels;
  /**
   * Return an iterable of all the marks in all of the text nodes in a root node.
   */

  function marks(root) {
    var options,
        _iteratorNormalCompletion8,
        _didIteratorError8,
        _iteratorError8,
        _iterator8,
        _step8,
        _step8$value,
        node,
        path,
        i,
        mark,
        _args5 = arguments;

    return regenerator.wrap(function marks$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            _iteratorNormalCompletion8 = true;
            _didIteratorError8 = false;
            _iteratorError8 = undefined;
            _context5.prev = 4;
            _iterator8 = Node.texts(root, options)[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
              _context5.next = 19;
              break;
            }

            _step8$value = slicedToArray(_step8.value, 2), node = _step8$value[0], path = _step8$value[1];
            i = 0;

          case 9:
            if (!(i < node.marks.length)) {
              _context5.next = 16;
              break;
            }

            mark = node.marks[i];
            _context5.next = 13;
            return [mark, i, node, path];

          case 13:
            i++;
            _context5.next = 9;
            break;

          case 16:
            _iteratorNormalCompletion8 = true;
            _context5.next = 6;
            break;

          case 19:
            _context5.next = 25;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](4);
            _didIteratorError8 = true;
            _iteratorError8 = _context5.t0;

          case 25:
            _context5.prev = 25;
            _context5.prev = 26;

            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }

          case 28:
            _context5.prev = 28;

            if (!_didIteratorError8) {
              _context5.next = 31;
              break;
            }

            throw _iteratorError8;

          case 31:
            return _context5.finish(28);

          case 32:
            return _context5.finish(25);

          case 33:
          case "end":
            return _context5.stop();
        }
      }
    }, _marked5, null, [[4, 21, 25, 33], [26,, 28, 32]]);
  }

  Node.marks = marks;
  /**
   * Return an iterable of all the node entries of a root node. Each entry is
   * returned as a `[Node, Path]` tuple, with the path referring to the node's
   * position inside the root node.
   */

  function nodes(root) {
    var options,
        pass,
        _options$reverse,
        reverse,
        _options$from,
        from,
        to,
        visited,
        p,
        n,
        nextIndex,
        newPath,
        _newPath,
        _args6 = arguments;

    return regenerator.wrap(function nodes$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
            pass = options.pass, _options$reverse = options.reverse, reverse = _options$reverse === void 0 ? false : _options$reverse;
            _options$from = options.from, from = _options$from === void 0 ? [] : _options$from, to = options.to;
            visited = new Set();
            p = [];
            n = root;

          case 6:

            if (!(to && (reverse ? Path.isBefore(p, to) : Path.isAfter(p, to)))) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("break", 37);

          case 9:
            if (visited.has(n)) {
              _context6.next = 12;
              break;
            }

            _context6.next = 12;
            return [n, p];

          case 12:
            if (!(!visited.has(n) && !Text.isText(n) && n.nodes.length !== 0 && (pass == null || pass([n, p]) === false))) {
              _context6.next = 19;
              break;
            }

            visited.add(n);
            nextIndex = reverse ? n.nodes.length - 1 : 0;

            if (Path.isAncestor(p, from)) {
              nextIndex = from[p.length];
            }

            p = p.concat(nextIndex);
            n = Node.get(root, p);
            return _context6.abrupt("continue", 6);

          case 19:
            if (!(p.length === 0)) {
              _context6.next = 21;
              break;
            }

            return _context6.abrupt("break", 37);

          case 21:
            if (reverse) {
              _context6.next = 27;
              break;
            }

            newPath = Path.next(p);

            if (!Node.has(root, newPath)) {
              _context6.next = 27;
              break;
            }

            p = newPath;
            n = Node.get(root, p);
            return _context6.abrupt("continue", 6);

          case 27:
            if (!(reverse && p[p.length - 1] !== 0)) {
              _context6.next = 32;
              break;
            }

            _newPath = Path.previous(p);
            p = _newPath;
            n = Node.get(root, p);
            return _context6.abrupt("continue", 6);

          case 32:
            // Otherwise we're going upward...
            p = Path.parent(p);
            n = Node.get(root, p);
            visited.add(n);
            _context6.next = 6;
            break;

          case 37:
          case "end":
            return _context6.stop();
        }
      }
    }, _marked6);
  }

  Node.nodes = nodes;
  /**
   * Get the parent of a node at a specific path.
   */

  Node.parent = function (root, path) {
    var parentPath = Path.parent(path);
    var parent = Node.get(root, parentPath);

    if (Text.isText(parent)) {
      throw new Error("Cannot get the parent of path [".concat(path, "] because it does not exist in the root."));
    }

    return parent;
  };
  /**
   * Get the concatenated text string of a node's content.
   *
   * Note that this will not include spaces or line breaks between block nodes.
   * It is not a user-facing string, but a string for performing offset-related
   * computations for a node.
   */


  Node.text = function (node) {
    if (Text.isText(node)) {
      return node.text;
    } else {
      return node.nodes.map(Node.text).join('');
    }
  };
  /**
   * Return an iterable of all leaf text nodes in a root node.
   */


  function texts(root) {
    var options,
        _iteratorNormalCompletion9,
        _didIteratorError9,
        _iteratorError9,
        _iterator9,
        _step9,
        _step9$value,
        node,
        path,
        _args7 = arguments;

    return regenerator.wrap(function texts$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
            _iteratorNormalCompletion9 = true;
            _didIteratorError9 = false;
            _iteratorError9 = undefined;
            _context7.prev = 4;
            _iterator9 = Node.nodes(root, options)[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
              _context7.next = 14;
              break;
            }

            _step9$value = slicedToArray(_step9.value, 2), node = _step9$value[0], path = _step9$value[1];

            if (!Text.isText(node)) {
              _context7.next = 11;
              break;
            }

            _context7.next = 11;
            return [node, path];

          case 11:
            _iteratorNormalCompletion9 = true;
            _context7.next = 6;
            break;

          case 14:
            _context7.next = 20;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](4);
            _didIteratorError9 = true;
            _iteratorError9 = _context7.t0;

          case 20:
            _context7.prev = 20;
            _context7.prev = 21;

            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }

          case 23:
            _context7.prev = 23;

            if (!_didIteratorError9) {
              _context7.next = 26;
              break;
            }

            throw _iteratorError9;

          case 26:
            return _context7.finish(23);

          case 27:
            return _context7.finish(20);

          case 28:
          case "end":
            return _context7.stop();
        }
      }
    }, _marked7, null, [[4, 16, 20, 28], [21,, 23, 27]]);
  }

  Node.texts = texts;
})(Node || (Node = {}));

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Operation;

(function (Operation) {
  /**
   * Check of a value is an `AnnotationOperation` object.
   */
  Operation.isAnnotationOperation = function (value) {
    return Operation.isOperation(value) && value.type.endsWith('_annotation');
  };
  /**
   * Check of a value is a `NodeOperation` object.
   */


  Operation.isNodeOperation = function (value) {
    return Operation.isOperation(value) && value.type.endsWith('_node');
  };
  /**
   * Check of a value is a `MarkOperation` object.
   */


  Operation.isMarkOperation = function (value) {
    return Operation.isOperation(value) && value.type.endsWith('_mark');
  };
  /**
   * Check of a value is an `Operation` object.
   */


  Operation.isOperation = function (value) {
    if (!isPlainObject(value)) {
      return false;
    }

    switch (value.type) {
      case 'add_mark':
        {
          return Path.isPath(value.path) && Mark.isMark(value.mark);
        }

      case 'add_annotation':
        {
          return typeof value.key === 'string' && Range.isRange(value.annotation);
        }

      case 'insert_node':
        {
          return Path.isPath(value.path) && Node.isNode(value.node);
        }

      case 'insert_text':
        {
          return typeof value.offset === 'number' && typeof value.text === 'string' && Path.isPath(value.path);
        }

      case 'merge_node':
        {
          return typeof value.position === 'number' && (typeof value.target === 'number' || value.target === null) && Path.isPath(value.path) && isPlainObject(value.properties);
        }

      case 'move_node':
        {
          return Path.isPath(value.path) && Path.isPath(value.newPath);
        }

      case 'remove_annotation':
        {
          return typeof value.key === 'string' && Range.isRange(value.annotation);
        }

      case 'remove_mark':
        {
          return Path.isPath(value.path) && Mark.isMark(value.mark);
        }

      case 'remove_node':
        {
          return Path.isPath(value.path) && Node.isNode(value.node);
        }

      case 'remove_text':
        {
          return typeof value.offset === 'number' && typeof value.text === 'string' && Path.isPath(value.path);
        }

      case 'set_annotation':
        {
          return typeof value.key === 'string' && isPlainObject(value.properties) && isPlainObject(value.newProperties);
        }

      case 'set_mark':
        {
          return Path.isPath(value.path) && isPlainObject(value.properties) && isPlainObject(value.newProperties);
        }

      case 'set_node':
        {
          return Path.isPath(value.path) && isPlainObject(value.properties) && isPlainObject(value.newProperties);
        }

      case 'set_selection':
        {
          return isPlainObject(value.properties) && isPlainObject(value.newProperties);
        }

      case 'set_value':
        {
          return isPlainObject(value.properties) && isPlainObject(value.newProperties);
        }

      case 'split_node':
        {
          return Path.isPath(value.path) && typeof value.position === 'number' && (typeof value.target === 'number' || value.target === null) && isPlainObject(value.properties);
        }

      default:
        {
          return false;
        }
    }
  };
  /**
   * Check if a value is a list of `Operation` objects.
   */


  Operation.isOperationList = function (value) {
    return Array.isArray(value) && (value.length === 0 || Operation.isOperation(value[0]));
  };
  /**
   * Check of a value is a `SelectionOperation` object.
   */


  Operation.isSelectionOperation = function (value) {
    return Operation.isOperation(value) && value.type.endsWith('_selection');
  };
  /**
   * Check of a value is a `TextOperation` object.
   */


  Operation.isTextOperation = function (value) {
    return Operation.isOperation(value) && value.type.endsWith('_text');
  };
  /**
   * Check of a value is a `ValueOperation` object.
   */


  Operation.isValueOperation = function (value) {
    return Operation.isOperation(value) && value.type.endsWith('_value');
  };
  /**
   * Invert an operation, returning a new operation that will exactly undo the
   * original when applied.
   */


  Operation.inverse = function (op) {
    switch (op.type) {
      case 'add_annotation':
        {
          return _objectSpread$2({}, op, {
            type: 'remove_annotation'
          });
        }

      case 'add_mark':
        {
          return _objectSpread$2({}, op, {
            type: 'remove_mark'
          });
        }

      case 'insert_node':
        {
          return _objectSpread$2({}, op, {
            type: 'remove_node'
          });
        }

      case 'insert_text':
        {
          return _objectSpread$2({}, op, {
            type: 'remove_text'
          });
        }

      case 'merge_node':
        {
          return _objectSpread$2({}, op, {
            type: 'split_node',
            path: Path.previous(op.path)
          });
        }

      case 'move_node':
        {
          var newPath = op.newPath,
              path = op.path; // PERF: in this case the move operation is a no-op anyways.

          if (Path.equals(newPath, path)) {
            return op;
          } // We need to get the original path here, but sometimes the `newPath`
          // is a younger sibling of (or ends before) the original, and this
          // accounts for it.


          var inversePath = Path.transform(path, op);
          var inverseNewPath = Path.transform(Path.next(path), op);
          return _objectSpread$2({}, op, {
            path: inversePath,
            newPath: inverseNewPath
          });
        }

      case 'remove_annotation':
        {
          return _objectSpread$2({}, op, {
            type: 'add_annotation'
          });
        }

      case 'remove_mark':
        {
          return _objectSpread$2({}, op, {
            type: 'add_mark'
          });
        }

      case 'remove_node':
        {
          return _objectSpread$2({}, op, {
            type: 'insert_node'
          });
        }

      case 'remove_text':
        {
          return _objectSpread$2({}, op, {
            type: 'insert_text'
          });
        }

      case 'set_annotation':
      case 'set_mark':
      case 'set_node':
      case 'set_value':
        {
          var properties = op.properties,
              newProperties = op.newProperties;
          return _objectSpread$2({}, op, {
            properties: newProperties,
            newProperties: properties
          });
        }

      case 'set_selection':
        {
          var _properties = op.properties,
              _newProperties = op.newProperties;

          if (_properties == null) {
            return _objectSpread$2({}, op, {
              properties: _newProperties,
              newProperties: null
            });
          } else if (_newProperties == null) {
            return _objectSpread$2({}, op, {
              properties: null,
              newProperties: _properties
            });
          } else {
            return _objectSpread$2({}, op, {
              properties: _newProperties,
              newProperties: _properties
            });
          }
        }

      case 'split_node':
        {
          return _objectSpread$2({}, op, {
            type: 'merge_node',
            path: Path.next(op.path)
          });
        }
    }
  };
})(Operation || (Operation = {}));

var Path;

(function (Path) {
  /**
   * Get a list of ancestor paths for a given path.
   *
   * The paths are sorted from deepest to shallowest ancestor. However, if the
   * `reverse: true` option is passed, they are reversed.
   */
  Path.ancestors = function (path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$reverse = options.reverse,
        reverse = _options$reverse === void 0 ? false : _options$reverse;
    var paths = Path.levels(path, options);

    if (reverse) {
      paths = paths.slice(1);
    } else {
      paths = paths.slice(0, -1);
    }

    return paths;
  };
  /**
   * Get the common ancestor path of two paths.
   */


  Path.common = function (path, another) {
    var common = [];

    for (var i = 0; i < path.length && i < another.length; i++) {
      var av = path[i];
      var bv = another[i];

      if (av !== bv) {
        break;
      }

      common.push(av);
    }

    return common;
  };
  /**
   * Compare a path to another, returning an integer indicating whether the path
   * was before, at, or after the other.
   *
   * Note: Two paths of unequal length can still receive a `0` result if one is
   * directly above or below the other. If you want exact matching, use
   * [[Path.equals]] instead.
   */


  Path.compare = function (path, another) {
    var min = Math.min(path.length, another.length);

    for (var i = 0; i < min; i++) {
      if (path[i] < another[i]) return -1;
      if (path[i] > another[i]) return 1;
    }

    return 0;
  };
  /**
   * Check if a path ends after one of the indexes in another.
   */


  Path.endsAfter = function (path, another) {
    var i = path.length - 1;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    var av = path[i];
    var bv = another[i];
    return Path.equals(as, bs) && av > bv;
  };
  /**
   * Check if a path ends at one of the indexes in another.
   */


  Path.endsAt = function (path, another) {
    var i = path.length;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    return Path.equals(as, bs);
  };
  /**
   * Check if a path ends before one of the indexes in another.
   */


  Path.endsBefore = function (path, another) {
    var i = path.length - 1;
    var as = path.slice(0, i);
    var bs = another.slice(0, i);
    var av = path[i];
    var bv = another[i];
    return Path.equals(as, bs) && av < bv;
  };
  /**
   * Check if a path is exactly equal to another.
   */


  Path.equals = function (path, another) {
    return path.length === another.length && path.every(function (n, i) {
      return n === another[i];
    });
  };
  /**
   * Check if a path is after another.
   */


  Path.isAfter = function (path, another) {
    return Path.compare(path, another) === 1;
  };
  /**
   * Check if a path is an ancestor of another.
   */


  Path.isAncestor = function (path, another) {
    return path.length < another.length && Path.compare(path, another) === 0;
  };
  /**
   * Check if a path is before another.
   */


  Path.isBefore = function (path, another) {
    return Path.compare(path, another) === -1;
  };
  /**
   * Check if a path is a child of another.
   */


  Path.isChild = function (path, another) {
    return path.length === another.length + 1 && Path.compare(path, another) === 0;
  };
  /**
   * Check if a path is equal to or an ancestor of another.
   */


  Path.isCommon = function (path, another) {
    return path.length <= another.length && Path.compare(path, another) === 0;
  };
  /**
   * Check if a path is a descendant of another.
   */


  Path.isDescendant = function (path, another) {
    return path.length > another.length && Path.compare(path, another) === 0;
  };
  /**
   * Check if a path is the parent of another.
   */


  Path.isParent = function (path, another) {
    return path.length + 1 === another.length && Path.compare(path, another) === 0;
  };
  /**
   * Check is a value implements the `Path` interface.
   */


  Path.isPath = function (value) {
    return Array.isArray(value) && (value.length === 0 || typeof value[0] === 'number');
  };
  /**
   * Check if a path is a sibling of another.
   */


  Path.isSibling = function (path, another) {
    if (path.length !== another.length) {
      return false;
    }

    var as = path.slice(0, -1);
    var bs = another.slice(0, -1);
    var al = path[path.length - 1];
    var bl = another[another.length - 1];
    return al !== bl && Path.equals(as, bs);
  };
  /**
   * Get a list of paths at every level down to a path. Note: this is the same
   * as `Path.ancestors`, but including the path itself.
   *
   * The paths are sorted from deepest to shallowest. However, if the
   * `reverse: true` option is passed, they are reversed.
   */


  Path.levels = function (path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$reverse2 = options.reverse,
        reverse = _options$reverse2 === void 0 ? false : _options$reverse2;
    var list = [];

    for (var i = 0; i <= path.length; i++) {
      list.push(path.slice(0, i));
    }

    if (reverse) {
      list.reverse();
    }

    return list;
  };
  /**
   * Given a path, get the path to the next sibling node.
   */


  Path.next = function (path) {
    if (path.length === 0) {
      throw new Error("Cannot get the next path of a root path [".concat(path, "], because it has no next index."));
    }

    var last = path[path.length - 1];
    return path.slice(0, -1).concat(last + 1);
  };
  /**
   * Given a path, return a new path referring to the parent node above it.
   */


  Path.parent = function (path) {
    if (path.length === 0) {
      throw new Error("Cannot get the parent path of the root path [".concat(path, "]."));
    }

    return path.slice(0, -1);
  };
  /**
   * Given a path, get the path to the previous sibling node.
   */


  Path.previous = function (path) {
    if (path.length === 0) {
      throw new Error("Cannot get the previous path of a root path [".concat(path, "], because it has no previous index."));
    }

    var last = path[path.length - 1];

    if (last <= 0) {
      throw new Error("Cannot get the previous path of a first child path [".concat(path, "] because it would result in a negative index."));
    }

    return path.slice(0, -1).concat(last - 1);
  };
  /**
   * Get a path relative to an ancestor.
   */


  Path.relative = function (path, ancestor) {
    if (!Path.isAncestor(ancestor, path) && !Path.equals(path, ancestor)) {
      throw new Error("Cannot get the relative path of [".concat(path, "] inside ancestor [").concat(ancestor, "], because it is not above or equal to the path."));
    }

    return path.slice(ancestor.length);
  };
  /**
   * Transform a path by an operation.
   */


  Path.transform = function (path, operation) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return produce(path, function (p) {
      var _options$affinity = options.affinity,
          affinity = _options$affinity === void 0 ? 'forward' : _options$affinity; // PERF: Exit early if the operation is guaranteed not to have an effect.

      if (path.length === 0) {
        return;
      }

      switch (operation.type) {
        case 'insert_node':
          {
            var op = operation.path;

            if (Path.equals(op, p) || Path.endsBefore(op, p) || Path.isAncestor(op, p)) {
              p[op.length - 1] += 1;
            }

            break;
          }

        case 'remove_node':
          {
            var _op = operation.path;

            if (Path.equals(_op, p) || Path.isAncestor(_op, p)) {
              return null;
            } else if (Path.endsBefore(_op, p)) {
              p[_op.length - 1] -= 1;
            }

            break;
          }

        case 'merge_node':
          {
            var _op2 = operation.path,
                position = operation.position;

            if (Path.equals(_op2, p) || Path.endsBefore(_op2, p)) {
              p[_op2.length - 1] -= 1;
            } else if (Path.isAncestor(_op2, p)) {
              p[_op2.length - 1] -= 1;
              p[_op2.length] += position;
            }

            break;
          }

        case 'split_node':
          {
            var _op3 = operation.path,
                _position = operation.position;

            if (Path.equals(_op3, p)) {
              if (affinity === 'forward') {
                p[p.length - 1] += 1;
              } else if (affinity === 'backward') ; else {
                return null;
              }
            } else if (Path.endsBefore(_op3, p)) {
              p[_op3.length - 1] += 1;
            } else if (Path.isAncestor(_op3, p) && path[_op3.length] >= _position) {
              p[_op3.length - 1] += 1;
              p[_op3.length] -= _position;
            }

            break;
          }

        case 'move_node':
          {
            var _op4 = operation.path,
                onp = operation.newPath; // If the old and new path are the same, it's a no-op.

            if (Path.equals(_op4, onp)) {
              return;
            }

            if (Path.isAncestor(_op4, p) || Path.equals(_op4, p)) {
              var copy = onp.slice();

              if (Path.endsBefore(_op4, onp) && _op4.length < onp.length) {
                var i = Math.min(onp.length, _op4.length) - 1;
                copy[i] -= 1;
              }

              return copy.concat(p.slice(_op4.length));
            } else {
              if (Path.endsBefore(_op4, p)) {
                p[_op4.length - 1] -= 1;
              }

              if (Path.endsBefore(onp, p) || Path.equals(onp, p) || Path.isAncestor(onp, p)) {
                p[onp.length - 1] += 1;
              }
            }

            break;
          }
      }
    });
  };
})(Path || (Path = {}));

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Point;

(function (Point) {
  /**
   * Compare a point to another, returning an integer indicating whether the
   * point was before, at, or after the other.
   */
  Point.compare = function (point, another) {
    var result = Path.compare(point.path, another.path);

    if (result === 0) {
      if (point.offset < another.offset) return -1;
      if (point.offset > another.offset) return 1;
      return 0;
    }

    return result;
  };
  /**
   * Check if a point is after another.
   */


  Point.isAfter = function (point, another) {
    return Point.compare(point, another) === 1;
  };
  /**
   * Check if a point is before another.
   */


  Point.isBefore = function (point, another) {
    return Point.compare(point, another) === -1;
  };
  /**
   * Check if a point is exactly equal to another.
   */


  Point.equals = function (point, another) {
    // PERF: We could compare to a result of `0` here, but it's slightly faster
    // to first ensure the offsets are equal and to use `Path.equals`.
    return point.offset === another.offset && Path.equals(point.path, another.path);
  };
  /**
   * Check if a value implements the `Point` interface.
   */


  Point.isPoint = function (value) {
    return isPlainObject(value) && typeof value.offset === 'number' && Path.isPath(value.path);
  };
  /**
   * Transform a point by an operation.
   */


  Point.transform = function (point, op) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return produce(point, function (p) {
      var _options$affinity = options.affinity,
          affinity = _options$affinity === void 0 ? 'forward' : _options$affinity;
      var path = p.path,
          offset = p.offset;

      switch (op.type) {
        case 'insert_node':
        case 'move_node':
          {
            p.path = Path.transform(path, op, options);
            break;
          }

        case 'insert_text':
          {
            if (Path.equals(op.path, path) && op.offset <= offset) {
              p.offset += op.text.length;
            }

            break;
          }

        case 'merge_node':
          {
            if (Path.equals(op.path, path)) {
              p.offset += op.position;
            }

            p.path = Path.transform(path, op, options);
            break;
          }

        case 'remove_text':
          {
            if (Path.equals(op.path, path) && op.offset <= offset) {
              p.offset -= Math.min(offset - op.offset, op.text.length);
            }

            break;
          }

        case 'remove_node':
          {
            if (Path.equals(op.path, path) || Path.isAncestor(op.path, path)) {
              return null;
            }

            p.path = Path.transform(path, op, options);
            break;
          }

        case 'split_node':
          {
            if (Path.equals(op.path, path)) {
              if (op.position === offset && affinity == null) {
                return null;
              } else if (op.position < offset || op.position === offset && affinity === 'forward') {
                p.offset -= op.position;
                p.path = Path.transform(path, op, _objectSpread$3({}, options, {
                  affinity: 'forward'
                }));
              }
            } else {
              p.path = Path.transform(path, op, options);
            }

            break;
          }
      }
    });
  };
})(Point || (Point = {}));

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Range;

(function (Range) {
  Range.start = function (range) {
    var _Range$edges = Range.edges(range),
        _Range$edges2 = slicedToArray(_Range$edges, 1),
        start = _Range$edges2[0];

    return start;
  };

  Range.end = function (range) {
    var _Range$edges3 = Range.edges(range),
        _Range$edges4 = slicedToArray(_Range$edges3, 2),
        end = _Range$edges4[1];

    return end;
  };

  Range.intersection = function (range, another) {
    var anchor = range.anchor,
        focus = range.focus,
        rest = objectWithoutProperties(range, ["anchor", "focus"]);

    var _Range$edges5 = Range.edges(range),
        _Range$edges6 = slicedToArray(_Range$edges5, 2),
        s1 = _Range$edges6[0],
        e1 = _Range$edges6[1];

    var _Range$edges7 = Range.edges(another),
        _Range$edges8 = slicedToArray(_Range$edges7, 2),
        s2 = _Range$edges8[0],
        e2 = _Range$edges8[1];

    var start = Point.isBefore(s1, s2) ? s2 : s1;
    var end = Point.isBefore(e1, e2) ? e1 : e2;

    if (Point.isBefore(end, start)) {
      return null;
    } else {
      return _objectSpread$4({
        anchor: start,
        focus: end
      }, rest);
    }
  };
  /**
   * Check if a range is exactly equal to another.
   */


  Range.equals = function (range, another) {
    return Point.equals(range.anchor, another.anchor) && Point.equals(range.focus, another.focus);
  };
  /**
   * Check if a range exists in a list or map of ranges.
   */


  Range.exists = function (range, target) {
    if (Range.isRangeList(target)) {
      return !!target.find(function (r) {
        return Range.equals(r, range);
      });
    }

    if (Range.isRangeMap(target)) {
      for (var key in target) {
        if (Range.equals(range, target[key])) {
          return true;
        }
      }
    }

    return false;
  };
  /**
   * Check if a range includes a path, a point or part of another range.
   */


  Range.includes = function (range, target) {
    if (Range.isRange(target)) {
      if (Range.includes(range, target.anchor) || Range.includes(range, target.focus)) {
        return true;
      }

      var _Range$edges9 = Range.edges(range),
          _Range$edges10 = slicedToArray(_Range$edges9, 2),
          rs = _Range$edges10[0],
          re = _Range$edges10[1];

      var _Range$edges11 = Range.edges(target),
          _Range$edges12 = slicedToArray(_Range$edges11, 2),
          ts = _Range$edges12[0],
          te = _Range$edges12[1];

      return Point.isBefore(rs, ts) && Point.isAfter(re, te);
    }

    var _Range$edges13 = Range.edges(range),
        _Range$edges14 = slicedToArray(_Range$edges13, 2),
        start = _Range$edges14[0],
        end = _Range$edges14[1];

    var isAfterStart = false;
    var isBeforeEnd = false;

    if (Point.isPoint(target)) {
      isAfterStart = Point.compare(target, start) >= 0;
      isBeforeEnd = Point.compare(target, end) <= 0;
    } else {
      isAfterStart = Path.compare(target, start.path) >= 0;
      isBeforeEnd = Path.compare(target, end.path) <= 0;
    }

    return isAfterStart && isBeforeEnd;
  };
  /**
   * Check if a range is backward, meaning that its anchor point appears in the
   * document _after_ its focus point.
   */


  Range.isBackward = function (range) {
    var anchor = range.anchor,
        focus = range.focus;
    return Point.isAfter(anchor, focus);
  };
  /**
   * Check if a range is collapsed, meaning that both its anchor and focus
   * points refer to the exact same position in the document.
   */


  Range.isCollapsed = function (range) {
    var anchor = range.anchor,
        focus = range.focus;
    return Point.equals(anchor, focus);
  };
  /**
   * Check if a range is expanded.
   *
   * This is the opposite of [[Range.isCollapsed]] and is provided for legibility.
   */


  Range.isExpanded = function (range) {
    return !Range.isCollapsed(range);
  };
  /**
   * Check if a range is forward.
   *
   * This is the opposite of [[Range.isBackward]] and is provided for legibility.
   */


  Range.isForward = function (range) {
    return !Range.isBackward(range);
  };
  /**
   * Check if a value implements the [[Range]] interface.
   */


  Range.isRange = function (value) {
    return isPlainObject(value) && Point.isPoint(value.anchor) && Point.isPoint(value.focus);
  };
  /**
   * Check if a value is an array of `Range` objects.
   */


  Range.isRangeList = function (value) {
    return Array.isArray(value) && (value.length === 0 || Range.isRange(value[0]));
  };
  /**
   * Check if a value is a map of `Range` objects.
   */


  Range.isRangeMap = function (value) {
    if (!isPlainObject(value)) {
      return false;
    }

    for (var key in value) {
      return Range.isRange(value[key]);
    }

    return true;
  };
  /**
   * Get the start and end points of a range, in the order in which they appear
   * in the document.
   */


  Range.edges = function (range) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$reverse = options.reverse,
        reverse = _options$reverse === void 0 ? false : _options$reverse;
    var anchor = range.anchor,
        focus = range.focus;
    return Range.isBackward(range) === reverse ? [anchor, focus] : [focus, anchor];
  };
  /**
   * Transform a range by an operation.
   */


  Range.transform = function (range, op, options) {
    var _options$affinity = options.affinity,
        affinity = _options$affinity === void 0 ? 'inward' : _options$affinity;
    var affinityAnchor;
    var affinityFocus;

    if (affinity === 'inward') {
      if (Range.isForward(range)) {
        affinityAnchor = 'forward';
        affinityFocus = 'backward';
      } else {
        affinityAnchor = 'backward';
        affinityFocus = 'forward';
      }
    } else if (affinity === 'outward') {
      if (Range.isForward(range)) {
        affinityAnchor = 'backward';
        affinityFocus = 'forward';
      } else {
        affinityAnchor = 'forward';
        affinityFocus = 'backward';
      }
    } else {
      affinityAnchor = affinity;
      affinityFocus = affinity;
    }

    return produce(range, function (r) {
      var anchor = Point.transform(r.anchor, op, {
        affinity: affinityAnchor
      });
      var focus = Point.transform(r.focus, op, {
        affinity: affinityFocus
      });

      if (!anchor || !focus) {
        return null;
      }

      r.anchor = anchor;
      r.focus = focus;
    });
  };
})(Range || (Range = {}));

var Text;

(function (Text) {
  /**
   * Check if a value implements the `Text` interface.
   */
  Text.isText = function (value) {
    return isPlainObject(value) && typeof value.text === 'string' && Array.isArray(value.marks);
  };
  /**
   * Check if a value is a list of `Text` objects.
   */


  Text.isTextList = function (value) {
    return Array.isArray(value) && (value.length === 0 || Text.isText(value[0]));
  };
  /**
   * Check if an text matches set of properties.
   *
   * Note: this is for matching custom properties, and it does not ensure that
   * the `text` property are two nodes equal. However, if `marks` are passed it
   * will ensure that the set of marks is exactly equal.
   */


  Text.matches = function (text, props) {
    for (var key in props) {
      if (key === 'text') {
        continue;
      }

      if (key === 'marks' && props.marks != null) {
        var existing = text.marks;
        var marks = props.marks; // PERF: If the lengths aren't the same, we know it's not a match.

        if (existing.length !== marks.length) {
          return false;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = existing[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var m = _step.value;

            if (!Mark.exists(m, marks)) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = marks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _m = _step2.value;

            if (!Mark.exists(_m, existing)) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        continue;
      }

      if (text[key] !== props[key]) {
        return false;
      }
    }

    return true;
  };
})(Text || (Text = {}));

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Value;

(function (Value) {
  var _marked =
  /*#__PURE__*/
  regenerator.mark(points);

  /**
   * Check if a value implements the `Value` interface.
   */
  Value.isValue = function (value) {
    return isPlainObject(value) && (value.selection === null || Range.isRange(value.selection)) && Node.isNodeList(value.nodes) && Range.isRangeMap(value.annotations);
  };
  /**
   * Check if a value matches a set of properties.
   *
   * Note: the is for checking custom properties, and it does not ensure that
   * any children in the `nodes` property are equal.
   */


  Value.matches = function (value, props) {
    for (var key in props) {
      if (key === 'annotations' || key === 'nodes' || key === 'selection') {
        continue;
      }

      if (value[key] !== props[key]) {
        return false;
      }
    }

    return true;
  };
  /**
   * Iterate through all of the point objects in a value.
   */


  function points(value) {
    var selection, annotations, key, annotation;
    return regenerator.wrap(function points$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            selection = value.selection, annotations = value.annotations;

            if (!(selection != null)) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return [selection.anchor, 'anchor', selection];

          case 4:
            _context.next = 6;
            return [selection.focus, 'focus', selection];

          case 6:
            _context.t0 = regenerator.keys(annotations);

          case 7:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 16;
              break;
            }

            key = _context.t1.value;
            annotation = annotations[key];
            _context.next = 12;
            return [annotation.anchor, 'anchor', annotation, key];

          case 12:
            _context.next = 14;
            return [annotation.focus, 'focus', annotation, key];

          case 14:
            _context.next = 7;
            break;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  Value.points = points;
  /**
   * Transform a value by an operation.
   */

  Value.transform = function (value, op) {
    return produce(value, function (v) {
      switch (op.type) {
        case 'add_annotation':
          {
            var annotation = op.annotation,
                key = op.key;
            v.annotations[key] = annotation;
            break;
          }

        case 'add_mark':
          {
            var path = op.path,
                mark = op.mark;
            var node = Node.leaf(v, path);

            if (!Mark.exists(mark, node.marks)) {
              node.marks.push(mark);
            }

            break;
          }

        case 'insert_node':
          {
            var _path = op.path,
                _node = op.node;
            var parent = Node.parent(v, _path);
            var index = _path[_path.length - 1];
            parent.nodes.splice(index, 0, _node);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Value.points(v)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = slicedToArray(_step.value, 3),
                    point = _step$value[0],
                    _key = _step$value[1],
                    range = _step$value[2];

                range[_key] = Point.transform(point, op);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            break;
          }

        case 'insert_text':
          {
            var _path2 = op.path,
                offset = op.offset,
                text = op.text;

            var _node2 = Node.leaf(v, _path2);

            var before = _node2.text.slice(0, offset);

            var after = _node2.text.slice(offset);

            _node2.text = before + text + after;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = Value.points(v)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = slicedToArray(_step2.value, 3),
                    _point = _step2$value[0],
                    _key2 = _step2$value[1],
                    _range = _step2$value[2];

                _range[_key2] = Point.transform(_point, op);
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            break;
          }

        case 'merge_node':
          {
            var _path3 = op.path;

            var _node3 = Node.get(v, _path3);

            var prevPath = Path.previous(_path3);
            var prev = Node.get(v, prevPath);

            var _parent = Node.parent(v, _path3);

            var _index = _path3[_path3.length - 1];

            if (Text.isText(_node3) && Text.isText(prev)) {
              prev.text += _node3.text;
            } else if (!Text.isText(_node3) && !Text.isText(prev)) {
              var _prev$nodes;

              (_prev$nodes = prev.nodes).push.apply(_prev$nodes, toConsumableArray(_node3.nodes));
            } else {
              throw new Error("Cannot apply a \"merge_node\" operation at path [".concat(_path3, "] to nodes of different interaces: ").concat(_node3, " ").concat(prev));
            }

            _parent.nodes.splice(_index, 1);

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = Value.points(v)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _step3$value = slicedToArray(_step3.value, 3),
                    _point2 = _step3$value[0],
                    _key3 = _step3$value[1],
                    _range2 = _step3$value[2];

                _range2[_key3] = Point.transform(_point2, op);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            break;
          }

        case 'move_node':
          {
            var _path4 = op.path,
                newPath = op.newPath;

            if (Path.isAncestor(_path4, newPath)) {
              throw new Error("Cannot move a path [".concat(_path4, "] to new path [").concat(newPath, "] because the destination is inside itself."));
            }

            var _node4 = Node.get(v, _path4);

            var _parent2 = Node.parent(v, _path4);

            var _index2 = _path4[_path4.length - 1]; // This is tricky, but since the `path` and `newPath` both refer to
            // the same snapshot in time, there's a mismatch. After either
            // removing the original position, the second step's path can be out
            // of date. So instead of using the `op.newPath` directly, we
            // transform `op.path` to ascertain what the `newPath` would be after
            // the operation was applied.

            _parent2.nodes.splice(_index2, 1);

            var truePath = Path.transform(_path4, op);
            var newParent = Node.get(v, Path.parent(truePath));
            var newIndex = truePath[truePath.length - 1];
            newParent.nodes.splice(newIndex, 0, _node4);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = Value.points(v)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _step4$value = slicedToArray(_step4.value, 3),
                    _point3 = _step4$value[0],
                    _key4 = _step4$value[1],
                    _range3 = _step4$value[2];

                _range3[_key4] = Point.transform(_point3, op);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }

            break;
          }

        case 'remove_annotation':
          {
            var _key5 = op.key;
            delete v.annotations[_key5];
            break;
          }

        case 'remove_mark':
          {
            var _path5 = op.path,
                _mark = op.mark;

            var _node5 = Node.leaf(v, _path5);

            for (var i = 0; i < _node5.marks.length; i++) {
              if (Mark.matches(_node5.marks[i], _mark)) {
                _node5.marks.splice(i, 1);

                break;
              }
            }

            break;
          }

        case 'remove_node':
          {
            var _path6 = op.path;
            var _index3 = _path6[_path6.length - 1];

            var _parent3 = Node.parent(v, _path6);

            var _Node$texts = Node.texts(v, {
              from: _path6,
              reverse: true
            }),
                _Node$texts2 = slicedToArray(_Node$texts, 2),
                _prev = _Node$texts2[1];

            var _Node$texts3 = Node.texts(v, {
              from: _path6
            }),
                _Node$texts4 = slicedToArray(_Node$texts3, 2),
                next = _Node$texts4[1];

            _parent3.nodes.splice(_index3, 1); // Transform all of the points in the value, but if the point was in the
            // node that was removed we need to update the range or remove it.


            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = Value.points(v)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var _step5$value = slicedToArray(_step5.value, 4),
                    _point4 = _step5$value[0],
                    k = _step5$value[1],
                    _range4 = _step5$value[2],
                    _key6 = _step5$value[3];

                var result = Point.transform(_point4, op);

                if (result != null) {
                  _range4[k] = result;
                } else if (_prev) {
                  var _prev2 = slicedToArray(_prev, 2),
                      prevNode = _prev2[0],
                      _prevPath = _prev2[1];

                  _point4.path = _prevPath;
                  _point4.offset = prevNode.text.length;
                } else if (next) {
                  var _next = slicedToArray(next, 2),
                      nextPath = _next[1];

                  var newNextPath = Path.transform(nextPath, op);
                  _point4.path = newNextPath;
                  _point4.offset = 0;
                } else if (_key6 != null) {
                  delete v.annotations[_key6];
                } else {
                  v.selection = null;
                }
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                  _iterator5["return"]();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }

            break;
          }

        case 'remove_text':
          {
            var _path7 = op.path,
                _offset = op.offset,
                _text = op.text;

            var _node6 = Node.leaf(v, _path7);

            var _before = _node6.text.slice(0, _offset);

            var _after = _node6.text.slice(_offset + _text.length);

            _node6.text = _before + _after;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = Value.points(v)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var _step6$value = slicedToArray(_step6.value, 3),
                    _point5 = _step6$value[0],
                    _key7 = _step6$value[1],
                    _range5 = _step6$value[2];

                _range5[_key7] = Point.transform(_point5, op);
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                  _iterator6["return"]();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }

            break;
          }

        case 'set_annotation':
          {
            var _key8 = op.key,
                newProperties = op.newProperties;
            var _annotation = v.annotations[_key8];
            Object.assign(_annotation, newProperties);
            break;
          }

        case 'set_mark':
          {
            var _path8 = op.path,
                properties = op.properties,
                _newProperties = op.newProperties;

            var _node7 = Node.leaf(v, _path8);

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
              for (var _iterator7 = _node7.marks[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var _mark2 = _step7.value;

                if (Mark.matches(_mark2, properties)) {
                  Object.assign(_mark2, _newProperties);
                  break;
                }
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                  _iterator7["return"]();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }

            break;
          }

        case 'set_node':
          {
            var _path9 = op.path,
                _newProperties2 = op.newProperties;

            var _node8 = Node.get(v, _path9);

            Object.assign(_node8, _newProperties2);
            break;
          }

        case 'set_selection':
          {
            var _newProperties3 = op.newProperties;

            if (_newProperties3 == null) {
              v.selection = _newProperties3;
            } else if (v.selection == null) {
              if (!Range.isRange(_newProperties3)) {
                throw new Error("Cannot apply an incomplete \"set_selection\" operation properties ".concat(JSON.stringify(_newProperties3), " when there is no current selection."));
              }

              v.selection = _newProperties3;
            } else {
              Object.assign(v.selection, _newProperties3);
            }

            break;
          }

        case 'set_value':
          {
            var _newProperties4 = op.newProperties;
            Object.assign(v, _newProperties4);
            break;
          }

        case 'split_node':
          {
            var _path10 = op.path,
                position = op.position,
                _properties = op.properties;

            if (_path10.length === 0) {
              throw new Error("Cannot apply a \"split_node\" operation at path [".concat(_path10, "] because the top-level value cannot be split."));
            }

            var _node9 = Node.get(v, _path10);

            var _parent4 = Node.parent(v, _path10);

            var _index4 = _path10[_path10.length - 1];
            var newNode;

            if (Text.isText(_node9)) {
              var _before2 = _node9.text.slice(0, position);

              var _after2 = _node9.text.slice(position);

              _node9.text = _before2;
              newNode = _objectSpread$5({}, _node9, {}, _properties, {
                text: _after2
              });
            } else {
              var _before3 = _node9.nodes.slice(0, position);

              var _after3 = _node9.nodes.slice(position);

              _node9.nodes = _before3;
              newNode = _objectSpread$5({}, _node9, {}, _properties, {
                nodes: _after3
              });
            }

            _parent4.nodes.splice(_index4 + 1, 0, newNode);

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = Value.points(v)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var _step8$value = slicedToArray(_step8.value, 3),
                    _point6 = _step8$value[0],
                    _key9 = _step8$value[1],
                    _range6 = _step8$value[2];

                _range6[_key9] = Point.transform(_point6, op);
              }
            } catch (err) {
              _didIteratorError8 = true;
              _iteratorError8 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                  _iterator8["return"]();
                }
              } finally {
                if (_didIteratorError8) {
                  throw _iteratorError8;
                }
              }
            }

            break;
          }
      }
    });
  };
})(Value || (Value = {}));

export { Editor, Element, Fragment, Location, Mark, Node, Operation, Path, PathRef, Point, PointRef, Range, RangeRef, Span, Text, Value };
//# sourceMappingURL=index.es.js.map
