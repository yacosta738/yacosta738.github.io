"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsWidgetNumber = void 0;

var _NumberControl = _interopRequireDefault(require("./NumberControl"));

var _NumberPreview = _interopRequireDefault(require("./NumberPreview"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Widget(opts = {}) {
  return _objectSpread({
    name: 'number',
    controlComponent: _NumberControl.default,
    previewComponent: _NumberPreview.default,
    schema: _schema.default
  }, opts);
}

const NetlifyCmsWidgetNumber = {
  Widget,
  controlComponent: _NumberControl.default,
  previewComponent: _NumberPreview.default
};
exports.NetlifyCmsWidgetNumber = NetlifyCmsWidgetNumber;
var _default = NetlifyCmsWidgetNumber;
exports.default = _default;