"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsWidgetMarkdown = void 0;

var _MarkdownControl = _interopRequireDefault(require("./MarkdownControl"));

var _MarkdownPreview = _interopRequireDefault(require("./MarkdownPreview"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Widget() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({
    name: 'markdown',
    controlComponent: _MarkdownControl.default,
    previewComponent: _MarkdownPreview.default,
    schema: _schema.default
  }, opts);
}

const NetlifyCmsWidgetMarkdown = {
  Widget,
  controlComponent: _MarkdownControl.default,
  previewComponent: _MarkdownPreview.default
};
exports.NetlifyCmsWidgetMarkdown = NetlifyCmsWidgetMarkdown;
var _default = NetlifyCmsWidgetMarkdown;
exports.default = _default;