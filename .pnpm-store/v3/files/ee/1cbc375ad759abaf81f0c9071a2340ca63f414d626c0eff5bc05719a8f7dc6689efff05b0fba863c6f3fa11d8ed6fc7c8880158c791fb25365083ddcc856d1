"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@emotion/core");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function InsertionPoint(props) {
  return (0, _core.jsx)("div", _extends({
    css: /*#__PURE__*/(0, _core.css)("height:32px;cursor:text;position:relative;z-index:", _netlifyCmsUiDefault.zIndex.zIndex1, ";margin-top:-16px;;label:InsertionPoint;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvY29tcG9uZW50cy9Wb2lkQmxvY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUWMiLCJmaWxlIjoiLi4vLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9jb21wb25lbnRzL1ZvaWRCbG9jay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7IHpJbmRleCB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuXG5mdW5jdGlvbiBJbnNlcnRpb25Qb2ludChwcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17Y3NzYFxuICAgICAgICBoZWlnaHQ6IDMycHg7XG4gICAgICAgIGN1cnNvcjogdGV4dDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB6LWluZGV4OiAke3pJbmRleC56SW5kZXgxfTtcbiAgICAgICAgbWFyZ2luLXRvcDogLTE2cHg7XG4gICAgICBgfVxuICAgICAgey4uLnByb3BzfVxuICAgIC8+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFZvaWRCbG9jayh7IGVkaXRvciwgYXR0cmlidXRlcywgbm9kZSwgY2hpbGRyZW4gfSkge1xuICBmdW5jdGlvbiBoYW5kbGVDbGljayhldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHsuLi5hdHRyaWJ1dGVzfSBvbkNsaWNrPXtoYW5kbGVDbGlja30+XG4gICAgICB7IWVkaXRvci5jYW5JbnNlcnRCZWZvcmVOb2RlKG5vZGUpICYmIChcbiAgICAgICAgPEluc2VydGlvblBvaW50IG9uQ2xpY2s9eygpID0+IGVkaXRvci5mb3JjZUluc2VydEJlZm9yZU5vZGUobm9kZSl9IC8+XG4gICAgICApfVxuICAgICAge2NoaWxkcmVufVxuICAgICAgeyFlZGl0b3IuY2FuSW5zZXJ0QWZ0ZXJOb2RlKG5vZGUpICYmIChcbiAgICAgICAgPEluc2VydGlvblBvaW50IG9uQ2xpY2s9eygpID0+IGVkaXRvci5mb3JjZUluc2VydEFmdGVyTm9kZShub2RlKX0gLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZvaWRCbG9jaztcbiJdfQ== */"))
  }, props));
}

function VoidBlock(_ref) {
  let {
    editor,
    attributes,
    node,
    children
  } = _ref;

  function handleClick(event) {
    event.stopPropagation();
  }

  return (0, _core.jsx)("div", _extends({}, attributes, {
    onClick: handleClick
  }), !editor.canInsertBeforeNode(node) && (0, _core.jsx)(InsertionPoint, {
    onClick: () => editor.forceInsertBeforeNode(node)
  }), children, !editor.canInsertAfterNode(node) && (0, _core.jsx)(InsertionPoint, {
    onClick: () => editor.forceInsertAfterNode(node)
  }));
}

var _default = VoidBlock;
exports.default = _default;