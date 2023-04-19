"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsWidgetString = void 0;

var _StringControl = _interopRequireDefault(require("./StringControl"));

var _StringPreview = _interopRequireDefault(require("./StringPreview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Widget(opts = {}) {
  return _objectSpread({
    name: 'string',
    controlComponent: _StringControl.default,
    previewComponent: _StringPreview.default
  }, opts);
}

const NetlifyCmsWidgetString = {
  Widget,
  controlComponent: _StringControl.default,
  previewComponent: _StringPreview.default
};
exports.NetlifyCmsWidgetString = NetlifyCmsWidgetString;
var _default = NetlifyCmsWidgetString;
exports.default = _default;