"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsApp = void 0;

var _netlifyCmsCore = require("netlify-cms-core");

var _moment = _interopRequireDefault(require("moment"));

require("./extensions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Log version
if (typeof window !== 'undefined') {
  if (typeof "2.15.72" === 'string') {
    console.log(`netlify-cms-app ${"2.15.72"}`);
  }
}

const NetlifyCmsApp = _objectSpread(_objectSpread({}, _netlifyCmsCore.NetlifyCmsCore), {}, {
  moment: _moment.default
});

exports.NetlifyCmsApp = NetlifyCmsApp;
var _default = _netlifyCmsCore.NetlifyCmsCore;
exports.default = _default;