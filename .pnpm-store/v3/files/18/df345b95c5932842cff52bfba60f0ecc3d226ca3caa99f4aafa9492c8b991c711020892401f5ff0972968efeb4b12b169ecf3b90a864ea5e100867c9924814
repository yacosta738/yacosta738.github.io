"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = I18n;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _nodePolyglot = _interopRequireDefault(require("node-polyglot"));

var _i18nContext = _interopRequireDefault(require("./i18n-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function I18n(_ref) {
  var locale = _ref.locale,
      messages = _ref.messages,
      allowMissing = _ref.allowMissing,
      onMissingKey = _ref.onMissingKey,
      interpolation = _ref.interpolation,
      pluralRules = _ref.pluralRules,
      children = _ref.children;

  var translate = _react["default"].useMemo(function () {
    var polyglot = new _nodePolyglot["default"]({
      locale: locale,
      phrases: messages,
      allowMissing: allowMissing,
      onMissingKey: onMissingKey,
      interpolation: interpolation,
      pluralRules: pluralRules
    });
    var boundTranslate = polyglot.t.bind(polyglot);
    boundTranslate._polyglot = polyglot;
    return boundTranslate;
  }, [locale, messages, allowMissing, onMissingKey, interpolation, pluralRules]);

  return _react["default"].createElement(_i18nContext["default"].Provider, {
    value: translate
  }, _react["default"].Children.only(children));
}

I18n.propTypes = {
  locale: _propTypes["default"].string.isRequired,
  messages: _propTypes["default"].object.isRequired,
  allowMissing: _propTypes["default"].bool,
  onMissingKey: _propTypes["default"].func,
  interpolation: _propTypes["default"].shape({
    suffix: _propTypes["default"].string,
    prefix: _propTypes["default"].string
  }),
  pluralRules: _propTypes["default"].shape({
    pluralTypes: _propTypes["default"].object,
    pluralTypeToLanguages: _propTypes["default"].object
  }),
  children: _propTypes["default"].element.isRequired
};
I18n.defaultProps = {
  allowMissing: false,
  onMissingKey: undefined,
  interpolation: undefined,
  pluralRules: undefined
};