"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _once2 = _interopRequireDefault(require("lodash/once"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _reactDatetime = _interopRequireDefault(require("react-datetime/css/react-datetime.css"));

var _reactDatetime2 = _interopRequireDefault(require("react-datetime"));

var _moment = _interopRequireDefault(require("moment"));

var _commonTags = require("common-tags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const warnDeprecated = (0, _once2.default)(() => console.warn((0, _commonTags.oneLine)`
  Netlify CMS config: the date widget has been deprecated and will
  be removed in the next major release. Please use the datetime widget instead.
`));
/**
 * `date` widget is deprecated in favor of the `datetime` widget
 */

class DateControl extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "formats", this.getFormats());

    _defineProperty(this, "defaultValue", this.getDefaultValue());

    _defineProperty(this, "isValidDate", datetime => _moment.default.isMoment(datetime) || datetime instanceof Date || datetime === '');

    _defineProperty(this, "handleChange", datetime => {
      /**
       * Set the date only if it is valid.
       */
      if (!this.isValidDate(datetime)) {
        return;
      }

      const {
        onChange
      } = this.props;
      const {
        format
      } = this.formats;
      /**
       * Produce a formatted string only if a format is set in the config.
       * Otherwise produce a date object.
       */

      if (format) {
        const formattedValue = datetime ? (0, _moment.default)(datetime).format(format) : '';
        onChange(formattedValue);
      } else {
        const value = _moment.default.isMoment(datetime) ? datetime.toDate() : datetime;
        onChange(value);
      }
    });

    _defineProperty(this, "onClose", datetime => {
      const {
        setInactiveStyle
      } = this.props;

      if (!this.isValidDate(datetime)) {
        const parsedDate = (0, _moment.default)(datetime);

        if (parsedDate.isValid()) {
          this.handleChange(datetime);
        } else {
          window.alert('The date you entered is invalid.');
        }
      }

      setInactiveStyle();
    });
  }

  getFormats() {
    const {
      field,
      includeTime
    } = this.props;
    const format = field.get('format'); // dateFormat and timeFormat are strictly for modifying
    // input field with the date/time pickers

    const dateFormat = field.get('date_format'); // show time-picker? false hides it, true shows it using default format

    let timeFormat = field.get('time_format');

    if (typeof timeFormat === 'undefined') {
      timeFormat = !!includeTime;
    }

    return {
      format,
      dateFormat,
      timeFormat
    };
  }

  getDefaultValue() {
    const {
      field
    } = this.props;
    const defaultValue = field.get('default');
    return defaultValue;
  }

  componentDidMount() {
    warnDeprecated();
    const {
      value
    } = this.props;
    /**
     * Set the current date as default value if no default value is provided. An
     * empty string means the value is intentionally blank.
     */

    if (value === undefined) {
      setTimeout(() => {
        this.handleChange(this.defaultValue === undefined ? new Date() : this.defaultValue);
      }, 0);
    }
  } // Date is valid if datetime is a moment or Date object otherwise it's a string.
  // Handle the empty case, if the user wants to empty the field.


  render() {
    const {
      forID,
      value,
      classNameWrapper,
      setActiveStyle
    } = this.props;
    const {
      format,
      dateFormat,
      timeFormat
    } = this.formats;
    return (0, _core.jsx)("div", {
      css: /*#__PURE__*/(0, _core.css)(_reactDatetime.default, ";;label:DateControl;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlQ29udHJvbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2SGdCIiwiZmlsZSI6Ii4uLy4uL3NyYy9EYXRlQ29udHJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgcmVhY3REYXRlVGltZVN0eWxlcyBmcm9tICdyZWFjdC1kYXRldGltZS9jc3MvcmVhY3QtZGF0ZXRpbWUuY3NzJztcbmltcG9ydCBEYXRlVGltZSBmcm9tICdyZWFjdC1kYXRldGltZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBvbmNlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IG9uZUxpbmUgfSBmcm9tICdjb21tb24tdGFncyc7XG5cbmNvbnN0IHdhcm5EZXByZWNhdGVkID0gb25jZSgoKSA9PlxuICBjb25zb2xlLndhcm4ob25lTGluZWBcbiAgTmV0bGlmeSBDTVMgY29uZmlnOiB0aGUgZGF0ZSB3aWRnZXQgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbFxuICBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuIFBsZWFzZSB1c2UgdGhlIGRhdGV0aW1lIHdpZGdldCBpbnN0ZWFkLlxuYCksXG4pO1xuXG4vKipcbiAqIGBkYXRlYCB3aWRnZXQgaXMgZGVwcmVjYXRlZCBpbiBmYXZvciBvZiB0aGUgYGRhdGV0aW1lYCB3aWRnZXRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZUNvbnRyb2wgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZpZWxkOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgZm9ySUQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2xhc3NOYW1lV3JhcHBlcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHNldEFjdGl2ZVN0eWxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHNldEluYWN0aXZlU3R5bGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5vYmplY3QsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICBpbmNsdWRlVGltZTogUHJvcFR5cGVzLmJvb2wsXG4gIH07XG5cbiAgZ2V0Rm9ybWF0cygpIHtcbiAgICBjb25zdCB7IGZpZWxkLCBpbmNsdWRlVGltZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmb3JtYXQgPSBmaWVsZC5nZXQoJ2Zvcm1hdCcpO1xuXG4gICAgLy8gZGF0ZUZvcm1hdCBhbmQgdGltZUZvcm1hdCBhcmUgc3RyaWN0bHkgZm9yIG1vZGlmeWluZ1xuICAgIC8vIGlucHV0IGZpZWxkIHdpdGggdGhlIGRhdGUvdGltZSBwaWNrZXJzXG4gICAgY29uc3QgZGF0ZUZvcm1hdCA9IGZpZWxkLmdldCgnZGF0ZV9mb3JtYXQnKTtcbiAgICAvLyBzaG93IHRpbWUtcGlja2VyPyBmYWxzZSBoaWRlcyBpdCwgdHJ1ZSBzaG93cyBpdCB1c2luZyBkZWZhdWx0IGZvcm1hdFxuICAgIGxldCB0aW1lRm9ybWF0ID0gZmllbGQuZ2V0KCd0aW1lX2Zvcm1hdCcpO1xuICAgIGlmICh0eXBlb2YgdGltZUZvcm1hdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRpbWVGb3JtYXQgPSAhIWluY2x1ZGVUaW1lO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBmb3JtYXQsXG4gICAgICBkYXRlRm9ybWF0LFxuICAgICAgdGltZUZvcm1hdCxcbiAgICB9O1xuICB9XG5cbiAgZ2V0RGVmYXVsdFZhbHVlKCkge1xuICAgIGNvbnN0IHsgZmllbGQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gZmllbGQuZ2V0KCdkZWZhdWx0Jyk7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIGZvcm1hdHMgPSB0aGlzLmdldEZvcm1hdHMoKTtcbiAgZGVmYXVsdFZhbHVlID0gdGhpcy5nZXREZWZhdWx0VmFsdWUoKTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3YXJuRGVwcmVjYXRlZCgpO1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGN1cnJlbnQgZGF0ZSBhcyBkZWZhdWx0IHZhbHVlIGlmIG5vIGRlZmF1bHQgdmFsdWUgaXMgcHJvdmlkZWQuIEFuXG4gICAgICogZW1wdHkgc3RyaW5nIG1lYW5zIHRoZSB2YWx1ZSBpcyBpbnRlbnRpb25hbGx5IGJsYW5rLlxuICAgICAqL1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UodGhpcy5kZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKCkgOiB0aGlzLmRlZmF1bHRWYWx1ZSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cblxuICAvLyBEYXRlIGlzIHZhbGlkIGlmIGRhdGV0aW1lIGlzIGEgbW9tZW50IG9yIERhdGUgb2JqZWN0IG90aGVyd2lzZSBpdCdzIGEgc3RyaW5nLlxuICAvLyBIYW5kbGUgdGhlIGVtcHR5IGNhc2UsIGlmIHRoZSB1c2VyIHdhbnRzIHRvIGVtcHR5IHRoZSBmaWVsZC5cbiAgaXNWYWxpZERhdGUgPSBkYXRldGltZSA9PlxuICAgIG1vbWVudC5pc01vbWVudChkYXRldGltZSkgfHwgZGF0ZXRpbWUgaW5zdGFuY2VvZiBEYXRlIHx8IGRhdGV0aW1lID09PSAnJztcblxuICBoYW5kbGVDaGFuZ2UgPSBkYXRldGltZSA9PiB7XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkYXRlIG9ubHkgaWYgaXQgaXMgdmFsaWQuXG4gICAgICovXG4gICAgaWYgKCF0aGlzLmlzVmFsaWREYXRlKGRhdGV0aW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBmb3JtYXQgfSA9IHRoaXMuZm9ybWF0cztcblxuICAgIC8qKlxuICAgICAqIFByb2R1Y2UgYSBmb3JtYXR0ZWQgc3RyaW5nIG9ubHkgaWYgYSBmb3JtYXQgaXMgc2V0IGluIHRoZSBjb25maWcuXG4gICAgICogT3RoZXJ3aXNlIHByb2R1Y2UgYSBkYXRlIG9iamVjdC5cbiAgICAgKi9cbiAgICBpZiAoZm9ybWF0KSB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRWYWx1ZSA9IGRhdGV0aW1lID8gbW9tZW50KGRhdGV0aW1lKS5mb3JtYXQoZm9ybWF0KSA6ICcnO1xuICAgICAgb25DaGFuZ2UoZm9ybWF0dGVkVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG1vbWVudC5pc01vbWVudChkYXRldGltZSkgPyBkYXRldGltZS50b0RhdGUoKSA6IGRhdGV0aW1lO1xuICAgICAgb25DaGFuZ2UodmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBvbkNsb3NlID0gZGF0ZXRpbWUgPT4ge1xuICAgIGNvbnN0IHsgc2V0SW5hY3RpdmVTdHlsZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghdGhpcy5pc1ZhbGlkRGF0ZShkYXRldGltZSkpIHtcbiAgICAgIGNvbnN0IHBhcnNlZERhdGUgPSBtb21lbnQoZGF0ZXRpbWUpO1xuXG4gICAgICBpZiAocGFyc2VkRGF0ZS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UoZGF0ZXRpbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmFsZXJ0KCdUaGUgZGF0ZSB5b3UgZW50ZXJlZCBpcyBpbnZhbGlkLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldEluYWN0aXZlU3R5bGUoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBmb3JJRCwgdmFsdWUsIGNsYXNzTmFtZVdyYXBwZXIsIHNldEFjdGl2ZVN0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZm9ybWF0LCBkYXRlRm9ybWF0LCB0aW1lRm9ybWF0IH0gPSB0aGlzLmZvcm1hdHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgJHtyZWFjdERhdGVUaW1lU3R5bGVzfTtcbiAgICAgICAgYH1cbiAgICAgID5cbiAgICAgICAgPERhdGVUaW1lXG4gICAgICAgICAgZGF0ZUZvcm1hdD17ZGF0ZUZvcm1hdH1cbiAgICAgICAgICB0aW1lRm9ybWF0PXt0aW1lRm9ybWF0fVxuICAgICAgICAgIHZhbHVlPXttb21lbnQodmFsdWUsIGZvcm1hdCl9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgIG9uT3Blbj17c2V0QWN0aXZlU3R5bGV9XG4gICAgICAgICAgb25DbG9zZT17dGhpcy5vbkNsb3NlfVxuICAgICAgICAgIGlucHV0UHJvcHM9e3sgY2xhc3NOYW1lOiBjbGFzc05hbWVXcmFwcGVyLCBpZDogZm9ySUQgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */"))
    }, (0, _core.jsx)(_reactDatetime2.default, {
      dateFormat: dateFormat,
      timeFormat: timeFormat,
      value: (0, _moment.default)(value, format),
      onChange: this.handleChange,
      onOpen: setActiveStyle,
      onClose: this.onClose,
      inputProps: {
        className: classNameWrapper,
        id: forID
      }
    }));
  }

}

exports.default = DateControl;

_defineProperty(DateControl, "propTypes", {
  field: _propTypes.default.object.isRequired,
  forID: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  includeTime: _propTypes.default.bool
});