"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNonce = createNonce;
exports.validateNonce = validateNonce;
exports.isInsecureProtocol = isInsecureProtocol;

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createNonce() {
  const nonce = (0, _v.default)();
  window.sessionStorage.setItem('netlify-cms-auth', JSON.stringify({
    nonce
  }));
  return nonce;
}

function validateNonce(check) {
  const auth = window.sessionStorage.getItem('netlify-cms-auth');
  const valid = auth && JSON.parse(auth).nonce;
  window.localStorage.removeItem('netlify-cms-auth');
  return check === valid;
}

function isInsecureProtocol() {
  return document.location.protocol !== 'https:' && // TODO: Is insecure localhost a bad idea as well? I don't think it is, since you are not actually
  //       sending the token over the internet in this case, assuming the auth URL is secure.
  document.location.hostname !== 'localhost' && document.location.hostname !== '127.0.0.1';
}