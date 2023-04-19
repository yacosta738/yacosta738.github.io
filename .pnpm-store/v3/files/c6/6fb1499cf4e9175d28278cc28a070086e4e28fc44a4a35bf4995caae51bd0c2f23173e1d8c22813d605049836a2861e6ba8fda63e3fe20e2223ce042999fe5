declare function _exports(this: import("unified").Processor<import("unified").Settings>, ...settings: [Options?] | [import("unified").Processor<import("unified").Settings>, Options?]): void | import("unified").Transformer;
export = _exports;
export type Processor = import('unified').Processor;
export type RunCallback = import('unified').RunCallback;
export type Transformer = import('unified').Transformer;
export type Node = import('unist').Node;
export type MdastNode = import('mdast').Content;
export type Parent = import('unist').Parent;
export type Element = import('hast').Element;
export type Context = {
    nodeById: {
        [x: string]: Element;
    };
    baseFound: boolean;
    frozenBaseUrl: string | null;
    wrapText: boolean;
    qNesting: number;
    handlers: {
        [x: string]: Handle;
    };
    document: boolean | undefined;
    checked: string;
    unchecked: string;
    quotes: Array<string>;
};
export type HWithProps = (node: Node, type: string, props?: Properties, children?: string | Array<MdastNode>) => MdastNode;
export type HWithoutProps = (node: Node, type: string, children?: string | Array<MdastNode>) => MdastNode;
export type Properties = Record<string, unknown>;
export type H = HWithProps & HWithoutProps & Context;
export type Handle = (h: H, node: any, parent?: Parent) => MdastNode | Array<MdastNode> | void;
export type Options = {
    handlers?: {
        [x: string]: Handle;
    };
    document?: boolean;
    newlines?: boolean;
    checked?: string;
    unchecked?: string;
    quotes?: Array<string>;
};
