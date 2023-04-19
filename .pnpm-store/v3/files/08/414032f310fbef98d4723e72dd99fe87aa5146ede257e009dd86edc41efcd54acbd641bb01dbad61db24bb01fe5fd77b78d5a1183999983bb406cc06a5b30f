"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsWidgetText = void 0;

var _TextControl = _interopRequireDefault(require("./TextControl"));

var _TextPreview = _interopRequireDefault(require("./TextPreview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Widget(opts = {}) {
  return _objectSpread({
    name: 'text',
    controlComponent: _TextControl.default,
    previewComponent: _TextPreview.default
  }, opts);
}

const NetlifyCmsWidgetText = {
  Widget,
  controlComponent: _TextControl.default,
  previewComponent: _TextPreview.default
};
exports.NetlifyCmsWidgetText = NetlifyCmsWidgetText;
var _default = NetlifyCmsWidgetText;
exports.default = _default;