'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notif = function Notif(_ref) {
  var kind = _ref.kind,
      componentClassName = _ref.componentClassName,
      actionLabel = _ref.actionLabel,
      onActionClick = _ref.onActionClick,
      id = _ref.id,
      message = _ref.message;

  var handleActionClick = function handleActionClick(ev) {
    ev.preventDefault();

    if (!onActionClick) {
      return;
    }

    onActionClick(id);
  };

  return _react2.default.createElement(
    'div',
    { className: componentClassName + ' ' + componentClassName + '--' + kind },
    _react2.default.createElement('div', { className: componentClassName + '__icon' }),
    _react2.default.createElement(
      'div',
      { className: componentClassName + '__content' },
      _react2.default.createElement(
        'span',
        { className: componentClassName + '__message' },
        message
      )
    ),
    actionLabel && _react2.default.createElement(
      'span',
      { className: componentClassName + '__action' },
      _react2.default.createElement(
        'button',
        { onClick: handleActionClick },
        actionLabel
      )
    ),
    _react2.default.createElement('div', { className: componentClassName + '__close' })
  );
};

Notif.defaultProps = {
  kind: 'info'
};

Notif.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  message: _propTypes2.default.node.isRequired,
  kind: _propTypes2.default.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  componentClassName: _propTypes2.default.string,
  onActionClick: _propTypes2.default.func,
  actionLabel: _propTypes2.default.string
};

exports.default = Notif;