"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.API_NAME = void 0;

var _trimStart2 = _interopRequireDefault(require("lodash/trimStart"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _result2 = _interopRequireDefault(require("lodash/result"));

var _partial2 = _interopRequireDefault(require("lodash/partial"));

var _jsBase = require("js-base64");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const API_NAME = 'Azure DevOps';
exports.API_NAME = API_NAME;
const API_VERSION = 'api-version';
var AzureCommitStatusState;

(function (AzureCommitStatusState) {
  AzureCommitStatusState["ERROR"] = "error";
  AzureCommitStatusState["FAILED"] = "failed";
  AzureCommitStatusState["NOT_APPLICABLE"] = "notApplicable";
  AzureCommitStatusState["NOT_SET"] = "notSet";
  AzureCommitStatusState["PENDING"] = "pending";
  AzureCommitStatusState["SUCCEEDED"] = "succeeded";
})(AzureCommitStatusState || (AzureCommitStatusState = {}));

var AzureCommitChangeType;

(function (AzureCommitChangeType) {
  AzureCommitChangeType["ADD"] = "add";
  AzureCommitChangeType["DELETE"] = "delete";
  AzureCommitChangeType["RENAME"] = "rename";
  AzureCommitChangeType["EDIT"] = "edit";
})(AzureCommitChangeType || (AzureCommitChangeType = {}));

var AzureItemContentType;

(function (AzureItemContentType) {
  AzureItemContentType["BASE64"] = "base64encoded";
})(AzureItemContentType || (AzureItemContentType = {}));

var AzurePullRequestStatus;

(function (AzurePullRequestStatus) {
  AzurePullRequestStatus["ACTIVE"] = "active";
  AzurePullRequestStatus["COMPLETED"] = "completed";
  AzurePullRequestStatus["ABANDONED"] = "abandoned";
})(AzurePullRequestStatus || (AzurePullRequestStatus = {}));

var AzureAsyncPullRequestStatus;

(function (AzureAsyncPullRequestStatus) {
  AzureAsyncPullRequestStatus["CONFLICTS"] = "conflicts";
  AzureAsyncPullRequestStatus["FAILURE"] = "failure";
  AzureAsyncPullRequestStatus["QUEUED"] = "queued";
  AzureAsyncPullRequestStatus["REJECTED"] = "rejectedByPolicy";
  AzureAsyncPullRequestStatus["SUCCEEDED"] = "succeeded";
})(AzureAsyncPullRequestStatus || (AzureAsyncPullRequestStatus = {}));

var AzureObjectType; // https://docs.microsoft.com/en-us/rest/api/azure/devops/git/diffs/get?view=azure-devops-rest-6.1#gitcommitdiffs

(function (AzureObjectType) {
  AzureObjectType["BLOB"] = "blob";
  AzureObjectType["TREE"] = "tree";
})(AzureObjectType || (AzureObjectType = {}));

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getChangeItem(item) {
  switch (item.action) {
    case AzureCommitChangeType.ADD:
      return {
        changeType: AzureCommitChangeType.ADD,
        item: {
          path: item.path
        },
        newContent: {
          content: item.base64Content,
          contentType: AzureItemContentType.BASE64
        }
      };

    case AzureCommitChangeType.EDIT:
      return {
        changeType: AzureCommitChangeType.EDIT,
        item: {
          path: item.path
        },
        newContent: {
          content: item.base64Content,
          contentType: AzureItemContentType.BASE64
        }
      };

    case AzureCommitChangeType.DELETE:
      return {
        changeType: AzureCommitChangeType.DELETE,
        item: {
          path: item.path
        }
      };

    case AzureCommitChangeType.RENAME:
      return {
        changeType: AzureCommitChangeType.RENAME,
        item: {
          path: item.path
        },
        sourceServerItem: item.oldPath
      };

    default:
      return {};
  }
}

class API {
  constructor(config, token) {
    var _this = this;

    _defineProperty(this, "apiVersion", void 0);

    _defineProperty(this, "token", void 0);

    _defineProperty(this, "branch", void 0);

    _defineProperty(this, "mergeStrategy", void 0);

    _defineProperty(this, "endpointUrl", void 0);

    _defineProperty(this, "initialWorkflowStatus", void 0);

    _defineProperty(this, "cmsLabelPrefix", void 0);

    _defineProperty(this, "withHeaders", req => {
      const withHeaders = _netlifyCmsLibUtil.unsentRequest.withHeaders({
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json; charset=utf-8'
      }, req);

      return withHeaders;
    });

    _defineProperty(this, "withAzureFeatures", req => {
      if (req.hasIn(['params', API_VERSION])) {
        return req;
      }

      const withParams = _netlifyCmsLibUtil.unsentRequest.withParams({
        [API_VERSION]: `${this.apiVersion}`
      }, req);

      return withParams;
    });

    _defineProperty(this, "buildRequest", req => {
      const withHeaders = this.withHeaders(req);
      const withAzureFeatures = this.withAzureFeatures(withHeaders);

      if (withAzureFeatures.has('cache')) {
        return withAzureFeatures;
      } else {
        const withNoCache = _netlifyCmsLibUtil.unsentRequest.withNoCache(withAzureFeatures);

        return withNoCache;
      }
    });

    _defineProperty(this, "request", req => {
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

    _defineProperty(this, "toBase64", str => Promise.resolve(_jsBase.Base64.encode(str)));

    _defineProperty(this, "fromBase64", str => _jsBase.Base64.decode(str));

    _defineProperty(this, "branchToRef", branch => `refs/heads/${branch}`);

    _defineProperty(this, "refToBranch", ref => ref.slice('refs/heads/'.length));

    _defineProperty(this, "user", async () => {
      var _result$coreAttribute, _result$coreAttribute2, _result$coreAttribute3, _result$coreAttribute4, _result$coreAttribute5, _result$coreAttribute6, _result$coreAttribute7;

      const result = await this.requestJSON({
        url: 'https://app.vssps.visualstudio.com/_apis/profile/profiles/me',
        params: {
          [API_VERSION]: '6.1-preview.2'
        }
      });
      const name = (_result$coreAttribute = result.coreAttributes) === null || _result$coreAttribute === void 0 ? void 0 : (_result$coreAttribute2 = _result$coreAttribute.DisplayName) === null || _result$coreAttribute2 === void 0 ? void 0 : _result$coreAttribute2.value;
      const email = (_result$coreAttribute3 = result.coreAttributes) === null || _result$coreAttribute3 === void 0 ? void 0 : (_result$coreAttribute4 = _result$coreAttribute3.EmailAddress) === null || _result$coreAttribute4 === void 0 ? void 0 : _result$coreAttribute4.value;
      const url = (_result$coreAttribute5 = result.coreAttributes) === null || _result$coreAttribute5 === void 0 ? void 0 : (_result$coreAttribute6 = _result$coreAttribute5.Avatar) === null || _result$coreAttribute6 === void 0 ? void 0 : (_result$coreAttribute7 = _result$coreAttribute6.value) === null || _result$coreAttribute7 === void 0 ? void 0 : _result$coreAttribute7.value;
      const user = {
        name: name || email || '',
        avatar_url: `data:image/png;base64,${url}`,
        email
      };
      return user;
    });

    _defineProperty(this, "readFile", function (path, sha) {
      let {
        parseText = true,
        branch = _this.branch
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      const fetchContent = () => {
        return _this.request({
          url: `${_this.endpointUrl}/items/`,
          params: {
            version: branch,
            path
          },
          cache: 'no-store'
        }).then(parseText ? _this.responseToText : _this.responseToBlob);
      };

      return (0, _netlifyCmsLibUtil.readFile)(sha, fetchContent, _netlifyCmsLibUtil.localForage, parseText);
    });

    _defineProperty(this, "listFiles", async function (path, recursive) {
      let branch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.branch;

      try {
        const {
          value: items
        } = await _this.requestJSON({
          url: `${_this.endpointUrl}/items/`,
          params: {
            version: branch,
            scopePath: path,
            recursionLevel: recursive ? 'full' : 'oneLevel'
          }
        });
        const files = items.filter(item => item.gitObjectType === AzureObjectType.BLOB).map(file => ({
          id: file.objectId,
          path: (0, _trimStart2.default)(file.path, '/'),
          name: (0, _path.basename)(file.path)
        }));
        return files;
      } catch (err) {
        if (err && err.status === 404) {
          console.log('This 404 was expected and handled appropriately.');
          return [];
        } else {
          throw err;
        }
      }
    });

    const {
      repo
    } = config;
    const apiRoot = (0, _trim2.default)(config.apiRoot, '/');
    this.endpointUrl = `${apiRoot}/${repo.org}/${repo.project}/_apis/git/repositories/${repo.repoName}`;
    this.token = token;
    this.branch = config.branch;
    this.mergeStrategy = config.squashMerges ? 'squash' : 'noFastForward';
    this.initialWorkflowStatus = config.initialWorkflowStatus;
    this.apiVersion = config.apiVersion;
    this.cmsLabelPrefix = config.cmsLabelPrefix;
  }

  async readFileMetadata(path, sha) {
    let {
      branch = this.branch
    } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    const fetchFileMetadata = async () => {
      try {
        const {
          value
        } = await this.requestJSON({
          url: `${this.endpointUrl}/commits/`,
          params: {
            'searchCriteria.itemPath': path,
            'searchCriteria.itemVersion.version': branch,
            'searchCriteria.$top': 1
          }
        });
        const [commit] = value;
        return {
          author: commit.author.name || commit.author.email,
          updatedOn: commit.author.date
        };
      } catch (error) {
        return {
          author: '',
          updatedOn: ''
        };
      }
    };

    const fileMetadata = await (0, _netlifyCmsLibUtil.readFileMetadata)(sha, fetchFileMetadata, _netlifyCmsLibUtil.localForage);
    return fileMetadata;
  }

  async getRef() {
    let branch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.branch;
    const {
      value: refs
    } = await this.requestJSON({
      url: `${this.endpointUrl}/refs`,
      params: {
        $top: '1',
        // There's only one ref, so keep the payload small
        filter: 'heads/' + branch
      }
    });
    return refs.find(b => b.name == this.branchToRef(branch));
  }

  async deleteRef(ref) {
    const deleteBranchPayload = [{
      name: ref.name,
      oldObjectId: ref.objectId,
      newObjectId: '0000000000000000000000000000000000000000'
    }];
    await this.requestJSON({
      method: 'POST',
      url: `${this.endpointUrl}/refs`,
      body: JSON.stringify(deleteBranchPayload)
    });
  }

  async uploadAndCommit(items, comment, branch, newBranch) {
    const ref = await this.getRef(newBranch ? this.branch : branch);
    const refUpdate = [{
      name: this.branchToRef(branch),
      oldObjectId: ref.objectId
    }];
    const changes = items.map(item => getChangeItem(item));
    const commits = [{
      comment,
      changes
    }];
    const push = {
      refUpdates: refUpdate,
      commits
    };
    return this.requestJSON({
      url: `${this.endpointUrl}/pushes`,
      method: 'POST',
      body: JSON.stringify(push)
    });
  }

  async retrieveUnpublishedEntryData(contentKey) {
    var _pullRequest$createdB, _pullRequest$createdB2;

    const {
      collection,
      slug
    } = (0, _netlifyCmsLibUtil.parseContentKey)(contentKey);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const pullRequest = await this.getBranchPullRequest(branch);
    const diffs = await this.getDifferences(pullRequest.sourceRefName);
    const diffsWithIds = await Promise.all(diffs.map(async d => {
      const path = (0, _trimStart2.default)(d.item.path, '/');
      const newFile = d.changeType === AzureCommitChangeType.ADD;
      const id = d.item.objectId;
      return {
        id,
        path,
        newFile
      };
    }));
    const label = pullRequest.labels.find(l => (0, _netlifyCmsLibUtil.isCMSLabel)(l.name, this.cmsLabelPrefix));
    const labelName = label && label.name ? label.name : this.cmsLabelPrefix;
    const status = (0, _netlifyCmsLibUtil.labelToStatus)(labelName, this.cmsLabelPrefix); // Uses creationDate, as we do not have direct access to the updated date

    const updatedAt = pullRequest.closedDate ? pullRequest.closedDate : pullRequest.creationDate;
    const pullRequestAuthor = ((_pullRequest$createdB = pullRequest.createdBy) === null || _pullRequest$createdB === void 0 ? void 0 : _pullRequest$createdB.displayName) || ((_pullRequest$createdB2 = pullRequest.createdBy) === null || _pullRequest$createdB2 === void 0 ? void 0 : _pullRequest$createdB2.uniqueName);
    return {
      collection,
      slug,
      status,
      diffs: diffsWithIds,
      updatedAt,
      pullRequestAuthor
    };
  }

  async getPullRequestStatues(pullRequest) {
    const {
      value: commits
    } = await this.requestJSON({
      url: `${this.endpointUrl}/pullrequests/${pullRequest.pullRequestId}/commits`,
      params: {
        $top: 1
      }
    });
    const {
      value: statuses
    } = await this.requestJSON({
      url: `${this.endpointUrl}/commits/${commits[0].commitId}/statuses`,
      params: {
        latestOnly: true
      }
    });
    return statuses;
  }

  async getStatuses(collection, slug) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collection, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const pullRequest = await this.getBranchPullRequest(branch);
    const statuses = await this.getPullRequestStatues(pullRequest);
    return statuses.map(_ref => {
      let {
        context,
        state,
        targetUrl
      } = _ref;
      return {
        context: context.name,
        state: state === AzureCommitStatusState.SUCCEEDED ? _netlifyCmsLibUtil.PreviewState.Success : _netlifyCmsLibUtil.PreviewState.Other,
        target_url: targetUrl
      };
    });
  }

  async getCommitItems(files, branch) {
    const items = await Promise.all(files.map(async file => {
      const [base64Content, fileExists] = await Promise.all([(0, _result2.default)(file, 'toBase64', (0, _partial2.default)(this.toBase64, file.raw)), this.isFileExists(file.path, branch)]);
      const path = file.newPath || file.path;
      const oldPath = file.path;
      const renameOrEdit = path !== oldPath ? AzureCommitChangeType.RENAME : AzureCommitChangeType.EDIT;
      const action = fileExists ? renameOrEdit : AzureCommitChangeType.ADD;
      return {
        action,
        base64Content,
        path,
        oldPath
      };
    })); // move children

    for (const item of items.filter(i => i.oldPath && i.action === AzureCommitChangeType.RENAME)) {
      const sourceDir = (0, _path.dirname)(item.oldPath);
      const destDir = (0, _path.dirname)(item.path);
      const children = await this.listFiles(sourceDir, true, branch);
      children.filter(file => file.path !== item.oldPath).forEach(file => {
        items.push({
          action: AzureCommitChangeType.RENAME,
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
      return this.uploadAndCommit(items, options.commitMessage, this.branch, true);
    }
  }

  async deleteFiles(paths, comment) {
    const ref = await this.getRef(this.branch);
    const refUpdate = {
      name: ref.name,
      oldObjectId: ref.objectId
    };
    const changes = paths.map(path => getChangeItem({
      action: AzureCommitChangeType.DELETE,
      path
    }));
    const commits = [{
      comment,
      changes
    }];
    const push = {
      refUpdates: [refUpdate],
      commits
    };
    return this.requestJSON({
      url: `${this.endpointUrl}/pushes`,
      method: 'POST',
      body: JSON.stringify(push)
    });
  }

  async getPullRequests(sourceBranch) {
    const {
      value: pullRequests
    } = await this.requestJSON({
      url: `${this.endpointUrl}/pullrequests`,
      params: _objectSpread({
        'searchCriteria.status': 'active',
        'searchCriteria.targetRefName': this.branchToRef(this.branch),
        'searchCriteria.includeLinks': false
      }, sourceBranch ? {
        'searchCriteria.sourceRefName': this.branchToRef(sourceBranch)
      } : {})
    });
    const filtered = pullRequests.filter(pr => {
      return pr.labels.some(label => (0, _netlifyCmsLibUtil.isCMSLabel)(label.name, this.cmsLabelPrefix));
    });
    return filtered;
  }

  async listUnpublishedBranches() {
    const pullRequests = await this.getPullRequests();
    const branches = pullRequests.map(pr => this.refToBranch(pr.sourceRefName));
    return branches;
  }

  async isFileExists(path, branch) {
    try {
      await this.requestText({
        url: `${this.endpointUrl}/items/`,
        params: {
          version: branch,
          path
        },
        cache: 'no-store'
      });
      return true;
    } catch (error) {
      if (error instanceof _netlifyCmsLibUtil.APIError && error.status === 404) {
        return false;
      }

      throw error;
    }
  }

  async createPullRequest(branch, commitMessage, status) {
    const pr = {
      sourceRefName: this.branchToRef(branch),
      targetRefName: this.branchToRef(this.branch),
      title: commitMessage,
      description: _netlifyCmsLibUtil.DEFAULT_PR_BODY,
      labels: [{
        name: (0, _netlifyCmsLibUtil.statusToLabel)(status, this.cmsLabelPrefix)
      }]
    };
    await this.requestJSON({
      method: 'POST',
      url: `${this.endpointUrl}/pullrequests`,
      params: {
        supportsIterations: false
      },
      body: JSON.stringify(pr)
    });
  }

  async getBranchPullRequest(branch) {
    const pullRequests = await this.getPullRequests(branch);

    if (pullRequests.length <= 0) {
      throw new _netlifyCmsLibUtil.EditorialWorkflowError('content is not under editorial workflow', true);
    }

    return pullRequests[0];
  }

  async getDifferences(to) {
    const result = await this.requestJSON({
      url: `${this.endpointUrl}/diffs/commits`,
      params: {
        baseVersion: this.branch,
        targetVersion: this.refToBranch(to)
      }
    });
    return result.changes.filter(d => d.item.gitObjectType === AzureObjectType.BLOB && Object.values(AzureCommitChangeType).includes(d.changeType));
  }

  async editorialWorkflowGit(files, slug, options) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(options.collectionName, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const unpublished = options.unpublished || false;

    if (!unpublished) {
      const items = await this.getCommitItems(files, this.branch);
      await this.uploadAndCommit(items, options.commitMessage, branch, true);
      await this.createPullRequest(branch, options.commitMessage, options.status || this.initialWorkflowStatus);
    } else {
      const items = await this.getCommitItems(files, branch);
      await this.uploadAndCommit(items, options.commitMessage, branch, false);
    }
  }

  async updateUnpublishedEntryStatus(collection, slug, newStatus) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collection, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const pullRequest = await this.getBranchPullRequest(branch);
    const nonCmsLabels = pullRequest.labels.filter(label => !(0, _netlifyCmsLibUtil.isCMSLabel)(label.name, this.cmsLabelPrefix)).map(label => label.name);
    const labels = [...nonCmsLabels, (0, _netlifyCmsLibUtil.statusToLabel)(newStatus, this.cmsLabelPrefix)];
    await this.updatePullRequestLabels(pullRequest, labels);
  }

  async deleteUnpublishedEntry(collectionName, slug) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collectionName, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const pullRequest = await this.getBranchPullRequest(branch);
    await this.abandonPullRequest(pullRequest);
  }

  async publishUnpublishedEntry(collectionName, slug) {
    const contentKey = (0, _netlifyCmsLibUtil.generateContentKey)(collectionName, slug);
    const branch = (0, _netlifyCmsLibUtil.branchFromContentKey)(contentKey);
    const pullRequest = await this.getBranchPullRequest(branch);
    await this.completePullRequest(pullRequest);
  }

  async updatePullRequestLabels(pullRequest, labels) {
    const cmsLabels = pullRequest.labels.filter(l => (0, _netlifyCmsLibUtil.isCMSLabel)(l.name, this.cmsLabelPrefix));
    await Promise.all(cmsLabels.map(l => {
      return this.requestText({
        method: 'DELETE',
        url: `${this.endpointUrl}/pullrequests/${encodeURIComponent(pullRequest.pullRequestId)}/labels/${encodeURIComponent(l.id)}`
      });
    }));
    await Promise.all(labels.map(l => {
      return this.requestText({
        method: 'POST',
        url: `${this.endpointUrl}/pullrequests/${encodeURIComponent(pullRequest.pullRequestId)}/labels`,
        body: JSON.stringify({
          name: l
        })
      });
    }));
  }

  async completePullRequest(pullRequest) {
    const pullRequestCompletion = {
      status: AzurePullRequestStatus.COMPLETED,
      lastMergeSourceCommit: pullRequest.lastMergeSourceCommit,
      completionOptions: {
        deleteSourceBranch: true,
        mergeCommitMessage: _netlifyCmsLibUtil.MERGE_COMMIT_MESSAGE,
        mergeStrategy: this.mergeStrategy
      }
    };
    let response = await this.requestJSON({
      method: 'PATCH',
      url: `${this.endpointUrl}/pullrequests/${encodeURIComponent(pullRequest.pullRequestId)}`,
      body: JSON.stringify(pullRequestCompletion)
    }); // We need to wait for Azure to complete the pull request to actually complete
    // Sometimes this is instant, but frequently it is 1-3 seconds

    const DELAY_MILLISECONDS = 500;
    const MAX_ATTEMPTS = 10;
    let attempt = 1;

    while (response.mergeStatus === AzureAsyncPullRequestStatus.QUEUED && attempt <= MAX_ATTEMPTS) {
      await delay(DELAY_MILLISECONDS);
      response = await this.requestJSON({
        url: `${this.endpointUrl}/pullrequests/${encodeURIComponent(pullRequest.pullRequestId)}`
      });
      attempt = attempt + 1;
    }
  }

  async abandonPullRequest(pullRequest) {
    const pullRequestAbandon = {
      status: AzurePullRequestStatus.ABANDONED
    };
    await this.requestJSON({
      method: 'PATCH',
      url: `${this.endpointUrl}/pullrequests/${encodeURIComponent(pullRequest.pullRequestId)}`,
      body: JSON.stringify(pullRequestAbandon)
    });
    await this.deleteRef({
      name: pullRequest.sourceRefName,
      objectId: pullRequest.lastMergeSourceCommit.commitId
    });
  }

}

exports.default = API;