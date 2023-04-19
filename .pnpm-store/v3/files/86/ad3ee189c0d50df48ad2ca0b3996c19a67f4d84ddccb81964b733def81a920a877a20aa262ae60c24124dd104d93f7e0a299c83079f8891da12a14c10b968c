import { Editor, Fragment, Mark, Element, Range } from '../..';
declare class RangeCommands {
    /**
     * Add a mark to all of the spans of text in a range, splitting the individual
     * text nodes if the range intersects them.
     */
    addMarkAtRange(this: Editor, range: Range, mark: Mark): void;
    /**
     * Delete the content in a range.
     */
    deleteAtRange(this: Editor, range: Range, options?: {
        amount?: number;
        unit?: 'offset' | 'character' | 'word' | 'line';
        reverse?: boolean;
        hanging?: boolean;
    }): void;
    /**
     * Insert a block node at a range.
     */
    insertBlockAtRange(this: Editor, range: Range, block: Element): void;
    /**
     * Insert a fragment of nodes at a range.
     */
    insertFragmentAtRange(this: Editor, range: Range, fragment: Fragment): void;
    /**
     * Insert an inline node at a range.
     */
    insertInlineAtRange(this: Editor, range: Range, inline: Element): void;
    /**
     * Insert a string of text at a range.
     */
    insertTextAtRange(this: Editor, range: Range, text: string): void;
    /**
     * Remove a mark from all of the spans of text in a range.
     */
    removeMarkAtRange(this: Editor, range: Range, mark: Mark): void;
    /**
     * Set new properties on all of the leaf blocks in a range.
     */
    setLeafBlocksAtRange(this: Editor, range: Range, props: {}, options?: {
        hanging?: boolean;
    }): void;
    /**
     * Set new properties on all of the leaf inlines in a range.
     */
    setLeafInlinesAtRange(this: Editor, range: Range, props: {}, options?: {
        hanging?: boolean;
    }): void;
    /**
     * Set new properties on all of the root blocks in a range.
     */
    setRootBlocksAtRange(this: Editor, range: Range, props: {}, options?: {
        hanging?: boolean;
    }): void;
    /**
     * Set new properties on all of the root inlines in a range.
     */
    setRootInlinesAtRange(this: Editor, range: Range, props: {}, options?: {
        hanging?: boolean;
    }): void;
    /**
     * Split the block at a range, up to a height.
     */
    splitBlockAtRange(this: Editor, range: Range, options?: {
        always?: boolean;
        height?: number;
    }): void;
    /**
     * Split the inline at a range, up to a height.
     */
    splitInlineAtRange(this: Editor, range: Range, options?: {
        always?: boolean;
        height?: number;
    }): void;
    /**
     * Toggle a mark on or off for all of the spans of text in a range.
     */
    toggleMarkAtRange(this: Editor, range: Range, mark: Mark): void;
    /**
     * Unwrap the block nodes in a range that match a set of properties.
     */
    unwrapBlockAtRange(this: Editor, range: Range, props: {}): void;
    /**
     * Unwrap the inline nodes in a range that match a set of properties.
     */
    unwrapInlineAtRange(this: Editor, range: Range, props: {}): void;
    /**
     * Wrap the blocks in a range in a new block parent.
     */
    wrapBlockAtRange(this: Editor, range: Range, block: Element): void;
    /**
     * Wrap the text and inline nodes in a range in a new inline parent.
     */
    wrapInlineAtRange(this: Editor, range: Range, inline: Element): void;
}
export default RangeCommands;
//# sourceMappingURL=range.d.ts.map