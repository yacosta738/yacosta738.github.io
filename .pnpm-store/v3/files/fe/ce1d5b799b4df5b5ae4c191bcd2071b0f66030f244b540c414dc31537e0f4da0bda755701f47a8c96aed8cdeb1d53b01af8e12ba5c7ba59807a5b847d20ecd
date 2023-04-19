"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _ViewStyleControl = _interopRequireDefault(require("./ViewStyleControl"));

var _SortControl = _interopRequireDefault(require("./SortControl"));

var _FilterControl = _interopRequireDefault(require("./FilterControl"));

var _GroupControl = _interopRequireDefault(require("./GroupControl"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CollectionControlsContainer = (0, _styledBase.default)("div", {
  target: "e17kb5zm0",
  label: "CollectionControlsContainer"
})("display:flex;align-items:center;flex-direction:row-reverse;margin-top:22px;width:", _netlifyCmsUiDefault.lengths.topCardWidth, ";max-width:100%;& > div{margin-left:6px;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vQ29sbGVjdGlvbkNvbnRyb2xzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVM4QyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uL0NvbGxlY3Rpb25Db250cm9scy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBsZW5ndGhzIH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmltcG9ydCBWaWV3U3R5bGVDb250cm9sIGZyb20gJy4vVmlld1N0eWxlQ29udHJvbCc7XG5pbXBvcnQgU29ydENvbnRyb2wgZnJvbSAnLi9Tb3J0Q29udHJvbCc7XG5pbXBvcnQgRmlsdGVyQ29udHJvbCBmcm9tICcuL0ZpbHRlckNvbnRyb2wnO1xuaW1wb3J0IEdyb3VwQ29udHJvbCBmcm9tICcuL0dyb3VwQ29udHJvbCc7XG5cbmNvbnN0IENvbGxlY3Rpb25Db250cm9sc0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgbWFyZ2luLXRvcDogMjJweDtcbiAgd2lkdGg6ICR7bGVuZ3Rocy50b3BDYXJkV2lkdGh9O1xuICBtYXgtd2lkdGg6IDEwMCU7XG5cbiAgJiA+IGRpdiB7XG4gICAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgfVxuYDtcblxuZnVuY3Rpb24gQ29sbGVjdGlvbkNvbnRyb2xzKHtcbiAgdmlld1N0eWxlLFxuICBvbkNoYW5nZVZpZXdTdHlsZSxcbiAgc29ydGFibGVGaWVsZHMsXG4gIG9uU29ydENsaWNrLFxuICBzb3J0LFxuICB2aWV3RmlsdGVycyxcbiAgdmlld0dyb3VwcyxcbiAgb25GaWx0ZXJDbGljayxcbiAgb25Hcm91cENsaWNrLFxuICB0LFxuICBmaWx0ZXIsXG4gIGdyb3VwLFxufSkge1xuICByZXR1cm4gKFxuICAgIDxDb2xsZWN0aW9uQ29udHJvbHNDb250YWluZXI+XG4gICAgICA8Vmlld1N0eWxlQ29udHJvbCB2aWV3U3R5bGU9e3ZpZXdTdHlsZX0gb25DaGFuZ2VWaWV3U3R5bGU9e29uQ2hhbmdlVmlld1N0eWxlfSAvPlxuICAgICAge3ZpZXdHcm91cHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxHcm91cENvbnRyb2wgdmlld0dyb3Vwcz17dmlld0dyb3Vwc30gb25Hcm91cENsaWNrPXtvbkdyb3VwQ2xpY2t9IHQ9e3R9IGdyb3VwPXtncm91cH0gLz5cbiAgICAgICl9XG4gICAgICB7dmlld0ZpbHRlcnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxGaWx0ZXJDb250cm9sXG4gICAgICAgICAgdmlld0ZpbHRlcnM9e3ZpZXdGaWx0ZXJzfVxuICAgICAgICAgIG9uRmlsdGVyQ2xpY2s9e29uRmlsdGVyQ2xpY2t9XG4gICAgICAgICAgdD17dH1cbiAgICAgICAgICBmaWx0ZXI9e2ZpbHRlcn1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7c29ydGFibGVGaWVsZHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxTb3J0Q29udHJvbCBmaWVsZHM9e3NvcnRhYmxlRmllbGRzfSBzb3J0PXtzb3J0fSBvblNvcnRDbGljaz17b25Tb3J0Q2xpY2t9IC8+XG4gICAgICApfVxuICAgIDwvQ29sbGVjdGlvbkNvbnRyb2xzQ29udGFpbmVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uQ29udHJvbHM7XG4iXX0= */"));

function CollectionControls(_ref) {
  let {
    viewStyle,
    onChangeViewStyle,
    sortableFields,
    onSortClick,
    sort,
    viewFilters,
    viewGroups,
    onFilterClick,
    onGroupClick,
    t,
    filter,
    group
  } = _ref;
  return (0, _core.jsx)(CollectionControlsContainer, null, (0, _core.jsx)(_ViewStyleControl.default, {
    viewStyle: viewStyle,
    onChangeViewStyle: onChangeViewStyle
  }), viewGroups.length > 0 && (0, _core.jsx)(_GroupControl.default, {
    viewGroups: viewGroups,
    onGroupClick: onGroupClick,
    t: t,
    group: group
  }), viewFilters.length > 0 && (0, _core.jsx)(_FilterControl.default, {
    viewFilters: viewFilters,
    onFilterClick: onFilterClick,
    t: t,
    filter: filter
  }), sortableFields.length > 0 && (0, _core.jsx)(_SortControl.default, {
    fields: sortableFields,
    sort: sort,
    onSortClick: onSortClick
  }));
}

var _default = CollectionControls;
exports.default = _default;