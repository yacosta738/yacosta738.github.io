import { Node, Point, Range } from 'slate';
import { ReactEditor } from '.';
import { DOMPoint, DOMRange, DOMStaticRange, DOMSelection, DOMNode } from '../utils/dom';
export default class ReactEditorDomHelpers {
    /**
     * Check if a DOM node is within the editor.
     */
    hasDomNode(this: ReactEditor, target: DOMNode, options?: {
        editable?: boolean;
    }): boolean;
    /**
     * Find the native DOM element from a Slate node.
     */
    toDomNode(this: ReactEditor, node: Node): HTMLElement;
    /**
     * Find a native DOM selection point from a Slate point.
     */
    toDomPoint(this: ReactEditor, point: Point): DOMPoint;
    /**
     * Find a native DOM range from a Slate `range`.
     */
    toDomRange(this: ReactEditor, range: Range): DOMRange;
    /**
     * Find a Slate node from a native DOM `element`.
     */
    toSlateNode(this: ReactEditor, domNode: DOMNode): Node;
    /**
     * Get the target range from a DOM `event`.
     */
    findEventRange(this: ReactEditor, event: any): Range | undefined;
    /**
     * Find a Slate point from a DOM selection's `domNode` and `domOffset`.
     */
    toSlatePoint(this: ReactEditor, domPoint: DOMPoint): Point;
    /**
     * Find a Slate range from a DOM range or selection.
     */
    toSlateRange(this: ReactEditor, domRange: DOMRange | DOMStaticRange | DOMSelection): Range;
}
//# sourceMappingURL=dom-helpers.d.ts.map