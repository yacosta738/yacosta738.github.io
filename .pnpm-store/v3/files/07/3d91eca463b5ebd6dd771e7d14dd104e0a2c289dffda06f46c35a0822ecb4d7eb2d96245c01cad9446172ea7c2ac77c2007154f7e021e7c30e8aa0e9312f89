"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SelectAll() {
  return {
    onKeyDown(event, editor, next) {
      const isModA = (0, _isHotkey.default)('mod+a', event);

      if (!isModA) {
        return next();
      }

      event.preventDefault();
      return editor.moveToRangeOfDocument();
    }

  };
}

var _default = SelectAll;
exports.default = _default;