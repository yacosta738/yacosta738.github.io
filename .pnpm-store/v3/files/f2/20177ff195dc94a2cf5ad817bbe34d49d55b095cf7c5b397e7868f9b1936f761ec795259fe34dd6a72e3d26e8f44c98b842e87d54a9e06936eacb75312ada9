"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEntry = createEntry;

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEntry(collection) {
  let slug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const returnObj = {
    collection,
    slug,
    path,
    partial: options.partial || false,
    raw: options.raw || '',
    data: options.data || {},
    label: options.label || null,
    isModification: (0, _isBoolean2.default)(options.isModification) ? options.isModification : null,
    mediaFiles: options.mediaFiles || [],
    author: options.author || '',
    updatedOn: options.updatedOn || '',
    status: options.status || '',
    meta: options.meta || {},
    i18n: options.i18n || {}
  };
  return returnObj;
}