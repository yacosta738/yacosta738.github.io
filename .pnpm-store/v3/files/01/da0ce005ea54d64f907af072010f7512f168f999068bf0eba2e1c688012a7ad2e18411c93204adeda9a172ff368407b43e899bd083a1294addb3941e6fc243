"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEARCH_ENTRIES_SUCCESS = exports.SEARCH_ENTRIES_REQUEST = exports.SEARCH_ENTRIES_FAILURE = exports.SEARCH_CLEAR = exports.QUERY_SUCCESS = exports.QUERY_REQUEST = exports.QUERY_FAILURE = void 0;
exports.clearSearch = clearSearch;
exports.query = query;
exports.queryFailure = queryFailure;
exports.querySuccess = querySuccess;
exports.querying = querying;
exports.searchEntries = searchEntries;
exports.searchFailure = searchFailure;
exports.searchSuccess = searchSuccess;
exports.searchingEntries = searchingEntries;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _backend = require("../backend");

var _integrations = require("../integrations");

var _reducers = require("../reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Constant Declarations
 */
const SEARCH_ENTRIES_REQUEST = 'SEARCH_ENTRIES_REQUEST';
exports.SEARCH_ENTRIES_REQUEST = SEARCH_ENTRIES_REQUEST;
const SEARCH_ENTRIES_SUCCESS = 'SEARCH_ENTRIES_SUCCESS';
exports.SEARCH_ENTRIES_SUCCESS = SEARCH_ENTRIES_SUCCESS;
const SEARCH_ENTRIES_FAILURE = 'SEARCH_ENTRIES_FAILURE';
exports.SEARCH_ENTRIES_FAILURE = SEARCH_ENTRIES_FAILURE;
const QUERY_REQUEST = 'QUERY_REQUEST';
exports.QUERY_REQUEST = QUERY_REQUEST;
const QUERY_SUCCESS = 'QUERY_SUCCESS';
exports.QUERY_SUCCESS = QUERY_SUCCESS;
const QUERY_FAILURE = 'QUERY_FAILURE';
exports.QUERY_FAILURE = QUERY_FAILURE;
const SEARCH_CLEAR = 'SEARCH_CLEAR';
/*
 * Simple Action Creators (Internal)
 * We still need to export them for tests
 */

exports.SEARCH_CLEAR = SEARCH_CLEAR;

function searchingEntries(searchTerm, searchCollections, page) {
  return {
    type: SEARCH_ENTRIES_REQUEST,
    payload: {
      searchTerm,
      searchCollections,
      page
    }
  };
}

function searchSuccess(entries, page) {
  return {
    type: SEARCH_ENTRIES_SUCCESS,
    payload: {
      entries,
      page
    }
  };
}

function searchFailure(error) {
  return {
    type: SEARCH_ENTRIES_FAILURE,
    payload: {
      error
    }
  };
}

function querying(searchTerm) {
  return {
    type: QUERY_REQUEST,
    payload: {
      searchTerm
    }
  };
}

function querySuccess(namespace, hits) {
  return {
    type: QUERY_SUCCESS,
    payload: {
      namespace,
      hits
    }
  };
}

function queryFailure(error) {
  return {
    type: QUERY_FAILURE,
    payload: {
      error
    }
  };
}
/*
 * Exported simple Action Creators
 */


function clearSearch() {
  return {
    type: SEARCH_CLEAR
  };
}
/*
 * Exported Thunk Action Creators
 */
// SearchEntries will search for complete entries in all collections.


function searchEntries(searchTerm, searchCollections) {
  let page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return async (dispatch, getState) => {
    const state = getState();
    const {
      search
    } = state;
    const backend = (0, _backend.currentBackend)(state.config);
    const allCollections = searchCollections || state.collections.keySeq().toArray();
    const collections = allCollections.filter(collection => (0, _reducers.selectIntegration)(state, collection, 'search'));
    const integration = (0, _reducers.selectIntegration)(state, collections[0], 'search'); // avoid duplicate searches

    if (search.isFetching && search.term === searchTerm && (0, _isEqual2.default)(allCollections, search.collections) && ( // if an integration doesn't exist, 'page' is not used
    search.page === page || !integration)) {
      return;
    }

    dispatch(searchingEntries(searchTerm, allCollections, page));
    const searchPromise = integration ? (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration).search(collections, searchTerm, page) : backend.search(state.collections.filter((_, key) => allCollections.indexOf(key) !== -1).valueSeq().toArray(), searchTerm);

    try {
      const response = await searchPromise;
      return dispatch(searchSuccess(response.entries, response.pagination));
    } catch (error) {
      return dispatch(searchFailure(error));
    }
  };
} // Instead of searching for complete entries, query will search for specific fields
// in specific collections and return raw data (no entries).


function query(namespace, collectionName, searchFields, searchTerm, file, limit) {
  return async (dispatch, getState) => {
    dispatch(querying(searchTerm));
    const state = getState();
    const backend = (0, _backend.currentBackend)(state.config);
    const integration = (0, _reducers.selectIntegration)(state, collectionName, 'search');
    const collection = state.collections.find(collection => collection.get('name') === collectionName);
    const queryPromise = integration ? (0, _integrations.getIntegrationProvider)(state.integrations, backend.getToken, integration).searchBy(searchFields.map(f => `data.${f}`), collectionName, searchTerm) : backend.query(collection, searchFields, searchTerm, file, limit);

    try {
      const response = await queryPromise;
      return dispatch(querySuccess(namespace, response.hits));
    } catch (error) {
      return dispatch(queryFailure(error));
    }
  };
}