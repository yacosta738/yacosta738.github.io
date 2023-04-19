"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _microApiClient = _interopRequireWildcard(require("micro-api-client"));

var _admin = _interopRequireDefault(require("./admin.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ExpiryMargin = 60 * 1000;
var storageKey = 'gotrue.user';
var refreshPromises = {};
var currentUser = null;
var forbiddenUpdateAttributes = {
  api: 1,
  token: 1,
  audience: 1,
  url: 1
};
var forbiddenSaveAttributes = {
  api: 1
};

var isBrowser = function isBrowser() {
  return typeof window !== 'undefined';
};

var User = /*#__PURE__*/function () {
  function User(api, tokenResponse, audience) {
    _classCallCheck(this, User);

    this.api = api;
    this.url = api.apiURL;
    this.audience = audience;

    this._processTokenResponse(tokenResponse);

    currentUser = this;
  }

  _createClass(User, [{
    key: "update",
    value: function update(attributes) {
      var _this = this;

      return this._request('/user', {
        method: 'PUT',
        body: JSON.stringify(attributes)
      }).then(function (response) {
        return _this._saveUserData(response)._refreshSavedSession();
      });
    }
  }, {
    key: "jwt",
    value: function jwt(forceRefresh) {
      var token = this.tokenDetails();

      if (token === null || token === undefined) {
        return Promise.reject(new Error("Gotrue-js: failed getting jwt access token"));
      }

      var expires_at = token.expires_at,
          refresh_token = token.refresh_token,
          access_token = token.access_token;

      if (forceRefresh || expires_at - ExpiryMargin < Date.now()) {
        return this._refreshToken(refresh_token);
      }

      return Promise.resolve(access_token);
    }
  }, {
    key: "logout",
    value: function logout() {
      return this._request('/logout', {
        method: 'POST'
      }).then(this.clearSession.bind(this))["catch"](this.clearSession.bind(this));
    }
  }, {
    key: "_refreshToken",
    value: function _refreshToken(refresh_token) {
      var _this2 = this;

      if (refreshPromises[refresh_token]) {
        return refreshPromises[refresh_token];
      }

      return refreshPromises[refresh_token] = this.api.request('/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "grant_type=refresh_token&refresh_token=".concat(refresh_token)
      }).then(function (response) {
        delete refreshPromises[refresh_token];

        _this2._processTokenResponse(response);

        _this2._refreshSavedSession();

        return _this2.token.access_token;
      })["catch"](function (error) {
        delete refreshPromises[refresh_token];

        _this2.clearSession();

        return Promise.reject(error);
      });
    }
  }, {
    key: "_request",
    value: function _request(path) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.headers = options.headers || {};
      var aud = options.audience || this.audience;

      if (aud) {
        options.headers['X-JWT-AUD'] = aud;
      }

      return this.jwt().then(function (token) {
        return _this3.api.request(path, _objectSpread({
          headers: Object.assign(options.headers, {
            Authorization: "Bearer ".concat(token)
          })
        }, options))["catch"](function (error) {
          if (error instanceof _microApiClient.JSONHTTPError && error.json) {
            if (error.json.msg) {
              error.message = error.json.msg;
            } else if (error.json.error) {
              error.message = "".concat(error.json.error, ": ").concat(error.json.error_description);
            }
          }

          return Promise.reject(error);
        });
      });
    }
  }, {
    key: "getUserData",
    value: function getUserData() {
      return this._request('/user').then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this));
    }
  }, {
    key: "_saveUserData",
    value: function _saveUserData(attributes, fromStorage) {
      for (var key in attributes) {
        if (key in User.prototype || key in forbiddenUpdateAttributes) {
          continue;
        }

        this[key] = attributes[key];
      }

      if (fromStorage) {
        this._fromStorage = true;
      }

      return this;
    }
  }, {
    key: "_processTokenResponse",
    value: function _processTokenResponse(tokenResponse) {
      this.token = tokenResponse;

      try {
        var claims = JSON.parse(urlBase64Decode(tokenResponse.access_token.split('.')[1]));
        this.token.expires_at = claims.exp * 1000;
      } catch (error) {
        console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: ".concat(error)));
      }
    }
  }, {
    key: "_refreshSavedSession",
    value: function _refreshSavedSession() {
      // only update saved session if we previously saved something
      if (isBrowser() && localStorage.getItem(storageKey)) {
        this._saveSession();
      }

      return this;
    }
  }, {
    key: "_saveSession",
    value: function _saveSession() {
      isBrowser() && localStorage.setItem(storageKey, JSON.stringify(this._details));
      return this;
    }
  }, {
    key: "tokenDetails",
    value: function tokenDetails() {
      return this.token;
    }
  }, {
    key: "clearSession",
    value: function clearSession() {
      User.removeSavedSession();
      this.token = null;
      currentUser = null;
    }
  }, {
    key: "admin",
    get: function get() {
      return new _admin["default"](this);
    }
  }, {
    key: "_details",
    get: function get() {
      var userCopy = {};

      for (var key in this) {
        if (key in User.prototype || key in forbiddenSaveAttributes) {
          continue;
        }

        userCopy[key] = this[key];
      }

      return userCopy;
    }
  }], [{
    key: "removeSavedSession",
    value: function removeSavedSession() {
      isBrowser() && localStorage.removeItem(storageKey);
    }
  }, {
    key: "recoverSession",
    value: function recoverSession(apiInstance) {
      if (currentUser) {
        return currentUser;
      }

      var json = isBrowser() && localStorage.getItem(storageKey);

      if (json) {
        try {
          var data = JSON.parse(json);
          var url = data.url,
              token = data.token,
              audience = data.audience;

          if (!url || !token) {
            return null;
          }

          var api = apiInstance || new _microApiClient["default"](url, {});
          return new User(api, token, audience)._saveUserData(data, true);
        } catch (error) {
          console.error(new Error("Gotrue-js: Error recovering session: ".concat(error)));
          return null;
        }
      }

      return null;
    }
  }]);

  return User;
}();

exports["default"] = User;

function urlBase64Decode(str) {
  // From https://jwt.io/js/jwt.js
  var output = str.replace(/-/g, '+').replace(/_/g, '/');

  switch (output.length % 4) {
    case 0:
      break;

    case 2:
      output += '==';
      break;

    case 3:
      output += '=';
      break;

    default:
      throw 'Illegal base64url string!';
  } // polifyll https://github.com/davidchambers/Base64.js


  var result = window.atob(output);

  try {
    return decodeURIComponent(escape(result));
  } catch (error) {
    return result;
  }
}