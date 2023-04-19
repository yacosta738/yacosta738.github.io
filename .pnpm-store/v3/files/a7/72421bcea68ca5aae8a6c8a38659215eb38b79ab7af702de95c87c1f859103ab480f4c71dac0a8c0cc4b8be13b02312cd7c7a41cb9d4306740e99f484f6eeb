"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _dompurify = _interopRequireDefault(require("dompurify"));

var _serializers = require("./serializers");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MarkdownPreview extends _react.default.Component {
  render() {
    const {
      value,
      getAsset,
      resolveWidget,
      field,
      getRemarkPlugins
    } = this.props;

    if (value === null) {
      return null;
    }

    const html = (0, _serializers.markdownToHtml)(value, {
      getAsset,
      resolveWidget
    }, getRemarkPlugins === null || getRemarkPlugins === void 0 ? void 0 : getRemarkPlugins());
    const toRender = field !== null && field !== void 0 && field.get('sanitize_preview', false) ? _dompurify.default.sanitize(html) : html;
    return (0, _core.jsx)(_netlifyCmsUiDefault.WidgetPreviewContainer, {
      dangerouslySetInnerHTML: {
        __html: toRender
      }
    });
  }

}

_defineProperty(MarkdownPreview, "propTypes", {
  getAsset: _propTypes.default.func.isRequired,
  resolveWidget: _propTypes.default.func.isRequired,
  value: _propTypes.default.string
});

var _default = MarkdownPreview;
exports.default = _default;