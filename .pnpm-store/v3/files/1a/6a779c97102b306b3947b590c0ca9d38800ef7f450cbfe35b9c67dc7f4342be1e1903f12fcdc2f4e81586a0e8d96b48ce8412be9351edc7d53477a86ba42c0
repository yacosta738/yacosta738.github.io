'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _Notif = require('./Notif');

var _Notif2 = _interopRequireDefault(_Notif);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This checks to see if object is immutable and properly access it
var getter = function getter(obj, propName) {
  return obj.get ? obj.get(propName) : obj[propName];
};

var Notifs = function Notifs(props) {
  var notifications = props.notifications,
      className = props.className,
      componentClassName = props.componentClassName,
      CustomComponent = props.CustomComponent,
      transitionEnterTimeout = props.transitionEnterTimeout,
      transitionLeaveTimeout = props.transitionLeaveTimeout;


  var renderedNotifications = notifications.map(function (notification) {
    if (CustomComponent) {
      return _react2.default.createElement(CustomComponent, _extends({}, props, {
        componentClassName: componentClassName,
        key: getter(notification, 'id'),
        id: getter(notification, 'id'),
        message: getter(notification, 'message'),
        kind: getter(notification, 'kind')
      }));
    }
    return _react2.default.createElement(_Notif2.default, _extends({}, props, {
      componentClassName: componentClassName,
      key: getter(notification, 'id'),
      id: getter(notification, 'id'),
      message: getter(notification, 'message'),
      kind: getter(notification, 'kind')
    }));
  });
  var classes = [componentClassName + '__container', className].join(' ').split();

  return _react2.default.createElement(
    'div',
    { className: classes },
    _react2.default.createElement(
      _CSSTransitionGroup2.default,
      {
        transitionName: componentClassName + '-transition',
        transitionEnterTimeout: transitionEnterTimeout,
        transitionLeaveTimeout: transitionLeaveTimeout
      },
      renderedNotifications
    )
  );
};

Notifs.defaultProps = {
  className: null,
  componentClassName: 'notif',
  CustomComponent: null,
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600
};

Notifs.propTypes = {
  notifications: _propTypes2.default.array.isRequired,
  className: _propTypes2.default.string,
  CustomComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node, _propTypes2.default.element]),
  componentClassName: _propTypes2.default.string,
  transitionEnterTimeout: _propTypes2.default.number,
  transitionLeaveTimeout: _propTypes2.default.number
};

function mapStateToProps(state) {
  return { notifications: state.get ? state.get('notifs') : state.notifs };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Notifs);