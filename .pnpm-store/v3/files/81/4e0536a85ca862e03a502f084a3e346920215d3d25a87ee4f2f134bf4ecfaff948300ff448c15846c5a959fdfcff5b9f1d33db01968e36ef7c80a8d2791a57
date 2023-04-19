'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
//# sourceMappingURL=slate-soft-break.js.map
