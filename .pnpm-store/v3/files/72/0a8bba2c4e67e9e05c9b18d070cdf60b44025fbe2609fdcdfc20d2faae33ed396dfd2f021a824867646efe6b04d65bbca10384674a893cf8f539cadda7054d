"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

var _CommandsAndQueries = _interopRequireDefault(require("./CommandsAndQueries"));

var _List = _interopRequireDefault(require("./List"));

var _LineBreak = _interopRequireDefault(require("./LineBreak"));

var _BreakToDefaultBlock = _interopRequireDefault(require("./BreakToDefaultBlock"));

var _CloseBlock = _interopRequireDefault(require("./CloseBlock"));

var _QuoteBlock = _interopRequireDefault(require("./QuoteBlock"));

var _SelectAll = _interopRequireDefault(require("./SelectAll"));

var _CopyPasteVisual = _interopRequireDefault(require("./CopyPasteVisual"));

var _Link = _interopRequireDefault(require("./Link"));

var _ForceInsert = _interopRequireDefault(require("./ForceInsert"));

var _Shortcode = _interopRequireDefault(require("./Shortcode"));

var _types = require("../../types");

var _Hotkey = _interopRequireWildcard(require("./Hotkey"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { Text, Inline } from 'slate';
function plugins(_ref) {
  let {
    getAsset,
    resolveWidget,
    t,
    remarkPlugins
  } = _ref;
  return [{
    onKeyDown(event, editor, next) {
      if ((0, _isHotkey.default)('mod+j', event)) {
        console.log(JSON.stringify(editor.value.document.toJS(), null, 2));
      }

      next();
    }

  }, (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['bold'], e => e.toggleMark('bold')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['code'], e => e.toggleMark('code')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['italic'], e => e.toggleMark('italic')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['strikethrough'], e => e.toggleMark('strikethrough')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['heading-one'], e => e.toggleBlock('heading-one')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['heading-two'], e => e.toggleBlock('heading-two')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['heading-three'], e => e.toggleBlock('heading-three')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['heading-four'], e => e.toggleBlock('heading-four')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['heading-five'], e => e.toggleBlock('heading-five')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['heading-six'], e => e.toggleBlock('heading-six')), (0, _Hotkey.default)(_Hotkey.HOT_KEY_MAP['link'], e => e.toggleLink(() => window.prompt(t('editor.editorWidgets.markdown.linkPrompt')))), (0, _CommandsAndQueries.default)({
    defaultType: _types.SLATE_DEFAULT_BLOCK_TYPE
  }), (0, _QuoteBlock.default)({
    defaultType: _types.SLATE_DEFAULT_BLOCK_TYPE,
    type: 'quote'
  }), (0, _List.default)({
    defaultType: _types.SLATE_DEFAULT_BLOCK_TYPE,
    unorderedListType: 'bulleted-list',
    orderedListType: 'numbered-list'
  }), (0, _Link.default)({
    type: 'link'
  }), (0, _LineBreak.default)(), (0, _BreakToDefaultBlock.default)({
    defaultType: _types.SLATE_DEFAULT_BLOCK_TYPE
  }), (0, _CloseBlock.default)({
    defaultType: _types.SLATE_DEFAULT_BLOCK_TYPE
  }), (0, _SelectAll.default)(), (0, _ForceInsert.default)({
    defaultType: _types.SLATE_DEFAULT_BLOCK_TYPE
  }), (0, _CopyPasteVisual.default)({
    getAsset,
    resolveWidget,
    remarkPlugins
  }), (0, _Shortcode.default)({
    defaultType: _types.SLATE_DEFAULT_BLOCK_TYPE
  })];
}

var _default = plugins;
exports.default = _default;