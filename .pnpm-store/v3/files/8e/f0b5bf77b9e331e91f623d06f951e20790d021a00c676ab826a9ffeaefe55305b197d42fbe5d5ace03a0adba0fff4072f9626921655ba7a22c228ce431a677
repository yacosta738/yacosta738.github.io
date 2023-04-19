"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUploadButton = FileUploadButton;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FileUploadButton(_ref) {
  let {
    label,
    imagesOnly,
    onChange,
    disabled,
    className
  } = _ref;
  return (0, _core.jsx)("label", {
    className: `nc-fileUploadButton ${className || ''}`
  }, (0, _core.jsx)("span", null, label), (0, _core.jsx)("input", {
    type: "file",
    accept: imagesOnly ? 'image/*' : '*/*',
    onChange: onChange,
    disabled: disabled
  }));
}

FileUploadButton.propTypes = {
  className: _propTypes.default.string,
  label: _propTypes.default.string.isRequired,
  imagesOnly: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool
};