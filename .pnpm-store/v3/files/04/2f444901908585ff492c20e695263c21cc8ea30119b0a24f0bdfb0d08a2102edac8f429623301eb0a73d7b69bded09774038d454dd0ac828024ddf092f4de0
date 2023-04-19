import { Node, Path } from '..';
/**
 * `Element` objects are a type of node in a Slate document that contain other
 * element nodes or text nodes. They can be either "blocks" or "inlines"
 * depending on the Slate editor's schema.
 */
interface Element {
    nodes: Node[];
    [key: string]: any;
}
/**
 * `ElementEntry` objects refer to an `Element` and the `Path` where it can be
 * found inside a root node.
 */
declare type ElementEntry = [Element, Path];
declare namespace Element {
    /**
     * Check if a value implements the `Element` interface.
     */
    const isElement: (value: any) => value is Element;
    /**
     * Check if a value is an array of `Element` objects.
     */
    const isElementList: (value: any) => value is Element[];
    /**
     * Check if an element matches set of properties.
     *
     * Note: the is for checking custom properties, and it does not ensure that
     * any children in the `nodes` property are equal.
     */
    const matches: (element: Element, props: Partial<Element>) => boolean;
}
export { Element, ElementEntry };
//# sourceMappingURL=element.d.ts.map