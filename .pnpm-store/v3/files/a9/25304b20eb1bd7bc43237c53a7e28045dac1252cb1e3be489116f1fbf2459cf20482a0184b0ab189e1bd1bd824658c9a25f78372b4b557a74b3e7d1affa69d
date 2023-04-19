"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _netlifyCmsBackendGitlab = require("netlify-cms-backend-gitlab");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class API extends _netlifyCmsBackendGitlab.API {
  constructor(config) {
    super(config);

    _defineProperty(this, "tokenPromise", void 0);

    _defineProperty(this, "withAuthorizationHeaders", async req => {
      const token = await this.tokenPromise();
      return _netlifyCmsLibUtil.unsentRequest.withHeaders({
        Authorization: `Bearer ${token}`
      }, req);
    });

    _defineProperty(this, "hasWriteAccess", () => Promise.resolve(true));

    this.tokenPromise = config.tokenPromise;
    this.commitAuthor = config.commitAuthor;
    this.repoURL = '';
  }

}

exports.default = API;