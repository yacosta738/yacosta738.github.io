"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _microApiClient = _interopRequireWildcard(require("micro-api-client"));

var _user = _interopRequireDefault(require("./user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HTTPRegexp = /^http:\/\//;
var defaultApiURL = "/.netlify/identity";

var GoTrue = /*#__PURE__*/function () {
  function GoTrue() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$APIUrl = _ref.APIUrl,
        APIUrl = _ref$APIUrl === void 0 ? defaultApiURL : _ref$APIUrl,
        _ref$audience = _ref.audience,
        audience = _ref$audience === void 0 ? '' : _ref$audience,
        _ref$setCookie = _ref.setCookie,
        setCookie = _ref$setCookie === void 0 ? false : _ref$setCookie;

    _classCallCheck(this, GoTrue);

    if (APIUrl.match(HTTPRegexp)) {
      console.warn('Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!\nGoTrue REQUIRES HTTPS to work securely.');
    }

    if (audience) {
      this.audience = audience;
    }

    this.setCookie = setCookie;
    this.api = new _microApiClient["default"](APIUrl);
  }

  _createClass(GoTrue, [{
    key: "_request",
    value: function _request(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.headers = options.headers || {};
      var aud = options.audience || this.audience;

      if (aud) {
        options.headers['X-JWT-AUD'] = aud;
      }

      return this.api.request(path, options)["catch"](function (error) {
        if (error instanceof _microApiClient.JSONHTTPError && error.json) {
          if (error.json.msg) {
            error.message = error.json.msg;
          } else if (error.json.error) {
            error.message = "".concat(error.json.error, ": ").concat(error.json.error_description);
          }
        }

        return Promise.reject(error);
      });
    }
  }, {
    key: "settings",
    value: function settings() {
      return this._request('/settings');
    }
  }, {
    key: "signup",
    value: function signup(email, password, data) {
      return this._request('/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          data: data
        })
      });
    }
  }, {
    key: "login",
    value: function login(email, password, remember) {
      var _this = this;

      this._setRememberHeaders(remember);

      return this._request('/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "grant_type=password&username=".concat(encodeURIComponent(email), "&password=").concat(encodeURIComponent(password))
      }).then(function (response) {
        _user["default"].removeSavedSession();

        return _this.createUser(response, remember);
      });
    }
  }, {
    key: "loginExternalUrl",
    value: function loginExternalUrl(provider) {
      return "".concat(this.api.apiURL, "/authorize?provider=").concat(provider);
    }
  }, {
    key: "confirm",
    value: function confirm(token, remember) {
      this._setRememberHeaders(remember);

      return this.verify('signup', token, remember);
    }
  }, {
    key: "requestPasswordRecovery",
    value: function requestPasswordRecovery(email) {
      return this._request('/recover', {
        method: 'POST',
        body: JSON.stringify({
          email: email
        })
      });
    }
  }, {
    key: "recover",
    value: function recover(token, remember) {
      this._setRememberHeaders(remember);

      return this.verify('recovery', token, remember);
    }
  }, {
    key: "acceptInvite",
    value: function acceptInvite(token, password, remember) {
      var _this2 = this;

      this._setRememberHeaders(remember);

      return this._request('/verify', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          password: password,
          type: 'signup'
        })
      }).then(function (response) {
        return _this2.createUser(response, remember);
      });
    }
  }, {
    key: "acceptInviteExternalUrl",
    value: function acceptInviteExternalUrl(provider, token) {
      return "".concat(this.api.apiURL, "/authorize?provider=").concat(provider, "&invite_token=").concat(token);
    }
  }, {
    key: "createUser",
    value: function createUser(tokenResponse) {
      var remember = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._setRememberHeaders(remember);

      var user = new _user["default"](this.api, tokenResponse, this.audience);
      return user.getUserData().then(function (userData) {
        if (remember) {
          userData._saveSession();
        }

        return userData;
      });
    }
  }, {
    key: "currentUser",
    value: function currentUser() {
      var user = _user["default"].recoverSession(this.api);

      user && this._setRememberHeaders(user._fromStorage);
      return user;
    }
  }, {
    key: "verify",
    value: function verify(type, token, remember) {
      var _this3 = this;

      this._setRememberHeaders(remember);

      return this._request('/verify', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          type: type
        })
      }).then(function (response) {
        return _this3.createUser(response, remember);
      });
    }
  }, {
    key: "_setRememberHeaders",
    value: function _setRememberHeaders(remember) {
      if (this.setCookie) {
        this.api.defaultHeaders = this.api.defaultHeaders || {};
        this.api.defaultHeaders['X-Use-Cookie'] = remember ? '1' : 'session';
      }
    }
  }]);

  return GoTrue;
}();

exports["default"] = GoTrue;

if (typeof window !== 'undefined') {
  window.GoTrue = GoTrue;
}