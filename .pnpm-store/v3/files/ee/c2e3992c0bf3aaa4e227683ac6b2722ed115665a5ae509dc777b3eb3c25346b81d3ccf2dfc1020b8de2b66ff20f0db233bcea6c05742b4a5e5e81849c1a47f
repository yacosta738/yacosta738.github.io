import { Element, ElementEntry, Fragment, MarkEntry, Path, Range, Text, TextEntry, Value } from '..';
/**
 * The `Node` union type represents all of the different types of nodes that
 * occur in a Slate document tree.
 */
declare type Node = Value | Element | Text;
/**
 * The `Descendant` union type represents nodes that are descendants in the
 * tree. It is returned as a convenience in certain cases to narrow a value
 * further than the more generic `Node` union.
 */
declare type Descendant = Element | Text;
/**
 * The `Ancestor` union type represents nodes that are ancestors in the tree.
 * It is returned as a convenience in certain cases to narrow a value further
 * than the more generic `Node` union.
 */
declare type Ancestor = Value | Element;
/**
 * `NodeEntry` objects are returned when iterating over the nodes in a Slate
 * document tree. They consist of the node and its `Path` relative to the root
 * node in the document.
 */
declare type NodeEntry = [Node, Path];
/**
 * `DescendantEntry` objects are returned when iterating over the descendants in
 * a Slate document tree.
 */
declare type DescendantEntry = [Descendant, Path];
/**
 * `AncestorEntry` objects are returned when iterating over the ancestors in a
 * Slate document tree.
 */
declare type AncestorEntry = [Ancestor, Path];
declare namespace Node {
    const matches: (node: Node, props: Partial<Value> | Partial<Element> | Partial<Text>) => boolean;
    /**
     * Get the node at a specific path, asserting that it's an ancestor node.
     */
    const ancestor: (root: Node, path: number[]) => Ancestor;
    /**
     * Return an iterable of all the ancestor nodes above a specific path.
     *
     * By default the order is bottom-up, from lowest to highest ancestor in
     * the tree, but you can pass the `reverse: true` option to go top-down.
     */
    function ancestors(root: Node, path: Path, options?: {
        reverse?: boolean;
    }): Iterable<AncestorEntry>;
    /**
     * Get the child of a node at a specific index.
     */
    const child: (root: Node, index: number) => Descendant;
    /**
     * Find the closest matching node entry starting from a specific path.
     */
    const closest: (root: Node, path: number[], predicate: (entry: [Node, number[]]) => boolean) => [Node, number[]] | undefined;
    /**
     * Get an entry for the common ancesetor node of two paths.
     */
    const common: (root: Node, path: number[], another: number[]) => [Node, number[]];
    /**
     * Get the node at a specific path, asserting that it's a descendant node.
     */
    const descendant: (root: Node, path: number[]) => Descendant;
    /**
     * Return an iterable of all the descendant node entries inside a root node.
     */
    function descendants(root: Node, options?: {
        from?: Path;
        to?: Path;
        reverse?: boolean;
        pass?: (node: NodeEntry) => boolean;
    }): Iterable<DescendantEntry>;
    /**
     * Return an iterable of all the element nodes inside a root node. Each iteration
     * will return an `ElementEntry` tuple consisting of `[Element, Path]`. If the
     * root node is an element it will be included in the iteration as well.
     */
    function elements(root: Node, options?: {
        from?: Path;
        to?: Path;
        reverse?: boolean;
        pass?: (node: NodeEntry) => boolean;
    }): Iterable<ElementEntry>;
    /**
     * Get the first node entry in a root node from a path.
     */
    const first: (root: Node, path: number[]) => [Node, number[]];
    /**
     * Get the sliced fragment represented by a range inside a root node.
     */
    const fragment: (root: Node, range: Range) => Fragment;
    /**
     * Find the furthest matching node entry starting from a specific path.
     */
    const furthest: (root: Node, path: number[], predicate: (entry: [Node, number[]]) => boolean) => [Node, number[]] | undefined;
    /**
     * Get the descendant node referred to by a specific path. If the path is an
     * empty array, it refers to the root node itself.
     */
    const get: (root: Node, path: number[]) => Node;
    /**
     * Check if a descendant node exists at a specific path.
     */
    const has: (root: Node, path: number[]) => boolean;
    /**
     * Check if a value implements the `Node` interface.
     */
    const isNode: (value: any) => value is Node;
    /**
     * Check if a value is a list of `Node` objects.
     */
    const isNodeList: (value: any) => value is Node[];
    /**
     * Get the lash node entry in a root node from a path.
     */
    const last: (root: Node, path: number[]) => [Node, number[]];
    /**
     * Get the node at a specific path, ensuring it's a leaf text node.
     */
    const leaf: (root: Node, path: number[]) => Text;
    /**
     * Return an iterable of the in a branch of the tree, from a specific path.
     *
     * By default the order is bottom-up, from lowest to highest node in the
     * tree, but you can pass the `reverse: true` option to go top-down.
     */
    function levels(root: Node, path: Path, options?: {
        reverse?: boolean;
    }): Iterable<NodeEntry>;
    /**
     * Return an iterable of all the marks in all of the text nodes in a root node.
     */
    function marks(root: Node, options?: {
        from?: Path;
        to?: Path;
        reverse?: boolean;
        pass?: (node: NodeEntry) => boolean;
    }): Iterable<MarkEntry>;
    /**
     * Return an iterable of all the node entries of a root node. Each entry is
     * returned as a `[Node, Path]` tuple, with the path referring to the node's
     * position inside the root node.
     */
    function nodes(root: Node, options?: {
        from?: Path;
        to?: Path;
        reverse?: boolean;
        pass?: (entry: NodeEntry) => boolean;
    }): Iterable<NodeEntry>;
    /**
     * Get the parent of a node at a specific path.
     */
    const parent: (root: Node, path: number[]) => Ancestor;
    /**
     * Get the concatenated text string of a node's content.
     *
     * Note that this will not include spaces or line breaks between block nodes.
     * It is not a user-facing string, but a string for performing offset-related
     * computations for a node.
     */
    const text: (node: Node) => string;
    /**
     * Return an iterable of all leaf text nodes in a root node.
     */
    function texts(root: Node, options?: {
        from?: Path;
        to?: Path;
        reverse?: boolean;
        pass?: (node: NodeEntry) => boolean;
    }): Iterable<TextEntry>;
}
export { Ancestor, AncestorEntry, Descendant, DescendantEntry, Node, NodeEntry };
//# sourceMappingURL=node.d.ts.map