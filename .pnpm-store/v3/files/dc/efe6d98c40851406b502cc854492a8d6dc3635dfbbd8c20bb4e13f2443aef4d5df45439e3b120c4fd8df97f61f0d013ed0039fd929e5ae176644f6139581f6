"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _throttle2 = _interopRequireDefault(require("lodash/throttle"));

var _castArray2 = _interopRequireDefault(require("lodash/castArray"));

var _immutable = require("immutable");

var _slate = require("slate");

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

var _util = require("./util");

const _excluded = ["node"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ListPlugin(_ref) {
  let {
    defaultType,
    unorderedListType,
    orderedListType
  } = _ref;
  const LIST_TYPES = [orderedListType, unorderedListType];

  function oppositeListType(type) {
    switch (type) {
      case LIST_TYPES[0]:
        return LIST_TYPES[1];

      case LIST_TYPES[1]:
        return LIST_TYPES[0];
    }
  }

  return {
    queries: {
      getCurrentListItem(editor) {
        const {
          startBlock,
          endBlock
        } = editor.value;
        const ancestor = editor.value.document.getCommonAncestor(startBlock.key, endBlock.key);

        if (ancestor && ancestor.type === 'list-item') {
          return ancestor;
        }

        return editor.value.document.getClosest(ancestor.key, node => node.type === 'list-item');
      },

      getListOrListItem(editor) {
        let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        let {
          node
        } = _ref2,
            opts = _objectWithoutProperties(_ref2, _excluded);

        const listContextNode = editor.getBlockContainer(node);

        if (!listContextNode) {
          return;
        }

        if (['bulleted-list', 'numbered-list', 'list-item'].includes(listContextNode.type)) {
          return listContextNode;
        }

        if (opts.force) {
          return editor.getListOrListItem(_objectSpread({
            node: listContextNode
          }, opts));
        }
      },

      isList(editor, node) {
        return node && LIST_TYPES.includes(node.type);
      },

      getLowestListItem(editor, list) {
        (0, _util.assertType)(list, LIST_TYPES);
        const lastItem = list.nodes.last();
        const lastItemLastChild = lastItem.nodes.last();

        if (editor.isList(lastItemLastChild)) {
          return editor.getLowestListItem(lastItemLastChild);
        }

        return lastItem;
      }

    },
    commands: {
      wrapInList(editor, type) {
        editor.withoutNormalizing(() => {
          editor.wrapBlock(type).wrapBlock('list-item');
        });
      },

      unwrapListItem(editor, node) {
        (0, _util.assertType)(node, 'list-item');
        editor.withoutNormalizing(() => {
          editor.unwrapNodeByKey(node.key).unwrapBlockChildren(node);
        });
      },

      indentListItems: (0, _throttle2.default)(function indentListItem(editor, listItemsArg) {
        const listItems = _immutable.List.isList(listItemsArg) ? listItemsArg : (0, _immutable.List)((0, _castArray2.default)(listItemsArg));
        const firstListItem = listItems.first();
        const firstListItemIndex = editor.value.document.getPath(firstListItem.key).last();
        const list = editor.value.document.getParent(firstListItem.key);
        /**
         * If the first list item in the list is in the selection, and the list
         * previous sibling is a list of the opposite type, we should still indent
         * the list items as children of the last item in the previous list, as
         * the behavior otherwise for first items is to do nothing on tab, while
         * in this case the user would expect indenting via tab to "just work".
         */

        if (firstListItemIndex === 0) {
          const listPreviousSibling = editor.value.document.getPreviousSibling(list.key);

          if (!listPreviousSibling || listPreviousSibling.type !== oppositeListType(list.type)) {
            return;
          }

          editor.withoutNormalizing(() => {
            listItems.forEach((listItem, idx) => {
              const index = listPreviousSibling.nodes.size + idx;
              editor.moveNodeByKey(listItem.key, listPreviousSibling.key, index);
            });
          });
        }
        /**
         * Wrap all selected list items into a new list item and list, then merge
         * the new parent list item into the previous list item in the list.
         */


        const newListItem = _slate.Block.create('list-item');

        const newList = _slate.Block.create(list.type);

        editor.withoutNormalizing(() => {
          editor.insertNodeByKey(list.key, firstListItemIndex, newListItem).insertNodeByKey(newListItem.key, 0, newList);
          listItems.forEach((listItem, index) => {
            editor.moveNodeByKey(listItem.key, newList.key, index);
          });
          editor.mergeNodeByKey(newListItem.key);
        });
      }, 100),
      unindentListItems: (0, _throttle2.default)(function unindentListItems(editor, listItemsArg) {
        // Ensure that `listItems` are children of a list.
        const listItems = _immutable.List.isList(listItemsArg) ? listItemsArg : (0, _immutable.List)((0, _castArray2.default)(listItemsArg));
        const list = editor.value.document.getParent(listItems.first().key);

        if (!editor.isList(list)) {
          return;
        } // If the current list isn't nested under a list, we cannot unindent.


        const parentListItem = editor.value.document.getParent(list.key);

        if (!parentListItem || parentListItem.type !== 'list-item') {
          return;
        } // Check if there are more list items after the items being indented.


        const nextSibling = editor.value.document.getNextSibling(listItems.last().key); // Unwrap each selected list item into the parent list.

        editor.withoutNormalizing(() => {
          listItems.forEach(listItem => editor.unwrapNodeToDepth(listItem, 2));
        }); // If there were other list items after the selected items, use the last
        // of the unindented list items as the new parent of the remaining items
        // list.

        if (nextSibling) {
          const nextSiblingParentListItem = editor.value.document.getNextSibling(listItems.last().key);
          editor.mergeNodeByKey(nextSiblingParentListItem.key);
        }
      }, 100),

      toggleListItemType(editor, listItem) {
        (0, _util.assertType)(listItem, 'list-item');
        const list = editor.value.document.getParent(listItem.key);
        const newListType = oppositeListType(list.type);
        editor.withoutNormalizing(() => {
          editor.unwrapNodeByKey(listItem.key).wrapBlockByKey(listItem.key, newListType);
        });
      },

      toggleList(editor, type) {
        if (!LIST_TYPES.includes(type)) {
          throw Error(`${type} is not a valid list type, must be one of: ${LIST_TYPES}`);
        }

        const {
          startBlock,
          blocks
        } = editor.value;
        const target = editor.getBlockContainer();

        switch ((0, _get2.default)(target, 'type')) {
          case 'bulleted-list':
          case 'numbered-list':
            {
              const list = target;

              if (list.type !== type) {
                const newListType = oppositeListType(target.type);

                const newList = _slate.Block.create(newListType);

                editor.withoutNormalizing(() => {
                  editor.wrapBlock(newList).unwrapNodeByKey(newList.key);
                });
              } else {
                editor.withoutNormalizing(() => {
                  list.nodes.forEach(listItem => {
                    if (editor.isSelected(listItem)) {
                      editor.unwrapListItem(listItem);
                    }
                  });
                });
              }

              break;
            }

          case 'list-item':
            {
              const listItem = target;
              const list = editor.value.document.getParent(listItem.key);

              if (!editor.isFirstChild(startBlock)) {
                editor.wrapInList(type);
              } else if (list.type !== type) {
                editor.toggleListItemType(listItem);
              } else {
                editor.unwrapListItem(listItem);
              }

              break;
            }

          default:
            {
              if (blocks.size > 1) {
                const listItems = blocks.map(block => _slate.Block.create({
                  type: 'list-item',
                  nodes: [block]
                }));

                const listBlock = _slate.Block.create({
                  type,
                  nodes: listItems
                });

                editor.delete().replaceNodeByKey(startBlock.key, listBlock).moveToRangeOfNode(listBlock);
              } else {
                editor.wrapInList(type);
              }

              break;
            }
        }
      }

    },

    onKeyDown(event, editor, next) {
      // Handle space ('*' + <space>) or ('-' + <space>)
      if ((0, _isHotkey.default)('space', event)) {
        if (editor.value.startBlock.text === '*' || editor.value.startBlock.text === '-') {
          event.preventDefault();
          return editor.wrapInList('bulleted-list').deleteBackward(1);
        }
      } // Handle Backspace


      if ((0, _isHotkey.default)('backspace', event) && editor.value.selection.isCollapsed) {
        // If beginning block is not of default type, do nothing
        if (editor.value.startBlock.type !== defaultType) {
          return next();
        }

        const listOrListItem = editor.getListOrListItem();
        const isListItem = listOrListItem && listOrListItem.type === 'list-item'; // If immediate block is a list item, unwrap it

        if (isListItem && editor.value.selection.start.isAtStartOfNode(listOrListItem)) {
          const listItem = listOrListItem;
          const previousSibling = editor.value.document.getPreviousSibling(listItem.key); // If this isn't the first item in the list, merge into previous list item

          if (previousSibling && previousSibling.type === 'list-item') {
            return editor.mergeNodeByKey(listItem.key);
          }

          return editor.unwrapListItem(listItem);
        }

        return next();
      } // Handle Tab


      if ((0, _isHotkey.default)('tab', event) || (0, _isHotkey.default)('shift+tab', event)) {
        const isTab = (0, _isHotkey.default)('tab', event);
        const isShiftTab = !isTab;
        event.preventDefault();
        const listOrListItem = editor.getListOrListItem({
          force: true
        });

        if (!listOrListItem) {
          return next();
        }

        if (listOrListItem.type === 'list-item') {
          const listItem = listOrListItem;

          if (isTab) {
            return editor.indentListItems(listItem);
          }

          if (isShiftTab) {
            return editor.unindentListItems(listItem);
          }
        } else {
          const list = listOrListItem;

          if (isTab) {
            const listItems = editor.getSelectedChildren(list);
            return editor.indentListItems(listItems);
          }

          if (isShiftTab) {
            const listItems = editor.getSelectedChildren(list);
            return editor.unindentListItems(listItems);
          }
        }

        return next();
      } // Handle Enter


      if ((0, _isHotkey.default)('enter', event)) {
        const listOrListItem = editor.getListOrListItem();

        if (!listOrListItem) {
          return next();
        }

        if (editor.value.selection.isExpanded) {
          editor.delete();
        }

        if (listOrListItem.type === 'list-item') {
          const listItem = listOrListItem;
          const {
            value: {
              document
            }
          } = editor; // If focus is at start of list item, unwrap the entire list item.

          if (editor.atStartOf(listItem)) {
            /* If the list item in question has a grandparent list, this means it is a child of a nested list.
             * Hitting Enter key on an empty nested list item like this should move that list item out of the nested list
             * and into the grandparent list. The targeted list item becomes direct child of its grandparent list
             * Example
             * <ul> ----- GRANDPARENT LIST
             *  <li> ------ GRANDPARENT LIST ITEM
             *    <p>foo</p>
             *    <ul> ----- PARENT LIST
             *      <li>
             *        <p>bar</p>
             *      </li>
             *      <li> ------ LIST ITEM
             *        <p></p> ----- WHERE THE ENTER KEY HAPPENS
             *      </li>
             *    </ul>
             *  </li>
             * </ul>
             */
            const parentList = document.getParent(listItem.key);
            const grandparentListItem = document.getParent(parentList.key);

            if (grandparentListItem.type === 'list-item') {
              const grandparentList = document.getParent(grandparentListItem.key);
              const indexOfGrandparentListItem = grandparentList.nodes.findIndex(node => node.key === grandparentListItem.key);
              return editor.moveNodeByKey(listItem.key, grandparentList.key, indexOfGrandparentListItem + 1);
            }

            return editor.unwrapListItem(listItem);
          } // If focus is at start of a subsequent block in the list item, move
          // everything after the cursor in the current list item to a new list
          // item.


          if (editor.atStartOf(editor.value.startBlock)) {
            const newListItem = _slate.Block.create('list-item');

            const range = _slate.Range.create(editor.value.selection).moveEndToEndOfNode(listItem);

            return editor.withoutNormalizing(() => {
              editor.wrapBlockAtRange(range, newListItem).unwrapNodeByKey(newListItem.key);
            });
          }

          const list = document.getParent(listItem.key);

          if (LIST_TYPES.includes(list.type)) {
            const newListItem = _slate.Block.create({
              type: 'list-item',
              nodes: [_slate.Block.create('paragraph')]
            }); // Check if the targeted list item contains a nested list. If it does, insert a new list item in the beginning of that nested list.


            const nestedList = listItem.findDescendant(block => LIST_TYPES.includes(block.type));

            if (nestedList) {
              return editor.insertNodeByKey(nestedList.key, 0, newListItem).moveForward(1); // Each list item is separated by a \n character. We need to move the cursor past this character so that it'd be on new list item that has just been inserted
            } // Find index of the list item block that receives Enter key


            const previousListItemIndex = list.nodes.findIndex(block => block.key === listItem.key);
            return editor.insertNodeByKey(list.key, previousListItemIndex + 1, newListItem) // insert a new list item after the list item above
            .moveForward(1);
          }

          return next();
        } else {
          const list = listOrListItem;

          if (list.nodes.size === 0) {
            return editor.removeNodeByKey(list.key);
          }
        }

        return next();
      }

      return next();
    }

  };
}

var _default = ListPlugin;
exports.default = _default;