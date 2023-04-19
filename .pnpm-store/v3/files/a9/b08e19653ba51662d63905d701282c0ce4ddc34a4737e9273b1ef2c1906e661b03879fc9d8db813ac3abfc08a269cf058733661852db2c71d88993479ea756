"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frontmatterFormats = exports.formatExtensions = exports.extensionFormatters = void 0;
exports.resolveFormat = resolveFormat;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _immutable = require("immutable");

var _yaml = _interopRequireDefault(require("./yaml"));

var _toml = _interopRequireDefault(require("./toml"));

var _json = _interopRequireDefault(require("./json"));

var _frontmatter = require("./frontmatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const frontmatterFormats = ['yaml-frontmatter', 'toml-frontmatter', 'json-frontmatter'];
exports.frontmatterFormats = frontmatterFormats;
const formatExtensions = {
  yml: 'yml',
  yaml: 'yml',
  toml: 'toml',
  json: 'json',
  frontmatter: 'md',
  'json-frontmatter': 'md',
  'toml-frontmatter': 'md',
  'yaml-frontmatter': 'md'
};
exports.formatExtensions = formatExtensions;
const extensionFormatters = {
  yml: _yaml.default,
  yaml: _yaml.default,
  toml: _toml.default,
  json: _json.default,
  md: _frontmatter.FrontmatterInfer,
  markdown: _frontmatter.FrontmatterInfer,
  html: _frontmatter.FrontmatterInfer
};
exports.extensionFormatters = extensionFormatters;

function formatByName(name, customDelimiter) {
  return {
    yml: _yaml.default,
    yaml: _yaml.default,
    toml: _toml.default,
    json: _json.default,
    frontmatter: _frontmatter.FrontmatterInfer,
    'json-frontmatter': (0, _frontmatter.frontmatterJSON)(customDelimiter),
    'toml-frontmatter': (0, _frontmatter.frontmatterTOML)(customDelimiter),
    'yaml-frontmatter': (0, _frontmatter.frontmatterYAML)(customDelimiter)
  }[name];
}

function frontmatterDelimiterIsList(frontmatterDelimiter) {
  return _immutable.List.isList(frontmatterDelimiter);
}

function resolveFormat(collection, entry) {
  // Check for custom delimiter
  const frontmatter_delimiter = collection.get('frontmatter_delimiter');
  const customDelimiter = frontmatterDelimiterIsList(frontmatter_delimiter) ? frontmatter_delimiter.toArray() : frontmatter_delimiter; // If the format is specified in the collection, use that format.

  const formatSpecification = collection.get('format');

  if (formatSpecification) {
    return formatByName(formatSpecification, customDelimiter);
  } // If a file already exists, infer the format from its file extension.


  const filePath = entry && entry.path;

  if (filePath) {
    const fileExtension = filePath.split('.').pop();

    if (fileExtension) {
      return (0, _get2.default)(extensionFormatters, fileExtension);
    }
  } // If creating a new file, and an `extension` is specified in the
  //   collection config, infer the format from that extension.


  const extension = collection.get('extension');

  if (extension) {
    return (0, _get2.default)(extensionFormatters, extension);
  } // If no format is specified and it cannot be inferred, return the default.


  return formatByName('frontmatter', customDelimiter);
}