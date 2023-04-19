/**
 * Make unicode gemojis accessible
 * by wrapping them in aria labeled <span>'s
 * code mostly reused from https://gitlab.com/staltz/remark-linkify-regex
 *
 * DONE: improve so it won't wrap emojis in <scripts> etc
 * https://github.com/rehypejs/rehype/pull/30#issuecomment-570914503
 * https://github.com/syntax-tree/hast-util-find-and-replace/blob/master/index.js#L9
 */
import { Node } from 'unist';
export declare type NodeWithChildren = Node & {
    children?: Node[];
    value?: string;
};
export declare type hProps = {
    value: string;
};
export declare type Options = {
    ignore: string[];
};
export declare const rehypeAccessibleEmojis: (options?: Options) => (ast: NodeWithChildren) => NodeWithChildren;
