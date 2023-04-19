"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.API_ERROR = void 0;

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

const API_ERROR = 'API_ERROR';
exports.API_ERROR = API_ERROR;

class APIError extends _extendableBuiltin(Error) {
  constructor(message, status, api) {
    let meta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    super(message);

    _defineProperty(this, "message", void 0);

    _defineProperty(this, "status", void 0);

    _defineProperty(this, "api", void 0);

    _defineProperty(this, "meta", void 0);

    this.message = message;
    this.status = status;
    this.api = api;
    this.name = API_ERROR;
    this.meta = meta;
  }

}

exports.default = APIError;