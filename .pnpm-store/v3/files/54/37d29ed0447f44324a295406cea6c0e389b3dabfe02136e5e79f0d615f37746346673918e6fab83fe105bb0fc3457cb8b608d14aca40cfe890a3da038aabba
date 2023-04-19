"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EntriesCollection = void 0;
exports.filterNestedEntries = filterNestedEntries;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _partial2 = _interopRequireDefault(require("lodash/partial"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactRedux = require("react-redux");

var _reactPolyglot = require("react-polyglot");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _entries = require("../../../actions/entries");

var _entries2 = require("../../../reducers/entries");

var _cursors = require("../../../reducers/cursors");

var _Entries = _interopRequireDefault(require("./Entries"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GroupHeading = (0, _styledBase.default)("h2", {
  target: "e5mmq7y0",
  label: "GroupHeading"
})("font-size:23px;font-weight:600;color:", _netlifyCmsUiDefault.colors.textLead, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vRW50cmllcy9FbnRyaWVzQ29sbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QjhCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vRW50cmllcy9FbnRyaWVzQ29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICdyZWFjdC1wb2x5Z2xvdCc7XG5pbXBvcnQgeyBwYXJ0aWFsIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEN1cnNvciB9IGZyb20gJ25ldGxpZnktY21zLWxpYi11dGlsJztcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5pbXBvcnQge1xuICBsb2FkRW50cmllcyBhcyBhY3Rpb25Mb2FkRW50cmllcyxcbiAgdHJhdmVyc2VDb2xsZWN0aW9uQ3Vyc29yIGFzIGFjdGlvblRyYXZlcnNlQ29sbGVjdGlvbkN1cnNvcixcbn0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9lbnRyaWVzJztcbmltcG9ydCB7XG4gIHNlbGVjdEVudHJpZXMsXG4gIHNlbGVjdEVudHJpZXNMb2FkZWQsXG4gIHNlbGVjdElzRmV0Y2hpbmcsXG4gIHNlbGVjdEdyb3Vwcyxcbn0gZnJvbSAnLi4vLi4vLi4vcmVkdWNlcnMvZW50cmllcyc7XG5pbXBvcnQgeyBzZWxlY3RDb2xsZWN0aW9uRW50cmllc0N1cnNvciB9IGZyb20gJy4uLy4uLy4uL3JlZHVjZXJzL2N1cnNvcnMnO1xuaW1wb3J0IEVudHJpZXMgZnJvbSAnLi9FbnRyaWVzJztcblxuY29uc3QgR3JvdXBIZWFkaW5nID0gc3R5bGVkLmgyYFxuICBmb250LXNpemU6IDIzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAke2NvbG9ycy50ZXh0TGVhZH07XG5gO1xuXG5jb25zdCBHcm91cENvbnRhaW5lciA9IHN0eWxlZC5kaXZgYDtcblxuZnVuY3Rpb24gZ2V0R3JvdXBFbnRyaWVzKGVudHJpZXMsIHBhdGhzKSB7XG4gIHJldHVybiBlbnRyaWVzLmZpbHRlcihlbnRyeSA9PiBwYXRocy5oYXMoZW50cnkuZ2V0KCdwYXRoJykpKTtcbn1cblxuZnVuY3Rpb24gZ2V0R3JvdXBUaXRsZShncm91cCwgdCkge1xuICBjb25zdCB7IGxhYmVsLCB2YWx1ZSB9ID0gZ3JvdXA7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHQoJ2NvbGxlY3Rpb24uZ3JvdXBzLm90aGVyJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlID8gbGFiZWwgOiB0KCdjb2xsZWN0aW9uLmdyb3Vwcy5uZWdhdGVMYWJlbCcsIHsgbGFiZWwgfSk7XG4gIH1cbiAgcmV0dXJuIGAke2xhYmVsfSAke3ZhbHVlfWAudHJpbSgpO1xufVxuXG5mdW5jdGlvbiB3aXRoR3JvdXBzKGdyb3VwcywgZW50cmllcywgRW50cmllc1RvUmVuZGVyLCB0KSB7XG4gIHJldHVybiBncm91cHMubWFwKGdyb3VwID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGdldEdyb3VwVGl0bGUoZ3JvdXAsIHQpO1xuICAgIHJldHVybiAoXG4gICAgICA8R3JvdXBDb250YWluZXIga2V5PXtncm91cC5pZH0gaWQ9e2dyb3VwLmlkfT5cbiAgICAgICAgPEdyb3VwSGVhZGluZz57dGl0bGV9PC9Hcm91cEhlYWRpbmc+XG4gICAgICAgIDxFbnRyaWVzVG9SZW5kZXIgZW50cmllcz17Z2V0R3JvdXBFbnRyaWVzKGVudHJpZXMsIGdyb3VwLnBhdGhzKX0gLz5cbiAgICAgIDwvR3JvdXBDb250YWluZXI+XG4gICAgKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBjbGFzcyBFbnRyaWVzQ29sbGVjdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29sbGVjdGlvbjogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgIHBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZW50cmllczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QsXG4gICAgZ3JvdXBzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaXNGZXRjaGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB2aWV3U3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3Vyc29yOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgbG9hZEVudHJpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdHJhdmVyc2VDb2xsZWN0aW9uQ3Vyc29yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGVudHJpZXNMb2FkZWQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbiwgZW50cmllc0xvYWRlZCwgbG9hZEVudHJpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNvbGxlY3Rpb24gJiYgIWVudHJpZXNMb2FkZWQpIHtcbiAgICAgIGxvYWRFbnRyaWVzKGNvbGxlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IGNvbGxlY3Rpb24sIGVudHJpZXNMb2FkZWQsIGxvYWRFbnRyaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChjb2xsZWN0aW9uICE9PSBwcmV2UHJvcHMuY29sbGVjdGlvbiAmJiAhZW50cmllc0xvYWRlZCkge1xuICAgICAgbG9hZEVudHJpZXMoY29sbGVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ3Vyc29yQWN0aW9ucyA9IChjdXJzb3IsIGFjdGlvbikgPT4ge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbiwgdHJhdmVyc2VDb2xsZWN0aW9uQ3Vyc29yIH0gPSB0aGlzLnByb3BzO1xuICAgIHRyYXZlcnNlQ29sbGVjdGlvbkN1cnNvcihjb2xsZWN0aW9uLCBhY3Rpb24pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNvbGxlY3Rpb24sIGVudHJpZXMsIGdyb3VwcywgaXNGZXRjaGluZywgdmlld1N0eWxlLCBjdXJzb3IsIHBhZ2UsIHQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBFbnRyaWVzVG9SZW5kZXIgPSAoeyBlbnRyaWVzIH0pID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFbnRyaWVzXG4gICAgICAgICAgY29sbGVjdGlvbnM9e2NvbGxlY3Rpb259XG4gICAgICAgICAgZW50cmllcz17ZW50cmllc31cbiAgICAgICAgICBpc0ZldGNoaW5nPXtpc0ZldGNoaW5nfVxuICAgICAgICAgIGNvbGxlY3Rpb25OYW1lPXtjb2xsZWN0aW9uLmdldCgnbGFiZWwnKX1cbiAgICAgICAgICB2aWV3U3R5bGU9e3ZpZXdTdHlsZX1cbiAgICAgICAgICBjdXJzb3I9e2N1cnNvcn1cbiAgICAgICAgICBoYW5kbGVDdXJzb3JBY3Rpb25zPXtwYXJ0aWFsKHRoaXMuaGFuZGxlQ3Vyc29yQWN0aW9ucywgY3Vyc29yKX1cbiAgICAgICAgICBwYWdlPXtwYWdlfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgaWYgKGdyb3VwcyAmJiBncm91cHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHdpdGhHcm91cHMoZ3JvdXBzLCBlbnRyaWVzLCBFbnRyaWVzVG9SZW5kZXIsIHQpO1xuICAgIH1cblxuICAgIHJldHVybiA8RW50cmllc1RvUmVuZGVyIGVudHJpZXM9e2VudHJpZXN9IC8+O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJOZXN0ZWRFbnRyaWVzKHBhdGgsIGNvbGxlY3Rpb25Gb2xkZXIsIGVudHJpZXMpIHtcbiAgY29uc3QgZmlsdGVyZWQgPSBlbnRyaWVzLmZpbHRlcihlID0+IHtcbiAgICBjb25zdCBlbnRyeVBhdGggPSBlLmdldCgncGF0aCcpLnNsaWNlKGNvbGxlY3Rpb25Gb2xkZXIubGVuZ3RoICsgMSk7XG4gICAgaWYgKCFlbnRyeVBhdGguc3RhcnRzV2l0aChwYXRoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIG9ubHkgc2hvdyBpbW1lZGlhdGUgY2hpbGRyZW5cbiAgICBpZiAocGF0aCkge1xuICAgICAgLy8gbm9uIHJvb3QgcGF0aFxuICAgICAgY29uc3QgdHJpbW1lZCA9IGVudHJ5UGF0aC5zbGljZShwYXRoLmxlbmd0aCArIDEpO1xuICAgICAgcmV0dXJuIHRyaW1tZWQuc3BsaXQoJy8nKS5sZW5ndGggPT09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJvb3QgcGF0aFxuICAgICAgcmV0dXJuIGVudHJ5UGF0aC5zcGxpdCgnLycpLmxlbmd0aCA8PSAyO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmaWx0ZXJlZDtcbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcykge1xuICBjb25zdCB7IGNvbGxlY3Rpb24sIHZpZXdTdHlsZSwgZmlsdGVyVGVybSB9ID0gb3duUHJvcHM7XG4gIGNvbnN0IHBhZ2UgPSBzdGF0ZS5lbnRyaWVzLmdldEluKFsncGFnZXMnLCBjb2xsZWN0aW9uLmdldCgnbmFtZScpLCAncGFnZSddKTtcblxuICBsZXQgZW50cmllcyA9IHNlbGVjdEVudHJpZXMoc3RhdGUuZW50cmllcywgY29sbGVjdGlvbik7XG4gIGNvbnN0IGdyb3VwcyA9IHNlbGVjdEdyb3VwcyhzdGF0ZS5lbnRyaWVzLCBjb2xsZWN0aW9uKTtcblxuICBpZiAoY29sbGVjdGlvbi5oYXMoJ25lc3RlZCcpKSB7XG4gICAgY29uc3QgY29sbGVjdGlvbkZvbGRlciA9IGNvbGxlY3Rpb24uZ2V0KCdmb2xkZXInKTtcbiAgICBlbnRyaWVzID0gZmlsdGVyTmVzdGVkRW50cmllcyhmaWx0ZXJUZXJtIHx8ICcnLCBjb2xsZWN0aW9uRm9sZGVyLCBlbnRyaWVzKTtcbiAgfVxuICBjb25zdCBlbnRyaWVzTG9hZGVkID0gc2VsZWN0RW50cmllc0xvYWRlZChzdGF0ZS5lbnRyaWVzLCBjb2xsZWN0aW9uLmdldCgnbmFtZScpKTtcbiAgY29uc3QgaXNGZXRjaGluZyA9IHNlbGVjdElzRmV0Y2hpbmcoc3RhdGUuZW50cmllcywgY29sbGVjdGlvbi5nZXQoJ25hbWUnKSk7XG5cbiAgY29uc3QgcmF3Q3Vyc29yID0gc2VsZWN0Q29sbGVjdGlvbkVudHJpZXNDdXJzb3Ioc3RhdGUuY3Vyc29ycywgY29sbGVjdGlvbi5nZXQoJ25hbWUnKSk7XG4gIGNvbnN0IGN1cnNvciA9IEN1cnNvci5jcmVhdGUocmF3Q3Vyc29yKS5jbGVhckRhdGEoKTtcblxuICByZXR1cm4geyBjb2xsZWN0aW9uLCBwYWdlLCBlbnRyaWVzLCBncm91cHMsIGVudHJpZXNMb2FkZWQsIGlzRmV0Y2hpbmcsIHZpZXdTdHlsZSwgY3Vyc29yIH07XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgbG9hZEVudHJpZXM6IGFjdGlvbkxvYWRFbnRyaWVzLFxuICB0cmF2ZXJzZUNvbGxlY3Rpb25DdXJzb3I6IGFjdGlvblRyYXZlcnNlQ29sbGVjdGlvbkN1cnNvcixcbn07XG5cbmNvbnN0IENvbm5lY3RlZEVudHJpZXNDb2xsZWN0aW9uID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoRW50cmllc0NvbGxlY3Rpb24pO1xuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2xhdGUoKShDb25uZWN0ZWRFbnRyaWVzQ29sbGVjdGlvbik7XG4iXX0= */"));
const GroupContainer = (0, _styledBase.default)("div", {
  target: "e5mmq7y1",
  label: "GroupContainer"
})(process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vRW50cmllcy9FbnRyaWVzQ29sbGVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QmlDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vRW50cmllcy9FbnRyaWVzQ29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICdyZWFjdC1wb2x5Z2xvdCc7XG5pbXBvcnQgeyBwYXJ0aWFsIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEN1cnNvciB9IGZyb20gJ25ldGxpZnktY21zLWxpYi11dGlsJztcbmltcG9ydCB7IGNvbG9ycyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5pbXBvcnQge1xuICBsb2FkRW50cmllcyBhcyBhY3Rpb25Mb2FkRW50cmllcyxcbiAgdHJhdmVyc2VDb2xsZWN0aW9uQ3Vyc29yIGFzIGFjdGlvblRyYXZlcnNlQ29sbGVjdGlvbkN1cnNvcixcbn0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9lbnRyaWVzJztcbmltcG9ydCB7XG4gIHNlbGVjdEVudHJpZXMsXG4gIHNlbGVjdEVudHJpZXNMb2FkZWQsXG4gIHNlbGVjdElzRmV0Y2hpbmcsXG4gIHNlbGVjdEdyb3Vwcyxcbn0gZnJvbSAnLi4vLi4vLi4vcmVkdWNlcnMvZW50cmllcyc7XG5pbXBvcnQgeyBzZWxlY3RDb2xsZWN0aW9uRW50cmllc0N1cnNvciB9IGZyb20gJy4uLy4uLy4uL3JlZHVjZXJzL2N1cnNvcnMnO1xuaW1wb3J0IEVudHJpZXMgZnJvbSAnLi9FbnRyaWVzJztcblxuY29uc3QgR3JvdXBIZWFkaW5nID0gc3R5bGVkLmgyYFxuICBmb250LXNpemU6IDIzcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAke2NvbG9ycy50ZXh0TGVhZH07XG5gO1xuXG5jb25zdCBHcm91cENvbnRhaW5lciA9IHN0eWxlZC5kaXZgYDtcblxuZnVuY3Rpb24gZ2V0R3JvdXBFbnRyaWVzKGVudHJpZXMsIHBhdGhzKSB7XG4gIHJldHVybiBlbnRyaWVzLmZpbHRlcihlbnRyeSA9PiBwYXRocy5oYXMoZW50cnkuZ2V0KCdwYXRoJykpKTtcbn1cblxuZnVuY3Rpb24gZ2V0R3JvdXBUaXRsZShncm91cCwgdCkge1xuICBjb25zdCB7IGxhYmVsLCB2YWx1ZSB9ID0gZ3JvdXA7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHQoJ2NvbGxlY3Rpb24uZ3JvdXBzLm90aGVyJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlID8gbGFiZWwgOiB0KCdjb2xsZWN0aW9uLmdyb3Vwcy5uZWdhdGVMYWJlbCcsIHsgbGFiZWwgfSk7XG4gIH1cbiAgcmV0dXJuIGAke2xhYmVsfSAke3ZhbHVlfWAudHJpbSgpO1xufVxuXG5mdW5jdGlvbiB3aXRoR3JvdXBzKGdyb3VwcywgZW50cmllcywgRW50cmllc1RvUmVuZGVyLCB0KSB7XG4gIHJldHVybiBncm91cHMubWFwKGdyb3VwID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGdldEdyb3VwVGl0bGUoZ3JvdXAsIHQpO1xuICAgIHJldHVybiAoXG4gICAgICA8R3JvdXBDb250YWluZXIga2V5PXtncm91cC5pZH0gaWQ9e2dyb3VwLmlkfT5cbiAgICAgICAgPEdyb3VwSGVhZGluZz57dGl0bGV9PC9Hcm91cEhlYWRpbmc+XG4gICAgICAgIDxFbnRyaWVzVG9SZW5kZXIgZW50cmllcz17Z2V0R3JvdXBFbnRyaWVzKGVudHJpZXMsIGdyb3VwLnBhdGhzKX0gLz5cbiAgICAgIDwvR3JvdXBDb250YWluZXI+XG4gICAgKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBjbGFzcyBFbnRyaWVzQ29sbGVjdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY29sbGVjdGlvbjogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICAgIHBhZ2U6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZW50cmllczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QsXG4gICAgZ3JvdXBzOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgaXNGZXRjaGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICB2aWV3U3R5bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY3Vyc29yOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgbG9hZEVudHJpZXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdHJhdmVyc2VDb2xsZWN0aW9uQ3Vyc29yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGVudHJpZXNMb2FkZWQ6IFByb3BUeXBlcy5ib29sLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbiwgZW50cmllc0xvYWRlZCwgbG9hZEVudHJpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNvbGxlY3Rpb24gJiYgIWVudHJpZXNMb2FkZWQpIHtcbiAgICAgIGxvYWRFbnRyaWVzKGNvbGxlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IGNvbGxlY3Rpb24sIGVudHJpZXNMb2FkZWQsIGxvYWRFbnRyaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChjb2xsZWN0aW9uICE9PSBwcmV2UHJvcHMuY29sbGVjdGlvbiAmJiAhZW50cmllc0xvYWRlZCkge1xuICAgICAgbG9hZEVudHJpZXMoY29sbGVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ3Vyc29yQWN0aW9ucyA9IChjdXJzb3IsIGFjdGlvbikgPT4ge1xuICAgIGNvbnN0IHsgY29sbGVjdGlvbiwgdHJhdmVyc2VDb2xsZWN0aW9uQ3Vyc29yIH0gPSB0aGlzLnByb3BzO1xuICAgIHRyYXZlcnNlQ29sbGVjdGlvbkN1cnNvcihjb2xsZWN0aW9uLCBhY3Rpb24pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNvbGxlY3Rpb24sIGVudHJpZXMsIGdyb3VwcywgaXNGZXRjaGluZywgdmlld1N0eWxlLCBjdXJzb3IsIHBhZ2UsIHQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBFbnRyaWVzVG9SZW5kZXIgPSAoeyBlbnRyaWVzIH0pID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFbnRyaWVzXG4gICAgICAgICAgY29sbGVjdGlvbnM9e2NvbGxlY3Rpb259XG4gICAgICAgICAgZW50cmllcz17ZW50cmllc31cbiAgICAgICAgICBpc0ZldGNoaW5nPXtpc0ZldGNoaW5nfVxuICAgICAgICAgIGNvbGxlY3Rpb25OYW1lPXtjb2xsZWN0aW9uLmdldCgnbGFiZWwnKX1cbiAgICAgICAgICB2aWV3U3R5bGU9e3ZpZXdTdHlsZX1cbiAgICAgICAgICBjdXJzb3I9e2N1cnNvcn1cbiAgICAgICAgICBoYW5kbGVDdXJzb3JBY3Rpb25zPXtwYXJ0aWFsKHRoaXMuaGFuZGxlQ3Vyc29yQWN0aW9ucywgY3Vyc29yKX1cbiAgICAgICAgICBwYWdlPXtwYWdlfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgaWYgKGdyb3VwcyAmJiBncm91cHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHdpdGhHcm91cHMoZ3JvdXBzLCBlbnRyaWVzLCBFbnRyaWVzVG9SZW5kZXIsIHQpO1xuICAgIH1cblxuICAgIHJldHVybiA8RW50cmllc1RvUmVuZGVyIGVudHJpZXM9e2VudHJpZXN9IC8+O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJOZXN0ZWRFbnRyaWVzKHBhdGgsIGNvbGxlY3Rpb25Gb2xkZXIsIGVudHJpZXMpIHtcbiAgY29uc3QgZmlsdGVyZWQgPSBlbnRyaWVzLmZpbHRlcihlID0+IHtcbiAgICBjb25zdCBlbnRyeVBhdGggPSBlLmdldCgncGF0aCcpLnNsaWNlKGNvbGxlY3Rpb25Gb2xkZXIubGVuZ3RoICsgMSk7XG4gICAgaWYgKCFlbnRyeVBhdGguc3RhcnRzV2l0aChwYXRoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIG9ubHkgc2hvdyBpbW1lZGlhdGUgY2hpbGRyZW5cbiAgICBpZiAocGF0aCkge1xuICAgICAgLy8gbm9uIHJvb3QgcGF0aFxuICAgICAgY29uc3QgdHJpbW1lZCA9IGVudHJ5UGF0aC5zbGljZShwYXRoLmxlbmd0aCArIDEpO1xuICAgICAgcmV0dXJuIHRyaW1tZWQuc3BsaXQoJy8nKS5sZW5ndGggPT09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJvb3QgcGF0aFxuICAgICAgcmV0dXJuIGVudHJ5UGF0aC5zcGxpdCgnLycpLmxlbmd0aCA8PSAyO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmaWx0ZXJlZDtcbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcykge1xuICBjb25zdCB7IGNvbGxlY3Rpb24sIHZpZXdTdHlsZSwgZmlsdGVyVGVybSB9ID0gb3duUHJvcHM7XG4gIGNvbnN0IHBhZ2UgPSBzdGF0ZS5lbnRyaWVzLmdldEluKFsncGFnZXMnLCBjb2xsZWN0aW9uLmdldCgnbmFtZScpLCAncGFnZSddKTtcblxuICBsZXQgZW50cmllcyA9IHNlbGVjdEVudHJpZXMoc3RhdGUuZW50cmllcywgY29sbGVjdGlvbik7XG4gIGNvbnN0IGdyb3VwcyA9IHNlbGVjdEdyb3VwcyhzdGF0ZS5lbnRyaWVzLCBjb2xsZWN0aW9uKTtcblxuICBpZiAoY29sbGVjdGlvbi5oYXMoJ25lc3RlZCcpKSB7XG4gICAgY29uc3QgY29sbGVjdGlvbkZvbGRlciA9IGNvbGxlY3Rpb24uZ2V0KCdmb2xkZXInKTtcbiAgICBlbnRyaWVzID0gZmlsdGVyTmVzdGVkRW50cmllcyhmaWx0ZXJUZXJtIHx8ICcnLCBjb2xsZWN0aW9uRm9sZGVyLCBlbnRyaWVzKTtcbiAgfVxuICBjb25zdCBlbnRyaWVzTG9hZGVkID0gc2VsZWN0RW50cmllc0xvYWRlZChzdGF0ZS5lbnRyaWVzLCBjb2xsZWN0aW9uLmdldCgnbmFtZScpKTtcbiAgY29uc3QgaXNGZXRjaGluZyA9IHNlbGVjdElzRmV0Y2hpbmcoc3RhdGUuZW50cmllcywgY29sbGVjdGlvbi5nZXQoJ25hbWUnKSk7XG5cbiAgY29uc3QgcmF3Q3Vyc29yID0gc2VsZWN0Q29sbGVjdGlvbkVudHJpZXNDdXJzb3Ioc3RhdGUuY3Vyc29ycywgY29sbGVjdGlvbi5nZXQoJ25hbWUnKSk7XG4gIGNvbnN0IGN1cnNvciA9IEN1cnNvci5jcmVhdGUocmF3Q3Vyc29yKS5jbGVhckRhdGEoKTtcblxuICByZXR1cm4geyBjb2xsZWN0aW9uLCBwYWdlLCBlbnRyaWVzLCBncm91cHMsIGVudHJpZXNMb2FkZWQsIGlzRmV0Y2hpbmcsIHZpZXdTdHlsZSwgY3Vyc29yIH07XG59XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgbG9hZEVudHJpZXM6IGFjdGlvbkxvYWRFbnRyaWVzLFxuICB0cmF2ZXJzZUNvbGxlY3Rpb25DdXJzb3I6IGFjdGlvblRyYXZlcnNlQ29sbGVjdGlvbkN1cnNvcixcbn07XG5cbmNvbnN0IENvbm5lY3RlZEVudHJpZXNDb2xsZWN0aW9uID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoRW50cmllc0NvbGxlY3Rpb24pO1xuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2xhdGUoKShDb25uZWN0ZWRFbnRyaWVzQ29sbGVjdGlvbik7XG4iXX0= */");

function getGroupEntries(entries, paths) {
  return entries.filter(entry => paths.has(entry.get('path')));
}

function getGroupTitle(group, t) {
  const {
    label,
    value
  } = group;

  if (value === undefined) {
    return t('collection.groups.other');
  }

  if (typeof value === 'boolean') {
    return value ? label : t('collection.groups.negateLabel', {
      label
    });
  }

  return `${label} ${value}`.trim();
}

function withGroups(groups, entries, EntriesToRender, t) {
  return groups.map(group => {
    const title = getGroupTitle(group, t);
    return (0, _core.jsx)(GroupContainer, {
      key: group.id,
      id: group.id
    }, (0, _core.jsx)(GroupHeading, null, title), (0, _core.jsx)(EntriesToRender, {
      entries: getGroupEntries(entries, group.paths)
    }));
  });
}

class EntriesCollection extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "handleCursorActions", (cursor, action) => {
      const {
        collection,
        traverseCollectionCursor
      } = this.props;
      traverseCollectionCursor(collection, action);
    });
  }

  componentDidMount() {
    const {
      collection,
      entriesLoaded,
      loadEntries
    } = this.props;

    if (collection && !entriesLoaded) {
      loadEntries(collection);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      collection,
      entriesLoaded,
      loadEntries
    } = this.props;

    if (collection !== prevProps.collection && !entriesLoaded) {
      loadEntries(collection);
    }
  }

  render() {
    const {
      collection,
      entries,
      groups,
      isFetching,
      viewStyle,
      cursor,
      page,
      t
    } = this.props;

    const EntriesToRender = _ref => {
      let {
        entries
      } = _ref;
      return (0, _core.jsx)(_Entries.default, {
        collections: collection,
        entries: entries,
        isFetching: isFetching,
        collectionName: collection.get('label'),
        viewStyle: viewStyle,
        cursor: cursor,
        handleCursorActions: (0, _partial2.default)(this.handleCursorActions, cursor),
        page: page
      });
    };

    if (groups && groups.length > 0) {
      return withGroups(groups, entries, EntriesToRender, t);
    }

    return (0, _core.jsx)(EntriesToRender, {
      entries: entries
    });
  }

}

exports.EntriesCollection = EntriesCollection;

_defineProperty(EntriesCollection, "propTypes", {
  collection: _reactImmutableProptypes.default.map.isRequired,
  page: _propTypes.default.number,
  entries: _reactImmutableProptypes.default.list,
  groups: _propTypes.default.array,
  isFetching: _propTypes.default.bool.isRequired,
  viewStyle: _propTypes.default.string,
  cursor: _propTypes.default.object.isRequired,
  loadEntries: _propTypes.default.func.isRequired,
  traverseCollectionCursor: _propTypes.default.func.isRequired,
  entriesLoaded: _propTypes.default.bool
});

function filterNestedEntries(path, collectionFolder, entries) {
  const filtered = entries.filter(e => {
    const entryPath = e.get('path').slice(collectionFolder.length + 1);

    if (!entryPath.startsWith(path)) {
      return false;
    } // only show immediate children


    if (path) {
      // non root path
      const trimmed = entryPath.slice(path.length + 1);
      return trimmed.split('/').length === 2;
    } else {
      // root path
      return entryPath.split('/').length <= 2;
    }
  });
  return filtered;
}

function mapStateToProps(state, ownProps) {
  const {
    collection,
    viewStyle,
    filterTerm
  } = ownProps;
  const page = state.entries.getIn(['pages', collection.get('name'), 'page']);
  let entries = (0, _entries2.selectEntries)(state.entries, collection);
  const groups = (0, _entries2.selectGroups)(state.entries, collection);

  if (collection.has('nested')) {
    const collectionFolder = collection.get('folder');
    entries = filterNestedEntries(filterTerm || '', collectionFolder, entries);
  }

  const entriesLoaded = (0, _entries2.selectEntriesLoaded)(state.entries, collection.get('name'));
  const isFetching = (0, _entries2.selectIsFetching)(state.entries, collection.get('name'));
  const rawCursor = (0, _cursors.selectCollectionEntriesCursor)(state.cursors, collection.get('name'));

  const cursor = _netlifyCmsLibUtil.Cursor.create(rawCursor).clearData();

  return {
    collection,
    page,
    entries,
    groups,
    entriesLoaded,
    isFetching,
    viewStyle,
    cursor
  };
}

const mapDispatchToProps = {
  loadEntries: _entries.loadEntries,
  traverseCollectionCursor: _entries.traverseCollectionCursor
};
const ConnectedEntriesCollection = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EntriesCollection);

var _default = (0, _reactPolyglot.translate)()(ConnectedEntriesCollection);

exports.default = _default;