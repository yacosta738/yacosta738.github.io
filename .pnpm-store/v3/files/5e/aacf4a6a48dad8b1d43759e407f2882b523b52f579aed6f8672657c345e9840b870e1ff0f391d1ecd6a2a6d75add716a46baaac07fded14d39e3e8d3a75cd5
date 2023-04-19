"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slateToRemark;

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _intersection2 = _interopRequireDefault(require("lodash/intersection"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _get5 = _interopRequireDefault(require("lodash/get"));

var _unistBuilder = _interopRequireDefault(require("unist-builder"));

var _mdastUtilToString = _interopRequireDefault(require("mdast-util-to-string"));

const _excluded = ["lang", "code"],
      _excluded2 = ["url", "title"],
      _excluded3 = ["url", "title", "alt"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Map of Slate node types to MDAST/Remark node types.
 */
const typeMap = {
  root: 'root',
  paragraph: 'paragraph',
  'heading-one': 'heading',
  'heading-two': 'heading',
  'heading-three': 'heading',
  'heading-four': 'heading',
  'heading-five': 'heading',
  'heading-six': 'heading',
  quote: 'blockquote',
  'code-block': 'code',
  'numbered-list': 'list',
  'bulleted-list': 'list',
  'list-item': 'listItem',
  table: 'table',
  'table-row': 'tableRow',
  'table-cell': 'tableCell',
  break: 'break',
  'thematic-break': 'thematicBreak',
  link: 'link',
  image: 'image',
  shortcode: 'shortcode'
};
/**
 * Map of Slate mark types to MDAST/Remark node types.
 */

const markMap = {
  bold: 'strong',
  italic: 'emphasis',
  strikethrough: 'delete',
  code: 'inlineCode'
};
const leadingWhitespaceExp = /^\s+\S/;
const trailingWhitespaceExp = /(?!\S)\s+$/;

function slateToRemark(raw, _ref) {
  let {
    voidCodeBlock
  } = _ref;

  /**
   * The Slate Raw AST generally won't have a top level type, so we set it to
   * "root" for clarity.
   */
  raw.type = 'root';
  return transform(raw);
  /**
   * The transform function mimics the approach of a Remark plugin for
   * conformity with the other serialization functions. This function converts
   * Slate nodes to MDAST nodes, and recursively calls itself to process child
   * nodes to arbitrary depth.
   */

  function transform(node) {
    /**
     * Combine adjacent text and inline nodes before processing so they can
     * share marks.
     */
    const hasBlockChildren = node.nodes && node.nodes[0] && node.nodes[0].object === 'block';
    const children = hasBlockChildren ? node.nodes.map(transform).filter(v => v) : convertInlineAndTextChildren(node.nodes);
    const output = convertBlockNode(node, children); //console.log(JSON.stringify(output, null, 2));

    return output;
  }

  function removeMarkFromNodes(nodes, markType) {
    return nodes.map(node => {
      switch (node.type) {
        case 'link':
          {
            const updatedNodes = removeMarkFromNodes(node.nodes, markType);
            return _objectSpread(_objectSpread({}, node), {}, {
              nodes: updatedNodes
            });
          }

        case 'image':
        case 'break':
          {
            const data = (0, _omit2.default)(node.data, 'marks');
            return _objectSpread(_objectSpread({}, node), {}, {
              data
            });
          }

        default:
          return _objectSpread(_objectSpread({}, node), {}, {
            marks: node.marks.filter(_ref2 => {
              let {
                type
              } = _ref2;
              return type !== markType;
            })
          });
      }
    });
  }

  function getNodeMarks(node) {
    switch (node.type) {
      case 'link':
        {
          // Code marks can't always be condensed together. If all text in a link
          // is wrapped in a mark, this function returns that mark and the node
          // ends up nested inside of that mark. Code marks sometimes can't do
          // that, like when they wrap all of the text content of a link. Here we
          // remove code marks before processing so that they stay put.
          const nodesWithoutCode = node.nodes.map(n => _objectSpread(_objectSpread({}, n), {}, {
            marks: n.marks ? n.marks.filter(_ref3 => {
              let {
                type
              } = _ref3;
              return type !== 'code';
            }) : n.marks
          }));
          const childMarks = (0, _map2.default)(nodesWithoutCode, getNodeMarks);
          return (0, _intersection2.default)(...childMarks);
        }

      case 'break':
      case 'image':
        return (0, _map2.default)((0, _get5.default)(node, ['data', 'marks']), mark => mark.type);

      default:
        return (0, _map2.default)(node.marks, mark => mark.type);
    }
  }

  function getSharedMarks(marks, node) {
    const nodeMarks = getNodeMarks(node);
    const sharedMarks = (0, _intersection2.default)(marks, nodeMarks);

    if (sharedMarks[0] === 'code') {
      return nodeMarks.length === 1 ? marks : [];
    }

    return sharedMarks;
  }

  function extractFirstMark(nodes) {
    let firstGroupMarks = getNodeMarks(nodes[0]) || []; // If code mark is present, but there are other marks, process others first.
    // If only the code mark is present, don't allow it to be shared with other
    // nodes.

    if (firstGroupMarks[0] === 'code' && firstGroupMarks.length > 1) {
      firstGroupMarks = [...(0, _without2.default)('firstGroupMarks', 'code'), 'code'];
    }

    let splitIndex = 1;

    if (firstGroupMarks.length > 0) {
      while (splitIndex < nodes.length) {
        if (nodes[splitIndex]) {
          const sharedMarks = getSharedMarks(firstGroupMarks, nodes[splitIndex]);

          if (sharedMarks.length > 0) {
            firstGroupMarks = sharedMarks;
          } else {
            break;
          }
        }

        splitIndex += 1;
      }
    }

    const markType = firstGroupMarks[0];
    const childNodes = nodes.slice(0, splitIndex);
    const updatedChildNodes = markType ? removeMarkFromNodes(childNodes, markType) : childNodes;
    const remainingNodes = nodes.slice(splitIndex);
    return [markType, updatedChildNodes, remainingNodes];
  }
  /**
   * Converts the strings returned from `splitToNamedParts` to Slate nodes.
   */


  function splitWhitespace(node) {
    let {
      trailing
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!node.text) {
      return {
        trimmedNode: node
      };
    }

    const exp = trailing ? trailingWhitespaceExp : leadingWhitespaceExp;
    const index = node.text.search(exp);

    if (index > -1) {
      const substringIndex = trailing ? index : index + 1;
      const firstSplit = node.text.slice(0, substringIndex);
      const secondSplit = node.text.slice(substringIndex);
      const whitespace = trailing ? secondSplit : firstSplit;
      const text = trailing ? firstSplit : secondSplit;
      return {
        whitespace,
        trimmedNode: _objectSpread(_objectSpread({}, node), {}, {
          text
        })
      };
    }

    return {
      trimmedNode: node
    };
  }

  function collectCenterNodes(nodes, leadingNode, trailingNode) {
    switch (nodes.length) {
      case 0:
        return [];

      case 1:
        return [trailingNode];

      case 2:
        return [leadingNode, trailingNode];

      default:
        return [leadingNode, ...nodes.slice(1, -1), trailingNode];
    }
  }

  function normalizeFlankingWhitespace(nodes) {
    const {
      whitespace: leadingWhitespace,
      trimmedNode: leadingNode
    } = splitWhitespace(nodes[0]);
    const lastNode = nodes.length > 1 ? (0, _last2.default)(nodes) : leadingNode;
    const trailingSplitResult = splitWhitespace(lastNode, {
      trailing: true
    });
    const {
      whitespace: trailingWhitespace,
      trimmedNode: trailingNode
    } = trailingSplitResult;
    const centerNodes = collectCenterNodes(nodes, leadingNode, trailingNode).filter(val => val);
    return {
      leadingWhitespace,
      centerNodes,
      trailingWhitespace
    };
  }

  function createText(text) {
    return text && (0, _unistBuilder.default)('html', text);
  }

  function convertInlineAndTextChildren() {
    let nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const convertedNodes = [];
    let remainingNodes = nodes;

    while (remainingNodes.length > 0) {
      const nextNode = remainingNodes[0];

      if (nextNode.object === 'inline' || nextNode.marks && nextNode.marks.length > 0) {
        const [markType, markNodes, remainder] = extractFirstMark(remainingNodes);
        /**
         * A node with a code mark will be a text node, and will not be adjacent
         * to a sibling code node as the Slate schema requires them to be
         * merged. Markdown also requires at least a space between inline code
         * nodes.
         */

        if (markType === 'code') {
          const node = markNodes[0];
          convertedNodes.push((0, _unistBuilder.default)(markMap[markType], node.data, node.text));
        } else if (!markType && markNodes.length === 1 && markNodes[0].object === 'inline') {
          const node = markNodes[0];
          convertedNodes.push(convertInlineNode(node, convertInlineAndTextChildren(node.nodes)));
        } else {
          const {
            leadingWhitespace,
            trailingWhitespace,
            centerNodes
          } = normalizeFlankingWhitespace(markNodes);
          const children = convertInlineAndTextChildren(centerNodes);
          const markNode = (0, _unistBuilder.default)(markMap[markType], children); // Filter out empty marks, otherwise their output literally by
          // remark-stringify, eg. an empty bold node becomes "****"

          if ((0, _mdastUtilToString.default)(markNode) === '') {
            remainingNodes = remainder;
            continue;
          }

          const normalizedNodes = [createText(leadingWhitespace), markNode, createText(trailingWhitespace)].filter(val => val);
          convertedNodes.push(...normalizedNodes);
        }

        remainingNodes = remainder;
      } else {
        remainingNodes.shift();
        convertedNodes.push((0, _unistBuilder.default)('html', nextNode.text));
      }
    }

    return convertedNodes;
  }

  function convertBlockNode(node, children) {
    switch (node.type) {
      /**
       * General
       *
       * Convert simple cases that only require a type and children, with no
       * additional properties.
       */
      case 'root':
      case 'paragraph':
      case 'quote':
      case 'list-item':
      case 'table':
      case 'table-row':
      case 'table-cell':
        {
          return (0, _unistBuilder.default)(typeMap[node.type], children);
        }

      /**
       * Shortcodes
       *
       * Shortcode nodes only exist in Slate's Raw AST if they were inserted
       * via the plugin toolbar in memory, so they should always have
       * shortcode data attached. The "shortcode" data property contains the
       * name of the registered shortcode plugin, and the "shortcodeData" data
       * property contains the data received from the shortcode plugin's
       * `fromBlock` method when the shortcode node was created.
       *
       * Here we create a `shortcode` MDAST node that contains only the shortcode
       * data.
       */

      case 'shortcode':
        {
          const {
            data
          } = node;
          return (0, _unistBuilder.default)(typeMap[node.type], {
            data
          });
        }

      /**
       * Headings
       *
       * Slate schemas don't usually infer basic type info from data, so each
       * level of heading is a separately named type. The MDAST schema just
       * has a single "heading" type with the depth stored in a "depth"
       * property on the node. Here we derive the depth from the Slate node
       * type - e.g., for "heading-two", we need a depth value of "2".
       */

      case 'heading-one':
      case 'heading-two':
      case 'heading-three':
      case 'heading-four':
      case 'heading-five':
      case 'heading-six':
        {
          const depthMap = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6
          };
          const depthText = node.type.split('-')[1];
          const depth = depthMap[depthText];
          const mdastNode = (0, _unistBuilder.default)(typeMap[node.type], {
            depth
          }, children);

          if ((0, _mdastUtilToString.default)(mdastNode)) {
            return mdastNode;
          }

          return;
        }

      /**
       * Code Blocks
       *
       * Code block nodes may have a single text child, or instead be void and
       * store their value in `data.code`. They also may have a code language
       * stored in the "lang" data property. Here we transfer both the node value
       * and the "lang" data property to the new MDAST node, and spread any
       * remaining data as `data`.
       */

      case 'code-block':
        {
          var _children$;

          const _get2 = (0, _get5.default)(node, 'data', {}),
                {
            lang,
            code
          } = _get2,
                data = _objectWithoutProperties(_get2, _excluded);

          const value = voidCodeBlock ? code : (_children$ = children[0]) === null || _children$ === void 0 ? void 0 : _children$.value;
          return (0, _unistBuilder.default)(typeMap[node.type], {
            lang,
            data
          }, value || '');
        }

      /**
       * Lists
       *
       * Our Slate schema has separate node types for ordered and unordered
       * lists, but the MDAST spec uses a single type with a boolean "ordered"
       * property to indicate whether the list is numbered. The MDAST spec also
       * allows for a "start" property to indicate the first number used for an
       * ordered list. Here we translate both values to our Slate schema.
       */

      case 'numbered-list':
      case 'bulleted-list':
        {
          const ordered = node.type === 'numbered-list';
          const props = {
            ordered,
            start: (0, _get5.default)(node.data, 'start') || 1
          };
          return (0, _unistBuilder.default)(typeMap[node.type], props, children);
        }

      /**
       * Thematic Break
       *
       * Thematic break is a block level break. They cannot have children.
       */

      case 'thematic-break':
        {
          return (0, _unistBuilder.default)(typeMap[node.type]);
        }
    }
  }

  function convertInlineNode(node, children) {
    switch (node.type) {
      /**
       * Break
       *
       * Breaks are phrasing level breaks. They cannot have children.
       */
      case 'break':
        {
          return (0, _unistBuilder.default)(typeMap[node.type]);
        }

      /**
       * Links
       *
       * The url and title attributes of link nodes are stored in properties on
       * the node for both Slate and Remark schemas.
       */

      case 'link':
        {
          const _get3 = (0, _get5.default)(node, 'data', {}),
                {
            url,
            title
          } = _get3,
                data = _objectWithoutProperties(_get3, _excluded2);

          return (0, _unistBuilder.default)(typeMap[node.type], {
            url,
            title,
            data
          }, children);
        }

      /**
       * Images
       *
       * This transformation is almost identical to that of links, except for the
       * lack of child nodes and addition of `alt` attribute data.
       */

      case 'image':
        {
          const _get4 = (0, _get5.default)(node, 'data', {}),
                {
            url,
            title,
            alt
          } = _get4,
                data = _objectWithoutProperties(_get4, _excluded3);

          return (0, _unistBuilder.default)(typeMap[node.type], {
            url,
            title,
            alt,
            data
          });
        }
    }
  }
}