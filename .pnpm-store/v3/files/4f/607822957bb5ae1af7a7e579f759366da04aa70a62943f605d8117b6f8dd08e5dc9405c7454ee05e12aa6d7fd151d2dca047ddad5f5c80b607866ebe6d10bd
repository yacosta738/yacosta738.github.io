import { Node as SlateNode, Point as SlatePoint, Range as SlateRange } from 'slate';
import { ReactEditor } from '../editor';
import { NativeElement, NativePoint, NativeRange, NativeStaticRange, NativeSelection, NativeNode } from '../../utils/dom';
/**
 * A set of DOM-related helpers for the `ReactEditor`.
 */
export default class ReactEditorDomHelpers {
    /**
     * Check if a DOM node is within the editor.
     */
    hasDomNode(this: ReactEditor, target: NativeNode, options?: {
        editable?: boolean;
    }): boolean;
    /**
     * Find the native DOM element from a Slate node.
     */
    toDomNode(this: ReactEditor, node: SlateNode): HTMLElement | undefined;
    /**
     * Find a native DOM selection point from a Slate point.
     */
    toDomPoint(this: ReactEditor, point: SlatePoint): {
        node: NativeElement;
        offset: number;
    } | undefined;
    /**
     * Find a native DOM range from a Slate `range`.
     */
    toDomRange(this: ReactEditor, range: SlateRange): NativeRange | undefined;
    /**
     * Find a Slate node from a native DOM `element`.
     */
    toSlateNode(this: ReactEditor, domNode: NativeNode): SlateNode | undefined;
    /**
     * Get the target range from a DOM `event`.
     */
    findEventRange(this: ReactEditor, event: any): SlateRange | undefined;
    /**
     * Find a Slate point from a DOM selection's `domNode` and `domOffset`.
     */
    toSlatePoint(this: ReactEditor, domPoint: NativePoint): SlatePoint | undefined;
    /**
     * Find a Slate range from a DOM range or selection.
     */
    toSlateRange(this: ReactEditor, domRange: NativeRange | NativeStaticRange | NativeSelection): SlateRange | undefined;
}
//# sourceMappingURL=dom-helpers.d.ts.map