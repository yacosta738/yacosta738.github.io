"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slate = require("slate");

var _slateReact = require("slate-react");

var _slateBase64Serializer = _interopRequireDefault(require("slate-base64-serializer"));

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

var _serializers = require("../../serializers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CopyPasteVisual(_ref) {
  let {
    getAsset,
    resolveWidget,
    remarkPlugins
  } = _ref;

  function handleCopy(event, editor) {
    const markdown = (0, _serializers.slateToMarkdown)(editor.value.fragment.toJS(), {
      remarkPlugins
    });
    const html = (0, _serializers.markdownToHtml)(markdown, {
      getAsset,
      resolveWidget,
      remarkPlugins
    });
    (0, _slateReact.setEventTransfer)(event, 'text', markdown);
    (0, _slateReact.setEventTransfer)(event, 'html', html);
    (0, _slateReact.setEventTransfer)(event, 'fragment', _slateBase64Serializer.default.serializeNode(editor.value.fragment));
    event.preventDefault();
  }

  return {
    onPaste(event, editor, next) {
      const data = event.clipboardData;

      if ((0, _isHotkey.default)('shift', event)) {
        return next();
      }

      if (data.types.includes('application/x-slate-fragment')) {
        const fragment = _slateBase64Serializer.default.deserializeNode(data.getData('application/x-slate-fragment'));

        return editor.insertFragment(fragment);
      }

      const html = data.types.includes('text/html') && data.getData('text/html');
      const ast = html ? (0, _serializers.htmlToSlate)(html) : (0, _serializers.markdownToSlate)(data.getData('text/plain'), {
        remarkPlugins
      });

      const doc = _slate.Document.fromJSON(ast);

      return editor.insertFragment(doc);
    },

    onCopy(event, editor, next) {
      handleCopy(event, editor, next);
    },

    onCut(event, editor, next) {
      handleCopy(event, editor, next);
      editor.delete();
    }

  };
}

var _default = CopyPasteVisual;
exports.default = _default;