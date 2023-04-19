import { List, Record, Map, Set, is, OrderedSet } from 'immutable';
import isPlainObject from 'is-plain-object';
import warning from 'tiny-warning';
import invariant from 'tiny-invariant';
import Debug from 'debug';
import { reverse } from 'esrever';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import getDirection from 'direction';

/**
 * An auto-incrementing index for generating keys.
 *
 * @type {Number}
 */

var n = void 0;

/**
 * The global key generating function.
 *
 * @type {Function}
 */

var generate = void 0;

/**
 * Create a key, using a provided key if available.
 *
 * @param {String|Void} key
 * @return {String}
 */

function create(key) {
  if (key == null) {
    return generate();
  }

  if (typeof key === 'string') {
    return key;
  }

  throw new Error('Keys must be strings, but you passed: ' + key);
}

/**
 * Set a different unique ID generating `function`.
 *
 * @param {Function} func
 */

function setGenerator(func) {
  generate = func;
}

/**
 * Reset the key generating function to its initial state.
 */

function resetGenerator() {
  n = 0;
  generate = function generate() {
    return '' + n++;
  };
}

/**
 * Set the initial state.
 */

resetGenerator();

/**
 * Export.
 *
 * @type {Object}
 */

var KeyUtils = {
  create: create,
  setGenerator: setGenerator,
  resetGenerator: resetGenerator
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
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
};

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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
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
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Compare paths `path` and `target` to see which is before or after.
 *
 * @param {List} path
 * @param {List} target
 * @return {Number|Null}
 */

function compare(path, target) {
  var m = min(path, target);

  for (var i = 0; i < m; i++) {
    var pv = path.get(i);
    var tv = target.get(i);

    // If the path's value is ever less than the target's, it's before.
    if (pv < tv) return -1;

    // If the target's value is ever less than the path's, it's after.
    if (pv > tv) return 1;
  }

  // Paths should now be equal, otherwise something is wrong
  return path.size === target.size ? 0 : null;
}

/**
 * Create a path from `attrs`.
 *
 * @param {Array|List} attrs
 * @return {List}
 */

function create$1(attrs) {
  if (attrs == null) {
    return null;
  }

  if (List.isList(attrs)) {
    return attrs;
  }

  if (Array.isArray(attrs)) {
    return List(attrs);
  }

  throw new Error('Paths can only be created from arrays or lists, but you passed: ' + attrs);
}

/**
 * Crop paths `a` and `b` to an equal size, defaulting to the shortest.
 *
 * @param {List} a
 * @param {List} b
 */

function crop(a, b) {
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : min(a, b);

  var ca = a.slice(0, size);
  var cb = b.slice(0, size);
  return [ca, cb];
}

/**
 * Decrement a `path` by `n` at `index`, defaulting to the last index.
 *
 * @param {List} path
 * @param {Number} n
 * @param {Number} index
 */

function decrement(path) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : path.size - 1;

  return increment(path, 0 - n, index);
}

/**
 * Get all ancestor paths of th given path.
 *
 * @param {List} path
 * @returns {List}
 */

function getAncestors(path) {
  var ancestors = List().withMutations(function (list) {
    for (var i = 0; i < path.size; i++) {
      list.push(path.slice(0, i));
    }
  });

  return ancestors;
}

/**
 * Increment a `path` by `n` at `index`, defaulting to the last index.
 *
 * @param {List} path
 * @param {Number} n
 * @param {Number} index
 */

function increment(path) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : path.size - 1;

  var value = path.get(index);
  var newValue = value + n;
  var newPath = path.set(index, newValue);
  return newPath;
}

/**
 * Is a `path` above another `target` path?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isAbove(path, target) {
  var _crop = crop(path, target),
      _crop2 = slicedToArray(_crop, 2),
      p = _crop2[0],
      t = _crop2[1];

  return path.size < target.size && compare(p, t) === 0;
}

/**
 * Is a `path` after another `target` path in a document?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isAfter(path, target) {
  var _crop3 = crop(path, target),
      _crop4 = slicedToArray(_crop3, 2),
      p = _crop4[0],
      t = _crop4[1];

  return compare(p, t) === 1;
}

/**
 * Is a `path` before another `target` path in a document?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isBefore(path, target) {
  var _crop5 = crop(path, target),
      _crop6 = slicedToArray(_crop5, 2),
      p = _crop6[0],
      t = _crop6[1];

  return compare(p, t) === -1;
}

/**
 * Is a `path` equal to another `target` path in a document?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isEqual(path, target) {
  return path.equals(target);
}

/**
 * Is a `path` older than a `target` path? Meaning that it ends as an older
 * sibling of one of the indexes in the target.
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isOlder(path, target) {
  var index = path.size - 1;

  var _crop7 = crop(path, target, index),
      _crop8 = slicedToArray(_crop7, 2),
      p = _crop8[0],
      t = _crop8[1];

  var pl = path.get(index);
  var tl = target.get(index);
  return isEqual(p, t) && pl > tl;
}

/**
 * Is an `any` object a path?
 *
 * @param {Mixed} any
 * @return {Boolean}
 */

function isPath(any) {
  return (List.isList(any) || Array.isArray(any)) && any.every(function (n) {
    return typeof n === 'number';
  });
}

/**
 * Is a `path` a sibling of a `target` path?
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isSibling(path, target) {
  if (path.size !== target.size) return false;
  var p = path.butLast();
  var t = target.butLast();
  return p.equals(t);
}

/**
 * Is a `path` younger than a `target` path? Meaning that it ends as a younger
 * sibling of one of the indexes in the target.
 *
 * @param {List} path
 * @param {List} target
 * @return {Boolean}
 */

function isYounger(path, target) {
  var index = path.size - 1;

  var _crop9 = crop(path, target, index),
      _crop10 = slicedToArray(_crop9, 2),
      p = _crop10[0],
      t = _crop10[1];

  var pl = path.get(index);
  var tl = target.get(index);
  return isEqual(p, t) && pl < tl;
}

/**
 * Lift a `path` to refer to its `n`th ancestor.
 *
 * @param {List} path
 * @return {List}
 */

function lift(path) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var ancestor = path.slice(0, -1 * n);
  return ancestor;
}

/**
 * Drop a `path`, returning a relative path from a depth of `n`.
 *
 * @param {List} path
 * @param {Number} n
 * @return {List}
 */

function drop(path) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var relative = path.slice(n);
  return relative;
}

/**
 * Get the maximum length of paths `a` and `b`.
 *
 * @param {List} path
 * @param {List} path
 * @return {Number}
 */

function max(a, b) {
  var n = Math.max(a.size, b.size);
  return n;
}

/**
 * Get the minimum length of paths `a` and `b`.
 *
 * @param {List} path
 * @param {List} path
 * @return {Number}
 */

function min(a, b) {
  var n = Math.min(a.size, b.size);
  return n;
}

/**
 * Get the common ancestor path of path `a` and path `b`.
 *
 * @param {List} a
 * @param {List} b
 * @return {List}
 */

function relate(a, b) {
  var array = [];

  for (var i = 0; i < a.size && i < b.size; i++) {
    var av = a.get(i);
    var bv = b.get(i);

    // If the values aren't equal, they've diverged and don't share an ancestor.
    if (av !== bv) break;

    // Otherwise, the current value is still a common ancestor.
    array.push(av);
  }

  var path = create$1(array);
  return path;
}

/**
 * Transform a `path` by an `operation`, adjusting it to stay current.
 *
 * @param {List} path
 * @param {Operation} operation
 * @return {List<List>}
 */

function transform(path, operation) {
  var type = operation.type,
      position = operation.position,
      p = operation.path;


  if (type === 'add_mark' || type === 'insert_text' || type === 'remove_mark' || type === 'remove_text' || type === 'set_mark' || type === 'set_node' || type === 'set_selection' || type === 'set_value' || type === 'add_annotation' || type === 'remove_annotation' || type === 'set_annotation' || path.size === 0) {
    return List([path]);
  }

  var pIndex = p.size - 1;
  var pEqual = isEqual(p, path);
  var pYounger = isYounger(p, path);
  var pAbove = isAbove(p, path);

  if (type === 'insert_node') {
    if (pEqual || pYounger || pAbove) {
      path = increment(path, 1, pIndex);
    }
  }

  if (type === 'remove_node') {
    if (pYounger) {
      path = decrement(path, 1, pIndex);
    } else if (pEqual || pAbove) {
      path = [];
    }
  }

  if (type === 'merge_node') {
    if (pEqual || pYounger) {
      path = decrement(path, 1, pIndex);
    } else if (pAbove) {
      path = decrement(path, 1, pIndex);
      path = increment(path, position, pIndex + 1);
    }
  }

  if (type === 'split_node') {
    if (pEqual) {
      path = [path, increment(path)];
    } else if (pYounger) {
      path = increment(path, 1, pIndex);
    } else if (pAbove) {
      if (path.get(pIndex + 1) >= position) {
        path = increment(path, 1, pIndex);
        path = decrement(path, position, pIndex + 1);
      }
    }
  }

  if (type === 'move_node') {
    var np = operation.newPath;


    if (isEqual(p, np)) {
      return List([path]);
    }

    if (pAbove || pEqual) {
      // We are comparing something that was moved
      // The new path is unaffected unless the old path was the left-sibling of an ancestor
      if (isYounger(p, np) && p.size < np.size) {
        path = decrement(np, 1, min(np, p) - 1).concat(path.slice(p.size));
      } else {
        path = np.concat(path.slice(p.size));
      }
    } else {
      // This is equivalent logic to remove_node for path
      if (pYounger) {
        path = decrement(path, 1, pIndex);
      }

      // This is the equivalent logic to insert_node for newPath
      if (isYounger(np, path) || isEqual(np, path) || isAbove(np, path)) {
        path = increment(path, 1, np.size - 1);
      }
    }
  }

  var paths = Array.isArray(path) ? path : [path];
  return List(paths);
}

/**
 * Export.
 *
 * @type {Object}
 */

var PathUtils = {
  compare: compare,
  create: create$1,
  crop: crop,
  decrement: decrement,
  getAncestors: getAncestors,
  increment: increment,
  isAbove: isAbove,
  isAfter: isAfter,
  isBefore: isBefore,
  isEqual: isEqual,
  isOlder: isOlder,
  isPath: isPath,
  isSibling: isSibling,
  isYounger: isYounger,
  lift: lift,
  drop: drop,
  max: max,
  min: min,
  relate: relate,
  transform: transform
};

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  key: undefined,
  offset: undefined,
  path: undefined

  /**
   * Point.
   *
   * @type {Point}
   */

};
var Point = function (_Record) {
  inherits(Point, _Record);

  function Point() {
    classCallCheck(this, Point);
    return possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).apply(this, arguments));
  }

  createClass(Point, [{
    key: 'isAfterPoint',


    /**
     * Check whether the point is after another `point`.
     *
     * @return {Boolean}
     */

    value: function isAfterPoint(point) {
      if (this.isUnset) return false;
      var is$$1 = this.key === point.key && this.offset > point.offset || PathUtils.compare(this.path, point.path) === 1;
      return is$$1;
    }

    /**
     * Check whether the point is after a `range`.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isAfterRange',
    value: function isAfterRange(range) {
      if (this.isUnset) return false;
      var is$$1 = this.isAfterPoint(range.end);
      return is$$1;
    }

    /**
     * Check whether the point is at the end of a `range`.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isAtEndOfRange',
    value: function isAtEndOfRange(range) {
      if (this.isUnset) return false;
      var is$$1 = this.equals(range.end);
      return is$$1;
    }

    /**
     * Check whether the point is at the start of a `range`.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isAtStartOfRange',
    value: function isAtStartOfRange(range) {
      if (this.isUnset) return false;
      var is$$1 = this.equals(range.start);
      return is$$1;
    }

    /**
     * Check whether the point is before another `point`.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isBeforePoint',
    value: function isBeforePoint(point) {
      if (this.isUnset) return false;
      var is$$1 = this.key === point.key && this.offset < point.offset || PathUtils.compare(this.path, point.path) === -1;
      return is$$1;
    }

    /**
     * Check whether the point is before a `range`.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isBeforeRange',
    value: function isBeforeRange(range) {
      if (this.isUnset) return false;
      var is$$1 = this.isBeforePoint(range.start);
      return is$$1;
    }

    /**
     * Check whether the point is inside a `range`.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isInRange',
    value: function isInRange(range) {
      if (this.isUnset) return false;
      var is$$1 = this.equals(range.start) || this.equals(range.end) || this.isAfterPoint(range.start) && this.isBeforePoint(range.end);
      return is$$1;
    }

    /**
     * Check whether the point is at the end of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'isAtEndOfNode',
    value: function isAtEndOfNode(node) {
      if (this.isUnset) return false;
      var last = node.getLastText();
      var is$$1 = this.key === last.key && this.offset === last.text.length;
      return is$$1;
    }

    /**
     * Check whether the point is at the start of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'isAtStartOfNode',
    value: function isAtStartOfNode(node) {
      if (this.isUnset) return false;

      // PERF: Do a check for a `0` offset first since it's quickest.
      if (this.offset !== 0) return false;

      var first = node.getFirstText();
      var is$$1 = this.key === first.key;
      return is$$1;
    }

    /**
     * Check whether the point is in a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'isInNode',
    value: function isInNode(node) {
      if (this.isUnset) return false;
      if (node.object === 'text' && node.key === this.key) return true;
      if (node.hasNode(this.key)) return true;
      return false;
    }

    /**
     * Move the point's offset backward `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Point}
     */

  }, {
    key: 'moveBackward',
    value: function moveBackward() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (n === 0) return this;
      if (n < 0) return this.moveForward(-n);
      var point = this.setOffset(this.offset - n);
      return point;
    }

    /**
     * Move the point's offset forward `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Point}
     */

  }, {
    key: 'moveForward',
    value: function moveForward() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (n === 0) return this;
      if (n < 0) return this.moveBackward(-n);
      var point = this.setOffset(this.offset + n);
      return point;
    }

    /**
     * Move the point's anchor point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String|Number} path
     * @param {Number} offset
     * @return {Point}
     */

  }, {
    key: 'moveTo',
    value: function moveTo(path) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var key = this.key;

      if (typeof path === 'number') {
        offset = path;
        path = this.path;
      } else if (typeof path === 'string') {
        key = path;
        path = key === this.key ? this.path : null;
      } else {
        key = path.equals(this.path) ? this.key : null;
      }

      var point = this.merge({ key: key, path: path, offset: offset });
      return point;
    }

    /**
     * Move the point's anchor point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Point}
     */

  }, {
    key: 'moveToStartOfNode',
    value: function moveToStartOfNode(node) {
      var first = node.getFirstText();
      var point = this.moveTo(first.key, 0);
      return point;
    }

    /**
     * Move the point's anchor point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Point}
     */

  }, {
    key: 'moveToEndOfNode',
    value: function moveToEndOfNode(node) {
      var last = node.getLastText();
      var point = this.moveTo(last.key, last.text.length);
      return point;
    }

    /**
     * Normalize the point relative to a `node`, ensuring that its key and path
     * reference a text node, or that it gets unset.
     *
     * @param {Node} node
     * @return {Point}
     */

  }, {
    key: 'normalize',
    value: function normalize(node) {
      // If both the key and path are null, there's no reference to a node, so
      // make sure it is entirely unset.
      if (this.key == null && this.path == null) {
        return this.setOffset(null);
      }

      var key = this.key,
          offset = this.offset,
          path = this.path;

      // PERF: this function gets called a lot.
      // to avoid creating the key -> path lookup table, we attempt to look up by path first.

      var target = path && node.getNode(path);

      if (!target) {
        target = node.getNode(key);

        if (target) {
          // There is a misalignment of path and key
          var _point = this.merge({
            path: node.getPath(key)
          });

          return _point;
        }
      }

      if (!target) {
        warning(false, "A point's `path` or `key` invalid and was reset!");

        var text = node.getFirstText();
        if (!text) return Point.create();

        var _point2 = this.merge({
          key: text.key,
          offset: 0,
          path: node.getPath(text.key)
        });

        return _point2;
      }

      if (target.object !== 'text') {
        warning(false, 'A point should not reference a non-text node!');

        var _text = target.getTextAtOffset(offset);
        var before = target.getOffset(_text.key);
        var _point3 = this.merge({
          offset: offset - before,
          key: _text.key,
          path: node.getPath(_text.key)
        });

        return _point3;
      }

      if (target && path && key && key !== target.key) {
        warning(false, "A point's `key` did not match its `path`!");

        // TODO: if we look up by path above and it differs by key, do we want to reset it to looking up by key?
      }

      var point = this.merge({
        key: target.key,
        path: path == null ? node.getPath(target.key) : path,
        offset: offset == null ? 0 : Math.min(offset, target.text.length)
      });

      // COMPAT: There is an ambiguity, since a point can exist at the end of a
      // text node, or at the start of the following one. To eliminate it we
      // enforce that if there is a following text node, we always move it there.
      if (point.offset === target.text.length) {
        var block = node.getClosestBlock(point.path);
        // TODO: this next line is broken because `getNextText` takes a path
        var next = block.getNextText();

        if (next) {
          point = point.merge({
            key: next.key,
            path: node.getPath(next.key),
            offset: 0
          });
        }
      }

      return point;
    }

    /**
     * Set the point's key to a new `key`.
     *
     * @param {String} key
     * @return {Point}
     */

  }, {
    key: 'setKey',
    value: function setKey(key) {
      if (key != null) {
        key = KeyUtils.create(key);
      }

      var point = this.set('key', key);
      return point;
    }

    /**
     * Set the point's offset to a new `offset`.
     *
     * @param {Number} offset
     * @return {Point}
     */

  }, {
    key: 'setOffset',
    value: function setOffset(offset) {
      var point = this.set('offset', offset);
      return point;
    }

    /**
     * Set the point's path to a new `path`.
     *
     * @param {List|Array} path
     * @return {Point}
     */

  }, {
    key: 'setPath',
    value: function setPath(path) {
      if (path != null) {
        path = PathUtils.create(path);
      }

      var point = this.set('path', path);
      return point;
    }

    /**
     * Return a JSON representation of the point.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        key: this.key,
        offset: this.offset,
        path: this.path && this.path.toArray()
      };

      if (!options.preserveKeys) {
        delete object.key;
      }

      return object;
    }

    /**
     * Unset the point.
     *
     * @return {Point}
     */

  }, {
    key: 'unset',
    value: function unset() {
      return this.merge({
        key: null,
        offset: null,
        path: null
      });
    }
  }, {
    key: 'isSet',


    /**
     * Check whether all properties of the point are set.
     *
     * @return {Boolean}
     */

    get: function get$$1() {
      return this.key != null && this.offset != null && this.path != null;
    }

    /**
     * Check whether any property of the point is not set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isUnset',
    get: function get$$1() {
      return !this.isSet;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Point` with `attrs`.
     *
     * @param {Object|Point} attrs
     * @return {Point}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Point.isPoint(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Point.fromJSON(attrs);
      }

      throw new Error('`Point.create` only accepts objects or points, but you passed it: ' + attrs);
    }

    /**
     * Create a dictionary of settable point properties from `attrs`.
     *
     * @param {Object|Point} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Point.isPoint(a)) {
        return {
          key: a.key,
          offset: a.offset,
          path: a.path
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('key' in a) p.key = a.key;
        if ('offset' in a) p.offset = a.offset;
        if ('path' in a) p.path = PathUtils.create(a.path);

        // If only a path is set, or only a key is set, ensure that the other is
        // set to null so that it can be normalized back to the right value.
        // Otherwise we won't realize that the path and key don't match anymore.
        if ('path' in a && !('key' in a)) p.key = null;
        if ('key' in a && !('path' in a)) p.path = null;

        return p;
      }

      throw new Error('`Point.createProperties` only accepts objects or points, but you passed it: ' + a);
    }

    /**
     * Create a `Point` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Point}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$key = object.key,
          key = _object$key === undefined ? null : _object$key,
          _object$offset = object.offset,
          offset = _object$offset === undefined ? null : _object$offset,
          _object$path = object.path,
          path = _object$path === undefined ? null : _object$path;


      var point = new Point({
        key: key,
        offset: offset,
        path: PathUtils.create(path)
      });

      return point;
    }
  }]);
  return Point;
}(Record(DEFAULTS));

/**
 * Data.
 *
 * This isn't an immutable record, it's just a thin wrapper around `Map` so that
 * we can allow for more convenient creation.
 *
 * @type {Object}
 */

var Data = function () {
  function Data() {
    classCallCheck(this, Data);
  }

  createClass(Data, null, [{
    key: 'create',

    /**
     * Create a new `Data` with `attrs`.
     *
     * @param {Object|Data|Map} attrs
     * @return {Data} data
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Map.isMap(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Data.fromJSON(attrs);
      }

      throw new Error('`Data.create` only accepts objects or maps, but you passed it: ' + attrs);
    }

    /**
     * Create a `Data` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Data}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      return new Map(object);
    }

    /**
     * Alias `fromJS`.
     */

  }]);
  return Data;
}();

/**
 * Export.
 *
 * @type {Object}
 */

Data.fromJS = Data.fromJSON;

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$1 = {
  data: undefined,
  type: undefined

  /**
   * Mark.
   *
   * @type {Mark}
   */

};
var Mark = function (_Record) {
  inherits(Mark, _Record);

  function Mark() {
    classCallCheck(this, Mark);
    return possibleConstructorReturn(this, (Mark.__proto__ || Object.getPrototypeOf(Mark)).apply(this, arguments));
  }

  createClass(Mark, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the mark.
     *
     * @return {Object}
     */

    value: function toJSON() {
      var object = {
        object: this.object,
        type: this.type,
        data: this.data.toJSON()
      };

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Mark` with `attrs`.
     *
     * @param {Object|Mark} attrs
     * @return {Mark}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Mark.isMark(attrs)) {
        return attrs;
      }

      if (typeof attrs === 'string') {
        attrs = { type: attrs };
      }

      if (isPlainObject(attrs)) {
        return Mark.fromJSON(attrs);
      }

      throw new Error('`Mark.create` only accepts objects, strings or marks, but you passed it: ' + attrs);
    }

    /**
     * Create a set of marks.
     *
     * @param {Array<Object|Mark>} elements
     * @return {Set<Mark>}
     */

  }, {
    key: 'createSet',
    value: function createSet(elements) {
      if (Set.isSet(elements) || Array.isArray(elements)) {
        var marks = new Set(elements.map(Mark.create));
        return marks;
      }

      if (elements == null) {
        return Set();
      }

      throw new Error('`Mark.createSet` only accepts sets, arrays or null, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable mark properties from `attrs`.
     *
     * @param {Object|String|Mark} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Mark.isMark(attrs)) {
        return {
          data: attrs.data,
          type: attrs.type
        };
      }

      if (typeof attrs === 'string') {
        return { type: attrs };
      }

      if (isPlainObject(attrs)) {
        var props = {};
        if ('type' in attrs) props.type = attrs.type;
        if ('data' in attrs) props.data = Data.create(attrs.data);
        return props;
      }

      throw new Error('`Mark.createProperties` only accepts objects, strings or marks, but you passed it: ' + attrs);
    }

    /**
     * Create a `Mark` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Mark}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          type = object.type;


      if (typeof type !== 'string') {
        throw new Error('`Mark.fromJS` requires a `type` string.');
      }

      var mark = new Mark({
        type: type,
        data: new Map(data)
      });

      return mark;
    }

    /**
     * Check if `any` is a set of marks.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isMarkSet',
    value: function isMarkSet(any) {
      return Set.isSet(any) && any.every(function (item) {
        return Mark.isMark(item);
      });
    }
  }]);
  return Mark;
}(Record(DEFAULTS$1));

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$2 = {
  type: undefined,
  data: undefined,
  anchor: undefined,
  focus: undefined

  /**
   * Decoration.
   *
   * @type {Decoration}
   */

};
var Decoration = function (_Record) {
  inherits(Decoration, _Record);

  function Decoration() {
    classCallCheck(this, Decoration);
    return possibleConstructorReturn(this, (Decoration.__proto__ || Object.getPrototypeOf(Decoration)).apply(this, arguments));
  }

  createClass(Decoration, [{
    key: 'setProperties',


    /**
     * Set new `properties` on the decoration.
     *
     * @param {Object|Range|Selection} properties
     * @return {Range}
     */

    value: function setProperties(properties) {
      properties = Decoration.createProperties(properties);
      var decoration = this.merge(properties);
      return decoration;
    }

    /**
     * Return a JSON representation of the decoration.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        type: this.type,
        data: this.data.toJSON(),
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options)
      };

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Decoration` with `attrs`.
     *
     * @param {Object|Decoration} attrs
     * @return {Decoration}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Decoration.isDecoration(attrs)) {
        return attrs;
      }

      if (Range.isRange(attrs)) {
        return Decoration.fromJSON(Range.createProperties(attrs));
      }

      if (isPlainObject(attrs)) {
        return Decoration.fromJSON(attrs);
      }

      throw new Error('`Decoration.create` only accepts objects or decorations, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Ranges` from `elements`.
     *
     * @param {Array<Decoration|Object>|List<Decoration|Object>} elements
     * @return {List<Decoration>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (List.isList(elements) || Array.isArray(elements)) {
        var list = new List(elements.map(Decoration.create));
        return list;
      }

      throw new Error('`Decoration.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable decoration properties from `attrs`.
     *
     * @param {Object|String|Decoration} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Decoration.isDecoration(a)) {
        return {
          type: a.type,
          data: a.data,
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus),
          mark: Mark.create(a.mark)
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('type' in a) p.type = a.type;
        if ('data' in a) p.data = Data.create(a.data);
        if ('anchor' in a) p.anchor = Point.create(a.anchor);
        if ('focus' in a) p.focus = Point.create(a.focus);
        return p;
      }

      throw new Error('`Decoration.createProperties` only accepts objects or decorations, but you passed it: ' + a);
    }

    /**
     * Create a `Decoration` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Decoration}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var anchor = object.anchor,
          focus = object.focus;
      var type = object.type,
          data = object.data;


      if (object.mark && !type) {
        warning(false, 'As of slate@0.47 the `decoration.mark` property has been changed to `decoration.type` and `decoration.data` directly.');

        type = object.mark.type;
        data = object.mark.data;
      }

      if (!type) {
        throw new Error('Decorations must be created with a `type`, but you passed: ' + JSON.stringify(object));
      }

      var decoration = new Decoration({
        type: type,
        data: Data.create(data || {}),
        anchor: Point.fromJSON(anchor || {}),
        focus: Point.fromJSON(focus || {})
      });

      return decoration;
    }
  }]);
  return Decoration;
}(Record(DEFAULTS$2));

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$3 = {
  anchor: undefined,
  focus: undefined,
  isFocused: undefined,
  marks: undefined

  /**
   * Selection.
   *
   * @type {Selection}
   */

};
var Selection = function (_Record) {
  inherits(Selection, _Record);

  function Selection() {
    classCallCheck(this, Selection);
    return possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).apply(this, arguments));
  }

  createClass(Selection, [{
    key: 'setIsFocused',


    /**
     * Set the `isFocused` property to a new `value`.
     *
     * @param {Boolean} value
     * @return {Selection}
     */

    value: function setIsFocused(value) {
      var selection = this.set('isFocused', value);
      return selection;
    }

    /**
     * Set the `marks` property to a new set of `marks`.
     *
     * @param {Set} marks
     * @return {Selection}
     */

  }, {
    key: 'setMarks',
    value: function setMarks(marks) {
      var selection = this.set('marks', marks);
      return selection;
    }

    /**
     * Set new `properties` on the selection.
     *
     * @param {Object|Range|Selection} properties
     * @return {Range}
     */

  }, {
    key: 'setProperties',
    value: function setProperties(properties) {
      properties = Selection.createProperties(properties);
      var _properties = properties,
          anchor = _properties.anchor,
          focus = _properties.focus,
          props = objectWithoutProperties(_properties, ['anchor', 'focus']);


      if (anchor) {
        props.anchor = Point.create(anchor);
      }

      if (focus) {
        props.focus = Point.create(focus);
      }

      var selection = this.merge(props);
      return selection;
    }

    /**
     * Return a JSON representation of the selection.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options),
        isFocused: this.isFocused,
        marks: this.marks == null ? null : this.marks.toArray().map(function (m) {
          return m.toJSON();
        })
      };

      return object;
    }
  }, {
    key: 'isBlurred',


    /**
     * Check whether the selection is blurred.
     *
     * @return {Boolean}
     */

    get: function get$$1() {
      return !this.isFocused;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Selection` with `attrs`.
     *
     * @param {Object|Selection} attrs
     * @return {Selection}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Selection.isSelection(attrs)) {
        return attrs;
      }

      if (Range.isRange(attrs)) {
        return Selection.fromJSON(Range.createProperties(attrs));
      }

      if (isPlainObject(attrs)) {
        return Selection.fromJSON(attrs);
      }

      throw new Error('`Selection.create` only accepts objects, ranges or selections, but you passed it: ' + attrs);
    }

    /**
     * Create a dictionary of settable selection properties from `attrs`.
     *
     * @param {Object|String|Selection} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Selection.isSelection(a)) {
        return {
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus),
          isFocused: a.isFocused,
          marks: a.marks
        };
      }

      if (Range.isRange(a)) {
        return {
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus)
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('anchor' in a) p.anchor = Point.create(a.anchor);
        if ('focus' in a) p.focus = Point.create(a.focus);
        if ('isFocused' in a) p.isFocused = a.isFocused;
        if ('marks' in a) p.marks = a.marks == null ? null : Mark.createSet(a.marks);
        return p;
      }

      throw new Error('`Selection.createProperties` only accepts objects, ranges or selections, but you passed it: ' + a);
    }

    /**
     * Create a `Selection` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Selection}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var anchor = object.anchor,
          focus = object.focus,
          _object$isFocused = object.isFocused,
          isFocused = _object$isFocused === undefined ? false : _object$isFocused,
          _object$marks = object.marks,
          marks = _object$marks === undefined ? null : _object$marks;

      var selection = new Selection({
        anchor: Point.fromJSON(anchor || {}),
        focus: Point.fromJSON(focus || {}),
        isFocused: isFocused,
        marks: marks == null ? null : new Set(marks.map(Mark.fromJSON))
      });

      return selection;
    }
  }]);
  return Selection;
}(Record(DEFAULTS$3));

/**
 * Slate-specific object types.
 *
 * @type {Object}
 */

var TYPES = {
  annotation: '@@__SLATE_ANNOTATION__@@',
  block: '@@__SLATE_BLOCK__@@',
  change: '@@__SLATE_CHANGE__@@',
  decoration: '@@__SLATE_DECORATION__@@',
  document: '@@__SLATE_DOCUMENT__@@',
  editor: '@@__SLATE_EDITOR__@@',
  inline: '@@__SLATE_INLINE__@@',
  leaf: '@@__SLATE_LEAF__@@',
  mark: '@@__SLATE_MARK__@@',
  operation: '@@__SLATE_OPERATION__@@',
  point: '@@__SLATE_POINT__@@',
  range: '@@__SLATE_RANGE__@@',
  selection: '@@__SLATE_SELECTION__@@',
  text: '@@__SLATE_TEXT__@@',
  value: '@@__SLATE_VALUE__@@'

  /**
   * Determine whether a `value` is of `type`.
   *
   * @param {string} type
   * @param {any} value
   * @return {boolean}
   */

};function isObject(type, value) {
  return !!(value && value[TYPES[type]]);
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$4 = {
  anchor: undefined,
  focus: undefined

  /**
   * Range.
   *
   * @type {Range}
   */

};
var Range = function (_Record) {
  inherits(Range, _Record);

  function Range() {
    classCallCheck(this, Range);
    return possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).apply(this, arguments));
  }

  createClass(Range, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the range.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options)
      };

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Range` with `attrs`.
     *
     * @param {Object|Range} attrs
     * @return {Range}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Range.isRange(attrs)) {
        if (attrs.object === 'range') {
          return attrs;
        } else {
          return Range.fromJSON(Range.createProperties(attrs));
        }
      }

      if (isPlainObject(attrs)) {
        return Range.fromJSON(attrs);
      }

      throw new Error('`Range.create` only accepts objects or ranges, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Ranges` from `elements`.
     *
     * @param {Array<Range|Object>|List<Range|Object>} elements
     * @return {List<Range>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (List.isList(elements) || Array.isArray(elements)) {
        var list = new List(elements.map(Range.create));
        return list;
      }

      throw new Error('`Range.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable range properties from `attrs`.
     *
     * @param {Object|String|Range} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Range.isRange(a)) {
        return {
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus)
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('anchor' in a) p.anchor = Point.create(a.anchor);
        if ('focus' in a) p.focus = Point.create(a.focus);
        return p;
      }

      throw new Error('`Range.createProperties` only accepts objects, annotations, decorations, ranges or selections, but you passed it: ' + a);
    }

    /**
     * Create a `Range` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Range}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var anchor = object.anchor,
          focus = object.focus;

      var range = new Range({
        anchor: Point.fromJSON(anchor || {}),
        focus: Point.fromJSON(focus || {})
      });

      return range;
    }

    /**
     * Check if a `value` is a `Range`, or is range-like.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isRange',
    value: function isRange(value) {
      return isObject('range', value) || Decoration.isDecoration(value) || Selection.isSelection(value);
    }
  }]);
  return Range;
}(Record(DEFAULTS$4));

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$5 = {
  key: undefined,
  type: undefined,
  data: undefined,
  anchor: undefined,
  focus: undefined

  /**
   * Annotation.
   *
   * @type {Annotation}
   */

};
var Annotation = function (_Record) {
  inherits(Annotation, _Record);

  function Annotation() {
    classCallCheck(this, Annotation);
    return possibleConstructorReturn(this, (Annotation.__proto__ || Object.getPrototypeOf(Annotation)).apply(this, arguments));
  }

  createClass(Annotation, [{
    key: 'setProperties',


    /**
     * Set new `properties` on the annotation.
     *
     * @param {Object|Range|Selection} properties
     * @return {Range}
     */

    value: function setProperties(properties) {
      properties = Annotation.createProperties(properties);
      var annotation = this.merge(properties);
      return annotation;
    }

    /**
     * Return a JSON representation of the annotation.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        key: this.key,
        type: this.type,
        data: this.data.toJSON(),
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options)
      };

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Annotation` with `attrs`.
     *
     * @param {Object|Annotation} attrs
     * @return {Annotation}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Annotation.isAnnotation(attrs)) {
        return attrs;
      }

      if (Range.isRange(attrs)) {
        return Annotation.fromJSON(Range.createProperties(attrs));
      }

      if (isPlainObject(attrs)) {
        return Annotation.fromJSON(attrs);
      }

      throw new Error('`Annotation.create` only accepts objects or annotations, but you passed it: ' + attrs);
    }

    /**
     * Create a map of annotations from `elements`.
     *
     * @param {Object<String,Annotation>|Map<String,Annotation>} elements
     * @return {Map<String,Annotation>}
     */

  }, {
    key: 'createMap',
    value: function createMap() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (Map.isMap(elements)) {
        return elements;
      }

      if (isPlainObject(elements)) {
        var obj = {};

        for (var key in elements) {
          var value = elements[key];
          var annotation = Annotation.create(value);
          obj[key] = annotation;
        }

        return Map(obj);
      }

      throw new Error('`Annotation.createMap` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable annotation properties from `attrs`.
     *
     * @param {Object|String|Annotation} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Annotation.isAnnotation(a)) {
        return {
          key: a.key,
          type: a.type,
          data: a.data,
          anchor: Point.createProperties(a.anchor),
          focus: Point.createProperties(a.focus)
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('key' in a) p.key = a.key;
        if ('type' in a) p.type = a.type;
        if ('data' in a) p.data = Data.create(a.data);
        if ('anchor' in a) p.anchor = Point.create(a.anchor);
        if ('focus' in a) p.focus = Point.create(a.focus);
        return p;
      }

      throw new Error('`Annotation.createProperties` only accepts objects or annotations, but you passed it: ' + a);
    }

    /**
     * Create a `Annotation` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Annotation}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var key = object.key,
          type = object.type,
          data = object.data,
          anchor = object.anchor,
          focus = object.focus;


      if (!key) {
        throw new Error('Annotations must be created with a `key`, but you passed: ' + JSON.stringify(object));
      }

      if (!type) {
        throw new Error('Annotations must be created with a `type`, but you passed: ' + JSON.stringify(object));
      }

      var annotation = new Annotation({
        key: key,
        type: type,
        data: Data.create(data || {}),
        anchor: Point.fromJSON(anchor || {}),
        focus: Point.fromJSON(focus || {})
      });

      return annotation;
    }
  }]);
  return Annotation;
}(Record(DEFAULTS$5));

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$6 = {
  data: undefined,
  key: undefined,
  nodes: undefined

  /**
   * Document.
   *
   * @type {Document}
   */

};
var Document = function (_Record) {
  inherits(Document, _Record);

  function Document() {
    classCallCheck(this, Document);
    return possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).apply(this, arguments));
  }

  createClass(Document, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the document.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        data: this.data.toJSON(),
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (options.preserveKeys) {
        object.key = this.key;
      }

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Document` with `attrs`.
     *
     * @param {Object|Array|List|Text} attrs
     * @return {Document}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Document.isDocument(attrs)) {
        return attrs;
      }

      if (List.isList(attrs) || Array.isArray(attrs)) {
        attrs = { nodes: attrs };
      }

      if (isPlainObject(attrs)) {
        return Document.fromJSON(attrs);
      }

      throw new Error('`Document.create` only accepts objects, arrays, lists or documents, but you passed it: ' + attrs);
    }

    /**
     * Create a `Document` from a JSON `object`.
     *
     * @param {Object|Document} object
     * @return {Document}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Document.isDocument(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$key = object.key,
          key = _object$key === undefined ? KeyUtils.create() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes;


      var document = new Document({
        key: key,
        data: new Map(data),
        nodes: Node.createList(nodes)
      });

      return document;
    }
  }]);
  return Document;
}(Record(DEFAULTS$6));

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$7 = {
  data: undefined,
  key: undefined,
  nodes: undefined,
  type: undefined

  /**
   * Inline.
   *
   * @type {Inline}
   */

};
var Inline = function (_Record) {
  inherits(Inline, _Record);

  function Inline() {
    classCallCheck(this, Inline);
    return possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
  }

  createClass(Inline, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the inline.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        type: this.type,
        data: this.data.toJSON(),
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (options.preserveKeys) {
        object.key = this.key;
      }

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Inline` with `attrs`.
     *
     * @param {Object|String|Inline} attrs
     * @return {Inline}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Inline.isInline(attrs)) {
        return attrs;
      }

      if (typeof attrs === 'string') {
        attrs = { type: attrs };
      }

      if (isPlainObject(attrs)) {
        return Inline.fromJSON(attrs);
      }

      throw new Error('`Inline.create` only accepts objects, strings or inlines, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Inlines` from an array.
     *
     * @param {Array<Inline|Object>|List<Inline|Object>} elements
     * @return {List<Inline>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (List.isList(elements) || Array.isArray(elements)) {
        var list = new List(elements.map(Inline.create));
        return list;
      }

      throw new Error('`Inline.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a `Inline` from a JSON `object`.
     *
     * @param {Object|Inline} object
     * @return {Inline}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Inline.isInline(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$key = object.key,
          key = _object$key === undefined ? KeyUtils.create() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes,
          type = object.type;


      if (typeof type !== 'string') {
        throw new Error('`Inline.fromJS` requires a `type` string.');
      }

      var inline = new Inline({
        key: key,
        type: type,
        data: new Map(data),
        nodes: Node.createList(nodes)
      });

      return inline;
    }

    /**
     * Check if `any` is a list of inlines.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isInlineList',
    value: function isInlineList(any) {
      return List.isList(any) && any.every(function (item) {
        return Inline.isInline(item);
      });
    }
  }]);
  return Inline;
}(Record(DEFAULTS$7));

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$8 = {
  key: undefined,
  marks: undefined,
  text: undefined
};

var Leaf = Record({
  text: undefined,
  marks: undefined,
  annotations: undefined,
  decorations: undefined
});

/**
 * Text.
 *
 * @type {Text}
 */

var Text = function (_Record) {
  inherits(Text, _Record);

  function Text() {
    classCallCheck(this, Text);
    return possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  createClass(Text, [{
    key: 'addMark',


    /**
     * Add a `mark`.
     *
     * @param {Mark} mark
     * @return {Text}
     */

    value: function addMark(mark) {
      mark = Mark.create(mark);
      var marks = this.marks;

      var next = marks.add(mark);
      var node = this.set('marks', next);
      return node;
    }

    /**
     * Add a set of `marks`.
     *
     * @param {Set<Mark>} marks
     * @return {Text}
     */

  }, {
    key: 'addMarks',
    value: function addMarks(marks) {
      marks = Mark.createSet(marks);
      var node = this.set('marks', this.marks.union(marks));
      return node;
    }

    /**
     * Get a list of uniquely-formatted leaves for the text node, given its
     * existing marks, and its current `annotations` and `decorations`.
     *
     * @param {Map<String,Annotation>} annotations
     * @param {List<Decoration>} decorations
     * @return {List<Leaf>}
     */

  }, {
    key: 'getLeaves',
    value: function getLeaves(annotations, decorations) {
      var text = this.text,
          marks = this.marks;

      var leaves = [{ text: text, marks: marks, annotations: [], decorations: [] }];

      // Helper to split a leaf into two `at` an offset.
      var split = function split(leaf, at) {
        return [{
          text: leaf.text.slice(0, at),
          marks: leaf.marks,
          annotations: [].concat(toConsumableArray(leaf.annotations)),
          decorations: [].concat(toConsumableArray(leaf.decorations))
        }, {
          text: leaf.text.slice(at),
          marks: leaf.marks,
          annotations: [].concat(toConsumableArray(leaf.annotations)),
          decorations: [].concat(toConsumableArray(leaf.decorations))
        }];
      };

      // Helper to compile the leaves for a `kind` of format.
      var compile = function compile(kind) {
        var formats = kind === 'annotations' ? annotations.values() : decorations;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = formats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var format = _step.value;
            var start = format.start,
                end = format.end;

            var next = [];
            var o = 0;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = leaves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var leaf = _step2.value;
                var length = leaf.text.length;

                var offset = o;
                o += length;

                // If the range encompases the entire leaf, add the format.
                if (start.offset <= offset && end.offset >= offset + length) {
                  leaf[kind].push(format);
                  next.push(leaf);
                  continue;
                }

                // If the range starts after the leaf, or ends before it, continue.
                if (start.offset > offset + length || end.offset < offset || end.offset === offset && offset !== 0) {
                  next.push(leaf);
                  continue;
                }

                // Otherwise we need to split the leaf, at the start, end, or both,
                // and add the format to the middle intersecting section. Do the end
                // split first since we don't need to update the offset that way.
                var middle = leaf;
                var before = void 0;
                var after = void 0;

                if (end.offset < offset + length) {
                  
                  var _split = split(middle, end.offset - offset);

                  var _split2 = slicedToArray(_split, 2);

                  middle = _split2[0];
                  after = _split2[1];
                }

                if (start.offset > offset) {
                  
                  var _split3 = split(middle, start.offset - offset);

                  var _split4 = slicedToArray(_split3, 2);

                  before = _split4[0];
                  middle = _split4[1];
                }

                middle[kind].push(format);

                if (before) {
                  next.push(before);
                }

                next.push(middle);

                if (after) {
                  next.push(after);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            leaves = next;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };

      compile('annotations');
      compile('decorations');

      leaves = leaves.map(function (leaf) {
        return new Leaf(_extends({}, leaf, {
          annotations: List(leaf.annotations),
          decorations: List(leaf.decorations)
        }));
      });

      var list = List(leaves);
      return list;
    }

    /**
     * Insert `text` at `index`.
     *
     * @param {Number} index
     * @param {String} string
     * @return {Text}
     */

  }, {
    key: 'insertText',
    value: function insertText(index, string) {
      var text = this.text;

      var next = text.slice(0, index) + string + text.slice(index);
      var node = this.set('text', next);
      return node;
    }

    /**
     * Remove a `mark`.
     *
     * @param {Mark} mark
     * @return {Text}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(mark) {
      mark = Mark.create(mark);
      var marks = this.marks;

      var next = marks.remove(mark);
      var node = this.set('marks', next);
      return node;
    }

    /**
     * Remove text from the text node at `index` for `length`.
     *
     * @param {Number} index
     * @param {Number} length
     * @return {Text}
     */

  }, {
    key: 'removeText',
    value: function removeText(index, length) {
      var text = this.text;

      var next = text.slice(0, index) + text.slice(index + length);
      var node = this.set('text', next);
      return node;
    }

    /**
     * Return a JSON representation of the text.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        text: this.text,
        marks: this.marks.toArray().map(function (m) {
          return m.toJSON();
        })
      };

      if (options.preserveKeys) {
        object.key = this.key;
      }

      return object;
    }

    /**
     * Set a `newProperties` on an existing `mark`.
     *
     * @param {Object} mark
     * @param {Object} newProperties
     * @return {Text}
     */

  }, {
    key: 'setMark',
    value: function setMark(properties, newProperties) {
      var marks = this.marks;

      var mark = Mark.create(properties);
      var newMark = mark.merge(newProperties);
      var next = marks.remove(mark).add(newMark);
      var node = this.set('marks', next);
      return node;
    }

    /**
     * Split the node into two at `index`.
     *
     * @param {Number} index
     * @returns {Array<Text>}
     */

  }, {
    key: 'splitText',
    value: function splitText(index) {
      var text = this.text;

      var one = this.set('text', text.slice(0, index));
      var two = this.set('text', text.slice(index)).regenerateKey();
      return [one, two];
    }

    /**
     * Merge the node with an `other` text node.
     *
     * @param {Text} other
     * @returns {Text}
     */

  }, {
    key: 'mergeText',
    value: function mergeText(other) {
      var next = this.text + other.text;
      var node = this.set('text', next);
      return node;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Text` with `attrs`.
     *
     * @param {Object|Array|List|String|Text} attrs
     * @return {Text}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (Text.isText(attrs)) {
        return attrs;
      }

      if (typeof attrs === 'string') {
        attrs = { text: attrs };
      }

      if (isPlainObject(attrs)) {
        return Text.fromJSON(attrs);
      }

      throw new Error('`Text.create` only accepts objects, arrays, strings or texts, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Texts` from `elements`.
     *
     * @param {Array<Text|Object>|List<Text|Object>} elements
     * @return {List<Text>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (List.isList(elements) || Array.isArray(elements)) {
        var list = new List(elements.map(Text.create));
        return list;
      }

      throw new Error('`Text.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a `Text` from a JSON `object`.
     *
     * @param {Object|Text} object
     * @return {Text}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Text.isText(object)) {
        return object;
      }

      invariant(object.leaves == null, 'As of slate@0.46, the `leaves` property of text nodes has been removed! Each individual leaf should be created as a text node instead.');

      var _object$text = object.text,
          text = _object$text === undefined ? '' : _object$text,
          _object$marks = object.marks,
          marks = _object$marks === undefined ? [] : _object$marks,
          _object$key = object.key,
          key = _object$key === undefined ? KeyUtils.create() : _object$key;

      var node = new Text({
        key: key,
        text: text,
        marks: Mark.createSet(marks)
      });

      return node;
    }

    /**
     * Check if `any` is a list of texts.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isTextList',
    value: function isTextList(any) {
      return List.isList(any) && any.every(function (item) {
        return Text.isText(item);
      });
    }
  }]);
  return Text;
}(Record(DEFAULTS$8));

/**
 * A pseudo-model that is used for its static methods only.
 *
 * @type {Node}
 */

var Node = function () {
  function Node() {
    classCallCheck(this, Node);
  }

  createClass(Node, null, [{
    key: 'create',

    /**
     * Create a new `Node` with `attrs`.
     *
     * @param {Object|Node} attrs
     * @return {Node}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Node.isNode(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        var object = attrs.object;


        if (!object && attrs.kind) {
          warning(false, 'As of slate@0.32.0, the `kind` property of Slate objects has been renamed to `object`.');

          object = attrs.kind;
        }

        switch (object) {
          case 'block':
            return Block.create(attrs);
          case 'document':
            return Document.create(attrs);
          case 'inline':
            return Inline.create(attrs);
          case 'text':
            return Text.create(attrs);

          default:
            {
              throw new Error('`Node.create` requires a `object` string.');
            }
        }
      }

      throw new Error('`Node.create` only accepts objects or nodes but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Nodes` from an array.
     *
     * @param {Array<Object|Node>} elements
     * @return {List<Node>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (List.isList(elements) || Array.isArray(elements)) {
        var array = [];

        elements.forEach(function (el) {
          if (el && el.object === 'text' && el.leaves && Array.isArray(el.leaves)) {
            warning(false, 'As of slate@0.46, the `leaves` property of Text nodes has been removed. Instead, each text node contains a string of text and a unique set of marks and leaves are unnecessary.');

            var texts = Text.createList(el.leaves).toArray();
            array = array.concat(texts);
            return;
          }

          var node = Node.create(el);
          array.push(node);
        });

        var list = List(array);
        return list;
      }

      throw new Error('`Node.createList` only accepts lists or arrays, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable node properties from `attrs`.
     *
     * @param {Object|String|Node} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Block.isBlock(attrs) || Inline.isInline(attrs)) {
        return {
          data: attrs.data,
          type: attrs.type
        };
      }

      if (typeof attrs === 'string') {
        return { type: attrs };
      }

      if (isPlainObject(attrs)) {
        var props = {};
        if ('type' in attrs) props.type = attrs.type;
        if ('data' in attrs) props.data = Data.create(attrs.data);
        return props;
      }

      throw new Error('`Node.createProperties` only accepts objects, strings, blocks or inlines, but you passed it: ' + attrs);
    }

    /**
     * Create a `Node` from a JSON `value`.
     *
     * @param {Object} value
     * @return {Node}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(value) {
      var object = value.object;


      if (!object && value.kind) {
        warning(false, 'As of slate@0.32.0, the `kind` property of Slate objects has been renamed to `object`.');

        object = value.kind;
      }

      switch (object) {
        case 'block':
          return Block.fromJSON(value);
        case 'document':
          return Document.fromJSON(value);
        case 'inline':
          return Inline.fromJSON(value);
        case 'text':
          return Text.fromJSON(value);

        default:
          {
            throw new Error('`Node.fromJSON` requires an `object` of either \'block\', \'document\', \'inline\' or \'text\', but you passed: ' + value);
          }
      }
    }

    /**
     * Check if `any` is a `Node`.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isNode',
    value: function isNode(any) {
      return Block.isBlock(any) || Document.isDocument(any) || Inline.isInline(any) || Text.isText(any);
    }

    /**
     * Check if `any` is a list of nodes.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isNodeList',
    value: function isNodeList(any) {
      return List.isList(any) && any.every(function (item) {
        return Node.isNode(item);
      });
    }
  }]);
  return Node;
}();

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$9 = {
  data: undefined,
  key: undefined,
  nodes: undefined,
  type: undefined

  /**
   * Block.
   *
   * @type {Block}
   */

};
var Block = function (_Record) {
  inherits(Block, _Record);

  function Block() {
    classCallCheck(this, Block);
    return possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).apply(this, arguments));
  }

  createClass(Block, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the block.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        type: this.type,
        data: this.data.toJSON(),
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (options.preserveKeys) {
        object.key = this.key;
      }

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Block` from `attrs`.
     *
     * @param {Object|String|Block} attrs
     * @return {Block}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Block.isBlock(attrs)) {
        return attrs;
      }

      if (typeof attrs === 'string') {
        attrs = { type: attrs };
      }

      if (isPlainObject(attrs)) {
        return Block.fromJSON(attrs);
      }

      throw new Error('`Block.create` only accepts objects, strings or blocks, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Blocks` from `attrs`.
     *
     * @param {Array<Block|Object>|List<Block|Object>} attrs
     * @return {List<Block>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (List.isList(attrs) || Array.isArray(attrs)) {
        var list = new List(attrs.map(Block.create));
        return list;
      }

      throw new Error('`Block.createList` only accepts arrays or lists, but you passed it: ' + attrs);
    }

    /**
     * Create a `Block` from a JSON `object`.
     *
     * @param {Object|Block} object
     * @return {Block}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Block.isBlock(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$key = object.key,
          key = _object$key === undefined ? KeyUtils.create() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes,
          type = object.type;


      if (typeof type !== 'string') {
        throw new Error('`Block.fromJSON` requires a `type` string.');
      }

      var block = new Block({
        key: key,
        type: type,
        data: Map(data),
        nodes: Node.createList(nodes)
      });

      return block;
    }

    /**
     * Check if `any` is a block list.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isBlockList',
    value: function isBlockList(any) {
      return List.isList(any) && any.every(function (item) {
        return Block.isBlock(item);
      });
    }
  }]);
  return Block;
}(Record(DEFAULTS$9));

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$10 = {
  annotations: undefined,
  data: undefined,
  document: undefined,
  selection: undefined

  /**
   * Value.
   *
   * @type {Value}
   */

};
var Value = function (_Record) {
  inherits(Value, _Record);

  function Value() {
    classCallCheck(this, Value);
    return possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).apply(this, arguments));
  }

  createClass(Value, [{
    key: 'addAnnotation',


    /**
     * Add an `annotation` to the value.
     *
     * @param {Annotation} annotation
     * @param {Mark} mark
     * @return {Value}
     */

    value: function addAnnotation(annotation) {
      annotation = Annotation.create(annotation);
      var value = this;
      var _value = value,
          annotations = _value.annotations,
          document = _value.document;
      var _annotation = annotation,
          key = _annotation.key;

      annotation = annotation.updatePoints(function (point) {
        return point.normalize(document);
      });
      annotations = annotations.set(key, annotation);
      value = value.set('annotations', annotations);
      return value;
    }

    /**
     * Add `mark` to text at `path`.
     *
     * @param {List|String} path
     * @param {Mark} mark
     * @return {Value}
     */

  }, {
    key: 'addMark',
    value: function addMark(path, mark) {
      mark = Mark.create(mark);
      var value = this;
      var _value2 = value,
          document = _value2.document;

      document = document.addMark(path, mark);
      value = value.set('document', document);
      return value;
    }

    /**
     * Insert a `node`.
     *
     * @param {List|String} path
     * @param {Node} node
     * @return {Value}
     */

  }, {
    key: 'insertNode',
    value: function insertNode(path, node) {
      var value = this;
      var _value3 = value,
          document = _value3.document;

      document = document.insertNode(path, node);
      value = value.set('document', document);

      value = value.mapRanges(function (range) {
        return range.updatePoints(function (point) {
          return point.setPath(null);
        });
      });

      return value;
    }

    /**
     * Insert `text` at `offset` in node by `path`.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {String} text
     * @return {Value}
     */

  }, {
    key: 'insertText',
    value: function insertText(path, offset, text) {
      var value = this;
      var _value4 = value,
          document = _value4.document;

      var node = document.assertNode(path);
      document = document.insertText(path, offset, text);
      node = document.assertNode(path);
      value = value.set('document', document);

      value = value.mapPoints(function (point) {
        if (point.key === node.key && point.offset >= offset) {
          return point.setOffset(point.offset + text.length);
        } else {
          return point;
        }
      });

      return value;
    }

    /**
     * Merge a node backwards its previous sibling.
     *
     * @param {List|Key} path
     * @return {Value}
     */

  }, {
    key: 'mergeNode',
    value: function mergeNode(path) {
      var value = this;
      var _value5 = value,
          document = _value5.document;

      var newDocument = document.mergeNode(path);
      path = document.resolvePath(path);
      var withPath = PathUtils.decrement(path);
      var one = document.getNode(withPath);
      var two = document.getNode(path);
      value = value.set('document', newDocument);

      value = value.mapRanges(function (range) {
        if (two.object === 'text') {
          var max = one.text.length;

          if (range.anchor.key === two.key) {
            range = range.moveAnchorTo(one.key, max + range.anchor.offset);
          }

          if (range.focus.key === two.key) {
            range = range.moveFocusTo(one.key, max + range.focus.offset);
          }
        }

        range = range.updatePoints(function (point) {
          return point.setPath(null);
        });

        return range;
      });

      return value;
    }

    /**
     * Move a node by `path` to `newPath`.
     *
     * A `newIndex` can be provided when move nodes by `key`, to account for not
     * being able to have a key for a location in the tree that doesn't exist yet.
     *
     * @param {List|Key} path
     * @param {List|Key} newPath
     * @param {Number} newIndex
     * @return {Value}
     */

  }, {
    key: 'moveNode',
    value: function moveNode(path, newPath) {
      var newIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var value = this;
      var _value6 = value,
          document = _value6.document;


      if (PathUtils.isEqual(path, newPath)) {
        return value;
      }

      document = document.moveNode(path, newPath, newIndex);
      value = value.set('document', document);
      value = value.mapPoints(function (point) {
        return point.setPath(null);
      });
      return value;
    }

    /**
     * Remove an `annotation` from the value.
     *
     * @param {Annotation} annotation
     * @param {Mark} mark
     * @return {Value}
     */

  }, {
    key: 'removeAnnotation',
    value: function removeAnnotation(annotation) {
      annotation = Annotation.create(annotation);
      var value = this;
      var _value7 = value,
          annotations = _value7.annotations;
      var _annotation2 = annotation,
          key = _annotation2.key;

      annotations = annotations.delete(key);
      value = value.set('annotations', annotations);
      return value;
    }

    /**
     * Remove `mark` at `path`.
     *
     * @param {List|String} path
     * @param {Mark} mark
     * @return {Value}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(path, mark) {
      mark = Mark.create(mark);
      var value = this;
      var _value8 = value,
          document = _value8.document;

      document = document.removeMark(path, mark);
      value = value.set('document', document);
      return value;
    }

    /**
     * Remove a node by `path`.
     *
     * @param {List|String} path
     * @return {Value}
     */

  }, {
    key: 'removeNode',
    value: function removeNode(path) {
      var value = this;
      var _value9 = value,
          document = _value9.document;

      var node = document.assertNode(path);
      var first = node.object === 'text' ? node : node.getFirstText() || node;
      var last = node.object === 'text' ? node : node.getLastText() || node;
      var prev = document.getPreviousText(first.key);
      var next = document.getNextText(last.key);

      document = document.removeNode(path);
      value = value.set('document', document);

      value = value.mapRanges(function (range) {
        var _range = range,
            anchor = _range.anchor,
            focus = _range.focus;


        if (node.hasNode(anchor.key)) {
          range = prev ? range.moveAnchorTo(prev.key, prev.text.length) : next ? range.moveAnchorTo(next.key, 0) : range.unset();
        }

        if (node.hasNode(focus.key)) {
          range = prev ? range.moveFocusTo(prev.key, prev.text.length) : next ? range.moveFocusTo(next.key, 0) : range.unset();
        }

        range = range.updatePoints(function (point) {
          return point.setPath(null);
        });

        return range;
      });

      return value;
    }

    /**
     * Remove `text` at `offset` in node by `path`.
     *
     * @param {List|Key} path
     * @param {Number} offset
     * @param {String} text
     * @return {Value}
     */

  }, {
    key: 'removeText',
    value: function removeText(path, offset, text) {
      var value = this;
      var _value10 = value,
          document = _value10.document;

      var node = document.assertNode(path);
      document = document.removeText(path, offset, text);
      value = value.set('document', document);

      var length = text.length;

      var start = offset;
      var end = offset + length;

      value = value.mapPoints(function (point) {
        if (point.key !== node.key) {
          return point;
        }

        if (point.offset >= end) {
          return point.setOffset(point.offset - length);
        }

        if (point.offset > start) {
          return point.setOffset(start);
        }

        return point;
      });

      return value;
    }

    /**
     * Add an `annotation` to the value.
     *
     * @param {Annotation} annotation
     * @param {Mark} mark
     * @return {Value}
     */

  }, {
    key: 'setAnnotation',
    value: function setAnnotation(properties, newProperties) {
      newProperties = Annotation.createProperties(newProperties);
      var annotation = Annotation.create(properties);
      var next = annotation.merge(newProperties);
      var value = this;
      var _value11 = value,
          annotations = _value11.annotations;
      var key = annotation.key;

      annotations = annotations.set(key, next);
      value = value.set('annotations', annotations);
      return value;
    }

    /**
     * Set `properties` on a node.
     *
     * @param {List|String} path
     * @param {Object} properties
     * @return {Value}
     */

  }, {
    key: 'setNode',
    value: function setNode(path, properties) {
      var value = this;
      var _value12 = value,
          document = _value12.document;

      document = document.setNode(path, properties);
      value = value.set('document', document);
      return value;
    }

    /**
     * Set `properties` on `mark` on text at `offset` and `length` in node.
     *
     * @param {List|String} path
     * @param {Mark} mark
     * @param {Object} properties
     * @return {Value}
     */

  }, {
    key: 'setMark',
    value: function setMark(path, mark, properties) {
      var value = this;
      var _value13 = value,
          document = _value13.document;

      document = document.setMark(path, mark, properties);
      value = value.set('document', document);
      return value;
    }

    /**
     * Set `properties` on the value.
     *
     * @param {Object} properties
     * @return {Value}
     */

  }, {
    key: 'setProperties',
    value: function setProperties(properties) {
      var value = this;
      var _value14 = value,
          document = _value14.document;
      var data = properties.data,
          annotations = properties.annotations;

      var props = {};

      if (data) {
        props.data = data;
      }

      if (annotations) {
        props.annotations = annotations.map(function (a) {
          return a.isSet ? a : document.resolveAnnotation(a);
        });
      }

      value = value.merge(props);
      return value;
    }

    /**
     * Set `properties` on the selection.
     *
     * @param {Value} value
     * @param {Operation} operation
     * @return {Value}
     */

  }, {
    key: 'setSelection',
    value: function setSelection(properties) {
      var value = this;
      var _value15 = value,
          document = _value15.document,
          selection = _value15.selection;

      var next = selection.setProperties(properties);
      selection = document.resolveSelection(next);
      value = value.set('selection', selection);
      return value;
    }

    /**
     * Split a node by `path` at `position` with optional `properties` to apply
     * to the newly split node.
     *
     * @param {List|String} path
     * @param {Number} position
     * @param {Object} properties
     * @return {Value}
     */

  }, {
    key: 'splitNode',
    value: function splitNode(path, position, properties) {
      var value = this;
      var _value16 = value,
          document = _value16.document;

      var newDocument = document.splitNode(path, position, properties);
      var node = document.assertNode(path);
      value = value.set('document', newDocument);

      value = value.mapRanges(function (range) {
        var next = newDocument.getNextText(node.key);
        var _range2 = range,
            anchor = _range2.anchor,
            focus = _range2.focus;

        // If the anchor was after the split, move it to the next node.

        if (node.key === anchor.key && position <= anchor.offset) {
          range = range.moveAnchorTo(next.key, anchor.offset - position);
        }

        // If the focus was after the split, move it to the next node.
        if (node.key === focus.key && position <= focus.offset) {
          range = range.moveFocusTo(next.key, focus.offset - position);
        }

        range = range.updatePoints(function (point) {
          return point.setPath(null);
        });

        return range;
      });

      return value;
    }

    /**
     * Map all range objects to apply adjustments with an `iterator`.
     *
     * @param {Function} iterator
     * @return {Value}
     */

  }, {
    key: 'mapRanges',
    value: function mapRanges(iterator) {
      var value = this;
      var _value17 = value,
          document = _value17.document,
          selection = _value17.selection,
          annotations = _value17.annotations;


      var sel = selection.isSet ? iterator(selection) : selection;
      if (!sel) sel = selection.unset();
      if (sel !== selection) sel = document.createSelection(sel);
      value = value.set('selection', sel);

      var anns = annotations.map(function (annotation) {
        var n = annotation.isSet ? iterator(annotation) : annotation;
        if (n && n !== annotation) n = document.createAnnotation(n);
        return n;
      });

      anns = anns.filter(function (annotation) {
        return !!annotation;
      });
      value = value.set('annotations', anns);
      return value;
    }
  }, {
    key: 'mapPoints',
    value: function mapPoints(iterator) {
      return this.mapRanges(function (range) {
        return range.updatePoints(iterator);
      });
    }

    /**
     * Return a JSON representation of the value.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        document: this.document.toJSON(options)
      };

      if (options.preserveData) {
        object.data = this.data.toJSON(options);
      }

      if (options.preserveAnnotations) {
        object.annotations = this.annotations.map(function (a) {
          return a.toJSON(options);
        }).toObject();
      }

      if (options.preserveSelection) {
        object.selection = this.selection.toJSON(options);
      }

      return object;
    }

    /**
     * Deprecated.
     */

  }, {
    key: 'change',
    value: function change() {
      invariant(false, 'As of Slate 0.42.0, value object are no longer schema-aware, and the `value.change()` method is no longer available. Use the `editor.change()` method on the new `Editor` controller instead.');
    }
  }, {
    key: 'startBlock',


    /**
     * Get the current start text node's closest block parent.
     *
     * @return {Block}
     */

    get: function get$$1() {
      return this.selection.start.key && this.document.getClosestBlock(this.selection.start.key);
    }

    /**
     * Get the current end text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'endBlock',
    get: function get$$1() {
      return this.selection.end.key && this.document.getClosestBlock(this.selection.end.key);
    }

    /**
     * Get the current anchor text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'anchorBlock',
    get: function get$$1() {
      return this.selection.anchor.key && this.document.getClosestBlock(this.selection.anchor.key);
    }

    /**
     * Get the current focus text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'focusBlock',
    get: function get$$1() {
      return this.selection.focus.key && this.document.getClosestBlock(this.selection.focus.key);
    }

    /**
     * Get the current start text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'startInline',
    get: function get$$1() {
      return this.selection.start.key && this.document.getClosestInline(this.selection.start.key);
    }

    /**
     * Get the current end text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'endInline',
    get: function get$$1() {
      return this.selection.end.key && this.document.getClosestInline(this.selection.end.key);
    }

    /**
     * Get the current anchor text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'anchorInline',
    get: function get$$1() {
      return this.selection.anchor.key && this.document.getClosestInline(this.selection.anchor.key);
    }

    /**
     * Get the current focus text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'focusInline',
    get: function get$$1() {
      return this.selection.focus.key && this.document.getClosestInline(this.selection.focus.key);
    }

    /**
     * Get the current start text node.
     *
     * @return {Text}
     */

  }, {
    key: 'startText',
    get: function get$$1() {
      return this.selection.start.key && this.document.getDescendant(this.selection.start.key);
    }

    /**
     * Get the current end node.
     *
     * @return {Text}
     */

  }, {
    key: 'endText',
    get: function get$$1() {
      return this.selection.end.key && this.document.getDescendant(this.selection.end.key);
    }

    /**
     * Get the current anchor node.
     *
     * @return {Text}
     */

  }, {
    key: 'anchorText',
    get: function get$$1() {
      return this.selection.anchor.key && this.document.getDescendant(this.selection.anchor.key);
    }

    /**
     * Get the current focus node.
     *
     * @return {Text}
     */

  }, {
    key: 'focusText',
    get: function get$$1() {
      return this.selection.focus.key && this.document.getDescendant(this.selection.focus.key);
    }

    /**
     * Get the next block node.
     *
     * @return {Block}
     */

  }, {
    key: 'nextBlock',
    get: function get$$1() {
      return this.selection.end.key && this.document.getNextBlock(this.selection.end.key);
    }

    /**
     * Get the previous block node.
     *
     * @return {Block}
     */

  }, {
    key: 'previousBlock',
    get: function get$$1() {
      return this.selection.start.key && this.document.getPreviousBlock(this.selection.start.key);
    }

    /**
     * Get the next inline node.
     *
     * @return {Inline}
     */

  }, {
    key: 'nextInline',
    get: function get$$1() {
      return this.selection.end.key && this.document.getNextInline(this.selection.end.key);
    }

    /**
     * Get the previous inline node.
     *
     * @return {Inline}
     */

  }, {
    key: 'previousInline',
    get: function get$$1() {
      return this.selection.start.key && this.document.getPreviousInline(this.selection.start.key);
    }

    /**
     * Get the next text node.
     *
     * @return {Text}
     */

  }, {
    key: 'nextText',
    get: function get$$1() {
      return this.selection.end.key && this.document.getNextText(this.selection.end.key);
    }

    /**
     * Get the previous text node.
     *
     * @return {Text}
     */

  }, {
    key: 'previousText',
    get: function get$$1() {
      return this.selection.start.key && this.document.getPreviousText(this.selection.start.key);
    }

    /**
     * Get the marks of the current selection.
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'marks',
    get: function get$$1() {
      return this.selection.isUnset ? new Set() : this.selection.marks || this.document.getMarksAtRange(this.selection);
    }

    /**
     * Get the active marks of the current selection.
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'activeMarks',
    get: function get$$1() {
      return this.selection.isUnset ? new Set() : this.selection.marks || this.document.getActiveMarksAtRange(this.selection);
    }

    /**
     * Get the block nodes in the current selection.
     *
     * @return {List<Block>}
     */

  }, {
    key: 'blocks',
    get: function get$$1() {
      return this.selection.isUnset ? new List() : this.document.getLeafBlocksAtRange(this.selection);
    }

    /**
     * Get the fragment of the current selection.
     *
     * @return {Document}
     */

  }, {
    key: 'fragment',
    get: function get$$1() {
      return this.selection.isUnset ? Document.create() : this.document.getFragmentAtRange(this.selection);
    }

    /**
     * Get the bottom-most inline nodes in the current selection.
     *
     * @return {List<Inline>}
     */

  }, {
    key: 'inlines',
    get: function get$$1() {
      return this.selection.isUnset ? new List() : this.document.getLeafInlinesAtRange(this.selection);
    }

    /**
     * Get the text nodes in the current selection.
     *
     * @return {List<Text>}
     */

  }, {
    key: 'texts',
    get: function get$$1() {
      return this.selection.isUnset ? new List() : this.document.getTextsAtRange(this.selection);
    }
  }, {
    key: 'history',
    get: function get$$1() {
      invariant(false, 'As of Slate 0.42.0, the `value.history` model no longer exists, and the history is stored in `value.data` instead using plugins.');
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Value` with `attrs`.
     *
     * @param {Object|Value} attrs
     * @param {Object} options
     * @return {Value}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (Value.isValue(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Value.fromJSON(attrs, options);
      }

      throw new Error('`Value.create` only accepts objects or values, but you passed it: ' + attrs);
    }

    /**
     * Create a dictionary of settable value properties from `attrs`.
     *
     * @param {Object|Value} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Value.isValue(a)) {
        return {
          annotations: a.annotations,
          data: a.data
        };
      }

      if (isPlainObject(a)) {
        var p = {};
        if ('annotations' in a) p.annotations = Annotation.createMap(a.annotations);
        if ('data' in a) p.data = Data.create(a.data);
        return p;
      }

      throw new Error('`Value.createProperties` only accepts objects or values, but you passed it: ' + a);
    }

    /**
     * Create a `Value` from a JSON `object`.
     *
     * @param {Object} object
     * @param {Object} options
     *   @property {Boolean} normalize
     *   @property {Array} plugins
     * @return {Value}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$annotations = object.annotations,
          annotations = _object$annotations === undefined ? {} : _object$annotations,
          _object$document = object.document,
          document = _object$document === undefined ? {} : _object$document,
          _object$selection = object.selection,
          selection = _object$selection === undefined ? {} : _object$selection;

      data = Data.fromJSON(data);
      document = Document.fromJSON(document);
      selection = document.createSelection(selection);
      annotations = Annotation.createMap(annotations);

      if (selection.isUnset) {
        var text = document.getFirstText();
        if (text) selection = selection.moveToStartOfNode(text);
        selection = document.createSelection(selection);
      }

      var value = new Value({
        annotations: annotations,
        data: data,
        document: document,
        selection: selection
      });

      return value;
    }
  }]);
  return Value;
}(Record(DEFAULTS$10));

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = Debug('slate:operation:apply');

/**
 * Apply an `op` to a `value`.
 *
 * @param {Value} value
 * @param {Object|Operation} op
 * @return {Value} value
 */

function applyOperation(value, op) {
  op = Operation.create(op);
  var _op = op,
      type = _op.type;

  debug(type, op);

  switch (type) {
    case 'add_annotation':
      {
        var _op2 = op,
            annotation = _op2.annotation;

        var next = value.addAnnotation(annotation);
        return next;
      }

    case 'add_mark':
      {
        var _op3 = op,
            path = _op3.path,
            mark = _op3.mark;

        var _next = value.addMark(path, mark);
        return _next;
      }

    case 'insert_node':
      {
        var _op4 = op,
            _path = _op4.path,
            node = _op4.node;

        var _next2 = value.insertNode(_path, node);
        return _next2;
      }

    case 'insert_text':
      {
        var _op5 = op,
            _path2 = _op5.path,
            offset = _op5.offset,
            text = _op5.text,
            marks = _op5.marks;

        var _next3 = value.insertText(_path2, offset, text, marks);
        return _next3;
      }

    case 'merge_node':
      {
        var _op6 = op,
            _path3 = _op6.path;

        var _next4 = value.mergeNode(_path3);
        return _next4;
      }

    case 'move_node':
      {
        var _op7 = op,
            _path4 = _op7.path,
            newPath = _op7.newPath;

        var _next5 = value.moveNode(_path4, newPath);
        return _next5;
      }

    case 'remove_annotation':
      {
        var _op8 = op,
            _annotation = _op8.annotation;

        var _next6 = value.removeAnnotation(_annotation);
        return _next6;
      }

    case 'remove_mark':
      {
        var _op9 = op,
            _path5 = _op9.path,
            _mark = _op9.mark;

        var _next7 = value.removeMark(_path5, _mark);
        return _next7;
      }

    case 'remove_node':
      {
        var _op10 = op,
            _path6 = _op10.path;

        var _next8 = value.removeNode(_path6);
        return _next8;
      }

    case 'remove_text':
      {
        var _op11 = op,
            _path7 = _op11.path,
            _offset = _op11.offset,
            _text = _op11.text;

        var _next9 = value.removeText(_path7, _offset, _text);
        return _next9;
      }

    case 'set_annotation':
      {
        var _op12 = op,
            properties = _op12.properties,
            newProperties = _op12.newProperties;

        var _next10 = value.setAnnotation(properties, newProperties);
        return _next10;
      }

    case 'set_mark':
      {
        var _op13 = op,
            _path8 = _op13.path,
            _properties = _op13.properties,
            _newProperties = _op13.newProperties;

        var _next11 = value.setMark(_path8, _properties, _newProperties);
        return _next11;
      }

    case 'set_node':
      {
        var _op14 = op,
            _path9 = _op14.path,
            _newProperties2 = _op14.newProperties;

        var _next12 = value.setNode(_path9, _newProperties2);
        return _next12;
      }

    case 'set_selection':
      {
        var _op15 = op,
            _newProperties3 = _op15.newProperties;

        var _next13 = value.setSelection(_newProperties3);
        return _next13;
      }

    case 'set_value':
      {
        var _op16 = op,
            _newProperties4 = _op16.newProperties;

        var _next14 = value.setProperties(_newProperties4);
        return _next14;
      }

    case 'split_node':
      {
        var _op17 = op,
            _path10 = _op17.path,
            position = _op17.position,
            _properties2 = _op17.properties;

        var _next15 = value.splitNode(_path10, position, _properties2);
        return _next15;
      }

    default:
      {
        throw new Error('Unknown operation type: "' + type + '".');
      }
  }
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$1 = Debug('slate:operation:invert');

/**
 * Invert an `op`.
 *
 * @param {Object} op
 * @return {Object}
 */

function invertOperation(op) {
  op = Operation.create(op);
  var _op = op,
      type = _op.type;

  debug$1(type, op);

  switch (type) {
    case 'move_node':
      {
        var _op2 = op,
            newPath = _op2.newPath,
            path = _op2.path;

        // PERF: this case can exit early.

        if (PathUtils.isEqual(newPath, path)) {
          return op;
        }

        var inversePath = PathUtils.transform(path, op).first();

        // Get the true path we are trying to move back to
        // We transform the right-sibling of the path
        // This will end up at the operation.path most of the time
        // But if the newPath is a left-sibling or left-ancestor-sibling, this will account for it
        var inverseNewPath = PathUtils.transform(PathUtils.increment(path), op).first();

        var inverse = op.set('path', inversePath).set('newPath', inverseNewPath);
        return inverse;
      }

    case 'merge_node':
      {
        var _op3 = op,
            _path = _op3.path;

        var _inversePath = PathUtils.decrement(_path);
        var _inverse = op.set('type', 'split_node').set('path', _inversePath);
        return _inverse;
      }

    case 'split_node':
      {
        var _op4 = op,
            _path2 = _op4.path;

        var _inversePath2 = PathUtils.increment(_path2);
        var _inverse2 = op.set('type', 'merge_node').set('path', _inversePath2);
        return _inverse2;
      }

    case 'set_annotation':
    case 'set_node':
    case 'set_value':
    case 'set_selection':
    case 'set_mark':
      {
        var _op5 = op,
            properties = _op5.properties,
            newProperties = _op5.newProperties;

        var _inverse3 = op.set('properties', newProperties).set('newProperties', properties);
        return _inverse3;
      }

    case 'insert_node':
    case 'insert_text':
      {
        var _inverse4 = op.set('type', type.replace('insert_', 'remove_'));
        return _inverse4;
      }

    case 'remove_node':
    case 'remove_text':
      {
        var _inverse5 = op.set('type', type.replace('remove_', 'insert_'));
        return _inverse5;
      }

    case 'add_annotation':
    case 'add_mark':
      {
        var _inverse6 = op.set('type', type.replace('add_', 'remove_'));
        return _inverse6;
      }

    case 'remove_annotation':
    case 'remove_mark':
      {
        var _inverse7 = op.set('type', type.replace('remove_', 'add_'));
        return _inverse7;
      }

    default:
      {
        throw new Error('Unknown operation type: "' + type + '".');
      }
  }
}

/**
 * Operation attributes.
 *
 * @type {Array}
 */

var OPERATION_ATTRIBUTES = {
  add_mark: ['path', 'mark', 'data'],
  add_annotation: ['annotation', 'data'],
  insert_node: ['path', 'node', 'data'],
  insert_text: ['path', 'offset', 'text', 'data'],
  merge_node: ['path', 'position', 'properties', 'target', 'data'],
  move_node: ['path', 'newPath', 'data'],
  remove_annotation: ['annotation', 'data'],
  remove_mark: ['path', 'mark', 'data'],
  remove_node: ['path', 'node', 'data'],
  remove_text: ['path', 'offset', 'text', 'data'],
  set_annotation: ['properties', 'newProperties', 'data'],
  set_mark: ['path', 'properties', 'newProperties', 'data'],
  set_node: ['path', 'properties', 'newProperties', 'data'],
  set_selection: ['properties', 'newProperties', 'data'],
  set_value: ['properties', 'newProperties', 'data'],
  split_node: ['path', 'position', 'properties', 'target', 'data']

  /**
   * Default properties.
   *
   * @type {Object}
   */

};var DEFAULTS$11 = {
  annotation: undefined,
  data: undefined,
  length: undefined,
  mark: undefined,
  marks: undefined,
  newPath: undefined,
  newProperties: undefined,
  node: undefined,
  offset: undefined,
  path: undefined,
  position: undefined,
  properties: undefined,
  target: undefined,
  text: undefined,
  type: undefined

  /**
   * Operation.
   *
   * @type {Operation}
   */

};
var Operation = function (_Record) {
  inherits(Operation, _Record);

  function Operation() {
    classCallCheck(this, Operation);
    return possibleConstructorReturn(this, (Operation.__proto__ || Object.getPrototypeOf(Operation)).apply(this, arguments));
  }

  createClass(Operation, [{
    key: 'apply',


    /**
     * Apply the operation to a `value`.
     *
     * @param {Value} value
     * @return {Value}
     */

    value: function apply(value) {
      var next = applyOperation(value, this);
      return next;
    }

    /**
     * Invert the operation.
     *
     * @return {Operation}
     */

  }, {
    key: 'invert',
    value: function invert() {
      var inverted = invertOperation(this);
      return inverted;
    }

    /**
     * Return a JSON representation of the operation.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = this.object,
          type = this.type;

      var json = { object: object, type: type };
      var ATTRIBUTES = OPERATION_ATTRIBUTES[type];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ATTRIBUTES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var value = this[key];

          if (key === 'annotation' || key === 'mark' || key === 'marks' || key === 'node' || key === 'path' || key === 'newPath') {
            value = value.toJSON();
          }

          if (key === 'properties' && type === 'merge_node') {
            var v = {};
            if ('data' in value) v.data = value.data.toJS();
            if ('type' in value) v.type = value.type;
            value = v;
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_annotation') {
            var _v = {};
            if ('anchor' in value) _v.anchor = value.anchor.toJS();
            if ('focus' in value) _v.focus = value.focus.toJS();
            if ('key' in value) _v.key = value.key;
            if ('data' in value) _v.data = value.data.toJS();
            if ('type' in value) _v.type = value.type;
            value = _v;
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_mark') {
            var _v2 = {};
            if ('data' in value) _v2.data = value.data.toJS();
            if ('type' in value) _v2.type = value.type;
            value = _v2;
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_node') {
            var _v3 = {};
            if ('data' in value) _v3.data = value.data.toJS();
            if ('type' in value) _v3.type = value.type;
            value = _v3;
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_selection') {
            var _v4 = {};
            if ('anchor' in value) _v4.anchor = value.anchor.toJSON();
            if ('focus' in value) _v4.focus = value.focus.toJSON();
            if ('isFocused' in value) _v4.isFocused = value.isFocused;
            if ('marks' in value) _v4.marks = value.marks && value.marks.toJSON();
            value = _v4;
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_value') {
            var _v5 = {};
            if ('data' in value) _v5.data = value.data.toJS();
            value = _v5;
          }

          if (key === 'properties' && type === 'split_node') {
            var _v6 = {};
            if ('data' in value) _v6.data = value.data.toJS();
            if ('type' in value) _v6.type = value.type;
            value = _v6;
          }

          if (key === 'data') {
            value = value.toJSON();
          }

          json[key] = value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return json;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Operation` with `attrs`.
     *
     * @param {Object|Array|List|String|Operation} attrs
     * @return {Operation}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Operation.isOperation(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Operation.fromJSON(attrs);
      }

      throw new Error('`Operation.create` only accepts objects or operations, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Operations` from `elements`.
     *
     * @param {Array<Operation|Object>|List<Operation|Object>} elements
     * @return {List<Operation>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (List.isList(elements) || Array.isArray(elements)) {
        var list = new List(elements.map(Operation.create));
        return list;
      }

      throw new Error('`Operation.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a `Operation` from a JSON `object`.
     *
     * @param {Object|Operation} object
     * @return {Operation}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Operation.isOperation(object)) {
        return object;
      }

      var type = object.type;

      var ATTRIBUTES = OPERATION_ATTRIBUTES[type];
      var attrs = { type: type };

      if (!ATTRIBUTES) {
        throw new Error('`Operation.fromJSON` was passed an unrecognized operation type: "' + type + '"');
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = ATTRIBUTES[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          var v = object[key];

          // Default `data` to an empty object.
          if (key === 'data' && v === undefined) {
            v = {};
          }

          if (v === undefined) {
            throw new Error('`Operation.fromJSON` was passed a "' + type + '" operation without the required "' + key + '" attribute.');
          }

          if (key === 'annotation') {
            v = Annotation.create(v);
          }

          if (key === 'path' || key === 'newPath') {
            v = PathUtils.create(v);
          }

          if (key === 'mark') {
            v = Mark.create(v);
          }

          if (key === 'node') {
            v = Node.create(v);
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_annotation') {
            v = Annotation.createProperties(v);
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_mark') {
            v = Mark.createProperties(v);
          }

          if ((key === 'properties' || key === 'newProperties') && (type === 'set_node' || type === 'merge_node' || type === 'split_node')) {
            v = Node.createProperties(v);
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_selection') {
            v = Selection.createProperties(v);
          }

          if ((key === 'properties' || key === 'newProperties') && type === 'set_value') {
            v = Value.createProperties(v);
          }

          if (key === 'data') {
            v = Map(v);
          }

          attrs[key] = v;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var op = new Operation(attrs);
      return op;
    }

    /**
     * Check if `any` is a list of operations.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isOperationList',
    value: function isOperationList(any) {
      return List.isList(any) && any.every(function (item) {
        return Operation.isOperation(item);
      });
    }
  }]);
  return Operation;
}(Record(DEFAULTS$11));

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$12 = {
  operations: undefined,
  value: undefined

  /**
   * Change.
   *
   * @type {Change}
   */

};
var Change = function (_Record) {
  inherits(Change, _Record);

  function Change() {
    classCallCheck(this, Change);
    return possibleConstructorReturn(this, (Change.__proto__ || Object.getPrototypeOf(Change)).apply(this, arguments));
  }

  createClass(Change, [{
    key: 'toJSON',


    /**
     * Return a JSON representation of the change.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        value: this.value.toJSON(options),
        operations: this.operations.toArray().map(function (o) {
          return o.toJSON(options);
        })
      };

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Change` with `attrs`.
     *
     * @param {Object|Change} attrs
     * @return {Change}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Change.isChange(attrs)) {
        return attrs;
      }

      if (isPlainObject(attrs)) {
        return Change.fromJSON(attrs);
      }

      throw new Error('`Change.create` only accepts objects or changes, but you passed it: ' + attrs);
    }

    /**
     * Create a `Change` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Change}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var value = object.value,
          _object$operations = object.operations,
          operations = _object$operations === undefined ? [] : _object$operations;


      var change = new Change({
        value: Value.create(value),
        operations: Operation.createList(operations)
      });

      return change;
    }
  }]);
  return Change;
}(Record(DEFAULTS$12));

/**
 * A plugin that adds a set of commands to the editor.
 *
 * @param {Object} commands
 * @return {Object}
 */

function CommandsPlugin() {
  var commands = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  /**
   * On command, if it exists in our list of commands, call it.
   *
   * @param {Object} command
   * @param {Editor} editor
   * @param {Function} next
   */

  function onCommand(command, editor, next) {
    var type = command.type,
        args = command.args;

    var fn = commands[type];
    if (!fn) return next();
    editor.command.apply(editor, [fn].concat(toConsumableArray(args)));
  }

  /**
   * On construct, register all the commands.
   *
   * @param {Editor} editor
   * @param {Function} next
   */

  function onConstruct(editor, next) {
    for (var command in commands) {
      editor.registerCommand(command);
    }

    return next();
  }

  /**
   * Return the plugin.
   *
   * @type {Object}
   */

  return {
    onCommand: onCommand,
    onConstruct: onConstruct
  };
}

/**
 * Surrogate pair start and end points.
 *
 * @type {Number}
 */

var SURROGATE_START = 0xd800;
var SURROGATE_END = 0xdfff;

/**
 * A regex to match space characters.
 *
 * @type {RegExp}
 */

var SPACE = /\s/;

/**
 * A regex to match chameleon characters, that count as word characters as long
 * as they are inside of a word.
 *
 * @type {RegExp}
 */

var CHAMELEON = /['\u2018\u2019]/;

/**
 * A regex that matches punctuation.
 *
 * @type {RegExp}
 */

var PUNCTUATION = /[\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

/**
 * Is a character `code` in a surrogate character.
 *
 * @param {Number} code
 * @return {Boolean}
 */

function isSurrogate(code) {
  return SURROGATE_START <= code && code <= SURROGATE_END;
}

/**
 * Does `code` form Modifier with next one.
 *
 * https://emojipedia.org/modifiers/
 *
 * @param {Number} code
 * @param {String} text
 * @param {Number} offset
 * @return {Boolean}
 */

function isModifier(code, text, offset) {
  if (code === 0xd83c) {
    var next = text.charCodeAt(offset + 1);
    return next <= 0xdfff && next >= 0xdffb;
  }
  return false;
}

/**
 * Is `code` a Variation Selector.
 *
 * https://codepoints.net/variation_selectors
 *
 * @param {Number} code
 * @return {Boolean}
 */

function isVariationSelector(code) {
  return code <= 0xfe0f && code >= 0xfe00;
}

/**
 * Is `code` one of the BMP codes used in emoji sequences.
 *
 * https://emojipedia.org/emoji-zwj-sequences/
 *
 * @param {Number} code
 * @return {Boolean}
 */

function isBMPEmoji(code) {
  // This requires tiny bit of maintanance, better ideas?
  // Fortunately it only happens if new Unicode Standard
  // is released. Fails gracefully if upkeep lags behind,
  // same way Slate previously behaved with all emojis.
  return code === 0x2764 || // heart (❤)
  code === 0x2642 || // male (♂)
  code === 0x2640 || // female (♀)
  code === 0x2620 || // scull (☠)
  code === 0x2695 || // medical (⚕)
  code === 0x2708 || // plane (✈️)
  code === 0x25ef // large circle (◯)
  ;
}

/**
 * Is a character a word character? Needs the `remaining` characters too.
 *
 * @param {String} char
 * @param {String|Void} remaining
 * @return {Boolean}
 */

function isWord(char, remaining) {
  if (SPACE.test(char)) return false;

  // If it's a chameleon character, recurse to see if the next one is or not.
  if (CHAMELEON.test(char)) {
    var next = remaining.charAt(0);
    var length = getCharLength(next);
    next = remaining.slice(0, length);
    var rest = remaining.slice(length);
    if (isWord(next, rest)) return true;
  }

  if (PUNCTUATION.test(char)) return false;
  return true;
}

/**
 * Get the length of a `character`.
 *
 * @param {String} char
 * @return {Number}
 */

function getCharLength(char) {
  return isSurrogate(char.charCodeAt(0)) ? 2 : 1;
}

/**
 * Get the offset to the end of the character(s) in `text`.
 * This function is emoji aware and handles them correctly.
 *
 * @param {String} text
 * @param {Number} chars
 * @param {Boolean} forward
 * @return {Number}
 */

function getCharOffset(text, chars, forward) {
  var offset = 0;

  // Handle end/beginning of node: we have to return 1 in order not to
  // break cursor's jumping to next/previous node. We need to return early
  // because otherwise, ''.charCodeAt(0) returned NaN and, the default
  // handling 'latin characters' at the end of the while loop would
  // would never be reached an we returned '0' as offset.
  if (text === '') return 1;

  // Calculate offset sum of each character
  for (var i = 0; i < chars; i++) {
    // `prev` types (better ideas?):
    // - SURR: surrogate pair
    // - MOD: modifier (technically also surrogate pair)
    // - ZWJ: zero width joiner
    // - VAR: variation selector
    // - BMP: sequenceable character from Basic Multilingual Plane
    var prev = null;
    var charCode = text.charCodeAt(offset);

    while (charCode) {
      if (isSurrogate(charCode)) {
        var modifier = isModifier(charCode, text, offset);

        // Early returns are the heart of this loop where
        // we decide if previous and current codepoints
        // should form a single character (in other words:
        // how many of them should selection jump over).
        if (forward) {
          if (!modifier && prev && prev !== 'ZWJ' || modifier && prev && prev !== 'SURR') {
            break;
          }
        } else if (prev === 'SURR' || prev === 'BMP') {
          break;
        }

        offset += 2;
        prev = modifier ? 'MOD' : 'SURR';
        charCode = text.charCodeAt(offset);
        // It's okay to `continue` without checking
        // because if `charCode` is NaN (which is
        // the case when out of `text` range), next
        // `while` loop won't execute and we're done.
        continue;
      }

      // If zero width joiner
      if (charCode === 0x200d) {
        offset += 1;
        prev = 'ZWJ';
        charCode = text.charCodeAt(offset);
        continue;
      }

      if (isBMPEmoji(charCode)) {
        if (forward && prev === 'VAR' || prev && prev !== 'ZWJ' && prev !== 'VAR') {
          break;
        }

        offset += 1;
        prev = 'BMP';
        charCode = text.charCodeAt(offset);
        continue;
      }

      if (isVariationSelector(charCode)) {
        if (!forward && prev && prev !== 'ZWJ') {
          break;
        }

        offset += 1;
        prev = 'VAR';
        charCode = text.charCodeAt(offset);
        continue;
      }

      // Modifier "fuses" with what ever character is before that
      // (even whitespace), need to look ahead if loop gets here.
      if (forward) {
        var nextCharCode = text.charCodeAt(offset + 1);

        if (isModifier(nextCharCode, text, offset + 1)) {
          offset += 3;
          prev = 'MOD';
          charCode = text.charCodeAt(offset);
          continue;
        }
      } else if (prev === 'MOD') {
        offset += 1;
        break;
      }

      // If while loop ever gets here, we're
      // done (e.g Latin characters, length 1).
      if (prev === null) offset += 1;
      break;
    }
  }

  return offset;
}

/**
 * Get the offset to the end of character(s) before an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @param {Number} chars
 * @return {Number}
 */

function getCharOffsetBackward(text, offset) {
  var chars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  text = text.slice(0, offset);
  text = reverse(text);
  return getCharOffset(text, chars);
}

/**
 * Get the offset to the end of character(s) after an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @param {Number} chars
 * @return {Number}
 */

function getCharOffsetForward(text, offset) {
  var chars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  text = text.slice(offset);
  return getCharOffset(text, chars, true);
}

/**
 * Get the offset to the end of the first word in `text`.
 *
 * @param {String} text
 * @return {Number}
 */

function getWordOffset(text) {
  var length = 0;
  var i = 0;
  var started = false;
  var char = void 0;

  while (char = text.charAt(i)) {
    var l = getCharLength(char);
    char = text.slice(i, i + l);
    var rest = text.slice(i + l);

    if (isWord(char, rest)) {
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
}

/**
 * Get the offset to the end of the word before an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getWordOffsetBackward(text, offset) {
  text = text.slice(0, offset);
  text = reverse(text);
  var o = getWordOffset(text);
  return o;
}

/**
 * Get the offset to the end of the word after an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getWordOffsetForward(text, offset) {
  text = text.slice(offset);
  var o = getWordOffset(text);
  return o;
}

/**
 * Export.
 *
 * @type {Object}
 */

var TextUtils = {
  getCharLength: getCharLength,
  getCharOffset: getCharOffset,
  getCharOffsetBackward: getCharOffsetBackward,
  getCharOffsetForward: getCharOffsetForward,
  getWordOffset: getWordOffset,
  getWordOffsetBackward: getWordOffsetBackward,
  getWordOffsetForward: getWordOffsetForward,
  isSurrogate: isSurrogate,
  isWord: isWord
};

/**
 * Ensure that an expanded selection is deleted first, and return the updated
 * range to account for the deleted part.
 *
 * @param {Editor}
 */

function deleteExpandedAtRange(editor, range) {
  if (range.isExpanded) {
    editor.deleteAtRange(range);
  }

  var value = editor.value;
  var document = value.document;
  var _range = range,
      start = _range.start,
      end = _range.end;


  if (document.hasDescendant(start.path)) {
    range = range.moveToStart();
  } else {
    range = range.moveTo(end.path, 0).normalize(document);
  }

  return range;
}

/**
 * Commands.
 *
 * @type {Object}
 */

var Commands$1 = {};

/**
 * Add a new `mark` to the characters at `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Mixed} mark
 */

Commands$1.addMarkAtRange = function (editor, range, mark) {
  if (range.isCollapsed) return;

  var value = editor.value;
  var document = value.document;
  var start = range.start,
      end = range.end;

  var texts = document.getTextsAtRange(range);

  editor.withoutNormalizing(function () {
    texts.forEach(function (node) {
      var key = node.key;

      var index = 0;
      var length = node.text.length;

      if (key === start.key) index = start.offset;
      if (key === end.key) length = end.offset;
      if (key === start.key && key === end.key) length = end.offset - start.offset;

      editor.addMarkByKey(key, index, length, mark);
    });
  });
};

/**
 * Add a list of `marks` to the characters at `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Array<Mixed>} mark
 */

Commands$1.addMarksAtRange = function (editor, range, marks) {
  marks.forEach(function (mark) {
    return editor.addMarkAtRange(range, mark);
  });
};

/**
 * Delete everything in a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 */

Commands$1.deleteAtRange = function (editor, range) {
  // Snapshot the selection, which creates an extra undo save point, so that
  // when you undo a delete, the expanded selection will be retained.
  editor.snapshotSelection();

  var value = editor.value;
  var start = range.start,
      end = range.end;

  var startKey = start.key;
  var startOffset = start.offset;
  var endKey = end.key;
  var endOffset = end.offset;
  var document = value.document;

  var isStartVoid = document.hasVoidParent(startKey, editor);
  var isEndVoid = document.hasVoidParent(endKey, editor);
  var startBlock = document.getClosestBlock(startKey);
  var endBlock = document.getClosestBlock(endKey);

  // Check if we have a "hanging" selection case where the even though the
  // selection extends into the start of the end node, we actually want to
  // ignore that for UX reasons.
  var isHanging = startOffset === 0 && endOffset === 0 && isStartVoid === false && startKey === startBlock.getFirstText().key && endKey === endBlock.getFirstText().key && startKey !== endKey;

  // If it's a hanging selection, nudge it back to end in the previous text.
  if (isHanging && isEndVoid) {
    var prevText = document.getPreviousText(endKey);
    endKey = prevText.key;
    endOffset = prevText.text.length;
    isEndVoid = document.hasVoidParent(endKey, editor);
  }

  editor.withoutNormalizing(function () {
    // If the start node is inside a void node, remove the void node and update
    // the starting point to be right after it, continuously until the start point
    // is not a void, or until the entire range is handled.
    while (isStartVoid) {
      var startVoid = document.getClosestVoid(startKey, editor);
      var nextText = document.getNextText(startKey);
      editor.removeNodeByKey(startVoid.key);

      // If the start and end keys are the same, we're done.
      if (startKey === endKey) return;

      // If there is no next text node, we're done.
      if (!nextText) return;

      // Continue...
      document = editor.value.document;
      startKey = nextText.key;
      startOffset = 0;
      isStartVoid = document.hasVoidParent(startKey, editor);
    }

    // If the end node is inside a void node, do the same thing but backwards. But
    // we don't need any aborting checks because if we've gotten this far there
    // must be a non-void node that will exit the loop.
    while (isEndVoid) {
      var endVoid = document.getClosestVoid(endKey, editor);
      var _prevText = document.getPreviousText(endKey);
      editor.removeNodeByKey(endVoid.key);

      // Continue...
      document = editor.value.document;
      endKey = _prevText.key;
      endOffset = _prevText.text.length;
      isEndVoid = document.hasVoidParent(endKey, editor);
    }

    // If the start and end key are the same, and it was a hanging selection, we
    // can just remove the entire block.
    if (startKey === endKey && isHanging) {
      editor.removeNodeByKey(startBlock.key);
      return;
    } else if (startKey === endKey) {
      // Otherwise, if it wasn't hanging, we're inside a single text node, so we can
      // simply remove the text in the range.
      var index = startOffset;
      var length = endOffset - startOffset;
      editor.removeTextByKey(startKey, index, length);
      return;
    } else {
      // Otherwise, we need to recursively remove text and nodes inside the start
      // block after the start offset and inside the end block before the end
      // offset. Then remove any blocks that are in between the start and end
      // blocks. Then finally merge the start and end nodes.
      startBlock = document.getClosestBlock(startKey);
      endBlock = document.getClosestBlock(endKey);
      var startText = document.getNode(startKey);
      var endText = document.getNode(endKey);
      var startLength = startText.text.length - startOffset;
      var endLength = endOffset;

      var ancestor = document.getCommonAncestor(startKey, endKey);
      var startChild = ancestor.getFurthestChild(startKey);
      var endChild = ancestor.getFurthestChild(endKey);

      var startParent = document.getParent(startBlock.key);
      var startParentIndex = startParent.nodes.indexOf(startBlock);
      var endParentIndex = startParent.nodes.indexOf(endBlock);

      var child = void 0;

      // Iterate through all of the nodes in the tree after the start text node
      // but inside the end child, and remove them.
      child = startText;

      while (child.key !== startChild.key) {
        var parent = document.getParent(child.key);
        var _index = parent.nodes.indexOf(child);
        var afters = parent.nodes.slice(_index + 1);

        afters.reverse().forEach(function (node) {
          editor.removeNodeByKey(node.key);
        });

        child = parent;
      }

      // Remove all of the middle children.
      var startChildIndex = ancestor.nodes.indexOf(startChild);
      var endChildIndex = ancestor.nodes.indexOf(endChild);
      var middles = ancestor.nodes.slice(startChildIndex + 1, endChildIndex);

      middles.reverse().forEach(function (node) {
        editor.removeNodeByKey(node.key);
      });

      // Remove the nodes before the end text node in the tree.
      child = endText;

      while (child.key !== endChild.key) {
        var _parent = document.getParent(child.key);
        var _index2 = _parent.nodes.indexOf(child);
        var befores = _parent.nodes.slice(0, _index2);

        befores.reverse().forEach(function (node) {
          editor.removeNodeByKey(node.key);
        });

        child = _parent;
      }

      // Remove any overlapping text content from the leaf text nodes.
      if (startLength !== 0) {
        editor.removeTextByKey(startKey, startOffset, startLength);
      }

      if (endLength !== 0) {
        editor.removeTextByKey(endKey, 0, endOffset);
      }

      // If the start and end blocks aren't the same, move and merge the end block
      // into the start block.
      if (startBlock.key !== endBlock.key) {
        document = editor.value.document;
        var onlyChildAncestor = void 0;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = document.ancestors(endBlock.key)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = slicedToArray(_ref, 1);

            var node = _ref2[0];

            if (node.nodes.size > 1) {
              break;
            } else {
              onlyChildAncestor = node;
            }
          }

          // Move the end block to be right after the start block.
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (endParentIndex !== startParentIndex + 1) {
          editor.moveNodeByKey(endBlock.key, startParent.key, startParentIndex + 1);
        }

        // If the selection is hanging, just remove the start block, otherwise
        // merge the end block into it.
        if (isHanging) {
          editor.removeNodeByKey(startBlock.key);
        } else {
          editor.mergeNodeByKey(endBlock.key);
        }

        // If nested empty blocks are left over above the end block, remove them.
        if (onlyChildAncestor) {
          editor.removeNodeByKey(onlyChildAncestor.key);
        }
      }
    }
  });
};

/**
 * Delete backward `n` characters at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Number} n (optional)
 */

Commands$1.deleteBackwardAtRange = function (editor, range) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (n === 0) return;
  var value = editor.value;
  var document = value.document;
  var _range2 = range,
      start = _range2.start,
      focus = _range2.focus;

  // If the range is expanded, perform a regular delete instead.

  if (range.isExpanded) {
    editor.deleteAtRange(range);
    return;
  }

  var voidParent = document.getClosestVoid(start.path, editor);

  // If there is a void parent, delete it.
  if (voidParent) {
    editor.removeNodeByKey(voidParent.key);
    return;
  }

  // If the range is at the start of the document, abort.
  if (start.isAtStartOfNode(document)) {
    return;
  }

  var block = document.getClosestBlock(start.path);

  // PERF: If the closest block is empty, remove it. This is just a shortcut,
  // since merging it would result in the same outcome.
  if (document.nodes.size !== 1 && block && block.text === '' && block.nodes.size === 1) {
    editor.removeNodeByKey(block.key);
    return;
  }

  // If the range is at the start of the text node, we need to figure out what
  // is behind it to know how to delete...
  var text = document.getDescendant(start.path);

  if (start.isAtStartOfNode(text)) {
    var prev = document.getPreviousText(text.key);
    var inline = document.getClosestInline(text.key);

    // If the range is at the start of the inline node, and previous text node
    // is empty, take the text node before that, or "prevBlock" would be the
    // same node as "block"
    if (inline && prev.text === '') {
      prev = document.getPreviousText(prev.key);
    }

    var prevBlock = document.getClosestBlock(prev.key);
    var prevVoid = document.getClosestVoid(prev.key, editor);

    // If the previous text node has a void parent, remove it.
    if (prevVoid) {
      editor.removeNodeByKey(prevVoid.key);
      return;
    }

    // If we're deleting by one character and the previous text node is not
    // inside the current block, we need to merge the two blocks together.
    if (n === 1 && prevBlock !== block) {
      range = range.moveAnchorTo(prev.key, prev.text.length);
      editor.deleteAtRange(range);
      return;
    }
  }

  // If the focus offset is farther than the number of characters to delete,
  // just remove the characters backwards inside the current node.
  if (n <= focus.offset) {
    range = range.moveFocusBackward(n);
    editor.deleteAtRange(range);
    return;
  }

  // Otherwise, we need to see how many nodes backwards to go.
  var node = text;
  var offset = 0;
  var traversed = focus.offset;

  while (n > traversed) {
    node = document.getPreviousText(node.key);
    var next = traversed + node.text.length;

    if (n <= next) {
      offset = next - n;
      break;
    } else {
      traversed = next;
    }
  }

  range = range.moveAnchorTo(node.key, offset);
  editor.deleteAtRange(range);
};

/**
 * Delete backward until the character boundary at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 */

Commands$1.deleteCharBackwardAtRange = function (editor, range) {
  if (range.isExpanded) {
    editor.deleteAtRange(range);
    return;
  }

  var value = editor.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.path);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  var text = startBlock.text;

  var n = TextUtils.getCharOffsetBackward(text, o);
  editor.deleteBackwardAtRange(range, n);
};

/**
 * Delete forward until the character boundary at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 */

Commands$1.deleteCharForwardAtRange = function (editor, range) {
  if (range.isExpanded) {
    editor.deleteAtRange(range);
    return;
  }

  var value = editor.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.path);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  var text = startBlock.text;

  var n = TextUtils.getCharOffsetForward(text, o);
  editor.deleteForwardAtRange(range, n);
};

/**
 * Delete forward `n` characters at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Number} n (optional)
 */

Commands$1.deleteForwardAtRange = function (editor, range) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (n === 0) return;
  var value = editor.value;
  var document = value.document;
  var _range3 = range,
      start = _range3.start,
      focus = _range3.focus;

  // If the range is expanded, perform a regular delete instead.

  if (range.isExpanded) {
    editor.deleteAtRange(range);
    return;
  }

  var voidParent = document.getClosestVoid(start.path, editor);

  // If the node has a void parent, delete it.
  if (voidParent) {
    editor.removeNodeByKey(voidParent.key);
    return;
  }

  var block = document.getClosestBlock(start.path);

  // If the closest is not void, but empty, remove it
  if (block && !editor.isVoid(block) && block.text === '' && document.nodes.size !== 1) {
    var nextBlock = document.getNextBlock(block.key);
    editor.removeNodeByKey(block.key);

    if (nextBlock && nextBlock.key) {
      editor.moveToStartOfNode(nextBlock);
    }

    return;
  }

  // If the range is at the start of the document, abort.
  if (start.isAtEndOfNode(document)) {
    return;
  }

  // If the range is at the start of the text node, we need to figure out what
  // is behind it to know how to delete...
  var text = document.getDescendant(start.path);

  if (start.isAtEndOfNode(text)) {
    var next = document.getNextText(text.key);
    var _nextBlock = document.getClosestBlock(next.key);
    var nextVoid = document.getClosestVoid(next.key, editor);

    // If the next text node has a void parent, remove it.
    if (nextVoid) {
      editor.removeNodeByKey(nextVoid.key);
      return;
    }

    // If we're deleting by one character and the previous text node is not
    // inside the current block, we need to merge the two blocks together.
    if (n === 1 && _nextBlock !== block) {
      range = range.moveFocusTo(next.key, 0);
      editor.deleteAtRange(range);
      return;
    }
  }

  // If the remaining characters to the end of the node is greater than or equal
  // to the number of characters to delete, just remove the characters forwards
  // inside the current node.
  if (n <= text.text.length - focus.offset) {
    range = range.moveFocusForward(n);
    editor.deleteAtRange(range);
    return;
  }

  // Otherwise, we need to see how many nodes forwards to go.
  var node = text;
  var offset = focus.offset;
  var traversed = text.text.length - focus.offset;

  while (n > traversed) {
    node = document.getNextText(node.key);
    var _next = traversed + node.text.length;

    if (n <= _next) {
      offset = n - traversed;
      break;
    } else {
      traversed = _next;
    }
  }

  range = range.moveFocusTo(node.key, offset);
  editor.deleteAtRange(range);
};

/**
 * Delete backward until the line boundary at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 */

Commands$1.deleteLineBackwardAtRange = function (editor, range) {
  if (range.isExpanded) {
    editor.deleteAtRange(range);
    return;
  }

  var value = editor.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.path);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  editor.deleteBackwardAtRange(range, o);
};

/**
 * Delete forward until the line boundary at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 */

Commands$1.deleteLineForwardAtRange = function (editor, range) {
  if (range.isExpanded) {
    editor.deleteAtRange(range);
    return;
  }

  var value = editor.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.path);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  editor.deleteForwardAtRange(range, startBlock.text.length - o);
};

/**
 * Delete backward until the word boundary at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 */

Commands$1.deleteWordBackwardAtRange = function (editor, range) {
  if (range.isExpanded) {
    editor.deleteAtRange(range);
    return;
  }

  var value = editor.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.path);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  var text = startBlock.text;

  var n = o === 0 ? 1 : TextUtils.getWordOffsetBackward(text, o);
  editor.deleteBackwardAtRange(range, n);
};

/**
 * Delete forward until the word boundary at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 */

Commands$1.deleteWordForwardAtRange = function (editor, range) {
  if (range.isExpanded) {
    editor.deleteAtRange(range);
    return;
  }

  var value = editor.value;
  var document = value.document;
  var start = range.start;

  var startBlock = document.getClosestBlock(start.path);
  var offset = startBlock.getOffset(start.key);
  var o = offset + start.offset;
  var text = startBlock.text;

  var wordOffset = TextUtils.getWordOffsetForward(text, o);
  var n = wordOffset === 0 ? 1 : wordOffset;
  editor.deleteForwardAtRange(range, n);
};

/**
 * Insert a `block` node at `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Block|String|Object} block
 */

Commands$1.insertBlockAtRange = function (editor, range, block) {
  range = deleteExpandedAtRange(editor, range);
  block = Block.create(block);

  var value = editor.value;
  var document = value.document;
  var _range4 = range,
      start = _range4.start;

  var startKey = start.key;
  var startOffset = start.offset;
  var startBlock = document.getClosestBlock(startKey);
  var startInline = document.getClosestInline(startKey);
  var parent = document.getParent(startBlock.key);
  var index = parent.nodes.indexOf(startBlock);
  var insertionMode = getInsertionMode(editor, range);

  if (insertionMode === 'before') {
    editor.insertNodeByKey(parent.key, index, block);
  } else if (insertionMode === 'behind') {
    editor.insertNodeByKey(parent.key, index + 1, block);
  } else {
    if (startInline && editor.isVoid(startInline)) {
      var atEnd = start.isAtEndOfNode(startInline);
      var siblingText = atEnd ? document.getNextText(startKey) : document.getPreviousText(startKey);

      var splitRange = atEnd ? range.moveToStartOfNode(siblingText) : range.moveToEndOfNode(siblingText);

      startKey = splitRange.start.key;
      startOffset = splitRange.start.offset;
    }

    editor.withoutNormalizing(function () {
      editor.splitDescendantsByKey(startBlock.key, startKey, startOffset);
      editor.insertNodeByKey(parent.key, index + 1, block);
    });
  }
};

/**
 * Check if current block should be split or new block should be added before or behind it.
 *
 * @param {Editor} editor
 * @param {Range} range
 */

var getInsertionMode = function getInsertionMode(editor, range) {
  var value = editor.value;
  var document = value.document;
  var start = range.start;

  var startKey = start.key;
  var startBlock = document.getClosestBlock(startKey);
  var startInline = document.getClosestInline(startKey);

  if (editor.isVoid(startBlock)) {
    if (start.isAtEndOfNode(startBlock)) return 'behind';else return 'before';
  } else if (!startInline && startBlock.text === '') {
    return 'behind';
  } else if (start.isAtStartOfNode(startBlock)) {
    return 'before';
  } else if (start.isAtEndOfNode(startBlock)) {
    return 'behind';
  }
  return 'split';
};

/**
 * Insert a `fragment` at a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Document} fragment
 */

Commands$1.insertFragmentAtRange = function (editor, range, fragment) {
  editor.withoutNormalizing(function () {
    range = deleteExpandedAtRange(editor, range);

    // If the fragment is empty, there's nothing to do after deleting.
    if (!fragment.nodes.size) return;

    // Regenerate the keys for all of the fragments nodes, so that they're
    // guaranteed not to collide with the existing keys in the document. Otherwise
    // they will be regenerated automatically and we won't have an easy way to
    // reference them.
    fragment = fragment.mapDescendants(function (child) {
      return child.regenerateKey();
    });

    // Calculate a few things...
    var _range5 = range,
        start = _range5.start;
    var value = editor.value;
    var document = value.document;

    var startText = document.getDescendant(start.path);
    var startBlock = document.getClosestBlock(startText.key);
    var startChild = startBlock.getFurthestChild(startText.key);
    var isAtStart = start.isAtStartOfNode(startBlock);
    var parent = document.getParent(startBlock.key);
    var index = parent.nodes.indexOf(startBlock);
    var blocks = fragment.getBlocks();
    var firstChild = fragment.nodes.first();
    var lastChild = fragment.nodes.last();
    var firstBlock = blocks.first();
    var lastBlock = blocks.last();
    var insertionNode = findInsertionNode(fragment, document, startBlock.key);

    // If the fragment only contains a void block, use `insertBlock` instead.
    if (firstBlock === lastBlock && editor.isVoid(firstBlock)) {
      editor.insertBlockAtRange(range, firstBlock);
      return;
    }

    // If inserting the entire fragment and it starts or ends with a single
    // nested block, e.g. a table, we do not merge it with existing blocks.
    if (insertionNode === fragment && (firstChild.hasBlockChildren() || lastChild.hasBlockChildren())) {
      // check if reversal is necessary or not
      var insertionMode = getInsertionMode(editor, range);
      var nodes = insertionMode === 'before' ? fragment.nodes : fragment.nodes.reverse();

      nodes.forEach(function (node) {
        editor.insertBlockAtRange(range, node);
      });
      return;
    }

    // If the first and last block aren't the same, we need to insert all of the
    // nodes after the insertion node's first block at the index.
    if (firstBlock !== lastBlock) {
      var lonelyParent = insertionNode.getFurthest(firstBlock.key, function (p) {
        return p.nodes.size === 1;
      });
      var lonelyChild = lonelyParent || firstBlock;

      var startIndex = parent.nodes.indexOf(startBlock);
      var excludingLonelyChild = insertionNode.removeNode(lonelyChild.key);

      excludingLonelyChild.nodes.forEach(function (node, i) {
        var newIndex = startIndex + i + 1;
        editor.insertNodeByKey(parent.key, newIndex, node);
      });
    }

    // Check if we need to split the node.
    if (start.offset !== 0) {
      editor.splitDescendantsByKey(startChild.key, start.key, start.offset);
    }

    // Update our variables with the new value.
    document = editor.value.document;
    startText = document.getDescendant(start.key);
    startBlock = document.getClosestBlock(start.key);
    startChild = startBlock.getFurthestChild(startText.key);

    // If the first and last block aren't the same, we need to move any of the
    // starting block's children after the split into the last block of the
    // fragment, which has already been inserted.
    if (firstBlock !== lastBlock) {
      var nextChild = isAtStart ? startChild : startBlock.getNextSibling(startChild.key);
      var nextNodes = nextChild ? startBlock.nodes.skipUntil(function (n) {
        return n.key === nextChild.key;
      }) : List();
      var lastIndex = lastBlock.nodes.size;

      nextNodes.forEach(function (node, i) {
        var newIndex = lastIndex + i;
        editor.moveNodeByKey(node.key, lastBlock.key, newIndex);
      });
    }

    // If the starting block is empty, we replace it entirely with the first block
    // of the fragment, since this leads to a more expected behavior for the user.
    if (!editor.isVoid(startBlock) && startBlock.text === '' && !startBlock.findDescendant(function (n) {
      return editor.isVoid(n);
    })) {
      editor.removeNodeByKey(startBlock.key);
      editor.insertNodeByKey(parent.key, index, firstBlock);
    } else {
      // Otherwise, we maintain the starting block, and insert all of the first
      // block's inline nodes into it at the split point.
      var inlineChild = startBlock.getFurthestChild(startText.key);
      var inlineIndex = startBlock.nodes.indexOf(inlineChild);

      firstBlock.nodes.forEach(function (inline, i) {
        var o = start.offset === 0 ? 0 : 1;
        var newIndex = inlineIndex + i + o;
        editor.insertNodeByKey(startBlock.key, newIndex, inline);
      });
    }
  });
};

/**
 * Get the deepest single child block inside `fragment` whose reversed block
 * ancestors match the reversed block ancestors of the `document` starting at
 * the `documentKey`.
 *
 * @param {Document} document
 * @param {string} documentKey
 * @param {Document} fragment
 * @return {Node}
 */

var findInsertionNode = function findInsertionNode(fragment, document, documentKey) {
  // Find the deepest block in a doc with no siblings.
  var deepestSingleBlock = function deepestSingleBlock(doc) {
    var result = doc;

    while (result.nodes.size === 1 && result.nodes.first().object === 'block') {
      result = result.nodes.first();
    }

    return result === doc ? null : result;
  };

  // Return whether every block in the `fragmentAncestors` list has the
  // same type as the block in `documentAncestors` with the same index.
  var ancestorTypesMatch = function ancestorTypesMatch(fragmentAncestors, documentAncestors) {
    return documentAncestors.size >= fragmentAncestors.size && fragmentAncestors.every(function (fragmentNode, i) {
      return documentAncestors.get(i).type === fragmentNode.type;
    });
  };

  // Given two reverse lists of ancestors, check if all fragment ancestor types
  // match the doc ancestors at some position.
  var matchingFragmentAncestor = function matchingFragmentAncestor(documentAncestors, fragmentAncestors) {
    var depthDifference = documentAncestors.size - fragmentAncestors.size;

    // There is nothing to align if the fragment is deeper than the document.
    if (depthDifference < 0) {
      return fragment;
    }

    for (var fragIdx = 0; fragIdx < fragmentAncestors.size; fragIdx++) {
      // The docIdx loop relaxes our check in that we can still match if there
      // are node type differences leaf-side.
      // This is important for example if our fragment inserts multiple siblings
      // or inserts another type while the tree structure remains the same.
      for (var docIdx = 0; docIdx <= depthDifference; docIdx++) {
        if (ancestorTypesMatch(fragmentAncestors.slice(fragIdx), documentAncestors.slice(docIdx))) {
          return fragmentAncestors.get(fragIdx);
        }
      }
    }
    return fragment;
  };

  // Get the type definitions for all ancestors up from node with key `key`,
  // except the document object.
  var getAncestorBlocks = function getAncestorBlocks(doc, key) {
    return doc.getAncestors(key).slice(1).push(doc.getNode(key)).reverse();
  };

  var fragmentStartBlock = deepestSingleBlock(fragment);

  if (!fragmentStartBlock) {
    return fragment;
  }

  var documentAncestors = getAncestorBlocks(document, documentKey);
  var fragmentAncestors = getAncestorBlocks(fragment, fragmentStartBlock.key);

  return matchingFragmentAncestor(documentAncestors, fragmentAncestors);
};

/**
 * Insert an `inline` node at `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Inline|String|Object} inline
 */

Commands$1.insertInlineAtRange = function (editor, range, inline) {
  inline = Inline.create(inline);

  editor.withoutNormalizing(function () {
    range = deleteExpandedAtRange(editor, range);

    var value = editor.value;
    var document = value.document;
    var _range6 = range,
        start = _range6.start;

    var parent = document.getParent(start.path);
    var startText = document.assertDescendant(start.path);
    var index = parent.nodes.indexOf(startText);

    if (editor.isVoid(parent)) {
      return;
    }

    editor.splitNodeByPath(start.path, start.offset);
    editor.insertNodeByKey(parent.key, index + 1, inline);
  });
};

/**
 * Insert `text` at a `range`, with optional `marks`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Commands$1.insertTextAtRange = function (editor, range, text, marks) {
  editor.withoutNormalizing(function () {
    range = deleteExpandedAtRange(editor, range);

    var value = editor.value;
    var document = value.document;
    var _range7 = range,
        start = _range7.start;

    var offset = start.offset;
    var parent = document.getParent(start.path);

    if (editor.isVoid(parent)) {
      return;
    }

    editor.insertTextByPath(start.path, offset, text, marks);
  });
};

/**
 * Remove an existing `mark` to the characters at `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Mark|String} mark (optional)
 */

Commands$1.removeMarkAtRange = function (editor, range, mark) {
  if (range.isCollapsed) return;

  var value = editor.value;
  var document = value.document;

  var texts = document.getTextsAtRange(range);
  var start = range.start,
      end = range.end;


  editor.withoutNormalizing(function () {
    texts.forEach(function (node) {
      var key = node.key;

      var index = 0;
      var length = node.text.length;

      if (key === start.key) index = start.offset;
      if (key === end.key) length = end.offset;
      if (key === start.key && key === end.key) length = end.offset - start.offset;

      editor.removeMarkByKey(key, index, length, mark);
    });
  });
};

/**
 * Set the `properties` of block nodes in a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Object|String} properties
 */

Commands$1.setBlocksAtRange = function (editor, range, properties) {
  var value = editor.value;
  var document = value.document;

  var blocks = document.getLeafBlocksAtRange(range);

  var start = range.start,
      end = range.end,
      isCollapsed = range.isCollapsed;

  var isStartVoid = document.hasVoidParent(start.path, editor);
  var startBlock = document.getClosestBlock(start.path);
  var endBlock = document.getClosestBlock(end.key);

  // Check if we have a "hanging" selection case where the even though the
  // selection extends into the start of the end node, we actually want to
  // ignore that for UX reasons.
  var isHanging = isCollapsed === false && start.offset === 0 && end.offset === 0 && isStartVoid === false && start.key === startBlock.getFirstText().key && end.key === endBlock.getFirstText().key;

  // If it's a hanging selection, ignore the last block.
  var sets = isHanging ? blocks.slice(0, -1) : blocks;

  editor.withoutNormalizing(function () {
    sets.forEach(function (block) {
      editor.setNodeByKey(block.key, properties);
    });
  });
};

/**
 * Set the `properties` of inline nodes in a `range`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Object|String} properties
 */

Commands$1.setInlinesAtRange = function (editor, range, properties) {
  var value = editor.value;
  var document = value.document;

  var inlines = document.getLeafInlinesAtRange(range);

  editor.withoutNormalizing(function () {
    inlines.forEach(function (inline) {
      editor.setNodeByKey(inline.key, properties);
    });
  });
};

/**
 * Split the block nodes at a `range`, to optional `height`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Number} height (optional)
 */

Commands$1.splitBlockAtRange = function (editor, range) {
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  range = deleteExpandedAtRange(editor, range);

  var _range8 = range,
      start = _range8.start,
      end = _range8.end;
  var value = editor.value;
  var _value = value,
      document = _value.document;

  var node = document.assertDescendant(start.path);
  var parent = document.getClosestBlock(node.key);
  var h = 0;

  while (parent && parent.object === 'block' && h < height) {
    node = parent;
    parent = document.getClosestBlock(parent.key);
    h++;
  }

  editor.withoutNormalizing(function () {
    editor.splitDescendantsByKey(node.key, start.path, start.offset);

    value = editor.value;
    document = value.document;

    if (range.isExpanded) {
      if (range.isBackward) range = range.flip();
      var nextBlock = document.getNextBlock(node.key);
      range = range.moveAnchorToStartOfNode(nextBlock);
      range = range.setFocus(range.focus.setPath(null));

      if (start.path.equals(end.path)) {
        range = range.moveFocusTo(range.anchor.key, end.offset - start.offset);
      }

      range = document.resolveRange(range);
      editor.deleteAtRange(range);
    }
  });
};

/**
 * Split the inline nodes at a `range`, to optional `height`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Number} height (optional)
 */

Commands$1.splitInlineAtRange = function (editor, range) {
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

  range = deleteExpandedAtRange(editor, range);

  var _range9 = range,
      start = _range9.start;
  var value = editor.value;
  var document = value.document;

  var node = document.assertDescendant(start.path);
  var parent = document.getClosestInline(node.key);
  var h = 0;

  while (parent && parent.object === 'inline' && h < height) {
    node = parent;
    parent = document.getClosestInline(parent.key);
    h++;
  }

  editor.splitDescendantsByKey(node.key, start.path, start.offset);
};

/**
 * Add or remove a `mark` from the characters at `range`, depending on whether
 * it's already there.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Mixed} mark
 */

Commands$1.toggleMarkAtRange = function (editor, range, mark) {
  if (range.isCollapsed) return;

  mark = Mark.create(mark);

  var value = editor.value;
  var document = value.document;

  var marks = document.getActiveMarksAtRange(range);
  var exists = marks.some(function (m) {
    return m.equals(mark);
  });

  if (exists) {
    editor.removeMarkAtRange(range, mark);
  } else {
    editor.addMarkAtRange(range, mark);
  }
};

/**
 * Unwrap all of the block nodes in a `range` from a block with `properties`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {String|Object} properties
 */

Commands$1.unwrapBlockAtRange = function (editor, range, properties) {
  properties = Node.createProperties(properties);

  var value = editor.value;
  var document = value.document;

  var blocks = document.getLeafBlocksAtRange(range);
  var wrappers = blocks.map(function (block) {
    return document.getClosest(block.key, function (parent) {
      if (parent.object !== 'block') return false;
      if (properties.type != null && parent.type !== properties.type) return false;
      if (properties.data != null && !parent.data.isSuperset(properties.data)) return false;
      return true;
    });
  }).filter(function (exists) {
    return exists;
  }).toOrderedSet().toList();

  editor.withoutNormalizing(function () {
    wrappers.forEach(function (block) {
      var first = block.nodes.first();
      var last = block.nodes.last();
      var parent = editor.value.document.getParent(block.key);
      var index = parent.nodes.indexOf(block);

      var children = block.nodes.filter(function (child) {
        return blocks.some(function (b) {
          return child === b || child.hasDescendant(b.key);
        });
      });

      var firstMatch = children.first();
      var lastMatch = children.last();

      if (first === firstMatch && last === lastMatch) {
        block.nodes.forEach(function (child, i) {
          editor.moveNodeByKey(child.key, parent.key, index + i);
        });

        editor.removeNodeByKey(block.key);
      } else if (last === lastMatch) {
        block.nodes.skipUntil(function (n) {
          return n === firstMatch;
        }).forEach(function (child, i) {
          editor.moveNodeByKey(child.key, parent.key, index + 1 + i);
        });
      } else if (first === firstMatch) {
        block.nodes.takeUntil(function (n) {
          return n === lastMatch;
        }).push(lastMatch).forEach(function (child, i) {
          editor.moveNodeByKey(child.key, parent.key, index + i);
        });
      } else {
        var firstText = firstMatch.getFirstText();

        editor.splitDescendantsByKey(block.key, firstText.key, 0);

        document = editor.value.document;

        children.forEach(function (child, i) {
          if (i === 0) {
            var extra = child;
            child = document.getNextBlock(child.key);
            editor.removeNodeByKey(extra.key);
          }

          editor.moveNodeByKey(child.key, parent.key, index + 1 + i);
        });
      }
    });
  });
};

/**
 * Unwrap the inline nodes in a `range` from an inline with `properties`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {String|Object} properties
 */

Commands$1.unwrapInlineAtRange = function (editor, range, properties) {
  properties = Node.createProperties(properties);

  var value = editor.value;
  var document = value.document;

  var texts = document.getTextsAtRange(range);
  var inlines = texts.map(function (text) {
    return document.getClosest(text.key, function (parent) {
      if (parent.object !== 'inline') return false;
      if (properties.type != null && parent.type !== properties.type) return false;
      if (properties.data != null && !parent.data.isSuperset(properties.data)) return false;
      return true;
    });
  }).filter(function (exists) {
    return exists;
  }).toOrderedSet().toList();

  editor.withoutNormalizing(function () {
    inlines.forEach(function (inline) {
      var parent = editor.value.document.getParent(inline.key);
      var index = parent.nodes.indexOf(inline);

      inline.nodes.forEach(function (child, i) {
        editor.moveNodeByKey(child.key, parent.key, index + i);
      });

      editor.removeNodeByKey(inline.key);
    });
  });
};

/**
 * Wrap all of the blocks in a `range` in a new `block`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Block|Object|String} block
 */

Commands$1.wrapBlockAtRange = function (editor, range, block) {
  block = Block.create(block);
  block = block.set('nodes', block.nodes.clear());

  var value = editor.value;
  var document = value.document;


  var blocks = document.getLeafBlocksAtRange(range);
  var firstblock = blocks.first();
  var lastblock = blocks.last();
  var parent = void 0,
      siblings = void 0,
      index = void 0;

  // If there is only one block in the selection then we know the parent and
  // siblings.
  if (blocks.length === 1) {
    parent = document.getParent(firstblock.key);
    siblings = blocks;
  } else {
    // Determine closest shared parent to all blocks in selection.
    parent = document.getClosest(firstblock.key, function (p1) {
      return !!document.getClosest(lastblock.key, function (p2) {
        return p1 === p2;
      });
    });
  }

  // If no shared parent could be found then the parent is the document.
  if (parent == null) parent = document;

  // Create a list of direct children siblings of parent that fall in the
  // selection.
  if (siblings == null) {
    var indexes = parent.nodes.reduce(function (ind, node, i) {
      if (node === firstblock || node.hasDescendant(firstblock.key)) ind[0] = i;
      if (node === lastblock || node.hasDescendant(lastblock.key)) ind[1] = i;
      return ind;
    }, []);

    index = indexes[0];
    siblings = parent.nodes.slice(indexes[0], indexes[1] + 1);
  }

  // Get the index to place the new wrapped node at.
  if (index == null) {
    index = parent.nodes.indexOf(siblings.first());
  }

  editor.withoutNormalizing(function () {
    // Inject the new block node into the parent.
    editor.insertNodeByKey(parent.key, index, block);

    // Move the sibling nodes into the new block node.
    siblings.forEach(function (node, i) {
      editor.moveNodeByKey(node.key, block.key, i);
    });
  });
};

/**
 * Wrap the text and inlines in a `range` in a new `inline`.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {Inline|Object|String} inline
 */

Commands$1.wrapInlineAtRange = function (editor, range, inline) {
  var value = editor.value;
  var document = value.document;
  var start = range.start,
      end = range.end;


  if (range.isCollapsed) {
    // Wrapping an inline void
    var inlineParent = document.getClosestInline(start.path);

    if (!inlineParent) {
      return;
    }

    if (!editor.isVoid(inlineParent)) {
      return;
    }

    return editor.wrapInlineByKey(inlineParent.key, inline);
  }

  inline = Inline.create(inline);
  inline = inline.set('nodes', inline.nodes.clear());

  var blocks = document.getLeafBlocksAtRange(range);
  var startBlock = document.getClosestBlock(start.path);
  var endBlock = document.getClosestBlock(end.path);
  var startInline = document.getClosestInline(start.path);
  var endInline = document.getClosestInline(end.path);
  var startChild = startBlock.getFurthestChild(start.key);
  var endChild = endBlock.getFurthestChild(end.key);

  editor.withoutNormalizing(function () {
    if (!startInline || startInline !== endInline) {
      editor.splitDescendantsByKey(endChild.key, end.key, end.offset);
      editor.splitDescendantsByKey(startChild.key, start.key, start.offset);
    }

    document = editor.value.document;
    startBlock = document.getDescendant(startBlock.key);
    endBlock = document.getDescendant(endBlock.key);
    startChild = startBlock.getFurthestChild(start.key);
    endChild = endBlock.getFurthestChild(end.key);
    var startIndex = startBlock.nodes.indexOf(startChild);
    var endIndex = endBlock.nodes.indexOf(endChild);

    if (startInline && startInline === endInline) {
      var texts = startBlock.getTextsAtRange(range).map(function (text) {
        if (start.key === text.key && end.key === text.key) {
          return text.splitText(start.offset)[1].splitText(end.offset - start.offset)[0].regenerateKey();
        } else if (start.key === text.key) {
          return text.splitText(start.offset)[1].regenerateKey();
        } else if (end.key === text.key) {
          return text.splitText(end.offset)[0].regenerateKey();
        } else {
          return text.regenerateKey();
        }
      });

      inline = inline.set('nodes', texts);
      editor.insertInlineAtRange(range, inline);
    } else if (startBlock === endBlock) {
      document = editor.value.document;
      startBlock = document.getClosestBlock(start.key);
      startChild = startBlock.getFurthestChild(start.key);

      var startInner = document.getNextSibling(startChild.key);
      var startInnerIndex = startBlock.nodes.indexOf(startInner);
      var endInner = start.key === end.key ? startInner : startBlock.getFurthestChild(end.key);
      var inlines = startBlock.nodes.skipUntil(function (n) {
        return n === startInner;
      }).takeUntil(function (n) {
        return n === endInner;
      }).push(endInner);

      var node = inline.regenerateKey();

      editor.insertNodeByKey(startBlock.key, startInnerIndex, node);

      inlines.forEach(function (child, i) {
        editor.moveNodeByKey(child.key, node.key, i);
      });
    } else {
      var startInlines = startBlock.nodes.slice(startIndex + 1);
      var endInlines = endBlock.nodes.slice(0, endIndex + 1);
      var startNode = inline.regenerateKey();
      var endNode = inline.regenerateKey();

      editor.insertNodeByKey(startBlock.key, startIndex + 1, startNode);
      editor.insertNodeByKey(endBlock.key, endIndex, endNode);

      startInlines.forEach(function (child, i) {
        editor.moveNodeByKey(child.key, startNode.key, i);
      });

      endInlines.forEach(function (child, i) {
        editor.moveNodeByKey(child.key, endNode.key, i);
      });

      blocks.slice(1, -1).forEach(function (block) {
        var node = inline.regenerateKey();
        editor.insertNodeByKey(block.key, 0, node);

        block.nodes.forEach(function (child, i) {
          editor.moveNodeByKey(child.key, node.key, i);
        });
      });
    }
  });
};

/**
 * Wrap the text in a `range` in a prefix/suffix.
 *
 * @param {Editor} editor
 * @param {Range} range
 * @param {String} prefix
 * @param {String} suffix (optional)
 */

Commands$1.wrapTextAtRange = function (editor, range, prefix) {
  var suffix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : prefix;
  var start = range.start,
      end = range.end;

  var startRange = range.moveToStart();
  var endRange = range.moveToEnd();

  if (start.path.equals(end.path)) {
    endRange = endRange.moveForward(prefix.length);
  }

  editor.withoutNormalizing(function () {
    editor.insertTextAtRange(startRange, prefix);
    editor.insertTextAtRange(endRange, suffix);
  });
};

/**
 * Commands.
 *
 * @type {Object}
 */

var Commands$2 = {};

/**
 * Add mark to text at `offset` and `length` in node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 * @param {Mixed} mark
 */

Commands$2.addMarkByPath = function (editor, path, offset, length, mark) {
  mark = Mark.create(mark);
  editor.addMarksByPath(path, offset, length, [mark]);
};

Commands$2.addMarksByPath = function (editor, path, offset, length, marks) {
  marks = Mark.createSet(marks);

  if (!marks.size) {
    return;
  }

  var value = editor.value;
  var document = value.document;

  var node = document.assertNode(path);

  editor.withoutNormalizing(function () {
    // If it ends before the end of the node, we'll need to split to create a new
    // text with different marks.
    if (offset + length < node.text.length) {
      editor.splitNodeByPath(path, offset + length);
    }

    // Same thing if it starts after the start. But in that case, we need to
    // update our path and offset to point to the new start.
    if (offset > 0) {
      editor.splitNodeByPath(path, offset);
      path = PathUtils.increment(path);
      offset = 0;
    }

    marks.forEach(function (mark) {
      editor.applyOperation({
        type: 'add_mark',
        path: path,
        mark: Mark.create(mark)
      });
    });
  });
};

/**
 * Sets specific set of marks on the path
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 * @param {Array<Object|Mark>} marks
 */

Commands$2.replaceMarksByPath = function (editor, path, offset, length, marks) {
  var marksSet = Mark.createSet(marks);

  var value = editor.value;
  var document = value.document;

  var node = document.assertNode(path);

  if (node.marks.equals(marksSet)) {
    return;
  }

  editor.withoutNormalizing(function () {
    // If it ends before the end of the node, we'll need to split to create a new
    // text with different marks.
    if (offset + length < node.text.length) {
      editor.splitNodeByPath(path, offset + length);
    }

    // Same thing if it starts after the start. But in that case, we need to
    // update our path and offset to point to the new start.
    if (offset > 0) {
      editor.splitNodeByPath(path, offset);
      path = PathUtils.increment(path);
      offset = 0;
    }

    var marksToApply = marksSet.subtract(node.marks);
    var marksToRemove = node.marks.subtract(marksSet);

    marksToRemove.forEach(function (mark) {
      editor.applyOperation({
        type: 'remove_mark',
        path: path,
        mark: Mark.create(mark)
      });
    });

    marksToApply.forEach(function (mark) {
      editor.applyOperation({
        type: 'add_mark',
        path: path,
        mark: Mark.create(mark)
      });
    });
  });
};

/**
 * Insert a `fragment` at `index` in a node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} index
 * @param {Fragment} fragment
 */

Commands$2.insertFragmentByPath = function (editor, path, index, fragment) {
  fragment.nodes.forEach(function (node, i) {
    editor.insertNodeByPath(path, index + i, node);
  });
};

/**
 * Insert a `node` at `index` in a node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} index
 * @param {Node} node
 */

Commands$2.insertNodeByPath = function (editor, path, index, node) {
  editor.applyOperation({
    type: 'insert_node',
    path: path.concat(index),
    node: node
  });
};

/**
 * Insert `text` at `offset` in node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} offset
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Commands$2.insertTextByPath = function (editor, path, offset, text, marks) {
  var value = editor.value;
  var annotations = value.annotations,
      document = value.document;

  document.assertNode(path);

  editor.withoutNormalizing(function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = annotations.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var annotation = _step.value;
        var start = annotation.start,
            end = annotation.end;

        var isAtomic = editor.isAtomic(annotation);

        if (!isAtomic) {
          continue;
        }

        if (!start.path.equals(path)) {
          continue;
        }

        if (start.offset < offset && (!end.path.equals(path) || end.offset > offset)) {
          editor.removeAnnotation(annotation);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    editor.applyOperation({
      type: 'insert_text',
      path: path,
      offset: offset,
      text: text
    });

    if (marks) {
      editor.replaceMarksByPath(path, offset, text.length, marks);
    }
  });
};

/**
 * Merge a node by `path` with the previous node.
 *
 * @param {Editor} editor
 * @param {Array} path
 */

Commands$2.mergeNodeByPath = function (editor, path) {
  var value = editor.value;
  var document = value.document;

  var original = document.getDescendant(path);
  var previous = document.getPreviousSibling(path);

  if (!previous) {
    throw new Error('Unable to merge node with path "' + path + '", because it has no previous sibling.');
  }

  var position = previous.object === 'text' ? previous.text.length : previous.nodes.size;

  editor.applyOperation({
    type: 'merge_node',
    path: path,
    position: position,
    // for undos to succeed we only need the type and data because
    // these are the only properties that get changed in the merge operation
    properties: {
      type: original.type,
      data: original.data
    },
    target: null
  });
};

/**
 * Move a node by `path` to a new parent by `newParentPath` and `newIndex`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {String} newParentPath
 * @param {Number} newIndex
 */

Commands$2.moveNodeByPath = function (editor, path, newParentPath, newIndex) {
  // If the operation path and newParentPath are the same,
  // this should be considered a NOOP
  if (PathUtils.isEqual(path, newParentPath)) {
    return editor;
  }

  var newPath = newParentPath.concat(newIndex);

  if (PathUtils.isEqual(path, newPath)) {
    return editor;
  }

  editor.applyOperation({
    type: 'move_node',
    path: path,
    newPath: newPath
  });
};

/**
 * Remove mark from text at `offset` and `length` in node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 * @param {Mark} mark
 */

Commands$2.removeMarkByPath = function (editor, path, offset, length, mark) {
  mark = Mark.create(mark);
  editor.removeMarksByPath(path, offset, length, [mark]);
};

Commands$2.removeMarksByPath = function (editor, path, offset, length, marks) {
  marks = Mark.createSet(marks);

  if (!marks.size) {
    return;
  }

  var value = editor.value;
  var document = value.document;

  var node = document.assertNode(path);

  if (marks.intersect(node.marks).isEmpty()) {
    return;
  }

  editor.withoutNormalizing(function () {
    // If it ends before the end of the node, we'll need to split to create a new
    // text with different marks.
    if (offset + length < node.text.length) {
      editor.splitNodeByPath(path, offset + length);
    }

    // Same thing if it starts after the start. But in that case, we need to
    // update our path and offset to point to the new start.
    if (offset > 0) {
      editor.splitNodeByPath(path, offset);
      path = PathUtils.increment(path);
      offset = 0;
    }

    marks.forEach(function (mark) {
      editor.applyOperation({
        type: 'remove_mark',
        path: path,
        offset: offset,
        length: length,
        mark: mark
      });
    });
  });
};

/**
 * Remove all `marks` from node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 */

Commands$2.removeAllMarksByPath = function (editor, path) {
  var state = editor.state;
  var document = state.document;

  var node = document.assertNode(path);

  editor.withoutNormalizing(function () {
    if (node.object === 'text') {
      editor.removeMarksByPath(path, 0, node.text.length, node.marks);
      return;
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = node.texts()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _ref = _step2.value;

        var _ref2 = slicedToArray(_ref, 2);

        var n = _ref2[0];
        var p = _ref2[1];

        var pth = path.concat(p);
        editor.removeMarksByPath(pth, 0, n.text.length, n.marks);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
};

/**
 * Remove a node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 */

Commands$2.removeNodeByPath = function (editor, path) {
  var value = editor.value;
  var document = value.document;

  var node = document.assertNode(path);

  editor.applyOperation({
    type: 'remove_node',
    path: path,
    node: node
  });
};

/**
 * Remove text at `offset` and `length` in node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 */

Commands$2.removeTextByPath = function (editor, path, offset, length) {
  var value = editor.value;
  var document = value.document,
      annotations = value.annotations;

  var node = document.assertNode(path);
  var text = node.text.slice(offset, offset + length);

  editor.withoutNormalizing(function () {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = annotations.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var annotation = _step3.value;
        var start = annotation.start,
            end = annotation.end;

        var isAtomic = editor.isAtomic(annotation);

        if (!isAtomic) {
          continue;
        }

        if (!start.path.equals(path)) {
          continue;
        }

        if (start.offset < offset && (!end.path.equals(path) || end.offset > offset)) {
          editor.removeAnnotation(annotation);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    editor.applyOperation({
      type: 'remove_text',
      path: path,
      offset: offset,
      text: text
    });
  });
};

/**
`* Replace a `node` with another `node`
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Object|Node} node
 */

Commands$2.replaceNodeByPath = function (editor, path, newNode) {
  newNode = Node.create(newNode);
  var index = path.last();
  var parentPath = PathUtils.lift(path);

  editor.withoutNormalizing(function () {
    editor.removeNodeByPath(path);
    editor.insertNodeByPath(parentPath, index, newNode);
  });
};

/**
 * Replace a `length` of text at `offset` with new `text` and optional `marks`.
 *
 * @param {Editor} editor
 * @param {String} key
 * @param {Number} offset
 * @param {Number} length
 * @param {string} text
 * @param {Set<Mark>} marks (optional)
 */

Commands$2.replaceTextByPath = function (editor, path, offset, length, text, marks) {
  editor.withoutNormalizing(function () {
    editor.removeTextByPath(path, offset, length);
    editor.insertTextByPath(path, offset, text, marks);
  });
};

/**
 * Set `newProperties` on mark on text at `offset` and `length` in node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} offset
 * @param {Number} length
 * @param {Object|Mark} properties
 * @param {Object} newProperties
 */

Commands$2.setMarkByPath = function (editor, path, offset, length, properties, newProperties) {
  properties = Mark.create(properties);
  newProperties = Mark.createProperties(newProperties);

  var value = editor.value;
  var document = value.document;

  var node = document.assertNode(path);

  editor.withoutNormalizing(function () {
    // If it ends before the end of the node, we'll need to split to create a new
    // text with different marks.
    if (offset + length < node.text.length) {
      editor.splitNodeByPath(path, offset + length);
    }

    // Same thing if it starts after the start. But in that case, we need to
    // update our path and offset to point to the new start.
    if (offset > 0) {
      editor.splitNodeByPath(path, offset);
      path = PathUtils.increment(path);
      offset = 0;
    }

    editor.applyOperation({
      type: 'set_mark',
      path: path,
      properties: properties,
      newProperties: newProperties
    });
  });
};

/**
 * Set `properties` on a node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Object|String} newProperties
 */

Commands$2.setNodeByPath = function (editor, path, newProperties) {
  var value = editor.value;
  var document = value.document;

  var node = document.assertNode(path);
  newProperties = Node.createProperties(newProperties);
  var prevProperties = pick(node, Object.keys(newProperties));

  editor.applyOperation({
    type: 'set_node',
    path: path,
    properties: prevProperties,
    newProperties: newProperties
  });
};

/**
 * Insert `text` at `offset` in node by `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Commands$2.setTextByPath = function (editor, path, text, marks) {
  var value = editor.value;
  var document = value.document;

  var node = document.assertNode(path);
  var end = node.text.length;
  editor.replaceTextByPath(path, 0, end, text, marks);
};

/**
 * Split a node by `path` at `position`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Number} position
 * @param {Object} options
 */

Commands$2.splitNodeByPath = function (editor, path, position) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$target = options.target,
      target = _options$target === undefined ? null : _options$target;
  var value = editor.value;
  var document = value.document;

  var node = document.getDescendant(path);

  editor.applyOperation({
    type: 'split_node',
    path: path,
    position: position,
    target: target,
    properties: {
      type: node.type,
      data: node.data
    }
  });
};

/**
 * Split a node deeply down the tree by `path`, `textPath` and `textOffset`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Array} textPath
 * @param {Number} textOffset
 */

Commands$2.splitDescendantsByPath = function (editor, path, textPath, textOffset) {
  if (path.equals(textPath)) {
    editor.splitNodeByPath(textPath, textOffset);
    return;
  }

  var value = editor.value;
  var document = value.document;

  var index = textOffset;
  var lastPath = textPath;

  editor.withoutNormalizing(function () {
    editor.splitNodeByKey(textPath, textOffset);

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = document.ancestors(textPath)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _ref3 = _step4.value;

        var _ref4 = slicedToArray(_ref3, 2);

        var ancestorPath = _ref4[1];

        var target = index;
        index = lastPath.last() + 1;
        lastPath = ancestorPath;
        editor.splitNodeByPath(ancestorPath, index, { target: target });

        if (ancestorPath.equals(path)) {
          break;
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  });
};

/**
 * Unwrap content from an inline parent with `properties`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Object|String} properties
 */

Commands$2.unwrapInlineByPath = function (editor, path, properties) {
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var node = document.assertNode(path);
  var first = node.getFirstText();
  var last = node.getLastText();
  var range = selection.moveToRangeOfNode(first, last);
  editor.unwrapInlineAtRange(range, properties);
};

/**
 * Unwrap content from a block parent with `properties`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Object|String} properties
 */

Commands$2.unwrapBlockByPath = function (editor, path, properties) {
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var node = document.assertNode(path);
  var first = node.getFirstText();
  var last = node.getLastText();
  var range = selection.moveToRangeOfNode(first, last);
  editor.unwrapBlockAtRange(range, properties);
};

/**
 * Unwrap a single node from its parent.
 *
 * If the node is surrounded with siblings, its parent will be
 * split. If the node is the only child, the parent is removed, and
 * simply replaced by the node itself.  Cannot unwrap a root node.
 *
 * @param {Editor} editor
 * @param {Array} path
 */

Commands$2.unwrapNodeByPath = function (editor, path) {
  var value = editor.value;
  var document = value.document;

  document.assertNode(path);

  var parentPath = PathUtils.lift(path);
  var parent = document.assertNode(parentPath);
  var index = path.last();
  var parentIndex = parentPath.last();
  var grandPath = PathUtils.lift(parentPath);
  var isFirst = index === 0;
  var isLast = index === parent.nodes.size - 1;

  editor.withoutNormalizing(function () {
    if (parent.nodes.size === 1) {
      editor.moveNodeByPath(path, grandPath, parentIndex + 1);
      editor.removeNodeByPath(parentPath);
    } else if (isFirst) {
      editor.moveNodeByPath(path, grandPath, parentIndex);
    } else if (isLast) {
      editor.moveNodeByPath(path, grandPath, parentIndex + 1);
    } else {
      var updatedPath = PathUtils.increment(path, 1, parentPath.size - 1);
      updatedPath = updatedPath.set(updatedPath.size - 1, 0);
      editor.splitNodeByPath(parentPath, index);
      editor.moveNodeByPath(updatedPath, grandPath, parentIndex + 1);
    }
  });
};

/**
 * Unwrap all of the children of a node, by removing the node and replacing it
 * with the children in the tree.
 *
 * @param {Editor} editor
 * @param {Array} path
 */

Commands$2.unwrapChildrenByPath = function (editor, path) {
  path = PathUtils.create(path);
  var value = editor.value;
  var document = value.document;

  var node = document.assertNode(path);
  var parentPath = PathUtils.lift(path);
  var index = path.last();
  var nodes = node.nodes;


  editor.withoutNormalizing(function () {
    nodes.reverse().forEach(function (child, i) {
      var childIndex = nodes.size - i - 1;
      var childPath = path.push(childIndex);
      editor.moveNodeByPath(childPath, parentPath, index + 1);
    });

    editor.removeNodeByPath(path);
  });
};

/**
 * Wrap a node in a block with `properties`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Block|Object|String} block
 */

Commands$2.wrapBlockByPath = function (editor, path, block) {
  block = Block.create(block);
  block = block.set('nodes', block.nodes.clear());
  var parentPath = PathUtils.lift(path);
  var index = path.last();
  var newPath = PathUtils.increment(path);

  editor.withoutNormalizing(function () {
    editor.insertNodeByPath(parentPath, index, block);
    editor.moveNodeByPath(newPath, path, 0);
  });
};

/**
 * Wrap a node in an inline with `properties`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Block|Object|String} inline
 */

Commands$2.wrapInlineByPath = function (editor, path, inline) {
  inline = Inline.create(inline);
  inline = inline.set('nodes', inline.nodes.clear());
  var parentPath = PathUtils.lift(path);
  var index = path.last();
  var newPath = PathUtils.increment(path);

  editor.withoutNormalizing(function () {
    editor.insertNodeByPath(parentPath, index, inline);
    editor.moveNodeByPath(newPath, path, 0);
  });
};

/**
 * Wrap a node by `path` with `node`.
 *
 * @param {Editor} editor
 * @param {Array} path
 * @param {Node|Object} node
 */

Commands$2.wrapNodeByPath = function (editor, path, node) {
  node = Node.create(node);

  if (node.object === 'block') {
    editor.wrapBlockByPath(path, node);
  } else if (node.object === 'inline') {
    editor.wrapInlineByPath(path, node);
  }
};

/**
 * Mix in `*ByKey` variants.
 */

var COMMANDS = ['addMark', 'insertFragment', 'insertNode', 'insertText', 'mergeNode', 'removeAllMarks', 'removeMark', 'removeNode', 'removeText', 'replaceMarks', 'replaceNode', 'replaceText', 'setMark', 'setNode', 'setText', 'splitNode', 'unwrapBlock', 'unwrapChildren', 'unwrapInline', 'unwrapNode', 'wrapBlock', 'wrapInline', 'wrapNode'];

var _loop = function _loop(method) {
  Commands$2[method + 'ByKey'] = function (editor, key) {
    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    var value = editor.value;
    var document = value.document;

    var path = document.assertPath(key);
    editor[method + 'ByPath'].apply(editor, [path].concat(args));
  };
};

var _iteratorNormalCompletion5 = true;
var _didIteratorError5 = false;
var _iteratorError5 = undefined;

try {
  for (var _iterator5 = COMMANDS[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
    var method = _step5.value;

    _loop(method);
  }

  // Moving nodes takes two keys, so it's slightly different.
} catch (err) {
  _didIteratorError5 = true;
  _iteratorError5 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion5 && _iterator5.return) {
      _iterator5.return();
    }
  } finally {
    if (_didIteratorError5) {
      throw _iteratorError5;
    }
  }
}

Commands$2.moveNodeByKey = function (editor, key, newKey) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var value = editor.value;
  var document = value.document;

  var path = document.assertPath(key);
  var newPath = document.assertPath(newKey);
  editor.moveNodeByPath.apply(editor, [path, newPath].concat(args));
};

// Splitting descendants takes two keys, so it's slightly different.
Commands$2.splitDescendantsByKey = function (editor, key, textKey) {
  for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    args[_key2 - 3] = arguments[_key2];
  }

  var value = editor.value;
  var document = value.document;

  var path = document.assertPath(key);
  var textPath = document.assertPath(textKey);
  editor.splitDescendantsByPath.apply(editor, [path, textPath].concat(args));
};

/**
 * Commands.
 *
 * @type {Object}
 */

var Commands$3 = {};

/**
 * Save an `operation` into the history.
 *
 * @param {Editor} editor
 * @param {Object} operation
 */

Commands$3.save = function (editor, operation) {
  var operations = editor.operations,
      value = editor.value;
  var data = value.data;
  var _editor$tmp = editor.tmp,
      save = _editor$tmp.save,
      merge = _editor$tmp.merge;

  if (save === false || !isValidOperation(operation)) return;

  var undos = data.get('undos') || List();
  var lastBatch = undos.last();
  var lastOperation = lastBatch && lastBatch.last();

  // If `merge` is non-commital, and this is not the first operation in a new
  // editor, then merge, otherwise merge based on the last operation.
  if (merge == null) {
    if (operations.size !== 0) {
      merge = true;
    } else {
      merge = shouldMerge(operation, lastOperation);
    }
  }

  // If the `merge` flag is true, add the operation to the last batch.
  if (merge && lastBatch) {
    var batch = lastBatch.push(operation);
    undos = undos.pop();
    undos = undos.push(batch);
  } else {
    // Otherwise, create a new batch with the operation.
    var _batch = List([operation]);
    undos = undos.push(_batch);
  }

  // Constrain the history to 100 entries for memory's sake.
  if (undos.size > 100) {
    undos = undos.takeLast(100);
  }

  // Clear the redos and update the history.
  editor.withoutSaving(function () {
    var redos = List();
    var newData = data.set('undos', undos).set('redos', redos);
    editor.setData(newData);
  });
};

/**
 * Redo to the next value in the history.
 *
 * @param {Editor} editor
 */

Commands$3.redo = function (editor) {
  var value = editor.value;
  var data = value.data;

  var redos = data.get('redos') || List();
  var undos = data.get('undos') || List();
  var batch = redos.last();
  if (!batch) return;

  editor.withoutSaving(function () {
    editor.withoutNormalizing(function () {
      // Replay the batch of operations.
      batch.forEach(function (op) {
        var _op = op,
            type = _op.type,
            newProperties = _op.newProperties;

        // When the operation mutates the selection, omit its `isFocused` value to
        // prevent the editor focus from changing during redoing.

        if (type === 'set_selection') {
          op = op.set('newProperties', omit(newProperties, 'isFocused'));
        }

        editor.applyOperation(op);
      });

      // Shift the next value into the undo stack.
      redos = redos.pop();
      undos = undos.push(batch);
      var newData = data.set('undos', undos).set('redos', redos);
      editor.setData(newData);
    });
  });
};

/**
 * Undo the previous operations in the history.
 *
 * @param {Editor} editor
 */

Commands$3.undo = function (editor) {
  var value = editor.value;
  var data = value.data;

  var redos = data.get('redos') || List();
  var undos = data.get('undos') || List();
  var batch = undos.last();
  if (!batch) return;

  editor.withoutSaving(function () {
    editor.withoutNormalizing(function () {
      // Replay the inverse of the previous operations.
      batch.slice().reverse().map(function (op) {
        return op.invert();
      }).forEach(function (inverse) {
        var _inverse = inverse,
            type = _inverse.type,
            newProperties = _inverse.newProperties;

        // When the operation mutates the selection, omit its `isFocused` value to
        // prevent the editor focus from changing during undoing.

        if (type === 'set_selection') {
          inverse = inverse.set('newProperties', omit(newProperties, 'isFocused'));
        }

        editor.applyOperation(inverse);
      });

      // Shift the previous operations into the redo stack.
      redos = redos.push(batch);
      undos = undos.pop();
      var newData = data.set('undos', undos).set('redos', redos);
      editor.setData(newData);
    });
  });
};

/**
 * Apply a series of changes inside a synchronous `fn`, without merging any of
 * the new operations into previous save point in the history.
 *
 * @param {Editor} editor
 * @param {Function} fn
 */

Commands$3.withoutMerging = function (editor, fn) {
  var value = editor.tmp.merge;
  editor.tmp.merge = false;
  fn(editor);
  editor.tmp.merge = value;
};

/**
 * Apply a series of changes inside a synchronous `fn`, without saving any of
 * their operations into the history.
 *
 * @param {Editor} editor
 * @param {Function} fn
 */

Commands$3.withoutSaving = function (editor, fn) {
  var value = editor.tmp.save;
  editor.tmp.save = false;
  fn(editor);
  editor.tmp.save = value;
};

/**
 * Check whether to merge a new operation `o` into the previous operation `p`.
 *
 * @param {Object} o
 * @param {Object} p
 * @return {Boolean}
 */

function shouldMerge(o, p) {
  if (!p) return false;

  var merge = o.type === 'set_selection' && p.type === 'set_selection' || o.type === 'insert_text' && p.type === 'insert_text' && o.offset === p.offset + p.text.length && o.path.equals(p.path) || o.type === 'remove_text' && p.type === 'remove_text' && o.offset + o.text.length === p.offset && o.path.equals(p.path);

  return merge;
}

/**
 * Check weather an operation needs to be saved to the history
 * @param {Object} o - operation
 * @returns {Boolean}
 */

function isValidOperation(o) {
  if (o.type === 'set_selection') {
    var _o$newProperties = o.newProperties,
        isFocused = _o$newProperties.isFocused,
        anchor = _o$newProperties.anchor,
        focus = _o$newProperties.focus;

    // this is blur/focus operation, dont need to store it into the history

    if (isFocused !== undefined && !anchor && !focus) {
      return false;
    }
  }
  return true;
}

var Commands$4 = {};

Commands$4.blur = function (editor) {
  editor.select({ isFocused: false });
};

Commands$4.deselect = function (editor) {
  var range = Selection.create();
  editor.select(range);
};

Commands$4.focus = function (editor) {
  editor.select({ isFocused: true });
};

Commands$4.flip = function (editor) {
  editor.command(proxy, 'flip');
};

Commands$4.moveAnchorBackward = function (editor) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  editor.command.apply(editor, [pointBackward, 'anchor'].concat(args));
};

Commands$4.moveAnchorWordBackward = function (editor) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  editor.command.apply(editor, [pointWordBackward, 'anchor'].concat(args));
};

Commands$4.moveAnchorForward = function (editor) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  editor.command.apply(editor, [pointForward, 'anchor'].concat(args));
};

Commands$4.moveAnchorWordForward = function (editor) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  editor.command.apply(editor, [pointWordForward, 'anchor'].concat(args));
};

Commands$4.moveAnchorTo = function (editor) {
  for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  editor.command.apply(editor, [proxy, 'moveAnchorTo'].concat(args));
};

Commands$4.moveAnchorToEndOfBlock = function (editor) {
  editor.command(pointEdgeObject, 'anchor', 'end', 'block');
};

Commands$4.moveAnchorToEndOfInline = function (editor) {
  editor.command(pointEdgeObject, 'anchor', 'end', 'inline');
};

Commands$4.moveAnchorToEndOfDocument = function (editor) {
  editor.moveAnchorToEndOfNode(editor.value.document).moveToAnchor();
};

Commands$4.moveAnchorToEndOfNextBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'end', 'next', 'block');
};

Commands$4.moveAnchorToEndOfNextInline = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'end', 'next', 'inline');
};

Commands$4.moveAnchorToEndOfNextText = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'end', 'next', 'text');
};

Commands$4.moveAnchorToEndOfNode = function (editor) {
  for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    args[_key6 - 1] = arguments[_key6];
  }

  editor.command.apply(editor, [proxy, 'moveAnchorToEndOfNode'].concat(args));
};

Commands$4.moveAnchorToEndOfPreviousBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'end', 'previous', 'block');
};

Commands$4.moveAnchorToEndOfPreviousInline = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'end', 'previous', 'inline');
};

Commands$4.moveAnchorToEndOfPreviousText = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'end', 'previous', 'text');
};

Commands$4.moveAnchorToEndOfText = function (editor) {
  editor.command(pointEdgeObject, 'anchor', 'end', 'text');
};

Commands$4.moveAnchorToStartOfBlock = function (editor) {
  editor.command(pointEdgeObject, 'anchor', 'start', 'block');
};

Commands$4.moveAnchorToStartOfDocument = function (editor) {
  editor.moveAnchorToStartOfNode(editor.value.document).moveToAnchor();
};

Commands$4.moveAnchorToStartOfInline = function (editor) {
  editor.command(pointEdgeObject, 'anchor', 'start', 'inline');
};

Commands$4.moveAnchorToStartOfNextBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'start', 'next', 'block');
};

Commands$4.moveAnchorToStartOfNextInline = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'start', 'next', 'inline');
};

Commands$4.moveAnchorToStartOfNextText = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'start', 'next', 'text');
};

Commands$4.moveAnchorToStartOfNode = function (editor) {
  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    args[_key7 - 1] = arguments[_key7];
  }

  editor.command.apply(editor, [proxy, 'moveAnchorToStartOfNode'].concat(args));
};

Commands$4.moveAnchorToStartOfPreviousBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'start', 'previous', 'block');
};

Commands$4.moveAnchorToStartOfPreviousInline = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'start', 'previous', 'inline');
};

Commands$4.moveAnchorToStartOfPreviousText = function (editor) {
  editor.command(pointEdgeSideObject, 'anchor', 'start', 'previous', 'text');
};

Commands$4.moveAnchorToStartOfText = function (editor) {
  editor.command(pointEdgeObject, 'anchor', 'start', 'text');
};

Commands$4.moveBackward = function (editor) {
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (chars === 0) return;

  var value = editor.value;
  var document = value.document,
      selection = value.selection;
  var start = selection.start;

  var startBlock = document.getClosestBlock(start.key);
  var o = startBlock.getOffset(start.key);
  var offset = o + start.offset;
  var text = startBlock.text;

  var charsOffset = TextUtils.getCharOffsetBackward(text, offset, chars);
  editor.moveAnchorBackward(charsOffset).moveFocusBackward(charsOffset);
};

Commands$4.moveWordBackward = function (editor) {
  for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
    args[_key8 - 1] = arguments[_key8];
  }

  editor.moveFocusWordBackward.apply(editor, args).moveToFocus();
};

Commands$4.moveEndBackward = function (editor) {
  for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
    args[_key9 - 1] = arguments[_key9];
  }

  editor.command.apply(editor, [pointBackward, 'end'].concat(args));
};

Commands$4.moveEndWordBackward = function (editor) {
  for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
    args[_key10 - 1] = arguments[_key10];
  }

  editor.command.apply(editor, [pointWordBackward, 'end'].concat(args));
};

Commands$4.moveEndForward = function (editor) {
  for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
    args[_key11 - 1] = arguments[_key11];
  }

  editor.command.apply(editor, [pointForward, 'end'].concat(args));
};

Commands$4.moveEndWordForward = function (editor) {
  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
    args[_key12 - 1] = arguments[_key12];
  }

  editor.command.apply(editor, [pointWordForward, 'end'].concat(args));
};

Commands$4.moveEndTo = function (editor) {
  for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
    args[_key13 - 1] = arguments[_key13];
  }

  editor.command.apply(editor, [proxy, 'moveEndTo'].concat(args));
};

Commands$4.moveEndToEndOfBlock = function (editor) {
  editor.command(pointEdgeObject, 'end', 'end', 'block');
};

Commands$4.moveEndToEndOfDocument = function (editor) {
  editor.moveEndToEndOfNode(editor.value.document).moveToEnd();
};

Commands$4.moveEndToEndOfInline = function (editor) {
  editor.command(pointEdgeObject, 'end', 'end', 'inline');
};

Commands$4.moveEndToEndOfNextBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'end', 'next', 'block');
};

Commands$4.moveEndToEndOfNextInline = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'end', 'next', 'inline');
};

Commands$4.moveEndToEndOfNextText = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'end', 'next', 'text');
};

Commands$4.moveEndToEndOfNode = function (editor) {
  for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
    args[_key14 - 1] = arguments[_key14];
  }

  editor.command.apply(editor, [proxy, 'moveEndToEndOfNode'].concat(args));
};

Commands$4.moveEndToEndOfPreviousBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'end', 'previous', 'block');
};

Commands$4.moveEndToEndOfPreviousInline = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'end', 'previous', 'inline');
};

Commands$4.moveEndToEndOfPreviousText = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'end', 'previous', 'text');
};

Commands$4.moveEndToEndOfText = function (editor) {
  editor.command(pointEdgeObject, 'end', 'end', 'text');
};

Commands$4.moveEndToStartOfBlock = function (editor) {
  editor.command(pointEdgeObject, 'end', 'start', 'block');
};

Commands$4.moveEndToStartOfDocument = function (editor) {
  editor.moveEndToStartOfNode(editor.value.document).moveToEnd();
};

Commands$4.moveEndToStartOfInline = function (editor) {
  editor.command(pointEdgeObject, 'end', 'start', 'inline');
};

Commands$4.moveEndToStartOfNextBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'start', 'next', 'block');
};

Commands$4.moveEndToStartOfNextInline = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'start', 'next', 'inline');
};

Commands$4.moveEndToStartOfNextText = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'start', 'next', 'text');
};

Commands$4.moveEndToStartOfNode = function (editor) {
  for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
    args[_key15 - 1] = arguments[_key15];
  }

  editor.command.apply(editor, [proxy, 'moveEndToStartOfNode'].concat(args));
};

Commands$4.moveEndToStartOfPreviousBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'start', 'previous', 'block');
};

Commands$4.moveEndToStartOfPreviousInline = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'start', 'previous', 'inline');
};

Commands$4.moveEndToStartOfPreviousText = function (editor) {
  editor.command(pointEdgeSideObject, 'end', 'start', 'previous', 'text');
};

Commands$4.moveEndToStartOfText = function (editor) {
  editor.command(pointEdgeObject, 'end', 'start', 'text');
};

Commands$4.moveFocusBackward = function (editor) {
  for (var _len16 = arguments.length, args = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
    args[_key16 - 1] = arguments[_key16];
  }

  editor.command.apply(editor, [pointBackward, 'focus'].concat(args));
};

Commands$4.moveFocusWordBackward = function (editor) {
  for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
    args[_key17 - 1] = arguments[_key17];
  }

  editor.command.apply(editor, [pointWordBackward, 'focus'].concat(args));
};

Commands$4.moveFocusForward = function (editor) {
  for (var _len18 = arguments.length, args = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
    args[_key18 - 1] = arguments[_key18];
  }

  editor.command.apply(editor, [pointForward, 'focus'].concat(args));
};

Commands$4.moveFocusWordForward = function (editor) {
  for (var _len19 = arguments.length, args = Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
    args[_key19 - 1] = arguments[_key19];
  }

  editor.command.apply(editor, [pointWordForward, 'focus'].concat(args));
};

Commands$4.moveFocusTo = function (editor) {
  for (var _len20 = arguments.length, args = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
    args[_key20 - 1] = arguments[_key20];
  }

  editor.command.apply(editor, [proxy, 'moveFocusTo'].concat(args));
};

Commands$4.moveFocusToEndOfBlock = function (editor) {
  editor.command(pointEdgeObject, 'focus', 'end', 'block');
};

Commands$4.moveFocusToEndOfDocument = function (editor) {
  editor.moveFocusToEndOfNode(editor.value.document).moveToFocus();
};

Commands$4.moveFocusToEndOfInline = function (editor) {
  editor.command(pointEdgeObject, 'focus', 'end', 'inline');
};

Commands$4.moveFocusToEndOfNextBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'end', 'next', 'block');
};

Commands$4.moveFocusToEndOfNextInline = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'end', 'next', 'inline');
};

Commands$4.moveFocusToEndOfNextText = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'end', 'next', 'text');
};

Commands$4.moveFocusToEndOfNode = function (editor) {
  for (var _len21 = arguments.length, args = Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
    args[_key21 - 1] = arguments[_key21];
  }

  editor.command.apply(editor, [proxy, 'moveFocusToEndOfNode'].concat(args));
};

Commands$4.moveFocusToEndOfPreviousBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'end', 'previous', 'block');
};

Commands$4.moveFocusToEndOfPreviousInline = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'end', 'previous', 'inline');
};

Commands$4.moveFocusToEndOfPreviousText = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'end', 'previous', 'text');
};

Commands$4.moveFocusToEndOfText = function (editor) {
  editor.command(pointEdgeObject, 'focus', 'end', 'text');
};

Commands$4.moveFocusToStartOfBlock = function (editor) {
  editor.command(pointEdgeObject, 'focus', 'start', 'block');
};

Commands$4.moveFocusToStartOfDocument = function (editor) {
  editor.moveFocusToStartOfNode(editor.value.document).moveToFocus();
};

Commands$4.moveFocusToStartOfInline = function (editor) {
  editor.command(pointEdgeObject, 'focus', 'start', 'inline');
};

Commands$4.moveFocusToStartOfNextBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'start', 'next', 'block');
};

Commands$4.moveFocusToStartOfNextInline = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'start', 'next', 'inline');
};

Commands$4.moveFocusToStartOfNextText = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'start', 'next', 'text');
};

Commands$4.moveFocusToStartOfNode = function (editor) {
  for (var _len22 = arguments.length, args = Array(_len22 > 1 ? _len22 - 1 : 0), _key22 = 1; _key22 < _len22; _key22++) {
    args[_key22 - 1] = arguments[_key22];
  }

  editor.command.apply(editor, [proxy, 'moveFocusToStartOfNode'].concat(args));
};

Commands$4.moveFocusToStartOfPreviousBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'start', 'previous', 'block');
};

Commands$4.moveFocusToStartOfPreviousInline = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'start', 'previous', 'inline');
};

Commands$4.moveFocusToStartOfPreviousText = function (editor) {
  editor.command(pointEdgeSideObject, 'focus', 'start', 'previous', 'text');
};

Commands$4.moveFocusToStartOfText = function (editor) {
  editor.command(pointEdgeObject, 'focus', 'start', 'text');
};

Commands$4.moveForward = function (editor) {
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (chars === 0) return;

  var value = editor.value;
  var document = value.document,
      selection = value.selection;
  var start = selection.start;

  var startBlock = document.getClosestBlock(start.path);
  var o = startBlock.getOffset(start.key);
  var offset = o + start.offset;
  var text = startBlock.text;

  var charsOffset = TextUtils.getCharOffsetForward(text, offset, chars);
  editor.moveAnchorForward(charsOffset).moveFocusForward(charsOffset);
};

Commands$4.moveWordForward = function (editor) {
  var _editor$moveFocusWord;

  for (var _len23 = arguments.length, args = Array(_len23 > 1 ? _len23 - 1 : 0), _key23 = 1; _key23 < _len23; _key23++) {
    args[_key23 - 1] = arguments[_key23];
  }

  (_editor$moveFocusWord = editor.moveFocusWordForward.apply(editor, args)).moveToFocus.apply(_editor$moveFocusWord, args);
};

Commands$4.moveStartBackward = function (editor) {
  for (var _len24 = arguments.length, args = Array(_len24 > 1 ? _len24 - 1 : 0), _key24 = 1; _key24 < _len24; _key24++) {
    args[_key24 - 1] = arguments[_key24];
  }

  editor.command.apply(editor, [pointBackward, 'start'].concat(args));
};

Commands$4.moveStartWordBackward = function (editor) {
  for (var _len25 = arguments.length, args = Array(_len25 > 1 ? _len25 - 1 : 0), _key25 = 1; _key25 < _len25; _key25++) {
    args[_key25 - 1] = arguments[_key25];
  }

  editor.command.apply(editor, [pointWordBackward, 'start'].concat(args));
};

Commands$4.moveStartForward = function (editor) {
  for (var _len26 = arguments.length, args = Array(_len26 > 1 ? _len26 - 1 : 0), _key26 = 1; _key26 < _len26; _key26++) {
    args[_key26 - 1] = arguments[_key26];
  }

  editor.command.apply(editor, [pointForward, 'start'].concat(args));
};

Commands$4.moveStartWordForward = function (editor) {
  for (var _len27 = arguments.length, args = Array(_len27 > 1 ? _len27 - 1 : 0), _key27 = 1; _key27 < _len27; _key27++) {
    args[_key27 - 1] = arguments[_key27];
  }

  editor.command.apply(editor, [pointWordForward, 'start'].concat(args));
};

Commands$4.moveStartTo = function (editor) {
  for (var _len28 = arguments.length, args = Array(_len28 > 1 ? _len28 - 1 : 0), _key28 = 1; _key28 < _len28; _key28++) {
    args[_key28 - 1] = arguments[_key28];
  }

  editor.command.apply(editor, [proxy, 'moveStartTo'].concat(args));
};

Commands$4.moveStartToEndOfBlock = function (editor) {
  editor.command(pointEdgeObject, 'start', 'end', 'block');
};

Commands$4.moveStartToEndOfDocument = function (editor) {
  editor.moveStartToEndOfNode(editor.value.document).moveToStart();
};

Commands$4.moveStartToEndOfInline = function (editor) {
  editor.command(pointEdgeObject, 'start', 'end', 'inline');
};

Commands$4.moveStartToEndOfNextBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'end', 'next', 'block');
};

Commands$4.moveStartToEndOfNextInline = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'end', 'next', 'inline');
};

Commands$4.moveStartToEndOfNextText = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'end', 'next', 'text');
};

Commands$4.moveStartToEndOfNode = function (editor) {
  for (var _len29 = arguments.length, args = Array(_len29 > 1 ? _len29 - 1 : 0), _key29 = 1; _key29 < _len29; _key29++) {
    args[_key29 - 1] = arguments[_key29];
  }

  editor.command.apply(editor, [proxy, 'moveStartToEndOfNode'].concat(args));
};

Commands$4.moveStartToEndOfPreviousBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'end', 'previous', 'block');
};

Commands$4.moveStartToEndOfPreviousInline = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'end', 'previous', 'inline');
};

Commands$4.moveStartToEndOfPreviousText = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'end', 'previous', 'text');
};

Commands$4.moveStartToEndOfText = function (editor) {
  editor.command(pointEdgeObject, 'start', 'end', 'text');
};

Commands$4.moveStartToStartOfBlock = function (editor) {
  editor.command(pointEdgeObject, 'start', 'start', 'block');
};

Commands$4.moveStartToStartOfDocument = function (editor) {
  editor.moveStartToStartOfNode(editor.value.document).moveToStart();
};

Commands$4.moveStartToStartOfInline = function (editor) {
  editor.command(pointEdgeObject, 'start', 'start', 'inline');
};

Commands$4.moveStartToStartOfNextBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'start', 'next', 'block');
};

Commands$4.moveStartToStartOfNextInline = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'start', 'next', 'inline');
};

Commands$4.moveStartToStartOfNextText = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'start', 'next', 'text');
};

Commands$4.moveStartToStartOfNode = function (editor) {
  for (var _len30 = arguments.length, args = Array(_len30 > 1 ? _len30 - 1 : 0), _key30 = 1; _key30 < _len30; _key30++) {
    args[_key30 - 1] = arguments[_key30];
  }

  editor.command.apply(editor, [proxy, 'moveStartToStartOfNode'].concat(args));
};

Commands$4.moveStartToStartOfPreviousBlock = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'start', 'previous', 'block');
};

Commands$4.moveStartToStartOfPreviousInline = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'start', 'previous', 'inline');
};

Commands$4.moveStartToStartOfPreviousText = function (editor) {
  editor.command(pointEdgeSideObject, 'start', 'start', 'previous', 'text');
};

Commands$4.moveStartToStartOfText = function (editor) {
  editor.command(pointEdgeObject, 'start', 'start', 'text');
};

Commands$4.moveTo = function (editor) {
  for (var _len31 = arguments.length, args = Array(_len31 > 1 ? _len31 - 1 : 0), _key31 = 1; _key31 < _len31; _key31++) {
    args[_key31 - 1] = arguments[_key31];
  }

  editor.command.apply(editor, [proxy, 'moveTo'].concat(args));
};

Commands$4.moveToAnchor = function (editor) {
  editor.command(proxy, 'moveToAnchor');
};

Commands$4.moveToEnd = function (editor) {
  editor.command(proxy, 'moveToEnd');
};

Commands$4.moveToEndOfBlock = function (editor) {
  editor.moveEndToEndOfBlock().moveToEnd();
};

Commands$4.moveToEndOfDocument = function (editor) {
  editor.moveEndToEndOfNode(editor.value.document).moveToEnd();
};

Commands$4.moveToEndOfInline = function (editor) {
  editor.moveEndToEndOfInline().moveToEnd();
};

Commands$4.moveToEndOfNextBlock = function (editor) {
  editor.moveEndToEndOfNextBlock().moveToEnd();
};

Commands$4.moveToEndOfNextInline = function (editor) {
  editor.moveEndToEndOfNextInline().moveToEnd();
};

Commands$4.moveToEndOfNextText = function (editor) {
  editor.moveEndToEndOfNextText().moveToEnd();
};

Commands$4.moveToEndOfNode = function (editor) {
  for (var _len32 = arguments.length, args = Array(_len32 > 1 ? _len32 - 1 : 0), _key32 = 1; _key32 < _len32; _key32++) {
    args[_key32 - 1] = arguments[_key32];
  }

  editor.command.apply(editor, [proxy, 'moveToEndOfNode'].concat(args));
};

Commands$4.moveToEndOfPreviousBlock = function (editor) {
  editor.moveStartToEndOfPreviousBlock().moveToStart();
};

Commands$4.moveToEndOfPreviousInline = function (editor) {
  editor.moveStartToEndOfPreviousInline().moveToStart();
};

Commands$4.moveToEndOfPreviousText = function (editor) {
  editor.moveStartToEndOfPreviousText().moveToStart();
};

Commands$4.moveToEndOfText = function (editor) {
  editor.moveEndToEndOfText().moveToEnd();
};

Commands$4.moveToFocus = function (editor) {
  editor.command(proxy, 'moveToFocus');
};

Commands$4.moveToRangeOfDocument = function (editor) {
  editor.moveToRangeOfNode(editor.value.document);
};

Commands$4.moveToRangeOfNode = function (editor) {
  for (var _len33 = arguments.length, args = Array(_len33 > 1 ? _len33 - 1 : 0), _key33 = 1; _key33 < _len33; _key33++) {
    args[_key33 - 1] = arguments[_key33];
  }

  editor.command.apply(editor, [proxy, 'moveToRangeOfNode'].concat(args));
};

Commands$4.moveToStart = function (editor) {
  editor.command(proxy, 'moveToStart');
};

Commands$4.moveToStartOfBlock = function (editor) {
  editor.moveStartToStartOfBlock().moveToStart();
};

Commands$4.moveToStartOfDocument = function (editor) {
  editor.moveStartToStartOfNode(editor.value.document).moveToStart();
};

Commands$4.moveToStartOfInline = function (editor) {
  editor.moveStartToStartOfInline().moveToStart();
};

Commands$4.moveToStartOfNextBlock = function (editor) {
  editor.moveEndToStartOfNextBlock().moveToEnd();
};

Commands$4.moveToStartOfNextInline = function (editor) {
  editor.moveEndToStartOfNextInline().moveToEnd();
};

Commands$4.moveToStartOfNextText = function (editor) {
  editor.moveEndToStartOfNextText().moveToEnd();
};

Commands$4.moveToStartOfNode = function (editor) {
  for (var _len34 = arguments.length, args = Array(_len34 > 1 ? _len34 - 1 : 0), _key34 = 1; _key34 < _len34; _key34++) {
    args[_key34 - 1] = arguments[_key34];
  }

  editor.command.apply(editor, [proxy, 'moveToStartOfNode'].concat(args));
};

Commands$4.moveToStartOfPreviousBlock = function (editor) {
  editor.moveStartToStartOfPreviousBlock().moveToStart();
};

Commands$4.moveToStartOfPreviousInline = function (editor) {
  editor.moveStartToStartOfPreviousInline().moveToStart();
};

Commands$4.moveToStartOfPreviousText = function (editor) {
  editor.moveStartToStartOfPreviousText().moveToStart();
};

Commands$4.moveToStartOfText = function (editor) {
  editor.moveStartToStartOfText().moveToStart();
};

Commands$4.select = function (editor, properties) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  properties = Selection.createProperties(properties);
  var _options$snapshot = options.snapshot,
      snapshot = _options$snapshot === undefined ? false : _options$snapshot;
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var newProperties = {};
  var next = selection.setProperties(properties);
  next = document.resolveSelection(next);

  // Re-compute the properties, to ensure that we get their normalized values.
  properties = pick(next, Object.keys(properties));

  // Remove any properties that are already equal to the current selection. And
  // create a dictionary of the previous values for all of the properties that
  // are being changed, for the inverse operation.
  for (var k in properties) {
    if (snapshot === true || !is(properties[k], selection[k])) {
      newProperties[k] = properties[k];
    }
  }

  // If the selection moves, clear any marks, unless the new selection
  // properties change the marks in some way.
  if (selection.marks && !newProperties.marks && (newProperties.anchor || newProperties.focus)) {
    newProperties.marks = null;
  }

  // If there are no new properties to set, abort to avoid extra operations.
  if (Object.keys(newProperties).length === 0) {
    return;
  }

  // TODO: for some reason toJSON() is required here (it breaks selections between blocks)? - 2018-10-10
  var prevProperties = pick(selection.toJSON(), Object.keys(newProperties));

  editor.applyOperation({
    type: 'set_selection',
    value: value,
    properties: prevProperties,
    newProperties: newProperties
  }, snapshot ? { skip: false, merge: false } : {});
};

Commands$4.setAnchor = function (editor) {
  for (var _len35 = arguments.length, args = Array(_len35 > 1 ? _len35 - 1 : 0), _key35 = 1; _key35 < _len35; _key35++) {
    args[_key35 - 1] = arguments[_key35];
  }

  editor.command.apply(editor, [proxy, 'setAnchor'].concat(args));
};

Commands$4.setEnd = function (editor) {
  for (var _len36 = arguments.length, args = Array(_len36 > 1 ? _len36 - 1 : 0), _key36 = 1; _key36 < _len36; _key36++) {
    args[_key36 - 1] = arguments[_key36];
  }

  editor.command.apply(editor, [proxy, 'setEnd'].concat(args));
};

Commands$4.setFocus = function (editor) {
  for (var _len37 = arguments.length, args = Array(_len37 > 1 ? _len37 - 1 : 0), _key37 = 1; _key37 < _len37; _key37++) {
    args[_key37 - 1] = arguments[_key37];
  }

  editor.command.apply(editor, [proxy, 'setFocus'].concat(args));
};

Commands$4.setStart = function (editor) {
  for (var _len38 = arguments.length, args = Array(_len38 > 1 ? _len38 - 1 : 0), _key38 = 1; _key38 < _len38; _key38++) {
    args[_key38 - 1] = arguments[_key38];
  }

  editor.command.apply(editor, [proxy, 'setStart'].concat(args));
};

Commands$4.snapshotSelection = function (editor) {
  editor.withoutMerging(function () {
    editor.select(editor.value.selection, { snapshot: true });
  });
};

/**
 * Helpers.
 */

function proxy(editor, method) {
  var _editor$value$selecti;

  for (var _len39 = arguments.length, args = Array(_len39 > 2 ? _len39 - 2 : 0), _key39 = 2; _key39 < _len39; _key39++) {
    args[_key39 - 2] = arguments[_key39];
  }

  var range = (_editor$value$selecti = editor.value.selection)[method].apply(_editor$value$selecti, args);
  editor.select(range);
}

function pointEdgeObject(editor, point, edge, object) {
  var Point = point.slice(0, 1).toUpperCase() + point.slice(1);
  var Edge = edge.slice(0, 1).toUpperCase() + edge.slice(1);
  var Object = object.slice(0, 1).toUpperCase() + object.slice(1);
  var method = 'move' + Point + 'To' + Edge + 'OfNode';
  var getNode = object === 'text' ? 'getNode' : 'getClosest' + Object;
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var p = selection[point];
  var node = document[getNode](p.key);
  if (!node) return;
  editor[method](node);
}

function pointEdgeSideObject(editor, point, edge, side, object) {
  var Point = point.slice(0, 1).toUpperCase() + point.slice(1);
  var Edge = edge.slice(0, 1).toUpperCase() + edge.slice(1);
  var Side = side.slice(0, 1).toUpperCase() + side.slice(1);
  var Object = object.slice(0, 1).toUpperCase() + object.slice(1);
  var method = 'move' + Point + 'To' + Edge + 'OfNode';
  var getNode = object === 'text' ? 'getNode' : 'getClosest' + Object;
  var getDirectionNode = 'get' + Side + Object;
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var p = selection[point];
  var node = document[getNode](p.key);
  if (!node) return;
  var target = document[getDirectionNode](node.key);
  if (!target) return;
  editor[method](target);
}

function pointBackward(editor, point) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (n === 0) return;
  if (n < 0) return pointForward(editor, point, -n);

  var Point = point.slice(0, 1).toUpperCase() + point.slice(1);
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var p = selection[point];
  var hasVoidParent = document.hasVoidParent(p.path, editor);

  // what is this?
  if (!hasVoidParent && p.offset - n >= 0) {
    var range = selection['move' + Point + 'Backward'](n);
    editor.select(range);
    return;
  }

  var previous = document.getPreviousText(p.path);
  if (!previous) return;

  var block = document.getClosestBlock(p.path);
  var isInBlock = block.hasNode(previous.key);
  var isPreviousInVoid = previous && document.hasVoidParent(previous.key, editor);
  editor['move' + Point + 'ToEndOfNode'](previous);

  // when is this called?
  if (!hasVoidParent && !isPreviousInVoid && isInBlock) {
    var _range = editor.value.selection['move' + Point + 'Backward'](n);
    editor.select(_range);
  }
}

function pointForward(editor, point) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (n === 0) return;
  if (n < 0) return pointBackward(editor, point, -n);

  var Point = point.slice(0, 1).toUpperCase() + point.slice(1);
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var p = selection[point];
  var text = document.getNode(p.path);
  var hasVoidParent = document.hasVoidParent(p.path, editor);

  // what is this?
  if (!hasVoidParent && p.offset + n <= text.text.length) {
    var range = selection['move' + Point + 'Forward'](n);
    editor.select(range);
    return;
  }

  var next = document.getNextText(p.path);
  if (!next) return;

  var block = document.getClosestBlock(p.path);
  var isInBlock = block.hasNode(next.key);
  var isNextInVoid = document.hasVoidParent(next.key, editor);
  editor['move' + Point + 'ToStartOfNode'](next);

  // when is this called?
  if (!hasVoidParent && !isNextInVoid && isInBlock) {
    var _range2 = editor.value.selection['move' + Point + 'Forward'](n);
    editor.select(_range2);
  }
}

function pointWordBackward(editor, pointName) {
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var point = selection[pointName];
  var block = document.getClosestBlock(point.key);
  var offset = block.getOffset(point.key);
  var o = offset + point.offset;
  var text = block.text;

  var n = TextUtils.getWordOffsetBackward(text, o);
  editor.command(pointBackward, pointName, n > 0 ? n : 1);
}

function pointWordForward(editor, pointName) {
  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  var point = selection[pointName];
  var block = document.getClosestBlock(point.key);
  var offset = block.getOffset(point.key);
  var o = offset + point.offset;
  var text = block.text;

  var n = TextUtils.getWordOffsetForward(text, o);
  editor.command(pointForward, pointName, n > 0 ? n : 1);
}

/**
 * Commands.
 *
 * @type {Object}
 */

var Commands$5 = {};

/**
 * Set `properties` on the value.
 *
 * @param {Editor} editor
 * @param {Object|Value} properties
 */

Commands$5.setData = function (editor) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var value = editor.value;

  var newProperties = Value.createProperties({ data: data });
  var prevProperties = pick(value, Object.keys(newProperties));

  editor.applyOperation({
    type: 'set_value',
    properties: prevProperties,
    newProperties: newProperties
  });
};

Commands$5.addAnnotation = function (editor, annotation) {
  annotation = Annotation.create(annotation);

  editor.applyOperation({
    type: 'add_annotation',
    annotation: annotation
  });
};

Commands$5.removeAnnotation = function (editor, annotation) {
  annotation = Annotation.create(annotation);

  editor.applyOperation({
    type: 'remove_annotation',
    annotation: annotation
  });
};

Commands$5.setAnnotation = function (editor, annotation, newProperties) {
  annotation = Annotation.create(annotation);
  newProperties = Annotation.createProperties(newProperties);

  editor.applyOperation({
    type: 'set_annotation',
    properties: annotation,
    newProperties: newProperties
  });
};

Commands$5.setAnnotations = function (editor) {
  var annotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var value = editor.value;

  var newProperties = Value.createProperties({ annotations: annotations });
  var prevProperties = pick(value, Object.keys(newProperties));

  editor.applyOperation({
    type: 'set_value',
    properties: prevProperties,
    newProperties: newProperties
  });
};

/**
 * A plugin that adds a set of queries to the editor.
 *
 * @param {Object} queries
 * @return {Object}
 */

function QueriesPlugin() {
  var queries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  /**
   * On construct, register all the queries.
   *
   * @param {Editor} editor
   * @param {Function} next
   */

  function onConstruct(editor, next) {
    for (var query in queries) {
      editor.registerQuery(query);
    }

    return next();
  }

  /**
   * On query, if it exists in our list of queries, call it.
   *
   * @param {Object} query
   * @param {Editor} editor
   * @param {Function} next
   */

  function onQuery(query, editor, next) {
    var type = query.type,
        args = query.args;

    var fn = queries[type];
    if (!fn) return next();
    var ret = fn.apply(undefined, [editor].concat(toConsumableArray(args)));
    return ret === undefined ? next() : ret;
  }

  /**
   * Return the plugin.
   *
   * @type {Object}
   */

  return {
    onConstruct: onConstruct,
    onQuery: onQuery
  };
}

/**
 * Define a Slate error.
 *
 * @type {SlateError}
 */

var SlateError = function (_Error) {
  inherits(SlateError, _Error);

  function SlateError(code) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, SlateError);

    var _this = possibleConstructorReturn(this, (SlateError.__proto__ || Object.getPrototypeOf(SlateError)).call(this, code));

    _this.code = code;

    for (var key in attrs) {
      _this[key] = attrs[key];
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error().stack;
    }
    return _this;
  }

  return SlateError;
}(Error);

/**
 * Create a plugin from a `schema` definition.
 *
 * @param {Object} schema
 * @return {Object}
 */

function SchemaPlugin(schema) {
  var rules = schema.rules,
      document = schema.document,
      blocks = schema.blocks,
      inlines = schema.inlines,
      marks = schema.marks,
      annotations = schema.annotations,
      decorations = schema.decorations;

  var schemaRules = [];

  if (rules) {
    schemaRules = schemaRules.concat(rules);
  }

  if (document) {
    schemaRules.push(_extends({
      match: [{ object: 'document' }]
    }, document));
  }

  if (blocks) {
    for (var key in blocks) {
      schemaRules.push(_extends({
        match: [{ object: 'block', type: key }]
      }, blocks[key]));
    }
  }

  if (inlines) {
    for (var _key in inlines) {
      schemaRules.push(_extends({
        match: [{ object: 'inline', type: _key }]
      }, inlines[_key]));
    }
  }

  if (marks) {
    for (var _key2 in marks) {
      schemaRules.push(_extends({
        match: [{ object: 'mark', type: _key2 }]
      }, marks[_key2]));
    }
  }

  if (annotations) {
    for (var _key3 in annotations) {
      schemaRules.push(_extends({
        match: [{ object: 'annotation', type: _key3 }]
      }, annotations[_key3]));
    }
  }

  if (decorations) {
    for (var _key4 in decorations) {
      schemaRules.push(_extends({
        match: [{ object: 'decoration', type: _key4 }]
      }, decorations[_key4]));
    }
  }

  /**
   * Check if a `format` is atomic based on the schema rules.
   *
   * @param {Editor} editor
   * @param {Format} format
   * @return {Boolean}
   */

  function isAtomic(editor, format) {
    var rule = schemaRules.find(function (r) {
      return 'isAtomic' in r && testRules(format, r.match);
    });

    return rule && rule.isAtomic;
  }

  /**
   * Check if a `node` is void based on the schema rules.
   *
   * @param {Editor} editor
   * @param {Node} node
   * @return {Boolean}
   */

  function isVoid(editor, node) {
    var rule = schemaRules.find(function (r) {
      return 'isVoid' in r && testRules(node, r.match);
    });

    return rule && rule.isVoid;
  }

  /**
   * Normalize a `node` with the schema rules, returning a function that will
   * fix the invalid node, or void if the node is valid.
   *
   * @param {Node} node
   * @param {Editor} editor
   * @param {Function} next
   * @return {Function|Void}
   */

  function normalizeNode(node, editor, next) {
    var error = validateNode(node, editor, function () {});
    if (!error) return next();

    return function () {
      var rule = error.rule;
      var size = editor.operations.size;

      // First run the user-provided `normalize` function if one exists...

      if (rule.normalize) {
        rule.normalize(editor, error);
      }

      // If the `normalize` function did not add any operations to the editor
      // object, it can't have normalized, so run the default one.
      if (editor.operations.size === size) {
        defaultNormalize(editor, error);
      }
    };
  }

  /**
   * Validate a `node` with the schema rules, returning a `SlateError` if it's
   * invalid.
   *
   * @param {Node} node
   * @param {Editor} editor
   * @param {Function} next
   * @return {Error|Void}
   */

  function validateNode(node, editor, next) {
    var matches = schemaRules.filter(function (r) {
      return testRules(node, r.match);
    });
    var failure = validateRules(node, matches, schemaRules, { every: true });
    if (!failure) return next();
    var error = new SlateError(failure.code, failure);
    return error;
  }

  /**
   * On schema-related queries, respond if we can.
   *
   * @param {Object} query
   * @param {Function} next
   */

  var queries = QueriesPlugin({ isAtomic: isAtomic, isVoid: isVoid });

  /**
   * Return the plugins.
   *
   * @type {Object}
   */

  return [{ normalizeNode: normalizeNode, validateNode: validateNode }, queries];
}

/**
 * Normalize an invalid value with `error` with default remedies.
 *
 * @param {Editor} editor
 * @param {SlateError} error
 */

function defaultNormalize(editor, error) {
  var code = error.code,
      node = error.node,
      child = error.child,
      next = error.next,
      previous = error.previous,
      key = error.key,
      mark = error.mark;


  switch (code) {
    case 'child_max_invalid':
    case 'child_object_invalid':
    case 'child_type_invalid':
    case 'child_unknown':
    case 'first_child_object_invalid':
    case 'first_child_type_invalid':
    case 'last_child_object_invalid':
    case 'last_child_type_invalid':
      {
        return child.object === 'text' && node.object === 'block' && node.nodes.size === 1 ? editor.removeNodeByKey(node.key) : editor.removeNodeByKey(child.key);
      }

    case 'previous_sibling_object_invalid':
    case 'previous_sibling_type_invalid':
      {
        return previous.object === 'text' && node.object === 'block' && node.nodes.size === 1 ? editor.removeNodeByKey(node.key) : editor.removeNodeByKey(previous.key);
      }

    case 'next_sibling_object_invalid':
    case 'next_sibling_type_invalid':
      {
        return next.object === 'text' && node.object === 'block' && node.nodes.size === 1 ? editor.removeNodeByKey(node.key) : editor.removeNodeByKey(next.key);
      }

    case 'child_min_invalid':
    case 'node_text_invalid':
    case 'parent_object_invalid':
    case 'parent_type_invalid':
      {
        return node.object === 'document' ? node.nodes.forEach(function (n) {
          return editor.removeNodeByKey(n.key);
        }) : editor.removeNodeByKey(node.key);
      }

    case 'node_data_invalid':
      {
        return node.data.get(key) === undefined && node.object !== 'document' ? editor.removeNodeByKey(node.key) : editor.setNodeByKey(node.key, { data: node.data.delete(key) });
      }

    case 'node_mark_invalid':
      {
        return node.getTexts().forEach(function (t) {
          return editor.removeMarkByKey(t.key, 0, t.text.length, mark);
        });
      }

    default:
      {
        return editor.removeNodeByKey(node.key);
      }
  }
}

/**
 * Check that an `object` matches one of a set of `rules`.
 *
 * @param {Mixed} object
 * @param {Object|Array} rules
 * @return {Boolean}
 */

function testRules(object, rules) {
  var error = validateRules(object, rules);
  return !error;
}

/**
 * Validate that a `object` matches a `rule` object or array.
 *
 * @param {Mixed} object
 * @param {Object|Array} rule
 * @param {Array|Void} rules
 * @return {Error|Void}
 */

function validateRules(object, rule, rules) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$every = options.every,
      every = _options$every === undefined ? false : _options$every,
      _options$match = options.match,
      match = _options$match === undefined ? null : _options$match;


  if (typeof rule === 'function') {
    var valid = rule(object, match);
    return valid ? null : fail('node_invalid', { rule: rule, node: object });
  }

  if (Array.isArray(rule)) {
    var array = rule.length ? rule : [{}];
    var first = void 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var r = _step.value;

        var _error = validateRules(object, r, rules);
        first = first || _error;
        if (every && _error) return _error;
        if (!every && !_error) return;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return first;
  }

  var error = validateObject(object, rule) || validateType(object, rule) || validateData(object, rule) || validateMarks(object, rule) || validateText(object, rule) || validateFirst(object, rule) || validateLast(object, rule) || validateNodes(object, rule, rules);

  return error;
}

function validateObject(node, rule) {
  if (rule.object == null) return;
  if (rule.object === node.object) return;
  if (typeof rule.object === 'function' && rule.object(node.object)) return;
  return fail('node_object_invalid', { rule: rule, node: node });
}

function validateType(node, rule) {
  if (rule.type == null) return;
  if (rule.type === node.type) return;
  if (typeof rule.type === 'function' && rule.type(node.type)) return;
  return fail('node_type_invalid', { rule: rule, node: node });
}

function validateData(node, rule) {
  if (rule.data == null) return;
  if (node.data == null) return;

  if (typeof rule.data === 'function') {
    if (rule.data(node.data)) return;
    return fail('node_data_invalid', { rule: rule, node: node });
  }

  for (var key in rule.data) {
    var fn = rule.data[key];
    var value = node.data && node.data.get(key);
    var valid = typeof fn === 'function' ? fn(value) : fn === value;
    if (valid) continue;
    return fail('node_data_invalid', { rule: rule, node: node, key: key, value: value });
  }
}

function validateMarks(node, rule) {
  if (rule.marks == null) return;

  var marks = node.object === 'text' ? node.marks.toArray() : node.getMarks().toArray();

  var _loop = function _loop(mark) {
    var valid = rule.marks.some(function (def) {
      return typeof def.type === 'function' ? def.type(mark.type) : def.type === mark.type;
    });
    if (valid) return 'continue';
    return {
      v: fail('node_mark_invalid', { rule: rule, node: node, mark: mark })
    };
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = marks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var mark = _step2.value;

      var _ret = _loop(mark);

      switch (_ret) {
        case 'continue':
          continue;

        default:
          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function validateText(node, rule) {
  if (rule.text == null) return;
  var text = node.text;

  var valid = typeof rule.text === 'function' ? rule.text(text) : rule.text.test(text);
  if (valid) return;
  return fail('node_text_invalid', { rule: rule, node: node, text: text });
}

function validateFirst(node, rule) {
  if (rule.first == null) return;
  var first = node.nodes.first();
  if (!first) return;
  var error = validateRules(first, rule.first);
  if (!error) return;
  error.rule = rule;
  error.node = node;
  error.child = first;
  error.code = error.code.replace('node_', 'first_child_');
  return error;
}

function validateLast(node, rule) {
  if (rule.last == null) return;
  var last = node.nodes.last();
  if (!last) return;
  var error = validateRules(last, rule.last);
  if (!error) return;
  error.rule = rule;
  error.node = node;
  error.child = last;
  error.code = error.code.replace('node_', 'last_child_');
  return error;
}

function validateNodes(node, rule) {
  var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (node.nodes == null) return;

  var children = node.nodes;
  var defs = rule.nodes != null ? rule.nodes.slice() : [];
  var count = 0;
  var lastCount = 0;
  var min = null;
  var index = -1;
  var def = null;
  var max = null;
  var child = null;
  var previous = null;
  var next = null;

  function nextDef() {
    if (defs.length === 0) return false;
    def = defs.shift();
    lastCount = count;
    count = 0;
    min = def.min || null;
    max = def.max || null;
    return true;
  }

  function nextChild() {
    index += 1;
    previous = index ? children.get(index - 1) : null;
    child = children.get(index);
    next = children.get(index + 1);
    if (!child) return false;
    lastCount = count;
    count += 1;
    return true;
  }

  function rewind() {
    if (index > 0) {
      index -= 1;
      count = lastCount;
    }
  }

  if (rule.nodes != null) {
    nextDef();
  }

  while (nextChild()) {
    var err = validateParent(node, child, rules) || validatePrevious(node, child, previous, index, rules) || validateNext(node, child, next, index, rules);

    if (err) return err;

    if (rule.nodes != null) {
      if (!def) {
        return fail('child_unknown', { rule: rule, node: node, child: child, index: index });
      }

      if (def.match) {
        var error = validateRules(child, def.match);

        if (error) {
          // Since we want to report overflow on last matching child we don't
          // immediately check for count > max, but instead do so once we find
          // a child that doesn't match.
          if (max != null && count - 1 > max) {
            rewind();
            return fail('child_max_invalid', {
              rule: rule,
              node: node,
              index: index,
              child: children.get(index),
              count: count,
              limit: max
            });
          }

          var lastMin = min;

          // If there are more groups after this one then child might actually
          // be valid.
          if (nextDef()) {
            // If we've already satisfied the minimum for the current group,
            // then we can rewind and proceed to the next group.
            if (lastCount - 1 >= lastMin) {
              index -= 1;
              continue;
            }

            // Otherwise we know that current value is underflowing. There are
            // three possible causes for this...

            // 1. There might just not be enough elements for current group, and
            // current child is in fact the first of the next group. If so, the
            // next def will not report errors, in which case we can rewind and
            // report an minimum error.
            if (validateRules(child, def.match) == null) {
              rewind();
              return fail('child_min_invalid', {
                rule: rule,
                node: node,
                index: index,
                count: lastCount - 1,
                limit: lastMin
              });
            }

            // 2. The current group is underflowing, but there is also an
            // invalid child before the next group.
            // 3. Or the current group is not underflowing but it appears so
            // because there's an invalid child between its members.
            // It's either the second or third case. If it's the second then
            // we could report an underflow, but presence of an invalid child
            // is arguably more important, so we report it first. It also lets
            // us avoid checking for which case exactly is it.
            error.rule = rule;
            error.node = node;
            error.child = child;
            error.index = index;
            error.code = error.code.replace('node_', 'child_');
            return error;
          }

          // Otherwise either we exhausted the last group, in which case it's
          // an unknown child, ...
          if (max != null && count > max) {
            return fail('child_unknown', { rule: rule, node: node, child: child, index: index });
          }

          // ... or it's an invalid child for the last group.
          error.rule = rule;
          error.node = node;
          error.child = child;
          error.index = index;
          error.code = error.code.replace('node_', 'child_');
          return error;
        }
      }
    }
  }

  // Since we want to report overflow on last matching child we don't
  // immediately check for count > max, but do so after processing all nodes.
  if (max != null && count > max) {
    return fail('child_max_invalid', {
      rule: rule,
      node: node,
      index: index - 1,
      count: count,
      child: children.get(index - 1),
      limit: max
    });
  }

  if (rule.nodes != null) {
    do {
      if (count < min) {
        return fail('child_min_invalid', {
          rule: rule,
          node: node,
          index: index,
          count: count,
          limit: min
        });
      }
    } while (nextDef());
  }
}

function validateParent(node, child, rules) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = rules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var rule = _step3.value;

      if (rule.parent == null) continue;
      if (!testRules(child, rule.match)) continue;

      var error = validateRules(node, rule.parent);
      if (!error) continue;

      error.rule = rule;
      error.parent = node;
      error.node = child;
      error.code = error.code.replace('node_', 'parent_');
      return error;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function validatePrevious(node, child, previous, index, rules) {
  if (!previous) return;

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = rules[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var rule = _step4.value;

      if (rule.previous == null) continue;
      if (!testRules(child, rule.match)) continue;

      var error = validateRules(previous, rule.previous);
      if (!error) continue;

      error.rule = rule;
      error.node = node;
      error.child = child;
      error.index = index;
      error.previous = previous;
      error.code = error.code.replace('node_', 'previous_sibling_');
      return error;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

function validateNext(node, child, next, index, rules) {
  if (!next) return;

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = rules[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var rule = _step5.value;

      if (rule.next == null) continue;
      if (!testRules(child, rule.match)) continue;

      var error = validateRules(next, rule.next, [], { match: child });
      if (!error) continue;

      error.rule = rule;
      error.node = node;
      error.child = child;
      error.index = index;
      error.next = next;
      error.code = error.code.replace('node_', 'next_sibling_');
      return error;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}

/**
 * Create an interim failure object with `code` and `attrs`.
 *
 * @param {String} code
 * @param {Object} attrs
 * @return {Object}
 */

function fail(code, attrs) {
  return _extends({ code: code }, attrs);
}

/**
 * Ensure that an expanded selection is deleted first using the `editor.delete`
 * command. This guarantees that it uses the proper semantic "intent" instead of
 * using `deleteAtRange` under the covers and skipping `delete`.
 *
 * @param {Editor}
 */

function deleteExpanded(editor) {
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  }
}

/**
 * Commands.
 *
 * @type {Object}
 */

var Commands$6 = {};

/**
 * Add a `mark` to the characters in the current selection.
 *
 * @param {Editor} editor
 * @param {Mark} mark
 */

Commands$6.addMark = function (editor, mark) {
  mark = Mark.create(mark);
  var value = editor.value;
  var document = value.document,
      selection = value.selection;


  if (selection.isExpanded) {
    editor.addMarkAtRange(selection, mark);
  } else if (selection.marks) {
    var marks = selection.marks.add(mark);
    var sel = selection.set('marks', marks);
    editor.select(sel);
  } else {
    var _marks = document.getActiveMarksAtRange(selection).add(mark);
    var _sel = selection.set('marks', _marks);
    editor.select(_sel);
  }
};

/**
 * Add a list of `marks` to the characters in the current selection.
 *
 * @param {Editor} editor
 * @param {Set<Mark>|Array<Object>} marks
 */

Commands$6.addMarks = function (editor, marks) {
  marks.forEach(function (mark) {
    return editor.addMark(mark);
  });
};

/**
 * Delete at the current selection.
 *
 * @param {Editor} editor
 */

Commands$6.delete = function (editor) {
  var value = editor.value;
  var selection = value.selection;

  editor.deleteAtRange(selection);

  // COMPAT: Ensure that the selection is collapsed, because in certain cases
  // when deleting across inline nodes, when splitting the inline node the end
  // point of the selection will end up after the split point.
  editor.moveToFocus();
};

/**
 * Delete backward `n` characters.
 *
 * @param {Editor} editor
 * @param {Number} n (optional)
 */

Commands$6.deleteBackward = function (editor) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  } else {
    editor.deleteBackwardAtRange(selection, n);
  }
};

/**
 * Delete backward one character.
 *
 * @param {Editor} editor
 */

Commands$6.deleteCharBackward = function (editor) {
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  } else {
    editor.deleteCharBackwardAtRange(selection);
  }
};

/**
 * Delete backward one line.
 *
 * @param {Editor} editor
 */

Commands$6.deleteLineBackward = function (editor) {
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  } else {
    editor.deleteLineBackwardAtRange(selection);
  }
};

/**
 * Delete backward one word.
 *
 * @param {Editor} editor
 */

Commands$6.deleteWordBackward = function (editor) {
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  } else {
    editor.deleteWordBackwardAtRange(selection);
  }
};

/**
 * Delete backward `n` characters.
 *
 * @param {Editor} editor
 * @param {Number} n (optional)
 */

Commands$6.deleteForward = function (editor) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  } else {
    editor.deleteForwardAtRange(selection, n);
  }
};

/**
 * Delete backward one character.
 *
 * @param {Editor} editor
 */

Commands$6.deleteCharForward = function (editor) {
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  } else {
    editor.deleteCharForwardAtRange(selection);
  }
};

/**
 * Delete backward one line.
 *
 * @param {Editor} editor
 */

Commands$6.deleteLineForward = function (editor) {
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  } else {
    editor.deleteLineForwardAtRange(selection);
  }
};

/**
 * Delete backward one word.
 *
 * @param {Editor} editor
 */

Commands$6.deleteWordForward = function (editor) {
  var value = editor.value;
  var selection = value.selection;


  if (selection.isExpanded) {
    editor.delete();
  } else {
    editor.deleteWordForwardAtRange(selection);
  }
};

/**
 * Insert a `block` at the current selection.
 *
 * @param {Editor} editor
 * @param {String|Object|Block} block
 */

Commands$6.insertBlock = function (editor, block) {
  deleteExpanded(editor);

  block = Block.create(block);
  var value = editor.value;
  var selection = value.selection;

  editor.insertBlockAtRange(selection, block);

  // If the node was successfully inserted, update the selection.
  var node = editor.value.document.getNode(block.key);
  if (node) editor.moveToEndOfNode(node);
};

/**
 * Insert a `fragment` at the current selection.
 *
 * @param {Editor} editor
 * @param {Document} fragment
 */

Commands$6.insertFragment = function (editor, fragment) {
  if (!fragment.nodes.size) return;

  deleteExpanded(editor);

  var value = editor.value;
  var _value = value,
      document = _value.document,
      selection = _value.selection;
  var start = selection.start;

  var keys = Array.from(document.texts(), function (_ref) {
    var _ref2 = slicedToArray(_ref, 1),
        text = _ref2[0];

    return text.key;
  });

  editor.insertFragmentAtRange(selection, fragment);
  value = editor.value;
  document = value.document;

  var newTexts = document.getTexts().filter(function (n) {
    return !keys.includes(n.key);
  });
  if (newTexts.size === 0) return;
  var fragmentLength = fragment.text.length;

  // Either startText is still here, or we want the first un-previously known text
  var startText = document.getNode(start.key) || newTexts.first();
  // We want the last un-previously known text
  var endText = newTexts.last() || startText;

  if (startText === endText) {
    editor.moveTo(endText.key, fragmentLength);
    return;
  }

  // Everything will be calculated relative to the first common ancestor to optimize speed
  var parent = document.getCommonAncestor(startText.key, endText.key);

  var startOffset = parent.getOffset(startText.key) + (start.key === startText.key ? start.offset : 0);

  // endText might not be the last un-previously known text node, so we precisely pick it by offset
  endText = parent.getTextAtOffset(startOffset + fragmentLength - 1) || endText;

  editor.moveTo(endText.key, startOffset + fragmentLength - parent.getOffset(endText.key));
};

/**
 * Insert an `inline` at the current selection.
 *
 * @param {Editor} editor
 * @param {String|Object|Inline} inline
 */

Commands$6.insertInline = function (editor, inline) {
  deleteExpanded(editor);

  inline = Inline.create(inline);
  var value = editor.value;
  var selection = value.selection;

  editor.insertInlineAtRange(selection, inline);

  // If the node was successfully inserted, update the selection.
  var node = editor.value.document.getNode(inline.key);
  if (node) editor.moveToEndOfNode(node);
};

/**
 * Insert a string of `text` with optional `marks` at the current selection.
 *
 * @param {Editor} editor
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Commands$6.insertText = function (editor, text, marks) {
  deleteExpanded(editor);

  var value = editor.value;
  var document = value.document,
      selection = value.selection;

  marks = marks || selection.marks || document.getInsertMarksAtRange(selection);

  editor.withoutNormalizing(function () {
    editor.insertTextAtRange(selection, text, marks);

    // If the text was successfully inserted, and the selection had marks on it,
    // unset the selection's marks.
    if (selection.marks && document !== editor.value.document) {
      editor.select({ marks: null });
    }
  });
};

/**
 * Remove a `mark` from the characters in the current selection.
 *
 * @param {Editor} editor
 * @param {Mark} mark
 */

Commands$6.removeMark = function (editor, mark) {
  mark = Mark.create(mark);
  var value = editor.value;
  var document = value.document,
      selection = value.selection;


  if (selection.isExpanded) {
    editor.removeMarkAtRange(selection, mark);
  } else if (selection.marks) {
    var marks = selection.marks.remove(mark);
    var sel = selection.set('marks', marks);
    editor.select(sel);
  } else {
    var _marks2 = document.getActiveMarksAtRange(selection).remove(mark);
    var _sel2 = selection.set('marks', _marks2);
    editor.select(_sel2);
  }
};

/**
 * Replace an `oldMark` with a `newMark` in the characters in the current selection.
 *
 * @param {Editor} editor
 * @param {Mark} oldMark
 * @param {Mark} newMark
 */

Commands$6.replaceMark = function (editor, oldMark, newMark) {
  editor.removeMark(oldMark);
  editor.addMark(newMark);
};

/**
 * Set the `properties` of block nodes.
 *
 * @param {Editor} editor
 * @param {Object|String} properties
 */

Commands$6.setBlocks = function (editor, properties) {
  var value = editor.value;
  var selection = value.selection;

  editor.setBlocksAtRange(selection, properties);
};

/**
 * Set the `properties` of inline nodes.
 *
 * @param {Editor} editor
 * @param {Object|String} properties
 */

Commands$6.setInlines = function (editor, properties) {
  var value = editor.value;
  var selection = value.selection;

  editor.setInlinesAtRange(selection, properties);
};

/**
 * Split the block node at the current selection, to optional `depth`.
 *
 * @param {Editor} editor
 * @param {Number} depth (optional)
 */

Commands$6.splitBlock = function (editor) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  deleteExpanded(editor);

  var value = editor.value;
  var selection = value.selection,
      document = value.document;

  var marks = selection.marks || document.getInsertMarksAtRange(selection);
  editor.splitBlockAtRange(selection, depth).moveToEnd();

  if (marks && marks.size !== 0) {
    editor.select({ marks: marks });
  }
};

/**
 * Split the inline nodes to optional `height`.
 *
 * @param {Editor} editor
 * @param {Number} height (optional)
 */

Commands$6.splitInline = function (editor, height) {
  deleteExpanded(editor);
  var value = editor.value;
  var selection = value.selection;

  editor.splitInlineAtRange(selection, height);
};

/**
 * Add or remove a `mark` from the characters in the current selection,
 * depending on whether it's already there.
 *
 * @param {Editor} editor
 * @param {Mark} mark
 */

Commands$6.toggleMark = function (editor, mark) {
  mark = Mark.create(mark);
  var value = editor.value;

  var exists = value.activeMarks.has(mark);

  if (exists) {
    editor.removeMark(mark);
  } else {
    editor.addMark(mark);
  }
};

/**
 * Unwrap nodes from a block with `properties`.
 *
 * @param {Editor} editor
 * @param {String|Object} properties
 */

Commands$6.unwrapBlock = function (editor, properties) {
  var value = editor.value;
  var selection = value.selection;

  editor.unwrapBlockAtRange(selection, properties);
};

/**
 * Unwrap nodes from an inline with `properties`.
 *
 * @param {Editor} editor
 * @param {String|Object} properties
 */

Commands$6.unwrapInline = function (editor, properties) {
  var value = editor.value;
  var selection = value.selection;

  editor.unwrapInlineAtRange(selection, properties);
};

/**
 * Wrap nodes in a new `block`.
 *
 * @param {Editor} editor
 * @param {Block|Object|String} block
 */

Commands$6.wrapBlock = function (editor, block) {
  var value = editor.value;
  var selection = value.selection;

  editor.wrapBlockAtRange(selection, block);
};

/**
 * Wrap nodes in a new `inline`.
 *
 * @param {Editor} editor
 * @param {Inline|Object|String} inline
 */

Commands$6.wrapInline = function (editor, inline) {
  var value = editor.value;
  var selection = value.selection;

  editor.wrapInlineAtRange(selection, inline);
};

/**
 * Wrap the current selection with prefix/suffix.
 *
 * @param {Editor} editor
 * @param {String} prefix
 * @param {String} suffix
 */

Commands$6.wrapText = function (editor, prefix) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : prefix;
  var value = editor.value;
  var selection = value.selection;

  editor.wrapTextAtRange(selection, prefix, suffix);

  // If the selection was collapsed, it will have moved the start offset too.
  if (selection.isCollapsed) {
    editor.moveStartBackward(prefix.length);
  }

  // Adding the suffix will have pushed the end of the selection further on, so
  // we need to move it back to account for this.
  editor.moveEndBackward(suffix.length);

  // There's a chance that the selection points moved "through" each other,
  // resulting in a now-incorrect selection direction.
  if (selection.isForward !== editor.value.selection.isForward) {
    editor.flip();
  }
};

/**
 * A plugin that defines the core Slate logic.
 *
 * @param {Object} options
 * @return {Object}
 */

function CorePlugin() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$plugins = options.plugins,
      plugins = _options$plugins === undefined ? [] : _options$plugins;

  /**
   * The core Slate commands.
   *
   * @type {Object}
   */

  var commands = CommandsPlugin(_extends({}, Commands$1, Commands$2, Commands$3, Commands$4, Commands$5, Commands$6));

  /**
   * The core Slate queries.
   *
   * @type {Object}
   */

  var queries = QueriesPlugin({
    isAtomic: function isAtomic() {
      return false;
    },
    isVoid: function isVoid() {
      return false;
    }
  });

  /**
   * The core Slate schema.
   *
   * @type {Object}
   */

  var schema = SchemaPlugin({
    rules: [
    // Only allow block nodes in documents.
    {
      match: { object: 'document' },
      nodes: [{
        match: { object: 'block' }
      }]
    },

    // Only allow block nodes or inline and text nodes in blocks.
    {
      match: {
        object: 'block',
        first: { object: 'block' }
      },
      nodes: [{
        match: { object: 'block' }
      }]
    }, {
      match: {
        object: 'block',
        first: [{ object: 'inline' }, { object: 'text' }]
      },
      nodes: [{
        match: [{ object: 'inline' }, { object: 'text' }]
      }]
    },

    // Only allow inline and text nodes in inlines.
    {
      match: { object: 'inline' },
      nodes: [{ match: [{ object: 'inline' }, { object: 'text' }] }]
    },

    // Ensure that block and inline nodes have at least one text child.
    {
      match: [{ object: 'block' }, { object: 'inline' }],
      nodes: [{ min: 1 }],
      normalize: function normalize(editor, error) {
        var code = error.code,
            node = error.node;


        if (code === 'child_min_invalid' && node.nodes.isEmpty()) {
          editor.insertNodeByKey(node.key, 0, Text.create());
        }
      }
    },

    // Ensure that inline nodes are surrounded by text nodes.
    {
      match: { object: 'block' },
      first: [{ object: 'block' }, { object: 'text' }],
      last: [{ object: 'block' }, { object: 'text' }],
      normalize: function normalize(editor, error) {
        var code = error.code,
            node = error.node;

        var text = Text.create();
        var i = void 0;

        if (code === 'first_child_object_invalid') {
          i = 0;
        } else if (code === 'last_child_object_invalid') {
          i = node.nodes.size;
        } else {
          return;
        }

        editor.insertNodeByKey(node.key, i, text);
      }
    }, {
      match: { object: 'inline' },
      first: [{ object: 'block' }, { object: 'text' }],
      last: [{ object: 'block' }, { object: 'text' }],
      previous: [{ object: 'block' }, { object: 'text' }],
      next: [{ object: 'block' }, { object: 'text' }],
      normalize: function normalize(editor, error) {
        var code = error.code,
            node = error.node,
            index = error.index;

        var text = Text.create();
        var i = void 0;

        if (code === 'first_child_object_invalid') {
          i = 0;
        } else if (code === 'last_child_object_invalid') {
          i = node.nodes.size;
        } else if (code === 'previous_sibling_object_invalid') {
          i = index;
        } else if (code === 'next_sibling_object_invalid') {
          i = index + 1;
        } else {
          return;
        }

        editor.insertNodeByKey(node.key, i, text);
      }
    },

    // Merge adjacent text nodes with the same marks.
    {
      match: { object: 'text' },
      next: function next(_next, match) {
        return _next.object !== 'text' || !match.marks.equals(_next.marks);
      },
      normalize: function normalize(editor, error) {
        var code = error.code,
            next = error.next;


        if (code === 'next_sibling_invalid') {
          editor.mergeNodeByKey(next.key);
        }
      }
    },

    // Remove extra adjacent empty text nodes.
    {
      match: { object: 'text' },
      previous: function previous(prev) {
        return prev.object !== 'text' || prev.text !== '';
      },
      next: function next(_next2) {
        return _next2.object !== 'text' || _next2.text !== '';
      },
      normalize: function normalize(editor, error) {
        var code = error.code,
            next = error.next,
            previous = error.previous;


        if (code === 'next_sibling_invalid') {
          editor.removeNodeByKey(next.key);
        } else if (code === 'previous_sibling_invalid') {
          editor.removeNodeByKey(previous.key);
        }
      }
    }]
  });

  /**
   * Return the plugins.
   *
   * @type {Array}
   */

  return [schema].concat(toConsumableArray(plugins), [commands, queries]);
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug$2 = Debug('slate:editor');

/**
 * Editor.
 *
 * @type {Editor}
 */

var Editor = function () {
  /**
   * Create a new `Editor` with `attrs`.
   *
   * @param {Object} attrs
   * @param {Object} options
   */

  function Editor() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Editor);
    var _options$controller = options.controller,
        controller = _options$controller === undefined ? this : _options$controller,
        _options$construct = options.construct,
        construct = _options$construct === undefined ? true : _options$construct;
    var _attrs$onChange = attrs.onChange,
        onChange = _attrs$onChange === undefined ? function () {} : _attrs$onChange,
        _attrs$plugins = attrs.plugins,
        plugins = _attrs$plugins === undefined ? [] : _attrs$plugins,
        _attrs$readOnly = attrs.readOnly,
        readOnly = _attrs$readOnly === undefined ? false : _attrs$readOnly,
        _attrs$value = attrs.value,
        value = _attrs$value === undefined ? Value.create() : _attrs$value;


    this.controller = controller;
    this.middleware = {};
    this.onChange = onChange;
    this.operations = List();
    this.readOnly = null;
    this.value = null;

    this.tmp = {
      dirty: [],
      flushing: false,
      merge: null,
      normalize: true,
      save: true
    };

    var core = CorePlugin({ plugins: plugins });
    registerPlugin(this, core);

    if (construct) {
      this.run('onConstruct');
      this.setReadOnly(readOnly);
      this.setValue(value, options);
    }
  }

  /**
   * Apply an `operation` to the editor, updating its value.
   *
   * @param {Operation|Object} operation
   * @return {Editor}
   */

  createClass(Editor, [{
    key: 'applyOperation',
    value: function applyOperation(operation) {
      var _this = this;

      var operations = this.operations,
          controller = this.controller;

      var value = this.value;

      // Add in the current `value` in case the operation was serialized.
      if (isPlainObject(operation)) {
        operation = _extends({}, operation, { value: value });
      }

      operation = Operation.create(operation);

      // Save the operation into the history. Since `save` is a command, we need
      // to do it without normalizing, since it would have side effects.
      this.withoutNormalizing(function () {
        controller.save(operation);
        value = _this.value;
      });

      // Apply the operation to the value.
      debug$2('apply', { operation: operation });
      this.value = operation.apply(value);
      this.operations = operations.push(operation);

      // Get the paths of the affected nodes, and mark them as dirty.
      var newDirtyPaths = getDirtyPaths(operation);

      var dirty = this.tmp.dirty.map(function (path) {
        path = PathUtils.create(path);
        var transformed = PathUtils.transform(path, operation);
        return transformed.toArray();
      });

      var pathIndex = {};
      var dirtyPaths = Array.prototype.concat.apply(newDirtyPaths, dirty);
      this.tmp.dirty = [];

      // PERF: De-dupe the paths so we don't do extra normalization.
      dirtyPaths.forEach(function (dirtyPath) {
        var key = dirtyPath.join(',');

        if (!pathIndex[key]) {
          _this.tmp.dirty.push(dirtyPath);
        }

        pathIndex[key] = true;
      });

      // If we're not already, queue the flushing process on the next tick.
      if (!this.tmp.flushing) {
        this.tmp.flushing = true;
        Promise.resolve().then(function () {
          return _this.flush();
        });
      }

      return controller;
    }

    /**
     * Flush the editor's current change.
     *
     * @return {Editor}
     */

  }, {
    key: 'flush',
    value: function flush() {
      this.run('onChange');
      var value = this.value,
          operations = this.operations,
          controller = this.controller;

      var change = { value: value, operations: operations };
      this.operations = List();
      this.tmp.flushing = false;
      this.onChange(change);
      return controller;
    }

    /**
     * Trigger a command by `type` with `...args`.
     *
     * @param {String|Function} type
     * @param {Any} ...args
     * @return {Editor}
     */

  }, {
    key: 'command',
    value: function command(type) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var controller = this.controller;


      if (typeof type === 'function') {
        type.apply(undefined, [controller].concat(args));
        normalizeDirtyPaths(this);
        return controller;
      }

      debug$2('command', { type: type, args: args });
      var obj = { type: type, args: args };
      this.run('onCommand', obj);
      normalizeDirtyPaths(this);
      return controller;
    }

    /**
     * Checks if a command by `type` has been registered.
     *
     * @param {String} type
     * @return {Boolean}
     */

  }, {
    key: 'hasCommand',
    value: function hasCommand(type) {
      var controller = this.controller;

      var has = type in controller && controller[type].__command;

      return has;
    }

    /**
     * Checks if a query by `type` has been registered.
     *
     * @param {String} type
     * @return {Boolean}
     */

  }, {
    key: 'hasQuery',
    value: function hasQuery(type) {
      var controller = this.controller;

      var has = type in controller && controller[type].__query;

      return has;
    }

    /**
     * Normalize all of the nodes in the document from scratch.
     *
     * @return {Editor}
     */

  }, {
    key: 'normalize',
    value: function normalize() {
      var value = this.value,
          controller = this.controller;
      var document = value.document;

      var table = document.getKeysToPathsTable();
      var paths = Object.values(table).map(PathUtils.create);
      this.tmp.dirty = this.tmp.dirty.concat(paths);
      normalizeDirtyPaths(this);

      var selection = value.selection;

      document = value.document;

      if (selection.isUnset && document.nodes.size) {
        controller.moveToStartOfDocument();
      }

      return controller;
    }

    /**
     * Ask a query by `type` with `...args`.
     *
     * @param {String|Function} type
     * @param {Any} ...args
     * @return {Any}
     */

  }, {
    key: 'query',
    value: function query(type) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var controller = this.controller;


      if (typeof type === 'function') {
        return type.apply(undefined, [controller].concat(args));
      }

      debug$2('query', { type: type, args: args });
      var obj = { type: type, args: args };
      return this.run('onQuery', obj);
    }

    /**
     * Register a command `type` with the editor.
     *
     * @param {String} type
     * @return {Editor}
     */

  }, {
    key: 'registerCommand',
    value: function registerCommand(type) {
      var _this2 = this;

      var controller = this.controller;


      if (type in controller && controller[type].__command) {
        return controller;
      }

      invariant(!(type in controller), 'You cannot register a `' + type + '` command because it would overwrite an existing property of the `Editor`.');

      var method = function method() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return _this2.command.apply(_this2, [type].concat(args));
      };
      controller[type] = method;
      method.__command = true;
      return controller;
    }

    /**
     * Register a query `type` with the editor.
     *
     * @param {String} type
     * @return {Editor}
     */

  }, {
    key: 'registerQuery',
    value: function registerQuery(type) {
      var _this3 = this;

      var controller = this.controller;


      if (type in controller && controller[type].__query) {
        return controller;
      }

      invariant(!(type in controller), 'You cannot register a `' + type + '` query because it would overwrite an existing property of the `Editor`.');

      var method = function method() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _this3.query.apply(_this3, [type].concat(args));
      };
      controller[type] = method;
      method.__query = true;
      return controller;
    }

    /**
     * Run through the middleware stack by `key` with `args`.
     *
     * @param {String} key
     * @param {Any} ...args
     * @return {Any}
     */

  }, {
    key: 'run',
    value: function run(key) {
      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      var controller = this.controller,
          middleware = this.middleware;

      var fns = middleware[key] || [];
      var i = 0;

      function next() {
        var fn = fns[i++];
        if (!fn) return;

        for (var _len6 = arguments.length, overrides = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          overrides[_key6] = arguments[_key6];
        }

        if (overrides.length) {
          args = overrides;
        }

        var ret = fn.apply(undefined, toConsumableArray(args).concat([controller, next]));
        return ret;
      }

      Object.defineProperty(next, 'change', {
        get: function get$$1() {
          invariant(false, 'As of Slate 0.42, the `editor` is no longer passed as the third argument to event handlers. You can access it via `change.editor` instead.');
        }
      });

      Object.defineProperty(next, 'onChange', {
        get: function get$$1() {
          invariant(false, 'As of Slate 0.42, the `editor` is no longer passed as the third argument to event handlers. You can access it via `change.editor` instead.');
        }
      });

      Object.defineProperty(next, 'props', {
        get: function get$$1() {
          invariant(false, 'As of Slate 0.42, the `editor` is no longer passed as the third argument to event handlers. You can access it via `change.editor` instead.');
        }
      });

      Object.defineProperty(next, 'schema', {
        get: function get$$1() {
          invariant(false, 'As of Slate 0.42, the `editor` is no longer passed as the third argument to event handlers. You can access it via `change.editor` instead.');
        }
      });

      Object.defineProperty(next, 'stack', {
        get: function get$$1() {
          invariant(false, 'As of Slate 0.42, the `editor` is no longer passed as the third argument to event handlers. You can access it via `change.editor` instead.');
        }
      });

      return next();
    }

    /**
     * Set the `readOnly` flag.
     *
     * @param {Boolean} readOnly
     * @return {Editor}
     */

  }, {
    key: 'setReadOnly',
    value: function setReadOnly(readOnly) {
      this.readOnly = readOnly;
      return this;
    }

    /**
     * Set the editor's `value`.
     *
     * @param {Value} value
     * @param {Options} options
     * @return {Editor}
     */

  }, {
    key: 'setValue',
    value: function setValue(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$normalize = options.normalize,
          normalize = _options$normalize === undefined ? value !== this.value : _options$normalize;

      this.value = value;

      if (normalize) {
        this.normalize();
      }

      return this;
    }

    /**
     * Apply a series of changes inside a synchronous `fn`, deferring
     * normalization until after the function has finished executing.
     *
     * @param {Function} fn
     * @return {Editor}
     */

  }, {
    key: 'withoutNormalizing',
    value: function withoutNormalizing(fn) {
      var controller = this.controller;

      var value = this.tmp.normalize;
      this.tmp.normalize = false;
      fn(controller);
      this.tmp.normalize = value;
      normalizeDirtyPaths(this);
      return controller;
    }

    /**
     * Deprecated.
     */

  }, {
    key: 'change',
    value: function change(fn) {
      warning(false, 'As of Slate 0.43 the `change` object has been replaced with `editor`, so the `editor.change()` method is deprecated.`');

      for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      fn.apply(undefined, [this.controller].concat(args));
    }
  }, {
    key: 'call',
    value: function call(fn) {
      warning(false, 'As of Slate 0.43 the `editor.call(fn)` method has been deprecated, please use `editor.command(fn)` instead.');

      for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      fn.apply(undefined, [this.controller].concat(args));
      return this.controller;
    }
  }, {
    key: 'applyOperations',
    value: function applyOperations(operations) {
      var _this4 = this;

      warning(false, 'As of Slate 0.43 the `applyOperations` method is deprecated, please apply each operation in a loop instead.');

      operations.forEach(function (op) {
        return _this4.applyOperation(op);
      });
      return this.controller;
    }
  }, {
    key: 'setOperationFlag',
    value: function setOperationFlag(key, value) {
      warning(false, 'As of slate@0.41 the `change.setOperationFlag` method has been deprecated.');

      this.tmp[key] = value;
      return this;
    }
  }, {
    key: 'getFlag',
    value: function getFlag(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      warning(false, 'As of slate@0.41 the `change.getFlag` method has been deprecated.');

      return options[key] !== undefined ? options[key] : this.tmp[key];
    }
  }, {
    key: 'unsetOperationFlag',
    value: function unsetOperationFlag(key) {
      warning(false, 'As of slate@0.41 the `change.unsetOperationFlag` method has been deprecated.');

      delete this.tmp[key];
      return this;
    }
  }, {
    key: 'withoutNormalization',
    value: function withoutNormalization(fn) {
      warning(false, 'As of slate@0.41 the `change.withoutNormalization` helper has been renamed to `change.withoutNormalizing`.');

      return this.withoutNormalizing(fn);
    }
  }, {
    key: 'editor',
    get: function get$$1() {
      warning(false, "As of Slate 0.43 the `change` object has been replaced with `editor`, so you don't need to access `change.editor`.");

      return this.controller;
    }
  }]);
  return Editor;
}();

/**
 * Get the "dirty" paths for a given `operation`.
 *
 * @param {Operation} operation
 * @return {Array}
 */

function getDirtyPaths(operation) {
  var type = operation.type,
      node = operation.node,
      path = operation.path,
      newPath = operation.newPath;


  switch (type) {
    case 'add_mark':
    case 'insert_text':
    case 'remove_mark':
    case 'remove_text':
    case 'set_mark':
    case 'set_node':
      {
        var ancestors = PathUtils.getAncestors(path).toArray();
        return [].concat(toConsumableArray(ancestors), [path]);
      }

    case 'insert_node':
      {
        var table = node.getKeysToPathsTable();
        var paths = Object.values(table).map(function (p) {
          return path.concat(p);
        });
        var _ancestors = PathUtils.getAncestors(path).toArray();
        return [].concat(toConsumableArray(_ancestors), [path], toConsumableArray(paths));
      }

    case 'split_node':
      {
        var _ancestors2 = PathUtils.getAncestors(path).toArray();
        var nextPath = PathUtils.increment(path);
        return [].concat(toConsumableArray(_ancestors2), [path, nextPath]);
      }

    case 'merge_node':
      {
        var _ancestors3 = PathUtils.getAncestors(path).toArray();
        var previousPath = PathUtils.decrement(path);
        return [].concat(toConsumableArray(_ancestors3), [previousPath]);
      }

    case 'move_node':
      {
        if (PathUtils.isEqual(path, newPath)) {
          return [];
        }

        var oldAncestors = PathUtils.getAncestors(path).reduce(function (arr, p) {
          arr.push.apply(arr, toConsumableArray(PathUtils.transform(p, operation).toArray()));
          return arr;
        }, []);

        var newAncestors = PathUtils.getAncestors(newPath).reduce(function (arr, p) {
          arr.push.apply(arr, toConsumableArray(PathUtils.transform(p, operation).toArray()));
          return arr;
        }, []);

        return [].concat(toConsumableArray(oldAncestors), toConsumableArray(newAncestors));
      }

    case 'remove_node':
      {
        var _ancestors4 = PathUtils.getAncestors(path).toArray();
        return [].concat(toConsumableArray(_ancestors4));
      }

    default:
      {
        return [];
      }
  }
}

/**
 * Normalize any new "dirty" paths that have been added to the change.
 *
 * @param {Editor}
 */

function normalizeDirtyPaths(editor) {
  if (!editor.tmp.normalize) {
    return;
  }

  if (!editor.tmp.dirty.length) {
    return;
  }

  editor.withoutNormalizing(function () {
    while (editor.tmp.dirty.length) {
      var path = editor.tmp.dirty.pop();
      normalizeNodeByPath(editor, path);
    }
  });
}

/**
 * Normalize the node at a specific `path`.
 *
 * @param {Editor} editor
 * @param {Array} path
 */

function normalizeNodeByPath(editor, path) {
  var controller = editor.controller;
  var value = editor.value;
  var _value = value,
      document = _value.document;

  var node = document.assertNode(path);
  var iterations = 0;
  var max = 100 + (node.object === 'text' ? 1 : node.nodes.size);

  while (node) {
    var fn = node.normalize(controller);

    if (!fn) {
      break;
    }

    // Run the normalize `fn` to fix the node.
    fn(controller);

    // Attempt to re-find the node by path, or by key if it has changed
    // locations in the tree continue iterating.
    value = editor.value;
    document = value.document;
    var _node = node,
        key = _node.key;

    var found = document.getDescendant(path);

    if (found && found.key === key) {
      node = found;
    } else {
      found = document.getDescendant(key);

      if (found) {
        node = found;
        path = document.getPath(key);
      } else {
        // If it no longer exists by key, it was removed, so we're done.
        break;
      }
    }

    // Increment the iterations counter, and check to make sure that we haven't
    // exceeded the max. Without this check, it's easy for the `normalize`
    // function of a schema rule to be written incorrectly and for an infinite
    // invalid loop to occur.
    iterations++;

    if (iterations > max) {
      throw new Error('A schema rule could not be normalized after sufficient iterations. This is usually due to a `rule.normalize` or `plugin.normalizeNode` function of a schema being incorrectly written, causing an infinite loop.');
    }
  }
}

/**
 * Register a `plugin` with the editor.
 *
 * @param {Editor} editor
 * @param {Object|Array|Null} plugin
 */

function registerPlugin(editor, plugin) {
  if (Array.isArray(plugin)) {
    plugin.forEach(function (p) {
      return registerPlugin(editor, p);
    });
    return;
  }

  if (plugin == null) {
    return;
  }

  var commands = plugin.commands,
      queries = plugin.queries,
      schema = plugin.schema,
      rest = objectWithoutProperties(plugin, ['commands', 'queries', 'schema']);


  if (commands) {
    var commandsPlugin = CommandsPlugin(commands);
    registerPlugin(editor, commandsPlugin);
  }

  if (queries) {
    var queriesPlugin = QueriesPlugin(queries);
    registerPlugin(editor, queriesPlugin);
  }

  if (schema) {
    var schemaPlugin = SchemaPlugin(schema);
    registerPlugin(editor, schemaPlugin);
  }

  for (var key in rest) {
    var fn = rest[key];
    var middleware = editor.middleware[key] = editor.middleware[key] || [];
    middleware.push(fn);
  }
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS$13 = {
  marks: undefined,
  text: undefined

  /**
   * Leaf.
   *
   * @type {Leaf}
   */

};
var Leaf$1 = function (_Record) {
  inherits(Leaf, _Record);

  function Leaf() {
    classCallCheck(this, Leaf);
    return possibleConstructorReturn(this, (Leaf.__proto__ || Object.getPrototypeOf(Leaf)).apply(this, arguments));
  }

  createClass(Leaf, [{
    key: 'updateMark',


    /**
     * Update a `mark` at leaf, replace with newMark
     *
     * @param {Mark} mark
     * @param {Mark} newMark
     * @returns {Leaf}
     */

    value: function updateMark(mark, newMark) {
      var marks = this.marks;

      if (newMark.equals(mark)) return this;
      if (!marks.has(mark)) return this;
      var newMarks = marks.withMutations(function (collection) {
        collection.remove(mark).add(newMark);
      });
      return this.set('marks', newMarks);
    }

    /**
     * Add a `mark` to the leaf.
     *
     * @param {Mark} mark
     * @returns {Text}
     */

  }, {
    key: 'addMark',
    value: function addMark(mark) {
      var marks = this.marks;

      return this.set('marks', marks.add(mark));
    }

    /**
     * Add a `set` of marks to the leaf.
     *
     * @param {Set<Mark>} set
     * @returns {Text}
     */

  }, {
    key: 'addMarks',
    value: function addMarks(set$$1) {
      var marks = this.marks;

      return this.set('marks', marks.union(set$$1));
    }

    /**
     * Insert a text `string` into the leaf at `offset`.
     *
     * @param {Number} offset
     * @param {String} string
     * @return {Leaf}
     */

  }, {
    key: 'insertText',
    value: function insertText(offset, string) {
      var text = this.text;

      var next = text.slice(0, offset) + string + text.slice(offset);
      return this.set('text', next);
    }

    /**
     * Remove a `mark` from the leaf.
     *
     * @param {Mark} mark
     * @returns {Text}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(mark) {
      var marks = this.marks;

      return this.set('marks', marks.remove(mark));
    }

    /**
     * Return a JSON representation of the leaf.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        object: this.object,
        text: this.text,
        marks: this.marks.toArray().map(function (m) {
          return m.toJSON();
        })
      };

      return object;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Leaf` with `attrs`.
     *
     * @param {Object|Leaf} attrs
     * @return {Leaf}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      warning(false, 'As of slate@0.47 the `Leaf` model is deprecated.');

      if (Leaf.isLeaf(attrs)) {
        return attrs;
      }

      if (typeof attrs === 'string') {
        attrs = { text: attrs };
      }

      if (isPlainObject(attrs)) {
        return Leaf.fromJSON(attrs);
      }

      throw new Error('`Leaf.create` only accepts objects, strings or leaves, but you passed it: ' + attrs);
    }

    /**
     * Create a valid List of `Leaf` from `leaves`
     *
     * @param {List<Leaf>} leaves
     * @return {List<Leaf>}
     */

  }, {
    key: 'createLeaves',
    value: function createLeaves(leaves) {
      if (leaves.size <= 1) return leaves;

      var invalid = false;

      // TODO: we can make this faster with [List] and then flatten
      var result = List().withMutations(function (cache) {
        // Search from the leaves left end to find invalid node;
        leaves.findLast(function (leaf, index) {
          var firstLeaf = cache.first();

          // If the first leaf of cache exist, check whether the first leaf is connectable with the current leaf
          if (firstLeaf) {
            // If marks equals, then the two leaves can be connected
            if (firstLeaf.marks.equals(leaf.marks)) {
              invalid = true;
              cache.set(0, firstLeaf.set('text', '' + leaf.text + firstLeaf.text));
              return;
            }

            // If the cached leaf is empty, drop the empty leaf with the upcoming leaf
            if (firstLeaf.text === '') {
              invalid = true;
              cache.set(0, leaf);
              return;
            }

            // If the current leaf is empty, drop the leaf
            if (leaf.text === '') {
              invalid = true;
              return;
            }
          }

          cache.unshift(leaf);
        });
      });

      if (!invalid) return leaves;
      return result;
    }

    /**
     * Split a list of leaves to two lists; if the leaves are valid leaves, the returned leaves are also valid
     * Corner Cases:
     *   1. if offset is smaller than 0, then return [List(), leaves]
     *   2. if offset is bigger than the text length, then return [leaves, List()]
     *
     * @param {List<Leaf> leaves
     * @return {Array<List<Leaf>>}
     */

  }, {
    key: 'splitLeaves',
    value: function splitLeaves(leaves, offset) {
      if (offset < 0) return [List(), leaves];

      if (leaves.size === 0) {
        return [List(), List()];
      }

      var endOffset = 0;
      var index = -1;
      var left = void 0,
          right = void 0;

      leaves.find(function (leaf) {
        index++;
        var startOffset = endOffset;
        var text = leaf.text;

        endOffset += text.length;

        if (endOffset < offset) return false;
        if (startOffset > offset) return false;

        var length = offset - startOffset;
        left = leaf.set('text', text.slice(0, length));
        right = leaf.set('text', text.slice(length));
        return true;
      });

      if (!left) return [leaves, List()];

      if (left.text === '') {
        if (index === 0) {
          return [List.of(left), leaves];
        }

        return [leaves.take(index), leaves.skip(index)];
      }

      if (right.text === '') {
        if (index === leaves.size - 1) {
          return [leaves, List.of(right)];
        }

        return [leaves.take(index + 1), leaves.skip(index + 1)];
      }

      return [leaves.take(index).push(left), leaves.skip(index + 1).unshift(right)];
    }

    /**
     * Create a `Leaf` list from `attrs`.
     *
     * @param {Array<Leaf|Object>|List<Leaf|Object>} attrs
     * @return {List<Leaf>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (List.isList(attrs) || Array.isArray(attrs)) {
        var list = new List(attrs.map(Leaf.create));
        return list;
      }

      throw new Error('`Leaf.createList` only accepts arrays or lists, but you passed it: ' + attrs);
    }

    /**
     * Create a `Leaf` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Leaf}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$text = object.text,
          text = _object$text === undefined ? '' : _object$text,
          _object$marks = object.marks,
          marks = _object$marks === undefined ? [] : _object$marks;


      var leaf = new Leaf({
        text: text,
        marks: Set(marks.map(Mark.fromJSON))
      });

      return leaf;
    }

    /**
     * Check if `any` is a list of leaves.
     *
     * @param {Any} any
     * @return {Boolean}
     */

  }, {
    key: 'isLeafList',
    value: function isLeafList(any) {
      return List.isList(any) && any.every(function (item) {
        return Leaf.isLeaf(item);
      });
    }
  }]);
  return Leaf;
}(Record(DEFAULTS$13));

/**
 * Mix in an `Interface` to a `Class`.
 *
 * @param {Class} Interface
 * @param {Class} Class
 */

function mixin(Interface, Classes) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var Class = _step.value;

      // Copy static properties from the interface.
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.getOwnPropertyNames(Interface)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var name = _step2.value;

          if (Class.hasOwnProperty(name)) continue;
          var desc = Object.getOwnPropertyDescriptor(Interface, name);
          Object.defineProperty(Class, name, desc);
        }

        // Copy instance properties from the interface.
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
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
        for (var _iterator3 = Object.getOwnPropertyNames(Interface.prototype)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _name = _step3.value;

          if (Class.prototype.hasOwnProperty(_name)) continue;
          var desc = Object.getOwnPropertyDescriptor(Interface.prototype, _name);
          Object.defineProperty(Class.prototype, _name, desc);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * A factory for the interface that all Slate objects implement.
 *
 * @type {Function}
 */

function create$2(type) {
  var TYPE = TYPES[type];
  var camel = '' + type.charAt(0).toUpperCase() + type.slice(1);
  var is$$1 = 'is' + camel;

  var ObjectInterface = function () {
    function ObjectInterface() {
      classCallCheck(this, ObjectInterface);
    }

    createClass(ObjectInterface, [{
      key: 'object',

      /**
       * Return the type of the object.
       *
       * @return {String}
       */

      get: function get$$1() {
        return type;
      }
    }]);
    return ObjectInterface;
  }();

  ObjectInterface[is$$1] = isObject.bind(null, type);
  ObjectInterface.prototype[TYPE] = true;
  return ObjectInterface;
}

/**
 * Mix in the object interfaces.
 */

Object.entries({
  Annotation: Annotation,
  Block: Block,
  Change: Change,
  Decoration: Decoration,
  Document: Document,
  Editor: Editor,
  Inline: Inline,
  Leaf: Leaf$1,
  Mark: Mark,
  Node: Node,
  Operation: Operation,
  Point: Point,
  Range: Range,
  Selection: Selection,
  Text: Text,
  Value: Value
}).forEach(function (_ref) {
  var _ref2 = slicedToArray(_ref, 2),
      camel = _ref2[0],
      obj = _ref2[1];

  return mixin(create$2(camel.toLowerCase()), [obj]);
});

/**
 * The interface that all Slate models implement.
 *
 * @type {Class}
 */

var ModelInterface = function () {
  function ModelInterface() {
    classCallCheck(this, ModelInterface);
  }

  createClass(ModelInterface, [{
    key: 'toJS',


    /**
     * Alias `toJS`.
     */

    value: function toJS() {
      return this.toJSON.apply(this, arguments);
    }
  }], [{
    key: 'fromJS',

    /**
     * Alias `fromJS`.
     */

    value: function fromJS() {
      return this.fromJSON.apply(this, arguments);
    }
  }]);
  return ModelInterface;
}();

/**
 * Mix in the common interface.
 *
 * @param {Record}
 */

mixin(ModelInterface, [Annotation, Block, Decoration, Document, Inline, Leaf$1, Mark, Node, Operation, Point, Range, Selection, Text, Value]);

/* global WeakMap, Map, Symbol */

/**
 * GLOBAL: True if memoization should is enabled.
 *
 * @type {Boolean}
 */

var ENABLED = true;

/**
 * The leaf node of a cache tree. Used to support variable argument length. A
 * unique object, so that native Maps will key it by reference.
 *
 * @type {Symbol}
 */

var LEAF = Symbol('LEAF');

/**
 * The node of a cache tree for a WeakMap to store cache visited by objects
 *
 * @type {Symbol}
 */

var STORE_KEY = Symbol('STORE_KEY');

/**
 * Values to represent a memoized undefined and null value. Allows efficient value
 * retrieval using Map.get only.
 *
 * @type {Symbol}
 */

var UNDEFINED = Symbol('undefined');
var NULL = Symbol('null');

/**
 * Default value for unset keys in native Maps
 *
 * @type {Undefined}
 */

var UNSET = undefined;

/**
 * Global Store for all cached values
 *
 * @type {WeakMap}
 */

var memoizeStore = new WeakMap();

/**
 * Memoize all of the `properties` on a `object`.
 *
 * @param {Object} object
 * @param {Array} properties
 * @return {Record}
 */

function memoize(object, properties) {
  var _loop = function _loop(property) {
    var original = object[property];

    if (!original) {
      throw new Error('Object does not have a property named "' + property + '".');
    }

    object[property] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // If memoization is disabled, call into the original method.
      if (!ENABLED) return original.apply(this, args);

      if (!memoizeStore.has(this)) {
        memoizeStore.set(this, {
          noArgs: {},
          hasArgs: {}
        });
      }

      var _memoizeStore$get = memoizeStore.get(this),
          noArgs = _memoizeStore$get.noArgs,
          hasArgs = _memoizeStore$get.hasArgs;

      var takesArguments = args.length !== 0;

      var cachedValue = void 0;
      var keys = void 0;

      if (takesArguments) {
        keys = [property].concat(args);
        cachedValue = getIn(hasArgs, keys);
      } else {
        cachedValue = noArgs[property];
      }

      // If we've got a result already, return it.
      if (cachedValue !== UNSET) {
        return cachedValue === UNDEFINED ? undefined : cachedValue;
      }

      // Otherwise calculate what it should be once and cache it.
      var value = original.apply(this, args);
      var v = value === undefined ? UNDEFINED : value;

      if (takesArguments) {
        setIn(hasArgs, keys, v);
      } else {
        noArgs[property] = v;
      }

      return value;
    };
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      _loop(property);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/**
 * Get a value at a key path in a tree of Map.
 *
 * If not set, returns UNSET.
 * If the set value is undefined, returns UNDEFINED.
 *
 * @param {Map} map
 * @param {Array} keys
 * @return {Any|UNSET|UNDEFINED}
 */

function getIn(map, keys) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      if (key === undefined) {
        key = UNDEFINED;
      } else if (key == null) {
        key = NULL;
      }

      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
        map = map[STORE_KEY] && map[STORE_KEY].get(key);
      } else {
        map = map[key];
      }

      if (map === UNSET) return UNSET;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return map[LEAF];
}

/**
 * Set a value at a key path in a tree of Map, creating Maps on the go.
 *
 * @param {Map} map
 * @param {Array} keys
 * @param {Any} value
 * @return {Map}
 */

function setIn(map, keys, value) {
  var child = map;

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var key = _step3.value;

      if (key === undefined) {
        key = UNDEFINED;
      } else if (key == null) {
        key = NULL;
      }

      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) !== 'object') {
        if (!child[key]) {
          child[key] = {};
        }

        child = child[key];
        continue;
      }

      if (!child[STORE_KEY]) {
        child[STORE_KEY] = new WeakMap();
      }

      if (!child[STORE_KEY].has(key)) {
        var newChild = {};
        child[STORE_KEY].set(key, newChild);
        child = newChild;
        continue;
      }

      child = child[STORE_KEY].get(key);
    }

    // The whole path has been created, so set the value to the bottom most map.
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  child[LEAF] = value;
  return map;
}

/**
 * In DEV mode, clears the previously memoized values, globally.
 *
 * @return {Void}
 */

function resetMemoization() {
  memoizeStore = new WeakMap();
}

/**
 * In DEV mode, enable or disable the use of memoize values, globally.
 *
 * @param {Boolean} enabled
 * @return {Void}
 */

function useMemoization(enabled) {
  ENABLED = enabled;
}

/**
 * The interface that `Document`, `Block` and `Inline` all implement, to make
 * working with the recursive node tree easier.
 *
 * @type {Class}
 */

var NodeInterface = function () {
  function NodeInterface() {
    classCallCheck(this, NodeInterface);
  }

  createClass(NodeInterface, [{
    key: 'getFirstText',

    /**
     * Get the first text node of a node, or the node itself.
     *
     * @return {Node|Null}
     */

    value: function getFirstText() {
      if (this.object === 'text') {
        return this;
      }

      var descendant = null;

      var found = this.nodes.find(function (node) {
        if (node.object === 'text') return true;
        descendant = node.getFirstText();
        return !!descendant;
      });

      return descendant || found;
    }

    /**
     * Get an object mapping all the keys in the node to their paths.
     *
     * @return {Object}
     */

  }, {
    key: 'getKeysToPathsTable',
    value: function getKeysToPathsTable() {
      var ret = defineProperty({}, this.key, []);

      if (this.nodes) {
        this.nodes.forEach(function (node, i) {
          var nested = node.getKeysToPathsTable();

          for (var key in nested) {
            var path = nested[key];

            warning(!(key in ret), 'A node with a duplicate key of "' + key + '" was found! Duplicate keys are not allowed, you should use `node.regenerateKey` before inserting if you are reusing an existing node.');

            ret[key] = [i].concat(toConsumableArray(path));
          }
        });
      }

      return ret;
    }

    /**
     * Get the last text node of a node, or the node itself.
     *
     * @return {Node|Null}
     */

  }, {
    key: 'getLastText',
    value: function getLastText() {
      if (this.object === 'text') {
        return this;
      }

      var descendant = null;

      var found = this.nodes.findLast(function (node) {
        if (node.object === 'text') return true;
        descendant = node.getLastText();
        return descendant;
      });

      return descendant || found;
    }

    /**
     * Get a node in the tree, or the node itself.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNode',
    value: function getNode(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (this.object === 'text' && path.size) return null;
      var node = path.size ? this.getDescendant(path) : this;
      return node;
    }

    /**
     * Find the path to a node.
     *
     * @param {String|List} key
     * @return {List}
     */

  }, {
    key: 'getPath',
    value: function getPath(key) {
      // COMPAT: Handle passing in a path, to match other methods.
      if (List.isList(key)) {
        return key;
      }

      // COMPAT: Handle a node object by iterating the descendants tree, so that
      // we avoid using keys for the future.
      if (Node.isNode(key) && this.descendants) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.descendants()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = slicedToArray(_ref, 2);

            var node = _ref2[0];
            var _path = _ref2[1];

            if (key === node) return _path;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var dict = this.getKeysToPathsTable();
      var path = dict[key];
      return path ? List(path) : null;
    }

    /**
     * Get the concatenated text string of a node.
     *
     * @return {String}
     */

  }, {
    key: 'getText',
    value: function getText() {
      if (this.object === 'text') {
        return this.text;
      }

      var text = this.nodes.reduce(function (memo, c) {
        return memo + c.text;
      }, '');
      return text;
    }

    /**
     * Check if a node exists.
     *
     * @param {List|String} path
     * @return {Boolean}
     */

  }, {
    key: 'hasNode',
    value: function hasNode(path) {
      var node = this.getNode(path);
      return !!node;
    }

    /**
     * Normalize the text node with an `editor`.
     *
     * @param {Editor} editor
     * @return {Function|Void}
     */

  }, {
    key: 'normalize',
    value: function normalize(editor) {
      var normalizer = editor.run('normalizeNode', this);
      return normalizer;
    }

    /**
     * Regenerate the node's key.
     *
     * @return {Node}
     */

  }, {
    key: 'regenerateKey',
    value: function regenerateKey() {
      var key = KeyUtils.create();
      var node = this.set('key', key);
      return node;
    }

    /**
     * Resolve a path from a path list or key string.
     *
     * An `index` can be provided, in which case paths created from a key string
     * will have the index pushed onto them. This is helpful in cases where you
     * want to accept either a `path` or a `key, index` combination for targeting
     * a location in the tree that doesn't exist yet, like when inserting.
     *
     * @param {List|String} value
     * @param {Number} index
     * @return {List}
     */

  }, {
    key: 'resolvePath',
    value: function resolvePath(path, index) {
      if (typeof path === 'string') {
        path = this.getPath(path);

        if (index != null) {
          path = path.concat(index);
        }
      } else {
        path = PathUtils.create(path);
      }

      return path;
    }

    /**
     * Validate the node with an `editor`.
     *
     * @param {Editor} editor
     * @return {Error|Void}
     */

  }, {
    key: 'validate',
    value: function validate(editor) {
      var error = editor.run('validateNode', this);
      return error;
    }
  }]);
  return NodeInterface;
}();

/**
 * Memoize read methods.
 */

memoize(NodeInterface.prototype, ['getFirstText', 'getKeysToPathsTable', 'getLastText', 'getText', 'normalize', 'validate']);

/**
 * Mix in the node interface.
 */

mixin(NodeInterface, [Block, Document, Inline, Text]);

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {}

function identity() {
  return true;
}

/**
 * The interface that `Document`, `Block` and `Inline` all implement, to make
 * working with the recursive node tree easier.
 *
 * @type {Class}
 */

var ElementInterface = function () {
  function ElementInterface() {
    classCallCheck(this, ElementInterface);
  }

  createClass(ElementInterface, [{
    key: 'addMark',


    /**
     * Add `mark` to text at `path`.
     *
     * @param {List|String} path
     * @param {Mark} mark
     * @return {Node}
     */

    value: function addMark(path, mark) {
      path = this.resolvePath(path);
      var node = this.assertDescendant(path);
      node = node.addMark(mark);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Create an iteratable for all of the ancestors of the node.
     *
     * @return {Iterable}
     */

  }, {
    key: 'ancestors',
    value: function ancestors(path) {
      var iterable = this.createIterable({
        path: path,
        direction: null,
        downward: false,
        includeTargetAncestors: true,
        includeRoot: true
      });

      return iterable;
    }

    /**
     * Create an iteratable for all of the blocks of a node with `options`.
     *
     * @param {Options}
     * @return {Iterable}
     */

  }, {
    key: 'blocks',
    value: function blocks() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var onlyLeaves = options.onlyLeaves,
          onlyRoots = options.onlyRoots,
          onlyTypes = options.onlyTypes,
          _match = options.match,
          rest = objectWithoutProperties(options, ['onlyLeaves', 'onlyRoots', 'onlyTypes', 'match']);

      var iterable = this.descendants(_extends({
        includeDocument: false,
        includeInlines: false,
        includeTexts: false
      }, rest, {
        match: function match(node, path) {
          if (onlyTypes && !onlyTypes.includes(node.type)) {
            return false;
          } else if (onlyRoots && path.size !== 1) {
            return false;
          } else if (onlyLeaves && !node.isLeafBlock()) {
            return false;
          } else if (_match && !_match(node, path)) {
            return false;
          } else {
            return true;
          }
        }
      }));

      return iterable;
    }

    /**
     * Create an annotation with `properties` relative to the node.
     *
     * @param {Object|Annotation} properties
     * @return {Annotation}
     */

  }, {
    key: 'createAnnotation',
    value: function createAnnotation(properties) {
      properties = Annotation.createProperties(properties);
      var annotation = this.resolveAnnotation(properties);
      return annotation;
    }

    /**
     * Create a decoration with `properties` relative to the node.
     *
     * @param {Object|Decoration} properties
     * @return {Decoration}
     */

  }, {
    key: 'createDecoration',
    value: function createDecoration(properties) {
      properties = Decoration.createProperties(properties);
      var decoration = this.resolveDecoration(properties);
      return decoration;
    }

    /**
     * Create an iteratable function starting at `target` path with `options`.
     *
     * @param {Object} options (optional)
     * @return {Function}
     */

  }, {
    key: 'createIterable',
    value: function createIterable() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$direction = options.direction,
          direction = _options$direction === undefined ? 'forward' : _options$direction,
          _options$downward = options.downward,
          downward = _options$downward === undefined ? true : _options$downward,
          _options$upward = options.upward,
          upward = _options$upward === undefined ? true : _options$upward,
          _options$includeBlock = options.includeBlocks,
          includeBlocks = _options$includeBlock === undefined ? true : _options$includeBlock,
          _options$includeDocum = options.includeDocument,
          includeDocument = _options$includeDocum === undefined ? true : _options$includeDocum,
          _options$includeInlin = options.includeInlines,
          includeInlines = _options$includeInlin === undefined ? true : _options$includeInlin,
          _options$includeRoot = options.includeRoot,
          includeRoot = _options$includeRoot === undefined ? false : _options$includeRoot,
          _options$includeTarge = options.includeTarget,
          includeTarget = _options$includeTarge === undefined ? !!options.range : _options$includeTarge,
          _options$includeTarge2 = options.includeTargetAncestors,
          includeTargetAncestors = _options$includeTarge2 === undefined ? false : _options$includeTarge2,
          _options$includeTexts = options.includeTexts,
          includeTexts = _options$includeTexts === undefined ? true : _options$includeTexts,
          _options$match = options.match,
          match = _options$match === undefined ? null : _options$match;


      var root = this;
      var targetPath = null;
      var targetRange = null;

      // You can iterate over either a range or a path, but not both.
      if (options.range) {
        targetRange = root.resolveRange(options.range);
        targetPath = root.resolvePath(targetRange.start.path);
      } else if (options.path) {
        targetPath = root.resolvePath(options.path);
      }

      var targetNode = targetPath && root.assertNode(targetPath);
      var NativeSet = typeof window === 'undefined' ? global$1.Set : window.Set;

      // Return an object that implements the iterable interface.
      return defineProperty({}, Symbol.iterator, function () {
        var visited = new NativeSet();
        var startPath = targetRange && targetRange.start.path;
        var endPath = targetRange && targetRange.end.path;
        var path = targetPath;
        var node = targetNode;
        var includedTarget = false;
        var includedStart = false;
        var includingStart = false;

        var result = function result() {
          // When these are nulled out we've finished iterating.
          if (!path || !node) {
            return { done: true };
          }

          // We often don't want to include the root node itself.
          if (!includeRoot && node === root) {
            return next();
          }

          if (!includeBlocks && node.object === 'block') {
            return next();
          }

          if (!includeDocument && node.object === 'document') {
            return next();
          }

          if (!includeInlines && node.object === 'inline') {
            return next();
          }

          if (!includeTexts && node.object === 'text') {
            return next();
          }

          if (match && !match(node, path)) {
            return next();
          }

          return { value: [node, path], done: false };
        };

        var next = function next() {
          if (!path || !node) {
            return result();
          }

          // When iterating over a range, we need to include the specific
          // ancestors in the start path of the range manually.
          if (startPath && !includedStart) {
            if (!includingStart) {
              includingStart = true;
              path = PathUtils.create([]);
              node = root;
              return result();
            }

            if (path.size === startPath.size - 1) {
              includedStart = true;
              path = targetPath;
              node = targetNode;
              return next();
            }

            path = startPath.slice(0, path.size + 1);
            node = root.assertNode(path);
            return result();
          }

          // Sometimes we want to include the target itself.
          if (includeTarget && !includedTarget) {
            includedTarget = true;
            return result();
          }

          // When iterating over a range, if we get to the end path then exit.
          if (endPath && path.equals(endPath)) {
            node = null;
            path = null;
            return next();
          }

          // If we're allowed to go downward, and we haven't decsended yet, do so.
          if (downward && node.nodes && node.nodes.size && !visited.has(node)) {
            visited.add(node);
            var nextIndex = direction === 'forward' ? 0 : node.nodes.size - 1;
            path = path.push(nextIndex);
            node = root.assertNode(path);
            return result();
          }

          // If we're going forward...
          if (direction === 'forward') {
            var newPath = PathUtils.increment(path);
            var newNode = root.getNode(newPath);

            if (newNode) {
              path = newPath;
              node = newNode;
              return result();
            }
          }

          // If we're going backward...
          if (direction === 'backward' && path.last() !== 0) {
            var _newPath = PathUtils.decrement(path);
            var _newNode = root.getNode(_newPath);

            if (_newNode) {
              path = _newPath;
              node = _newNode;
              return result();
            }
          }

          // If we're going upward...
          if (upward && path.size) {
            path = PathUtils.lift(path);
            node = root.assertNode(path);

            // Sometimes we'll have already visited the node on the way down
            // so we don't want to double count it.
            if (visited.has(node)) {
              return next();
            }

            visited.add(node);

            // If ancestors of the target node shouldn't be included, skip them.
            if (!includeTargetAncestors) {
              return next();
            } else {
              return result();
            }
          }

          path = null;
          node = null;
          return next();
        };

        return { next: next };
      });
    }

    /**
     * Create a point with `properties` relative to the node.
     *
     * @param {Object|Point} properties
     * @return {Range}
     */

  }, {
    key: 'createPoint',
    value: function createPoint(properties) {
      properties = Point.createProperties(properties);
      var point = this.resolvePoint(properties);
      return point;
    }

    /**
     * Create a range with `properties` relative to the node.
     *
     * @param {Object|Range} properties
     * @return {Range}
     */

  }, {
    key: 'createRange',
    value: function createRange(properties) {
      properties = Range.createProperties(properties);
      var range = this.resolveRange(properties);
      return range;
    }

    /**
     * Create a selection with `properties` relative to the node.
     *
     * @param {Object|Selection} properties
     * @return {Selection}
     */

  }, {
    key: 'createSelection',
    value: function createSelection(properties) {
      properties = Selection.createProperties(properties);
      var selection = this.resolveSelection(properties);
      return selection;
    }

    /**
     * Create an iteratable for all of the descendants of the node.
     *
     * @param {Object} options
     * @return {Iterable}
     */

  }, {
    key: 'descendants',
    value: function descendants(options) {
      var iterable = this.createIterable(_extends({ path: [] }, options));
      return iterable;
    }

    /**
     * Find all of the descendants that match a `predicate`.
     *
     * @param {Function} predicate
     * @return {List<Node>}
     */

  }, {
    key: 'filterDescendants',
    value: function filterDescendants() {
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : identity;

      var matches = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.descendants()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref2 = _step.value;

          var _ref3 = slicedToArray(_ref2, 2);

          var node = _ref3[0];
          var path = _ref3[1];

          if (predicate(node, path)) {
            matches.push(node);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return List(matches);
    }

    /**
     * Find the first descendant that matches a `predicate`.
     *
     * @param {Function} predicate
     * @return {Node|Null}
     */

  }, {
    key: 'findDescendant',
    value: function findDescendant() {
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : identity;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.descendants()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref4 = _step2.value;

          var _ref5 = slicedToArray(_ref4, 2);

          var node = _ref5[0];
          var path = _ref5[1];

          if (predicate(node, path)) {
            return node;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return null;
    }

    /**
     * Iterate over all descendants, breaking if `predicate` returns false.
     *
     * @param {Function} predicate
     */

  }, {
    key: 'forEachDescendant',
    value: function forEachDescendant() {
      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : identity;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.descendants()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _next = _step3.value;

          var ret = predicate.apply(undefined, toConsumableArray(_next));

          if (ret === false) {
            return;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    /**
     * Get a set of the active marks in a `range`. Active marks are marks that are
     * on every text node in a given range. This is a common distinction for
     * highlighting toolbar buttons for example.
     *
     * TODO: this method needs to be cleaned up, it's very hard to follow and
     * probably doing unnecessary work.
     *
     * @param {Range} range
     * @return {Set<Mark>}
     */

  }, {
    key: 'getActiveMarksAtRange',
    value: function getActiveMarksAtRange(range) {
      range = this.resolveRange(range);

      if (range.isUnset) {
        return Set();
      }

      if (range.isCollapsed) {
        var _range = range,
            _start = _range.start;

        return this.getInsertMarksAtPoint(_start);
      }

      var _range2 = range,
          start = _range2.start,
          end = _range2.end;

      var startPath = start.path;
      var startOffset = start.offset;
      var endPath = end.path;
      var endOffset = end.offset;
      var startText = this.getDescendant(startPath);
      var endText = this.getDescendant(endPath);

      if (!startPath.equals(endPath)) {
        while (!startPath.equals(endPath) && endOffset === 0) {
          
          var _texts = this.texts({
            path: endPath,
            direction: 'backward'
          });

          var _texts2 = slicedToArray(_texts, 1);

          var _texts2$ = slicedToArray(_texts2[0], 2);

          endText = _texts2$[0];
          endPath = _texts2$[1];


          endOffset = endText.text.length;
        }

        while (!startPath.equals(endPath) && startOffset === startText.text.length) {
          
          var _texts3 = this.texts({ path: startPath });

          var _texts4 = slicedToArray(_texts3, 1);

          var _texts4$ = slicedToArray(_texts4[0], 2);

          startText = _texts4$[0];
          startPath = _texts4$[1];

          startOffset = 0;
        }
      }

      if (startPath.equals(endPath)) {
        return startText.marks;
      }

      var startMarks = startText.marks;

      // PERF: if start marks is empty we can return early.
      if (startMarks.size === 0) {
        return Set();
      }

      var endMarks = endText.marks;
      var marks = startMarks.intersect(endMarks);

      // If marks is already empty, the active marks is empty
      if (marks.size === 0) {
        return marks;
      }

      
      var _texts5 = this.texts({ path: startPath });

      var _texts6 = slicedToArray(_texts5, 1);

      var _texts6$ = slicedToArray(_texts6[0], 2);

      startText = _texts6$[0];
      startPath = _texts6$[1];


      while (!startPath.equals(endPath)) {
        if (startText.text.length !== 0) {
          marks = marks.intersect(startText.marks);

          if (marks.size === 0) {
            return Set();
          }
        }

        
        var _texts7 = this.texts({ path: startPath });

        var _texts8 = slicedToArray(_texts7, 1);

        var _texts8$ = slicedToArray(_texts8[0], 2);

        startText = _texts8$[0];
        startPath = _texts8$[1];
      }

      return marks;
    }

    /**
     * Get a list of the ancestors of a descendant.
     *
     * @param {List|String} path
     * @return {List<Node>|Null}
     */

  }, {
    key: 'getAncestors',
    value: function getAncestors(path) {
      var iterable = this.ancestors(path);
      var array = Array.from(iterable, function (_ref6) {
        var _ref7 = slicedToArray(_ref6, 1),
            node = _ref7[0];

        return node;
      }).reverse();
      var list = List(array);
      return list;
    }

    /**
     * Get the leaf block descendants of the node.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocks',
    value: function getBlocks() {
      var iterable = this.blocks({ onlyLeaves: true });
      var array = Array.from(iterable, function (_ref8) {
        var _ref9 = slicedToArray(_ref8, 1),
            node = _ref9[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get all of the leaf blocks that match a `type`.
     *
     * @param {String} type
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocksByType',
    value: function getBlocksByType(type) {
      var iterable = this.blocks({ onlyLeaves: true, onlyTypes: [type] });
      var array = Array.from(iterable, function (_ref10) {
        var _ref11 = slicedToArray(_ref10, 1),
            node = _ref11[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get a child node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getChild',
    value: function getChild(path) {
      path = this.resolvePath(path);

      if (!path || path.size > 1) {
        return null;
      }

      var child = this.nodes.get(path.first());
      return child;
    }

    /**
     * Get closest parent of node that matches a `predicate`.
     *
     * @param {List|String} path
     * @param {Function} predicate
     * @return {Node|Null}
     */

  }, {
    key: 'getClosest',
    value: function getClosest(path, predicate) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.ancestors(path)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _ref12 = _step4.value;

          var _ref13 = slicedToArray(_ref12, 2);

          var n = _ref13[0];
          var p = _ref13[1];

          if (predicate(n, p)) {
            return n;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return null;
    }

    /**
     * Get the closest block parent of a node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestBlock',
    value: function getClosestBlock(path) {
      var closest = this.getClosest(path, function (n) {
        return n.object === 'block';
      });
      return closest;
    }

    /**
     * Get the closest inline parent of a node by `path`.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestInline',
    value: function getClosestInline(path) {
      var closest = this.getClosest(path, function (n) {
        return n.object === 'inline';
      });
      return closest;
    }

    /**
     * Get the closest void parent of a node by `path`.
     *
     * @param {List|String} path
     * @param {Editor} editor
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestVoid',
    value: function getClosestVoid(path, editor) {
      invariant(!Value.isValue(editor), 'As of Slate 0.42.0, the `node.getClosestVoid` method takes an `editor` instead of a `value`.');

      var closest = this.getClosest(path, function (n) {
        return editor.isVoid(n);
      });
      return closest;
    }

    /**
     * Get the common ancestor of nodes `a` and `b`.
     *
     * @param {List} a
     * @param {List} b
     * @return {Node}
     */

  }, {
    key: 'getCommonAncestor',
    value: function getCommonAncestor(a, b) {
      a = this.resolvePath(a);
      b = this.resolvePath(b);

      if (!a || !b) {
        return null;
      }

      var path = PathUtils.relate(a, b);
      var node = this.getNode(path);
      return node;
    }

    /**
     * Get the decorations for the node from an `editor`.
     *
     * @param {Editor} editor
     * @return {List}
     */

  }, {
    key: 'getDecorations',
    value: function getDecorations(editor) {
      var decorations = editor.run('decorateNode', this);
      decorations = Decoration.createList(decorations);
      return decorations;
    }

    /**
     * Get the depth of a descendant, with optional `startAt`.
     *
     * @param {List|String} path
     * @param {Number} startAt
     * @return {Number|Null}
     */

  }, {
    key: 'getDepth',
    value: function getDepth(path) {
      var startAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      path = this.resolvePath(path);

      if (!path) {
        return null;
      }

      var node = this.getNode(path);
      var depth = node ? path.size - 1 + startAt : null;
      return depth;
    }

    /**
     * Get a descendant node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getDescendant',
    value: function getDescendant(path) {
      path = this.resolvePath(path);

      if (!path || !path.size) {
        return null;
      }

      var node = this;

      path.forEach(function (index) {
        node = node.getIn(['nodes', index]);
        return !!node;
      });

      return node;
    }

    /**
     * Get all of the descendant nodes in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getDescendantsAtRange',
    value: function getDescendantsAtRange(range) {
      var iterable = this.descendants({ range: range });
      var array = Array.from(iterable, function (_ref14) {
        var _ref15 = slicedToArray(_ref14, 1),
            node = _ref15[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get a fragment of the node at a `range`.
     *
     * @param {Range} range
     * @return {Document}
     */

  }, {
    key: 'getFragmentAtRange',
    value: function getFragmentAtRange(range) {
      range = this.resolveRange(range);

      if (range.isUnset) {
        return Document.create();
      }

      var _range3 = range,
          start = _range3.start,
          end = _range3.end;

      var node = this;
      var targetPath = end.path;
      var targetPosition = end.offset;
      var side = 'end';

      while (targetPath.size) {
        var index = targetPath.last();
        node = node.splitNode(targetPath, targetPosition);
        targetPosition = index + 1;
        targetPath = PathUtils.lift(targetPath);

        if (!targetPath.size && side === 'end') {
          targetPath = start.path;
          targetPosition = start.offset;
          side = 'start';
        }
      }

      var startIndex = start.path.first() + 1;
      var endIndex = end.path.first() + 2;
      var nodes = node.nodes.slice(startIndex, endIndex);
      var fragment = Document.create({ nodes: nodes });
      return fragment;
    }

    /**
     * Get the furthest ancestors of a node that matches a `predicate`.
     *
     * @param {Path} path
     * @param {Function} predicate
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthest',
    value: function getFurthest(path) {
      var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;

      var iterable = this.ancestors(path);
      var results = Array.from(iterable).reverse();

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = results[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _ref16 = _step5.value;

          var _ref17 = slicedToArray(_ref16, 2);

          var n = _ref17[0];
          var p = _ref17[1];

          if (predicate(n, p)) {
            return n;
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return null;
    }

    /**
     * Get the furthest block parent of a node.
     *
     * @param {Path} path
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestBlock',
    value: function getFurthestBlock(path) {
      var furthest = this.getFurthest(path, function (n) {
        return n.object === 'block';
      });
      return furthest;
    }

    /**
     * Get the furthest child ancestor of a node at `path`.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestChild',
    value: function getFurthestChild(path) {
      path = this.resolvePath(path);

      if (!path || !path.size) {
        return null;
      }

      var furthest = this.nodes.get(path.first());
      return furthest;
    }

    /**
     * Get the furthest inline parent of a node.
     *
     * @param {Path} path
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestInline',
    value: function getFurthestInline(path) {
      var furthest = this.getFurthest(path, function (n) {
        return n.object === 'inline';
      });
      return furthest;
    }

    /**
     * Get the closest inline nodes for each text node in the node.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getInlines',
    value: function getInlines() {
      var iterable = this.inlines({ onlyLeaves: true });
      var array = Array.from(iterable, function (_ref18) {
        var _ref19 = slicedToArray(_ref18, 1),
            node = _ref19[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get all of the leaf inline nodes that match a `type`.
     *
     * @param {String} type
     * @return {List<Node>}
     */

  }, {
    key: 'getInlinesByType',
    value: function getInlinesByType(type) {
      var iterable = this.inlines({ onlyLeaves: true, onlyTypes: [type] });
      var array = Array.from(iterable, function (_ref20) {
        var _ref21 = slicedToArray(_ref20, 1),
            node = _ref21[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get a set of marks that would occur on the next insert at a `point` in the
     * node. This mimics expected rich text editing behaviors of mark contiuation.
     *
     * @param {Point} point
     * @return {Set<Mark>}
     */

  }, {
    key: 'getInsertMarksAtPoint',
    value: function getInsertMarksAtPoint(point) {
      point = this.resolvePoint(point);
      var _point = point,
          path = _point.path,
          offset = _point.offset;

      var text = this.getDescendant(path);

      // PERF: we can exit early if the offset isn't at the start of the node.
      if (offset !== 0) {
        return text.marks;
      }

      var blockNode = void 0;
      var blockPath = void 0;

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.ancestors(path)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var entry = _step6.value;

          var _entry = slicedToArray(entry, 2),
              n = _entry[0],
              p = _entry[1];

          if (n.object === 'block') {
            blockNode = n;
            blockPath = p;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      var relativePath = PathUtils.drop(path, blockPath.size);

      var _blockNode$texts = blockNode.texts({
        path: relativePath,
        direction: 'backward'
      }),
          _blockNode$texts2 = slicedToArray(_blockNode$texts, 1),
          previous = _blockNode$texts2[0];

      // If there's no previous text, we're at the start of the block, so use
      // the current text nodes marks.


      if (!previous) {
        return text.marks;
      }

      // Otherwise, continue with the previous text node's marks instead.

      var _previous = slicedToArray(previous, 1),
          previousText = _previous[0];

      return previousText.marks;
    }

    /**
     * Get a set of marks that would occur on the next insert at a `range`.
     * This mimics expected rich text editing behaviors of mark contiuation.
     *
     * @param {Range} range
     * @return {Set<Mark>}
     */

  }, {
    key: 'getInsertMarksAtRange',
    value: function getInsertMarksAtRange(range) {
      range = this.resolveRange(range);
      var _range4 = range,
          start = _range4.start;


      if (range.isUnset) {
        return Set();
      }

      if (range.isCollapsed) {
        return this.getInsertMarksAtPoint(start);
      }

      var text = this.getDescendant(start.path);
      return text.marks;
    }

    /**
     * Get the bottom-most block descendants in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getLeafBlocksAtRange',
    value: function getLeafBlocksAtRange(range) {
      var iterable = this.blocks({ range: range, onlyLeaves: true });
      var array = Array.from(iterable, function (_ref22) {
        var _ref23 = slicedToArray(_ref22, 1),
            node = _ref23[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get the bottom-most inline nodes for each text node in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getLeafInlinesAtRange',
    value: function getLeafInlinesAtRange(range) {
      var iterable = this.inlines({ range: range, onlyLeaves: true });
      var array = Array.from(iterable, function (_ref24) {
        var _ref25 = slicedToArray(_ref24, 1),
            node = _ref25[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get an object mapping all the keys in the node to their paths.
     *
     * @return {Map}
     */

  }, {
    key: 'getNodesToPathsMap',
    value: function getNodesToPathsMap() {
      var root = this;
      var map = typeof window === 'undefined' ? new global$1.Map() : new window.Map();

      map.set(root, PathUtils.create([]));

      root.forEachDescendant(function (node, path) {
        map.set(node, path);
      });

      return map;
    }

    /**
     * Get all of the marks for all of the characters of every text node.
     *
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getMarks',
    value: function getMarks() {
      var iterable = this.marks();
      var array = Array.from(iterable, function (_ref26) {
        var _ref27 = slicedToArray(_ref26, 1),
            mark = _ref27[0];

        return mark;
      });
      return OrderedSet(array);
    }

    /**
     * Get a set of the marks in a `range`.
     *
     * @param {Range} range
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getMarksAtRange',
    value: function getMarksAtRange(range) {
      var iterable = this.marks({ range: range });
      var array = Array.from(iterable, function (_ref28) {
        var _ref29 = slicedToArray(_ref28, 1),
            mark = _ref29[0];

        return mark;
      });
      return OrderedSet(array);
    }

    /**
     * Get all of the marks that match a `type`.
     *
     * @param {String} type
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getMarksByType',
    value: function getMarksByType(type) {
      var iterable = this.marks({ onlyTypes: [type] });
      var array = Array.from(iterable, function (_ref30) {
        var _ref31 = slicedToArray(_ref30, 1),
            mark = _ref31[0];

        return mark;
      });
      return OrderedSet(array);
    }

    /**
     * Get the block node after a descendant text node by `path`.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNextBlock',
    value: function getNextBlock(path) {
      var _blocks = this.blocks({ path: path, onlyLeaves: true }),
          _blocks2 = slicedToArray(_blocks, 1),
          entry = _blocks2[0];

      var block = entry ? entry[0] : null;
      return block;
    }

    /**
     * Get the next node in the tree, returning siblings or ancestor siblings.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNextNode',
    value: function getNextNode(path) {
      var iterable = this.createIterable({ path: path, downward: false });

      var _iterable = slicedToArray(iterable, 1),
          entry = _iterable[0];

      var node = entry ? entry[0] : null;
      return node;
    }

    /**
     * Get the next sibling of a node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNextSibling',
    value: function getNextSibling(path) {
      var _siblings = this.siblings(path),
          _siblings2 = slicedToArray(_siblings, 1),
          entry = _siblings2[0];

      var node = entry ? entry[0] : null;
      return node;
    }

    /**
     * Get the text node after a descendant text node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNextText',
    value: function getNextText(path) {
      var _texts9 = this.texts({ path: path }),
          _texts10 = slicedToArray(_texts9, 1),
          entry = _texts10[0];

      var node = entry ? entry[0] : null;
      return node;
    }

    /**
     * Get the offset for a descendant text node by `path` or `key`.
     *
     * @param {List|string} path
     * @return {Number}
     */

  }, {
    key: 'getOffset',
    value: function getOffset(path) {
      path = this.resolvePath(path);
      this.assertDescendant(path);

      // Calculate the offset of the nodes before the highest child.
      var index = path.first();

      var offset = this.nodes.slice(0, index).reduce(function (memo, n) {
        return memo + n.text.length;
      }, 0);

      // Recurse if need be.
      var ret = path.size === 1 ? offset : offset + this.nodes.get(index).getOffset(PathUtils.drop(path));

      return ret;
    }

    /**
     * Get the offset from a `range`.
     *
     * @param {Range} range
     * @return {Number}
     */

  }, {
    key: 'getOffsetAtRange',
    value: function getOffsetAtRange(range) {
      range = this.resolveRange(range);

      if (range.isUnset) {
        throw new Error('The range cannot be unset to calculcate its offset.');
      }

      if (range.isExpanded) {
        throw new Error('The range must be collapsed to calculcate its offset.');
      }

      var _range5 = range,
          start = _range5.start;

      var offset = this.getOffset(start.path) + start.offset;
      return offset;
    }

    /**
     * Get the parent of a descendant node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getParent',
    value: function getParent(path) {
      path = this.resolvePath(path);
      if (!path) return null;
      if (!path.size) return null;
      var parentPath = PathUtils.lift(path);
      var parent = this.getNode(parentPath);
      return parent;
    }

    /**
     * Get the block node before a descendant text node by `path`.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousBlock',
    value: function getPreviousBlock(path) {
      var _blocks3 = this.blocks({
        path: path,
        onlyLeaves: true,
        direction: 'backward'
      }),
          _blocks4 = slicedToArray(_blocks3, 1),
          entry = _blocks4[0];

      var block = entry ? entry[0] : null;
      return block;
    }

    /**
     * Get the previous node from a node in the tree.
     *
     * This will not only check for siblings but instead move up the tree
     * returning the previous ancestor if no sibling is found.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousNode',
    value: function getPreviousNode(path) {
      var iterable = this.createIterable({
        path: path,
        downward: false,
        direction: 'backward'
      });

      var _iterable2 = slicedToArray(iterable, 1),
          entry = _iterable2[0];

      var node = entry ? entry[0] : null;
      return node;
    }

    /**
     * Get the previous sibling of a node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousSibling',
    value: function getPreviousSibling(path) {
      var _siblings3 = this.siblings(path, { direction: 'backward' }),
          _siblings4 = slicedToArray(_siblings3, 1),
          entry = _siblings4[0];

      var node = entry ? entry[0] : null;
      return node;
    }

    /**
     * Get the text node before a descendant text node.
     *
     * @param {List|String} path
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousText',
    value: function getPreviousText(path) {
      var _texts11 = this.texts({ path: path, direction: 'backward' }),
          _texts12 = slicedToArray(_texts11, 1),
          entry = _texts12[0];

      var node = entry ? entry[0] : null;
      return node;
    }

    /**
     * Get only the root block nodes in a `range`.
     *
     * @param {Range} range
     * @return {List}
     */

  }, {
    key: 'getRootBlocksAtRange',
    value: function getRootBlocksAtRange(range) {
      var iterable = this.blocks({ range: range, onlyRoots: true });
      var array = Array.from(iterable, function (_ref32) {
        var _ref33 = slicedToArray(_ref32, 1),
            node = _ref33[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get only the root inline nodes in a `range`.
     *
     * @param {Range} range
     * @return {List}
     */

  }, {
    key: 'getRootInlinesAtRange',
    value: function getRootInlinesAtRange(range) {
      var iterable = this.inlines({ range: range, onlyRoots: true });
      var array = Array.from(iterable, function (_ref34) {
        var _ref35 = slicedToArray(_ref34, 1),
            node = _ref35[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get the descendent text node at an `offset`.
     *
     * @param {String} offset
     * @return {Node|Null}
     */

  }, {
    key: 'getTextAtOffset',
    value: function getTextAtOffset(offset) {
      // PERF: Add a few shortcuts for the obvious cases.
      if (offset === 0) return this.getFirstText();
      if (offset === this.text.length) return this.getLastText();
      if (offset < 0 || offset > this.text.length) return null;

      var length = 0;

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.texts()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _ref36 = _step7.value;

          var _ref37 = slicedToArray(_ref36, 1);

          var node = _ref37[0];

          length += node.text.length;

          if (length > offset) {
            return node;
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return null;
    }

    /**
     * Get the direction of the node's text.
     *
     * @return {String}
     */

  }, {
    key: 'getTextDirection',
    value: function getTextDirection() {
      var dir = getDirection(this.text);
      return dir === 'neutral' ? null : dir;
    }

    /**
     * Recursively get all of the child text nodes in order of appearance.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getTexts',
    value: function getTexts() {
      var iterable = this.texts();
      var array = Array.from(iterable, function (_ref38) {
        var _ref39 = slicedToArray(_ref38, 1),
            node = _ref39[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Get all of the text nodes in a `range` as a List.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getTextsAtRange',
    value: function getTextsAtRange(range) {
      var iterable = this.texts({ range: range });
      var array = Array.from(iterable, function (_ref40) {
        var _ref41 = slicedToArray(_ref40, 1),
            node = _ref41[0];

        return node;
      });
      var list = List(array);
      return list;
    }

    /**
     * Check if the node has block children.
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasBlockChildren',
    value: function hasBlockChildren() {
      return !!(this.nodes && this.nodes.find(function (n) {
        return n.object === 'block';
      }));
    }

    /**
     * Check if a child node exists.
     *
     * @param {List|String} path
     * @return {Boolean}
     */

  }, {
    key: 'hasChild',
    value: function hasChild(path) {
      var child = this.getChild(path);
      return !!child;
    }

    /**
     * Check if a node has inline children.
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasInlineChildren',
    value: function hasInlineChildren() {
      return !!(this.nodes && this.nodes.find(function (n) {
        return n.object === 'inline' || n.object === 'text';
      }));
    }

    /**
     * Recursively check if a child node exists.
     *
     * @param {List|String} path
     * @return {Boolean}
     */

  }, {
    key: 'hasDescendant',
    value: function hasDescendant(path) {
      var descendant = this.getDescendant(path);
      return !!descendant;
    }

    /**
     * Check if a node has a void parent.
     *
     * @param {List|String} path
     * @param {Editor} editor
     * @return {Boolean}
     */

  }, {
    key: 'hasVoidParent',
    value: function hasVoidParent(path, editor) {
      invariant(!Value.isValue(editor), 'As of Slate 0.42.0, the `node.hasVoidParent` method takes an `editor` instead of a `value`.');

      var closest = this.getClosestVoid(path, editor);
      return !!closest;
    }

    /**
     * Create an iteratable for all of the inlines of a node with `options`.
     *
     * @param {Options}
     * @return {Iterable}
     */

  }, {
    key: 'inlines',
    value: function inlines() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var onlyLeaves = options.onlyLeaves,
          onlyRoots = options.onlyRoots,
          onlyTypes = options.onlyTypes,
          _match2 = options.match,
          rest = objectWithoutProperties(options, ['onlyLeaves', 'onlyRoots', 'onlyTypes', 'match']);

      var iterable = this.descendants(_extends({
        includeBlocks: false,
        includeTexts: false,
        includeDocument: false
      }, rest, {
        match: function match(node, path) {
          if (onlyTypes && !onlyTypes.includes(node.type)) {
            return false;
          } else if (onlyLeaves && !node.isLeafInline()) {
            return false;
          } else if (onlyRoots && _this.getParent(path).object !== 'block') {
            return false;
          } else if (_match2 && !_match2(node, path)) {
            return false;
          } else {
            return true;
          }
        }
      }));

      return iterable;
    }

    /**
     * Insert a `node`.
     *
     * @param {List|String} path
     * @param {Node} node
     * @return {Node}
     */

  }, {
    key: 'insertNode',
    value: function insertNode(path, node) {
      path = this.resolvePath(path);
      var index = path.last();
      var parentPath = PathUtils.lift(path);
      var parent = this.assertNode(parentPath);
      var nodes = parent.nodes.splice(index, 0, node);
      parent = parent.set('nodes', nodes);
      var ret = this.replaceNode(parentPath, parent);
      return ret;
    }

    /**
     * Insert `text` at `offset` in node by `path`.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {String} text
     * @return {Node}
     */

  }, {
    key: 'insertText',
    value: function insertText(path, offset, text) {
      path = this.resolvePath(path);
      var node = this.assertDescendant(path);
      node = node.insertText(offset, text);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Check whether the node is a leaf block.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isLeafBlock',
    value: function isLeafBlock() {
      if (this.object !== 'block') {
        return false;
      }

      if (this.nodes.some(function (n) {
        return n.object === 'block';
      })) {
        return false;
      }

      return true;
    }

    /**
     * Check whether the node is a leaf inline.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isLeafInline',
    value: function isLeafInline() {
      if (this.object !== 'inline') {
        return false;
      }

      if (this.nodes.some(function (n) {
        return n.object === 'inline';
      })) {
        return false;
      }

      return true;
    }

    /**
     * Check whether a descendant node is inside a `range` by `path`.
     *
     * @param {List|String} path
     * @param {Range} range
     * @return {Node}
     */

  }, {
    key: 'isInRange',
    value: function isInRange(path, range) {
      path = this.resolvePath(path);
      range = this.resolveRange(range);

      if (range.isUnset) {
        return false;
      }

      var toStart = PathUtils.compare(path, range.start.path);
      var toEnd = PathUtils.compare(path, range.end.path);
      var isInRange = toStart !== -1 && toEnd !== 1;
      return isInRange;
    }

    /**
     * Map all child nodes, updating them in their parents. This method is
     * optimized to not return a new node if no changes are made.
     *
     * @param {Function} predicate
     * @return {Node}
     */

  }, {
    key: 'mapChildren',
    value: function mapChildren() {
      var _this2 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : identity;
      var nodes = this.nodes;


      nodes.forEach(function (node, i) {
        var ret = predicate(node, i, _this2.nodes);
        if (ret !== node) nodes = nodes.set(ret.key, ret);
      });

      var ret = this.set('nodes', nodes);
      return ret;
    }

    /**
     * Map all descendant nodes, updating them in their parents. This method is
     * optimized to not return a new node if no changes are made.
     *
     * @param {Function} predicate
     * @return {Node}
     */

  }, {
    key: 'mapDescendants',
    value: function mapDescendants() {
      var _this3 = this;

      var predicate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : identity;
      var nodes = this.nodes;


      nodes.forEach(function (node, index) {
        var ret = node;
        if (ret.object !== 'text') ret = ret.mapDescendants(predicate);
        ret = predicate(ret, index, _this3.nodes);
        if (ret === node) return;

        nodes = nodes.set(index, ret);
      });

      var ret = this.set('nodes', nodes);
      return ret;
    }

    /**
     * Create an iteratable for all the marks in text nodes with `options`.
     *
     * @param {Options}
     * @return {Iterable}
     */

  }, {
    key: 'marks',
    value: function marks() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$onlyTypes = options.onlyTypes,
          onlyTypes = _options$onlyTypes === undefined ? null : _options$onlyTypes,
          match = options.match,
          rest = objectWithoutProperties(options, ['onlyTypes', 'match']);

      var texts = this.texts(rest);

      return defineProperty({}, Symbol.iterator, function () {
        var iterator = texts[Symbol.iterator]();
        var node = null;
        var path = null;
        var remaining = [];

        var next = function next() {
          if (remaining.length) {
            var mark = remaining.shift();

            if (onlyTypes && !onlyTypes.includes(mark.type)) {
              return next();
            } else if (match && !match(mark, node, path)) {
              return next();
            }

            return { value: [mark, node, path], done: false };
          }

          var _iterator$next = iterator.next(),
              value = _iterator$next.value,
              done = _iterator$next.done;

          if (done) {
            return { done: true };
          }

          
          var _value = slicedToArray(value, 2);

          node = _value[0];
          path = _value[1];

          remaining = node.marks.toArray();
          return next();
        };

        return { next: next };
      });
    }

    /**
     * Merge a node backwards its previous sibling.
     *
     * @param {List|Key} path
     * @return {Node}
     */

  }, {
    key: 'mergeNode',
    value: function mergeNode(path) {
      var b = this.assertNode(path);
      path = this.resolvePath(path);

      if (path.last() === 0) {
        throw new Error('Unable to merge node because it has no previous sibling: ' + b);
      }

      var withPath = PathUtils.decrement(path);
      var a = this.assertNode(withPath);

      if (a.object !== b.object) {
        throw new Error('Unable to merge two different kinds of nodes: ' + a + ' and ' + b);
      }

      var newNode = a.object === 'text' ? a.mergeText(b) : a.set('nodes', a.nodes.concat(b.nodes));

      var ret = this;
      ret = ret.removeNode(path);
      ret = ret.removeNode(withPath);
      ret = ret.insertNode(withPath, newNode);
      return ret;
    }

    /**
     * Move a node by `path` to `newPath`.
     *
     * A `newIndex` can be provided when move nodes by `key`, to account for not
     * being able to have a key for a location in the tree that doesn't exist yet.
     *
     * @param {List|Key} path
     * @param {List|Key} newPath
     * @param {Number} newIndex
     * @return {Node}
     */

  }, {
    key: 'moveNode',
    value: function moveNode(path, newPath) {
      var newIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var node = this.assertNode(path);
      path = this.resolvePath(path);
      newPath = this.resolvePath(newPath, newIndex);

      var newParentPath = PathUtils.lift(newPath);
      this.assertNode(newParentPath);

      // TODO: this is a bit hacky, re-creating the operation that led to this method being called
      // Alternative 1: pass the operation through from apply -> value.moveNode
      // Alternative 2: add a third property to the operation called "transformedNewPath", pass that through
      var op = Operation.create({
        type: 'move_node',
        path: path,
        newPath: newPath
      });
      newPath = PathUtils.transform(path, op).first();

      var ret = this;
      ret = ret.removeNode(path);
      ret = ret.insertNode(newPath, node);
      return ret;
    }

    /**
     * Remove `mark` from text at `path`.
     *
     * @param {List} path
     * @param {Mark} mark
     * @return {Node}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(path, mark) {
      path = this.resolvePath(path);
      var node = this.assertDescendant(path);
      node = node.removeMark(mark);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Remove a node.
     *
     * @param {List|String} path
     * @return {Node}
     */

  }, {
    key: 'removeNode',
    value: function removeNode(path) {
      this.assertDescendant(path);
      path = this.resolvePath(path);
      var deep = path.flatMap(function (x) {
        return ['nodes', x];
      });
      var ret = this.deleteIn(deep);
      return ret;
    }

    /**
     * Remove `text` at `offset` in node.
     *
     * @param {List|Key} path
     * @param {Number} offset
     * @param {String} text
     * @return {Node}
     */

  }, {
    key: 'removeText',
    value: function removeText(path, offset, text) {
      var node = this.assertDescendant(path);
      node = node.removeText(offset, text.length);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Replace a `node` in the tree.
     *
     * @param {List|Key} path
     * @param {Node} node
     * @return {Node}
     */

  }, {
    key: 'replaceNode',
    value: function replaceNode(path, node) {
      path = this.resolvePath(path);

      if (!path) {
        throw new Error('Unable to replace a node because it could not be found in the first place: ' + path);
      }

      if (!path.size) return node;
      this.assertNode(path);
      var deep = path.flatMap(function (x) {
        return ['nodes', x];
      });
      var ret = this.setIn(deep, node);
      return ret;
    }

    /**
     * Resolve a `annotation`, relative to the node, ensuring that the keys and
     * offsets in the annotation exist and that they are synced with the paths.
     *
     * @param {Annotation|Object} annotation
     * @return {Annotation}
     */

  }, {
    key: 'resolveAnnotation',
    value: function resolveAnnotation(annotation) {
      annotation = Annotation.create(annotation);
      annotation = annotation.normalize(this);
      return annotation;
    }

    /**
     * Resolve a `decoration`, relative to the node, ensuring that the keys and
     * offsets in the decoration exist and that they are synced with the paths.
     *
     * @param {Decoration|Object} decoration
     * @return {Decoration}
     */

  }, {
    key: 'resolveDecoration',
    value: function resolveDecoration(decoration) {
      decoration = Decoration.create(decoration);
      decoration = decoration.normalize(this);
      return decoration;
    }

    /**
     * Resolve a `point`, relative to the node, ensuring that the keys and
     * offsets in the point exist and that they are synced with the paths.
     *
     * @param {Point|Object} point
     * @return {Point}
     */

  }, {
    key: 'resolvePoint',
    value: function resolvePoint(point) {
      point = Point.create(point);
      point = point.normalize(this);
      return point;
    }

    /**
     * Resolve a `range`, relative to the node, ensuring that the keys and
     * offsets in the range exist and that they are synced with the paths.
     *
     * @param {Range|Object} range
     * @return {Range}
     */

  }, {
    key: 'resolveRange',
    value: function resolveRange(range) {
      range = Range.create(range);
      range = range.normalize(this);
      return range;
    }

    /**
     * Resolve a `selection`, relative to the node, ensuring that the keys and
     * offsets in the selection exist and that they are synced with the paths.
     *
     * @param {Selection|Object} selection
     * @return {Selection}
     */

  }, {
    key: 'resolveSelection',
    value: function resolveSelection(selection) {
      selection = Selection.create(selection);
      selection = selection.normalize(this);
      return selection;
    }

    /**
     * Set `properties` on a node.
     *
     * @param {List|String} path
     * @param {Object} properties
     * @return {Node}
     */

  }, {
    key: 'setNode',
    value: function setNode(path, properties) {
      var node = this.assertNode(path);
      node = node.merge(properties);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Set `properties` on `mark` on text at `offset` and `length` in node.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @param {Number} length
     * @param {Mark} mark
     * @param {Object} properties
     * @return {Node}
     */

  }, {
    key: 'setMark',
    value: function setMark(path, properties, newProperties) {
      path = this.resolvePath(path);
      var node = this.assertDescendant(path);
      node = node.setMark(properties, newProperties);
      var ret = this.replaceNode(path, node);
      return ret;
    }

    /**
     * Create an iteratable for the siblings in the tree at `path`.
     *
     * @param {List|Array} path
     * @return {Iterable}
     */

  }, {
    key: 'siblings',
    value: function siblings(path, options) {
      var iterable = this.createIterable(_extends({
        path: path,
        upward: false,
        downward: false
      }, options));

      return iterable;
    }

    /**
     * Split a node by `path` at `position` with optional `properties` to apply
     * to the newly split node.
     *
     * @param {List|String} path
     * @param {Number} position
     * @param {Object} properties
     * @return {Node}
     */

  }, {
    key: 'splitNode',
    value: function splitNode(path, position, properties) {
      var child = this.assertNode(path);
      path = this.resolvePath(path);
      var a = void 0;
      var b = void 0;

      if (child.object === 'text') {
        
        var _child$splitText = child.splitText(position);

        var _child$splitText2 = slicedToArray(_child$splitText, 2);

        a = _child$splitText2[0];
        b = _child$splitText2[1];
      } else {
        var befores = child.nodes.take(position);
        var afters = child.nodes.skip(position);
        a = child.set('nodes', befores);
        b = child.set('nodes', afters).regenerateKey();
      }

      if (properties && child.object !== 'text') {
        b = b.merge(properties);
      }

      var ret = this;
      ret = ret.removeNode(path);
      ret = ret.insertNode(path, b);
      ret = ret.insertNode(path, a);
      return ret;
    }

    /**
     * Create an iteratable for all the text node descendants.
     *
     * @param {Object} options
     * @return {Iterable}
     */

  }, {
    key: 'texts',
    value: function texts(options) {
      var iterable = this.descendants(_extends({
        includeBlocks: false,
        includeInlines: false,
        includeDocument: false
      }, options));

      return iterable;
    }

    /**
     * Deprecated.
     */

  }, {
    key: 'getBlocksAtRange',
    value: function getBlocksAtRange(range) {
      warning(false, 'As of slate@0.44 the `node.getBlocksAtRange` method has been renamed to `getLeafBlocksAtRange`.');

      return this.getLeafBlocksAtRange(range);
    }
  }, {
    key: 'getBlocksAtRangeAsArray',
    value: function getBlocksAtRangeAsArray(range) {
      warning(false, 'As of slate@0.44 the `node.getBlocksAtRangeAsArray` method has been renamed to `getLeafBlocksAtRangeAsArray`.');

      return this.getLeafBlocksAtRangeAsArray(range);
    }
  }, {
    key: 'getInlinesAtRange',
    value: function getInlinesAtRange(range) {
      warning(false, 'As of slate@0.44 the `node.getInlinesAtRange` method has been renamed to `getLeafInlinesAtRange`.');

      return this.getLeafInlinesAtRange(range);
    }
  }, {
    key: 'getInlinesAtRangeAsArray',
    value: function getInlinesAtRangeAsArray(range) {
      warning(false, 'As of slate@0.44 the `node.getInlinesAtRangeAsArray` method has been renamed to `getLeafInlinesAtRangeAsArray`.');

      return this.getLeafInlinesAtRangeAsArray(range);
    }
  }, {
    key: 'getNextTextAndPath',
    value: function getNextTextAndPath(path) {
      warning(false, 'As of slate@0.47, the `getNextTextAndPath` method has been renamed to `getNextTextEntry`.');

      return this.getNextTextEntry(path);
    }
  }, {
    key: 'getNextDeepMatchingNodeAndPath',
    value: function getNextDeepMatchingNodeAndPath(path) {
      var iterator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };

      warning(false, 'As of slate@0.47, the `getNextDeepMatchingNodeAndPath` method is deprecated.');

      var match = this.getNextMatchingNodeAndPath(path);

      if (!match) return null;

      var _match3 = slicedToArray(match, 2),
          nextNode = _match3[0],
          nextPath = _match3[1];

      var childMatch = void 0;

      var assign = function assign() {
        childMatch = nextNode.object !== 'text' && nextNode.findFirstDescendantAndPath(iterator, nextPath);
        return childMatch;
      };

      while (assign(childMatch)) {
        var _childMatch = childMatch;

        var _childMatch2 = slicedToArray(_childMatch, 2);

        nextNode = _childMatch2[0];
        nextPath = _childMatch2[1];
      }

      if (!nextNode) return null;

      return iterator(nextNode) ? [nextNode, nextPath] : this.getNextDeepMatchingNodeAndPath(match[1], iterator);
    }
  }, {
    key: 'getPreviousTextAndPath',
    value: function getPreviousTextAndPath(path) {
      warning(false, 'As of slate@0.47, the `getPreviousTextAndPath` method has been renamed to `getPreviousTextEntry`.');

      return this.getPreviousTextEntry(path);
    }
  }, {
    key: 'findFirstDescendantAndPath',
    value: function findFirstDescendantAndPath(iterator, pathToThisNode) {
      warning(false, 'As of slate@0.47, the `findFirstDescendantAndPath` method is deprecated.');

      return this.findDescendantAndPath(iterator, pathToThisNode, false);
    }
  }, {
    key: 'getPreviousMatchingNodeAndPath',
    value: function getPreviousMatchingNodeAndPath(path) {
      var iterator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };

      warning(false, 'As of slate@0.47, the `getPreviousMatchingNodeAndPath` method is deprecated.');

      if (!path) return null;

      for (var i = path.size; i > 0; i--) {
        var p = path.slice(0, i);
        if (p.last() === 0) continue;

        var previousPath = PathUtils.decrement(p);
        var previousNode = this.getNode(previousPath);

        while (previousNode && !iterator(previousNode)) {
          previousPath = PathUtils.decrement(previousPath);
          previousNode = this.getNode(previousPath);
        }

        if (previousNode) return [previousNode, previousPath];
      }

      return null;
    }
  }, {
    key: 'getPreviousDeepMatchingNodeAndPath',
    value: function getPreviousDeepMatchingNodeAndPath(path) {
      var iterator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };

      warning(false, 'As of slate@0.47, the `getPreviousDeepMatchingNodeAndPath` method is deprecated.');

      var match = this.getPreviousMatchingNodeAndPath(path);

      if (!match) return null;

      var _match4 = slicedToArray(match, 2),
          previousNode = _match4[0],
          previousPath = _match4[1];

      var childMatch = void 0;

      var assign = function assign() {
        childMatch = previousNode.object !== 'text' && previousNode.findLastDescendantAndPath(iterator, previousPath);
        return childMatch;
      };

      while (assign(childMatch)) {
        var _childMatch3 = childMatch;

        var _childMatch4 = slicedToArray(_childMatch3, 2);

        previousNode = _childMatch4[0];
        previousPath = _childMatch4[1];
      }

      if (!previousNode) return null;

      return iterator(previousNode) ? [previousNode, previousPath] : this.getPreviousDeepMatchingNodeAndPath(match[1], iterator);
    }
  }, {
    key: 'findLastDescendantAndPath',
    value: function findLastDescendantAndPath(iterator, pathToThisNode) {
      warning(false, 'As of slate@0.47, the `findLastDescendantAndPath` method is deprecated.');

      return this.findDescendantAndPath(iterator, pathToThisNode, true);
    }
  }, {
    key: 'findDescendantAndPath',
    value: function findDescendantAndPath(iterator) {
      var pathToThisNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PathUtils.create([]);
      var findLast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      warning(false, 'As of slate@0.47, the `findDescendantAndPath` method is deprecated.');

      var found = void 0;
      var foundPath = void 0;

      this.forEachDescendantWithPath(function (node, path, nodes) {
        if (iterator(node, path, nodes)) {
          found = node;
          foundPath = path;
          return false;
        }
      }, pathToThisNode, findLast);

      return found ? [found, foundPath] : null;
    }
  }, {
    key: 'forEachDescendantWithPath',
    value: function forEachDescendantWithPath(iterator) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PathUtils.create([]);
      var findLast = arguments[2];

      warning(false, 'As of slate@0.47, the `forEachDescendantWithPath` method is deprecated.');

      var nodes = this.nodes;
      var ret = void 0;

      if (findLast) nodes = nodes.reverse();

      nodes.forEach(function (child, i) {
        var childPath = path.concat(i);

        if (iterator(child, childPath, nodes) === false) {
          ret = false;
          return false;
        }

        if (child.object !== 'text') {
          ret = child.forEachDescendantWithPath(iterator, childPath, findLast);
          return ret;
        }
      });

      return ret;
    }
  }, {
    key: 'getNextMatchingNodeAndPath',
    value: function getNextMatchingNodeAndPath(path) {
      var iterator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };

      warning(false, 'As of slate@0.47, the `getNextMatchingNodeAndPath` method is deprecated.');

      if (!path) return null;

      for (var i = path.size; i > 0; i--) {
        var p = path.slice(0, i);

        var nextPath = PathUtils.increment(p);
        var nextNode = this.getNode(nextPath);

        while (nextNode && !iterator(nextNode)) {
          nextPath = PathUtils.increment(nextPath);
          nextNode = this.getNode(nextPath);
        }

        if (nextNode) return [nextNode, nextPath];
      }

      return null;
    }
  }, {
    key: 'getSelectionIndexes',
    value: function getSelectionIndexes(range) {
      var isSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      warning(false, 'As of slate@0.47, the `getSelectionIndexes` method is deprecated.');

      var start = range.start,
          end = range.end;

      // PERF: if we're not selected, we can exit early.

      if (!isSelected) {
        return null;
      }

      // PERF: if we've been given an invalid selection we can exit early.
      if (range.isUnset) {
        return null;
      }

      // PERF: if the start and end keys are the same, just check for the child
      // that contains that single key.
      if (start.path.equals(end.path)) {
        var child = this.getFurthestAncestor(start.path);
        var index = child ? this.nodes.indexOf(child) : null;
        return { start: index, end: index + 1 };
      }

      // Otherwise, check all of the children...
      var startIndex = null;
      var endIndex = null;

      this.nodes.forEach(function (child, i) {
        if (child.object === 'text') {
          if (startIndex == null && child.key === start.key) startIndex = i;
          if (endIndex == null && child.key === end.key) endIndex = i + 1;
        } else {
          if (startIndex == null && child.hasDescendant(start.key)) startIndex = i;
          if (endIndex == null && child.hasDescendant(end.key)) endIndex = i + 1;
        }

        // PERF: exit early if both start and end have been found.
        return startIndex == null || endIndex == null;
      });

      if (isSelected && startIndex == null) {
        startIndex = 0;
      }

      if (isSelected && endIndex == null) {
        endIndex = this.nodes.size;
      }

      if (startIndex == null) {
        return null;
      }

      return { start: startIndex, end: endIndex };
    }
  }, {
    key: 'getTextsBetweenPositionsAsArray',
    value: function getTextsBetweenPositionsAsArray(startPath, endPath) {
      warning(false, 'As of slate@0.47, the `getTextsBetweenPositionsAsArray` method is deprecated.');

      startPath = this.resolvePath(startPath);
      endPath = this.resolvePath(endPath);

      return this.getTextsBetweenPathPositionsAsArray(startPath, endPath);
    }
  }, {
    key: 'getOrderedMarksBetweenPositions',
    value: function getOrderedMarksBetweenPositions(startPath, startOffset, endPath, endOffset) {
      warning(false, 'As of slate@0.47, the `getOrderedMarksBetweenPositions` method is deprecated.');

      startPath = this.resolvePath(startPath);
      endPath = this.resolvePath(endPath);
      var startText = this.getDescendant(startPath);

      // PERF: if the paths are equal, we can just use the start.
      if (PathUtils.isEqual(startPath, endPath)) {
        return startText.marks;
      }

      var texts = this.getTextsBetweenPathPositionsAsArray(startPath, endPath);

      return OrderedSet().withMutations(function (result) {
        texts.forEach(function (text) {
          result.union(text.marks);
        });
      });
    }
  }, {
    key: 'getTextsBetweenPathPositionsAsArray',
    value: function getTextsBetweenPathPositionsAsArray(startPath, endPath) {
      warning(false, 'As of slate@0.47, the `getTextsBetweenPathPositionsAsArray` method is deprecated.');

      // PERF: the most common case is when the range is in a single text node,
      // where we can avoid a lot of iterating of the tree.
      if (startPath && endPath && PathUtils.isEqual(startPath, endPath)) {
        return [this.getDescendant(startPath)];
      } else if (!startPath && !endPath) {
        return this.getTextsAsArray();
      }

      var startIndex = startPath ? startPath.get(0, 0) : 0;
      var endIndex = endPath ? endPath.get(0, this.nodes.size - 1) : this.nodes.size - 1;

      var array = [];

      this.nodes.slice(startIndex, endIndex + 1).forEach(function (node, i) {
        if (node.object === 'text') {
          array.push(node);
        } else {
          // For the node at start and end of this list, we want to provide a start and end path
          // For other nodes, we can just get all their text nodes, they are between the paths
          var childStartPath = startPath && i === 0 ? PathUtils.drop(startPath) : null;
          var childEndPath = endPath && i === endIndex - startIndex ? PathUtils.drop(endPath) : null;

          array = array.concat(node.getTextsBetweenPathPositionsAsArray(childStartPath, childEndPath));
        }
      });

      return array;
    }
  }, {
    key: 'getFurthestAncestor',
    value: function getFurthestAncestor(path) {
      warning(false, 'As of slate@0.47, the `getFurthestAncestor` method has been renamed to `getFurthestChild`.');

      return this.getFurthestChild(path);
    }
  }, {
    key: 'getLeafBlocksAtRangeAsArray',
    value: function getLeafBlocksAtRangeAsArray(range) {
      warning(false, 'As of slate@0.47, the `getLeafBlocksAtRangeAsArray` method is deprecated.');

      range = this.resolveRange(range);
      if (range.isUnset) return [];

      var _range6 = range,
          start = _range6.start,
          end = _range6.end;


      return this.getLeafBlocksBetweenPathPositionsAsArray(start.path, end.path);
    }
  }, {
    key: 'getLeafBlocksBetweenPathPositionsAsArray',
    value: function getLeafBlocksBetweenPathPositionsAsArray(startPath, endPath) {
      warning(false, 'As of slate@0.47, the `getLeafBlocksBetweenPathPositionsAsArray` method is deprecated.');

      // PERF: the most common case is when the range is in a single block node,
      // where we can avoid a lot of iterating of the tree.
      if (startPath && endPath && PathUtils.isEqual(startPath, endPath)) {
        return [this.getClosestBlock(startPath)];
      } else if (!startPath && !endPath) {
        return this.getBlocksAsArray();
      }

      var startIndex = startPath ? startPath.get(0, 0) : 0;
      var endIndex = endPath ? endPath.get(0, this.nodes.size - 1) : this.nodes.size - 1;

      var array = [];

      this.nodes.slice(startIndex, endIndex + 1).forEach(function (node, i) {
        if (node.object !== 'block') {
          return;
        } else if (node.isLeafBlock()) {
          array.push(node);
        } else {
          var childStartPath = startPath && i === 0 ? PathUtils.drop(startPath) : null;
          var childEndPath = endPath && i === endIndex - startIndex ? PathUtils.drop(endPath) : null;

          array = array.concat(node.getLeafBlocksBetweenPathPositionsAsArray(childStartPath, childEndPath));
        }
      });

      return array;
    }
  }, {
    key: 'getBlocksAsArray',
    value: function getBlocksAsArray() {
      warning(false, 'As of slate@0.47, the `getBlocksAsArray` method is deprecated.');

      var iterable = this.blocks({ onlyLeaves: true });
      var array = Array.from(iterable, function (_ref43) {
        var _ref44 = slicedToArray(_ref43, 1),
            node = _ref44[0];

        return node;
      });
      return array;
    }
  }, {
    key: 'getBlocksByTypeAsArray',
    value: function getBlocksByTypeAsArray(type) {
      warning(false, 'As of slate@0.47, the `getBlocksByTypeAsArray` method is deprecated.');

      var iterable = this.blocks({ onlyLeaves: true, onlyTypes: [type] });
      var array = Array.from(iterable, function (_ref45) {
        var _ref46 = slicedToArray(_ref45, 1),
            node = _ref46[0];

        return node;
      });
      return array;
    }
  }, {
    key: 'getFurthestOnlyChildAncestor',
    value: function getFurthestOnlyChildAncestor(path) {
      warning(false, 'As of slate@0.47, the `getFurthestOnlyChildAncestor` method is deprecated.');

      var ancestors = this.getAncestors(path);
      if (!ancestors) return null;

      var furthest = ancestors.rest().reverse().takeUntil(function (p) {
        return p.nodes.size > 1;
      }).last();

      return furthest || null;
    }
  }, {
    key: 'getInlinesAsArray',
    value: function getInlinesAsArray() {
      warning(false, 'As of slate@0.47, the `getInlinesAsArray` method is deprecated.');

      var array = Array.from(this.inlines({ onlyLeaves: true }), function (_ref47) {
        var _ref48 = slicedToArray(_ref47, 1),
            node = _ref48[0];

        return node;
      });
      return array;
    }
  }, {
    key: 'getInlinesByTypeAsArray',
    value: function getInlinesByTypeAsArray(type) {
      warning(false, 'As of slate@0.47, the `getInlinesByTypeAsArray` method is deprecated.');

      var array = Array.from(this.inlines({ onlyLeaves: true, onlyTypes: [type] }), function (_ref49) {
        var _ref50 = slicedToArray(_ref49, 1),
            node = _ref50[0];

        return node;
      });
      return array;
    }
  }, {
    key: 'getLeafInlinesAtRangeAsArray',
    value: function getLeafInlinesAtRangeAsArray(range) {
      var _this4 = this;

      warning(false, 'As of slate@0.47, the `getLeafInlinesAtRangeAsArray` method is deprecated.');

      range = this.resolveRange(range);
      if (range.isUnset) return [];

      var array = this.getTextsAtRangeAsArray(range).map(function (text) {
        return _this4.getClosestInline(text.key);
      }).filter(function (exists) {
        return exists;
      });

      return array;
    }
  }, {
    key: 'getOrderedMarks',
    value: function getOrderedMarks() {
      warning(false, 'As of slate@0.47, the `getOrderedMarks` method has been folded into `getMarks`, which will now return an ordered set.');
      return this.getMarks();
    }
  }, {
    key: 'getOrderedMarksAtRange',
    value: function getOrderedMarksAtRange(range) {
      warning(false, 'As of slate@0.47, the `getOrderedMarksAtRange` method has been folded into `getMarksAtRange`, which will now return an ordered set.');
      return this.getMarksAtRange(range);
    }
  }, {
    key: 'getOrderedMarksByType',
    value: function getOrderedMarksByType(type) {
      warning(false, 'As of slate@0.47, the `getOrderedMarksByType` method has been folded into `getMarksByType`, which will now return an ordered set.');
      return this.getMarksByType(type);
    }
  }, {
    key: 'getMarksByTypeAsArray',
    value: function getMarksByTypeAsArray(type) {
      warning(false, 'As of slate@0.47, the `getMarksByTypeAsArray` method is deprecated.');

      var array = this.nodes.reduce(function (memo, node) {
        return node.object === 'text' ? memo.concat(node.marks.filter(function (m) {
          return m.type === type;
        })) : memo.concat(node.getMarksByTypeAsArray(type));
      }, []);

      return array;
    }
  }, {
    key: 'getMarksAsArray',
    value: function getMarksAsArray() {
      var _ref53;

      warning(false, 'As of slate@0.47, the `getMarksAsArray` method is deprecated.');

      var result = [];

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.texts()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _ref51 = _step8.value;

          var _ref52 = slicedToArray(_ref51, 1);

          var node = _ref52[0];

          result.push(node.marks.toArray());
        }

        // PERF: use only one concat rather than multiple for speed.
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      var array = (_ref53 = []).concat.apply(_ref53, result);
      return array;
    }
  }, {
    key: 'getRootInlinesAtRangeAsArray',
    value: function getRootInlinesAtRangeAsArray(range) {
      var _this5 = this;

      warning(false, 'As of slate@0.47, the `getRootInlinesAtRangeAsArray` method is deprecated.');

      range = this.resolveRange(range);
      if (range.isUnset) return List();

      var array = this.getTextsAtRangeAsArray(range).map(function (text) {
        return _this5.getFurthestInline(text.key);
      }).filter(function (exists) {
        return exists;
      });

      return array;
    }
  }, {
    key: 'getTextsAsArray',
    value: function getTextsAsArray() {
      warning(false, 'As of slate@0.47, the `getTextsAsArray` method is deprecated.');

      var iterable = this.texts();
      var array = Array.from(iterable, function (_ref54) {
        var _ref55 = slicedToArray(_ref54, 1),
            node = _ref55[0];

        return node;
      });
      return array;
    }
  }, {
    key: 'getTextsAtRangeAsArray',
    value: function getTextsAtRangeAsArray(range) {
      warning(false, 'As of slate@0.47, the `getTextsAtRangeAsArray` method is deprecated.');

      var iterable = this.texts({ range: range });
      var array = Array.from(iterable, function (_ref56) {
        var _ref57 = slicedToArray(_ref56, 1),
            node = _ref57[0];

        return node;
      });
      return array;
    }
  }, {
    key: 'getMarksAtPosition',
    value: function getMarksAtPosition(path, offset) {
      warning(false, 'As of slate@0.47, the `getMarksAtPosition` method is deprecated.');

      path = this.resolvePath(path);
      var text = this.getDescendant(path);
      var currentMarks = text.marks;

      if (offset !== 0) {
        return OrderedSet(currentMarks);
      }

      var closestBlock = this.getClosestBlock(path);

      // insert mark for empty block; the empty block are often created by split node or add marks in a range including empty blocks
      if (closestBlock.text === '') {
        return OrderedSet(currentMarks);
      }

      var _texts13 = this.texts({ path: path, direction: 'backward' }),
          _texts14 = slicedToArray(_texts13, 1),
          previous = _texts14[0];

      if (!previous) {
        return OrderedSet();
      }

      var _previous2 = slicedToArray(previous, 2),
          previousText = _previous2[0],
          previousPath = _previous2[1];

      if (closestBlock.hasDescendant(previousPath)) {
        return OrderedSet(previousText.marks);
      }

      return OrderedSet(currentMarks);
    }
  }, {
    key: 'getNodesAtRange',
    value: function getNodesAtRange(range) {
      warning(false, 'As of slate@0.47, the `getNodesAtRange` method has been renamed to `getDescendantsAtRange`.');

      var iterable = this.descendants({ range: range });
      var array = Array.from(iterable, function (_ref58) {
        var _ref59 = slicedToArray(_ref58, 1),
            node = _ref59[0];

        return node;
      });
      var list = List(array);
      return list;
    }
  }, {
    key: 'isNodeInRange',
    value: function isNodeInRange(path, range) {
      warning(false, 'As of slate@0.47, the `isNodeInRange` method has been renamed to `isInRange`.');

      return this.isInRange(path, range);
    }
  }, {
    key: 'text',

    /**
     * Get the concatenated text of the node.
     *
     * @return {String}
     */

    get: function get$$1() {
      return this.getText();
    }
  }]);
  return ElementInterface;
}();

/**
 * Mix in assertion variants.
 */

var ASSERTS = ['Child', 'Depth', 'Descendant', 'Node', 'Parent', 'Path'];

var _loop$1 = function _loop(method) {
  ElementInterface.prototype['assert' + method] = function (path) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var ret = this['get' + method].apply(this, [path].concat(args));

    if (ret == null) {
      throw new Error('`Node.assert' + method + '` could not find node with path or key: ' + path);
    }

    return ret;
  };
};

var _iteratorNormalCompletion9 = true;
var _didIteratorError9 = false;
var _iteratorError9 = undefined;

try {
  for (var _iterator9 = ASSERTS[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
    var method$1 = _step9.value;

    _loop$1(method$1);
  }

  /**
   * Memoize read methods.
   */
} catch (err) {
  _didIteratorError9 = true;
  _iteratorError9 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion9 && _iterator9.return) {
      _iterator9.return();
    }
  } finally {
    if (_didIteratorError9) {
      throw _iteratorError9;
    }
  }
}

memoize(ElementInterface.prototype, ['getBlocksAsArray', 'getBlocksByTypeAsArray', 'getDecorations', 'getFragmentAtRange', 'getInlinesAsArray', 'getInlinesByTypeAsArray', 'getInsertMarksAtRange', 'getLeafBlocksAtRangeAsArray', 'getLeafBlocksAtRangeAsArray', 'getLeafInlinesAtRangeAsArray', 'getMarksAsArray', 'getMarksAtPosition', 'getMarksByTypeAsArray', 'getNextBlock', 'getNodesAtRange', 'getNodesToPathsMap', 'getOffset', 'getOffsetAtRange', 'getOrderedMarksBetweenPositions', 'getPreviousBlock', 'getRootBlocksAtRange', 'getRootInlinesAtRangeAsArray', 'getTextAtOffset', 'getTextDirection', 'getTextsAsArray', 'getTextsBetweenPathPositionsAsArray']);

/**
 * Mix in the element interface.
 */

mixin(ElementInterface, [Block, Document, Inline]);

/**
 * The interface that `Decoration`, `Range` and `Selection` all implement, to make
 * working anchor and focus points easier.
 *
 * @type {Class}
 */

var RangeInterface = function () {
  function RangeInterface() {
    classCallCheck(this, RangeInterface);
  }

  createClass(RangeInterface, [{
    key: 'flip',


    /**
     * Flip the range.
     *
     * @return {Range}
     */

    value: function flip() {
      var range = this.setPoints([this.focus, this.anchor]);
      return range;
    }

    /**
     * Move the anchor and focus offsets forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveForward',
    value: function moveForward(n) {
      return this.updatePoints(function (point) {
        return point.moveForward(n);
      });
    }

    /**
     * Move the anchor and focus offsets backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveBackward',
    value: function moveBackward(n) {
      return this.updatePoints(function (point) {
        return point.moveBackward(n);
      });
    }

    /**
     * Move the anchor offset backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveAnchorBackward',
    value: function moveAnchorBackward(n) {
      var range = this.setAnchor(this.anchor.moveBackward(n));
      return range;
    }

    /**
     * Move the anchor offset forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveAnchorForward',
    value: function moveAnchorForward(n) {
      var range = this.setAnchor(this.anchor.moveForward(n));
      return range;
    }

    /**
     * Move the range's anchor point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveAnchorTo',
    value: function moveAnchorTo(path, offset) {
      var range = this.setAnchor(this.anchor.moveTo(path, offset));
      return range;
    }

    /**
     * Move the range's anchor point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveAnchorToStartOfNode',
    value: function moveAnchorToStartOfNode(node) {
      var range = this.setAnchor(this.anchor.moveToStartOfNode(node));
      return range;
    }

    /**
     * Move the range's anchor point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveAnchorToEndOfNode',
    value: function moveAnchorToEndOfNode(node) {
      var range = this.setAnchor(this.anchor.moveToEndOfNode(node));
      return range;
    }

    /**
     * Move the end offset backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveEndBackward',
    value: function moveEndBackward(n) {
      var range = this.setEnd(this.end.moveBackward(n));
      return range;
    }

    /**
     * Move the end offset forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveEndForward',
    value: function moveEndForward(n) {
      var range = this.setEnd(this.end.moveForward(n));
      return range;
    }

    /**
     * Move the range's end point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveEndTo',
    value: function moveEndTo(path, offset) {
      var range = this.setEnd(this.end.moveTo(path, offset));
      return range;
    }

    /**
     * Move the range's end point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveEndToStartOfNode',
    value: function moveEndToStartOfNode(node) {
      var range = this.setEnd(this.end.moveToStartOfNode(node));
      return range;
    }

    /**
     * Move the range's end point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveEndToEndOfNode',
    value: function moveEndToEndOfNode(node) {
      var range = this.setEnd(this.end.moveToEndOfNode(node));
      return range;
    }

    /**
     * Move the focus offset backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveFocusBackward',
    value: function moveFocusBackward(n) {
      var range = this.setFocus(this.focus.moveBackward(n));
      return range;
    }

    /**
     * Move the focus offset forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveFocusForward',
    value: function moveFocusForward(n) {
      var range = this.setFocus(this.focus.moveForward(n));
      return range;
    }

    /**
     * Move the range's focus point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveFocusTo',
    value: function moveFocusTo(path, offset) {
      var range = this.setFocus(this.focus.moveTo(path, offset));
      return range;
    }

    /**
     * Move the range's focus point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveFocusToStartOfNode',
    value: function moveFocusToStartOfNode(node) {
      var range = this.setFocus(this.focus.moveToStartOfNode(node));
      return range;
    }

    /**
     * Move the range's focus point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveFocusToEndOfNode',
    value: function moveFocusToEndOfNode(node) {
      var range = this.setFocus(this.focus.moveToEndOfNode(node));
      return range;
    }

    /**
     * Move the start offset backward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveStartBackward',
    value: function moveStartBackward(n) {
      var range = this.setStart(this.start.moveBackward(n));
      return range;
    }

    /**
     * Move the start offset forward `n` characters.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveStartForward',
    value: function moveStartForward(n) {
      var range = this.setStart(this.start.moveForward(n));
      return range;
    }

    /**
     * Move the range's start point to a new `path` and `offset`.
     *
     * Optionally, the `path` can be a key string, or omitted entirely in which
     * case it would be the offset number.
     *
     * @param {List|String} path
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveStartTo',
    value: function moveStartTo(path, offset) {
      var range = this.setStart(this.start.moveTo(path, offset));
      return range;
    }

    /**
     * Move the range's start point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveStartToStartOfNode',
    value: function moveStartToStartOfNode(node) {
      var range = this.setStart(this.start.moveToStartOfNode(node));
      return range;
    }

    /**
     * Move the range's start point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveStartToEndOfNode',
    value: function moveStartToEndOfNode(node) {
      var range = this.setStart(this.start.moveToEndOfNode(node));
      return range;
    }

    /**
     * Move range's points to a new `path` and `offset`.
     *
     * @param {Number} n
     * @return {Range}
     */

  }, {
    key: 'moveTo',
    value: function moveTo(path, offset) {
      return this.updatePoints(function (point) {
        return point.moveTo(path, offset);
      });
    }

    /**
     * Move the focus point to the anchor point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToAnchor',
    value: function moveToAnchor() {
      var range = this.setFocus(this.anchor);
      return range;
    }

    /**
     * Move the start point to the end point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToEnd',
    value: function moveToEnd() {
      var range = this.setStart(this.end);
      return range;
    }

    /**
     * Move the range's points to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveToEndOfNode',
    value: function moveToEndOfNode(node) {
      return this.updatePoints(function (point) {
        return point.moveToEndOfNode(node);
      });
    }

    /**
     * Move the anchor point to the focus point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToFocus',
    value: function moveToFocus() {
      var range = this.setAnchor(this.focus);
      return range;
    }

    /**
     * Move to the entire range of `start` and `end` nodes.
     *
     * @param {Node} start
     * @param {Node} end (optional)
     * @return {Range}
     */

  }, {
    key: 'moveToRangeOfNode',
    value: function moveToRangeOfNode(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start;

      var range = this.setPoints([this.anchor.moveToStartOfNode(start), this.focus.moveToEndOfNode(end)]);

      return range;
    }

    /**
     * Move the end point to the start point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToStart',
    value: function moveToStart() {
      var range = this.setEnd(this.start);
      return range;
    }

    /**
     * Move the range's points to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveToStartOfNode',
    value: function moveToStartOfNode(node) {
      return this.updatePoints(function (point) {
        return point.moveToStartOfNode(node);
      });
    }

    /**
     * Normalize the range, relative to a `node`, ensuring that the anchor
     * and focus nodes of the range always refer to leaf text nodes.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'normalize',
    value: function normalize(node) {
      return this.updatePoints(function (point) {
        return point.normalize(node);
      });
    }

    /**
     * Set the anchor point to a new `anchor`.
     *
     * @param {Point} anchor
     * @return {Range}
     */

  }, {
    key: 'setAnchor',
    value: function setAnchor(anchor) {
      var range = this.set('anchor', anchor);
      return range;
    }

    /**
     * Set the end point to a new `point`.
     *
     * @param {Point} point
     * @return {Range}
     */

  }, {
    key: 'setEnd',
    value: function setEnd(point) {
      var range = this.isBackward ? this.setAnchor(point) : this.setFocus(point);
      return range;
    }

    /**
     * Set the focus point to a new `focus`.
     *
     * @param {Point} focus
     * @return {Range}
     */

  }, {
    key: 'setFocus',
    value: function setFocus(focus) {
      var range = this.set('focus', focus);
      return range;
    }

    /**
     * Set the anchor and focus points to new `values`.
     *
     * @param {Array<Point>} values
     * @return {Range}
     */

  }, {
    key: 'setPoints',
    value: function setPoints(values) {
      var _values = slicedToArray(values, 2),
          anchor = _values[0],
          focus = _values[1];

      var range = this.set('anchor', anchor).set('focus', focus);
      return range;
    }

    /**
     * Set the anchor and focus points with `updater` callback
     *
     * @param {Function} updater
     * @return {Range}
     */

  }, {
    key: 'updatePoints',
    value: function updatePoints(updater) {
      var anchor = this.anchor,
          focus = this.focus;

      anchor = updater(anchor);
      focus = updater(focus);
      return this.merge({ anchor: anchor, focus: focus });
    }

    /**
     * Set the start point to a new `point`.
     *
     * @param {Point} point
     * @return {Range}
     */

  }, {
    key: 'setStart',
    value: function setStart(point) {
      var range = this.isBackward ? this.setFocus(point) : this.setAnchor(point);
      return range;
    }

    /**
     * Set new `properties` on the range.
     *
     * @param {Object|Range} properties
     * @return {Range}
     */

  }, {
    key: 'setProperties',
    value: function setProperties(properties) {
      properties = Range.createProperties(properties);
      var _properties = properties,
          anchor = _properties.anchor,
          focus = _properties.focus,
          props = objectWithoutProperties(_properties, ['anchor', 'focus']);


      if (anchor) {
        props.anchor = Point.create(anchor);
      }

      if (focus) {
        props.focus = Point.create(focus);
      }

      var range = this.merge(props);
      return range;
    }

    /**
     * Return a JSON representation of the range.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        object: this.object,
        anchor: this.anchor.toJSON(options),
        focus: this.focus.toJSON(options)
      };

      return object;
    }

    /**
     * Return a `Range` instance from any range-like instance.
     *
     * @return {Range}
     */

  }, {
    key: 'toRange',
    value: function toRange() {
      var properties = Range.createProperties(this);
      var range = Range.create(properties);
      return range;
    }

    /**
     * Unset the range.
     *
     * @return {Range}
     */

  }, {
    key: 'unset',
    value: function unset() {
      var range = this.updatePoints(function (p) {
        return p.unset();
      });
      return range;
    }
  }, {
    key: 'isCollapsed',

    /**
     * Check whether the range is collapsed.
     *
     * @return {Boolean}
     */

    get: function get$$1() {
      return this.anchor === this.focus || this.anchor.key === this.focus.key && this.anchor.offset === this.focus.offset;
    }

    /**
     * Check whether the range is expanded.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isExpanded',
    get: function get$$1() {
      return !this.isCollapsed;
    }

    /**
     * Check whether the range is backward.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isBackward',
    get: function get$$1() {
      var isUnset = this.isUnset,
          anchor = this.anchor,
          focus = this.focus;


      if (isUnset) {
        return null;
      }

      if (anchor.key === focus.key) {
        return anchor.offset > focus.offset;
      }

      var isBackward = PathUtils.isBefore(focus.path, anchor.path);
      return isBackward;
    }

    /**
     * Check whether the range is forward.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isForward',
    get: function get$$1() {
      var isBackward = this.isBackward;

      var isForward = isBackward == null ? null : !isBackward;
      return isForward;
    }

    /**
     * Check whether the range isn't set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isUnset',
    get: function get$$1() {
      var anchor = this.anchor,
          focus = this.focus;

      var isUnset = anchor.isUnset || focus.isUnset;
      return isUnset;
    }

    /**
     * Check whether the range is set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isSet',
    get: function get$$1() {
      return !this.isUnset;
    }

    /**
     * Get the start point.
     *
     * @return {String}
     */

  }, {
    key: 'start',
    get: function get$$1() {
      return this.isBackward ? this.focus : this.anchor;
    }

    /**
     * Get the end point.
     *
     * @return {String}
     */

  }, {
    key: 'end',
    get: function get$$1() {
      return this.isBackward ? this.anchor : this.focus;
    }
  }]);
  return RangeInterface;
}();

/**
 * Mix in the range interface.
 *
 * @param {Record}
 */

mixin(RangeInterface, [Annotation, Decoration, Range, Selection]);

var index = {
  Annotation: Annotation,
  Block: Block,
  Change: Change,
  Data: Data,
  Decoration: Decoration,
  Document: Document,
  Editor: Editor,
  Inline: Inline,
  KeyUtils: KeyUtils,
  Leaf: Leaf$1,
  Mark: Mark,
  Node: Node,
  Operation: Operation,
  PathUtils: PathUtils,
  Point: Point,
  Range: Range,
  resetMemoization: resetMemoization,
  Selection: Selection,
  Text: Text,
  TextUtils: TextUtils,
  useMemoization: useMemoization,
  Value: Value
};

export default index;
export { Annotation, Block, Change, Data, Decoration, Document, Editor, Inline, KeyUtils, Leaf$1 as Leaf, Mark, Node, Operation, PathUtils, Point, Range, resetMemoization, Selection, Text, TextUtils, useMemoization, Value };
//# sourceMappingURL=slate.es.js.map
