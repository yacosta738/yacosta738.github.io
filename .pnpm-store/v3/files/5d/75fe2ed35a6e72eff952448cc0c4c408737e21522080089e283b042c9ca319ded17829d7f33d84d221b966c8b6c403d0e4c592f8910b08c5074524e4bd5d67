"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.API_NAME = void 0;
exports.getMaxAccess = getMaxAccess;

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _result2 = _interopRequireDefault(require("lodash/result"));

var _partial2 = _interopRequireDefault(require("lodash/partial"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _apolloClient = require("apollo-client");

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _apolloLinkHttp = require("apollo-link-http");

var _apolloLinkContext = require("apollo-link-context");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _jsBase = require("js-base64");

var _immutable = require("immutable");

var _path = require("path");

var queries = _interopRequireWildcard(require("./queries"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NO_CACHE = 'no-cache';
const API_NAME = 'GitLab';
exports.API_NAME = API_NAME;
var CommitAction;

(function (CommitAction) {
  CommitAction["CREATE"] = "create";
  CommitAction["DELETE"] = "delete";
  CommitAction["MOVE"] = "move";
  CommitAction["UPDATE"] = "update";
})(CommitAction || (CommitAction = {}));

var GitLabCommitStatuses;

(function (GitLabCommitStatuses) {
  GitLabCommitStatuses["Pending"] = "pending";
  GitLabCommitStatuses["Running"] = "running";
  GitLabCommitStatuses["Success"] = "success";
  GitLabCommitStatuses["Failed"] = "failed";
  GitLabCommitStatuses["Canceled"] = "canceled";
})(GitLabCommitStatuses || (GitLabCommitStatuses = {}));

function getMaxAccess(groups) {
  return groups.reduce((previous, current) => {
    if (current.group_access_level > previous.group_access_level) {
      return current;
    }

    return previous;
  }, groups[0]);
}

function batch(items, maxPerBatch, action) {
  for (let index = 0; index < items.length; index = index + maxPerBatch) {
    const itemsSlice = items.slice(index, index + maxPerBatch);
    action(itemsSlice);
  }
}

class API {
  constructor(config) {
    var _this = this;

    _defineProperty(this, "apiRoot", void 0);

    _defineProperty(this, "graphQLAPIRoot", void 0);

    _defineProperty(this, "token", void 0);

    _defineProperty(this, "branch", void 0);

    _defineProperty(this, "useOpenAuthoring", void 0);

    _defineProperty(this, "repo", void 0);

    _defineProperty(this, "repoURL", void 0);

    _defineProperty(this, "commitAuthor", void 0);

    _defineProperty(this, "squashMerges", void 0);

    _defineProperty(this, "initialWorkflowStatus", void 0);

    _defineProperty(this, "cmsLabelPrefix", void 0);

    _defineProperty(this, "graphQLClient", void 0);

    _defineProperty(this, "withAuthorizationHeaders", req => {
      const withHeaders = _netlifyCmsLibUtil.unsentRequest.withHeaders(this.token ? {
        Authorization: `Bearer ${this.token}`
      } : {}, req);

      return Promise.resolve(withHeaders);
    });

    _defineProperty(this, "buildRequest", async req => {
      const withRoot = _netlifyCmsLibUtil.unsentRequest.withRoot(this.apiRoot)(req);

      const withAuthorizationHeaders = await this.withAuthorizationHeaders(withRoot);

      if (withAuthorizationHeaders.has('cache')) {
        return withAuthorizationHeaders;
      } else {
        const withNoCache = _netlifyCmsLibUtil.unsentRequest.withNoCache(withAuthorizationHeaders);

        return withNoCache;
      }
    });

    _defineProperty(this, "request", async req => {
      try {
        return (0, _netlifyCmsLibUtil.requestWithBackoff)(this, req);
      } catch (err) {
        throw new _netlifyCmsLibUtil.APIError(err.message, null, API_NAME);
      }
    });

    _defineProperty(this, "responseToJSON", (0, _netlifyCmsLibUtil.responseParser)({
      format: 'json',
      apiName: API_NAME
    }));

    _defineProperty(this, "responseToBlob", (0, _netlifyCmsLibUtil.responseParser)({
      format: 'blob',
      apiName: API_NAME
    }));

    _defineProperty(this, "responseToText", (0, _netlifyCmsLibUtil.responseParser)({
      format: 'text',
      apiName: API_NAME
    }));

    _defineProperty(this, "requestJSON", req => this.request(req).then(this.responseToJSON));

    _defineProperty(this, "requestText", req => this.request(req).then(this.responseToText));

    _defineProperty(this, "user", () => this.requestJSON('/user'));

    _defineProperty(this, "WRITE_ACCESS", 30);

    _defineProperty(this, "MAINTAINER_ACCESS", 40);

    _defineProperty(this, "hasWriteAccess", async () => {
      const {
        shared_with_groups: sharedWithGroups,
        permissions
      } = await this.requestJSON(this.repoURL);
      const {
        project_access: projectAccess,
        group_access: groupAccess
      } = permissions;

      if (projectAccess && projectAccess.access_level >= this.WRITE_ACCESS) {
        return true;
      }

      if (groupAccess && groupAccess.access_level >= this.WRITE_ACCESS) {
        return true;
      } // check for group write permissions


      if (sharedWithGroups && sharedWithGroups.length > 0) {
        const maxAccess = getMaxAccess(sharedWithGroups); // maintainer access

        if (maxAccess.group_access_level >= this.MAINTAINER_ACCESS) {
          return true;
        } // developer access


        if (maxAccess.group_access_level >= this.WRITE_ACCESS) {
          // check permissions to merge and push
          try {
            const branch = await this.getDefaultBranch();

            if (branch.developers_can_merge && branch.developers_can_push) {
              return true;
            }
          } catch (e) {
            console.log('Failed getting default branch', e);
          }
        }
      }

      return false;
    });

    _defineProperty(this, "readFile", async function (path, sha) {
      let {
        parseText = true,
        branch = _this.branch
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      const fetchContent = async () => {
        const content = await _this.request({
          url: `${_this.repoURL}/repository/files/${encodeURIComponent(path)}/raw`,
          params: {
            ref: branch
          },
          cache: 'no-store'
        }).then(parseText ? _this.responseToText : _this.responseToBlob);
        return content;
      };

      const content = await (0, _netlifyCmsLibUtil.readFile)(sha, fetchContent, _netlifyCmsLibUtil.localForage, parseText);
      return content;
    });

    _defineProperty(this, "getCursorFromHeaders", headers => {
      const page = parseInt(headers.get('X-Page'), 10);
      const pageCount = parseInt(headers.get('X-Total-Pages'), 10);
      const pageSize = parseInt(headers.get('X-Per-Page'), 10);
      const count = parseInt(headers.get('X-Total'), 10);
      const links = (0, _netlifyCmsLibUtil.parseLinkHeader)(headers.get('Link'));
      const actions = (0, _immutable.Map)(links).keySeq().flatMap(key => key === 'prev' && page > 1 || key === 'next' && page < pageCount || key === 'first' && page > 1 || key === 'last' && page < pageCount ? [key] : []);
      return _netlifyCmsLibUtil.Cursor.create({
        actions,
        meta: {
          page,
          count,
          pageSize,
          pageCount
        },
        data: {
          links
        }
      });
    });

    _defineProperty(this, "getCursor", _ref => {
      let {
        headers
      } = _ref;
      return this.getCursorFromHeaders(headers);
    });

    _defineProperty(this, "fetchCursor", req => (0, _flow2.default)([_netlifyCmsLibUtil.unsentRequest.withMethod('HEAD'), this.request, (0, _netlifyCmsLibUtil.then)(this.getCursor)])(req));

    _defineProperty(this, "fetchCursorAndEntries", req => (0, _flow2.default)([_netlifyCmsLibUtil.unsentRequest.withMethod('GET'), this.request, p => Promise.all([p.then(this.getCursor), p.then(this.responseToJSON).catch(e => {
      if (e.status === 404) {
        return [];
      } else {
        throw e;
      }
    })]), (0, _netlifyCmsLibUtil.then)(_ref2 => {
      let [cursor, entries] = _ref2;
      return {
        cursor,
        entries
      };
    })])(req));

    _defineProperty(this, "listFiles", async function (path) {
      let recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      const {
        entries,
        cursor
      } = await _this.fetchCursorAndEntries({
        url: `${_this.repoURL}/repository/tree`,
        params: {
          path,
          ref: _this.branch,
          recursive
        }
      });
      return {
        files: entries.filter(_ref3 => {
          let {
            type
          } = _ref3;
          return type === 'blob';
        }),
        cursor
      };
    });

    _defineProperty(this, "traverseCursor", async (cursor, action) => {
      const link = cursor.data.getIn(['links', action]);
      const {
        entries,
        cursor: newCursor
      } = await this.fetchCursorAndEntries(link);
      return {
        entries: entries.filter(_ref4 => {
          let {
            type
          } = _ref4;
          return type === 'blob';
        }),
        cursor: newCursor
      };
    });

    _defineProperty(this, "listAllFilesGraphQL", async (path, recursive, branch) => {
      const files = [];
      let blobsPaths;
      let cursor;

      do {
        blobsPaths = await this.graphQLClient.query({
          query: queries.files,
          variables: {
            repo: this.repo,
            branch,
            path,
            recursive,
            cursor
          }
        });
        files.push(...blobsPaths.data.project.repository.tree.blobs.nodes);
        cursor = blobsPaths.data.project.repository.tree.blobs.pageInfo.endCursor;
      } while (blobsPaths.data.project.repository.tree.blobs.pageInfo.hasNextPage);

      return files;
    });

    _defineProperty(this, "readFilesGraphQL", async files => {
      const paths = files.map(_ref5 => {
        let {
          path
        } = _ref5;
        return path;
      });
      const blobPromises = [];
      batch(paths, 90, slice => {
        blobPromises.push(this.graphQLClient.query({
          query: queries.blobs,
          variables: {
            repo: this.repo,
            branch: this.branch,
            paths: slice
          },
          fetchPolicy: 'cache-first'
        }));
      });
      const commitPromises = [];
      batch(paths, 8, slice => {
        commitPromises.push(this.graphQLClient.query({
          query: queries.lastCommits(slice),
          variables: {
            repo: this.repo,
            branch: this.branch
          },
          fetchPolicy: 'cache-first'
        }));
      });
      const [blobsResults, commitsResults] = await Promise.all([(await Promise.all(blobPromises)).map(result => result.data.project.repository.blobs.nodes), (await Promise.all(commitPromises)).map(result => Object.values(result.data.project.repository).map(_ref6 => {
        let {
          lastCommit
        } = _ref6;
        return lastCommit;
      }).filter(Boolean))]);
      const blobs = blobsResults.flat().map(result => result.data);
      const metadata = commitsResults.flat().map(_ref7 => {
        let {
          author,
          authoredDate,
          authorName
        } = _ref7;
        return {
          author: author ? author.name || author.username || author.publicEmail : authorName,
          updatedOn: authoredDate
        };
      });
      const filesWithData = files.map((file, index) => ({
        file: _objectSpread(_objectSpread({}, file), metadata[index]),
        data: blobs[index]
      }));
      return filesWithData;
    });

    _defineProperty(this, "listAllFiles", async function (path) {
      let recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let branch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.branch;

      if (_this.graphQLClient) {
        return await _this.listAllFilesGraphQL(path, recursive, branch);
      }

      const entries = []; // eslint-disable-next-line prefer-const

      let {
        cursor,
        entries: initialEntries
      } = await _this.fetchCursorAndEntries({
        url: `${_this.repoURL}/repository/tree`,
        // Get the maximum number of entries per page
        params: {
          path,
          ref: branch,
          per_page: 100,
          recursive
        }
      });
      entries.push(...initialEntries);

      while (cursor && cursor.actions.has('next')) {
        const link = cursor.data.getIn(['links', 'next']);
        const {
          cursor: newCursor,
          entries: newEntries
        } = await _this.fetchCursorAndEntries(link);
        entries.push(...newEntries);
        cursor = newCursor;
      }

      return entries.filter(_ref8 => {
        let {
          type
        } = _ref8;
        return type === 'blob';
      });
    });

    _defineProperty(this, "toBase64", str => Promise.resolve(_jsBase.Base64.encode(str)));

    _defineProperty(this, "fromBase64", str => _jsBase.Base64.decode(str));

    _defineProperty(this, "deleteFiles", (paths, commitMessage) => {
      const branch = this.branch;
      const commitParams = {
        commit_message: commitMessage,
        branch
      };

      if (this.commitAuthor) {
        const {
          name,
          email
        } = this.commitAuthor;
        commitParams.author_name = name;
        commitParams.author_email = email;
      }

      const items = paths.map(path => ({
        path,
        action: CommitAction.DELETE
      }));
      return this.uploadAndCommit(items, {
        commitMessage
      });
    });

    this.apiRoot = config.apiRoot || 'https://gitlab.com/api/v4';
    this.graphQLAPIRoot = config.graphQLAPIRoot || 'https://gitlab.com/api/graphql';
    this.token = config.token || false;
    this.branch = config.branch || 'master';
    this.repo = config.repo || '';
    this.repoURL = `/projects/${encodeURIComponent(this.repo)}`;
    this.squashMerges = config.squashMerges;
    this.initialWorkflowStatus = config.initialWorkflowStatus;
    this.cmsLabelPrefix = config.cmsLabelPrefix;

    if (config.useGraphQL === true) {
      this.graphQLClient = this.getApolloClient();
    }
  }

  getApolloClient() {
    const authLink = (0, _apolloLinkContext.setContext)((_, _ref9) => {
      let {
        headers
      } = _ref9;
      return {
        headers: _objectSpread(_objectSpread({
          'Content-Type': 'application/json; charset=utf-8'
        }, headers), {}, {
          authorization: this.token ? `token ${this.token}` : ''
        })
      };
    });
    const httpLink = (0, _apolloLinkHttp.createHttpLink)({
      uri: this.graphQLAPIRoot
    });
    return new _apolloClient.ApolloClient({
      link: authLink.concat(httpLink),
      cache: new _apolloCacheInmemory.InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: NO_CACHE,
          errorPolicy: 'ignore'
        },
        query: {
          fetchPolicy: NO_CACHE,
          errorPolicy: 'all'
        }
      }
    });
  }

  reset() {
    var _this$graphQLClient;

    return (_this$graphQLClient = this.graphQLClient) === null || _this$graphQLClient === void 0 ? void 0 : _this$graphQLClient.resetStore();
  }

  async readFileMetadata(path, sha) {
    const fetchFileMetadata = async () => {
      try {
        const result = await this.requestJSON({
          url: `${this.repoURL}/repository/commits`,
          params: {
            path,
            ref_name: this.branch
          }
        });
        const commit = result[0];
        return {
          author: commit.author_name || commit.author_email,
          updatedOn: commit.authored_date
        };
      } catch (e) {
        return {
          author: '',
          updatedOn: ''
        };
      }
    };

    const fileMetadata = await (0, _netlifyCmsLibUtil.readFileMetadata)(sha, fetchFileMetadata, _netlifyCmsLibUtil.localForage);
    return fileMetadata;
  }

  async getBranch(branchName) {
    const branch = await this.requestJSON(`${this.repoURL}/repository/branches/${encodeURIComponent(branchName)}`);
    return branch;
  }

  async uploadAndCommit(items, _ref10) {
    let {
      commitMessage = '',
      branch = this.branch,
      newBranch = false
    } = _ref10;
    const actions = items.map(item => _objectSpread(_objectSpread({
      action: item.action,
      file_path: item.path
    }, item.oldPath ? {
      previous_path: item.oldPath
    } : {}), item.base64Content !== undefined ? {
      content: item.base64Content,
      encoding: 'base64'
    } : {}));

    const commitParams = _objectSpread({
      branch,
      commit_message: commitMessage,
      actions
    }, newBranch ? {
      start_branch: this.branch
    } : {});

    if (this.commitAuthor) {
      const {
        name,
        email
      } = this.commitAuthor;
      commitParams.author_name = name;
      commitParams.author_email = email;
    }

    try {
      const result = await this.requestJSON({
        url: `${this.repoURL}/repository/commits`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(commitParams)
      });
      return result;
    } catch (error) {
      const message = error.message || '';

      if (newBranch && message.includes(`Could not update ${branch}`)) {
        await (0, _netlifyCmsLibUtil.throwOnConflictingBranches)(branch, name => this.getBranch(name), API_NAME);
      }

      throw error;
    }
  }

  async getCommitItems(files, branch) {
    const items = await Promise.all(files.map(async file => {
      const [base64Content, fileExists] = await Promise.all([(0, _result2.default)(file, 'toBase64', (0, _partial2.default)(this.toBase64, file.raw)), this.isFileExists(file.path, branch)]);
      let action = CommitAction.CREATE;
      let path = (0, _trimStart2.default)(file.path, '/');
      let oldPath = undefined;

      if (fileExists) {
        oldPath = file.newPath && path;
        action = file.newPath && file.newPath !== oldPath ? CommitAction.MOVE : CommitAction.UPDATE;
        path = file.newPath ? (0, _trimStart2.default)(file.newPath, '/') : path;
      }

      return {
        action,
        base64Content,
        path,
        oldPath
      };
    })); // move children

    for (const item of items.filter(i => i.oldPath && i.action === CommitAction.MOVE)) {
      const sourceDir = (0, _path.dirname)(item.oldPath);
      const destDir = (0, _path.dirname)(item.path);
      const children = await this.listAllFiles(sourceDir, true, branch);
      children.filter(f => f.path !== item.oldPath).forEach(file => {
        items.push({
          action: CommitAction.MOVE,
          path: file.path.replace(sourceDir, destDir),
          oldPath: file.path
        });
      });
    }

    return items;
  }

  async persistFiles(dataFiles, mediaFiles, options) {
    const files = [...dataFiles, ...mediaFiles];

    if (options.useWorkflow) {
      const slug = dataFiles[0].slug;
      return this.editorialWorkflowGit(files, slug, options);
    } else {
      const items = await this.getCommitItems(files, this.branch);
      return this.uploadAndCommit(items, {
        commitMessage: options.commitMessage
      });
    }
  }

  async getMergeRequests(sourceBranch) {
    const mergeRequests = await this.requestJSON({
      url: `${this.repoURL}/merge_requests`,
      params: _objectSpread({
        state: 'opened',
        labels: 'Any',
        per_page: 100,
        target_branch: this.branch
      }, sourceBranch ? {
        source_branch: sourceBranch
      } : {})
    });
    return mergeRequests.filter(mr => mr.source_branch.startsWith(_netlifyCmsLibUtil.CMS_BRANCH_PREFIX) && mr.labels.some(l => (0, _netlifyCmsLibUtil.isCMSLabel)(l, this.cmsLabelPrefix)));
  }

  async listUnpublishedBranches() {
    console.log('%c Checking for Unpublished entries', 'line-height: 30px;text-align: center;font-weight: bold');
    const mergeRequests = await this.getMergeRequests();
    const branches = mergeRequests.map(mr => mr.source_branch);
    return branches;
  }

  async getFileId(path, branch) {
    const request = await this.request({
      method: 'HEAD',
      url: `${this.repoURL}/repository/files/${encodeURIComponent(path)}`,
      params: {
        ref: branch
      }
    });
    const blobId = request.headers.get('X-Gitlab-Blob-Id');
    return blobId;
  }

  async isFileExists(path, branch) {
    const fileExists = await this.requestText({
      method: 'HEAD',
      url: `${this.repoURL}/repository/files/${encodeURIComponent(path)}`,
      params: {
        ref: branch
      }
    }).then(() => true).catch(error => {
      if (error instanceof _netlifyCmsLibUtil.APIError && error.status === 404) {
        return false;
      }

      throw error;
    });
    return fileExists;
  }

  async getBranchMergeRequest(branch) {
    const mergeRequests = await this.getMergeRequests(branch);

    if (mergeRequests.length <= 0) {
      throw new _netlifyCmsLibUtil.EditorialWorkflowError('content is not under editorial workflow', true);
    }

    return mergeRequests[0];
  }

  async getDifferences(to) {
    let from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.branch;

    if (to === from) {
      return [];
    }

    const result = await this.requestJSON({
      url: `${this.repoURL}/repository/compare`,
      params: {
        from,
        to
      }
    });

    if (result.diffs.length >= 1000) {
      throw new _netlifyCmsLibUtil.APIError('Diff limit reached', null, API_NAME);
    }

    return result.diffs.map(d => {
      let status = 'modified';

      if (d.new_file) {
        status = 'added';
      } else if (d.deleted_file) {
        status = 'deleted';
      } else if (d.renamed_file) {
        status = 'renamed';
      }

      return {
        status,
        oldPath: d.old_path,
        newPath: d.new_path,
        newFile: d.new_file,
        path: d.new_path || d.old_path,
        binary: d.diff.startsWith('Binary') || /.svg$/.test(d.new_path)
      };
    });
  }

  async retrieveUnpublishedEntryData(contentKey) {
    const {
      collection,
      slug
    } = (0, _netlifyCmsLibUtil.parseContentKey)(contentKey);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const mergeRequest = await this.getBranchMergeRequest(branch);
    const diffs = await this.getDifferences(mergeRequest.sha);
    const diffsWithIds = await Promise.all(diffs.map(async d => {
      const {
        path,
        newFile
      } = d;
      const id = await this.getFileId(path, branch);
      return {
        id,
        path,
        newFile
      };
    }));
    const label = mergeRequest.labels.find(l => (0, _netlifyCmsLibUtil.isCMSLabel)(l, this.cmsLabelPrefix));
    const status = (0, _netlifyCmsLibUtil.labelToStatus)(label, this.cmsLabelPrefix);
    const updatedAt = mergeRequest.updated_at;
    const pullRequestAuthor = mergeRequest.author.name;
    return {
      collection,
      slug,
      status,
      diffs: diffsWithIds,
      updatedAt,
      pullRequestAuthor
    };
  }

  async rebaseMergeRequest(mergeRequest) {
    let rebase = await this.requestJSON({
      method: 'PUT',
      url: `${this.repoURL}/merge_requests/${mergeRequest.iid}/rebase?skip_ci=true`
    });
    let i = 1;

    while (rebase.rebase_in_progress) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      rebase = await this.requestJSON({
        url: `${this.repoURL}/merge_requests/${mergeRequest.iid}`,
        params: {
          include_rebase_in_progress: true
        }
      });

      if (!rebase.rebase_in_progress || i > 30) {
        break;
      }

      i++;
    }

    if (rebase.rebase_in_progress) {
      throw new _netlifyCmsLibUtil.APIError('Timed out rebasing merge request', null, API_NAME);
    } else if (rebase.merge_error) {
      throw new _netlifyCmsLibUtil.APIError(`Rebase error: ${rebase.merge_error}`, null, API_NAME);
    }
  }

  async createMergeRequest(branch, commitMessage, status) {
    await this.requestJSON({
      method: 'POST',
      url: `${this.repoURL}/merge_requests`,
      params: {
        source_branch: branch,
        target_branch: this.branch,
        title: commitMessage,
        description: _netlifyCmsLibUtil.DEFAULT_PR_BODY,
        labels: (0, _netlifyCmsLibUtil.statusToLabel)(status, this.cmsLabelPrefix),
        remove_source_branch: true,
        squash: this.squashMerges
      }
    });
  }

  async editorialWorkflowGit(files, slug, options) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(options.collectionName, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const unpublished = options.unpublished || false;

    if (!unpublished) {
      const items = await this.getCommitItems(files, this.branch);
      await this.uploadAndCommit(items, {
        commitMessage: options.commitMessage,
        branch,
        newBranch: true
      });
      await this.createMergeRequest(branch, options.commitMessage, options.status || this.initialWorkflowStatus);
    } else {
      const mergeRequest = await this.getBranchMergeRequest(branch);
      await this.rebaseMergeRequest(mergeRequest);
      const [items, diffs] = await Promise.all([this.getCommitItems(files, branch), this.getDifferences(branch)]); // mark files for deletion

      for (const diff of diffs.filter(d => d.binary)) {
        if (!items.some(item => item.path === diff.path)) {
          items.push({
            action: CommitAction.DELETE,
            path: diff.newPath
          });
        }
      }

      await this.uploadAndCommit(items, {
        commitMessage: options.commitMessage,
        branch
      });
    }
  }

  async updateMergeRequestLabels(mergeRequest, labels) {
    await this.requestJSON({
      method: 'PUT',
      url: `${this.repoURL}/merge_requests/${mergeRequest.iid}`,
      params: {
        labels: labels.join(',')
      }
    });
  }

  async updateUnpublishedEntryStatus(collection, slug, newStatus) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collection, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const mergeRequest = await this.getBranchMergeRequest(branch);
    const labels = [...mergeRequest.labels.filter(label => !(0, _netlifyCmsLibUtil.isCMSLabel)(label, this.cmsLabelPrefix)), (0, _netlifyCmsLibUtil.statusToLabel)(newStatus, this.cmsLabelPrefix)];
    await this.updateMergeRequestLabels(mergeRequest, labels);
  }

  async mergeMergeRequest(mergeRequest) {
    await this.requestJSON({
      method: 'PUT',
      url: `${this.repoURL}/merge_requests/${mergeRequest.iid}/merge`,
      params: {
        merge_commit_message: _netlifyCmsLibUtil.MERGE_COMMIT_MESSAGE,
        squash_commit_message: _netlifyCmsLibUtil.MERGE_COMMIT_MESSAGE,
        squash: this.squashMerges,
        should_remove_source_branch: true
      }
    });
  }

  async publishUnpublishedEntry(collectionName, slug) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collectionName, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const mergeRequest = await this.getBranchMergeRequest(branch);
    await this.mergeMergeRequest(mergeRequest);
  }

  async closeMergeRequest(mergeRequest) {
    await this.requestJSON({
      method: 'PUT',
      url: `${this.repoURL}/merge_requests/${mergeRequest.iid}`,
      params: {
        state_event: 'close'
      }
    });
  }

  async getDefaultBranch() {
    const branch = await this.getBranch(this.branch);
    return branch;
  }

  async isShaExistsInBranch(branch, sha) {
    const refs = await this.requestJSON({
      url: `${this.repoURL}/repository/commits/${sha}/refs`,
      params: {
        type: 'branch'
      }
    });
    return refs.some(r => r.name === branch);
  }

  async deleteBranch(branch) {
    await this.request({
      method: 'DELETE',
      url: `${this.repoURL}/repository/branches/${encodeURIComponent(branch)}`
    });
  }

  async deleteUnpublishedEntry(collectionName, slug) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collectionName, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const mergeRequest = await this.getBranchMergeRequest(branch);
    await this.closeMergeRequest(mergeRequest);
    await this.deleteBranch(branch);
  }

  async getMergeRequestStatues(mergeRequest, branch) {
    const statuses = await this.requestJSON({
      url: `${this.repoURL}/repository/commits/${mergeRequest.sha}/statuses`,
      params: {
        ref: branch
      }
    });
    return statuses;
  }

  async getStatuses(collectionName, slug) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collectionName, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const mergeRequest = await this.getBranchMergeRequest(branch);
    const statuses = await this.getMergeRequestStatues(mergeRequest, branch);
    return statuses.map(_ref11 => {
      let {
        name,
        status,
        target_url
      } = _ref11;
      return {
        context: name,
        state: status === GitLabCommitStatuses.Success ? _netlifyCmsLibUtil.PreviewState.Success : _netlifyCmsLibUtil.PreviewState.Other,
        target_url
      };
    });
  }

  async getUnpublishedEntrySha(collection, slug) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collection, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const mergeRequest = await this.getBranchMergeRequest(branch);
    return mergeRequest.sha;
  }

}

exports.default = API;