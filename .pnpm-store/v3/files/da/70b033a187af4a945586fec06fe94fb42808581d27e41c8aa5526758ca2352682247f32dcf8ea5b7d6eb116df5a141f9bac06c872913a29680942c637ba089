(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SlateSoftBreak = {})));
}(this, (function (exports) { 'use strict';

function SoftBreak() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    onKeyDown: function onKeyDown(event, change, next) {
      if (event.key !== 'Enter') return next();
      if (options.shift && event.shiftKey === false) return next();
      return change.insertText('\n');
    }
  };
}

exports.default = SoftBreak;

Object.defineProperty(exports, '__esModule', { value: true });

})));
