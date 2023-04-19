"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqBy2 = _interopRequireDefault(require("lodash/uniqBy"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactSelect = require("react-select");

var _async = _interopRequireDefault(require("react-select/async"));

var _immutable = require("immutable");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _netlifyCmsLibWidgets = require("netlify-cms-lib-widgets");

var _reactWindow = require("react-window");

var _reactSortableHoc = require("react-sortable-hoc");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function arrayMove(array, from, to) {
  const slicedArray = array.slice();
  slicedArray.splice(to < 0 ? array.length + to : to, 0, slicedArray.splice(from, 1)[0]);
  return slicedArray;
}

const MultiValue = (0, _reactSortableHoc.SortableElement)(props => {
  // prevent the menu from being opened/closed when the user clicks on a value to begin dragging it
  function onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const innerProps = _objectSpread(_objectSpread({}, props.innerProps), {}, {
    onMouseDown
  });

  return (0, _core.jsx)(_reactSelect.components.MultiValue, _extends({}, props, {
    innerProps: innerProps
  }));
});
const MultiValueLabel = (0, _reactSortableHoc.SortableHandle)(props => (0, _core.jsx)(_reactSelect.components.MultiValueLabel, props));
const SortableSelect = (0, _reactSortableHoc.SortableContainer)(_async.default);

function Option(_ref) {
  let {
    index,
    style,
    data
  } = _ref;
  return (0, _core.jsx)("div", {
    style: style
  }, data.options[index]);
}

function MenuList(props) {
  if (props.isLoading || props.options.length <= 0 || !Array.isArray(props.children)) {
    return props.children;
  }

  const rows = props.children;
  const itemSize = 30;
  return (0, _core.jsx)(_reactWindow.FixedSizeList, {
    style: {
      width: '100%'
    },
    width: 300,
    height: Math.min(300, rows.length * itemSize + itemSize / 3),
    itemCount: rows.length,
    itemSize: itemSize,
    itemData: {
      options: rows
    }
  }, Option);
}

function optionToString(option) {
  return option && option.value ? option.value : '';
}

function convertToOption(raw) {
  if (typeof raw === 'string') {
    return {
      label: raw,
      value: raw
    };
  }

  return _immutable.Map.isMap(raw) ? raw.toJS() : raw;
}

function getSelectedOptions(value) {
  const selectedOptions = _immutable.List.isList(value) ? value.toJS() : value;

  if (!selectedOptions || !Array.isArray(selectedOptions)) {
    return null;
  }

  return selectedOptions;
}

function uniqOptions(initial, current) {
  return (0, _uniqBy2.default)(initial.concat(current), o => o.value);
}

function getSearchFieldArray(searchFields) {
  return _immutable.List.isList(searchFields) ? searchFields.toJS() : [searchFields];
}

function getSelectedValue(_ref2) {
  let {
    value,
    options,
    isMultiple
  } = _ref2;

  if (isMultiple) {
    const selectedOptions = getSelectedOptions(value);

    if (selectedOptions === null) {
      return null;
    }

    const selected = selectedOptions.map(i => options.find(o => o.value === (i.value || i))).filter(Boolean).map(convertToOption);
    return selected;
  } else {
    return (0, _find2.default)(options, ['value', value]) || null;
  }
}

class RelationControl extends _react.default.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "mounted", false);

    _defineProperty(this, "state", {
      initialOptions: []
    });

    _defineProperty(this, "isValid", () => {
      const {
        field,
        value,
        t
      } = this.props;
      const min = field.get('min');
      const max = field.get('max');

      if (!this.isMultiple()) {
        return {
          error: false
        };
      }

      const error = _netlifyCmsLibWidgets.validations.validateMinMax(t, field.get('label', field.get('name')), value, min, max);

      return error ? {
        error
      } : {
        error: false
      };
    });

    _defineProperty(this, "onSortEnd", options => _ref3 => {
      let {
        oldIndex,
        newIndex
      } = _ref3;
      const {
        onChange,
        field
      } = this.props;
      const value = options.map(optionToString);
      const newValue = arrayMove(value, oldIndex, newIndex);
      const metadata = !(0, _isEmpty2.default)(options) && {
        [field.get('name')]: {
          [field.get('collection')]: {
            [(0, _last2.default)(newValue)]: (0, _last2.default)(options).data
          }
        }
      } || {};
      onChange((0, _immutable.fromJS)(newValue), metadata);
    });

    _defineProperty(this, "handleChange", selectedOption => {
      const {
        onChange,
        field
      } = this.props;

      if (this.isMultiple()) {
        const options = selectedOption;
        this.setState({
          initialOptions: options.filter(Boolean)
        });
        const value = options.map(optionToString);
        const metadata = !(0, _isEmpty2.default)(options) && {
          [field.get('name')]: {
            [field.get('collection')]: {
              [(0, _last2.default)(value)]: (0, _last2.default)(options).data
            }
          }
        } || {};
        onChange((0, _immutable.fromJS)(value), metadata);
      } else {
        this.setState({
          initialOptions: [selectedOption].filter(Boolean)
        });
        const value = optionToString(selectedOption);
        const metadata = selectedOption && {
          [field.get('name')]: {
            [field.get('collection')]: {
              [value]: selectedOption.data
            }
          }
        };
        onChange(value, metadata);
      }
    });

    _defineProperty(this, "parseNestedFields", (hit, field) => {
      const {
        locale
      } = this.props;
      const hitData = locale != null && hit.i18n != null && hit.i18n[locale] != null ? hit.i18n[locale].data : hit.data;

      const templateVars = _netlifyCmsLibWidgets.stringTemplate.extractTemplateVars(field); // return non template fields as is


      if (templateVars.length <= 0) {
        return (0, _get2.default)(hitData, field);
      }

      const data = _netlifyCmsLibWidgets.stringTemplate.addFileTemplateFields(hit.path, (0, _immutable.fromJS)(hitData));

      const value = _netlifyCmsLibWidgets.stringTemplate.compileStringTemplate(field, null, hit.slug, data);

      return value;
    });

    _defineProperty(this, "parseHitOptions", hits => {
      const {
        field
      } = this.props;
      const valueField = field.get('value_field');
      const displayField = field.get('display_fields') || (0, _immutable.List)([field.get('value_field')]);
      const options = hits.reduce((acc, hit) => {
        const valuesPaths = _netlifyCmsLibWidgets.stringTemplate.expandPath({
          data: hit.data,
          path: valueField
        });

        for (let i = 0; i < valuesPaths.length; i++) {
          const label = displayField.toJS().map(key => {
            const displayPaths = _netlifyCmsLibWidgets.stringTemplate.expandPath({
              data: hit.data,
              path: key
            });

            return this.parseNestedFields(hit, displayPaths[i] || displayPaths[0]);
          }).join(' ');
          const value = this.parseNestedFields(hit, valuesPaths[i]);
          acc.push({
            data: hit.data,
            value,
            label
          });
        }

        return acc;
      }, []);
      return options;
    });

    _defineProperty(this, "loadOptions", (0, _debounce2.default)((term, callback) => {
      const {
        field,
        query,
        forID
      } = this.props;
      const collection = field.get('collection');
      const optionsLength = field.get('options_length') || 20;
      const searchFieldsArray = getSearchFieldArray(field.get('search_fields'));
      const file = field.get('file');
      query(forID, collection, searchFieldsArray, term, file, optionsLength).then(_ref4 => {
        let {
          payload
        } = _ref4;
        const hits = payload.hits || [];
        const options = this.parseHitOptions(hits);
        const uniq = uniqOptions(this.state.initialOptions, options);
        callback(uniq);
      });
    }, 500));
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value || this.props.hasActiveStyle !== nextProps.hasActiveStyle || this.props.queryHits !== nextProps.queryHits;
  }

  async componentDidMount() {
    this.mounted = true; // if the field has a previous value perform an initial search based on the value field
    // this is required since each search is limited by optionsLength so the selected value
    // might not show up on the search

    const {
      forID,
      field,
      value,
      query,
      onChange
    } = this.props;
    const collection = field.get('collection');
    const file = field.get('file');
    const initialSearchValues = value && (this.isMultiple() ? getSelectedOptions(value) : [value]);

    if (initialSearchValues && initialSearchValues.length > 0) {
      const metadata = {};
      const searchFieldsArray = getSearchFieldArray(field.get('search_fields'));
      const {
        payload
      } = await query(forID, collection, searchFieldsArray, '', file);
      const hits = payload.hits || [];
      const options = this.parseHitOptions(hits);
      const initialOptions = initialSearchValues.map(v => {
        const selectedOption = options.find(o => o.value === v);
        metadata[v] = selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.data;
        return selectedOption;
      }).filter(Boolean);
      this.mounted && this.setState({
        initialOptions
      }); //set metadata

      this.mounted && onChange(value, {
        [field.get('name')]: {
          [field.get('collection')]: metadata
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  isMultiple() {
    return this.props.field.get('multiple', false);
  }

  render() {
    const {
      value,
      field,
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      queryHits
    } = this.props;
    const isMultiple = this.isMultiple();
    const isClearable = !field.get('required', true) || isMultiple;
    const queryOptions = this.parseHitOptions(queryHits);
    const options = uniqOptions(this.state.initialOptions, queryOptions);
    const selectedValue = getSelectedValue({
      options,
      value,
      isMultiple
    });
    return (0, _core.jsx)(SortableSelect, {
      useDragHandle: true // react-sortable-hoc props:
      ,
      axis: "xy",
      onSortEnd: this.onSortEnd(selectedValue),
      distance: 4 // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
      ,
      getHelperDimensions: _ref5 => {
        let {
          node
        } = _ref5;
        return node.getBoundingClientRect();
      } // react-select props:
      ,
      components: {
        MenuList,
        MultiValue,
        MultiValueLabel
      },
      value: selectedValue,
      inputId: forID,
      cacheOptions: true,
      defaultOptions: true,
      loadOptions: this.loadOptions,
      onChange: this.handleChange,
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      styles: _netlifyCmsUiDefault.reactSelectStyles,
      isMulti: isMultiple,
      isClearable: isClearable,
      placeholder: ""
    });
  }

}

exports.default = RelationControl;

_defineProperty(RelationControl, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  forID: _propTypes.default.string.isRequired,
  value: _propTypes.default.node,
  field: _reactImmutableProptypes.default.map,
  query: _propTypes.default.func.isRequired,
  queryHits: _propTypes.default.array,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired,
  locale: _propTypes.default.string
});