import { Editor, Element, Fragment, Point } from '../..';
declare class PointCommands {
    /**
     * Delete a span of content starting from a point.
     */
    deleteAtPoint(this: Editor, point: Point, options?: {
        distance?: number;
        unit?: 'offset' | 'character' | 'word' | 'line';
        reverse?: boolean;
    }): void;
    /**
     * Insert a block node at a point.
     */
    insertBlockAtPoint(this: Editor, point: Point, block: Element): void;
    /**
     * Insert a fragment of nodes at a point.
     */
    insertFragmentAtPoint(this: Editor, point: Point, fragment: Fragment): void;
    /**
     * Insert an inline node at a point.
     */
    insertInlineAtPoint(this: Editor, point: Point, inline: Element): void;
    /**
     * Insert a string of text at a specific point in the document.
     */
    insertTextAtPoint(this: Editor, point: Point, text: string): Point;
    /**
     * Remove a string of text by length from a specific point in the document.
     */
    removeTextAtPoint(this: Editor, point: Point, length: number): Point;
    /**
     * Split the block node at a specific point, up to a certain block height.
     */
    splitBlockAtPoint(this: Editor, point: Point, options?: {
        always?: boolean;
        height?: number;
    }): void;
    /**
     * Split the inline node at a specific point, up to a certain inline height.
     */
    splitInlineAtPoint(this: Editor, point: Point, options?: {
        always?: boolean;
        height?: number;
    }): void;
    /**
     * Split nodes in the document at a specific point, up to a certain height.
     *
     * If the `always: false` option is passed, nodes will only be split if the
     * point is not already at one of their edges.
     */
    splitNodeAtPoint(this: Editor, point: Point, options?: {
        always?: boolean;
        height?: number;
    }): void;
    /**
     * Split the text node at a point.
     */
    splitTextAtPoint(this: Editor, point: Point, options?: {
        always?: boolean;
    }): void;
}
export default PointCommands;
//# sourceMappingURL=point.d.ts.map