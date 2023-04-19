import { EditorConstructor, Operation } from '../..';
import { History } from './history';
declare const HISTORY: unique symbol;
declare const SAVING: unique symbol;
declare const MERGING: unique symbol;
/**
 * The `HistoryPlugin` keeps track of the operation history of a Slate editor as
 * operations are applied to it, using undo and redo stacks.
 */
declare const HistoryPlugin: () => (Base: EditorConstructor) => {
    new (...args: any[]): {
        /**
         * When an operation is applied to the editor, save it.
         */
        apply(op: Operation): void;
        /**
         * Get the history object for the editor.
         */
        getHistory(): History;
        /**
         * Redo to the next value in the history.
         */
        redo(): void;
        /**
         * Undo the previous operations in the history.
         */
        undo(): void;
        /**
         * Apply a series of changes inside a synchronous `fn`, without merging any of
         * the new operations into previous save point in the history.
         */
        withoutMerging(fn: () => void): void;
        /**
         * Apply a series of changes inside a synchronous `fn`, without saving any of
         * their operations into the history.
         */
        withoutSaving(fn: () => void): void;
        [HISTORY]: History;
        [MERGING]: boolean | null;
        [SAVING]: boolean;
        onChange: (change: import("../../interfaces/change").Change) => void;
        operations: Operation[];
        readOnly: boolean;
        value: import("../../interfaces/value").Value;
        [DIRTY_PATHS]: number[][];
        [FLUSHING]: boolean;
        [NORMALIZING]: boolean;
        [PATH_REFS]: {
            [key: number]: import("../../classes/path-ref").PathRef;
        };
        [POINT_REFS]: {
            [key: number]: import("../../classes/point-ref").PointRef;
        };
        [RANGE_REFS]: {
            [key: number]: import("../../classes/range-ref").RangeRef;
        };
        addAnnotation(this: import("../../classes/editor").Editor, key: string, annotation: import("../../interfaces/annotation").Annotation): void;
        removeAnnotation(this: import("../../classes/editor").Editor, key: string): void;
        setAnnotation(this: import("../../classes/editor").Editor, key: string, props: Partial<import("../../interfaces/annotation").Annotation>): void;
        addMarkAtPath(this: import("../../classes/editor").Editor, path: number[], mark: import("../../interfaces/mark").Mark): void;
        insertFragmentAtPath(this: import("../../classes/editor").Editor, path: number[], fragment: import("../../interfaces/fragment").Fragment): void;
        insertNodeAtPath(this: import("../../classes/editor").Editor, path: number[], node: import("../../interfaces/node").Node): void;
        mergeBlockAtPath(this: import("../../classes/editor").Editor, path: number[]): void; /**
         * Get the history object for the editor.
         */
        mergeNodeAtPath(this: import("../../classes/editor").Editor, path: number[]): void;
        moveNodeAtPath(this: import("../../classes/editor").Editor, path: number[], newPath: number[]): void;
        normalizeNodeAtPath(this: import("../../classes/editor").Editor, path: number[]): void;
        removeChildrenAtPath(this: import("../../classes/editor").Editor, path: number[]): void;
        removeMarkAtPath(this: import("../../classes/editor").Editor, path: number[], mark: import("../../interfaces/mark").Mark): void;
        removeNodeAtPath(this: import("../../classes/editor").Editor, path: number[]): void;
        removeParentAtPath(this: import("../../classes/editor").Editor, path: number[]): void;
        replaceNodeAtPath(this: import("../../classes/editor").Editor, path: number[], node: import("../../interfaces/node").Node): void;
        setNodeAtPath(this: import("../../classes/editor").Editor, path: number[], props: {}): void;
        setMarkAtPath(this: import("../../classes/editor").Editor, path: number[], mark: Partial<import("../../interfaces/mark").Mark>, props: {}): void;
        replaceMarkAtPath(this: import("../../classes/editor").Editor, path: number[], before: import("../../interfaces/mark").Mark, after: import("../../interfaces/mark").Mark): void;
        replaceTextAtPath(this: import("../../classes/editor").Editor, path: number[], text: string): void;
        splitNodeAtPath(this: import("../../classes/editor").Editor, path: number[], position: number, options?: {
            target?: number | undefined;
        }): void;
        unwrapChildrenAtPath(this: import("../../classes/editor").Editor, path: number[]): void;
        unwrapNodeAtPath(this: import("../../classes/editor").Editor, path: number[]): void;
        wrapNodeAtPath(this: import("../../classes/editor").Editor, path: number[], element: import("../../interfaces/element").Element): void;
        deleteAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        insertBlockAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, block: import("../../interfaces/element").Element): void;
        insertFragmentAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, fragment: import("../../interfaces/fragment").Fragment): void;
        insertInlineAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, inline: import("../../interfaces/element").Element): void;
        insertTextAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, text: string): import("../../interfaces/point").Point;
        removeTextAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, length: number): import("../../interfaces/point").Point;
        splitBlockAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitInlineAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitNodeAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitTextAtPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            always?: boolean | undefined;
        }): void;
        addMarkAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, mark: import("../../interfaces/mark").Mark): void;
        deleteAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, options?: {
            amount?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            hanging?: boolean | undefined;
        }): void;
        insertBlockAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, block: import("../../interfaces/element").Element): void;
        insertFragmentAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, fragment: import("../../interfaces/fragment").Fragment): void;
        insertInlineAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, inline: import("../../interfaces/element").Element): void;
        insertTextAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, text: string): void;
        removeMarkAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, mark: import("../../interfaces/mark").Mark): void;
        setLeafBlocksAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        }): void;
        setLeafInlinesAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        }): void;
        setRootBlocksAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        }): void;
        setRootInlinesAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        }): void;
        splitBlockAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitInlineAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        toggleMarkAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, mark: import("../../interfaces/mark").Mark): void;
        unwrapBlockAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, props: {}): void;
        unwrapInlineAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, props: {}): void;
        wrapBlockAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, block: import("../../interfaces/element").Element): void;
        wrapInlineAtRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, inline: import("../../interfaces/element").Element): void;
        blur(this: import("../../classes/editor").Editor): void;
        deselect(this: import("../../classes/editor").Editor): void;
        focus(this: import("../../classes/editor").Editor): void;
        flip(this: import("../../classes/editor").Editor): void;
        move(this: import("../../classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        moveAnchor(this: import("../../classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        moveAnchorTo(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point): void;
        moveEnd(this: import("../../classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        }): void;
        moveEndTo(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point): void;
        moveFocus(this: import("../../classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        moveFocusTo(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point): void;
        moveStart(this: import("../../classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        moveStartTo(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point): void; /**
         * Apply a series of changes inside a synchronous `fn`, without saving any of
         * their operations into the history.
         */
        moveTo(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point): void;
        select(this: import("../../classes/editor").Editor, properties: Partial<import("../../interfaces/selection").Selection> | null): void;
        addMark(this: import("../../classes/editor").Editor, mark: import("../../interfaces/mark").Mark): void;
        delete(this: import("../../classes/editor").Editor, options?: {
            amount?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        flush(this: import("../../classes/editor").Editor): void;
        insertBlock(this: import("../../classes/editor").Editor, block: import("../../interfaces/element").Element): void;
        insertFragment(this: import("../../classes/editor").Editor, fragment: import("../../interfaces/fragment").Fragment): void;
        insertInline(this: import("../../classes/editor").Editor, inline: import("../../interfaces/element").Element): void;
        insertText(this: import("../../classes/editor").Editor, text: string): void;
        normalize(this: import("../../classes/editor").Editor, options?: {
            force?: boolean | undefined;
        }): void;
        removeMark(this: import("../../classes/editor").Editor, mark: import("../../interfaces/mark").Mark): void;
        replaceMark(this: import("../../classes/editor").Editor, oldMark: import("../../interfaces/mark").Mark, newMark: import("../../interfaces/mark").Mark): void;
        setLeafBlocks(this: import("../../classes/editor").Editor, props: {}): void;
        setLeafInlines(this: import("../../classes/editor").Editor, props: {}): void;
        setRootBlocks(this: import("../../classes/editor").Editor, props: {}): void;
        setRootInlines(this: import("../../classes/editor").Editor, props: {}): void;
        setValue(this: import("../../classes/editor").Editor, props: {}): void;
        splitBlock(this: import("../../classes/editor").Editor, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitInline(this: import("../../classes/editor").Editor, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        toggleMark(this: import("../../classes/editor").Editor, mark: import("../../interfaces/mark").Mark): void;
        unwrapBlock(this: import("../../classes/editor").Editor, props: {}): void;
        unwrapInline(this: import("../../classes/editor").Editor, props: {}): void;
        withoutNormalizing(this: import("../../classes/editor").Editor, fn: () => void): void;
        wrapBlock(this: import("../../classes/editor").Editor, block: import("../../interfaces/element").Element): void;
        wrapInline(this: import("../../classes/editor").Editor, inline: import("../../interfaces/element").Element): void;
        isAtomic(this: import("../../classes/editor").Editor, mark: import("../../interfaces/mark").Mark): boolean;
        isBlock(this: import("../../classes/editor").Editor, node: import("../../interfaces/node").Node): node is import("../../interfaces/element").Element;
        isInline(this: import("../../classes/editor").Editor, node: import("../../interfaces/node").Node): node is import("../../interfaces/element").Element;
        isLeafBlock(this: import("../../classes/editor").Editor, node: import("../../interfaces/node").Node): node is import("../../interfaces/element").Element;
        isLeafInline(this: import("../../classes/editor").Editor, node: import("../../interfaces/node").Node): node is import("../../interfaces/element").Element;
        isVoid(this: import("../../classes/editor").Editor, node: import("../../interfaces/node").Node): node is import("../../interfaces/element").Element;
        createPathRef(this: import("../../classes/editor").Editor, path: number[], options?: {
            stick?: "backward" | "forward" | null | undefined;
        }): import("../../classes/path-ref").PathRef;
        getClosestBlock(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getClosestInline(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getClosestVoid(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getEnd(this: import("../../classes/editor").Editor, path: number[]): import("../../interfaces/point").Point;
        getFirstText(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/text").Text, number[]];
        getFurthestBlock(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getFurthestInline(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getFurthestVoid(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getLastText(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/text").Text, number[]];
        getNextLeafBlock(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getNextLeafInline(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getNextRootBlock(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getNextRootInline(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getNextText(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/text").Text, number[]] | undefined;
        getPreviousLeafBlock(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getPreviousLeafInline(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getPreviousRootBlock(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getPreviousRootInline(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/element").Element, number[]] | undefined;
        getPreviousText(this: import("../../classes/editor").Editor, path: number[]): [import("../../interfaces/text").Text, number[]] | undefined;
        getRange(this: import("../../classes/editor").Editor, path: number[]): import("../../interfaces/range").Range;
        getStart(this: import("../../classes/editor").Editor, path: number[]): import("../../interfaces/point").Point;
        createPointRef(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            stick?: "backward" | "forward" | null | undefined;
        }): import("../../classes/point-ref").PointRef;
        isAtStartOfPath(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, path: number[]): boolean;
        isAtEndOfPath(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, path: number[]): boolean;
        isAtEdgeOfPath(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, path: number[]): boolean;
        getNextPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        }): import("../../interfaces/point").Point | undefined;
        getNextNonVoidPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point): import("../../interfaces/point").Point | undefined;
        getPreviousPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        }): import("../../interfaces/point").Point | undefined;
        getPreviousNonVoidPoint(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point): import("../../interfaces/point").Point | undefined; /**
         * Apply a series of changes inside a synchronous `fn`, without merging any of
         * the new operations into previous save point in the history.
         */
        createRangeRef(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, options?: {
            stick?: "backward" | "forward" | "outward" | "inward" | null | undefined;
        }): import("../../classes/range-ref").RangeRef;
        getNonBlockHangingRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range): import("../../interfaces/range").Range;
        getNonInlineHangingRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range): import("../../interfaces/range").Range;
        getNonHangingRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range): import("../../interfaces/range").Range;
        isBlockHanging(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range): boolean;
        isInlineHanging(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range): boolean;
        isHanging(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range): boolean;
        blocks(this: import("../../classes/editor").Editor, options?: {}): Iterable<[import("../../interfaces/element").Element, number[]]>;
        getActiveMarks(this: import("../../classes/editor").Editor, options?: {
            union?: boolean | undefined;
        }): import("../../interfaces/mark").Mark[];
        inlines(this: import("../../classes/editor").Editor, options?: {}): Iterable<[import("../../interfaces/element").Element, number[]]>;
        leafBlocks(this: import("../../classes/editor").Editor, options?: {}): Iterable<[import("../../interfaces/element").Element, number[]]>;
        leafInlines(this: import("../../classes/editor").Editor, options?: {}): Iterable<[import("../../interfaces/element").Element, number[]]>;
        positions(this: import("../../classes/editor").Editor, options?: {
            point?: import("../../interfaces/point").Point | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            allowZeroWidth?: boolean | undefined;
        }): Iterable<import("../../interfaces/point").Point>;
        rootBlocks(this: import("../../classes/editor").Editor, options?: {}): Iterable<[import("../../interfaces/element").Element, number[]]>;
        rootInlines(this: import("../../classes/editor").Editor, options?: {}): Iterable<[import("../../interfaces/element").Element, number[]]>;
        texts(this: import("../../classes/editor").Editor, options?: {}): Iterable<[import("../../interfaces/text").Text, number[]]>;
    };
};
export { HistoryPlugin };
//# sourceMappingURL=plugin.d.ts.map