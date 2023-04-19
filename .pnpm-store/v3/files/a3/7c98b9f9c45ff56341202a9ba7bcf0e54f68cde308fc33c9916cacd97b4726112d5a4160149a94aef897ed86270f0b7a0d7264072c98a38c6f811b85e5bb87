"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactPolyglot = require("react-polyglot");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _EntryListing = _interopRequireDefault(require("./EntryListing"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const PaginationMessage = (0, _styledBase.default)("div", {
  target: "e18jbcla0",
  label: "PaginationMessage"
})("width:", _netlifyCmsUiDefault.lengths.topCardWidth, ";padding:16px;text-align:center;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vRW50cmllcy9FbnRyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNvQyIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uL0VudHJpZXMvRW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJ3JlYWN0LXBvbHlnbG90JztcbmltcG9ydCB7IExvYWRlciwgbGVuZ3RocyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5pbXBvcnQgRW50cnlMaXN0aW5nIGZyb20gJy4vRW50cnlMaXN0aW5nJztcblxuY29uc3QgUGFnaW5hdGlvbk1lc3NhZ2UgPSBzdHlsZWQuZGl2YFxuICB3aWR0aDogJHtsZW5ndGhzLnRvcENhcmRXaWR0aH07XG4gIHBhZGRpbmc6IDE2cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbmA7XG5cbmNvbnN0IE5vRW50cmllc01lc3NhZ2UgPSBzdHlsZWQoUGFnaW5hdGlvbk1lc3NhZ2UpYFxuICBtYXJnaW4tdG9wOiAxNnB4O1xuYDtcblxuZnVuY3Rpb24gRW50cmllcyh7XG4gIGNvbGxlY3Rpb25zLFxuICBlbnRyaWVzLFxuICBpc0ZldGNoaW5nLFxuICB2aWV3U3R5bGUsXG4gIGN1cnNvcixcbiAgaGFuZGxlQ3Vyc29yQWN0aW9ucyxcbiAgdCxcbiAgcGFnZSxcbn0pIHtcbiAgY29uc3QgbG9hZGluZ01lc3NhZ2VzID0gW1xuICAgIHQoJ2NvbGxlY3Rpb24uZW50cmllcy5sb2FkaW5nRW50cmllcycpLFxuICAgIHQoJ2NvbGxlY3Rpb24uZW50cmllcy5jYWNoaW5nRW50cmllcycpLFxuICAgIHQoJ2NvbGxlY3Rpb24uZW50cmllcy5sb25nZXJMb2FkaW5nJyksXG4gIF07XG5cbiAgaWYgKGlzRmV0Y2hpbmcgJiYgcGFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIDxMb2FkZXIgYWN0aXZlPntsb2FkaW5nTWVzc2FnZXN9PC9Mb2FkZXI+O1xuICB9XG5cbiAgY29uc3QgaGFzRW50cmllcyA9IChlbnRyaWVzICYmIGVudHJpZXMuc2l6ZSA+IDApIHx8IGN1cnNvcj8uYWN0aW9ucz8uaGFzKCdhcHBlbmRfbmV4dCcpO1xuICBpZiAoaGFzRW50cmllcykge1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8RW50cnlMaXN0aW5nXG4gICAgICAgICAgY29sbGVjdGlvbnM9e2NvbGxlY3Rpb25zfVxuICAgICAgICAgIGVudHJpZXM9e2VudHJpZXN9XG4gICAgICAgICAgdmlld1N0eWxlPXt2aWV3U3R5bGV9XG4gICAgICAgICAgY3Vyc29yPXtjdXJzb3J9XG4gICAgICAgICAgaGFuZGxlQ3Vyc29yQWN0aW9ucz17aGFuZGxlQ3Vyc29yQWN0aW9uc31cbiAgICAgICAgICBwYWdlPXtwYWdlfVxuICAgICAgICAvPlxuICAgICAgICB7aXNGZXRjaGluZyAmJiBwYWdlICE9PSB1bmRlZmluZWQgJiYgZW50cmllcy5zaXplID4gMCA/IChcbiAgICAgICAgICA8UGFnaW5hdGlvbk1lc3NhZ2U+e3QoJ2NvbGxlY3Rpb24uZW50cmllcy5sb2FkaW5nRW50cmllcycpfTwvUGFnaW5hdGlvbk1lc3NhZ2U+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiA8Tm9FbnRyaWVzTWVzc2FnZT57dCgnY29sbGVjdGlvbi5lbnRyaWVzLm5vRW50cmllcycpfTwvTm9FbnRyaWVzTWVzc2FnZT47XG59XG5cbkVudHJpZXMucHJvcFR5cGVzID0ge1xuICBjb2xsZWN0aW9uczogSW1tdXRhYmxlUHJvcFR5cGVzLml0ZXJhYmxlLmlzUmVxdWlyZWQsXG4gIGVudHJpZXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LFxuICBwYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpc0ZldGNoaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgdmlld1N0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjdXJzb3I6IFByb3BUeXBlcy5hbnkuaXNSZXF1aXJlZCxcbiAgaGFuZGxlQ3Vyc29yQWN0aW9uczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zbGF0ZSgpKEVudHJpZXMpO1xuIl19 */"));
const NoEntriesMessage = ( /*#__PURE__*/0, _styledBase.default)(PaginationMessage, {
  target: "e18jbcla1",
  label: "NoEntriesMessage"
})(process.env.NODE_ENV === "production" ? {
  name: "1yuhvjn",
  styles: "margin-top:16px;"
} : {
  name: "1yuhvjn",
  styles: "margin-top:16px;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb24vRW50cmllcy9FbnRyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVrRCIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uL0VudHJpZXMvRW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IEltbXV0YWJsZVByb3BUeXBlcyBmcm9tICdyZWFjdC1pbW11dGFibGUtcHJvcHR5cGVzJztcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJ3JlYWN0LXBvbHlnbG90JztcbmltcG9ydCB7IExvYWRlciwgbGVuZ3RocyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5pbXBvcnQgRW50cnlMaXN0aW5nIGZyb20gJy4vRW50cnlMaXN0aW5nJztcblxuY29uc3QgUGFnaW5hdGlvbk1lc3NhZ2UgPSBzdHlsZWQuZGl2YFxuICB3aWR0aDogJHtsZW5ndGhzLnRvcENhcmRXaWR0aH07XG4gIHBhZGRpbmc6IDE2cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbmA7XG5cbmNvbnN0IE5vRW50cmllc01lc3NhZ2UgPSBzdHlsZWQoUGFnaW5hdGlvbk1lc3NhZ2UpYFxuICBtYXJnaW4tdG9wOiAxNnB4O1xuYDtcblxuZnVuY3Rpb24gRW50cmllcyh7XG4gIGNvbGxlY3Rpb25zLFxuICBlbnRyaWVzLFxuICBpc0ZldGNoaW5nLFxuICB2aWV3U3R5bGUsXG4gIGN1cnNvcixcbiAgaGFuZGxlQ3Vyc29yQWN0aW9ucyxcbiAgdCxcbiAgcGFnZSxcbn0pIHtcbiAgY29uc3QgbG9hZGluZ01lc3NhZ2VzID0gW1xuICAgIHQoJ2NvbGxlY3Rpb24uZW50cmllcy5sb2FkaW5nRW50cmllcycpLFxuICAgIHQoJ2NvbGxlY3Rpb24uZW50cmllcy5jYWNoaW5nRW50cmllcycpLFxuICAgIHQoJ2NvbGxlY3Rpb24uZW50cmllcy5sb25nZXJMb2FkaW5nJyksXG4gIF07XG5cbiAgaWYgKGlzRmV0Y2hpbmcgJiYgcGFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIDxMb2FkZXIgYWN0aXZlPntsb2FkaW5nTWVzc2FnZXN9PC9Mb2FkZXI+O1xuICB9XG5cbiAgY29uc3QgaGFzRW50cmllcyA9IChlbnRyaWVzICYmIGVudHJpZXMuc2l6ZSA+IDApIHx8IGN1cnNvcj8uYWN0aW9ucz8uaGFzKCdhcHBlbmRfbmV4dCcpO1xuICBpZiAoaGFzRW50cmllcykge1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8RW50cnlMaXN0aW5nXG4gICAgICAgICAgY29sbGVjdGlvbnM9e2NvbGxlY3Rpb25zfVxuICAgICAgICAgIGVudHJpZXM9e2VudHJpZXN9XG4gICAgICAgICAgdmlld1N0eWxlPXt2aWV3U3R5bGV9XG4gICAgICAgICAgY3Vyc29yPXtjdXJzb3J9XG4gICAgICAgICAgaGFuZGxlQ3Vyc29yQWN0aW9ucz17aGFuZGxlQ3Vyc29yQWN0aW9uc31cbiAgICAgICAgICBwYWdlPXtwYWdlfVxuICAgICAgICAvPlxuICAgICAgICB7aXNGZXRjaGluZyAmJiBwYWdlICE9PSB1bmRlZmluZWQgJiYgZW50cmllcy5zaXplID4gMCA/IChcbiAgICAgICAgICA8UGFnaW5hdGlvbk1lc3NhZ2U+e3QoJ2NvbGxlY3Rpb24uZW50cmllcy5sb2FkaW5nRW50cmllcycpfTwvUGFnaW5hdGlvbk1lc3NhZ2U+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiA8Tm9FbnRyaWVzTWVzc2FnZT57dCgnY29sbGVjdGlvbi5lbnRyaWVzLm5vRW50cmllcycpfTwvTm9FbnRyaWVzTWVzc2FnZT47XG59XG5cbkVudHJpZXMucHJvcFR5cGVzID0ge1xuICBjb2xsZWN0aW9uczogSW1tdXRhYmxlUHJvcFR5cGVzLml0ZXJhYmxlLmlzUmVxdWlyZWQsXG4gIGVudHJpZXM6IEltbXV0YWJsZVByb3BUeXBlcy5saXN0LFxuICBwYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpc0ZldGNoaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgdmlld1N0eWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjdXJzb3I6IFByb3BUeXBlcy5hbnkuaXNSZXF1aXJlZCxcbiAgaGFuZGxlQ3Vyc29yQWN0aW9uczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zbGF0ZSgpKEVudHJpZXMpO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

function Entries(_ref) {
  var _cursor$actions;

  let {
    collections,
    entries,
    isFetching,
    viewStyle,
    cursor,
    handleCursorActions,
    t,
    page
  } = _ref;
  const loadingMessages = [t('collection.entries.loadingEntries'), t('collection.entries.cachingEntries'), t('collection.entries.longerLoading')];

  if (isFetching && page === undefined) {
    return (0, _core.jsx)(_netlifyCmsUiDefault.Loader, {
      active: true
    }, loadingMessages);
  }

  const hasEntries = entries && entries.size > 0 || (cursor === null || cursor === void 0 ? void 0 : (_cursor$actions = cursor.actions) === null || _cursor$actions === void 0 ? void 0 : _cursor$actions.has('append_next'));

  if (hasEntries) {
    return (0, _core.jsx)(_react.default.Fragment, null, (0, _core.jsx)(_EntryListing.default, {
      collections: collections,
      entries: entries,
      viewStyle: viewStyle,
      cursor: cursor,
      handleCursorActions: handleCursorActions,
      page: page
    }), isFetching && page !== undefined && entries.size > 0 ? (0, _core.jsx)(PaginationMessage, null, t('collection.entries.loadingEntries')) : null);
  }

  return (0, _core.jsx)(NoEntriesMessage, null, t('collection.entries.noEntries'));
}

Entries.propTypes = {
  collections: _reactImmutableProptypes.default.iterable.isRequired,
  entries: _reactImmutableProptypes.default.list,
  page: _propTypes.default.number,
  isFetching: _propTypes.default.bool,
  viewStyle: _propTypes.default.string,
  cursor: _propTypes.default.any.isRequired,
  handleCursorActions: _propTypes.default.func.isRequired,
  t: _propTypes.default.func.isRequired
};

var _default = (0, _reactPolyglot.translate)()(Entries);

exports.default = _default;