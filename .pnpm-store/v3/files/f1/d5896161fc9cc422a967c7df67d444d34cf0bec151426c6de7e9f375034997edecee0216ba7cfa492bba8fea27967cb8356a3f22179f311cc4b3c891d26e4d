"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _semaphore = _interopRequireDefault(require("semaphore"));

var _trimStart = _interopRequireDefault(require("lodash/trimStart"));

var _commonTags = require("common-tags");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _AuthenticationPage = _interopRequireDefault(require("./AuthenticationPage"));

var _API = _interopRequireWildcard(require("./API"));

var _GraphQLAPI = _interopRequireDefault(require("./GraphQLAPI"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MAX_CONCURRENT_DOWNLOADS = 10;
const {
  fetchWithTimeout: fetch
} = _netlifyCmsLibUtil.unsentRequest;
const STATUS_PAGE = 'https://www.githubstatus.com';
const GITHUB_STATUS_ENDPOINT = `${STATUS_PAGE}/api/v2/components.json`;
const GITHUB_OPERATIONAL_UNITS = ['API Requests', 'Issues, Pull Requests, Projects'];

class GitHub {
  constructor(config) {
    var _config$backend$branc;

    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _defineProperty(this, "lock", void 0);

    _defineProperty(this, "api", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "originRepo", void 0);

    _defineProperty(this, "repo", void 0);

    _defineProperty(this, "openAuthoringEnabled", void 0);

    _defineProperty(this, "useOpenAuthoring", void 0);

    _defineProperty(this, "alwaysForkEnabled", void 0);

    _defineProperty(this, "branch", void 0);

    _defineProperty(this, "apiRoot", void 0);

    _defineProperty(this, "mediaFolder", void 0);

    _defineProperty(this, "previewContext", void 0);

    _defineProperty(this, "token", void 0);

    _defineProperty(this, "squashMerges", void 0);

    _defineProperty(this, "cmsLabelPrefix", void 0);

    _defineProperty(this, "useGraphql", void 0);

    _defineProperty(this, "_currentUserPromise", void 0);

    _defineProperty(this, "_userIsOriginMaintainerPromises", void 0);

    _defineProperty(this, "_mediaDisplayURLSem", void 0);

    _defineProperty(this, "getCursorAndFiles", (files, page) => {
      const pageSize = 20;
      const count = files.length;
      const pageCount = Math.ceil(files.length / pageSize);
      const actions = [];

      if (page > 1) {
        actions.push('prev');
        actions.push('first');
      }

      if (page < pageCount) {
        actions.push('next');
        actions.push('last');
      }

      const cursor = _netlifyCmsLibUtil.Cursor.create({
        actions,
        meta: {
          page,
          count,
          pageSize,
          pageCount
        },
        data: {
          files
        }
      });

      const pageFiles = files.slice((page - 1) * pageSize, page * pageSize);
      return {
        cursor,
        files: pageFiles
      };
    });

    this.options = _objectSpread({
      proxied: false,
      API: null,
      initialWorkflowStatus: ''
    }, options);

    if (!this.options.proxied && (config.backend.repo === null || config.backend.repo === undefined)) {
      throw new Error('The GitHub backend needs a "repo" in the backend configuration.');
    }

    this.api = this.options.API || null;
    this.openAuthoringEnabled = config.backend.open_authoring || false;

    if (this.openAuthoringEnabled) {
      if (!this.options.useWorkflow) {
        throw new Error('backend.open_authoring is true but publish_mode is not set to editorial_workflow.');
      }

      this.originRepo = config.backend.repo || '';
    } else {
      this.repo = this.originRepo = config.backend.repo || '';
    }

    this.alwaysForkEnabled = config.backend.always_fork || false;
    this.branch = ((_config$backend$branc = config.backend.branch) === null || _config$backend$branc === void 0 ? void 0 : _config$backend$branc.trim()) || 'master';
    this.apiRoot = config.backend.api_root || 'https://api.github.com';
    this.token = '';
    this.squashMerges = config.backend.squash_merges || false;
    this.cmsLabelPrefix = config.backend.cms_label_prefix || '';
    this.useGraphql = config.backend.use_graphql || false;
    this.mediaFolder = config.media_folder;
    this.previewContext = config.backend.preview_context || '';
    this.lock = (0, _netlifyCmsLibUtil.asyncLock)();
  }

  isGitBackend() {
    return true;
  }

  async status() {
    const api = await fetch(GITHUB_STATUS_ENDPOINT).then(res => res.json()).then(res => {
      return res['components'].filter(statusComponent => GITHUB_OPERATIONAL_UNITS.includes(statusComponent.name)).every(statusComponent => statusComponent.status === 'operational');
    }).catch(e => {
      console.warn('Failed getting GitHub status', e);
      return true;
    });
    let auth = false; // no need to check auth if api is down

    if (api) {
      var _this$api;

      auth = (await ((_this$api = this.api) === null || _this$api === void 0 ? void 0 : _this$api.getUser().then(user => !!user).catch(e => {
        console.warn('Failed getting GitHub user', e);
        return false;
      }))) || false;
    }

    return {
      auth: {
        status: auth
      },
      api: {
        status: api,
        statusPage: STATUS_PAGE
      }
    };
  }

  authComponent() {
    const wrappedAuthenticationPage = props => (0, _core.jsx)(_AuthenticationPage.default, _extends({}, props, {
      backend: this
    }));

    wrappedAuthenticationPage.displayName = 'AuthenticationPage';
    return wrappedAuthenticationPage;
  }

  restoreUser(user) {
    return this.openAuthoringEnabled ? this.authenticateWithFork({
      userData: user,
      getPermissionToFork: () => true
    }).then(() => this.authenticate(user)) : this.authenticate(user);
  }

  async pollUntilForkExists(_ref) {
    let {
      repo,
      token
    } = _ref;
    const pollDelay = 250; // milliseconds

    let repoExists = false;

    while (!repoExists) {
      repoExists = await fetch(`${this.apiRoot}/repos/${repo}`, {
        headers: {
          Authorization: `token ${token}`
        }
      }).then(() => true).catch(err => {
        if (err && err.status === 404) {
          console.log('This 404 was expected and handled appropriately.');
          return false;
        } else {
          return Promise.reject(err);
        }
      }); // wait between polls

      if (!repoExists) {
        await new Promise(resolve => setTimeout(resolve, pollDelay));
      }
    }

    return Promise.resolve();
  }

  async currentUser(_ref2) {
    let {
      token
    } = _ref2;

    if (!this._currentUserPromise) {
      this._currentUserPromise = fetch(`${this.apiRoot}/user`, {
        headers: {
          Authorization: `token ${token}`
        }
      }).then(res => res.json());
    }

    return this._currentUserPromise;
  }

  async userIsOriginMaintainer(_ref3) {
    let {
      username: usernameArg,
      token
    } = _ref3;
    const username = usernameArg || (await this.currentUser({
      token
    })).login;
    this._userIsOriginMaintainerPromises = this._userIsOriginMaintainerPromises || {};

    if (!this._userIsOriginMaintainerPromises[username]) {
      this._userIsOriginMaintainerPromises[username] = fetch(`${this.apiRoot}/repos/${this.originRepo}/collaborators/${username}/permission`, {
        headers: {
          Authorization: `token ${token}`
        }
      }).then(res => res.json()).then(_ref4 => {
        let {
          permission
        } = _ref4;
        return permission === 'admin' || permission === 'write';
      });
    }

    return this._userIsOriginMaintainerPromises[username];
  }

  async forkExists(_ref5) {
    let {
      token
    } = _ref5;

    try {
      const currentUser = await this.currentUser({
        token
      });
      const repoName = this.originRepo.split('/')[1];
      const repo = await fetch(`${this.apiRoot}/repos/${currentUser.login}/${repoName}`, {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`
        }
      }).then(res => res.json()); // https://developer.github.com/v3/repos/#get
      // The parent and source objects are present when the repository is a fork.
      // parent is the repository this repository was forked from, source is the ultimate source for the network.

      const forkExists = repo.fork === true && repo.parent && repo.parent.full_name.toLowerCase() === this.originRepo.toLowerCase();
      return forkExists;
    } catch {
      return false;
    }
  }

  async authenticateWithFork(_ref6) {
    let {
      userData,
      getPermissionToFork
    } = _ref6;

    if (!this.openAuthoringEnabled) {
      throw new Error('Cannot authenticate with fork; Open Authoring is turned off.');
    }

    const token = userData.token; // Origin maintainers should be able to use the CMS normally. If alwaysFork
    // is enabled we always fork (and avoid the origin maintainer check)

    if (!this.alwaysForkEnabled && (await this.userIsOriginMaintainer({
      token
    }))) {
      this.repo = this.originRepo;
      this.useOpenAuthoring = false;
      return Promise.resolve();
    }

    if (!(await this.forkExists({
      token
    }))) {
      await getPermissionToFork();
    }

    const fork = await fetch(`${this.apiRoot}/repos/${this.originRepo}/forks`, {
      method: 'POST',
      headers: {
        Authorization: `token ${token}`
      }
    }).then(res => res.json());
    this.useOpenAuthoring = true;
    this.repo = fork.full_name;
    return this.pollUntilForkExists({
      repo: fork.full_name,
      token
    });
  }

  async authenticate(state) {
    this.token = state.token;
    const apiCtor = this.useGraphql ? _GraphQLAPI.default : _API.default;
    this.api = new apiCtor({
      token: this.token,
      branch: this.branch,
      repo: this.repo,
      originRepo: this.originRepo,
      apiRoot: this.apiRoot,
      squashMerges: this.squashMerges,
      cmsLabelPrefix: this.cmsLabelPrefix,
      useOpenAuthoring: this.useOpenAuthoring,
      initialWorkflowStatus: this.options.initialWorkflowStatus
    });
    const user = await this.api.user();
    const isCollab = await this.api.hasWriteAccess().catch(error => {
      error.message = (0, _commonTags.stripIndent)`
        Repo "${this.repo}" not found.

        Please ensure the repo information is spelled correctly.

        If the repo is private, make sure you're logged into a GitHub account with access.

        If your repo is under an organization, ensure the organization has granted access to Netlify
        CMS.
      `;
      throw error;
    }); // Unauthorized user

    if (!isCollab) {
      throw new Error('Your GitHub user account does not have access to this repo.');
    } // Authorized user


    return _objectSpread(_objectSpread({}, user), {}, {
      token: state.token,
      useOpenAuthoring: this.useOpenAuthoring
    });
  }

  logout() {
    this.token = null;

    if (this.api && this.api.reset && typeof this.api.reset === 'function') {
      return this.api.reset();
    }
  }

  getToken() {
    return Promise.resolve(this.token);
  }

  async entriesByFolder(folder, extension, depth) {
    const repoURL = this.api.originRepoURL;
    let cursor;

    const listFiles = () => this.api.listFiles(folder, {
      repoURL,
      depth
    }).then(files => {
      const filtered = files.filter(file => (0, _netlifyCmsLibUtil.filterByExtension)(file, extension));
      const result = this.getCursorAndFiles(filtered, 1);
      cursor = result.cursor;
      return result.files;
    });

    const readFile = (path, id) => this.api.readFile(path, id, {
      repoURL
    });

    const files = await (0, _netlifyCmsLibUtil.entriesByFolder)(listFiles, readFile, this.api.readFileMetadata.bind(this.api), _API.API_NAME); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    files[_netlifyCmsLibUtil.CURSOR_COMPATIBILITY_SYMBOL] = cursor;
    return files;
  }

  async allEntriesByFolder(folder, extension, depth) {
    const repoURL = this.api.originRepoURL;

    const listFiles = () => this.api.listFiles(folder, {
      repoURL,
      depth
    }).then(files => files.filter(file => (0, _netlifyCmsLibUtil.filterByExtension)(file, extension)));

    const readFile = (path, id) => {
      return this.api.readFile(path, id, {
        repoURL
      });
    };

    const files = await (0, _netlifyCmsLibUtil.entriesByFolder)(listFiles, readFile, this.api.readFileMetadata.bind(this.api), _API.API_NAME);
    return files;
  }

  entriesByFiles(files) {
    const repoURL = this.useOpenAuthoring ? this.api.originRepoURL : this.api.repoURL;

    const readFile = (path, id) => this.api.readFile(path, id, {
      repoURL
    }).catch(() => '');

    return (0, _netlifyCmsLibUtil.entriesByFiles)(files, readFile, this.api.readFileMetadata.bind(this.api), _API.API_NAME);
  } // Fetches a single entry.


  getEntry(path) {
    const repoURL = this.api.originRepoURL;
    return this.api.readFile(path, null, {
      repoURL
    }).then(data => ({
      file: {
        path,
        id: null
      },
      data: data
    })).catch(() => ({
      file: {
        path,
        id: null
      },
      data: ''
    }));
  }

  getMedia() {
    let mediaFolder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.mediaFolder;
    return this.api.listFiles(mediaFolder).then(files => files.map(_ref7 => {
      let {
        id,
        name,
        size,
        path
      } = _ref7;
      // load media using getMediaDisplayURL to avoid token expiration with GitHub raw content urls
      // for private repositories
      return {
        id,
        name,
        size,
        displayURL: {
          id,
          path
        },
        path
      };
    }));
  }

  async getMediaFile(path) {
    const blob = await (0, _netlifyCmsLibUtil.getMediaAsBlob)(path, null, this.api.readFile.bind(this.api));
    const name = (0, _netlifyCmsLibUtil.basename)(path);
    const fileObj = (0, _netlifyCmsLibUtil.blobToFileObj)(name, blob);
    const url = URL.createObjectURL(fileObj);
    const id = await (0, _netlifyCmsLibUtil.getBlobSHA)(blob);
    return {
      id,
      displayURL: url,
      path,
      name,
      size: fileObj.size,
      file: fileObj,
      url
    };
  }

  getMediaDisplayURL(displayURL) {
    this._mediaDisplayURLSem = this._mediaDisplayURLSem || (0, _semaphore.default)(MAX_CONCURRENT_DOWNLOADS);
    return (0, _netlifyCmsLibUtil.getMediaDisplayURL)(displayURL, this.api.readFile.bind(this.api), this._mediaDisplayURLSem);
  }

  persistEntry(entry, options) {
    // persistEntry is a transactional operation
    return (0, _netlifyCmsLibUtil.runWithLock)(this.lock, () => this.api.persistFiles(entry.dataFiles, entry.assets, options), 'Failed to acquire persist entry lock');
  }

  async persistMedia(mediaFile, options) {
    try {
      await this.api.persistFiles([], [mediaFile], options);
      const {
        sha,
        path,
        fileObj
      } = mediaFile;
      const displayURL = URL.createObjectURL(fileObj);
      return {
        id: sha,
        name: fileObj.name,
        size: fileObj.size,
        displayURL,
        path: (0, _trimStart.default)(path, '/')
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  deleteFiles(paths, commitMessage) {
    return this.api.deleteFiles(paths, commitMessage);
  }

  async traverseCursor(cursor, action) {
    const meta = cursor.meta;
    const files = cursor.data.get('files').toJS();
    let result;

    switch (action) {
      case 'first':
        {
          result = this.getCursorAndFiles(files, 1);
          break;
        }

      case 'last':
        {
          result = this.getCursorAndFiles(files, meta.get('pageCount'));
          break;
        }

      case 'next':
        {
          result = this.getCursorAndFiles(files, meta.get('page') + 1);
          break;
        }

      case 'prev':
        {
          result = this.getCursorAndFiles(files, meta.get('page') - 1);
          break;
        }

      default:
        {
          result = this.getCursorAndFiles(files, 1);
          break;
        }
    }

    const readFile = (path, id) => this.api.readFile(path, id, {
      repoURL: this.api.originRepoURL
    }).catch(() => '');

    const entries = await (0, _netlifyCmsLibUtil.entriesByFiles)(result.files, readFile, this.api.readFileMetadata.bind(this.api), _API.API_NAME);
    return {
      entries,
      cursor: result.cursor
    };
  }

  async loadMediaFile(branch, file) {
    const readFile = (path, id, _ref8) => {
      let {
        parseText
      } = _ref8;
      return this.api.readFile(path, id, {
        branch,
        parseText
      });
    };

    const blob = await (0, _netlifyCmsLibUtil.getMediaAsBlob)(file.path, file.id, readFile);
    const name = (0, _netlifyCmsLibUtil.basename)(file.path);
    const fileObj = (0, _netlifyCmsLibUtil.blobToFileObj)(name, blob);
    return {
      id: file.id,
      displayURL: URL.createObjectURL(fileObj),
      path: file.path,
      name,
      size: fileObj.size,
      file: fileObj
    };
  }

  async unpublishedEntries() {
    const listEntriesKeys = () => this.api.listUnpublishedBranches().then(branches => branches.map(branch => (0, _netlifyCmsLibUtil.contentKeyFromBranch)(branch)));

    const ids = await (0, _netlifyCmsLibUtil.unpublishedEntries)(listEntriesKeys);
    return ids;
  }

  async unpublishedEntry(_ref9) {
    let {
      id,
      collection,
      slug
    } = _ref9;

    if (id) {
      const data = await this.api.retrieveUnpublishedEntryData(id);
      return data;
    } else if (collection && slug) {
      const entryId = this.api.generateContentKey(collection, slug);
      const data = await this.api.retrieveUnpublishedEntryData(entryId);
      return data;
    } else {
      throw new Error('Missing unpublished entry id or collection and slug');
    }
  }

  getBranch(collection, slug) {
    const contentKey = this.api.generateContentKey(collection, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    return branch;
  }

  async unpublishedEntryDataFile(collection, slug, path, id) {
    const branch = this.getBranch(collection, slug);
    const data = await this.api.readFile(path, id, {
      branch
    });
    return data;
  }

  async unpublishedEntryMediaFile(collection, slug, path, id) {
    const branch = this.getBranch(collection, slug);
    const mediaFile = await this.loadMediaFile(branch, {
      path,
      id
    });
    return mediaFile;
  }

  async getDeployPreview(collection, slug) {
    try {
      const statuses = await this.api.getStatuses(collection, slug);
      const deployStatus = (0, _netlifyCmsLibUtil.getPreviewStatus)(statuses, this.previewContext);

      if (deployStatus) {
        const {
          target_url: url,
          state
        } = deployStatus;
        return {
          url,
          status: state
        };
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  updateUnpublishedEntryStatus(collection, slug, newStatus) {
    // updateUnpublishedEntryStatus is a transactional operation
    return (0, _netlifyCmsLibUtil.runWithLock)(this.lock, () => this.api.updateUnpublishedEntryStatus(collection, slug, newStatus), 'Failed to acquire update entry status lock');
  }

  deleteUnpublishedEntry(collection, slug) {
    // deleteUnpublishedEntry is a transactional operation
    return (0, _netlifyCmsLibUtil.runWithLock)(this.lock, () => this.api.deleteUnpublishedEntry(collection, slug), 'Failed to acquire delete entry lock');
  }

  publishUnpublishedEntry(collection, slug) {
    // publishUnpublishedEntry is a transactional operation
    return (0, _netlifyCmsLibUtil.runWithLock)(this.lock, () => this.api.publishUnpublishedEntry(collection, slug), 'Failed to acquire publish entry lock');
  }

}

exports.default = GitHub;