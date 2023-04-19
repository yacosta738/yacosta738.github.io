"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.mergeMediaConfig = mergeMediaConfig;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _immutable = require("immutable");

var _core = require("@emotion/core");

var _slate = require("slate");

var _slateReact = require("slate-react");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _styles = require("../styles");

var _serializers = require("../serializers");

var _Toolbar = _interopRequireDefault(require("../MarkdownControl/Toolbar"));

var _renderers = require("./renderers");

var _visual = _interopRequireDefault(require("./plugins/visual"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

function visualEditorStyles(_ref2) {
  let {
    minimal
  } = _ref2;
  return `
  position: relative;
  overflow: auto;
  font-family: ${_netlifyCmsUiDefault.fonts.primary};
  min-height: ${minimal ? 'auto' : _netlifyCmsUiDefault.lengths.richTextEditorMinHeight};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
  margin-top: -${_styles.editorStyleVars.stickyDistanceBottom};
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: ${_netlifyCmsUiDefault.zIndex.zIndex100};
`;
}

const InsertionPoint = (0, _styledBase.default)("div", {
  target: "evezps90",
  label: "InsertionPoint"
})(process.env.NODE_ENV === "production" ? {
  name: "b2d31m",
  styles: "flex:1 1 auto;cursor:text;"
} : {
  name: "b2d31m",
  styles: "flex:1 1 auto;cursor:text;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvVmlzdWFsRWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1DaUMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9WaXN1YWxFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIGFzIGNvcmVDc3MsIENsYXNzTmFtZXMgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7IGdldCwgaXNFbXB0eSwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgVmFsdWUsIERvY3VtZW50LCBCbG9jaywgVGV4dCB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRvciBhcyBTbGF0ZSB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCB7IGxlbmd0aHMsIGZvbnRzLCB6SW5kZXggfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuaW1wb3J0IHsgZWRpdG9yU3R5bGVWYXJzLCBFZGl0b3JDb250cm9sQmFyIH0gZnJvbSAnLi4vc3R5bGVzJztcbmltcG9ydCB7IHNsYXRlVG9NYXJrZG93biwgbWFya2Rvd25Ub1NsYXRlIH0gZnJvbSAnLi4vc2VyaWFsaXplcnMnO1xuaW1wb3J0IFRvb2xiYXIgZnJvbSAnLi4vTWFya2Rvd25Db250cm9sL1Rvb2xiYXInO1xuaW1wb3J0IHsgcmVuZGVyQmxvY2ssIHJlbmRlcklubGluZSwgcmVuZGVyTWFyayB9IGZyb20gJy4vcmVuZGVyZXJzJztcbmltcG9ydCBwbHVnaW5zIGZyb20gJy4vcGx1Z2lucy92aXN1YWwnO1xuaW1wb3J0IHNjaGVtYSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIHZpc3VhbEVkaXRvclN0eWxlcyh7IG1pbmltYWwgfSkge1xuICByZXR1cm4gYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBmb250LWZhbWlseTogJHtmb250cy5wcmltYXJ5fTtcbiAgbWluLWhlaWdodDogJHttaW5pbWFsID8gJ2F1dG8nIDogbGVuZ3Rocy5yaWNoVGV4dEVkaXRvck1pbkhlaWdodH07XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xuICBib3JkZXItdG9wOiAwO1xuICBtYXJnaW4tdG9wOiAtJHtlZGl0b3JTdHlsZVZhcnMuc3RpY2t5RGlzdGFuY2VCb3R0b219O1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB6LWluZGV4OiAke3pJbmRleC56SW5kZXgxMDB9O1xuYDtcbn1cblxuY29uc3QgSW5zZXJ0aW9uUG9pbnQgPSBzdHlsZWQuZGl2YFxuICBmbGV4OiAxIDEgYXV0bztcbiAgY3Vyc29yOiB0ZXh0O1xuYDtcblxuZnVuY3Rpb24gY3JlYXRlRW1wdHlSYXdEb2MoKSB7XG4gIGNvbnN0IGVtcHR5VGV4dCA9IFRleHQuY3JlYXRlKCcnKTtcbiAgY29uc3QgZW1wdHlCbG9jayA9IEJsb2NrLmNyZWF0ZSh7IG9iamVjdDogJ2Jsb2NrJywgdHlwZTogJ3BhcmFncmFwaCcsIG5vZGVzOiBbZW1wdHlUZXh0XSB9KTtcbiAgcmV0dXJuIHsgbm9kZXM6IFtlbXB0eUJsb2NrXSB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTbGF0ZVZhbHVlKHJhd1ZhbHVlLCB7IHZvaWRDb2RlQmxvY2ssIHJlbWFya1BsdWdpbnMgfSkge1xuICBjb25zdCByYXdEb2MgPSByYXdWYWx1ZSAmJiBtYXJrZG93blRvU2xhdGUocmF3VmFsdWUsIHsgdm9pZENvZGVCbG9jaywgcmVtYXJrUGx1Z2lucyB9KTtcbiAgY29uc3QgcmF3RG9jSGFzTm9kZXMgPSAhaXNFbXB0eShnZXQocmF3RG9jLCAnbm9kZXMnKSk7XG4gIGNvbnN0IGRvY3VtZW50ID0gRG9jdW1lbnQuZnJvbUpTT04ocmF3RG9jSGFzTm9kZXMgPyByYXdEb2MgOiBjcmVhdGVFbXB0eVJhd0RvYygpKTtcbiAgcmV0dXJuIFZhbHVlLmNyZWF0ZSh7IGRvY3VtZW50IH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNZWRpYUNvbmZpZyhlZGl0b3JDb21wb25lbnRzLCBmaWVsZCkge1xuICAvLyBtZXJnZSBlZGl0b3IgbWVkaWEgbGlicmFyeSBjb25maWcgdG8gaW1hZ2UgY29tcG9uZW50c1xuICBpZiAoZWRpdG9yQ29tcG9uZW50cy5oYXMoJ2ltYWdlJykpIHtcbiAgICBjb25zdCBpbWFnZUNvbXBvbmVudCA9IGVkaXRvckNvbXBvbmVudHMuZ2V0KCdpbWFnZScpO1xuICAgIGNvbnN0IGZpZWxkcyA9IGltYWdlQ29tcG9uZW50Py5maWVsZHM7XG5cbiAgICBpZiAoZmllbGRzKSB7XG4gICAgICBpbWFnZUNvbXBvbmVudC5maWVsZHMgPSBmaWVsZHMudXBkYXRlKFxuICAgICAgICBmaWVsZHMuZmluZEluZGV4KGYgPT4gZi5nZXQoJ3dpZGdldCcpID09PSAnaW1hZ2UnKSxcbiAgICAgICAgZiA9PiB7XG4gICAgICAgICAgLy8gbWVyZ2UgYG1lZGlhX2xpYnJhcnlgIGNvbmZpZ1xuICAgICAgICAgIGlmIChmaWVsZC5oYXMoJ21lZGlhX2xpYnJhcnknKSkge1xuICAgICAgICAgICAgZiA9IGYuc2V0KFxuICAgICAgICAgICAgICAnbWVkaWFfbGlicmFyeScsXG4gICAgICAgICAgICAgIGZpZWxkLmdldCgnbWVkaWFfbGlicmFyeScpLm1lcmdlRGVlcChmLmdldCgnbWVkaWFfbGlicmFyeScpKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1lcmdlICdtZWRpYV9mb2xkZXInXG4gICAgICAgICAgaWYgKGZpZWxkLmhhcygnbWVkaWFfZm9sZGVyJykgJiYgIWYuaGFzKCdtZWRpYV9mb2xkZXInKSkge1xuICAgICAgICAgICAgZiA9IGYuc2V0KCdtZWRpYV9mb2xkZXInLCBmaWVsZC5nZXQoJ21lZGlhX2ZvbGRlcicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWVyZ2UgJ3B1YmxpY19mb2xkZXInXG4gICAgICAgICAgaWYgKGZpZWxkLmhhcygncHVibGljX2ZvbGRlcicpICYmICFmLmhhcygncHVibGljX2ZvbGRlcicpKSB7XG4gICAgICAgICAgICBmID0gZi5zZXQoJ3B1YmxpY19mb2xkZXInLCBmaWVsZC5nZXQoJ3B1YmxpY19mb2xkZXInKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgZWRpdG9yQ29tcG9uZW50cyA9IHByb3BzLmdldEVkaXRvckNvbXBvbmVudHMoKTtcbiAgICB0aGlzLnNob3J0Y29kZUNvbXBvbmVudHMgPSBlZGl0b3JDb21wb25lbnRzLmZpbHRlcigoeyB0eXBlIH0pID0+IHR5cGUgPT09ICdzaG9ydGNvZGUnKTtcbiAgICB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCA9IGZyb21KUyhlZGl0b3JDb21wb25lbnRzLmZpbmQoKHsgdHlwZSB9KSA9PiB0eXBlID09PSAnY29kZS1ibG9jaycpKTtcbiAgICB0aGlzLmVkaXRvckNvbXBvbmVudHMgPVxuICAgICAgdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfHwgZWRpdG9yQ29tcG9uZW50cy5oYXMoJ2NvZGUtYmxvY2snKVxuICAgICAgICA/IGVkaXRvckNvbXBvbmVudHNcbiAgICAgICAgOiBlZGl0b3JDb21wb25lbnRzLnNldCgnY29kZS1ibG9jaycsIHsgbGFiZWw6ICdDb2RlIEJsb2NrJywgdHlwZTogJ2NvZGUtYmxvY2snIH0pO1xuXG4gICAgdGhpcy5yZW1hcmtQbHVnaW5zID0gcHJvcHMuZ2V0UmVtYXJrUGx1Z2lucygpO1xuXG4gICAgbWVyZ2VNZWRpYUNvbmZpZyh0aGlzLmVkaXRvckNvbXBvbmVudHMsIHRoaXMucHJvcHMuZmllbGQpO1xuICAgIHRoaXMucmVuZGVyQmxvY2sgPSByZW5kZXJCbG9jayh7XG4gICAgICBjbGFzc05hbWVXcmFwcGVyOiBwcm9wcy5jbGFzc05hbWUsXG4gICAgICByZXNvbHZlV2lkZ2V0OiBwcm9wcy5yZXNvbHZlV2lkZ2V0LFxuICAgICAgY29kZUJsb2NrQ29tcG9uZW50OiB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcklubGluZSA9IHJlbmRlcklubGluZSgpO1xuICAgIHRoaXMucmVuZGVyTWFyayA9IHJlbmRlck1hcmsoKTtcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYSh7IHZvaWRDb2RlQmxvY2s6ICEhdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfSk7XG4gICAgdGhpcy5wbHVnaW5zID0gcGx1Z2lucyh7XG4gICAgICBnZXRBc3NldDogcHJvcHMuZ2V0QXNzZXQsXG4gICAgICByZXNvbHZlV2lkZ2V0OiBwcm9wcy5yZXNvbHZlV2lkZ2V0LFxuICAgICAgdDogcHJvcHMudCxcbiAgICAgIHJlbWFya1BsdWdpbnM6IHRoaXMucmVtYXJrUGx1Z2lucyxcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IGNyZWF0ZVNsYXRlVmFsdWUodGhpcy5wcm9wcy52YWx1ZSwge1xuICAgICAgICB2b2lkQ29kZUJsb2NrOiAhIXRoaXMuY29kZUJsb2NrQ29tcG9uZW50LFxuICAgICAgICByZW1hcmtQbHVnaW5zOiB0aGlzLnJlbWFya1BsdWdpbnMsXG4gICAgICB9KSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkFkZEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uTW9kZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZDogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgIGdldEVkaXRvckNvbXBvbmVudHM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0UmVtYXJrUGx1Z2luczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc1Nob3dNb2RlVG9nZ2xlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnZhbHVlLmVxdWFscyhuZXh0U3RhdGUudmFsdWUpKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IHJhdyA9IG5leHRTdGF0ZS52YWx1ZS5kb2N1bWVudC50b0pTKCk7XG4gICAgY29uc3QgbWFya2Rvd24gPSBzbGF0ZVRvTWFya2Rvd24ocmF3LCB7XG4gICAgICB2b2lkQ29kZUJsb2NrOiB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICAgIHJlbWFya1BsdWdpbnM6IHRoaXMucmVtYXJrUGx1Z2lucyxcbiAgICB9KTtcbiAgICByZXR1cm4gbmV4dFByb3BzLnZhbHVlICE9PSBtYXJrZG93bjtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLnBlbmRpbmdGb2N1cykge1xuICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgIHRoaXMucHJvcHMucGVuZGluZ0ZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmIChwcmV2UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWx1ZTogY3JlYXRlU2xhdGVWYWx1ZSh0aGlzLnByb3BzLnZhbHVlLCB7XG4gICAgICAgICAgdm9pZENvZGVCbG9jazogISF0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICAgICAgICByZW1hcmtQbHVnaW5zOiB0aGlzLnJlbWFya1BsdWdpbnMsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWFya0NsaWNrID0gdHlwZSA9PiB7XG4gICAgdGhpcy5lZGl0b3IudG9nZ2xlTWFyayh0eXBlKS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUJsb2NrQ2xpY2sgPSB0eXBlID0+IHtcbiAgICB0aGlzLmVkaXRvci50b2dnbGVCbG9jayh0eXBlKS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUxpbmtDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLmVkaXRvci50b2dnbGVMaW5rKG9sZFVybCA9PlxuICAgICAgd2luZG93LnByb21wdCh0aGlzLnByb3BzLnQoJ2VkaXRvci5lZGl0b3JXaWRnZXRzLm1hcmtkb3duLmxpbmtQcm9tcHQnKSwgb2xkVXJsKSxcbiAgICApO1xuICB9O1xuXG4gIGhhc01hcmsgPSB0eXBlID0+IHRoaXMuZWRpdG9yICYmIHRoaXMuZWRpdG9yLmhhc01hcmsodHlwZSk7XG4gIGhhc0lubGluZSA9IHR5cGUgPT4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuaGFzSW5saW5lKHR5cGUpO1xuICBoYXNCbG9jayA9IHR5cGUgPT4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuaGFzQmxvY2sodHlwZSk7XG4gIGhhc1F1b3RlID0gdHlwZSA9PiB0aGlzLmVkaXRvciAmJiB0aGlzLmVkaXRvci5oYXNRdW90ZSh0eXBlKTtcbiAgaGFzTGlzdEl0ZW1zID0gdHlwZSA9PiB0aGlzLmVkaXRvciAmJiB0aGlzLmVkaXRvci5oYXNMaXN0SXRlbXModHlwZSk7XG5cbiAgaGFuZGxlVG9nZ2xlTW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uTW9kZSgncmF3Jyk7XG4gIH07XG5cbiAgaGFuZGxlSW5zZXJ0U2hvcnRjb2RlID0gcGx1Z2luQ29uZmlnID0+IHtcbiAgICB0aGlzLmVkaXRvci5pbnNlcnRTaG9ydGNvZGUocGx1Z2luQ29uZmlnKTtcbiAgfTtcblxuICBoYW5kbGVDbGlja0JlbG93RG9jdW1lbnQgPSAoKSA9PiB7XG4gICAgdGhpcy5lZGl0b3IubW92ZVRvRW5kT2ZEb2N1bWVudCgpO1xuICB9O1xuXG4gIGhhbmRsZURvY3VtZW50Q2hhbmdlID0gZGVib3VuY2UoZWRpdG9yID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJhdyA9IGVkaXRvci52YWx1ZS5kb2N1bWVudC50b0pTKCk7XG4gICAgY29uc3QgbWFya2Rvd24gPSBzbGF0ZVRvTWFya2Rvd24ocmF3LCB7XG4gICAgICB2b2lkQ29kZUJsb2NrOiB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICAgIHJlbWFya1BsdWdpbnM6IHRoaXMucmVtYXJrUGx1Z2lucyxcbiAgICB9KTtcbiAgICBvbkNoYW5nZShtYXJrZG93bik7XG4gIH0sIDE1MCk7XG5cbiAgaGFuZGxlQ2hhbmdlID0gZWRpdG9yID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUudmFsdWUuZG9jdW1lbnQuZXF1YWxzKGVkaXRvci52YWx1ZS5kb2N1bWVudCkpIHtcbiAgICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRDaGFuZ2UoZWRpdG9yKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlZGl0b3IudmFsdWUgfSk7XG4gIH07XG5cbiAgcHJvY2Vzc1JlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy5lZGl0b3IgPSByZWY7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgb25BZGRBc3NldCwgZ2V0QXNzZXQsIGNsYXNzTmFtZSwgZmllbGQsIGlzU2hvd01vZGVUb2dnbGUsIHQsIGlzRGlzYWJsZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY3NzPXtjb3JlQ3NzYFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgYH1cbiAgICAgID5cbiAgICAgICAgPEVkaXRvckNvbnRyb2xCYXI+XG4gICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgIG9uTWFya0NsaWNrPXt0aGlzLmhhbmRsZU1hcmtDbGlja31cbiAgICAgICAgICAgIG9uQmxvY2tDbGljaz17dGhpcy5oYW5kbGVCbG9ja0NsaWNrfVxuICAgICAgICAgICAgb25MaW5rQ2xpY2s9e3RoaXMuaGFuZGxlTGlua0NsaWNrfVxuICAgICAgICAgICAgb25Ub2dnbGVNb2RlPXt0aGlzLmhhbmRsZVRvZ2dsZU1vZGV9XG4gICAgICAgICAgICBwbHVnaW5zPXt0aGlzLmVkaXRvckNvbXBvbmVudHN9XG4gICAgICAgICAgICBvblN1Ym1pdD17dGhpcy5oYW5kbGVJbnNlcnRTaG9ydGNvZGV9XG4gICAgICAgICAgICBvbkFkZEFzc2V0PXtvbkFkZEFzc2V0fVxuICAgICAgICAgICAgZ2V0QXNzZXQ9e2dldEFzc2V0fVxuICAgICAgICAgICAgYnV0dG9ucz17ZmllbGQuZ2V0KCdidXR0b25zJyl9XG4gICAgICAgICAgICBlZGl0b3JDb21wb25lbnRzPXtmaWVsZC5nZXQoJ2VkaXRvcl9jb21wb25lbnRzJyl9XG4gICAgICAgICAgICBoYXNNYXJrPXt0aGlzLmhhc01hcmt9XG4gICAgICAgICAgICBoYXNJbmxpbmU9e3RoaXMuaGFzSW5saW5lfVxuICAgICAgICAgICAgaGFzQmxvY2s9e3RoaXMuaGFzQmxvY2t9XG4gICAgICAgICAgICBoYXNRdW90ZT17dGhpcy5oYXNRdW90ZX1cbiAgICAgICAgICAgIGhhc0xpc3RJdGVtcz17dGhpcy5oYXNMaXN0SXRlbXN9XG4gICAgICAgICAgICBpc1Nob3dNb2RlVG9nZ2xlPXtpc1Nob3dNb2RlVG9nZ2xlfVxuICAgICAgICAgICAgdD17dH1cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRWRpdG9yQ29udHJvbEJhcj5cbiAgICAgICAgPENsYXNzTmFtZXM+XG4gICAgICAgICAgeyh7IGNzcywgY3ggfSkgPT4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICBjc3NgXG4gICAgICAgICAgICAgICAgICAke3Zpc3VhbEVkaXRvclN0eWxlcyh7IG1pbmltYWw6IGZpZWxkLmdldCgnbWluaW1hbCcpIH0pfVxuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTbGF0ZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3NzYFxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTZweCAyMHB4IDA7XG4gICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgICAgICByZW5kZXJCbG9jaz17dGhpcy5yZW5kZXJCbG9ja31cbiAgICAgICAgICAgICAgICByZW5kZXJJbmxpbmU9e3RoaXMucmVuZGVySW5saW5lfVxuICAgICAgICAgICAgICAgIHJlbmRlck1hcms9e3RoaXMucmVuZGVyTWFya31cbiAgICAgICAgICAgICAgICBzY2hlbWE9e3RoaXMuc2NoZW1hfVxuICAgICAgICAgICAgICAgIHBsdWdpbnM9e3RoaXMucGx1Z2luc31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLnByb2Nlc3NSZWZ9XG4gICAgICAgICAgICAgICAgc3BlbGxDaGVja1xuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8SW5zZXJ0aW9uUG9pbnQgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja0JlbG93RG9jdW1lbnR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NsYXNzTmFtZXM+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

function createEmptyRawDoc() {
  const emptyText = _slate.Text.create('');

  const emptyBlock = _slate.Block.create({
    object: 'block',
    type: 'paragraph',
    nodes: [emptyText]
  });

  return {
    nodes: [emptyBlock]
  };
}

function createSlateValue(rawValue, _ref3) {
  let {
    voidCodeBlock,
    remarkPlugins
  } = _ref3;
  const rawDoc = rawValue && (0, _serializers.markdownToSlate)(rawValue, {
    voidCodeBlock,
    remarkPlugins
  });
  const rawDocHasNodes = !(0, _isEmpty2.default)((0, _get2.default)(rawDoc, 'nodes'));

  const document = _slate.Document.fromJSON(rawDocHasNodes ? rawDoc : createEmptyRawDoc());

  return _slate.Value.create({
    document
  });
}

function mergeMediaConfig(editorComponents, field) {
  // merge editor media library config to image components
  if (editorComponents.has('image')) {
    const imageComponent = editorComponents.get('image');
    const fields = imageComponent === null || imageComponent === void 0 ? void 0 : imageComponent.fields;

    if (fields) {
      imageComponent.fields = fields.update(fields.findIndex(f => f.get('widget') === 'image'), f => {
        // merge `media_library` config
        if (field.has('media_library')) {
          f = f.set('media_library', field.get('media_library').mergeDeep(f.get('media_library')));
        } // merge 'media_folder'


        if (field.has('media_folder') && !f.has('media_folder')) {
          f = f.set('media_folder', field.get('media_folder'));
        } // merge 'public_folder'


        if (field.has('public_folder') && !f.has('public_folder')) {
          f = f.set('public_folder', field.get('public_folder'));
        }

        return f;
      });
    }
  }
}

var _ref = process.env.NODE_ENV === "production" ? {
  name: "t5h4ts-Editor",
  styles: "position:relative;;label:Editor;"
} : {
  name: "t5h4ts-Editor",
  styles: "position:relative;;label:Editor;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvVmlzdWFsRWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZOb0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9WaXN1YWxFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIGFzIGNvcmVDc3MsIENsYXNzTmFtZXMgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7IGdldCwgaXNFbXB0eSwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgVmFsdWUsIERvY3VtZW50LCBCbG9jaywgVGV4dCB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRvciBhcyBTbGF0ZSB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCB7IGxlbmd0aHMsIGZvbnRzLCB6SW5kZXggfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuaW1wb3J0IHsgZWRpdG9yU3R5bGVWYXJzLCBFZGl0b3JDb250cm9sQmFyIH0gZnJvbSAnLi4vc3R5bGVzJztcbmltcG9ydCB7IHNsYXRlVG9NYXJrZG93biwgbWFya2Rvd25Ub1NsYXRlIH0gZnJvbSAnLi4vc2VyaWFsaXplcnMnO1xuaW1wb3J0IFRvb2xiYXIgZnJvbSAnLi4vTWFya2Rvd25Db250cm9sL1Rvb2xiYXInO1xuaW1wb3J0IHsgcmVuZGVyQmxvY2ssIHJlbmRlcklubGluZSwgcmVuZGVyTWFyayB9IGZyb20gJy4vcmVuZGVyZXJzJztcbmltcG9ydCBwbHVnaW5zIGZyb20gJy4vcGx1Z2lucy92aXN1YWwnO1xuaW1wb3J0IHNjaGVtYSBmcm9tICcuL3NjaGVtYSc7XG5cbmZ1bmN0aW9uIHZpc3VhbEVkaXRvclN0eWxlcyh7IG1pbmltYWwgfSkge1xuICByZXR1cm4gYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBmb250LWZhbWlseTogJHtmb250cy5wcmltYXJ5fTtcbiAgbWluLWhlaWdodDogJHttaW5pbWFsID8gJ2F1dG8nIDogbGVuZ3Rocy5yaWNoVGV4dEVkaXRvck1pbkhlaWdodH07XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xuICBib3JkZXItdG9wOiAwO1xuICBtYXJnaW4tdG9wOiAtJHtlZGl0b3JTdHlsZVZhcnMuc3RpY2t5RGlzdGFuY2VCb3R0b219O1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB6LWluZGV4OiAke3pJbmRleC56SW5kZXgxMDB9O1xuYDtcbn1cblxuY29uc3QgSW5zZXJ0aW9uUG9pbnQgPSBzdHlsZWQuZGl2YFxuICBmbGV4OiAxIDEgYXV0bztcbiAgY3Vyc29yOiB0ZXh0O1xuYDtcblxuZnVuY3Rpb24gY3JlYXRlRW1wdHlSYXdEb2MoKSB7XG4gIGNvbnN0IGVtcHR5VGV4dCA9IFRleHQuY3JlYXRlKCcnKTtcbiAgY29uc3QgZW1wdHlCbG9jayA9IEJsb2NrLmNyZWF0ZSh7IG9iamVjdDogJ2Jsb2NrJywgdHlwZTogJ3BhcmFncmFwaCcsIG5vZGVzOiBbZW1wdHlUZXh0XSB9KTtcbiAgcmV0dXJuIHsgbm9kZXM6IFtlbXB0eUJsb2NrXSB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTbGF0ZVZhbHVlKHJhd1ZhbHVlLCB7IHZvaWRDb2RlQmxvY2ssIHJlbWFya1BsdWdpbnMgfSkge1xuICBjb25zdCByYXdEb2MgPSByYXdWYWx1ZSAmJiBtYXJrZG93blRvU2xhdGUocmF3VmFsdWUsIHsgdm9pZENvZGVCbG9jaywgcmVtYXJrUGx1Z2lucyB9KTtcbiAgY29uc3QgcmF3RG9jSGFzTm9kZXMgPSAhaXNFbXB0eShnZXQocmF3RG9jLCAnbm9kZXMnKSk7XG4gIGNvbnN0IGRvY3VtZW50ID0gRG9jdW1lbnQuZnJvbUpTT04ocmF3RG9jSGFzTm9kZXMgPyByYXdEb2MgOiBjcmVhdGVFbXB0eVJhd0RvYygpKTtcbiAgcmV0dXJuIFZhbHVlLmNyZWF0ZSh7IGRvY3VtZW50IH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VNZWRpYUNvbmZpZyhlZGl0b3JDb21wb25lbnRzLCBmaWVsZCkge1xuICAvLyBtZXJnZSBlZGl0b3IgbWVkaWEgbGlicmFyeSBjb25maWcgdG8gaW1hZ2UgY29tcG9uZW50c1xuICBpZiAoZWRpdG9yQ29tcG9uZW50cy5oYXMoJ2ltYWdlJykpIHtcbiAgICBjb25zdCBpbWFnZUNvbXBvbmVudCA9IGVkaXRvckNvbXBvbmVudHMuZ2V0KCdpbWFnZScpO1xuICAgIGNvbnN0IGZpZWxkcyA9IGltYWdlQ29tcG9uZW50Py5maWVsZHM7XG5cbiAgICBpZiAoZmllbGRzKSB7XG4gICAgICBpbWFnZUNvbXBvbmVudC5maWVsZHMgPSBmaWVsZHMudXBkYXRlKFxuICAgICAgICBmaWVsZHMuZmluZEluZGV4KGYgPT4gZi5nZXQoJ3dpZGdldCcpID09PSAnaW1hZ2UnKSxcbiAgICAgICAgZiA9PiB7XG4gICAgICAgICAgLy8gbWVyZ2UgYG1lZGlhX2xpYnJhcnlgIGNvbmZpZ1xuICAgICAgICAgIGlmIChmaWVsZC5oYXMoJ21lZGlhX2xpYnJhcnknKSkge1xuICAgICAgICAgICAgZiA9IGYuc2V0KFxuICAgICAgICAgICAgICAnbWVkaWFfbGlicmFyeScsXG4gICAgICAgICAgICAgIGZpZWxkLmdldCgnbWVkaWFfbGlicmFyeScpLm1lcmdlRGVlcChmLmdldCgnbWVkaWFfbGlicmFyeScpKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG1lcmdlICdtZWRpYV9mb2xkZXInXG4gICAgICAgICAgaWYgKGZpZWxkLmhhcygnbWVkaWFfZm9sZGVyJykgJiYgIWYuaGFzKCdtZWRpYV9mb2xkZXInKSkge1xuICAgICAgICAgICAgZiA9IGYuc2V0KCdtZWRpYV9mb2xkZXInLCBmaWVsZC5nZXQoJ21lZGlhX2ZvbGRlcicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWVyZ2UgJ3B1YmxpY19mb2xkZXInXG4gICAgICAgICAgaWYgKGZpZWxkLmhhcygncHVibGljX2ZvbGRlcicpICYmICFmLmhhcygncHVibGljX2ZvbGRlcicpKSB7XG4gICAgICAgICAgICBmID0gZi5zZXQoJ3B1YmxpY19mb2xkZXInLCBmaWVsZC5nZXQoJ3B1YmxpY19mb2xkZXInKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgZWRpdG9yQ29tcG9uZW50cyA9IHByb3BzLmdldEVkaXRvckNvbXBvbmVudHMoKTtcbiAgICB0aGlzLnNob3J0Y29kZUNvbXBvbmVudHMgPSBlZGl0b3JDb21wb25lbnRzLmZpbHRlcigoeyB0eXBlIH0pID0+IHR5cGUgPT09ICdzaG9ydGNvZGUnKTtcbiAgICB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCA9IGZyb21KUyhlZGl0b3JDb21wb25lbnRzLmZpbmQoKHsgdHlwZSB9KSA9PiB0eXBlID09PSAnY29kZS1ibG9jaycpKTtcbiAgICB0aGlzLmVkaXRvckNvbXBvbmVudHMgPVxuICAgICAgdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfHwgZWRpdG9yQ29tcG9uZW50cy5oYXMoJ2NvZGUtYmxvY2snKVxuICAgICAgICA/IGVkaXRvckNvbXBvbmVudHNcbiAgICAgICAgOiBlZGl0b3JDb21wb25lbnRzLnNldCgnY29kZS1ibG9jaycsIHsgbGFiZWw6ICdDb2RlIEJsb2NrJywgdHlwZTogJ2NvZGUtYmxvY2snIH0pO1xuXG4gICAgdGhpcy5yZW1hcmtQbHVnaW5zID0gcHJvcHMuZ2V0UmVtYXJrUGx1Z2lucygpO1xuXG4gICAgbWVyZ2VNZWRpYUNvbmZpZyh0aGlzLmVkaXRvckNvbXBvbmVudHMsIHRoaXMucHJvcHMuZmllbGQpO1xuICAgIHRoaXMucmVuZGVyQmxvY2sgPSByZW5kZXJCbG9jayh7XG4gICAgICBjbGFzc05hbWVXcmFwcGVyOiBwcm9wcy5jbGFzc05hbWUsXG4gICAgICByZXNvbHZlV2lkZ2V0OiBwcm9wcy5yZXNvbHZlV2lkZ2V0LFxuICAgICAgY29kZUJsb2NrQ29tcG9uZW50OiB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcklubGluZSA9IHJlbmRlcklubGluZSgpO1xuICAgIHRoaXMucmVuZGVyTWFyayA9IHJlbmRlck1hcmsoKTtcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYSh7IHZvaWRDb2RlQmxvY2s6ICEhdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfSk7XG4gICAgdGhpcy5wbHVnaW5zID0gcGx1Z2lucyh7XG4gICAgICBnZXRBc3NldDogcHJvcHMuZ2V0QXNzZXQsXG4gICAgICByZXNvbHZlV2lkZ2V0OiBwcm9wcy5yZXNvbHZlV2lkZ2V0LFxuICAgICAgdDogcHJvcHMudCxcbiAgICAgIHJlbWFya1BsdWdpbnM6IHRoaXMucmVtYXJrUGx1Z2lucyxcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IGNyZWF0ZVNsYXRlVmFsdWUodGhpcy5wcm9wcy52YWx1ZSwge1xuICAgICAgICB2b2lkQ29kZUJsb2NrOiAhIXRoaXMuY29kZUJsb2NrQ29tcG9uZW50LFxuICAgICAgICByZW1hcmtQbHVnaW5zOiB0aGlzLnJlbWFya1BsdWdpbnMsXG4gICAgICB9KSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkFkZEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGdldEFzc2V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uTW9kZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmaWVsZDogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgIGdldEVkaXRvckNvbXBvbmVudHM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0UmVtYXJrUGx1Z2luczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc1Nob3dNb2RlVG9nZ2xlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLnZhbHVlLmVxdWFscyhuZXh0U3RhdGUudmFsdWUpKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IHJhdyA9IG5leHRTdGF0ZS52YWx1ZS5kb2N1bWVudC50b0pTKCk7XG4gICAgY29uc3QgbWFya2Rvd24gPSBzbGF0ZVRvTWFya2Rvd24ocmF3LCB7XG4gICAgICB2b2lkQ29kZUJsb2NrOiB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICAgIHJlbWFya1BsdWdpbnM6IHRoaXMucmVtYXJrUGx1Z2lucyxcbiAgICB9KTtcbiAgICByZXR1cm4gbmV4dFByb3BzLnZhbHVlICE9PSBtYXJrZG93bjtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLnBlbmRpbmdGb2N1cykge1xuICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgIHRoaXMucHJvcHMucGVuZGluZ0ZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmIChwcmV2UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB2YWx1ZTogY3JlYXRlU2xhdGVWYWx1ZSh0aGlzLnByb3BzLnZhbHVlLCB7XG4gICAgICAgICAgdm9pZENvZGVCbG9jazogISF0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICAgICAgICByZW1hcmtQbHVnaW5zOiB0aGlzLnJlbWFya1BsdWdpbnMsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWFya0NsaWNrID0gdHlwZSA9PiB7XG4gICAgdGhpcy5lZGl0b3IudG9nZ2xlTWFyayh0eXBlKS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUJsb2NrQ2xpY2sgPSB0eXBlID0+IHtcbiAgICB0aGlzLmVkaXRvci50b2dnbGVCbG9jayh0eXBlKS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUxpbmtDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLmVkaXRvci50b2dnbGVMaW5rKG9sZFVybCA9PlxuICAgICAgd2luZG93LnByb21wdCh0aGlzLnByb3BzLnQoJ2VkaXRvci5lZGl0b3JXaWRnZXRzLm1hcmtkb3duLmxpbmtQcm9tcHQnKSwgb2xkVXJsKSxcbiAgICApO1xuICB9O1xuXG4gIGhhc01hcmsgPSB0eXBlID0+IHRoaXMuZWRpdG9yICYmIHRoaXMuZWRpdG9yLmhhc01hcmsodHlwZSk7XG4gIGhhc0lubGluZSA9IHR5cGUgPT4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuaGFzSW5saW5lKHR5cGUpO1xuICBoYXNCbG9jayA9IHR5cGUgPT4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuaGFzQmxvY2sodHlwZSk7XG4gIGhhc1F1b3RlID0gdHlwZSA9PiB0aGlzLmVkaXRvciAmJiB0aGlzLmVkaXRvci5oYXNRdW90ZSh0eXBlKTtcbiAgaGFzTGlzdEl0ZW1zID0gdHlwZSA9PiB0aGlzLmVkaXRvciAmJiB0aGlzLmVkaXRvci5oYXNMaXN0SXRlbXModHlwZSk7XG5cbiAgaGFuZGxlVG9nZ2xlTW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uTW9kZSgncmF3Jyk7XG4gIH07XG5cbiAgaGFuZGxlSW5zZXJ0U2hvcnRjb2RlID0gcGx1Z2luQ29uZmlnID0+IHtcbiAgICB0aGlzLmVkaXRvci5pbnNlcnRTaG9ydGNvZGUocGx1Z2luQ29uZmlnKTtcbiAgfTtcblxuICBoYW5kbGVDbGlja0JlbG93RG9jdW1lbnQgPSAoKSA9PiB7XG4gICAgdGhpcy5lZGl0b3IubW92ZVRvRW5kT2ZEb2N1bWVudCgpO1xuICB9O1xuXG4gIGhhbmRsZURvY3VtZW50Q2hhbmdlID0gZGVib3VuY2UoZWRpdG9yID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJhdyA9IGVkaXRvci52YWx1ZS5kb2N1bWVudC50b0pTKCk7XG4gICAgY29uc3QgbWFya2Rvd24gPSBzbGF0ZVRvTWFya2Rvd24ocmF3LCB7XG4gICAgICB2b2lkQ29kZUJsb2NrOiB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICAgIHJlbWFya1BsdWdpbnM6IHRoaXMucmVtYXJrUGx1Z2lucyxcbiAgICB9KTtcbiAgICBvbkNoYW5nZShtYXJrZG93bik7XG4gIH0sIDE1MCk7XG5cbiAgaGFuZGxlQ2hhbmdlID0gZWRpdG9yID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUudmFsdWUuZG9jdW1lbnQuZXF1YWxzKGVkaXRvci52YWx1ZS5kb2N1bWVudCkpIHtcbiAgICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRDaGFuZ2UoZWRpdG9yKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlZGl0b3IudmFsdWUgfSk7XG4gIH07XG5cbiAgcHJvY2Vzc1JlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy5lZGl0b3IgPSByZWY7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgb25BZGRBc3NldCwgZ2V0QXNzZXQsIGNsYXNzTmFtZSwgZmllbGQsIGlzU2hvd01vZGVUb2dnbGUsIHQsIGlzRGlzYWJsZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY3NzPXtjb3JlQ3NzYFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgYH1cbiAgICAgID5cbiAgICAgICAgPEVkaXRvckNvbnRyb2xCYXI+XG4gICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgIG9uTWFya0NsaWNrPXt0aGlzLmhhbmRsZU1hcmtDbGlja31cbiAgICAgICAgICAgIG9uQmxvY2tDbGljaz17dGhpcy5oYW5kbGVCbG9ja0NsaWNrfVxuICAgICAgICAgICAgb25MaW5rQ2xpY2s9e3RoaXMuaGFuZGxlTGlua0NsaWNrfVxuICAgICAgICAgICAgb25Ub2dnbGVNb2RlPXt0aGlzLmhhbmRsZVRvZ2dsZU1vZGV9XG4gICAgICAgICAgICBwbHVnaW5zPXt0aGlzLmVkaXRvckNvbXBvbmVudHN9XG4gICAgICAgICAgICBvblN1Ym1pdD17dGhpcy5oYW5kbGVJbnNlcnRTaG9ydGNvZGV9XG4gICAgICAgICAgICBvbkFkZEFzc2V0PXtvbkFkZEFzc2V0fVxuICAgICAgICAgICAgZ2V0QXNzZXQ9e2dldEFzc2V0fVxuICAgICAgICAgICAgYnV0dG9ucz17ZmllbGQuZ2V0KCdidXR0b25zJyl9XG4gICAgICAgICAgICBlZGl0b3JDb21wb25lbnRzPXtmaWVsZC5nZXQoJ2VkaXRvcl9jb21wb25lbnRzJyl9XG4gICAgICAgICAgICBoYXNNYXJrPXt0aGlzLmhhc01hcmt9XG4gICAgICAgICAgICBoYXNJbmxpbmU9e3RoaXMuaGFzSW5saW5lfVxuICAgICAgICAgICAgaGFzQmxvY2s9e3RoaXMuaGFzQmxvY2t9XG4gICAgICAgICAgICBoYXNRdW90ZT17dGhpcy5oYXNRdW90ZX1cbiAgICAgICAgICAgIGhhc0xpc3RJdGVtcz17dGhpcy5oYXNMaXN0SXRlbXN9XG4gICAgICAgICAgICBpc1Nob3dNb2RlVG9nZ2xlPXtpc1Nob3dNb2RlVG9nZ2xlfVxuICAgICAgICAgICAgdD17dH1cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0Rpc2FibGVkfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRWRpdG9yQ29udHJvbEJhcj5cbiAgICAgICAgPENsYXNzTmFtZXM+XG4gICAgICAgICAgeyh7IGNzcywgY3ggfSkgPT4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICBjc3NgXG4gICAgICAgICAgICAgICAgICAke3Zpc3VhbEVkaXRvclN0eWxlcyh7IG1pbmltYWw6IGZpZWxkLmdldCgnbWluaW1hbCcpIH0pfVxuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTbGF0ZVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3NzYFxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTZweCAyMHB4IDA7XG4gICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgICAgICByZW5kZXJCbG9jaz17dGhpcy5yZW5kZXJCbG9ja31cbiAgICAgICAgICAgICAgICByZW5kZXJJbmxpbmU9e3RoaXMucmVuZGVySW5saW5lfVxuICAgICAgICAgICAgICAgIHJlbmRlck1hcms9e3RoaXMucmVuZGVyTWFya31cbiAgICAgICAgICAgICAgICBzY2hlbWE9e3RoaXMuc2NoZW1hfVxuICAgICAgICAgICAgICAgIHBsdWdpbnM9e3RoaXMucGx1Z2luc31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLnByb2Nlc3NSZWZ9XG4gICAgICAgICAgICAgICAgc3BlbGxDaGVja1xuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8SW5zZXJ0aW9uUG9pbnQgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja0JlbG93RG9jdW1lbnR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L0NsYXNzTmFtZXM+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

class Editor extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleMarkClick", type => {
      this.editor.toggleMark(type).focus();
    });

    _defineProperty(this, "handleBlockClick", type => {
      this.editor.toggleBlock(type).focus();
    });

    _defineProperty(this, "handleLinkClick", () => {
      this.editor.toggleLink(oldUrl => window.prompt(this.props.t('editor.editorWidgets.markdown.linkPrompt'), oldUrl));
    });

    _defineProperty(this, "hasMark", type => this.editor && this.editor.hasMark(type));

    _defineProperty(this, "hasInline", type => this.editor && this.editor.hasInline(type));

    _defineProperty(this, "hasBlock", type => this.editor && this.editor.hasBlock(type));

    _defineProperty(this, "hasQuote", type => this.editor && this.editor.hasQuote(type));

    _defineProperty(this, "hasListItems", type => this.editor && this.editor.hasListItems(type));

    _defineProperty(this, "handleToggleMode", () => {
      this.props.onMode('raw');
    });

    _defineProperty(this, "handleInsertShortcode", pluginConfig => {
      this.editor.insertShortcode(pluginConfig);
    });

    _defineProperty(this, "handleClickBelowDocument", () => {
      this.editor.moveToEndOfDocument();
    });

    _defineProperty(this, "handleDocumentChange", (0, _debounce2.default)(editor => {
      const {
        onChange
      } = this.props;
      const raw = editor.value.document.toJS();
      const markdown = (0, _serializers.slateToMarkdown)(raw, {
        voidCodeBlock: this.codeBlockComponent,
        remarkPlugins: this.remarkPlugins
      });
      onChange(markdown);
    }, 150));

    _defineProperty(this, "handleChange", editor => {
      if (!this.state.value.document.equals(editor.value.document)) {
        this.handleDocumentChange(editor);
      }

      this.setState({
        value: editor.value
      });
    });

    _defineProperty(this, "processRef", ref => {
      this.editor = ref;
    });

    const editorComponents = props.getEditorComponents();
    this.shortcodeComponents = editorComponents.filter(_ref4 => {
      let {
        type
      } = _ref4;
      return type === 'shortcode';
    });
    this.codeBlockComponent = (0, _immutable.fromJS)(editorComponents.find(_ref5 => {
      let {
        type
      } = _ref5;
      return type === 'code-block';
    }));
    this.editorComponents = this.codeBlockComponent || editorComponents.has('code-block') ? editorComponents : editorComponents.set('code-block', {
      label: 'Code Block',
      type: 'code-block'
    });
    this.remarkPlugins = props.getRemarkPlugins();
    mergeMediaConfig(this.editorComponents, this.props.field);
    this.renderBlock = (0, _renderers.renderBlock)({
      classNameWrapper: props.className,
      resolveWidget: props.resolveWidget,
      codeBlockComponent: this.codeBlockComponent
    });
    this.renderInline = (0, _renderers.renderInline)();
    this.renderMark = (0, _renderers.renderMark)();
    this.schema = (0, _schema.default)({
      voidCodeBlock: !!this.codeBlockComponent
    });
    this.plugins = (0, _visual.default)({
      getAsset: props.getAsset,
      resolveWidget: props.resolveWidget,
      t: props.t,
      remarkPlugins: this.remarkPlugins
    });
    this.state = {
      value: createSlateValue(this.props.value, {
        voidCodeBlock: !!this.codeBlockComponent,
        remarkPlugins: this.remarkPlugins
      })
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.value.equals(nextState.value)) return true;
    const raw = nextState.value.document.toJS();
    const markdown = (0, _serializers.slateToMarkdown)(raw, {
      voidCodeBlock: this.codeBlockComponent,
      remarkPlugins: this.remarkPlugins
    });
    return nextProps.value !== markdown;
  }

  componentDidMount() {
    if (this.props.pendingFocus) {
      this.editor.focus();
      this.props.pendingFocus();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: createSlateValue(this.props.value, {
          voidCodeBlock: !!this.codeBlockComponent,
          remarkPlugins: this.remarkPlugins
        })
      });
    }
  }

  render() {
    const {
      onAddAsset,
      getAsset,
      className,
      field,
      isShowModeToggle,
      t,
      isDisabled
    } = this.props;
    return (0, _core.jsx)("div", {
      css: _ref
    }, (0, _core.jsx)(_styles.EditorControlBar, null, (0, _core.jsx)(_Toolbar.default, {
      onMarkClick: this.handleMarkClick,
      onBlockClick: this.handleBlockClick,
      onLinkClick: this.handleLinkClick,
      onToggleMode: this.handleToggleMode,
      plugins: this.editorComponents,
      onSubmit: this.handleInsertShortcode,
      onAddAsset: onAddAsset,
      getAsset: getAsset,
      buttons: field.get('buttons'),
      editorComponents: field.get('editor_components'),
      hasMark: this.hasMark,
      hasInline: this.hasInline,
      hasBlock: this.hasBlock,
      hasQuote: this.hasQuote,
      hasListItems: this.hasListItems,
      isShowModeToggle: isShowModeToggle,
      t: t,
      disabled: isDisabled
    })), (0, _core.jsx)(_core.ClassNames, null, _ref6 => {
      let {
        css,
        cx
      } = _ref6;
      return (0, _core.jsx)("div", {
        className: cx(className, css`
                  ${visualEditorStyles({
          minimal: field.get('minimal')
        })}
                `)
      }, (0, _core.jsx)(_slateReact.Editor, {
        className: css`
                  padding: 16px 20px 0;
                `,
        value: this.state.value,
        renderBlock: this.renderBlock,
        renderInline: this.renderInline,
        renderMark: this.renderMark,
        schema: this.schema,
        plugins: this.plugins,
        onChange: this.handleChange,
        ref: this.processRef,
        spellCheck: true
      }), (0, _core.jsx)(InsertionPoint, {
        onClick: this.handleClickBelowDocument
      }));
    }));
  }

}

exports.default = Editor;

_defineProperty(Editor, "propTypes", {
  onAddAsset: _propTypes.default.func.isRequired,
  getAsset: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onMode: _propTypes.default.func.isRequired,
  className: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  field: _reactImmutableProptypes.default.map.isRequired,
  getEditorComponents: _propTypes.default.func.isRequired,
  getRemarkPlugins: _propTypes.default.func.isRequired,
  isShowModeToggle: _propTypes.default.bool.isRequired,
  t: _propTypes.default.func.isRequired
});