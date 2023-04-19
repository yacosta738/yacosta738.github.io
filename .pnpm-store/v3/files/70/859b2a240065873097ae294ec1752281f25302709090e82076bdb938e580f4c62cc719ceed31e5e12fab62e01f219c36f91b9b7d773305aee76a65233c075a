'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var isProduction = "development" === 'production';
var prefix = 'Invariant failed';
var index = (function (condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  } else {
    throw new Error(prefix + ": " + (message || ''));
  }
});

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

/*
 * Instance counter to enable unique marks for multiple Placeholder instances.
 */

var instanceCounter = 0;

/**
 * A plugin that renders a React placeholder for a given Slate node.
 *
 * @param {Object} options
 * @return {Object}
 */

function SlateReactPlaceholder() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var instanceId = instanceCounter++;
  var placeholder = options.placeholder,
      when = options.when,
      _options$style = options.style,
      style = _options$style === undefined ? {} : _options$style;


  index(typeof placeholder === 'string', 'You must pass `SlateReactPlaceholder` an `options.placeholder` string.');

  index(typeof when === 'string' || typeof when === 'function', 'You must pass `SlateReactPlaceholder` an `options.when` query.');

  /**
   * Decorate a match node with a placeholder mark when it fits the query.
   *
   * @param {Node} node
   * @param {Editor} editor
   * @param {Function} next
   * @return {Array}
   */

  function decorateNode(node, editor, next) {
    if (!editor.query(when, node)) {
      return next();
    }

    var others = next();

    var _node$texts = node.texts(),
        _node$texts2 = slicedToArray(_node$texts, 1),
        first = _node$texts2[0];

    var _node$texts3 = node.texts({ direction: 'backward' }),
        _node$texts4 = slicedToArray(_node$texts3, 1),
        last = _node$texts4[0];

    var _first = slicedToArray(first, 2),
        firstNode = _first[0],
        firstPath = _first[1];

    var _last = slicedToArray(last, 2),
        lastNode = _last[0],
        lastPath = _last[1];

    var decoration = {
      type: 'placeholder',
      data: { key: instanceId },
      anchor: { key: firstNode.key, offset: 0, path: firstPath },
      focus: {
        key: lastNode.key,
        offset: lastNode.text.length,
        path: lastPath
      }
    };

    return [].concat(toConsumableArray(others), [decoration]);
  }

  /**
   * Render an inline placeholder for the placeholder mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  function renderDecoration(props, editor, next) {
    var children = props.children,
        deco = props.decoration;


    if (deco.type === 'placeholder' && deco.data.get('key') === instanceId) {
      var placeHolderStyle = _extends({
        pointerEvents: 'none',
        display: 'inline-block',
        width: '0',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        opacity: '0.333',
        verticalAlign: 'text-top'
      }, style);

      return React.createElement(
        'span',
        null,
        React.createElement(
          'span',
          { contentEditable: false, style: placeHolderStyle },
          placeholder
        ),
        children
      );
    }

    return next();
  }

  /**
   * Return the plugin.
   *
   * @return {Object}
   */

  return { decorateNode: decorateNode, renderDecoration: renderDecoration };
}

exports.default = SlateReactPlaceholder;
//# sourceMappingURL=slate-react-placeholder.js.map
