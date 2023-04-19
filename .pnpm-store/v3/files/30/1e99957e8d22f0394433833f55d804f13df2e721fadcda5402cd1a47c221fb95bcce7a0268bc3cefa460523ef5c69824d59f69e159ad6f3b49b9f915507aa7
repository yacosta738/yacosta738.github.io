import { Editor, ElementEntry, Mark, Point, TextEntry } from '../..';
declare class ValueQueries {
    /**
     * Iterate through all of the block nodes in the editor.
     */
    blocks(this: Editor, options?: {}): Iterable<ElementEntry>;
    /**
     * Get the marks that are "active" in the current selection. These are the
     * marks that will be added to any text that is inserted.
     *
     * The `union: true` option can be passed to create a union of marks across
     * the text nodes in the selection, instead of creating an intersection, which
     * is the default.
     *
     * Note: to obey common rich text behavior, if the selection is collapsed at
     * the start of a text node and there are previous text nodes in the same
     * block, it will carry those marks forward from the previous text node. This
     * allows for continuation of marks from previous words.
     *
     * Note: when `selection.marks` is not null, it is always returned.
     */
    getActiveMarks(this: Editor, options?: {
        union?: boolean;
    }): Mark[];
    /**
     * Iterate through all of the inline nodes in the editor.
     */
    inlines(this: Editor, options?: {}): Iterable<ElementEntry>;
    /**
     * Iterate through all of the leaf block nodes in the editor.
     */
    leafBlocks(this: Editor, options?: {}): Iterable<ElementEntry>;
    /**
     * Iterate through all of the leaf inline nodes in the editor.
     */
    leafInlines(this: Editor, options?: {}): Iterable<ElementEntry>;
    /**
     * Iterate through all of the positions in the document where a `Point` can be
     * placed.
     *
     * By default it will move forward by individual offsets at a time,  but you
     * can pass the `unit: 'character'` option to moved forward one character, word,
     * or line at at time.
     *
     * Note: void nodes are treated as a single point, and iteration will not
     * happen inside their content.
     */
    positions(this: Editor, options?: {
        point?: Point;
        unit?: 'offset' | 'character' | 'word' | 'line';
        reverse?: boolean;
        allowZeroWidth?: boolean;
    }): Iterable<Point>;
    /**
     * Iterate through all of the root block nodes in the editor.
     */
    rootBlocks(this: Editor, options?: {}): Iterable<ElementEntry>;
    /**
     * Iterate through all of the root inline nodes in the editor.
     */
    rootInlines(this: Editor, options?: {}): Iterable<ElementEntry>;
    /**
     * Iterate through all of the text nodes in the editor.
     */
    texts(this: Editor, options?: {}): Iterable<TextEntry>;
}
export default ValueQueries;
//# sourceMappingURL=value.d.ts.map