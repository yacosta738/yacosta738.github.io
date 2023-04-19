"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _netlifyCmsBackendGithub = require("netlify-cms-backend-github");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class API extends _netlifyCmsBackendGithub.API {
  constructor(config) {
    super(config);

    _defineProperty(this, "tokenPromise", void 0);

    _defineProperty(this, "commitAuthor", void 0);

    _defineProperty(this, "isLargeMedia", void 0);

    this.apiRoot = config.apiRoot;
    this.tokenPromise = config.tokenPromise;
    this.commitAuthor = config.commitAuthor;
    this.isLargeMedia = config.isLargeMedia;
    this.repoURL = '';
    this.originRepoURL = '';
  }

  hasWriteAccess() {
    return this.getDefaultBranch().then(() => true).catch(error => {
      if (error.status === 401) {
        if (error.message === 'Bad credentials') {
          throw new _netlifyCmsLibUtil.APIError('Git Gateway Error: Please ask your site administrator to reissue the Git Gateway token.', error.status, 'Git Gateway');
        } else {
          return false;
        }
      } else if (error.status === 404 && (error.message === undefined || error.message === 'Unable to locate site configuration')) {
        throw new _netlifyCmsLibUtil.APIError(`Git Gateway Error: Please make sure Git Gateway is enabled on your site.`, error.status, 'Git Gateway');
      } else {
        console.error('Problem fetching repo data from Git Gateway');
        throw error;
      }
    });
  }

  requestHeaders() {
    let headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this.tokenPromise().then(jwtToken => {
      const baseHeader = _objectSpread({
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json; charset=utf-8'
      }, headers);

      return baseHeader;
    });
  }

  handleRequestError(error, responseStatus) {
    throw new _netlifyCmsLibUtil.APIError(error.message || error.msg, responseStatus, 'Git Gateway');
  }

  user() {
    return Promise.resolve(_objectSpread({
      login: ''
    }, this.commitAuthor));
  }

  async getHeadReference(head) {
    if (!this.repoOwner) {
      // get the repo owner from the branch url
      // this is required for returning the full head reference, e.g. owner:head
      // when filtering pull requests based on the head
      const branch = await this.getDefaultBranch();
      const self = branch._links.self;
      const regex = new RegExp('https?://.+?/repos/(.+?)/');
      const owner = self.match(regex);
      this.repoOwner = owner ? owner[1] : '';
    }

    return super.getHeadReference(head);
  }

  commit(message, changeTree) {
    const commitParams = {
      message,
      tree: changeTree.sha,
      parents: changeTree.parentSha ? [changeTree.parentSha] : []
    };

    if (this.commitAuthor) {
      commitParams.author = _objectSpread(_objectSpread({}, this.commitAuthor), {}, {
        date: new Date().toISOString()
      });
    }

    return this.request('/git/commits', {
      method: 'POST',
      body: JSON.stringify(commitParams)
    });
  }

  nextUrlProcessor() {
    return url => url.replace(/^(?:[a-z]+:\/\/.+?\/.+?\/.+?\/)/, `${this.apiRoot}/`);
  }

  async diffFromFile(file) {
    const diff = await super.diffFromFile(file);
    return _objectSpread(_objectSpread({}, diff), {}, {
      binary: diff.binary || (await this.isLargeMedia(file.filename))
    });
  }

}

exports.default = API;