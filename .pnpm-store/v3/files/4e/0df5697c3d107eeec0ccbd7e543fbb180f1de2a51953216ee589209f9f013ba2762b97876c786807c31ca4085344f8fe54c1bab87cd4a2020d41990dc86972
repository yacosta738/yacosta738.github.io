"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slate = require("slate");

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO: highlight a couple list items and hit the quote button. doesn't work.
 */
function QuoteBlock(_ref) {
  let {
    type
  } = _ref;
  return {
    commands: {
      /**
       * Quotes can contain other blocks, even other quotes. If a selection contains quotes, they
       * shouldn't be impacted. The selection's immediate parent should be checked - if it's a
       * quote, unwrap the quote (as within are only blocks), and if it's not, wrap all selected
       * blocks into a quote. Make sure text is wrapped into paragraphs.
       */
      toggleQuoteBlock(editor) {
        const blockContainer = editor.getBlockContainer();

        if (['bulleted-list', 'numbered-list'].includes(blockContainer.type)) {
          const {
            nodes
          } = blockContainer;
          const allItemsSelected = editor.isSelected([nodes.first(), nodes.last()]);

          if (allItemsSelected) {
            const nextContainer = editor.getBlockContainer(blockContainer);

            if ((nextContainer === null || nextContainer === void 0 ? void 0 : nextContainer.type) === type) {
              editor.unwrapNodeFromAncestor(blockContainer, nextContainer);
            } else {
              editor.wrapBlockByKey(blockContainer.key, type);
            }
          } else {
            const blockContainerParent = editor.value.document.getParent(blockContainer.key);
            editor.withoutNormalizing(() => {
              const selectedListItems = nodes.filter(node => editor.isSelected(node));

              const newList = _slate.Block.create(blockContainer.type);

              editor.unwrapNodeByKey(selectedListItems.first());
              const offset = editor.getOffset(selectedListItems.first());
              editor.insertNodeByKey(blockContainerParent.key, offset + 1, newList);
              selectedListItems.forEach((_ref2, idx) => {
                let {
                  key
                } = _ref2;
                return editor.moveNodeByKey(key, newList.key, idx);
              });
              editor.wrapBlockByKey(newList.key, type);
            });
          }

          return;
        }

        const blocks = editor.value.blocks;
        const firstBlockKey = blocks.first().key;
        const lastBlockKey = blocks.last().key;
        const ancestor = editor.getAncestor(firstBlockKey, lastBlockKey);

        if (ancestor.type === type) {
          editor.unwrapBlockChildren(ancestor);
        } else {
          editor.wrapBlock(type);
        }
      }

    },

    onKeyDown(event, editor, next) {
      if (!(0, _isHotkey.default)('enter', event) && !(0, _isHotkey.default)('backspace', event)) {
        return next();
      }

      const {
        selection,
        startBlock,
        document: doc
      } = editor.value;
      const parent = doc.getParent(startBlock.key);
      const isQuote = parent.type === type;

      if (!isQuote) {
        return next();
      }

      if ((0, _isHotkey.default)('enter', event)) {
        if (selection.isExpanded) {
          editor.delete();
        } // If the quote is empty, remove it.


        if (editor.atStartOf(parent)) {
          return editor.unwrapBlockByKey(parent.key);
        }

        if (editor.atStartOf(startBlock)) {
          const offset = editor.getOffset(startBlock);
          return editor.splitNodeByKey(parent.key, offset).unwrapBlockByKey(editor.value.document.getParent(startBlock.key).key);
        }

        return next();
      } else if ((0, _isHotkey.default)('backspace', event)) {
        if (selection.isExpanded) {
          editor.delete();
        }

        if (!editor.atStartOf(parent)) {
          return next();
        }

        const previousParentSibling = doc.getPreviousSibling(parent.key);

        if (previousParentSibling && previousParentSibling.type === type) {
          return editor.mergeNodeByKey(parent.key);
        }

        return editor.unwrapNodeByKey(startBlock.key);
      }

      return next();
    }

  };
}

var _default = QuoteBlock;
exports.default = _default;