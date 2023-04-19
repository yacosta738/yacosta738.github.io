"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.selectCollectionEntriesCursor = selectCollectionEntriesCursor;

var _immutable = require("immutable");

var _netlifyCmsLibUtil = require("netlify-cms-lib-util");

var _entries = require("../actions/entries");

// Since pagination can be used for a variety of views (collections
// and searches are the most common examples), we namespace cursors by
// their type before storing them in the state.
function selectCollectionEntriesCursor(state, collectionName) {
  return new _netlifyCmsLibUtil.Cursor(state.getIn(['cursorsByType', 'collectionEntries', collectionName]));
}

function cursors() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.fromJS)({
    cursorsByType: {
      collectionEntries: {}
    }
  });
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _entries.ENTRIES_SUCCESS:
      {
        return state.setIn(['cursorsByType', 'collectionEntries', action.payload.collection], _netlifyCmsLibUtil.Cursor.create(action.payload.cursor).store);
      }

    case _entries.FILTER_ENTRIES_SUCCESS:
    case _entries.GROUP_ENTRIES_SUCCESS:
    case _entries.SORT_ENTRIES_SUCCESS:
      {
        return state.deleteIn(['cursorsByType', 'collectionEntries', action.payload.collection]);
      }

    default:
      return state;
  }
}

var _default = cursors;
exports.default = _default;