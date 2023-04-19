"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NetlifyAuthenticator", {
  enumerable: true,
  get: function () {
    return _netlifyAuth.default;
  }
});
Object.defineProperty(exports, "ImplicitAuthenticator", {
  enumerable: true,
  get: function () {
    return _implicitOauth.default;
  }
});
Object.defineProperty(exports, "PkceAuthenticator", {
  enumerable: true,
  get: function () {
    return _pkceOauth.default;
  }
});
exports.NetlifyCmsLibAuth = void 0;

var _netlifyAuth = _interopRequireDefault(require("./netlify-auth"));

var _implicitOauth = _interopRequireDefault(require("./implicit-oauth"));

var _pkceOauth = _interopRequireDefault(require("./pkce-oauth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NetlifyCmsLibAuth = {
  NetlifyAuthenticator: _netlifyAuth.default,
  ImplicitAuthenticator: _implicitOauth.default,
  PkceAuthenticator: _pkceOauth.default
};
exports.NetlifyCmsLibAuth = NetlifyCmsLibAuth;