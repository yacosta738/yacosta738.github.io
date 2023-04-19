"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _reactModal = _interopRequireDefault(require("react-modal"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var _ref = process.env.NODE_ENV === "production" ? {
  name: "1o9c9d2-ReactModalGlobalStyles",
  styles: ".ReactModal__Body--open{overflow:hidden;};label:ReactModalGlobalStyles;"
} : {
  name: "1o9c9d2-ReactModalGlobalStyles",
  styles: ".ReactModal__Body--open{overflow:hidden;};label:ReactModalGlobalStyles;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL01vZGFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNpQiIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9Nb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY3NzLCBHbG9iYWwsIENsYXNzTmFtZXMgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCBSZWFjdE1vZGFsIGZyb20gJ3JlYWN0LW1vZGFsJztcbmltcG9ydCB7IHRyYW5zaXRpb25zLCBzaGFkb3dzLCBsZW5ndGhzLCB6SW5kZXggfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuZnVuY3Rpb24gUmVhY3RNb2RhbEdsb2JhbFN0eWxlcygpIHtcbiAgcmV0dXJuIChcbiAgICA8R2xvYmFsXG4gICAgICBzdHlsZXM9e2Nzc2BcbiAgICAgICAgLlJlYWN0TW9kYWxfX0JvZHktLW9wZW4ge1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIH1cbiAgICAgIGB9XG4gICAgLz5cbiAgKTtcbn1cblxuY29uc3Qgc3R5bGVTdHJpbmdzID0ge1xuICBtb2RhbEJvZHk6IGBcbiAgICAke3NoYWRvd3MuZHJvcERlZXB9O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogJHtsZW5ndGhzLmJvcmRlclJhZGl1c307XG4gICAgaGVpZ2h0OiA4MCU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1heC13aWR0aDogMjIwMHB4O1xuICAgIHBhZGRpbmc6IDIwcHg7XG5cbiAgICAmOmZvY3VzIHtcbiAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuICBgLFxuICBvdmVybGF5OiBgXG4gICAgei1pbmRleDogJHt6SW5kZXguekluZGV4OTk5OTl9O1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG9wYWNpdHk6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yICR7dHJhbnNpdGlvbnMubWFpbn0sIG9wYWNpdHkgJHt0cmFuc2l0aW9ucy5tYWlufTtcbiAgYCxcbiAgb3ZlcmxheUFmdGVyT3BlbjogYFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcbiAgICBvcGFjaXR5OiAxO1xuICBgLFxuICBvdmVybGF5QmVmb3JlQ2xvc2U6IGBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xuICAgIG9wYWNpdHk6IDA7XG4gIGAsXG59O1xuXG5leHBvcnQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgIGlzT3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBSZWFjdE1vZGFsLnNldEFwcEVsZW1lbnQoJyNuYy1yb290Jyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpc09wZW4sIGNoaWxkcmVuLCBjbGFzc05hbWUsIG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxSZWFjdE1vZGFsR2xvYmFsU3R5bGVzIC8+XG4gICAgICAgIDxDbGFzc05hbWVzPlxuICAgICAgICAgIHsoeyBjc3MsIGN4IH0pID0+IChcbiAgICAgICAgICAgIDxSZWFjdE1vZGFsXG4gICAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgICAgICBvblJlcXVlc3RDbG9zZT17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xvc2VUaW1lb3V0TVM9ezMwMH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXt7XG4gICAgICAgICAgICAgICAgYmFzZTogY3goXG4gICAgICAgICAgICAgICAgICBjc3NgXG4gICAgICAgICAgICAgICAgICAgICR7c3R5bGVTdHJpbmdzLm1vZGFsQm9keX07XG4gICAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgYWZ0ZXJPcGVuOiAnJyxcbiAgICAgICAgICAgICAgICBiZWZvcmVDbG9zZTogJycsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIG92ZXJsYXlDbGFzc05hbWU9e3tcbiAgICAgICAgICAgICAgICBiYXNlOiBjc3NgXG4gICAgICAgICAgICAgICAgICAke3N0eWxlU3RyaW5ncy5vdmVybGF5fTtcbiAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICAgIGFmdGVyT3BlbjogY3NzYFxuICAgICAgICAgICAgICAgICAgJHtzdHlsZVN0cmluZ3Mub3ZlcmxheUFmdGVyT3Blbn07XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgICBiZWZvcmVDbG9zZTogY3NzYFxuICAgICAgICAgICAgICAgICAgJHtzdHlsZVN0cmluZ3Mub3ZlcmxheUJlZm9yZUNsb3NlfTtcbiAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L1JlYWN0TW9kYWw+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DbGFzc05hbWVzPlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxufVxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

function ReactModalGlobalStyles() {
  return (0, _core.jsx)(_core.Global, {
    styles: _ref
  });
}

const styleStrings = {
  modalBody: `
    ${_netlifyCmsUiDefault.shadows.dropDeep};
    background-color: #fff;
    border-radius: ${_netlifyCmsUiDefault.lengths.borderRadius};
    height: 80%;
    text-align: center;
    max-width: 2200px;
    padding: 20px;

    &:focus {
      outline: none;
    }
  `,
  overlay: `
    z-index: ${_netlifyCmsUiDefault.zIndex.zIndex99999};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color ${_netlifyCmsUiDefault.transitions.main}, opacity ${_netlifyCmsUiDefault.transitions.main};
  `,
  overlayAfterOpen: `
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
  `,
  overlayBeforeClose: `
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;
  `
};

class Modal extends _react.default.Component {
  componentDidMount() {
    _reactModal.default.setAppElement('#nc-root');
  }

  render() {
    const {
      isOpen,
      children,
      className,
      onClose
    } = this.props;
    return (0, _core.jsx)(_react.default.Fragment, null, (0, _core.jsx)(ReactModalGlobalStyles, null), (0, _core.jsx)(_core.ClassNames, null, _ref2 => {
      let {
        css,
        cx
      } = _ref2;
      return (0, _core.jsx)(_reactModal.default, {
        isOpen: isOpen,
        onRequestClose: onClose,
        closeTimeoutMS: 300,
        className: {
          base: cx(css`
                    ${styleStrings.modalBody};
                  `, className),
          afterOpen: '',
          beforeClose: ''
        },
        overlayClassName: {
          base: css`
                  ${styleStrings.overlay};
                `,
          afterOpen: css`
                  ${styleStrings.overlayAfterOpen};
                `,
          beforeClose: css`
                  ${styleStrings.overlayBeforeClose};
                `
        }
      }, children);
    }));
  }

}

exports.Modal = Modal;

_defineProperty(Modal, "propTypes", {
  children: _propTypes.default.node.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  className: _propTypes.default.string,
  onClose: _propTypes.default.func.isRequired
});