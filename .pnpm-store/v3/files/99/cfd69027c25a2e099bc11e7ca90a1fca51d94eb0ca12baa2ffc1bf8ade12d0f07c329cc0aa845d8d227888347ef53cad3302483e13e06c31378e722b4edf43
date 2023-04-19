import { Editor, Element, Fragment, Mark, Operation } from '../..';
declare class ValueCommands {
    /**
     * Add a mark to the span of text that is currently selected.
     */
    addMark(this: Editor, mark: Mark): void;
    /**
     * Apply an operation to the editor, updating its current value.
     */
    apply(this: Editor, op: Operation): void;
    /**
     * Delete the content in the selection, or starting from the cursor.
     */
    delete(this: Editor, options?: {
        amount?: number;
        unit?: 'offset' | 'character' | 'word' | 'line';
        reverse?: boolean;
    }): void;
    /**
     * Flush the editor's current changes.
     */
    flush(this: Editor): void;
    /**
     * Insert a block node at the cursor.
     */
    insertBlock(this: Editor, block: Element): void;
    /**
     * Insert a fragment of nodes at the cursor.
     */
    insertFragment(this: Editor, fragment: Fragment): void;
    /**
     * Insert an inline node at the cursor.
     */
    insertInline(this: Editor, inline: Element): void;
    /**
     * Insert a string of text at the current selection.
     */
    insertText(this: Editor, text: string): void;
    /**
     * Normalize any paths that are considered "dirty", meaning they have recently
     * been changed by an operation.
     */
    normalize(this: Editor, options?: {
        force?: boolean;
    }): void;
    /**
     * Remove a mark from all of the spans of text in the current selection.
     */
    removeMark(this: Editor, mark: Mark): void;
    /**
     * Replace a mark on all of the spans of text in the selection with a new one.
     */
    replaceMark(this: Editor, oldMark: Mark, newMark: Mark): void;
    /**
     * Set new properties on the leaf block nodes in the current selection.
     */
    setLeafBlocks(this: Editor, props: {}): void;
    /**
     * Set new properties on the leaf inline nodes in the current selection.
     */
    setLeafInlines(this: Editor, props: {}): void;
    /**
     * Set new properties on the root block nodes in the current selection.
     */
    setRootBlocks(this: Editor, props: {}): void;
    /**
     * Set new properties on the root inline nodes in the current selection.
     */
    setRootInlines(this: Editor, props: {}): void;
    /**
     * Set new properties on the top-level `Value` object.
     */
    setValue(this: Editor, props: {}): void;
    /**
     * Split the block at the cursor, up to a height.
     */
    splitBlock(this: Editor, options?: {
        always?: boolean;
        height?: number;
    }): void;
    /**
     * Split the inline at the cursor, up to a height.
     */
    splitInline(this: Editor, options?: {
        always?: boolean;
        height?: number;
    }): void;
    /**
     * Toggle a mark on or off for all the spans of text in the selection.
     */
    toggleMark(this: Editor, mark: Mark): void;
    /**
     * Unwrap the block nodes in the selection that match a set of properties.
     */
    unwrapBlock(this: Editor, props: {}): void;
    /**
     * Unwrap the inline nodes in the selection that match a set of properties.
     */
    unwrapInline(this: Editor, props: {}): void;
    /**
     * Apply a series of changes inside a synchronous callback, deferring
     * normalization until after the callback has finished executing.
     */
    withoutNormalizing(this: Editor, fn: () => void): void;
    /**
     * Wrap the block nodes in the selection in a new block.
     */
    wrapBlock(this: Editor, block: Element): void;
    /**
     * Wrap the inline nodes in the selection in a new inline.
     */
    wrapInline(this: Editor, inline: Element): void;
}
export default ValueCommands;
//# sourceMappingURL=value.d.ts.map