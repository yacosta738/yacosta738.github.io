"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _core = require("@emotion/core");

var _immutable = require("immutable");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _netlifyCmsLibWidgets = require("netlify-cms-lib-widgets");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styleStrings = {
  nestedObjectControl: `
    padding: 6px 14px 14px;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `,
  objectWidgetTopBarContainer: `
    padding: ${_netlifyCmsUiDefault.lengths.objectWidgetTopBarContainerPadding};
  `,
  collapsedObjectControl: `
    display: none;
  `
};

class ObjectControl extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentValidate", {});

    _defineProperty(this, "validate", () => {
      const {
        field
      } = this.props;
      let fields = field.get('field') || field.get('fields');
      fields = _immutable.List.isList(fields) ? fields : (0, _immutable.List)([fields]);
      fields.forEach(field => {
        if (field.get('widget') === 'hidden') return;
        this.componentValidate[field.get('name')]();
      });
    });

    _defineProperty(this, "handleCollapseToggle", () => {
      this.setState({
        collapsed: !this.state.collapsed
      });
    });

    _defineProperty(this, "renderFields", (multiFields, singleField) => {
      if (multiFields) {
        return multiFields.map((f, idx) => this.controlFor(f, idx));
      }

      return this.controlFor(singleField);
    });

    _defineProperty(this, "objectLabel", () => {
      const {
        value,
        field
      } = this.props;
      const label = field.get('label', field.get('name'));
      const summary = field.get('summary');
      return summary ? _netlifyCmsLibWidgets.stringTemplate.compileStringTemplate(summary, null, '', value) : label;
    });

    this.state = {
      collapsed: props.field.get('collapsed', false)
    };
  }
  /*
   * Always update so that each nested widget has the option to update. This is
   * required because ControlHOC provides a default `shouldComponentUpdate`
   * which only updates if the value changes, but every widget must be allowed
   * to override this.
   */


  shouldComponentUpdate() {
    return true;
  }

  controlFor(field, key) {
    const {
      value,
      onChangeObject,
      onValidateObject,
      clearFieldErrors,
      metadata,
      fieldsErrors,
      editorControl: EditorControl,
      controlRef,
      parentIds,
      isFieldDuplicate,
      isFieldHidden,
      locale
    } = this.props;

    if (field.get('widget') === 'hidden') {
      return null;
    }

    const fieldName = field.get('name');
    const fieldValue = value && _immutable.Map.isMap(value) ? value.get(fieldName) : value;
    const isDuplicate = isFieldDuplicate && isFieldDuplicate(field);
    const isHidden = isFieldHidden && isFieldHidden(field);
    return (0, _core.jsx)(EditorControl, {
      key: key,
      field: field,
      value: fieldValue,
      onChange: onChangeObject,
      clearFieldErrors: clearFieldErrors,
      fieldsMetaData: metadata,
      fieldsErrors: fieldsErrors,
      onValidate: onValidateObject,
      processControlRef: controlRef && controlRef.bind(this),
      controlRef: controlRef,
      parentIds: parentIds,
      isDisabled: isDuplicate,
      isHidden: isHidden,
      isFieldDuplicate: isFieldDuplicate,
      isFieldHidden: isFieldHidden,
      locale: locale
    });
  }

  render() {
    const {
      field,
      forID,
      classNameWrapper,
      forList,
      hasError,
      t
    } = this.props;
    const collapsed = forList ? this.props.collapsed : this.state.collapsed;
    const multiFields = field.get('fields');
    const singleField = field.get('field');

    if (multiFields || singleField) {
      return (0, _core.jsx)(_core.ClassNames, null, _ref => {
        let {
          css,
          cx
        } = _ref;
        return (0, _core.jsx)("div", {
          id: forID,
          className: cx(classNameWrapper, css`
                  ${styleStrings.objectWidgetTopBarContainer}
                `, {
            [css`
                    ${styleStrings.nestedObjectControl}
                  `]: forList
          }, {
            [css`
                    border-color: ${_netlifyCmsUiDefault.colors.textFieldBorder};
                  `]: forList ? !hasError : false
          })
        }, forList ? null : (0, _core.jsx)(_netlifyCmsUiDefault.ObjectWidgetTopBar, {
          collapsed: collapsed,
          onCollapseToggle: this.handleCollapseToggle,
          heading: collapsed && this.objectLabel(),
          t: t
        }), (0, _core.jsx)("div", {
          className: cx({
            [css`
                    ${styleStrings.collapsedObjectControl}
                  `]: collapsed
          })
        }, this.renderFields(multiFields, singleField)));
      });
    }

    return (0, _core.jsx)("h3", null, "No field(s) defined for this widget");
  }

}

exports.default = ObjectControl;

_defineProperty(ObjectControl, "propTypes", {
  onChangeObject: _propTypes.default.func.isRequired,
  onValidateObject: _propTypes.default.func.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object, _propTypes.default.bool]),
  field: _propTypes.default.object,
  forID: _propTypes.default.string,
  classNameWrapper: _propTypes.default.string.isRequired,
  forList: _propTypes.default.bool,
  controlRef: _propTypes.default.func,
  editorControl: _propTypes.default.elementType.isRequired,
  resolveWidget: _propTypes.default.func.isRequired,
  clearFieldErrors: _propTypes.default.func.isRequired,
  fieldsErrors: _reactImmutableProptypes.default.map.isRequired,
  hasError: _propTypes.default.bool,
  t: _propTypes.default.func.isRequired,
  locale: _propTypes.default.string
});

_defineProperty(ObjectControl, "defaultProps", {
  value: (0, _immutable.Map)()
});