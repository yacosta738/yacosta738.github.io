import { Editor, ElementEntry, Point, Path, PathRef, Range, TextEntry } from '../..';
declare class PathQueries {
    /**
     * Create a mutable ref for a `Path` object, which will stay in sync as new
     * operations are applied to the this.
     */
    createPathRef(this: Editor, path: Path, options?: {
        stick?: 'backward' | 'forward' | null;
    }): PathRef;
    /**
     * Get the closest block node at a path.
     */
    getClosestBlock(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the closest inline node entry at a path.
     */
    getClosestInline(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the closest void node entry at a path.
     */
    getClosestVoid(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the end point of the node at path.
     */
    getEnd(this: Editor, path: Path): Point;
    /**
     * Get the first text node from a node at path.
     */
    getFirstText(this: Editor, path: Path): TextEntry;
    /**
     * Get the furthest block node at a path.
     */
    getFurthestBlock(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the furthest inline node entry at a path.
     */
    getFurthestInline(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the furthest void node entry at a path.
     */
    getFurthestVoid(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the last text node from a node at path.
     */
    getLastText(this: Editor, path: Path): TextEntry;
    /**
     * Get the next leaf block node entry starting from a path.
     */
    getNextLeafBlock(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the next leaf inline node entry starting from a path.
     */
    getNextLeafInline(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the next root block node entry starting from a path.
     */
    getNextRootBlock(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the next root inline node entry starting from a path.
     */
    getNextRootInline(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the next text node entry starting from a path.
     */
    getNextText(this: Editor, path: Path): TextEntry | undefined;
    /**
     * Get the previous leaf block node entry starting from a path.
     */
    getPreviousLeafBlock(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the previous leaf inline node entry starting from a path.
     */
    getPreviousLeafInline(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the previous root block node entry starting from a path.
     */
    getPreviousRootBlock(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the previous root inline node entry starting from a path.
     */
    getPreviousRootInline(this: Editor, path: Path): ElementEntry | undefined;
    /**
     * Get the previous text node entry starting from a path.
     */
    getPreviousText(this: Editor, path: Path): TextEntry | undefined;
    /**
     * Get the full range of a node at path.
     */
    getRange(this: Editor, path: Path): Range;
    /**
     * Get the start point of the node at path.
     */
    getStart(this: Editor, path: Path): Point;
}
export default PathQueries;
//# sourceMappingURL=path.d.ts.map