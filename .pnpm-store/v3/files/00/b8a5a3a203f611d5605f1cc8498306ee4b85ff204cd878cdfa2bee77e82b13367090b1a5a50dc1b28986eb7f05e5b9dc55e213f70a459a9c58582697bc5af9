import { Editor, Fragment, Mark, Element, Node, Path } from '../..';
declare class PathCommands {
    /**
     * Add a mark to the node at a path.
     */
    addMarkAtPath(this: Editor, path: Path, mark: Mark): void;
    /**
     * Insert a fragment starting at a path.
     */
    insertFragmentAtPath(this: Editor, path: Path, fragment: Fragment): void;
    /**
     * Insert a node at a path.
     */
    insertNodeAtPath(this: Editor, path: Path, node: Node): void;
    /**
     * Merge the leaf block at a path with the previous leaf block.
     */
    mergeBlockAtPath(this: Editor, path: Path): void;
    /**
     * Merge the node at a path with the previous node.
     */
    mergeNodeAtPath(this: Editor, path: Path): void;
    /**
     * Move a node at a path to a new path.
     */
    moveNodeAtPath(this: Editor, path: Path, newPath: Path): void;
    /**
     * Normalize a node at a path, returning it to a valid state if it is
     * currently invalid.
     */
    normalizeNodeAtPath(this: Editor, path: Path): void;
    /**
     * Remove all of the children from the node at a path.
     */
    removeChildrenAtPath(this: Editor, path: Path): void;
    /**
     * Remove a mark on the node at a path.
     */
    removeMarkAtPath(this: Editor, path: Path, mark: Mark): void;
    /**
     * Remove the node at a path.
     */
    removeNodeAtPath(this: Editor, path: Path): void;
    /**
     * Remove the parent node of a path.
     */
    removeParentAtPath(this: Editor, path: Path): void;
    /**
     * Replace the node at a path with a new node.
     */
    replaceNodeAtPath(this: Editor, path: Path, node: Node): void;
    /**
     * Set new properties on the node at a path.
     */
    setNodeAtPath(this: Editor, path: Path, props: {}): void;
    /**
     * Set new properties on the node at a path.
     */
    setMarkAtPath(this: Editor, path: Path, mark: Partial<Mark>, props: {}): void;
    /**
     * Replace a mark on the text node at a path.
     */
    replaceMarkAtPath(this: Editor, path: Path, before: Mark, after: Mark): void;
    /**
     * Replace all of the text in a node at a path.
     */
    replaceTextAtPath(this: Editor, path: Path, text: string): void;
    /**
     * Split the node at a path at a specific position in the node. If the node is
     * a text node, `position` refers to a string offset. If the node is an
     * element node, `position` refers to the index of its children.
     *
     * If you're looking to split from an ancestor all the way down to a leaf text
     * node, you likely want `splitNodeAtPoint` instead.
     */
    splitNodeAtPath(this: Editor, path: Path, position: number, options?: {
        target?: number;
    }): void;
    /**
     * Unwrap all of the children of a node, by removing the node and replacing it
     * in the tree with its children.
     */
    unwrapChildrenAtPath(this: Editor, path: Path): void;
    /**
     * Unwrap a single node from its parent.
     *
     * If the node is surrounded with siblings, its parent will be split. If the
     * node is the only child, the parent is removed, and simply replaced by the
     * node itself.
     */
    unwrapNodeAtPath(this: Editor, path: Path): void;
    /**
     * Wrap the node at a path in a new parent node.
     */
    wrapNodeAtPath(this: Editor, path: Path, element: Element): void;
}
export default PathCommands;
//# sourceMappingURL=path.d.ts.map