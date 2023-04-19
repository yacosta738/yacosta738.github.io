"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ACCESS_TOKEN_ERROR = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

const ACCESS_TOKEN_ERROR = 'ACCESS_TOKEN_ERROR';
exports.ACCESS_TOKEN_ERROR = ACCESS_TOKEN_ERROR;

class AccessTokenError extends _extendableBuiltin(Error) {
  constructor(message) {
    super(message);

    _defineProperty(this, "message", void 0);

    this.message = message;
    this.name = ACCESS_TOKEN_ERROR;
  }

}

exports.default = AccessTokenError;