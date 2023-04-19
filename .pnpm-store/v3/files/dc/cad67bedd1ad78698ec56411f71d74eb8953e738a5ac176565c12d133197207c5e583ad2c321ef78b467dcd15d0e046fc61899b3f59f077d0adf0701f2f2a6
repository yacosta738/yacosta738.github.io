"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _core = require("@emotion/core");

var _slate = require("slate");

var _slateReact = require("slate-react");

var _slatePlainSerializer = _interopRequireDefault(require("slate-plain-serializer"));

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _serializers = require("../serializers");

var _styles = require("../styles");

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

function rawEditorStyles(_ref) {
  let {
    minimal
  } = _ref;
  return `
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  min-height: ${minimal ? 'auto' : _netlifyCmsUiDefault.lengths.richTextEditorMinHeight};
  font-family: ${_netlifyCmsUiDefault.fonts.mono};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
  margin-top: -${_styles.editorStyleVars.stickyDistanceBottom};
`;
}

const RawEditorContainer = (0, _styledBase.default)("div", {
  target: "er7tv020",
  label: "RawEditorContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "79elbk",
  styles: "position:relative;"
} : {
  name: "79elbk",
  styles: "position:relative;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvUmF3RWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThCcUMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9SYXdFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDbGFzc05hbWVzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBWYWx1ZSB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRvciBhcyBTbGF0ZSwgc2V0RXZlbnRUcmFuc2ZlciB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCBQbGFpbiBmcm9tICdzbGF0ZS1wbGFpbi1zZXJpYWxpemVyJztcbmltcG9ydCBpc0hvdGtleSBmcm9tICdpcy1ob3RrZXknO1xuaW1wb3J0IHsgbGVuZ3RocywgZm9udHMgfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuaW1wb3J0IHsgbWFya2Rvd25Ub0h0bWwgfSBmcm9tICcuLi9zZXJpYWxpemVycyc7XG5pbXBvcnQgeyBlZGl0b3JTdHlsZVZhcnMsIEVkaXRvckNvbnRyb2xCYXIgfSBmcm9tICcuLi9zdHlsZXMnO1xuaW1wb3J0IFRvb2xiYXIgZnJvbSAnLi9Ub29sYmFyJztcblxuZnVuY3Rpb24gcmF3RWRpdG9yU3R5bGVzKHsgbWluaW1hbCB9KSB7XG4gIHJldHVybiBgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgb3ZlcmZsb3cteDogYXV0bztcbiAgbWluLWhlaWdodDogJHttaW5pbWFsID8gJ2F1dG8nIDogbGVuZ3Rocy5yaWNoVGV4dEVkaXRvck1pbkhlaWdodH07XG4gIGZvbnQtZmFtaWx5OiAke2ZvbnRzLm1vbm99O1xuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcbiAgYm9yZGVyLXRvcDogMDtcbiAgbWFyZ2luLXRvcDogLSR7ZWRpdG9yU3R5bGVWYXJzLnN0aWNreURpc3RhbmNlQm90dG9tfTtcbmA7XG59XG5cbmNvbnN0IFJhd0VkaXRvckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhd0VkaXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2YWx1ZTogUGxhaW4uZGVzZXJpYWxpemUodGhpcy5wcm9wcy52YWx1ZSB8fCAnJyksXG4gICAgfTtcbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiAoXG4gICAgICAhdGhpcy5zdGF0ZS52YWx1ZS5lcXVhbHMobmV4dFN0YXRlLnZhbHVlKSB8fFxuICAgICAgbmV4dFByb3BzLnZhbHVlICE9PSBQbGFpbi5zZXJpYWxpemUobmV4dFN0YXRlLnZhbHVlKVxuICAgICk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgaWYgKHByZXZQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy52YWx1ZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBQbGFpbi5kZXNlcmlhbGl6ZSh0aGlzLnByb3BzLnZhbHVlKSB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wZW5kaW5nRm9jdXMpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgICB0aGlzLnByb3BzLnBlbmRpbmdGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvcHkgPSAoZXZlbnQsIGVkaXRvcikgPT4ge1xuICAgIGNvbnN0IHsgZ2V0QXNzZXQsIHJlc29sdmVXaWRnZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWFya2Rvd24gPSBQbGFpbi5zZXJpYWxpemUoVmFsdWUuY3JlYXRlKHsgZG9jdW1lbnQ6IGVkaXRvci52YWx1ZS5mcmFnbWVudCB9KSk7XG4gICAgY29uc3QgaHRtbCA9IG1hcmtkb3duVG9IdG1sKG1hcmtkb3duLCB7IGdldEFzc2V0LCByZXNvbHZlV2lkZ2V0IH0pO1xuICAgIHNldEV2ZW50VHJhbnNmZXIoZXZlbnQsICd0ZXh0JywgbWFya2Rvd24pO1xuICAgIHNldEV2ZW50VHJhbnNmZXIoZXZlbnQsICdodG1sJywgaHRtbCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfTtcblxuICBoYW5kbGVDdXQgPSAoZXZlbnQsIGVkaXRvciwgbmV4dCkgPT4ge1xuICAgIHRoaXMuaGFuZGxlQ29weShldmVudCwgZWRpdG9yLCBuZXh0KTtcbiAgICBlZGl0b3IuZGVsZXRlKCk7XG4gIH07XG5cbiAgaGFuZGxlUGFzdGUgPSAoZXZlbnQsIGVkaXRvciwgbmV4dCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZGF0YSA9IGV2ZW50LmNsaXBib2FyZERhdGE7XG4gICAgaWYgKGlzSG90a2V5KCdzaGlmdCcsIGV2ZW50KSkge1xuICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IFBsYWluLmRlc2VyaWFsaXplKGRhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpKTtcbiAgICByZXR1cm4gZWRpdG9yLmluc2VydEZyYWdtZW50KHZhbHVlLmRvY3VtZW50KTtcbiAgfTtcblxuICBoYW5kbGVDaGFuZ2UgPSBlZGl0b3IgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS52YWx1ZS5kb2N1bWVudC5lcXVhbHMoZWRpdG9yLnZhbHVlLmRvY3VtZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVEb2N1bWVudENoYW5nZShlZGl0b3IpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGVkaXRvci52YWx1ZSB9KTtcbiAgfTtcblxuICAvKipcbiAgICogV2hlbiB0aGUgZG9jdW1lbnQgdmFsdWUgY2hhbmdlcywgc2VyaWFsaXplIGZyb20gU2xhdGUncyBBU1QgYmFjayB0byBwbGFpblxuICAgKiB0ZXh0ICh3aGljaCBpcyBNYXJrZG93bikgYW5kIHBhc3MgdGhhdCB1cCBhcyB0aGUgbmV3IHZhbHVlLlxuICAgKi9cbiAgaGFuZGxlRG9jdW1lbnRDaGFuZ2UgPSBkZWJvdW5jZShlZGl0b3IgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gUGxhaW4uc2VyaWFsaXplKGVkaXRvci52YWx1ZSk7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG4gIH0sIDE1MCk7XG5cbiAgaGFuZGxlVG9nZ2xlTW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uTW9kZSgncmljaF90ZXh0Jyk7XG4gIH07XG5cbiAgcHJvY2Vzc1JlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy5lZGl0b3IgPSByZWY7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBmaWVsZCwgaXNTaG93TW9kZVRvZ2dsZSwgdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPFJhd0VkaXRvckNvbnRhaW5lcj5cbiAgICAgICAgPEVkaXRvckNvbnRyb2xCYXI+XG4gICAgICAgICAgPFRvb2xiYXJcbiAgICAgICAgICAgIG9uVG9nZ2xlTW9kZT17dGhpcy5oYW5kbGVUb2dnbGVNb2RlfVxuICAgICAgICAgICAgYnV0dG9ucz17ZmllbGQuZ2V0KCdidXR0b25zJyl9XG4gICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgcmF3TW9kZVxuICAgICAgICAgICAgaXNTaG93TW9kZVRvZ2dsZT17aXNTaG93TW9kZVRvZ2dsZX1cbiAgICAgICAgICAgIHQ9e3R9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9FZGl0b3JDb250cm9sQmFyPlxuICAgICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgICB7KHsgY3NzLCBjeCB9KSA9PiAoXG4gICAgICAgICAgICA8U2xhdGVcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgY3NzYFxuICAgICAgICAgICAgICAgICAgJHtyYXdFZGl0b3JTdHlsZXMoeyBtaW5pbWFsOiBmaWVsZC5nZXQoJ21pbmltYWwnKSB9KX1cbiAgICAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICBvblBhc3RlPXt0aGlzLmhhbmRsZVBhc3RlfVxuICAgICAgICAgICAgICBvbkN1dD17dGhpcy5oYW5kbGVDdXR9XG4gICAgICAgICAgICAgIG9uQ29weT17dGhpcy5oYW5kbGVDb3B5fVxuICAgICAgICAgICAgICByZWY9e3RoaXMucHJvY2Vzc1JlZn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9DbGFzc05hbWVzPlxuICAgICAgPC9SYXdFZGl0b3JDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5SYXdFZGl0b3IucHJvcFR5cGVzID0ge1xuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25Nb2RlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZpZWxkOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGlzU2hvd01vZGVUb2dnbGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

class RawEditor extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCopy", (event, editor) => {
      const {
        getAsset,
        resolveWidget
      } = this.props;

      const markdown = _slatePlainSerializer.default.serialize(_slate.Value.create({
        document: editor.value.fragment
      }));

      const html = (0, _serializers.markdownToHtml)(markdown, {
        getAsset,
        resolveWidget
      });
      (0, _slateReact.setEventTransfer)(event, 'text', markdown);
      (0, _slateReact.setEventTransfer)(event, 'html', html);
      event.preventDefault();
    });

    _defineProperty(this, "handleCut", (event, editor, next) => {
      this.handleCopy(event, editor, next);
      editor.delete();
    });

    _defineProperty(this, "handlePaste", (event, editor, next) => {
      event.preventDefault();
      const data = event.clipboardData;

      if ((0, _isHotkey.default)('shift', event)) {
        return next();
      }

      const value = _slatePlainSerializer.default.deserialize(data.getData('text/plain'));

      return editor.insertFragment(value.document);
    });

    _defineProperty(this, "handleChange", editor => {
      if (!this.state.value.document.equals(editor.value.document)) {
        this.handleDocumentChange(editor);
      }

      this.setState({
        value: editor.value
      });
    });

    _defineProperty(this, "handleDocumentChange", (0, _debounce2.default)(editor => {
      const value = _slatePlainSerializer.default.serialize(editor.value);

      this.props.onChange(value);
    }, 150));

    _defineProperty(this, "handleToggleMode", () => {
      this.props.onMode('rich_text');
    });

    _defineProperty(this, "processRef", ref => {
      this.editor = ref;
    });

    this.state = {
      value: _slatePlainSerializer.default.deserialize(this.props.value || '')
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.value.equals(nextState.value) || nextProps.value !== _slatePlainSerializer.default.serialize(nextState.value);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: _slatePlainSerializer.default.deserialize(this.props.value)
      });
    }
  }

  componentDidMount() {
    if (this.props.pendingFocus) {
      this.editor.focus();
      this.props.pendingFocus();
    }
  }

  render() {
    const {
      className,
      field,
      isShowModeToggle,
      t
    } = this.props;
    return (0, _core.jsx)(RawEditorContainer, null, (0, _core.jsx)(_styles.EditorControlBar, null, (0, _core.jsx)(_Toolbar.default, {
      onToggleMode: this.handleToggleMode,
      buttons: field.get('buttons'),
      disabled: true,
      rawMode: true,
      isShowModeToggle: isShowModeToggle,
      t: t
    })), (0, _core.jsx)(_core.ClassNames, null, _ref2 => {
      let {
        css,
        cx
      } = _ref2;
      return (0, _core.jsx)(_slateReact.Editor, {
        className: cx(className, css`
                  ${rawEditorStyles({
          minimal: field.get('minimal')
        })}
                `),
        value: this.state.value,
        onChange: this.handleChange,
        onPaste: this.handlePaste,
        onCut: this.handleCut,
        onCopy: this.handleCopy,
        ref: this.processRef
      });
    }));
  }

}

exports.default = RawEditor;
RawEditor.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  onMode: _propTypes.default.func.isRequired,
  className: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  field: _reactImmutableProptypes.default.map.isRequired,
  isShowModeToggle: _propTypes.default.bool.isRequired,
  t: _propTypes.default.func.isRequired
};