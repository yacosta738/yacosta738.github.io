'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var slate = require('slate');
var getDirection = _interopDefault(require('direction'));
var isHotkey = require('is-hotkey');

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

function isElement(el) {
  return el != null && typeof el === 'object' && el.nodeType === 1;
}

function canOverflow(overflow, skipOverflowHiddenElements) {
  if (skipOverflowHiddenElements && overflow === 'hidden') {
    return false;
  }

  return overflow !== 'visible' && overflow !== 'clip';
}

function isScrollable(el, skipOverflowHiddenElements) {
  if (el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth) {
    var style = getComputedStyle(el, null);
    return canOverflow(style.overflowY, skipOverflowHiddenElements) || canOverflow(style.overflowX, skipOverflowHiddenElements);
  }

  return false;
}

function alignNearest(scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, scrollingBorderStart, scrollingBorderEnd, elementEdgeStart, elementEdgeEnd, elementSize) {
  if (elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd || elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd) {
    return 0;
  }

  if (elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize || elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize) {
    return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
  }

  if (elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize || elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize) {
    return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
  }

  return 0;
}

var compute = (function (target, options) {
  var scrollMode = options.scrollMode,
      block = options.block,
      inline = options.inline,
      boundary = options.boundary,
      skipOverflowHiddenElements = options.skipOverflowHiddenElements;
  var checkBoundary = typeof boundary === 'function' ? boundary : function (node) {
    return node !== boundary;
  };

  if (!isElement(target)) {
    throw new TypeError('Invalid target');
  }

  var scrollingElement = document.scrollingElement || document.documentElement;
  var frames = [];
  var cursor = target;

  while (isElement(cursor) && checkBoundary(cursor)) {
    cursor = cursor.parentNode;

    if (cursor === scrollingElement) {
      frames.push(cursor);
      break;
    }

    if (cursor === document.body && isScrollable(cursor) && !isScrollable(document.documentElement)) {
      continue;
    }

    if (isScrollable(cursor, skipOverflowHiddenElements)) {
      frames.push(cursor);
    }
  }

  var viewportWidth = window.visualViewport ? visualViewport.width : innerWidth;
  var viewportHeight = window.visualViewport ? visualViewport.height : innerHeight;
  var viewportX = window.scrollX || pageXOffset;
  var viewportY = window.scrollY || pageYOffset;

  var _target$getBoundingCl = target.getBoundingClientRect(),
      targetHeight = _target$getBoundingCl.height,
      targetWidth = _target$getBoundingCl.width,
      targetTop = _target$getBoundingCl.top,
      targetRight = _target$getBoundingCl.right,
      targetBottom = _target$getBoundingCl.bottom,
      targetLeft = _target$getBoundingCl.left;

  var targetBlock = block === 'start' || block === 'nearest' ? targetTop : block === 'end' ? targetBottom : targetTop + targetHeight / 2;
  var targetInline = inline === 'center' ? targetLeft + targetWidth / 2 : inline === 'end' ? targetRight : targetLeft;
  var computations = [];

  for (var index = 0; index < frames.length; index++) {
    var frame = frames[index];

    var _frame$getBoundingCli = frame.getBoundingClientRect(),
        _height = _frame$getBoundingCli.height,
        _width = _frame$getBoundingCli.width,
        _top = _frame$getBoundingCli.top,
        right = _frame$getBoundingCli.right,
        bottom = _frame$getBoundingCli.bottom,
        _left = _frame$getBoundingCli.left;

    if (scrollMode === 'if-needed' && targetTop >= 0 && targetLeft >= 0 && targetBottom <= viewportHeight && targetRight <= viewportWidth && targetTop >= _top && targetBottom <= bottom && targetLeft >= _left && targetRight <= right) {
      return computations;
    }

    var frameStyle = getComputedStyle(frame);
    var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
    var borderTop = parseInt(frameStyle.borderTopWidth, 10);
    var borderRight = parseInt(frameStyle.borderRightWidth, 10);
    var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
    var blockScroll = 0;
    var inlineScroll = 0;
    var scrollbarWidth = 'offsetWidth' in frame ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight : 0;
    var scrollbarHeight = 'offsetHeight' in frame ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom : 0;

    if (scrollingElement === frame) {
      if (block === 'start') {
        blockScroll = targetBlock;
      } else if (block === 'end') {
        blockScroll = targetBlock - viewportHeight;
      } else if (block === 'nearest') {
        blockScroll = alignNearest(viewportY, viewportY + viewportHeight, viewportHeight, borderTop, borderBottom, viewportY + targetBlock, viewportY + targetBlock + targetHeight, targetHeight);
      } else {
        blockScroll = targetBlock - viewportHeight / 2;
      }

      if (inline === 'start') {
        inlineScroll = targetInline;
      } else if (inline === 'center') {
        inlineScroll = targetInline - viewportWidth / 2;
      } else if (inline === 'end') {
        inlineScroll = targetInline - viewportWidth;
      } else {
        inlineScroll = alignNearest(viewportX, viewportX + viewportWidth, viewportWidth, borderLeft, borderRight, viewportX + targetInline, viewportX + targetInline + targetWidth, targetWidth);
      }

      blockScroll = Math.max(0, blockScroll + viewportY);
      inlineScroll = Math.max(0, inlineScroll + viewportX);
    } else {
      if (block === 'start') {
        blockScroll = targetBlock - _top - borderTop;
      } else if (block === 'end') {
        blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
      } else if (block === 'nearest') {
        blockScroll = alignNearest(_top, bottom, _height, borderTop, borderBottom + scrollbarHeight, targetBlock, targetBlock + targetHeight, targetHeight);
      } else {
        blockScroll = targetBlock - (_top + _height / 2) + scrollbarHeight / 2;
      }

      if (inline === 'start') {
        inlineScroll = targetInline - _left - borderLeft;
      } else if (inline === 'center') {
        inlineScroll = targetInline - (_left + _width / 2) + scrollbarWidth / 2;
      } else if (inline === 'end') {
        inlineScroll = targetInline - right + borderRight + scrollbarWidth;
      } else {
        inlineScroll = alignNearest(_left, right, _width, borderLeft, borderRight + scrollbarWidth, targetInline, targetInline + targetWidth, targetWidth);
      }

      var scrollLeft = frame.scrollLeft,
          scrollTop = frame.scrollTop;
      blockScroll = Math.max(0, Math.min(scrollTop + blockScroll, frame.scrollHeight - _height + scrollbarHeight));
      inlineScroll = Math.max(0, Math.min(scrollLeft + inlineScroll, frame.scrollWidth - _width + scrollbarWidth));
      targetBlock += scrollTop - blockScroll;
      targetInline += scrollLeft - inlineScroll;
    }

    computations.push({
      el: frame,
      top: blockScroll,
      left: inlineScroll
    });
  }

  return computations;
});

function isOptionsObject(options) {
  return options === Object(options) && Object.keys(options).length !== 0;
}

function defaultBehavior(actions, behavior) {
  if (behavior === void 0) {
    behavior = 'auto';
  }

  var canSmoothScroll = 'scrollBehavior' in document.body.style;
  actions.forEach(function (_ref) {
    var el = _ref.el,
        top = _ref.top,
        left = _ref.left;

    if (el.scroll && canSmoothScroll) {
      el.scroll({
        top: top,
        left: left,
        behavior: behavior
      });
    } else {
      el.scrollTop = top;
      el.scrollLeft = left;
    }
  });
}

function getOptions(options) {
  if (options === false) {
    return {
      block: 'end',
      inline: 'nearest'
    };
  }

  if (isOptionsObject(options)) {
    return options;
  }

  return {
    block: 'start',
    inline: 'nearest'
  };
}

function scrollIntoView(target, options) {
  var targetIsDetached = !target.ownerDocument.documentElement.contains(target);

  if (isOptionsObject(options) && typeof options.behavior === 'function') {
    return options.behavior(targetIsDetached ? [] : compute(target, options));
  }

  if (targetIsDetached) {
    return;
  }

  var computeOptions = getOptions(options);
  return defaultBehavior(compute(target, computeOptions), computeOptions.behavior);
}

/**
 * A React context for sharing the `ReactEditor` class.
 */

var EditorContext = React.createContext(undefined);
/**
 * Get the current `ReactEditor` class that the component lives under.
 */

var useEditor = function useEditor() {
  var editor = React.useContext(EditorContext);

  if (!editor) {
    throw new Error("The `useEditor` hook must be used inside the <Editor> context.");
  }

  return editor;
};

/**
 * Leaf content strings.
 */
const String = (props) => {
    const { isLast, leaf, parent, text } = props;
    const editor = useEditor();
    const path = editor.findPath(text);
    const parentPath = slate.Path.parent(path);
    // COMPAT: Render text inside void nodes with a zero-width space.
    // So the node can contain selection but the text is not visible.
    if (editor.isVoid(parent)) {
        return React__default.createElement(ZeroWidthString, { length: slate.Node.text(parent).length });
    }
    // COMPAT: If this is the last text node in an empty block, render a zero-
    // width space that will convert into a line break when copying and pasting
    // to support expected plain text.
    if (leaf.text === '' &&
        parent.nodes[parent.nodes.length - 1] === text &&
        !editor.isInline(parent) &&
        editor.getText(parentPath) === '') {
        return React__default.createElement(ZeroWidthString, { isLineBreak: true });
    }
    // COMPAT: If the text is empty, it's because it's on the edge of an inline
    // node, so we render a zero-width space so that the selection can be
    // inserted next to it still.
    if (leaf.text === '') {
        return React__default.createElement(ZeroWidthString, null);
    }
    // COMPAT: Browsers will collapse trailing new lines at the end of blocks,
    // so we need to add an extra trailing new lines to prevent that.
    if (isLast && leaf.text.slice(-1) === '\n') {
        return React__default.createElement(TextString, { isTrailing: true, text: leaf.text });
    }
    return React__default.createElement(TextString, { text: leaf.text });
};
/**
 * Leaf strings with text in them.
 */
const TextString = (props) => {
    const { text, isTrailing = false } = props;
    return (React__default.createElement("span", { "data-slate-string": true },
        text,
        isTrailing ? '\n' : null));
};
/**
 * Leaf strings without text, render as zero-width strings.
 */
const ZeroWidthString = (props) => {
    const { length = 0, isLineBreak = false } = props;
    return (React__default.createElement("span", { "data-slate-zero-width": isLineBreak ? 'n' : 'z', "data-slate-length": length },
        '\uFEFF',
        isLineBreak ? React__default.createElement("br", null) : null));
};
//# sourceMappingURL=string.js.map

/**
 * The default custom annotation renderer.
 */
const CustomAnnotation = (props) => {
    const { attributes, children } = props;
    return React__default.createElement("span", Object.assign({}, attributes), children);
};
/**
 * The default custom decoration renderer.
 */
const CustomDecoration = (props) => {
    const { attributes, children } = props;
    return React__default.createElement("span", Object.assign({}, attributes), children);
};
/**
 * The default element renderer.
 */
const CustomElement = (props) => {
    const { attributes, children, element } = props;
    const editor = useEditor();
    const Tag = editor.isInline(element) ? 'span' : 'div';
    return (React__default.createElement(Tag, Object.assign({}, attributes, { style: { position: 'relative' } }), children));
};
/**
 * The default custom mark renderer.
 */
const CustomMark = (props) => {
    const { attributes, children } = props;
    return React__default.createElement("span", Object.assign({}, attributes), children);
};
/**
 * A custom decoration for the default placeholder behavior.
 */
const PlaceholderDecoration = (props) => {
    const { decoration, attributes, children } = props;
    const { placeholder } = decoration;
    return (React__default.createElement("span", Object.assign({}, attributes),
        React__default.createElement("span", { contentEditable: false, style: {
                pointerEvents: 'none',
                display: 'inline-block',
                verticalAlign: 'text-top',
                width: '0',
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                opacity: '0.333',
            } }, placeholder),
        children));
};
//# sourceMappingURL=custom.js.map

/**
 * Two weak maps that allow us rebuild a path given a node. They are populated
 * at render time such that after a render occurs we can always backtrack.
 */
var NODE_TO_INDEX = new WeakMap();
var NODE_TO_PARENT = new WeakMap();
/**
 * Weak maps that allow us to go between Slate nodes and DOM nodes. These
 * are used to resolve DOM event-related logic into Slate actions.
 */

var EDITOR_TO_ELEMENT = new WeakMap();
var NODE_TO_ELEMENT = new WeakMap();
var ELEMENT_TO_NODE = new WeakMap();
var NODE_TO_KEY = new WeakMap();
var KEY_TO_ELEMENT = new WeakMap();
/**
 * Weak maps for storing editor-related state.
 */

var IS_READ_ONLY = new WeakMap();
var IS_FOCUSED = new WeakMap();
var PLACEHOLDER = new WeakMap();
/**
 * Symbols.
 */

var PLACEHOLDER_SYMBOL = Symbol('placeholder');

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

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject$1(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObjectObject(o) {
  return isObject$1(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Leaf;

(function (Leaf) {
  /**
   * Check if two leaves are equal.
   */
  Leaf.equals = function (leaf, another) {
    return leaf.text === another.text && leaf.annotations.length === another.annotations.length && leaf.decorations.length === another.decorations.length && leaf.marks.length === another.marks.length && leaf.marks.every(function (m) {
      return slate.Mark.exists(m, another.marks);
    }) && another.marks.every(function (m) {
      return slate.Mark.exists(m, leaf.marks);
    }) && isRangeListEqual(leaf.decorations, another.decorations) && isRangeMapEqual(leaf.annotations, another.annotations);
  };
  /**
   * Check if a value is a `Leaf` object.
   */


  Leaf.isLeaf = function (value) {
    return isPlainObject(value) && typeof value.text === 'string' && slate.Mark.isMarkSet(value.marks) && slate.Range.isRangeList(value.decorations) && slate.Range.isRangeMap(value.annotations);
  };
  /**
   * Split a leaf into two at an offset.
   */


  Leaf.split = function (leaf, offset) {
    return [{
      text: leaf.text.slice(0, offset),
      marks: leaf.marks,
      annotations: _objectSpread({}, leaf.annotations),
      decorations: toConsumableArray(leaf.decorations)
    }, {
      text: leaf.text.slice(offset),
      marks: leaf.marks,
      annotations: _objectSpread({}, leaf.annotations),
      decorations: toConsumableArray(leaf.decorations)
    }];
  };
})(Leaf || (Leaf = {}));
/**
 * Check if a list of ranges is equal to another.
 *
 * PERF: this requires the two lists to also have the ranges inside them in the
 * same order, but this is an okay constraint for us since decorations are
 * kept in order, and the odd case where they aren't is okay to re-render for.
 */


var isRangeListEqual = function isRangeListEqual(list, another) {
  if (list.length !== another.length) {
    return false;
  }

  for (var i = 0; i < list.length; i++) {
    var range = list[i];
    var other = another[i];

    if (!slate.Range.equals(range, other)) {
      return false;
    }
  }

  return true;
};
/**
 * Check if a map of ranges is equal to another.
 */


var isRangeMapEqual = function isRangeMapEqual(map, another) {
  if (Object.keys(map).length !== Object.keys(another).length) {
    return false;
  }

  for (var key in map) {
    var range = map[key];
    var other = another[key];

    if (!slate.Range.equals(range, other)) {
      return false;
    }
  }

  return true;
};

/**
 * Individual leaves in a text node with unique formatting.
 */
const Leaf$1 = (props) => {
    const { leaf, isLast, text, parent, renderAnnotation = (props) => (React__default.createElement(CustomAnnotation, Object.assign({}, props))), renderDecoration = (props) => (React__default.createElement(CustomDecoration, Object.assign({}, props))), renderMark = (props) => React__default.createElement(CustomMark, Object.assign({}, props)), } = props;
    let children = (React__default.createElement(String, { isLast: isLast, leaf: leaf, parent: parent, text: text }));
    // COMPAT: Having the `data-` attributes on these leaf elements ensures that
    // in certain misbehaving browsers they aren't weirdly cloned/destroyed by
    // contenteditable behaviors. (2019/05/08)
    for (const mark of leaf.marks) {
        const ret = renderMark({
            children,
            leaf,
            mark,
            text,
            attributes: {
                'data-slate-mark': true,
            },
        });
        if (ret) {
            children = ret;
        }
    }
    for (const decoration of leaf.decorations) {
        const p = {
            children,
            decoration,
            leaf,
            text,
            attributes: {
                'data-slate-decoration': true,
            },
        };
        if (PLACEHOLDER_SYMBOL in decoration) {
            // @ts-ignore
            children = React__default.createElement(PlaceholderDecoration, Object.assign({}, p));
        }
        else {
            // @ts-ignore
            const ret = renderDecoration(p);
            if (ret) {
                children = ret;
            }
        }
    }
    for (const key in leaf.annotations) {
        const annotation = leaf.annotations[key];
        const ret = renderAnnotation({
            annotation,
            children,
            key,
            leaf,
            text,
            attributes: {
                'data-slate-annotation': true,
            },
        });
        if (ret) {
            children = ret;
        }
    }
    return React__default.createElement("span", { "data-slate-leaf": true }, children);
};
const MemoizedLeaf = React__default.memo(Leaf$1, (prev, next) => {
    return (next.parent === prev.parent &&
        next.isLast === prev.isLast &&
        next.renderAnnotation === prev.renderAnnotation &&
        next.renderDecoration === prev.renderDecoration &&
        next.renderMark === prev.renderMark &&
        next.text === prev.text &&
        Leaf.equals(next.leaf, prev.leaf));
});
//# sourceMappingURL=leaf.js.map

/**
 * Text.
 */
const Text = (props) => {
    const { annotations, decorations, isLast, parent, renderAnnotation, renderDecoration, renderMark, text, } = props;
    const editor = useEditor();
    const ref = React.useRef(null);
    const leaves = getLeaves(text, annotations, decorations);
    const key = editor.findKey(text);
    const children = [];
    for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        children.push(React__default.createElement(MemoizedLeaf, { isLast: isLast && i === leaves.length - 1, key: `${key.id}-${i}`, leaf: leaf, text: text, parent: parent, renderAnnotation: renderAnnotation, renderDecoration: renderDecoration, renderMark: renderMark }));
    }
    console.log('render (text)');
    // Update element-related weak maps with the DOM element ref.
    React.useLayoutEffect(() => {
        if (ref.current) {
            console.log('add (text)', key);
            KEY_TO_ELEMENT.set(key, ref.current);
            NODE_TO_ELEMENT.set(text, ref.current);
            ELEMENT_TO_NODE.set(ref.current, text);
        }
        else {
            console.log('remove (text)', key);
            KEY_TO_ELEMENT.delete(key);
            NODE_TO_ELEMENT.delete(text);
        }
    });
    return (React__default.createElement("span", { "data-slate-node": "text", ref: ref }, children));
};
/**
 * Get the leaves for a text node given annotations and decorations.
 */
const getLeaves = (node, annotations, decorations) => {
    const { text, marks } = node;
    let leaves = [{ text, marks, annotations: {}, decorations: [] }];
    const compile = (collection, range, key) => {
        const [start, end] = slate.Range.edges(range);
        const next = [];
        let o = 0;
        for (const leaf of leaves) {
            const { length } = leaf.text;
            const offset = o;
            o += length;
            // If the range encompases the entire leaf, add the range.
            if (start.offset <= offset && end.offset >= offset + length) {
                if (collection === 'annotations') {
                    leaf.annotations[key] = range;
                }
                else {
                    leaf.decorations.push(range);
                }
                next.push(leaf);
                continue;
            }
            // If the range starts after the leaf, or ends before it, continue.
            if (start.offset > offset + length ||
                end.offset < offset ||
                (end.offset === offset && offset !== 0)) {
                next.push(leaf);
                continue;
            }
            // Otherwise we need to split the leaf, at the start, end, or both,
            // and add the range to the middle intersecting section. Do the end
            // split first since we don't need to update the offset that way.
            let middle = leaf;
            let before;
            let after;
            if (end.offset < offset + length) {
                [middle, after] = Leaf.split(middle, end.offset - offset);
            }
            if (start.offset > offset) {
                [before, middle] = Leaf.split(middle, start.offset - offset);
            }
            if (collection === 'annotations') {
                middle.annotations[key] = range;
            }
            else {
                middle.decorations.push(range);
            }
            if (before) {
                next.push(before);
            }
            next.push(middle);
            if (after) {
                next.push(after);
            }
        }
        leaves = next;
    };
    for (const key in annotations) {
        const range = annotations[key];
        compile('annotations', range, key);
    }
    for (const range of decorations) {
        compile('decorations', range);
    }
    return leaves;
};
const MemoizedText = React__default.memo(Text, (prev, next) => {
    if (next.parent === prev.parent &&
        next.isLast === prev.isLast &&
        next.renderAnnotation === prev.renderAnnotation &&
        next.renderDecoration === prev.renderDecoration &&
        next.renderMark === prev.renderMark &&
        next.text === prev.text) {
        return Leaf.equals({
            ...next.text,
            annotations: next.annotations,
            decorations: next.decorations,
        }, {
            ...prev.text,
            annotations: prev.annotations,
            decorations: prev.decorations,
        });
    }
    return false;
});
//# sourceMappingURL=text.js.map

/**
 * A React context for sharing the `readOnly` state of the editor.
 */

var ReadOnlyContext = React.createContext(false);
/**
 * Get the current `readOnly` state of the editor.
 */

var useReadOnly = function useReadOnly() {
  return React.useContext(ReadOnlyContext);
};

/**
 * A React context for sharing the `selected` state of an element.
 */

var SelectedContext = React.createContext(false);
/**
 * Get the current `selected` state of an element.
 */

var useSelected = function useSelected() {
  return React.useContext(SelectedContext);
};

/**
 * Element.
 */
const Element = (props) => {
    const { annotations, decorate, decorations, element, renderAnnotation, renderDecoration, renderElement = (props) => React__default.createElement(CustomElement, Object.assign({}, props)), renderMark, selection, } = props;
    const ref = React.useRef(null);
    const editor = useEditor();
    const readOnly = useReadOnly();
    const isInline = editor.isInline(element);
    const key = editor.findKey(element);
    let children = (React__default.createElement(Children, { annotations: annotations, decorate: decorate, decorations: decorations, node: element, renderAnnotation: renderAnnotation, renderDecoration: renderDecoration, renderElement: renderElement, renderMark: renderMark, selection: selection }));
    // Attributes that the developer must mix into the element in their
    // custom node renderer component.
    const attributes = {
        'data-slate-node': 'element',
        ref,
    };
    if (isInline) {
        attributes['data-slate-inline'] = true;
    }
    // If it's a block node with inline children, add the proper `dir` attribute
    // for text direction.
    if (!isInline && editor.hasInlines(element)) {
        const text = slate.Node.text(element);
        const dir = getDirection(text);
        if (dir === 'rtl') {
            attributes.dir = dir;
        }
    }
    // If it's a void node, wrap the children in extra void-specific elements.
    if (editor.isVoid(element)) {
        attributes['data-slate-void'] = true;
        if (!readOnly && isInline) {
            attributes['contentEditable'] = false;
        }
        const Tag = isInline ? 'span' : 'div';
        const [[text]] = slate.Node.texts(element);
        children = readOnly ? null : (React__default.createElement(Tag, { "data-slate-spacer": true, style: {
                height: '0',
                color: 'transparent',
                outline: 'none',
                position: 'absolute',
            } },
            React__default.createElement(MemoizedText, { annotations: {}, decorations: [], isLast: false, parent: element, text: text })));
        NODE_TO_INDEX.set(text, 0);
        NODE_TO_PARENT.set(text, element);
    }
    console.log('render (element)');
    // Update element-related weak maps with the DOM element ref.
    React.useLayoutEffect(() => {
        if (ref.current) {
            console.log('add (element)', key);
            KEY_TO_ELEMENT.set(key, ref.current);
            NODE_TO_ELEMENT.set(element, ref.current);
            ELEMENT_TO_NODE.set(ref.current, element);
        }
        else {
            console.log('remove (element)', key);
            KEY_TO_ELEMENT.delete(key);
            NODE_TO_ELEMENT.delete(element);
        }
    });
    return (React__default.createElement(SelectedContext.Provider, { value: !!selection }, renderElement({ attributes, children, element })));
};
const MemoizedElement = React__default.memo(Element, (prev, next) => {
    return (prev.decorate === next.decorate &&
        prev.element === next.element &&
        prev.renderAnnotation === next.renderAnnotation &&
        prev.renderDecoration === next.renderDecoration &&
        prev.renderElement === next.renderElement &&
        prev.renderMark === next.renderMark &&
        isRangeListEqual(prev.decorations, next.decorations) &&
        isRangeMapEqual(prev.annotations, next.annotations) &&
        (prev.selection === next.selection ||
            (!!prev.selection &&
                !!next.selection &&
                slate.Range.equals(prev.selection, next.selection))));
});
//# sourceMappingURL=element.js.map

/**
 * Children.
 */
const Children = (props) => {
    const { annotations, decorate, decorations, node, renderAnnotation, renderDecoration, renderElement, renderMark, selection, } = props;
    const editor = useEditor();
    const path = editor.findPath(node);
    const children = [];
    const isLeafBlock = slate.Element.isElement(node) && !editor.isInline(node) && editor.hasInlines(node);
    for (let i = 0; i < node.nodes.length; i++) {
        const p = path.concat(i);
        const n = node.nodes[i];
        const key = editor.findKey(n);
        const range = editor.getRange(p);
        const sel = selection && slate.Range.intersection(range, selection);
        const decs = decorate([n, p]);
        const anns = {};
        for (const dec of decorations) {
            const d = slate.Range.intersection(dec, range);
            if (d) {
                decs.push(d);
            }
        }
        for (const k in annotations) {
            const ann = annotations[k];
            const a = slate.Range.intersection(ann, range);
            if (a) {
                anns[k] = a;
            }
        }
        if (slate.Element.isElement(n)) {
            children.push(React__default.createElement(MemoizedElement, { annotations: anns, decorate: decorate, decorations: decs, element: n, key: key.id, renderAnnotation: renderAnnotation, renderDecoration: renderDecoration, renderElement: renderElement, renderMark: renderMark, selection: sel }));
        }
        else {
            children.push(React__default.createElement(MemoizedText, { annotations: anns, decorations: decs, key: key.id, isLast: isLeafBlock && i === node.nodes.length, parent: node, renderAnnotation: renderAnnotation, renderDecoration: renderDecoration, renderMark: renderMark, text: n }));
        }
        NODE_TO_INDEX.set(n, i);
        NODE_TO_PARENT.set(n, node);
    }
    return React__default.createElement(React__default.Fragment, null, children);
};
//# sourceMappingURL=children.js.map

/**
 * A React context for sharing the `focused` state of the editor.
 */

var FocusedContext = React.createContext(false);
/**
 * Get the current `focused` state of the editor.
 */

var useFocused = function useFocused() {
  return React.useContext(FocusedContext);
};

var IS_IOS = typeof navigator !== 'undefined' && typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var IS_APPLE = typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent);
var IS_FIREFOX = typeof navigator !== 'undefined' && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);
var IS_SAFARI = typeof navigator !== 'undefined' && /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);

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

/**
 * Types.
 */

/**
 * Check if a DOM node is a comment node.
 */
var isDOMComment = function isDOMComment(value) {
  return isDOMNode(value) && value.nodeType === 8;
};
/**
 * Check if a DOM node is an element node.
 */

var isDOMElement = function isDOMElement(value) {
  return isDOMNode(value) && value.nodeType === 1;
};
/**
 * Check if a value is a DOM node.
 */

var isDOMNode = function isDOMNode(value) {
  return value instanceof Node;
};
/**
 * Check if a DOM node is an element node.
 */

var isDOMText = function isDOMText(value) {
  return isDOMNode(value) && value.nodeType === 3;
};
/**
 * Normalize a DOM point so that it always refers to a text node.
 */

var normalizeDOMPoint = function normalizeDOMPoint(domPoint) {
  var _domPoint = slicedToArray(domPoint, 2),
      node = _domPoint[0],
      offset = _domPoint[1]; // If it's an element node, its offset refers to the index of its children
  // including comment nodes, so try to find the right text child node.


  if (isDOMElement(node) && node.childNodes.length) {
    var isLast = offset === node.childNodes.length;
    var direction = isLast ? 'backward' : 'forward';
    var index = isLast ? offset - 1 : offset;
    node = getEditableChild(node, index, direction); // If the node has children, traverse until we have a leaf node. Leaf nodes
    // can be either text nodes, or other void DOM nodes.

    while (isDOMElement(node) && node.childNodes.length) {
      var i = isLast ? node.childNodes.length - 1 : 0;
      node = getEditableChild(node, i, direction);
    } // Determine the new offset inside the text node.


    offset = isLast && node.textContent != null ? node.textContent.length : 0;
  } // Return the node and offset.


  return [node, offset];
};
/**
 * Get the nearest editable child at `index` in a `parent`, preferring
 * `direction`.
 */

var getEditableChild = function getEditableChild(parent, index, direction) {
  var childNodes = parent.childNodes;
  var child = childNodes[index];
  var i = index;
  var triedForward = false;
  var triedBackward = false; // While the child is a comment node, or an element node with no children,
  // keep iterating to find a sibling non-void, non-comment node.

  while (isDOMComment(child) || isDOMElement(child) && child.childNodes.length === 0 || isDOMElement(child) && child.getAttribute('contenteditable') === 'false') {
    if (triedForward && triedBackward) {
      break;
    }

    if (i >= childNodes.length) {
      triedForward = true;
      i = index - 1;
      direction = 'backward';
      continue;
    }

    if (i < 0) {
      triedBackward = true;
      i = index + 1;
      direction = 'forward';
      continue;
    }

    child = childNodes[i];
    i += direction === 'forward' ? 1 : -1;
  }

  return child;
};

var Utils;

(function (Utils) {
  /**
   * Get the `Fragment` data from a `DataTransfer` object.
   */
  Utils.getFragmentData = function (dataTransfer) {
    var base64 = dataTransfer.getData('application/x-slate-fragment');

    if (base64) {
      var decoded = decodeURIComponent(window.atob(base64));
      var fragment = JSON.parse(decoded);
      return fragment;
    }
  };
  /**
   * Set the currently selected fragment to the clipboard.
   */


  Utils.setFragmentData = function (dataTransfer, editor) {
    var value = editor.value;
    var selection = value.selection;

    if (!selection) {
      return;
    }

    var _SlateRange$edges = slate.Range.edges(selection),
        _SlateRange$edges2 = slicedToArray(_SlateRange$edges, 2),
        start = _SlateRange$edges2[0],
        end = _SlateRange$edges2[1];

    var startVoid = editor.getMatch(start.path, 'void');
    var endVoid = editor.getMatch(end.path, 'void');

    if (slate.Range.isCollapsed(selection) && !startVoid) {
      return;
    } // Create a fake selection so that we can add a Base64-encoded copy of the
    // fragment to the HTML, to decode on future pastes.


    var domRange = editor.toDomRange(selection);
    var contents = domRange.cloneContents();
    var attach = contents.childNodes[0]; // Make sure attach is non-empty, since empty nodes will not get copied.

    contents.childNodes.forEach(function (node) {
      if (node.textContent && node.textContent.trim() !== '') {
        attach = node;
      }
    }); // COMPAT: If the end node is a void node, we need to move the end of the
    // range from the void node's spacer span, to the end of the void node's
    // content, since the spacer is before void's content in the DOM.

    if (endVoid) {
      var _endVoid = slicedToArray(endVoid, 1),
          voidNode = _endVoid[0];

      var r = domRange.cloneRange();
      var domNode = editor.toDomNode(voidNode);
      r.setEndAfter(domNode);
      contents = r.cloneContents();
    } // COMPAT: If the start node is a void node, we need to attach the encoded
    // fragment to the void node's content node instead of the spacer, because
    // attaching it to empty `<div>/<span>` nodes will end up having it erased by
    // most browsers. (2018/04/27)


    if (startVoid) {
      attach = contents.querySelector('[data-slate-spacer]');
    } // Remove any zero-width space spans from the cloned DOM so that they don't
    // show up elsewhere when pasted.


    Array.from(contents.querySelectorAll('[data-slate-zero-width]')).forEach(function (zw) {
      var isNewline = zw.getAttribute('data-slate-zero-width') === 'n';
      zw.textContent = isNewline ? '\n' : '';
    }); // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
    // in the HTML, and can be used for intra-Slate pasting. If it's a text
    // node, wrap it in a `<span>` so we have something to set an attribute on.

    if (isDOMText(attach)) {
      var span = document.createElement('span'); // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
      // then leading and trailing spaces will be ignored. (2017/09/21)

      span.style.whiteSpace = 'pre';
      span.appendChild(attach);
      contents.appendChild(span);
      attach = span;
    }

    var fragment = slate.Node.fragment(value, selection);
    var string = JSON.stringify(fragment);
    var encoded = window.btoa(encodeURIComponent(string));
    attach.setAttribute('data-slate-fragment', encoded);
    dataTransfer.setData('application/x-slate-fragment', encoded); // Add the content to a <div> so that we can get its inner HTML.

    var div = document.createElement('div');
    div.appendChild(contents);
    dataTransfer.setData('text/html', div.innerHTML);
    dataTransfer.setData('text/plain', getPlainText(div));
  };
})(Utils || (Utils = {}));
/**
 * Get a plaintext representation of the content of a node, accounting for block
 * elements which get a newline appended.
 */


var getPlainText = function getPlainText(domNode) {
  var text = '';

  if (isDOMText(domNode) && domNode.nodeValue) {
    return domNode.nodeValue;
  }

  if (isDOMElement(domNode)) {
    for (var _i = 0, _Array$from = Array.from(domNode.childNodes); _i < _Array$from.length; _i++) {
      var childNode = _Array$from[_i];
      text += getPlainText(childNode);
    }

    var display = getComputedStyle(domNode).getPropertyValue('display');

    if (display === 'block' || display === 'list' || domNode.tagName === 'BR') {
      text += '\n';
    }
  }

  return text;
};

/**
 * Editor.
 */
const Editor = (props) => {
    const { decorate = defaultDecorate, editor, value, onChange, placeholder, readOnly = false, renderAnnotation, renderDecoration, renderElement, renderMark, role = 'textbox', style = {}, ...attributes } = props;
    if (!slate.Value.isValue(value)) {
        throw new Error(`The \`value=\` prop you passed to <Editor> was not a valid Slate value: ${JSON.stringify(value)}`);
    }
    const ref = React.useRef(null);
    // Update internal state on each render.
    editor.onChange = onChange;
    editor.value = value;
    PLACEHOLDER.set(editor, placeholder);
    IS_READ_ONLY.set(editor, readOnly);
    // Keep track of some state for the event handler logic.
    const state = React.useMemo(() => ({
        isComposing: false,
        isUpdatingSelection: false,
        latestElement: null,
    }), []);
    // Update element-related weak maps with the DOM element ref.
    React.useLayoutEffect(() => {
        if (ref.current) {
            EDITOR_TO_ELEMENT.set(editor, ref.current);
            NODE_TO_ELEMENT.set(value, ref.current);
            ELEMENT_TO_NODE.set(ref.current, value);
        }
        else {
            NODE_TO_ELEMENT.delete(value);
        }
    });
    // Attach a native DOM event handler for `selectionchange`, because React's
    // built-in `onSelect` handler doesn't fire for all selection changes. It's a
    // leaky polyfill that only fires on keypresses or clicks. Instead, we want to
    // fire for any change to the selection inside the editor. (2019/11/04)
    // https://github.com/facebook/react/issues/5785
    React.useLayoutEffect(() => {
        window.document.addEventListener('selectionchange', onDOMSelectionChange);
        return () => {
            window.document.removeEventListener('selectionchange', onDOMSelectionChange);
        };
    }, []);
    // Attach a native DOM event handler for `beforeinput` events, because React's
    // built-in `onBeforeInput` is actually a leaky polyfill that doesn't expose
    // real `beforeinput` events sadly... (2019/11/04)
    // https://github.com/facebook/react/issues/11211
    React.useLayoutEffect(() => {
        if (ref.current) {
            // @ts-ignore The `beforeinput` event isn't recognized.
            ref.current.addEventListener('beforeinput', onDOMBeforeInput);
        }
        return () => {
            if (ref.current) {
                // @ts-ignore The `beforeinput` event isn't recognized.
                ref.current.removeEventListener('beforeinput', onDOMBeforeInput);
            }
        };
    }, []);
    console.log('render');
    // Whenever the editor updates, make sure the DOM selection state is in sync.
    React.useLayoutEffect(() => {
        console.log('useLayoutEffect: sync selection');
        const { selection } = value;
        const domSelection = window.getSelection();
        if (state.isComposing || !domSelection || !editor.isFocused()) {
            return;
        }
        const el = editor.toDomNode(value);
        const domRange = domSelection.getRangeAt(0);
        const newDomRange = selection && editor.toDomRange(selection);
        if ((!selection && !domRange) ||
            (domRange && newDomRange && isRangeEqual(domRange, newDomRange))) {
            return;
        }
        state.isUpdatingSelection = true;
        console.log('updating domSelection');
        domSelection.removeAllRanges();
        if (newDomRange) {
            domSelection.addRange(newDomRange);
            const leafEl = newDomRange.startContainer.parentElement;
            scrollIntoView(leafEl, { scrollMode: 'if-needed' });
        }
        setTimeout(() => {
            // COMPAT: In Firefox, it's not enough to create a range, you also need
            // to focus the contenteditable element too. (2016/11/16)
            if (newDomRange && IS_FIREFOX) {
                el.focus();
            }
            state.isUpdatingSelection = false;
        });
    });
    // Listen on the native `beforeinput` event to get real "Level 2" events. This
    // is required because React's `beforeinput` is fake and never really attaches
    // to the real event sadly. (2019/11/01)
    // https://github.com/facebook/react/issues/11211
    const onDOMBeforeInput = React.useCallback((event) => {
        if (!readOnly && hasEditableTarget(editor, event.target)) {
            console.log('beforeinput', event);
            const { inputType } = event;
            // These two types occur while a user is composing text and can't be
            // cancelled. Let them through and wait for the composition to end.
            if (inputType === 'insertCompositionText' ||
                inputType === 'deleteCompositionText') {
                return;
            }
            const [targetRange] = event.getTargetRanges();
            if (targetRange && inputType !== 'deleteContent') {
                const range = editor.toSlateRange(targetRange);
                editor.select(range);
            }
            event.preventDefault();
            editor.onBeforeInput(event);
        }
    }, []);
    // On native `selectionchange` event, trigger the `onSelect` handler. This is
    // needed to account for React's `onSelect` being non-standard and not firing
    // until after a selection has been released. This causes issues in situations
    // where another change happens while a selection is being dragged.
    const onDOMSelectionChange = React.useCallback(debounce_1(() => {
        console.log('selectionchange');
        if (!readOnly && !state.isComposing && !state.isUpdatingSelection) {
            const { activeElement } = window.document;
            const el = editor.toDomNode(value);
            const domSelection = window.getSelection();
            const domRange = domSelection &&
                domSelection.rangeCount > 0 &&
                domSelection.getRangeAt(0);
            if (activeElement === el) {
                state.latestElement = activeElement;
                IS_FOCUSED.set(editor, true);
            }
            else {
                IS_FOCUSED.delete(editor);
            }
            if (domRange &&
                hasEditableTarget(editor, domRange.startContainer) &&
                hasEditableTarget(editor, domRange.endContainer)) {
                const range = editor.toSlateRange(domRange);
                console.log('select', domRange, range);
                editor.select(range);
            }
            else {
                editor.deselect();
            }
        }
    }, 100), []);
    return (React__default.createElement(EditorContext.Provider, { value: editor },
        React__default.createElement(ReadOnlyContext.Provider, { value: readOnly },
            React__default.createElement(FocusedContext.Provider, { value: editor.isFocused() },
                React__default.createElement("div", Object.assign({ "data-gramm": false, role: readOnly ? undefined : props.role || 'textbox' }, attributes, { "data-slate-editor": true, "data-slate-node": "value", contentEditable: readOnly ? undefined : true, suppressContentEditableWarning: true, ref: ref, style: {
                        // Prevent the default outline styles.
                        outline: 'none',
                        // Preserve adjacent whitespace and new lines.
                        whiteSpace: 'pre-wrap',
                        // Allow words to break if they are too long.
                        wordWrap: 'break-word',
                        // Allow for passed-in styles to override anything.
                        ...style,
                    }, onBlur: React.useCallback((event) => {
                        if (!readOnly &&
                            !state.isUpdatingSelection &&
                            hasEditableTarget(editor, event.target) &&
                            // COMPAT: If the current `activeElement` is still the previous
                            // one, this is due to the window being blurred when the tab
                            // itself becomes unfocused, so we want to abort early to allow to
                            // editor to stay focused when the tab becomes focused again.
                            state.latestElement !== window.document.activeElement) {
                            const { relatedTarget } = event;
                            // COMPAT: The `relatedTarget` can be null when the new focus target
                            // is not a "focusable" element (eg. a `<div>` without `tabindex`
                            // set).
                            if (relatedTarget) {
                                const el = editor.toDomNode(value);
                                // COMPAT: The event should be ignored if the focus is returning
                                // to the editor from an embedded editable element (eg. an <input>
                                // element inside a void node).
                                if (relatedTarget === el)
                                    return;
                                if (isDOMElement(relatedTarget)) {
                                    // COMPAT: The event should be ignored if the focus is moving from
                                    // the editor to inside a void node's spacer element.
                                    if (relatedTarget.hasAttribute('data-slate-spacer'))
                                        return;
                                    // COMPAT: The event should be ignored if the focus is moving to a
                                    // non- editable section of an element that isn't a void node (eg.
                                    // a list item of the check list example).
                                    const node = editor.toSlateNode(relatedTarget);
                                    if (editor.hasDomNode(relatedTarget) &&
                                        (!slate.Element.isElement(node) || !editor.isVoid(node))) {
                                        return;
                                    }
                                }
                            }
                        }
                        IS_FOCUSED.delete(editor);
                    }, []), onClick: React.useCallback((event) => {
                        if (!readOnly &&
                            hasTarget(editor, event.target) &&
                            isDOMNode(event.target)) {
                            const node = editor.toSlateNode(event.target);
                            const path = editor.findPath(node);
                            const start = editor.getStart(path);
                            if (editor.getMatch(start, 'void')) {
                                editor.select(start);
                            }
                        }
                    }, []), onCompositionEnd: React.useCallback((event) => {
                        if (hasEditableTarget(editor, event.target)) {
                            state.isComposing = false;
                            // COMPAT: In Chrome, `beforeinput` events for compositions
                            // aren't correct and never fire the "insertFromComposition"
                            // type that we need. So instead, insert whenever a composition
                            // ends since it will already have been committed to the DOM.
                            if (!IS_SAFARI && event.data) {
                                editor.insertText(event.data);
                            }
                        }
                    }, []), onCompositionStart: React.useCallback((event) => {
                        if (hasEditableTarget(editor, event.target)) {
                            state.isComposing = true;
                        }
                    }, []), onCopy: React.useCallback((event) => {
                        if (hasEditableTarget(editor, event.target)) {
                            event.preventDefault();
                            Utils.setFragmentData(event.clipboardData, editor);
                        }
                    }, []), onCut: React.useCallback((event) => {
                        if (!readOnly && hasEditableTarget(editor, event.target)) {
                            event.preventDefault();
                            Utils.setFragmentData(event.clipboardData, editor);
                            const { selection } = value;
                            if (selection && slate.Range.isExpanded(selection)) {
                                editor.delete();
                            }
                        }
                    }, []), onDragOver: React.useCallback((event) => {
                        if (hasTarget(editor, event.target)) {
                            // Only when the target is void, call `preventDefault` to signal
                            // that drops are allowed. Editable content is droppable by
                            // default, and calling `preventDefault` hides the cursor.
                            const node = editor.toSlateNode(event.target);
                            if (slate.Element.isElement(node) && editor.isVoid(node)) {
                                event.preventDefault();
                            }
                        }
                    }, []), onDragStart: React.useCallback((event) => {
                        if (hasTarget(editor, event.target)) {
                            const node = editor.toSlateNode(event.target);
                            const path = editor.findPath(node);
                            const voidMatch = editor.getMatch(path, 'void');
                            // If starting a drag on a void node, make sure it is selected
                            // so that it shows up in the selection's fragment.
                            if (voidMatch) {
                                const range = editor.getRange(path);
                                editor.select(range);
                            }
                            Utils.setFragmentData(event.dataTransfer, editor);
                        }
                    }, []), onFocus: React.useCallback((event) => {
                        if (!readOnly &&
                            !state.isUpdatingSelection &&
                            hasEditableTarget(editor, event.target)) {
                            const el = editor.toDomNode(value);
                            state.latestElement = window.document.activeElement;
                            // COMPAT: If the editor has nested editable elements, the focus
                            // can go to them. In Firefox, this must be prevented because it
                            // results in issues with keyboard navigation. (2017/03/30)
                            if (IS_FIREFOX && event.target !== el) {
                                el.focus();
                                return;
                            }
                            IS_FOCUSED.set(editor, true);
                        }
                    }, []), onKeyDown: event => {
                        if (!readOnly && hasEditableTarget(editor, event.target)) {
                            editor.onKeyDown(event.nativeEvent);
                        }
                    } }),
                    React__default.createElement(Children, { annotations: value.annotations, decorate: decorate, decorations: decorate([value, []]), node: value, renderAnnotation: renderAnnotation, renderDecoration: renderDecoration, renderElement: renderElement, renderMark: renderMark, selection: value.selection }))))));
};
/**
 * A default memoized decorate function.
 */
const defaultDecorate = () => [];
/**
 * Check if two DOM range objects are equal.
 */
const isRangeEqual = (a, b) => {
    return ((a.startContainer === b.startContainer &&
        a.startOffset === b.startOffset &&
        a.endContainer === b.endContainer &&
        a.endOffset === b.endOffset) ||
        (a.startContainer === b.endContainer &&
            a.startOffset === b.endOffset &&
            a.endContainer === b.startContainer &&
            a.endOffset === b.startOffset));
};
/**
 * Check if the target is in the editor.
 */
const hasTarget = (editor, target) => {
    return isDOMNode(target) && editor.hasDomNode(target);
};
/**
 * Check if the target is editable and in the editor.
 */
const hasEditableTarget = (editor, target) => {
    return isDOMNode(target) && editor.hasDomNode(target, { editable: true });
};
//# sourceMappingURL=editor.js.map

/**
 * A thin wrapper around `useMemo` to make it easy to get an editor instance.
 */

var useSlate = function useSlate(Editor) {
  var editor = React.useMemo(function () {
    return new Editor();
  }, [Editor]);
  return editor;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

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

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

var superPropBase = _superPropBase;

var get = createCommonjsModule(function (module) {
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

/**
 * Hotkey mappings for each platform.
 */

var HOTKEYS = {
  bold: 'mod+b',
  compose: ['down', 'left', 'right', 'up', 'backspace', 'enter'],
  moveBackward: 'left',
  moveForward: 'right',
  moveWordBackward: 'ctrl+left',
  moveWordForward: 'ctrl+right',
  deleteBackward: 'shift?+backspace',
  deleteForward: 'shift?+delete',
  extendBackward: 'shift+left',
  extendForward: 'shift+right',
  italic: 'mod+i',
  splitBlock: 'shift?+enter',
  undo: 'mod+z'
};
var APPLE_HOTKEYS = {
  moveLineBackward: 'opt+up',
  moveLineForward: 'opt+down',
  moveWordBackward: 'opt+left',
  moveWordForward: 'opt+right',
  deleteBackward: ['ctrl+backspace', 'ctrl+h'],
  deleteForward: ['ctrl+delete', 'ctrl+d'],
  deleteLineBackward: 'cmd+shift?+backspace',
  deleteLineForward: ['cmd+shift?+delete', 'ctrl+k'],
  deleteWordBackward: 'opt+shift?+backspace',
  deleteWordForward: 'opt+shift?+delete',
  extendLineBackward: 'opt+shift+up',
  extendLineForward: 'opt+shift+down',
  redo: 'cmd+shift+z',
  transposeCharacter: 'ctrl+t'
};
var WINDOWS_HOTKEYS = {
  deleteWordBackward: 'ctrl+shift?+backspace',
  deleteWordForward: 'ctrl+shift?+delete',
  redo: 'ctrl+y'
};
/**
 * Create a platform-aware hotkey checker.
 */

var create = function create(key) {
  var generic = HOTKEYS[key];
  var apple = APPLE_HOTKEYS[key];
  var windows = WINDOWS_HOTKEYS[key];
  var isGeneric = generic && isHotkey.isKeyHotkey(generic);
  var isApple = apple && isHotkey.isKeyHotkey(apple);
  var isWindows = windows && isHotkey.isKeyHotkey(windows);
  return function (event) {
    if (isGeneric && isGeneric(event)) return true;
    if (IS_APPLE && isApple && isApple(event)) return true;
    if (!IS_APPLE && isWindows && isWindows(event)) return true;
    return false;
  };
};
/**
 * Hotkeys.
 */


var Hotkeys = {
  isBold: create('bold'),
  isCompose: create('compose'),
  isMoveBackward: create('moveBackward'),
  isMoveForward: create('moveForward'),
  isDeleteBackward: create('deleteBackward'),
  isDeleteForward: create('deleteForward'),
  isDeleteLineBackward: create('deleteLineBackward'),
  isDeleteLineForward: create('deleteLineForward'),
  isDeleteWordBackward: create('deleteWordBackward'),
  isDeleteWordForward: create('deleteWordForward'),
  isExtendBackward: create('extendBackward'),
  isExtendForward: create('extendForward'),
  isExtendLineBackward: create('extendLineBackward'),
  isExtendLineForward: create('extendLineForward'),
  isItalic: create('italic'),
  isMoveLineBackward: create('moveLineBackward'),
  isMoveLineForward: create('moveLineForward'),
  isMoveWordBackward: create('moveWordBackward'),
  isMoveWordForward: create('moveWordForward'),
  isRedo: create('redo'),
  isSplitBlock: create('splitBlock'),
  isTransposeCharacter: create('transposeCharacter'),
  isUndo: create('undo')
};

/**
 * An auto-incrementing identifier for keys.
 */
var n = 0;
/**
 * A class that keeps track of a key string. We use a full class here because we
 * want to be able to use them as keys in `WeakMap` objects.
 */

var Key = function Key() {
  classCallCheck(this, Key);

  this.id = "".concat(n++);
};

/**
 * `withReact` adds React and DOM specific behaviors to the editor.
 */

var withReact = function withReact(Editor) {
  return (
    /*#__PURE__*/
    function (_Editor) {
      inherits(ReactEditor, _Editor);

      function ReactEditor() {
        classCallCheck(this, ReactEditor);

        return possibleConstructorReturn(this, getPrototypeOf(ReactEditor).apply(this, arguments));
      }

      createClass(ReactEditor, [{
        key: "apply",
        value: function apply(op) {
          var matches = [];

          switch (op.type) {
            case 'add_mark':
            case 'insert_text':
            case 'remove_mark':
            case 'remove_text':
            case 'set_mark':
            case 'set_node':
              {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = this.levels({
                    at: op.path
                  })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = slicedToArray(_step.value, 2),
                        node = _step$value[0],
                        path = _step$value[1];

                    var key = this.findKey(node);
                    matches.push([path, key]);
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

            case 'insert_node':
            case 'remove_node':
            case 'merge_node':
            case 'split_node':
              {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = this.levels({
                    at: slate.Path.parent(op.path)
                  })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = slicedToArray(_step2.value, 2),
                        _node = _step2$value[0],
                        _path = _step2$value[1];

                    var _key = this.findKey(_node);

                    matches.push([_path, _key]);
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

            case 'move_node':
              {
                // TODO
                break;
              }
          }

          get(getPrototypeOf(ReactEditor.prototype), "apply", this).call(this, op);

          for (var _i = 0, _matches = matches; _i < _matches.length; _i++) {
            var _matches$_i = slicedToArray(_matches[_i], 2),
                _path2 = _matches$_i[0],
                _key2 = _matches$_i[1];

            var _this$getNode = this.getNode(_path2),
                _this$getNode2 = slicedToArray(_this$getNode, 1),
                _node2 = _this$getNode2[0];

            NODE_TO_KEY.set(_node2, _key2);
          }
        }
        /**
         * Find a key for a Slate node.
         */

      }, {
        key: "findKey",
        value: function findKey(node) {
          var key = NODE_TO_KEY.get(node);

          if (!key) {
            key = new Key();
            NODE_TO_KEY.set(node, key);
          }

          return key;
        }
        /**
         * Find the path of Slate node.
         */

      }, {
        key: "findPath",
        value: function findPath(node) {
          var path = [];
          var child = node;

          while (true) {
            var parent = NODE_TO_PARENT.get(child);

            if (parent == null) {
              if (slate.Value.isValue(child)) {
                return path;
              } else {
                break;
              }
            }

            var i = NODE_TO_INDEX.get(child);

            if (i == null) {
              break;
            }

            path.unshift(i);
            child = parent;
          }

          throw new Error("Unable to find the path for Slate node: ".concat(JSON.stringify(node)));
        }
        /**
         * Resolve the decorations for a node.
         */

      }, {
        key: "getDecorations",
        value: function getDecorations(node) {
          var placeholder = PLACEHOLDER.get(this);
          var decorations = [];

          if (placeholder && slate.Value.isValue(node) && node.nodes.length === 1 && Array.from(slate.Node.texts(node)).length === 1 && slate.Node.text(node) === '') {
            var _decorations$push;

            var start = this.getStart([]);
            decorations.push((_decorations$push = {}, defineProperty(_decorations$push, PLACEHOLDER_SYMBOL, true), defineProperty(_decorations$push, "placeholder", placeholder), defineProperty(_decorations$push, "anchor", start), defineProperty(_decorations$push, "focus", start), _decorations$push));
          }

          return decorations;
        }
        /**
         * Check if the editor is focused.
         */

      }, {
        key: "isFocused",
        value: function isFocused() {
          return !!IS_FOCUSED.get(this);
        }
        /**
         * Check if the editor is in read-only mode.
         */

      }, {
        key: "isReadOnly",
        value: function isReadOnly() {
          return !!IS_READ_ONLY.get(this);
        }
        /**
         * Blur the editor.
         */

      }, {
        key: "blur",
        value: function blur() {
          var el = this.toDomNode(this.value);
          IS_FOCUSED.set(this, false);

          if (window.document.activeElement === el) {
            el.blur();
          }
        }
        /**
         * Focus the editor.
         */

      }, {
        key: "focus",
        value: function focus() {
          var el = this.toDomNode(this.value);
          IS_FOCUSED.set(this, true);

          if (window.document.activeElement !== el) {
            el.focus({
              preventScroll: true
            });
          }
        }
        /**
         * Deselect the editor.
         */

      }, {
        key: "deselect",
        value: function deselect() {
          var selection = this.value.selection;
          var domSelection = window.getSelection();

          if (domSelection && domSelection.rangeCount > 0) {
            domSelection.removeAllRanges();
          }

          if (selection) {
            this.apply({
              type: 'set_selection',
              properties: selection,
              newProperties: null
            });
          }
        }
        /**
         * Insert a `DataTransfer` object.
         */

      }, {
        key: "insertData",
        value: function insertData(dataTransfer) {
          var fragment = Utils.getFragmentData(dataTransfer);

          if (fragment) {
            this.insertFragment(fragment);
            return;
          }

          var text = dataTransfer.getData('text/plain');

          if (text) {
            var lines = text.split('\n');
            var split = false;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = lines[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var line = _step3.value;

                if (split) {
                  this.splitNodes();
                }

                this.insertText(line);
                split = true;
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
        }
        /**
         * Transform an `InputEvent` into commands on the editor.
         */

      }, {
        key: "onBeforeInput",
        value: function onBeforeInput(event) {
          var inputType = event.inputType,
              data = event.data,
              dataTransfer = event.dataTransfer; // Each of these input types reflects specific user intent, and most of them
          // are cancellable so we can perform the action on the Slate model direclty.
          // https://w3c.github.io/input-events/#dom-inputevent-inputtype

          switch (inputType) {
            case 'deleteByComposition':
            case 'deleteByCut':
            case 'deleteByDrag':
            case 'deleteContent':
            case 'deleteContentForward':
              {
                this["delete"]();
                break;
              }

            case 'deleteContentBackward':
              {
                this["delete"]({
                  reverse: true
                });
                break;
              }

            case 'deleteEntireSoftLine':
              {
                this["delete"]({
                  unit: 'line',
                  reverse: true
                });
                this["delete"]({
                  unit: 'line'
                });
                break;
              }

            case 'deleteSoftLineBackward':
            case 'deleteHardLineBackward':
              {
                this["delete"]({
                  unit: 'line',
                  reverse: true
                });
                break;
              }

            case 'deleteSoftLineForward':
            case 'deleteHardLineForward':
              {
                this["delete"]({
                  unit: 'line'
                });
                break;
              }

            case 'deleteWordBackward':
              {
                this["delete"]({
                  unit: 'word',
                  reverse: true
                });
                break;
              }

            case 'deleteWordForward':
              {
                this["delete"]({
                  unit: 'word'
                });
                break;
              }

            case 'historyRedo':
              {
                this.redo();
                break;
              }

            case 'historyUndo':
              {
                this.undo();
                break;
              }

            case 'insertLineBreak':
            case 'insertParagraph':
              {
                this.splitNodes({
                  always: true
                });
                break;
              }

            case 'insertFromComposition':
            case 'insertFromDrop':
            case 'insertFromPaste':
            case 'insertFromYank':
            case 'insertReplacementText':
            case 'insertText':
              {
                if (dataTransfer != null) {
                  this.insertData(dataTransfer);
                } else if (data != null) {
                  this.insertText(data);
                }

                break;
              }
          }
        }
        /**
         * Transform a `KeyboardEvent` into commands on the editor. This should only
         * be used for hotkeys which attach specific commands to specific key
         * combinations. Most input logic will be handled by the `onBeforeInput`
         * method instead.
         */

      }, {
        key: "onKeyDown",
        value: function onKeyDown(event) {
          // COMPAT: Since we prevent the default behavior on `beforeinput` events,
          // the browser doesn't think there's ever any history stack to undo or redo,
          // so we have to manage these hotkeys ourselves. (2019/11/06)
          if (Hotkeys.isRedo(event)) {
            this.redo();
            return;
          }

          if (Hotkeys.isUndo(event)) {
            this.undo();
            return;
          } // COMPAT: Certain browsers don't handle the selection updates
          // properly. In Chrome, the selection isn't properly extended.
          // And in Firefox, the selection isn't properly collapsed.
          // (2017/10/17)


          if (Hotkeys.isMoveLineBackward(event)) {
            event.preventDefault();
            this.move({
              unit: 'line',
              reverse: true
            });
            return;
          }

          if (Hotkeys.isMoveLineForward(event)) {
            event.preventDefault();
            this.move({
              unit: 'line'
            });
            return;
          }

          if (Hotkeys.isExtendLineBackward(event)) {
            event.preventDefault();
            this.move({
              unit: 'line',
              edge: 'focus',
              reverse: true
            });
            return;
          }

          if (Hotkeys.isExtendLineForward(event)) {
            event.preventDefault();
            this.move({
              unit: 'line',
              edge: 'focus'
            });
            return;
          } // COMPAT: If a void node is selected, or a zero-width text node
          // adjacent to an inline is selected, we need to handle these
          // hotkeys manually because browsers won't be able to skip over
          // the void node with the zero-width space not being an empty
          // string.


          if (Hotkeys.isMoveBackward(event)) {
            var selection = this.value.selection;
            event.preventDefault();

            if (selection && slate.Range.isCollapsed(selection)) {
              this.move({
                reverse: true
              });
            } else {
              this.collapse({
                edge: 'start'
              });
            }

            return;
          }

          if (Hotkeys.isMoveForward(event)) {
            var _selection = this.value.selection;
            event.preventDefault();

            if (_selection && slate.Range.isCollapsed(_selection)) {
              this.move();
            } else {
              this.collapse({
                edge: 'end'
              });
            }

            return;
          }

          if (Hotkeys.isMoveWordBackward(event)) {
            event.preventDefault();
            this.move({
              unit: 'word',
              reverse: true
            });
            return;
          }

          if (Hotkeys.isMoveWordForward(event)) {
            event.preventDefault();
            this.move({
              unit: 'word'
            });
            return;
          }
        }
        /**
         * Redo.
         */

      }, {
        key: "redo",
        value: function redo() {}
        /**
         * Undo.
         */

      }, {
        key: "undo",
        value: function undo() {}
        /**
         * Check if a DOM node is within the editor.
         */

      }, {
        key: "hasDomNode",
        value: function hasDomNode(target) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _options$editable = options.editable,
              editable = _options$editable === void 0 ? false : _options$editable;
          var el = this.toDomNode(this.value);
          var element; // COMPAT: In Firefox, reading `target.nodeType` will throw an error if
          // target is originating from an internal "restricted" element (e.g. a
          // stepper arrow on a number input). (2018/05/04)
          // https://github.com/ianstormtaylor/slate/issues/1819

          try {
            element = isDOMElement(target) ? target : target.parentElement;
          } catch (err) {
            if (!err.message.includes('Permission denied to access property "nodeType"')) {
              throw err;
            }
          }

          if (!element) {
            return false;
          }

          return element.closest("[data-slate-editor]") === el && (!editable || el.isContentEditable);
        }
        /**
         * Find the native DOM element from a Slate node.
         */

      }, {
        key: "toDomNode",
        value: function toDomNode(node) {
          var domNode = slate.Value.isValue(node) ? EDITOR_TO_ELEMENT.get(this) : KEY_TO_ELEMENT.get(this.findKey(node));

          if (!domNode) {
            throw new Error("Cannot resolve a DOM node from Slate node: ".concat(JSON.stringify(node)));
          }

          return domNode;
        }
        /**
         * Find a native DOM selection point from a Slate point.
         */

      }, {
        key: "toDomPoint",
        value: function toDomPoint(point) {
          var _this$getNode3 = this.getNode(point.path),
              _this$getNode4 = slicedToArray(_this$getNode3, 1),
              node = _this$getNode4[0];

          var el = this.toDomNode(node);
          var domPoint; // For each leaf, we need to isolate its content, which means filtering
          // to its direct text and zero-width spans. (We have to filter out any
          // other siblings that may have been rendered alongside them.)

          var selector = "[data-slate-string], [data-slate-zero-width]";
          var texts = Array.from(el.querySelectorAll(selector));
          var start = 0;

          for (var _i2 = 0, _texts = texts; _i2 < _texts.length; _i2++) {
            var text = _texts[_i2];
            var domNode = text.childNodes[0];

            if (domNode == null || domNode.textContent == null) {
              continue;
            }

            var length = domNode.textContent.length;
            var attr = text.getAttribute('data-slate-length');
            var trueLength = attr == null ? length : parseInt(attr, 10);
            var end = start + trueLength;

            if (point.offset <= end) {
              var offset = Math.min(length, Math.max(0, point.offset - start));
              domPoint = [domNode, offset];
              break;
            }

            start = end;
          }

          if (!domPoint) {
            throw new Error("Cannot resolve a DOM point from Slate point: ".concat(JSON.stringify(point)));
          }

          return domPoint;
        }
        /**
         * Find a native DOM range from a Slate `range`.
         */

      }, {
        key: "toDomRange",
        value: function toDomRange(range) {
          var anchor = range.anchor,
              focus = range.focus;
          var domAnchor = this.toDomPoint(anchor);
          var domFocus = slate.Range.isCollapsed(range) ? domAnchor : this.toDomPoint(focus);
          var domRange = window.document.createRange();
          var start = slate.Range.isBackward(range) ? domFocus : domAnchor;
          var end = slate.Range.isBackward(range) ? domAnchor : domFocus;
          domRange.setStart(start[0], start[1]);
          domRange.setEnd(end[0], end[1]);
          return domRange;
        }
        /**
         * Find a Slate node from a native DOM `element`.
         */

      }, {
        key: "toSlateNode",
        value: function toSlateNode(domNode) {
          var domEl = isDOMElement(domNode) ? domNode : domNode.parentElement;

          if (domEl && !domEl.hasAttribute('data-slate-node')) {
            domEl = domEl.closest("[data-slate-node]");
          }

          var node = domEl ? ELEMENT_TO_NODE.get(domEl) : null;

          if (!node) {
            throw new Error("Cannot resolve a Slate node from DOM node: ".concat(domEl));
          }

          return node;
        }
        /**
         * Get the target range from a DOM `event`.
         */

      }, {
        key: "findEventRange",
        value: function findEventRange(event) {
          if ('nativeEvent' in event) {
            event = event.nativeEvent;
          }

          var _event = event,
              x = _event.clientX,
              y = _event.clientY,
              target = _event.target;

          if (x == null || y == null) {
            return;
          }

          var node = this.toSlateNode(event.target);
          var path = this.findPath(node); // If the drop target is inside a void node, move it into either the
          // next or previous node, depending on which side the `x` and `y`
          // coordinates are closest to.

          if (slate.Element.isElement(node) && this.isVoid(node)) {
            var rect = target.getBoundingClientRect();
            var isPrev = this.isInline(node) ? x - rect.left < rect.left + rect.width - x : y - rect.top < rect.top + rect.height - y;
            var edge = this.getPoint(path, {
              edge: isPrev ? 'start' : 'end'
            });
            var point = isPrev ? this.getBefore(edge) : this.getAfter(edge);

            if (point) {
              var _range = this.getRange(point);

              return _range;
            }
          } // Else resolve a range from the caret position where the drop occured.


          var domRange;
          var _window = window,
              document = _window.document; // COMPAT: In Firefox, `caretRangeFromPoint` doesn't exist. (2016/07/25)

          if (document.caretRangeFromPoint) {
            domRange = document.caretRangeFromPoint(x, y);
          } else {
            var position = document.caretPositionFromPoint(x, y);

            if (position) {
              domRange = document.createRange();
              domRange.setStart(position.offsetNode, position.offset);
              domRange.setEnd(position.offsetNode, position.offset);
            }
          }

          if (!domRange) {
            throw new Error("Cannot resolve a Slate range from a DOM event: ".concat(event));
          } // Resolve a Slate range from the DOM range.


          var range = this.toSlateRange(domRange);
          return range;
        }
        /**
         * Find a Slate point from a DOM selection's `domNode` and `domOffset`.
         */

      }, {
        key: "toSlatePoint",
        value: function toSlatePoint(domPoint) {
          var _normalizeDOMPoint = normalizeDOMPoint(domPoint),
              _normalizeDOMPoint2 = slicedToArray(_normalizeDOMPoint, 2),
              nearestNode = _normalizeDOMPoint2[0],
              nearestOffset = _normalizeDOMPoint2[1];

          var parentNode = nearestNode.parentNode;
          var textNode = null;
          var offset = 0;

          if (parentNode) {
            var voidNode = parentNode.closest('[data-slate-void="true"]');
            var leafNode = parentNode.closest('[data-slate-leaf]');
            var domNode = null; // Calculate how far into the text node the `nearestNode` is, so that we
            // can determine what the offset relative to the text node is.

            if (leafNode) {
              textNode = leafNode.closest('[data-slate-node="text"]');
              var range = window.document.createRange();
              range.setStart(textNode, 0);
              range.setEnd(nearestNode, nearestOffset);
              var contents = range.cloneContents();
              var zeroWidths = contents.querySelectorAll('[data-slate-zero-width]');
              Array.from(zeroWidths).forEach(function (el) {
                el.parentNode.removeChild(el);
              }); // COMPAT: Edge has a bug where SlateRange.prototype.toString() will
              // convert \n into \r\n. The bug causes a loop when slate-react
              // attempts to reposition its cursor to match the native position. Use
              // textContent.length instead.
              // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10291116/

              offset = contents.textContent.length;
              domNode = textNode;
            } else if (voidNode) {
              // For void nodes, the element with the offset key will be a cousin, not an
              // ancestor, so find it by going down from the nearest void parent.
              leafNode = voidNode.querySelector('[data-slate-leaf]');
              textNode = leafNode.closest('[data-slate-node="text"]');
              domNode = leafNode;
              offset = domNode.textContent.length;
            } // COMPAT: If the parent node is a Slate zero-width space, this is
            // because the text node should have no characters. However, during IME
            // composition the ASCII characters will be prepended to the zero-width
            // space, so subtract 1 from the offset to account for the zero-width
            // space character.


            if (domNode && offset === domNode.textContent.length && parentNode.hasAttribute('data-slate-zero-width')) {
              offset--;
            }
          }

          if (!textNode) {
            throw new Error("Cannot resolve a Slate point from DOM point: ".concat(domPoint));
          } // COMPAT: If someone is clicking from one Slate editor into another,
          // the select event fires twice, once for the old editor's `element`
          // first, and then afterwards for the correct `element`. (2017/03/03)


          var slateNode = this.toSlateNode(textNode);
          var path = this.findPath(slateNode);
          return {
            path: path,
            offset: offset
          };
        }
        /**
         * Find a Slate range from a DOM range or selection.
         */

      }, {
        key: "toSlateRange",
        value: function toSlateRange(domRange) {
          var el = domRange instanceof Selection ? domRange.anchorNode : domRange.startContainer;
          var anchorNode;
          var anchorOffset;
          var focusNode;
          var focusOffset;
          var isCollapsed;

          if (el) {
            if (domRange instanceof Selection) {
              anchorNode = domRange.anchorNode;
              anchorOffset = domRange.anchorOffset;
              focusNode = domRange.focusNode;
              focusOffset = domRange.focusOffset;
              isCollapsed = domRange.isCollapsed;
            } else {
              anchorNode = domRange.startContainer;
              anchorOffset = domRange.startOffset;
              focusNode = domRange.endContainer;
              focusOffset = domRange.endOffset;
              isCollapsed = domRange.collapsed;
            }
          }

          if (anchorNode == null || focusNode == null || anchorOffset == null || focusOffset == null) {
            throw new Error("Cannot resolve a Slate range from DOM range: ".concat(domRange));
          }

          var anchor = this.toSlatePoint([anchorNode, anchorOffset]);
          var focus = isCollapsed ? anchor : this.toSlatePoint([focusNode, focusOffset]);
          return {
            anchor: anchor,
            focus: focus
          };
        }
      }]);

      return ReactEditor;
    }(Editor)
  );
};

exports.Editable = Editor;
exports.Editor = Editor;
exports.useEditor = useEditor;
exports.useFocused = useFocused;
exports.useReadOnly = useReadOnly;
exports.useSelected = useSelected;
exports.useSlate = useSlate;
exports.withReact = withReact;
//# sourceMappingURL=index.js.map
