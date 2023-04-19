"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const StyledImage = ( /*#__PURE__*/0, _styledBase.default)(({
  src
}) => (0, _core.jsx)("img", {
  src: src || '',
  role: "presentation"
}), {
  target: "e1ksx8c40",
  label: "StyledImage"
})(process.env.NODE_ENV === "production" ? {
  name: "6b4u1g",
  styles: "display:block;max-width:100%;height:auto;"
} : {
  name: "6b4u1g",
  styles: "display:block;max-width:100%;height:auto;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9JbWFnZVByZXZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTW9GIiwiZmlsZSI6Ii4uLy4uL3NyYy9JbWFnZVByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgV2lkZ2V0UHJldmlld0NvbnRhaW5lciB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5jb25zdCBTdHlsZWRJbWFnZSA9IHN0eWxlZCgoeyBzcmMgfSkgPT4gPGltZyBzcmM9e3NyYyB8fCAnJ30gcm9sZT1cInByZXNlbnRhdGlvblwiIC8+KWBcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuYDtcblxuZnVuY3Rpb24gU3R5bGVkSW1hZ2VBc3NldCh7IGdldEFzc2V0LCB2YWx1ZSwgZmllbGQgfSkge1xuICByZXR1cm4gPFN0eWxlZEltYWdlIHNyYz17Z2V0QXNzZXQodmFsdWUsIGZpZWxkKX0gLz47XG59XG5cbmZ1bmN0aW9uIEltYWdlUHJldmlld0NvbnRlbnQocHJvcHMpIHtcbiAgY29uc3QgeyB2YWx1ZSwgZ2V0QXNzZXQsIGZpZWxkIH0gPSBwcm9wcztcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IExpc3QuaXNMaXN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAodmFsID0+IChcbiAgICAgIDxTdHlsZWRJbWFnZUFzc2V0IGtleT17dmFsfSB2YWx1ZT17dmFsfSBnZXRBc3NldD17Z2V0QXNzZXR9IGZpZWxkPXtmaWVsZH0gLz5cbiAgICApKTtcbiAgfVxuICByZXR1cm4gPFN0eWxlZEltYWdlQXNzZXQgey4uLnByb3BzfSAvPjtcbn1cblxuZnVuY3Rpb24gSW1hZ2VQcmV2aWV3KHByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPFdpZGdldFByZXZpZXdDb250YWluZXI+XG4gICAgICB7cHJvcHMudmFsdWUgPyA8SW1hZ2VQcmV2aWV3Q29udGVudCB7Li4ucHJvcHN9IC8+IDogbnVsbH1cbiAgICA8L1dpZGdldFByZXZpZXdDb250YWluZXI+XG4gICk7XG59XG5cbkltYWdlUHJldmlldy5wcm9wVHlwZXMgPSB7XG4gIGdldEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB2YWx1ZTogUHJvcFR5cGVzLm5vZGUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVByZXZpZXc7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

function StyledImageAsset({
  getAsset,
  value,
  field
}) {
  return (0, _core.jsx)(StyledImage, {
    src: getAsset(value, field)
  });
}

function ImagePreviewContent(props) {
  const {
    value,
    getAsset,
    field
  } = props;

  if (Array.isArray(value) || _immutable.List.isList(value)) {
    return value.map(val => (0, _core.jsx)(StyledImageAsset, {
      key: val,
      value: val,
      getAsset: getAsset,
      field: field
    }));
  }

  return (0, _core.jsx)(StyledImageAsset, props);
}

function ImagePreview(props) {
  return (0, _core.jsx)(_netlifyCmsUiDefault.WidgetPreviewContainer, null, props.value ? (0, _core.jsx)(ImagePreviewContent, props) : null);
}

ImagePreview.propTypes = {
  getAsset: _propTypes.default.func.isRequired,
  value: _propTypes.default.node
};
var _default = ImagePreview;
exports.default = _default;