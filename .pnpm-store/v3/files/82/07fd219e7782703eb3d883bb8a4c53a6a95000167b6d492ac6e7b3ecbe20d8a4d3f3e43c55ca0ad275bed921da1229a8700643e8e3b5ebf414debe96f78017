(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SlateDevEnvironment = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;

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

/**
 * Browser matching rules.
 *
 * @type {Array}
 */

var BROWSER_RULES = [['edge', /Edge\/([0-9\._]+)/], ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/], ['opera', /Opera\/([0-9\.]+)(?:\s|$)/], ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/], ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/], ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ['ie', /MSIE\s(7\.0)/], ['android', /Android\s([0-9\.]+)/], ['safari', /Version\/([0-9\._]+).*Safari/]];

var browser = void 0;

if (isBrowser) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = BROWSER_RULES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 2);

      var name = _ref2[0];
      var regexp = _ref2[1];

      if (regexp.test(window.navigator.userAgent)) {
        browser = name;
        break;
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
 * Operating system matching rules.
 *
 * @type {Array}
 */

var OS_RULES = [['ios', /os ([\.\_\d]+) like mac os/i], // must be before the macos rule
['macos', /mac os x/i], ['android', /android/i], ['firefoxos', /mozilla\/[a-z\.\_\d]+ \((?:mobile)|(?:tablet)/i], ['windows', /windows\s*(?:nt)?\s*([\.\_\d]+)/i]];

var os = void 0;

if (isBrowser) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = OS_RULES[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref3 = _step2.value;

      var _ref4 = slicedToArray(_ref3, 2);

      var _name = _ref4[0];
      var _regexp = _ref4[1];

      if (_regexp.test(window.navigator.userAgent)) {
        os = _name;
        break;
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

/**
 * Feature matching rules.
 *
 * @type {Array}
 */

var FEATURE_RULES = [['inputeventslevel1', function (window) {
  var event = window.InputEvent ? new window.InputEvent('input') : {};
  var support = 'inputType' in event;
  return support;
}], ['inputeventslevel2', function (window) {
  var element = window.document.createElement('div');
  element.contentEditable = true;
  var support = 'onbeforeinput' in element;
  return support;
}]];

var features = [];

if (isBrowser) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = FEATURE_RULES[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ref5 = _step3.value;

      var _ref6 = slicedToArray(_ref5, 2);

      var _name2 = _ref6[0];
      var test = _ref6[1];

      if (test(window)) {
        features.push(_name2);
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
 * Array of regular expression matchers and their API version
 *
 * @type {Array}
 */

var ANDROID_API_VERSIONS = [[/^9([.]0|)/, 28], [/^8[.]1/, 27], [/^8([.]0|)/, 26], [/^7[.]1/, 25], [/^7([.]0|)/, 24], [/^6([.]0|)/, 23], [/^5[.]1/, 22], [/^5([.]0|)/, 21], [/^4[.]4/, 20]];

/**
 * get the Android API version from the userAgent
 *
 * @return {number} version
 */

function getAndroidApiVersion() {
  if (os !== 'android') return null;
  var userAgent = window.navigator.userAgent;

  var matchData = userAgent.match(/Android\s([0-9\.]+)/);
  if (matchData == null) return null;
  var versionString = matchData[1];

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = ANDROID_API_VERSIONS[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _ref7 = _step4.value;

      var _ref8 = slicedToArray(_ref7, 2);

      var regex = _ref8[0];
      var version = _ref8[1];

      if (versionString.match(regex)) return version;
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
 * Export.
 *
 * @type {Boolean}
 */

var IS_CHROME = browser === 'chrome';
var IS_OPERA = browser === 'opera';
var IS_FIREFOX = browser === 'firefox';
var IS_SAFARI = browser === 'safari';
var IS_IE = browser === 'ie';
var IS_EDGE = browser === 'edge';

var IS_ANDROID = os === 'android';
var IS_IOS = os === 'ios';
var IS_MAC = os === 'macos';
var IS_WINDOWS = os === 'windows';

var ANDROID_API_VERSION = getAndroidApiVersion();

var HAS_INPUT_EVENTS_LEVEL_1 = features.includes('inputeventslevel1');
var HAS_INPUT_EVENTS_LEVEL_2 = features.includes('inputeventslevel2') || IS_ANDROID && (ANDROID_API_VERSION === 28 || ANDROID_API_VERSION === null);

exports.IS_CHROME = IS_CHROME;
exports.IS_OPERA = IS_OPERA;
exports.IS_FIREFOX = IS_FIREFOX;
exports.IS_SAFARI = IS_SAFARI;
exports.IS_IE = IS_IE;
exports.IS_EDGE = IS_EDGE;
exports.IS_ANDROID = IS_ANDROID;
exports.IS_IOS = IS_IOS;
exports.IS_MAC = IS_MAC;
exports.IS_WINDOWS = IS_WINDOWS;
exports.ANDROID_API_VERSION = ANDROID_API_VERSION;
exports.HAS_INPUT_EVENTS_LEVEL_1 = HAS_INPUT_EVENTS_LEVEL_1;
exports.HAS_INPUT_EVENTS_LEVEL_2 = HAS_INPUT_EVENTS_LEVEL_2;

Object.defineProperty(exports, '__esModule', { value: true });

})));
