"use strict";
/**
 * Make unicode gemojis accessible
 * by wrapping them in aria labeled <span>'s
 * code mostly reused from https://gitlab.com/staltz/remark-linkify-regex
 *
 * DONE: improve so it won't wrap emojis in <scripts> etc
 * https://github.com/rehypejs/rehype/pull/30#issuecomment-570914503
 * https://github.com/syntax-tree/hast-util-find-and-replace/blob/master/index.js#L9
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unist_util_flatmap_1 = __importDefault(require("unist-util-flatmap"));
const hast_util_is_element_1 = __importDefault(require("hast-util-is-element"));
const emoji_regex_1 = __importDefault(require("emoji-regex"));
const gemoji = require('gemoji');
const defaultIgnore = ['title', 'script', 'style', 'svg', 'math'];
function removeExtremes(regex, optionalFlags) {
    return new RegExp(regex.source.replace(/^\^/, '').replace(/\$$/, ''), optionalFlags || regex.flags);
}
function buildTextNode(value) {
    return { type: 'text', value };
}
function buildEmojiNode(emoji, children) {
    const description = gemoji.unicode[emoji]
        ? gemoji.unicode[emoji].description
        : '';
    return {
        type: `element`,
        tagName: `span`,
        properties: {
            role: `img`,
            ariaLabel: description,
            // set aria-hidden="true" if no description available
            ...(!!!description ? { ariaHidden: true } : {}),
        },
        children,
    };
}
function h(type, props, children) {
    if (type === 'text')
        return buildTextNode(props.value);
    if (type === 'emoji')
        return buildEmojiNode(props.value, children);
    throw new Error('mdast hyperscript not supported for type ' + type);
}
function splitTextNode(textNode) {
    const oldText = textNode.value;
    const regex = removeExtremes(emoji_regex_1.default());
    const newNodes = [];
    let startTextIdx = 0;
    let output;
    while ((output = regex.exec(oldText)) !== null) {
        const endTextIdx = output.index;
        if (startTextIdx !== endTextIdx) {
            newNodes.push(h('text', { value: oldText.slice(startTextIdx, endTextIdx) }));
        }
        const emoji = output[0];
        newNodes.push(h('emoji', { value: emoji }, [h('text', { value: emoji })]));
        startTextIdx = regex.lastIndex;
    }
    const remainingText = oldText.slice(startTextIdx);
    if (remainingText.length > 0) {
        newNodes.push(h('text', { value: remainingText }));
    }
    return newNodes;
}
const defaultOptions = { ignore: [] };
// from https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
const unique = (array) => array.filter((item, index) => array.indexOf(item) === index);
exports.rehypeAccessibleEmojis = (options = defaultOptions) => (ast) => {
    const ignore = unique([...defaultIgnore, ...options.ignore]);
    unist_util_flatmap_1.default(ast, (node, _, parent) => {
        if (node.type !== 'text' || (parent && hast_util_is_element_1.default(parent, ignore))) {
            return [node];
        }
        return splitTextNode(node);
    });
    return ast;
};
