"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.selectLocale = selectLocale;
exports.selectUseWorkflow = selectUseWorkflow;

var _immer = require("immer");

var _config = require("../actions/config");

var _publishModes = require("../constants/publishModes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultState = {
  isFetching: true
};
const config = (0, _immer.produce)((state, action) => {
  switch (action.type) {
    case _config.CONFIG_REQUEST:
      state.isFetching = true;
      break;

    case _config.CONFIG_SUCCESS:
      return _objectSpread(_objectSpread({}, action.payload), {}, {
        isFetching: false,
        error: undefined
      });

    case _config.CONFIG_FAILURE:
      state.isFetching = false;
      state.error = action.payload.toString();
  }
}, defaultState);

function selectLocale(state) {
  return state.locale || 'en';
}

function selectUseWorkflow(state) {
  return state.publish_mode === _publishModes.EDITORIAL_WORKFLOW;
}

var _default = config;
exports.default = _default;