"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PreviewPane = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactFrameComponent = _interopRequireWildcard(require("react-frame-component"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _reactRedux = require("react-redux");

var _registry = require("../../../lib/registry");

var _UI = require("../../UI");

var _collections = require("../../../reducers/collections");

var _media = require("../../../actions/media");

var _medias = require("../../../reducers/medias");

var _fieldInference = require("../../../constants/fieldInference");

var _EditorPreviewContent = _interopRequireDefault(require("./EditorPreviewContent.js"));

var _PreviewHOC = _interopRequireDefault(require("./PreviewHOC"));

var _EditorPreview = _interopRequireDefault(require("./EditorPreview"));

var _core = require("@emotion/core");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PreviewPaneFrame = ( /*#__PURE__*/0, _styledBase.default)(_reactFrameComponent.default, {
  target: "e6emspu0",
  label: "PreviewPaneFrame"
})("width:100%;height:100%;border:none;background:#fff;border-radius:", _netlifyCmsUiDefault.lengths.borderRadius, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QnNDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgRnJhbWUsIHsgRnJhbWVDb250ZXh0Q29uc3VtZXIgfSBmcm9tICdyZWFjdC1mcmFtZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgbGVuZ3RocyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHtcbiAgcmVzb2x2ZVdpZGdldCxcbiAgZ2V0UHJldmlld1RlbXBsYXRlLFxuICBnZXRQcmV2aWV3U3R5bGVzLFxuICBnZXRSZW1hcmtQbHVnaW5zLFxufSBmcm9tICcuLi8uLi8uLi9saWIvcmVnaXN0cnknO1xuaW1wb3J0IHsgRXJyb3JCb3VuZGFyeSB9IGZyb20gJy4uLy4uL1VJJztcbmltcG9ydCB7IHNlbGVjdFRlbXBsYXRlTmFtZSwgc2VsZWN0SW5mZXJlZEZpZWxkLCBzZWxlY3RGaWVsZCB9IGZyb20gJy4uLy4uLy4uL3JlZHVjZXJzL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IGJvdW5kR2V0QXNzZXQgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL21lZGlhJztcbmltcG9ydCB7IHNlbGVjdElzTG9hZGluZ0Fzc2V0IH0gZnJvbSAnLi4vLi4vLi4vcmVkdWNlcnMvbWVkaWFzJztcbmltcG9ydCB7IElORkVSQUJMRV9GSUVMRFMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvZmllbGRJbmZlcmVuY2UnO1xuaW1wb3J0IEVkaXRvclByZXZpZXdDb250ZW50IGZyb20gJy4vRWRpdG9yUHJldmlld0NvbnRlbnQuanMnO1xuaW1wb3J0IFByZXZpZXdIT0MgZnJvbSAnLi9QcmV2aWV3SE9DJztcbmltcG9ydCBFZGl0b3JQcmV2aWV3IGZyb20gJy4vRWRpdG9yUHJldmlldyc7XG5cbmNvbnN0IFByZXZpZXdQYW5lRnJhbWUgPSBzdHlsZWQoRnJhbWUpYFxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuYDtcblxuZXhwb3J0IGNsYXNzIFByZXZpZXdQYW5lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgZ2V0V2lkZ2V0ID0gKGZpZWxkLCB2YWx1ZSwgbWV0YWRhdGEsIHByb3BzLCBpZHggPSBudWxsKSA9PiB7XG4gICAgY29uc3QgeyBnZXRBc3NldCwgZW50cnkgfSA9IHByb3BzO1xuICAgIGNvbnN0IHdpZGdldCA9IHJlc29sdmVXaWRnZXQoZmllbGQuZ2V0KCd3aWRnZXQnKSk7XG4gICAgY29uc3Qga2V5ID0gaWR4ID8gZmllbGQuZ2V0KCduYW1lJykgKyAnXycgKyBpZHggOiBmaWVsZC5nZXQoJ25hbWUnKTtcbiAgICBjb25zdCB2YWx1ZUlzSW5NYXAgPSB2YWx1ZSAmJiAhd2lkZ2V0LmFsbG93TWFwVmFsdWUgJiYgTWFwLmlzTWFwKHZhbHVlKTtcblxuICAgIC8qKlxuICAgICAqIFVzZSBhbiBIT0MgdG8gcHJvdmlkZSBjb25kaXRpb25hbCB1cGRhdGVzIGZvciBhbGwgcHJldmlld3MuXG4gICAgICovXG4gICAgcmV0dXJuICF3aWRnZXQucHJldmlldyA/IG51bGwgOiAoXG4gICAgICA8UHJldmlld0hPQ1xuICAgICAgICBwcmV2aWV3Q29tcG9uZW50PXt3aWRnZXQucHJldmlld31cbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAgIGZpZWxkPXtmaWVsZH1cbiAgICAgICAgZ2V0QXNzZXQ9e2dldEFzc2V0fVxuICAgICAgICB2YWx1ZT17dmFsdWVJc0luTWFwID8gdmFsdWUuZ2V0KGZpZWxkLmdldCgnbmFtZScpKSA6IHZhbHVlfVxuICAgICAgICBlbnRyeT17ZW50cnl9XG4gICAgICAgIGZpZWxkc01ldGFEYXRhPXttZXRhZGF0YX1cbiAgICAgICAgcmVzb2x2ZVdpZGdldD17cmVzb2x2ZVdpZGdldH1cbiAgICAgICAgZ2V0UmVtYXJrUGx1Z2lucz17Z2V0UmVtYXJrUGx1Z2luc31cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBpbmZlcmVkRmllbGRzID0ge307XG5cbiAgaW5mZXJGaWVsZHMoKSB7XG4gICAgY29uc3QgdGl0bGVGaWVsZCA9IHNlbGVjdEluZmVyZWRGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sICd0aXRsZScpO1xuICAgIGNvbnN0IHNob3J0VGl0bGVGaWVsZCA9IHNlbGVjdEluZmVyZWRGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sICdzaG9ydFRpdGxlJyk7XG4gICAgY29uc3QgYXV0aG9yRmllbGQgPSBzZWxlY3RJbmZlcmVkRmllbGQodGhpcy5wcm9wcy5jb2xsZWN0aW9uLCAnYXV0aG9yJyk7XG5cbiAgICB0aGlzLmluZmVyZWRGaWVsZHMgPSB7fTtcbiAgICBpZiAodGl0bGVGaWVsZCkgdGhpcy5pbmZlcmVkRmllbGRzW3RpdGxlRmllbGRdID0gSU5GRVJBQkxFX0ZJRUxEUy50aXRsZTtcbiAgICBpZiAoc2hvcnRUaXRsZUZpZWxkKSB0aGlzLmluZmVyZWRGaWVsZHNbc2hvcnRUaXRsZUZpZWxkXSA9IElORkVSQUJMRV9GSUVMRFMuc2hvcnRUaXRsZTtcbiAgICBpZiAoYXV0aG9yRmllbGQpIHRoaXMuaW5mZXJlZEZpZWxkc1thdXRob3JGaWVsZF0gPSBJTkZFUkFCTEVfRklFTERTLmF1dGhvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWRnZXQgY29tcG9uZW50IGZvciBhIG5hbWVkIGZpZWxkLCBhbmQgbWFrZXMgcmVjdXJzaXZlIGNhbGxzXG4gICAqIHRvIHJldHJpZXZlIGNvbXBvbmVudHMgZm9yIG5lc3RlZCBhbmQgZGVlcGx5IG5lc3RlZCBmaWVsZHMsIHdoaWNoIG9jY3VyIGluXG4gICAqIG9iamVjdCBhbmQgbGlzdCB0eXBlIGZpZWxkcy4gVXNlZCBpbnRlcm5hbGx5IHRvIHJldHJpZXZlIHdpZGdldHMsIGFuZCBhbHNvXG4gICAqIGV4cG9zZWQgZm9yIHVzZSBpbiBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMuXG4gICAqL1xuICB3aWRnZXRGb3IgPSAoXG4gICAgbmFtZSxcbiAgICBmaWVsZHMgPSB0aGlzLnByb3BzLmZpZWxkcyxcbiAgICB2YWx1ZXMgPSB0aGlzLnByb3BzLmVudHJ5LmdldCgnZGF0YScpLFxuICAgIGZpZWxkc01ldGFEYXRhID0gdGhpcy5wcm9wcy5maWVsZHNNZXRhRGF0YSxcbiAgKSA9PiB7XG4gICAgLy8gV2UgcmV0cmlldmUgdGhlIGZpZWxkIGJ5IG5hbWUgc28gdGhhdCB0aGlzIGZ1bmN0aW9uIGNhbiBhbHNvIGJlIHVzZWQgaW5cbiAgICAvLyBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMsIHdoZXJlIHRoZSBmaWVsZCBvYmplY3QgY2FuJ3QgYmUgcGFzc2VkIGluLlxuICAgIGxldCBmaWVsZCA9IGZpZWxkcyAmJiBmaWVsZHMuZmluZChmID0+IGYuZ2V0KCduYW1lJykgPT09IG5hbWUpO1xuICAgIGxldCB2YWx1ZSA9IE1hcC5pc01hcCh2YWx1ZXMpICYmIHZhbHVlcy5nZXQoZmllbGQuZ2V0KCduYW1lJykpO1xuICAgIGlmIChmaWVsZC5nZXQoJ21ldGEnKSkge1xuICAgICAgdmFsdWUgPSB0aGlzLnByb3BzLmVudHJ5LmdldEluKFsnbWV0YScsIGZpZWxkLmdldCgnbmFtZScpXSk7XG4gICAgfVxuICAgIGNvbnN0IG5lc3RlZEZpZWxkcyA9IGZpZWxkLmdldCgnZmllbGRzJyk7XG4gICAgY29uc3Qgc2luZ2xlRmllbGQgPSBmaWVsZC5nZXQoJ2ZpZWxkJyk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBmaWVsZHNNZXRhRGF0YSAmJiBmaWVsZHNNZXRhRGF0YS5nZXQoZmllbGQuZ2V0KCduYW1lJyksIE1hcCgpKTtcblxuICAgIGlmIChuZXN0ZWRGaWVsZHMpIHtcbiAgICAgIGZpZWxkID0gZmllbGQuc2V0KCdmaWVsZHMnLCB0aGlzLmdldE5lc3RlZFdpZGdldHMobmVzdGVkRmllbGRzLCB2YWx1ZSwgbWV0YWRhdGEpKTtcbiAgICB9XG5cbiAgICBpZiAoc2luZ2xlRmllbGQpIHtcbiAgICAgIGZpZWxkID0gZmllbGQuc2V0KCdmaWVsZCcsIHRoaXMuZ2V0U2luZ2xlTmVzdGVkKHNpbmdsZUZpZWxkLCB2YWx1ZSwgbWV0YWRhdGEpKTtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbGxlZFdpZGdldHMgPSBbJ3N0cmluZycsICd0ZXh0JywgJ251bWJlciddO1xuICAgIGNvbnN0IGluZmVyZWRGaWVsZCA9IE9iamVjdC5lbnRyaWVzKHRoaXMuaW5mZXJlZEZpZWxkcylcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkVG9NYXRjaCA9IHNlbGVjdEZpZWxkKHRoaXMucHJvcHMuY29sbGVjdGlvbiwga2V5KTtcbiAgICAgICAgcmV0dXJuIGZpZWxkVG9NYXRjaCA9PT0gZmllbGQ7XG4gICAgICB9KVxuICAgICAgLm1hcCgoWywgdmFsdWVdKSA9PiB2YWx1ZSlbMF07XG5cbiAgICBpZiAoaW5mZXJlZEZpZWxkKSB7XG4gICAgICB2YWx1ZSA9IGluZmVyZWRGaWVsZC5kZWZhdWx0UHJldmlldyh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHZhbHVlICYmXG4gICAgICBsYWJlbGxlZFdpZGdldHMuaW5kZXhPZihmaWVsZC5nZXQoJ3dpZGdldCcpKSAhPT0gLTEgJiZcbiAgICAgIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgNTBcbiAgICApIHtcbiAgICAgIHZhbHVlID0gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdHJvbmc+e2ZpZWxkLmdldCgnbGFiZWwnLCBmaWVsZC5nZXQoJ25hbWUnKSl9Ojwvc3Ryb25nPiB7dmFsdWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmdldFdpZGdldChmaWVsZCwgdmFsdWUsIG1ldGFkYXRhLCB0aGlzLnByb3BzKSA6IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB3aWRnZXRzIGZvciBuZXN0ZWQgZmllbGRzIChjaGlsZHJlbiBvZiBvYmplY3QvbGlzdCBmaWVsZHMpXG4gICAqL1xuICBnZXROZXN0ZWRXaWRnZXRzID0gKGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkgPT4ge1xuICAgIC8vIEZpZWxkcyBuZXN0ZWQgd2l0aGluIGEgbGlzdCBmaWVsZCB3aWxsIGJlIHBhaXJlZCB3aXRoIGEgTGlzdCBvZiB2YWx1ZSBNYXBzLlxuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZXMpKSB7XG4gICAgICByZXR1cm4gdmFsdWVzLm1hcCh2YWx1ZSA9PiB0aGlzLndpZGdldHNGb3JOZXN0ZWRGaWVsZHMoZmllbGRzLCB2YWx1ZSwgZmllbGRzTWV0YURhdGEpKTtcbiAgICB9XG4gICAgLy8gRmllbGRzIG5lc3RlZCB3aXRoaW4gYW4gb2JqZWN0IGZpZWxkIHdpbGwgYmUgcGFpcmVkIHdpdGggYSBzaW5nbGUgTWFwIG9mIHZhbHVlcy5cbiAgICByZXR1cm4gdGhpcy53aWRnZXRzRm9yTmVzdGVkRmllbGRzKGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSk7XG4gIH07XG5cbiAgZ2V0U2luZ2xlTmVzdGVkID0gKGZpZWxkLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSA9PiB7XG4gICAgaWYgKExpc3QuaXNMaXN0KHZhbHVlcykpIHtcbiAgICAgIHJldHVybiB2YWx1ZXMubWFwKCh2YWx1ZSwgaWR4KSA9PlxuICAgICAgICB0aGlzLmdldFdpZGdldChmaWVsZCwgdmFsdWUsIGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMsIGlkeCksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlcywgZmllbGRzTWV0YURhdGEuZ2V0KGZpZWxkLmdldCgnbmFtZScpKSwgdGhpcy5wcm9wcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVzZSB3aWRnZXRGb3IgYXMgYSBtYXBwaW5nIGZ1bmN0aW9uIGZvciByZWN1cnNpdmUgd2lkZ2V0IHJldHJpZXZhbFxuICAgKi9cbiAgd2lkZ2V0c0Zvck5lc3RlZEZpZWxkcyA9IChmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpID0+IHtcbiAgICByZXR1cm4gZmllbGRzLm1hcChmaWVsZCA9PiB0aGlzLndpZGdldEZvcihmaWVsZC5nZXQoJ25hbWUnKSwgZmllbGRzLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gZXhpc3RzIGVudGlyZWx5IHRvIGV4cG9zZSBuZXN0ZWQgd2lkZ2V0cyBmb3Igb2JqZWN0IGFuZCBsaXN0XG4gICAqIGZpZWxkcyB0byBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMuXG4gICAqXG4gICAqIFRPRE86IHNlZSBpZiB3aWRnZXRGb3IgY2FuIG5vdyBwcm92aWRlIHRoaXMgZnVuY3Rpb25hbGl0eSBmb3IgcHJldmlldyB0ZW1wbGF0ZXNcbiAgICovXG4gIHdpZGdldHNGb3IgPSBuYW1lID0+IHtcbiAgICBjb25zdCB7IGZpZWxkcywgZW50cnksIGZpZWxkc01ldGFEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLmZpbmQoZiA9PiBmLmdldCgnbmFtZScpID09PSBuYW1lKTtcbiAgICBjb25zdCBuZXN0ZWRGaWVsZHMgPSBmaWVsZCAmJiBmaWVsZC5nZXQoJ2ZpZWxkcycpO1xuICAgIGNvbnN0IHZhbHVlID0gZW50cnkuZ2V0SW4oWydkYXRhJywgZmllbGQuZ2V0KCduYW1lJyldKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSwgTWFwKCkpO1xuXG4gICAgaWYgKExpc3QuaXNMaXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICBjb25zdCB3aWRnZXRzID1cbiAgICAgICAgICBuZXN0ZWRGaWVsZHMgJiZcbiAgICAgICAgICBNYXAoXG4gICAgICAgICAgICBuZXN0ZWRGaWVsZHMubWFwKChmLCBpKSA9PiBbXG4gICAgICAgICAgICAgIGYuZ2V0KCduYW1lJyksXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpfT57dGhpcy5nZXRXaWRnZXQoZiwgdmFsLCBtZXRhZGF0YS5nZXQoZi5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpfTwvZGl2PixcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBNYXAoeyBkYXRhOiB2YWwsIHdpZGdldHMgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTWFwKHtcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgd2lkZ2V0czpcbiAgICAgICAgbmVzdGVkRmllbGRzICYmXG4gICAgICAgIE1hcChcbiAgICAgICAgICBuZXN0ZWRGaWVsZHMubWFwKGYgPT4gW1xuICAgICAgICAgICAgZi5nZXQoJ25hbWUnKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0V2lkZ2V0KGYsIHZhbHVlLCBtZXRhZGF0YS5nZXQoZi5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpLFxuICAgICAgICAgIF0pLFxuICAgICAgICApLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGVudHJ5LCBjb2xsZWN0aW9uLCBjb25maWcgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS5nZXQoJ2RhdGEnKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlld0NvbXBvbmVudCA9XG4gICAgICBnZXRQcmV2aWV3VGVtcGxhdGUoc2VsZWN0VGVtcGxhdGVOYW1lKGNvbGxlY3Rpb24sIGVudHJ5LmdldCgnc2x1ZycpKSkgfHwgRWRpdG9yUHJldmlldztcblxuICAgIHRoaXMuaW5mZXJGaWVsZHMoKTtcblxuICAgIGNvbnN0IHByZXZpZXdQcm9wcyA9IHtcbiAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICB3aWRnZXRGb3I6IHRoaXMud2lkZ2V0Rm9yLFxuICAgICAgd2lkZ2V0c0ZvcjogdGhpcy53aWRnZXRzRm9yLFxuICAgIH07XG5cbiAgICBjb25zdCBzdHlsZUVscyA9IGdldFByZXZpZXdTdHlsZXMoKS5tYXAoKHN0eWxlLCBpKSA9PiB7XG4gICAgICBpZiAoc3R5bGUucmF3KSB7XG4gICAgICAgIHJldHVybiA8c3R5bGUga2V5PXtpfT57c3R5bGUudmFsdWV9PC9zdHlsZT47XG4gICAgICB9XG4gICAgICByZXR1cm4gPGxpbmsga2V5PXtpfSBocmVmPXtzdHlsZS52YWx1ZX0gdHlwZT1cInRleHQvY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+O1xuICAgIH0pO1xuXG4gICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICA8UHJldmlld1BhbmVGcmFtZSBpZD1cInByZXZpZXctcGFuZVwiIGhlYWQ9e3N0eWxlRWxzfSAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFsQ29udGVudCA9IGBcbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG4gIDxoZWFkPjxiYXNlIHRhcmdldD1cIl9ibGFua1wiLz48L2hlYWQ+XG4gIDxib2R5PjxkaXY+PC9kaXY+PC9ib2R5PlxuPC9odG1sPlxuYDtcblxuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JCb3VuZGFyeSBjb25maWc9e2NvbmZpZ30+XG4gICAgICAgIDxQcmV2aWV3UGFuZUZyYW1lIGlkPVwicHJldmlldy1wYW5lXCIgaGVhZD17c3R5bGVFbHN9IGluaXRpYWxDb250ZW50PXtpbml0aWFsQ29udGVudH0+XG4gICAgICAgICAgPEZyYW1lQ29udGV4dENvbnN1bWVyPlxuICAgICAgICAgICAgeyh7IGRvY3VtZW50LCB3aW5kb3cgfSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxFZGl0b3JQcmV2aWV3Q29udGVudFxuICAgICAgICAgICAgICAgICAgey4uLnsgcHJldmlld0NvbXBvbmVudCwgcHJldmlld1Byb3BzOiB7IC4uLnByZXZpZXdQcm9wcywgZG9jdW1lbnQsIHdpbmRvdyB9IH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPC9GcmFtZUNvbnRleHRDb25zdW1lcj5cbiAgICAgICAgPC9QcmV2aWV3UGFuZUZyYW1lPlxuICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICk7XG4gIH1cbn1cblxuUHJldmlld1BhbmUucHJvcFR5cGVzID0ge1xuICBjb2xsZWN0aW9uOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGZpZWxkczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgZW50cnk6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZmllbGRzTWV0YURhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZ2V0QXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgY29uc3QgaXNMb2FkaW5nQXNzZXQgPSBzZWxlY3RJc0xvYWRpbmdBc3NldChzdGF0ZS5tZWRpYXMpO1xuICByZXR1cm4geyBpc0xvYWRpbmdBc3NldCwgY29uZmlnOiBzdGF0ZS5jb25maWcgfTtcbn1cblxuZnVuY3Rpb24gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoKSB7XG4gIHJldHVybiB7XG4gICAgYm91bmRHZXRBc3NldDogKGNvbGxlY3Rpb24sIGVudHJ5KSA9PiBib3VuZEdldEFzc2V0KGRpc3BhdGNoLCBjb2xsZWN0aW9uLCBlbnRyeSksXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZVByb3BzLFxuICAgIC4uLmRpc3BhdGNoUHJvcHMsXG4gICAgLi4ub3duUHJvcHMsXG4gICAgZ2V0QXNzZXQ6IGRpc3BhdGNoUHJvcHMuYm91bmRHZXRBc3NldChvd25Qcm9wcy5jb2xsZWN0aW9uLCBvd25Qcm9wcy5lbnRyeSksXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMpKFByZXZpZXdQYW5lKTtcbiJdfQ== */"));

class PreviewPane extends _react.default.Component {
  constructor() {
    var _this;

    super(...arguments);
    _this = this;

    _defineProperty(this, "getWidget", function (field, value, metadata, props) {
      let idx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      const {
        getAsset,
        entry
      } = props;
      const widget = (0, _registry.resolveWidget)(field.get('widget'));
      const key = idx ? field.get('name') + '_' + idx : field.get('name');

      const valueIsInMap = value && !widget.allowMapValue && _immutable.Map.isMap(value);
      /**
       * Use an HOC to provide conditional updates for all previews.
       */


      return !widget.preview ? null : (0, _core.jsx)(_PreviewHOC.default, {
        previewComponent: widget.preview,
        key: key,
        field: field,
        getAsset: getAsset,
        value: valueIsInMap ? value.get(field.get('name')) : value,
        entry: entry,
        fieldsMetaData: metadata,
        resolveWidget: _registry.resolveWidget,
        getRemarkPlugins: _registry.getRemarkPlugins
      });
    });

    _defineProperty(this, "inferedFields", {});

    _defineProperty(this, "widgetFor", function (name) {
      let fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props.fields;
      let values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.props.entry.get('data');
      let fieldsMetaData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this.props.fieldsMetaData;
      // We retrieve the field by name so that this function can also be used in
      // custom preview templates, where the field object can't be passed in.
      let field = fields && fields.find(f => f.get('name') === name);
      let value = _immutable.Map.isMap(values) && values.get(field.get('name'));

      if (field.get('meta')) {
        value = _this.props.entry.getIn(['meta', field.get('name')]);
      }

      const nestedFields = field.get('fields');
      const singleField = field.get('field');
      const metadata = fieldsMetaData && fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());

      if (nestedFields) {
        field = field.set('fields', _this.getNestedWidgets(nestedFields, value, metadata));
      }

      if (singleField) {
        field = field.set('field', _this.getSingleNested(singleField, value, metadata));
      }

      const labelledWidgets = ['string', 'text', 'number'];
      const inferedField = Object.entries(_this.inferedFields).filter(_ref => {
        let [key] = _ref;
        const fieldToMatch = (0, _collections.selectField)(_this.props.collection, key);
        return fieldToMatch === field;
      }).map(_ref2 => {
        let [, value] = _ref2;
        return value;
      })[0];

      if (inferedField) {
        value = inferedField.defaultPreview(value);
      } else if (value && labelledWidgets.indexOf(field.get('widget')) !== -1 && value.toString().length < 50) {
        value = (0, _core.jsx)("div", null, (0, _core.jsx)("strong", null, field.get('label', field.get('name')), ":"), " ", value);
      }

      return value ? _this.getWidget(field, value, metadata, _this.props) : null;
    });

    _defineProperty(this, "getNestedWidgets", (fields, values, fieldsMetaData) => {
      // Fields nested within a list field will be paired with a List of value Maps.
      if (_immutable.List.isList(values)) {
        return values.map(value => this.widgetsForNestedFields(fields, value, fieldsMetaData));
      } // Fields nested within an object field will be paired with a single Map of values.


      return this.widgetsForNestedFields(fields, values, fieldsMetaData);
    });

    _defineProperty(this, "getSingleNested", (field, values, fieldsMetaData) => {
      if (_immutable.List.isList(values)) {
        return values.map((value, idx) => this.getWidget(field, value, fieldsMetaData.get(field.get('name')), this.props, idx));
      }

      return this.getWidget(field, values, fieldsMetaData.get(field.get('name')), this.props);
    });

    _defineProperty(this, "widgetsForNestedFields", (fields, values, fieldsMetaData) => {
      return fields.map(field => this.widgetFor(field.get('name'), fields, values, fieldsMetaData));
    });

    _defineProperty(this, "widgetsFor", name => {
      const {
        fields,
        entry,
        fieldsMetaData
      } = this.props;
      const field = fields.find(f => f.get('name') === name);
      const nestedFields = field && field.get('fields');
      const value = entry.getIn(['data', field.get('name')]);
      const metadata = fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());

      if (_immutable.List.isList(value)) {
        return value.map(val => {
          const widgets = nestedFields && (0, _immutable.Map)(nestedFields.map((f, i) => [f.get('name'), (0, _core.jsx)("div", {
            key: i
          }, this.getWidget(f, val, metadata.get(f.get('name')), this.props))]));
          return (0, _immutable.Map)({
            data: val,
            widgets
          });
        });
      }

      return (0, _immutable.Map)({
        data: value,
        widgets: nestedFields && (0, _immutable.Map)(nestedFields.map(f => [f.get('name'), this.getWidget(f, value, metadata.get(f.get('name')), this.props)]))
      });
    });
  }

  inferFields() {
    const titleField = (0, _collections.selectInferedField)(this.props.collection, 'title');
    const shortTitleField = (0, _collections.selectInferedField)(this.props.collection, 'shortTitle');
    const authorField = (0, _collections.selectInferedField)(this.props.collection, 'author');
    this.inferedFields = {};
    if (titleField) this.inferedFields[titleField] = _fieldInference.INFERABLE_FIELDS.title;
    if (shortTitleField) this.inferedFields[shortTitleField] = _fieldInference.INFERABLE_FIELDS.shortTitle;
    if (authorField) this.inferedFields[authorField] = _fieldInference.INFERABLE_FIELDS.author;
  }
  /**
   * Returns the widget component for a named field, and makes recursive calls
   * to retrieve components for nested and deeply nested fields, which occur in
   * object and list type fields. Used internally to retrieve widgets, and also
   * exposed for use in custom preview templates.
   */


  render() {
    const {
      entry,
      collection,
      config
    } = this.props;

    if (!entry || !entry.get('data')) {
      return null;
    }

    const previewComponent = (0, _registry.getPreviewTemplate)((0, _collections.selectTemplateName)(collection, entry.get('slug'))) || _EditorPreview.default;

    this.inferFields();

    const previewProps = _objectSpread(_objectSpread({}, this.props), {}, {
      widgetFor: this.widgetFor,
      widgetsFor: this.widgetsFor
    });

    const styleEls = (0, _registry.getPreviewStyles)().map((style, i) => {
      if (style.raw) {
        return (0, _core.jsx)("style", {
          key: i
        }, style.value);
      }

      return (0, _core.jsx)("link", {
        key: i,
        href: style.value,
        type: "text/css",
        rel: "stylesheet"
      });
    });

    if (!collection) {
      (0, _core.jsx)(PreviewPaneFrame, {
        id: "preview-pane",
        head: styleEls
      });
    }

    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;
    return (0, _core.jsx)(_UI.ErrorBoundary, {
      config: config
    }, (0, _core.jsx)(PreviewPaneFrame, {
      id: "preview-pane",
      head: styleEls,
      initialContent: initialContent
    }, (0, _core.jsx)(_reactFrameComponent.FrameContextConsumer, null, _ref3 => {
      let {
        document,
        window
      } = _ref3;
      return (0, _core.jsx)(_EditorPreviewContent.default, {
        previewComponent,
        previewProps: _objectSpread(_objectSpread({}, previewProps), {}, {
          document,
          window
        })
      });
    })));
  }

}

exports.PreviewPane = PreviewPane;
PreviewPane.propTypes = {
  collection: _reactImmutableProptypes.default.map.isRequired,
  fields: _reactImmutableProptypes.default.list.isRequired,
  entry: _reactImmutableProptypes.default.map.isRequired,
  fieldsMetaData: _reactImmutableProptypes.default.map.isRequired,
  getAsset: _propTypes.default.func.isRequired
};

function mapStateToProps(state) {
  const isLoadingAsset = (0, _medias.selectIsLoadingAsset)(state.medias);
  return {
    isLoadingAsset,
    config: state.config
  };
}

function mapDispatchToProps(dispatch) {
  return {
    boundGetAsset: (collection, entry) => (0, _media.boundGetAsset)(dispatch, collection, entry)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, stateProps), dispatchProps), ownProps), {}, {
    getAsset: dispatchProps.boundGetAsset(ownProps.collection, ownProps.entry)
  });
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(PreviewPane);

exports.default = _default;