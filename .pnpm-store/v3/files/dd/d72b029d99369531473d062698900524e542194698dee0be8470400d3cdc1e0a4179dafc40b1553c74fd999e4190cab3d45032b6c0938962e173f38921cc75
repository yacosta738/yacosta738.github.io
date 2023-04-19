import { Editor, Node, Element, Location, Path } from '../..';
import { Match } from '../utils';
declare class NodeCommands {
    /**
     * Insert nodes at a specific location in the editor.
     */
    insertNodes(this: Editor, nodes: Node | Node[], options?: {
        at?: Location;
        match?: Match;
    }): void;
    /**
     * Lift nodes at a specific location upwards in the document tree, splitting
     * their parent in two if necessary.
     */
    liftNodes(this: Editor, options: {
        at?: Location;
        match?: Match;
    }): void;
    /**
     * Merge a node at a location with the previous node of the same depth,
     * removing any empty containing nodes after the merge if necessary.
     */
    mergeNodes(this: Editor, options?: {
        at?: Location;
        match?: Match;
        hanging?: boolean;
    }): void;
    /**
     * Move the nodes at a location to a new location.
     */
    moveNodes(this: Editor, options: {
        at?: Location;
        match?: Match;
        to: Path;
    }): void;
    /**
     * Normalize a node at a path, returning it to a valid state if it is
     * currently invalid.
     */
    normalizeNodes(this: Editor, options: {
        at: Path;
    }): void;
    /**
     * Remove the nodes at a specific location in the document.
     */
    removeNodes(this: Editor, options?: {
        at?: Location;
        match?: Match;
        hanging?: boolean;
    }): void;
    /**
     * Set new properties on the nodes ...
     */
    setNodes(this: Editor, props: Partial<Node>, options?: {
        at?: Location;
        match?: Match;
        hanging?: boolean;
    }): void;
    /**
     * Split the nodes at a specific location.
     */
    splitNodes(this: Editor, options?: {
        at?: Location;
        match?: Match;
        always?: boolean;
        height?: number;
    }): void;
    /**
     * Unwrap the nodes at a location from a parent node, splitting the parent if
     * necessary to ensure that only the content in the range is unwrapped.
     */
    unwrapNodes(this: Editor, options: {
        at?: Location;
        match?: Match;
        split?: boolean;
    }): void;
    /**
     * Wrap the nodes at a location in a new container node, splitting the edges
     * of the range first to ensure that only the content in the range is wrapped.
     */
    wrapNodes(this: Editor, element: Element, options?: {
        at?: Location;
        match?: Match;
        split?: boolean;
    }): void;
}
export default NodeCommands;
//# sourceMappingURL=node.d.ts.map