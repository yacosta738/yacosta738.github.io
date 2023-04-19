"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CURSOR_COMPATIBILITY_SYMBOL = void 0;

var _immutable = require("immutable");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function jsToMap(obj) {
  if (obj === undefined) {
    return (0, _immutable.Map)();
  }

  const immutableObj = (0, _immutable.fromJS)(obj);

  if (!_immutable.Map.isMap(immutableObj)) {
    throw new Error('Object must be equivalent to a Map.');
  }

  return immutableObj;
}

const knownMetaKeys = (0, _immutable.Set)(['index', 'page', 'count', 'pageSize', 'pageCount', 'usingOldPaginationAPI', 'extension', 'folder', 'depth']);

function filterUnknownMetaKeys(meta) {
  return meta.filter((_v, k) => knownMetaKeys.has(k));
}
/*
  createCursorMap takes one of three signatures:
  - () -> cursor with empty actions, data, and meta
  - (cursorMap: <object/Map with optional actions, data, and meta keys>) -> cursor
  - (actions: <array/List>, data: <object/Map>, meta: <optional object/Map>) -> cursor
*/


function createCursorStore() {
  const {
    actions,
    data,
    meta
  } = arguments.length === 1 ? jsToMap(arguments.length <= 0 ? undefined : arguments[0]).toObject() : {
    actions: arguments.length <= 0 ? undefined : arguments[0],
    data: arguments.length <= 1 ? undefined : arguments[1],
    meta: arguments.length <= 2 ? undefined : arguments[2]
  };
  return (0, _immutable.Map)({
    // actions are a Set, rather than a List, to ensure an efficient .has
    actions: (0, _immutable.Set)(actions),
    // data and meta are Maps
    data: jsToMap(data),
    meta: jsToMap(meta).update(filterUnknownMetaKeys)
  });
}

function hasAction(store, action) {
  return store.hasIn(['actions', action]);
}

function getActionHandlers(store, handler) {
  return store.get('actions', (0, _immutable.Set)()).toMap().map(action => handler(action));
} // The cursor logic is entirely functional, so this class simply
// provides a chainable interface


class Cursor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Cursor(...args);
  }

  constructor() {
    _defineProperty(this, "store", void 0);

    _defineProperty(this, "actions", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "meta", void 0);

    if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof Cursor) {
      return arguments.length <= 0 ? undefined : arguments[0];
    }

    this.store = createCursorStore(...arguments);
    this.actions = this.store.get('actions');
    this.data = this.store.get('data');
    this.meta = this.store.get('meta');
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  updateStore() {
    return new Cursor(this.store.update(...arguments));
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  updateInStore() {
    return new Cursor(this.store.updateIn(...arguments));
  }

  hasAction(action) {
    return hasAction(this.store, action);
  }

  addAction(action) {
    return this.updateStore('actions', actions => actions.add(action));
  }

  removeAction(action) {
    return this.updateStore('actions', actions => actions.delete(action));
  }

  setActions(actions) {
    return this.updateStore(store => store.set('actions', (0, _immutable.Set)(actions)));
  }

  mergeActions(actions) {
    return this.updateStore('actions', oldActions => oldActions.union(actions));
  }

  getActionHandlers(handler) {
    return getActionHandlers(this.store, handler);
  }

  setData(data) {
    return new Cursor(this.store.set('data', jsToMap(data)));
  }

  mergeData(data) {
    return new Cursor(this.store.mergeIn(['data'], jsToMap(data)));
  }

  wrapData(data) {
    return this.updateStore('data', oldData => jsToMap(data).set('wrapped_cursor_data', oldData));
  }

  unwrapData() {
    return [this.store.get('data').delete('wrapped_cursor_data'), this.updateStore('data', data => data.get('wrapped_cursor_data'))];
  }

  clearData() {
    return this.updateStore('data', () => (0, _immutable.Map)());
  }

  setMeta(meta) {
    return this.updateStore(store => store.set('meta', jsToMap(meta)));
  }

  mergeMeta(meta) {
    return this.updateStore(store => store.update('meta', oldMeta => oldMeta.merge(jsToMap(meta))));
  }

} // This is a temporary hack to allow cursors to be added to the
// interface between backend.js and backends without modifying old
// backends at all. This should be removed in favor of wrapping old
// backends with a compatibility layer, as part of the backend API
// refactor.


exports.default = Cursor;
const CURSOR_COMPATIBILITY_SYMBOL = Symbol('cursor key for compatibility with old backends');
exports.CURSOR_COMPATIBILITY_SYMBOL = CURSOR_COMPATIBILITY_SYMBOL;