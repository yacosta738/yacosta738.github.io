"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _i18nContext = _interopRequireDefault(require("./i18n-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

describe('I18n Provider', function () {
  var createChild = function createChild() {
    var Child =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Child, _Component);

      function Child() {
        _classCallCheck(this, Child);

        return _possibleConstructorReturn(this, _getPrototypeOf(Child).apply(this, arguments));
      }

      _createClass(Child, [{
        key: "render",
        value: function render() {
          return _react["default"].createElement("div", null);
        }
      }]);

      return Child;
    }(_react.Component);

    return Child;
  };

  var Child = createChild();

  function getPolyglotFromRenderer(renderer) {
    var instance = renderer.root;
    var children = instance.children;
    var firstChild = children[0];
    var firstChildValueProps = firstChild.props.value;
    var polyglot = firstChildValueProps._polyglot;
    return polyglot;
  }

  it('should update instance on receiving new props', function () {
    var props = {
      locale: 'en',
      messages: {
        test: 'test'
      }
    };

    var renderer = _reactTestRenderer["default"].create(_react["default"].createElement(_i18n["default"], props, _react["default"].createElement(_i18nContext["default"].Consumer, null, function (value) {
      return _react["default"].createElement(Child, {
        value: value
      });
    })));

    var newProps = {
      locale: 'jp',
      messages: {
        test: 'test'
      }
    };
    renderer.update(_react["default"].createElement(_i18n["default"], newProps, _react["default"].createElement(_i18nContext["default"].Consumer, null, function (value) {
      return _react["default"].createElement(Child, {
        value: value
      });
    })));
    var polyglot = getPolyglotFromRenderer(renderer);
    expect(polyglot.locale()).toBe('jp');
  });
});