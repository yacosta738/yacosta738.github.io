"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _trimStart = _interopRequireDefault(require("lodash/trimStart"));

var _semaphore = _interopRequireDefault(require("semaphore"));

var _commonTags = require("common-tags");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _AuthenticationPage = _interopRequireDefault(require("./AuthenticationPage"));

var _API = _interopRequireWildcard(require("./API"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MAX_CONCURRENT_DOWNLOADS = 10;

class GitLab {
  constructor(config) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _defineProperty(this, "lock", void 0);

    _defineProperty(this, "api", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "repo", void 0);

    _defineProperty(this, "branch", void 0);

    _defineProperty(this, "apiRoot", void 0);

    _defineProperty(this, "token", void 0);

    _defineProperty(this, "squashMerges", void 0);

    _defineProperty(this, "cmsLabelPrefix", void 0);

    _defineProperty(this, "mediaFolder", void 0);

    _defineProperty(this, "previewContext", void 0);

    _defineProperty(this, "useGraphQL", void 0);

    _defineProperty(this, "graphQLAPIRoot", void 0);

    _defineProperty(this, "_mediaDisplayURLSem", void 0);

    this.options = _objectSpread({
      proxied: false,
      API: null,
      initialWorkflowStatus: ''
    }, options);

    if (!this.options.proxied && (config.backend.repo === null || config.backend.repo === undefined)) {
      throw new Error('The GitLab backend needs a "repo" in the backend configuration.');
    }

    this.api = this.options.API || null;
    this.repo = config.backend.repo || '';
    this.branch = config.backend.branch || 'master';
    this.apiRoot = config.backend.api_root || 'https://gitlab.com/api/v4';
    this.token = '';
    this.squashMerges = config.backend.squash_merges || false;
    this.cmsLabelPrefix = config.backend.cms_label_prefix || '';
    this.mediaFolder = config.media_folder;
    this.previewContext = config.backend.preview_context || '';
    this.useGraphQL = config.backend.use_graphql || false;
    this.graphQLAPIRoot = config.backend.graphql_api_root || 'https://gitlab.com/api/graphql';
    this.lock = (0, _netlifyCmsLibUtil.asyncLock)();
  }

  isGitBackend() {
    return true;
  }

  async status() {
    var _this$api;

    const auth = (await ((_this$api = this.api) === null || _this$api === void 0 ? void 0 : _this$api.user().then(user => !!user).catch(e => {
      console.warn('Failed getting GitLab user', e);
      return false;
    }))) || false;
    return {
      auth: {
        status: auth
      },
      api: {
        status: true,
        statusPage: ''
      }
    };
  }

  authComponent() {
    return _AuthenticationPage.default;
  }

  restoreUser(user) {
    return this.authenticate(user);
  }

  async authenticate(state) {
    this.token = state.token;
    this.api = new _API.default({
      token: this.token,
      branch: this.branch,
      repo: this.repo,
      apiRoot: this.apiRoot,
      squashMerges: this.squashMerges,
      cmsLabelPrefix: this.cmsLabelPrefix,
      initialWorkflowStatus: this.options.initialWorkflowStatus,
      useGraphQL: this.useGraphQL,
      graphQLAPIRoot: this.graphQLAPIRoot
    });
    const user = await this.api.user();
    const isCollab = await this.api.hasWriteAccess().catch(error => {
      error.message = (0, _commonTags.stripIndent)`
        Repo "${this.repo}" not found.

        Please ensure the repo information is spelled correctly.

        If the repo is private, make sure you're logged into a GitLab account with access.
      `;
      throw error;
    }); // Unauthorized user

    if (!isCollab) {
      throw new Error('Your GitLab user account does not have access to this repo.');
    } // Authorized user


    return _objectSpread(_objectSpread({}, user), {}, {
      login: user.username,
      token: state.token
    });
  }

  async logout() {
    this.token = null;
    return;
  }

  getToken() {
    return Promise.resolve(this.token);
  }

  filterFile(folder, file, extension, depth) {
    // gitlab paths include the root folder
    const fileFolder = (0, _trim2.default)(file.path.split(folder)[1] || '/', '/');
    return (0, _netlifyCmsLibUtil.filterByExtension)(file, extension) && fileFolder.split('/').length <= depth;
  }

  async entriesByFolder(folder, extension, depth) {
    let cursor;

    const listFiles = () => this.api.listFiles(folder, depth > 1).then(_ref => {
      let {
        files,
        cursor: c
      } = _ref;
      cursor = c.mergeMeta({
        folder,
        extension,
        depth
      });
      return files.filter(file => this.filterFile(folder, file, extension, depth));
    });

    const files = await (0, _netlifyCmsLibUtil.entriesByFolder)(listFiles, this.api.readFile.bind(this.api), this.api.readFileMetadata.bind(this.api), _API.API_NAME); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    files[_netlifyCmsLibUtil.CURSOR_COMPATIBILITY_SYMBOL] = cursor;
    return files;
  }

  async listAllFiles(folder, extension, depth) {
    const files = await this.api.listAllFiles(folder, depth > 1);
    const filtered = files.filter(file => this.filterFile(folder, file, extension, depth));
    return filtered;
  }

  async allEntriesByFolder(folder, extension, depth) {
    const files = await (0, _netlifyCmsLibUtil.allEntriesByFolder)({
      listAllFiles: () => this.listAllFiles(folder, extension, depth),
      readFile: this.api.readFile.bind(this.api),
      readFileMetadata: this.api.readFileMetadata.bind(this.api),
      apiName: _API.API_NAME,
      branch: this.branch,
      localForage: _netlifyCmsLibUtil.localForage,
      folder,
      extension,
      depth,
      getDefaultBranch: () => this.api.getDefaultBranch().then(b => ({
        name: b.name,
        sha: b.commit.id
      })),
      isShaExistsInBranch: this.api.isShaExistsInBranch.bind(this.api),
      getDifferences: (to, from) => this.api.getDifferences(to, from),
      getFileId: path => this.api.getFileId(path, this.branch),
      filterFile: file => this.filterFile(folder, file, extension, depth),
      customFetch: this.useGraphQL ? files => this.api.readFilesGraphQL(files) : undefined
    });
    return files;
  }

  entriesByFiles(files) {
    return (0, _netlifyCmsLibUtil.entriesByFiles)(files, this.api.readFile.bind(this.api), this.api.readFileMetadata.bind(this.api), _API.API_NAME);
  } // Fetches a single entry.


  getEntry(path) {
    return this.api.readFile(path).then(data => ({
      file: {
        path,
        id: null
      },
      data: data
    }));
  }

  getMedia() {
    let mediaFolder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.mediaFolder;
    return this.api.listAllFiles(mediaFolder).then(files => files.map(_ref2 => {
      let {
        id,
        name,
        path
      } = _ref2;
      return {
        id,
        name,
        path,
        displayURL: {
          id,
          name,
          path
        }
      };
    }));
  }

  getMediaDisplayURL(displayURL) {
    this._mediaDisplayURLSem = this._mediaDisplayURLSem || (0, _semaphore.default)(MAX_CONCURRENT_DOWNLOADS);
    return (0, _netlifyCmsLibUtil.getMediaDisplayURL)(displayURL, this.api.readFile.bind(this.api), this._mediaDisplayURLSem);
  }

  async getMediaFile(path) {
    const name = (0, _netlifyCmsLibUtil.basename)(path);
    const blob = await (0, _netlifyCmsLibUtil.getMediaAsBlob)(path, null, this.api.readFile.bind(this.api));
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

  async persistEntry(entry, options) {
    // persistEntry is a transactional operation
    return (0, _netlifyCmsLibUtil.runWithLock)(this.lock, () => this.api.persistFiles(entry.dataFiles, entry.assets, options), 'Failed to acquire persist entry lock');
  }

  async persistMedia(mediaFile, options) {
    const fileObj = mediaFile.fileObj;
    const [id] = await Promise.all([(0, _netlifyCmsLibUtil.getBlobSHA)(fileObj), this.api.persistFiles([], [mediaFile], options)]);
    const {
      path
    } = mediaFile;
    const url = URL.createObjectURL(fileObj);
    return {
      displayURL: url,
      path: (0, _trimStart.default)(path, '/'),
      name: fileObj.name,
      size: fileObj.size,
      file: fileObj,
      url,
      id
    };
  }

  deleteFiles(paths, commitMessage) {
    return this.api.deleteFiles(paths, commitMessage);
  }

  traverseCursor(cursor, action) {
    return this.api.traverseCursor(cursor, action).then(async _ref3 => {
      var _cursor$meta, _cursor$meta2, _cursor$meta3;

      let {
        entries,
        cursor: newCursor
      } = _ref3;
      const [folder, depth, extension] = [(_cursor$meta = cursor.meta) === null || _cursor$meta === void 0 ? void 0 : _cursor$meta.get('folder'), (_cursor$meta2 = cursor.meta) === null || _cursor$meta2 === void 0 ? void 0 : _cursor$meta2.get('depth'), (_cursor$meta3 = cursor.meta) === null || _cursor$meta3 === void 0 ? void 0 : _cursor$meta3.get('extension')];

      if (folder && depth && extension) {
        entries = entries.filter(f => this.filterFile(folder, f, extension, depth));
        newCursor = newCursor.mergeMeta({
          folder,
          extension,
          depth
        });
      }

      const entriesWithData = await (0, _netlifyCmsLibUtil.entriesByFiles)(entries, this.api.readFile.bind(this.api), this.api.readFileMetadata.bind(this.api), _API.API_NAME);
      return {
        entries: entriesWithData,
        cursor: newCursor
      };
    });
  }

  loadMediaFile(branch, file) {
    const readFile = (path, id, _ref4) => {
      let {
        parseText
      } = _ref4;
      return this.api.readFile(path, id, {
        branch,
        parseText
      });
    };

    return (0, _netlifyCmsLibUtil.getMediaAsBlob)(file.path, null, readFile).then(blob => {
      const name = (0, _netlifyCmsLibUtil.basename)(file.path);
      const fileObj = (0, _netlifyCmsLibUtil.blobToFileObj)(name, blob);
      return {
        id: file.path,
        displayURL: URL.createObjectURL(fileObj),
        path: file.path,
        name,
        size: fileObj.size,
        file: fileObj
      };
    });
  }

  async loadEntryMediaFiles(branch, files) {
    const mediaFiles = await Promise.all(files.map(file => this.loadMediaFile(branch, file)));
    return mediaFiles;
  }

  async unpublishedEntries() {
    const listEntriesKeys = () => this.api.listUnpublishedBranches().then(branches => branches.map(branch => (0, _netlifyCmsLibUtil.contentKeyFromBranch)(branch)));

    const ids = await (0, _netlifyCmsLibUtil.unpublishedEntries)(listEntriesKeys);
    return ids;
  }

  async unpublishedEntry(_ref5) {
    let {
      id,
      collection,
      slug
    } = _ref5;

    if (id) {
      const data = await this.api.retrieveUnpublishedEntryData(id);
      return data;
    } else if (collection && slug) {
      const entryId = (0, _netlifyCmsLibUtil.generateContentKey)(collection, slug);
      const data = await this.api.retrieveUnpublishedEntryData(entryId);
      return data;
    } else {
      throw new Error('Missing unpublished entry id or collection and slug');
    }
  }

  getBranch(collection, slug) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collection, slug);
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

  async updateUnpublishedEntryStatus(collection, slug, newStatus) {
    // updateUnpublishedEntryStatus is a transactional operation
    return (0, _netlifyCmsLibUtil.runWithLock)(this.lock, () => this.api.updateUnpublishedEntryStatus(collection, slug, newStatus), 'Failed to acquire update entry status lock');
  }

  async deleteUnpublishedEntry(collection, slug) {
    // deleteUnpublishedEntry is a transactional operation
    return (0, _netlifyCmsLibUtil.runWithLock)(this.lock, () => this.api.deleteUnpublishedEntry(collection, slug), 'Failed to acquire delete entry lock');
  }

  async publishUnpublishedEntry(collection, slug) {
    // publishUnpublishedEntry is a transactional operation
    return (0, _netlifyCmsLibUtil.runWithLock)(this.lock, () => this.api.publishUnpublishedEntry(collection, slug), 'Failed to acquire publish entry lock');
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

}

exports.default = GitLab;