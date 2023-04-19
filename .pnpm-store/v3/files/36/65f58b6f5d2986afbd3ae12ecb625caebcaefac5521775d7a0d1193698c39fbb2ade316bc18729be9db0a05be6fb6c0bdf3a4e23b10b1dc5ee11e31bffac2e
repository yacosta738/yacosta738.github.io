"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _trim = _interopRequireDefault(require("lodash/trim"));

var _trimEnd = _interopRequireDefault(require("lodash/trimEnd"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const sha = String.fromCharCode(...new Uint8Array(digest));
  return sha;
} // based on https://github.com/auth0/auth0-spa-js/blob/9a83f698127eae7da72691b0d4b1b847567687e3/src/utils.ts#L147


function generateVerifierCode() {
  // characters that can be used for codeVerifer
  // excludes _~ as if included would cause an uneven distribution as char.length would no longer be a factor of 256
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.';
  const randomValues = Array.from(window.crypto.getRandomValues(new Uint8Array(128)));
  return randomValues.map(val => {
    return chars[val % chars.length];
  }).join('');
}

async function createCodeChallenge(codeVerifier) {
  const sha = await sha256(codeVerifier); // https://tools.ietf.org/html/rfc7636#appendix-A

  return btoa(sha).split('=')[0].replace(/\+/g, '-').replace(/\//g, '_');
}

const CODE_VERIFIER_STORAGE_KEY = 'netlify-cms-pkce-verifier-code';

function createCodeVerifier() {
  const codeVerifier = generateVerifierCode();
  window.sessionStorage.setItem(CODE_VERIFIER_STORAGE_KEY, codeVerifier);
  return codeVerifier;
}

function getCodeVerifier() {
  return window.sessionStorage.getItem(CODE_VERIFIER_STORAGE_KEY);
}

function clearCodeVerifier() {
  window.sessionStorage.removeItem(CODE_VERIFIER_STORAGE_KEY);
}

class PkceAuthenticator {
  constructor(config = {}) {
    const baseURL = (0, _trimEnd.default)(config.base_url, '/');
    const authEndpoint = (0, _trim.default)(config.auth_endpoint, '/');
    const authTokenEndpoint = (0, _trim.default)(config.auth_token_endpoint, '/');
    this.auth_url = `${baseURL}/${authEndpoint}`;
    this.auth_token_url = `${baseURL}/${authTokenEndpoint}`;
    this.appID = config.app_id;
  }

  async authenticate(options, cb) {
    if ((0, _utils.isInsecureProtocol)()) {
      return cb(new Error('Cannot authenticate over insecure protocol!'));
    }

    const authURL = new URL(this.auth_url);
    authURL.searchParams.set('client_id', this.appID);
    authURL.searchParams.set('redirect_uri', document.location.origin + document.location.pathname);
    authURL.searchParams.set('response_type', 'code');
    authURL.searchParams.set('scope', options.scope);
    const state = JSON.stringify({
      auth_type: 'pkce',
      nonce: (0, _utils.createNonce)()
    });
    authURL.searchParams.set('state', state);
    authURL.searchParams.set('code_challenge_method', 'S256');
    const codeVerifier = createCodeVerifier();
    const codeChallenge = await createCodeChallenge(codeVerifier);
    authURL.searchParams.set('code_challenge', codeChallenge);
    document.location.assign(authURL.href);
  }
  /**
   * Complete authentication if we were redirected back to from the provider.
   */


  async completeAuth(cb) {
    const params = new URLSearchParams(document.location.search); // Remove code from url

    window.history.replaceState(null, '', document.location.pathname);

    if (!params.has('code') && !params.has('error')) {
      return;
    }

    const {
      nonce
    } = JSON.parse(params.get('state'));
    const validNonce = (0, _utils.validateNonce)(nonce);

    if (!validNonce) {
      return cb(new Error('Invalid nonce'));
    }

    if (params.has('error')) {
      return cb(new Error(`${params.get('error')}: ${params.get('error_description')}`));
    }

    if (params.has('code')) {
      const code = params.get('code');
      const authURL = new URL(this.auth_token_url);
      authURL.searchParams.set('client_id', this.appID);
      authURL.searchParams.set('code', code);
      authURL.searchParams.set('grant_type', 'authorization_code');
      authURL.searchParams.set('redirect_uri', document.location.origin + document.location.pathname);
      authURL.searchParams.set('code_verifier', getCodeVerifier()); //no need for verifier code so remove

      clearCodeVerifier();
      const response = await fetch(authURL.href, {
        method: 'POST'
      });
      const data = await response.json();
      cb(null, _objectSpread({
        token: data.access_token
      }, data));
    }
  }

}

exports.default = PkceAuthenticator;