import { Descendant, Editor, Fragment, Path, Range, Point } from '../..';
declare class InsertingCommands {
    /**
     * Insert a node at a specific location in the editor.
     *
     * The `at` option can be:
     *
     * - Omitted and the editor's current selection will be used as a range.
     *
     * - A `Range` and the range's content will be deleted, and then the collapsed
     *   range will be used as a point.
     *
     * - A `Point` and the nodes up to a certain height will be split, and then
     *   the node will be inserted at the correct path. The height is determined
     *   by what kind of node you insert. Blocks are inserted at as leaf blocks.
     *   Inlines are inserted as root inlines. And texts are inserted at leaf
     *   nodes. You can override the default by passing the `height` option.
     *
     * - A `Path` and the node will be inserted at the specific path.
     */
    insertNode(this: Editor, node: Descendant, options?: {
        at?: Range | Point | Path;
        height?: number | 'block' | 'inline';
    }): void;
    insertFragment(this: Editor, fragment: Fragment): void;
    insertText(this: Editor, text: string, options?: {
        at?: Point | Range;
    }): void;
}
export default InsertingCommands;
//# sourceMappingURL=inserting.d.ts.map