import { Editor, Mark, Annotation, EditorConstructor, Element, Node } from '../..';
import { SchemaRule } from './rule';
declare const SchemaPlugin: (options?: {
    rules?: SchemaRule[] | undefined;
    value?: Pick<SchemaRule, "validate" | "define" | "normalize"> | undefined;
    annotations?: {
        [type: string]: Pick<SchemaRule, "validate" | "define" | "normalize">;
    } | undefined;
    elements?: {
        [type: string]: Pick<SchemaRule, "validate" | "define" | "normalize">;
    } | undefined;
    marks?: {
        [type: string]: Pick<SchemaRule, "validate" | "define" | "normalize">;
    } | undefined;
}) => (Base: EditorConstructor) => {
    new (...args: any[]): {
        /**
         * Check if a mark is atomic based on the schema rules.
         */
        isAtomic(this: Editor, mark: Mark): boolean;
        /**
         * Check if a node is block based on the schema rules.
         */
        isBlock(this: Editor, node: Node): node is Element;
        /**
         * Check if a node is inline based on the schema rules.
         */
        isInline(this: Editor, node: Node): node is Element;
        /**
         * Check if a node is void based on the schema rules.
         */
        isVoid(this: Editor, node: Node): node is Element;
        /**
         * Normalize a node at a path with the schema's rules, returning it to a
         * valid state if it is currently invalid.
         */
        normalizeNodeAtPath(this: Editor, path: number[]): void;
        onChange: (change: import("../../interfaces/change").Change) => void;
        operations: import("../../interfaces/operation").Operation[];
        readOnly: boolean;
        value: import("../../interfaces/value").Value;
        [DIRTY_PATHS]: number[][]; /**
         * Check if a mark is atomic based on the schema rules.
         */
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
        addAnnotation(this: Editor, key: string, annotation: Annotation): void;
        removeAnnotation(this: Editor, key: string): void;
        setAnnotation(this: Editor, key: string, props: Partial<Annotation>): void;
        addMarkAtPath(this: Editor, path: number[], mark: Mark): void;
        insertFragmentAtPath(this: Editor, path: number[], fragment: import("../../interfaces/fragment").Fragment): void;
        insertNodeAtPath(this: Editor, path: number[], node: Node): void;
        mergeBlockAtPath(this: Editor, path: number[]): void;
        mergeNodeAtPath(this: Editor, path: number[]): void;
        moveNodeAtPath(this: Editor, path: number[], newPath: number[]): void;
        removeChildrenAtPath(this: Editor, path: number[]): void;
        removeMarkAtPath(this: Editor, path: number[], mark: Mark): void;
        removeNodeAtPath(this: Editor, path: number[]): void;
        removeParentAtPath(this: Editor, path: number[]): void;
        replaceNodeAtPath(this: Editor, path: number[], node: Node): void;
        setNodeAtPath(this: Editor, path: number[], props: {}): void;
        setMarkAtPath(this: Editor, path: number[], mark: Partial<Mark>, props: {}): void;
        replaceMarkAtPath(this: Editor, path: number[], before: Mark, after: Mark): void;
        replaceTextAtPath(this: Editor, path: number[], text: string): void;
        splitNodeAtPath(this: Editor, path: number[], position: number, options?: {
            target?: number | undefined;
        }): void;
        unwrapChildrenAtPath(this: Editor, path: number[]): void;
        unwrapNodeAtPath(this: Editor, path: number[]): void;
        wrapNodeAtPath(this: Editor, path: number[], element: Element): void;
        deleteAtPoint(this: Editor, point: import("../../interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        insertBlockAtPoint(this: Editor, point: import("../../interfaces/point").Point, block: Element): void;
        insertFragmentAtPoint(this: Editor, point: import("../../interfaces/point").Point, fragment: import("../../interfaces/fragment").Fragment): void;
        insertInlineAtPoint(this: Editor, point: import("../../interfaces/point").Point, inline: Element): void;
        insertTextAtPoint(this: Editor, point: import("../../interfaces/point").Point, text: string): import("../../interfaces/point").Point;
        removeTextAtPoint(this: Editor, point: import("../../interfaces/point").Point, length: number): import("../../interfaces/point").Point;
        splitBlockAtPoint(this: Editor, point: import("../../interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitInlineAtPoint(this: Editor, point: import("../../interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitNodeAtPoint(this: Editor, point: import("../../interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitTextAtPoint(this: Editor, point: import("../../interfaces/point").Point, options?: {
            always?: boolean | undefined;
        }): void;
        addMarkAtRange(this: Editor, range: import("../../interfaces/range").Range, mark: Mark): void;
        deleteAtRange(this: Editor, range: import("../../interfaces/range").Range, options?: {
            amount?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            hanging?: boolean | undefined;
        }): void;
        insertBlockAtRange(this: Editor, range: import("../../interfaces/range").Range, block: Element): void;
        insertFragmentAtRange(this: Editor, range: import("../../interfaces/range").Range, fragment: import("../../interfaces/fragment").Fragment): void;
        insertInlineAtRange(this: Editor, range: import("../../interfaces/range").Range, inline: Element): void;
        insertTextAtRange(this: Editor, range: import("../../interfaces/range").Range, text: string): void;
        removeMarkAtRange(this: Editor, range: import("../../interfaces/range").Range, mark: Mark): void;
        setLeafBlocksAtRange(this: Editor, range: import("../../interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        }): void;
        setLeafInlinesAtRange(this: Editor, range: import("../../interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        }): void;
        setRootBlocksAtRange(this: Editor, range: import("../../interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        }): void;
        setRootInlinesAtRange(this: Editor, range: import("../../interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        }): void;
        splitBlockAtRange(this: Editor, range: import("../../interfaces/range").Range, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitInlineAtRange(this: Editor, range: import("../../interfaces/range").Range, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        toggleMarkAtRange(this: Editor, range: import("../../interfaces/range").Range, mark: Mark): void;
        unwrapBlockAtRange(this: Editor, range: import("../../interfaces/range").Range, props: {}): void;
        unwrapInlineAtRange(this: Editor, range: import("../../interfaces/range").Range, props: {}): void;
        wrapBlockAtRange(this: Editor, range: import("../../interfaces/range").Range, block: Element): void;
        wrapInlineAtRange(this: Editor, range: import("../../interfaces/range").Range, inline: Element): void;
        blur(this: Editor): void;
        deselect(this: Editor): void;
        focus(this: Editor): void;
        flip(this: Editor): void;
        move(this: Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        moveAnchor(this: Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        moveAnchorTo(this: Editor, point: import("../../interfaces/point").Point): void;
        moveEnd(this: Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        }): void;
        moveEndTo(this: Editor, point: import("../../interfaces/point").Point): void;
        moveFocus(this: Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        moveFocusTo(this: Editor, point: import("../../interfaces/point").Point): void;
        moveStart(this: Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        moveStartTo(this: Editor, point: import("../../interfaces/point").Point): void;
        moveTo(this: Editor, point: import("../../interfaces/point").Point): void;
        select(this: Editor, properties: Partial<import("../../interfaces/selection").Selection> | null): void;
        addMark(this: Editor, mark: Mark): void;
        apply(this: Editor, op: import("../../interfaces/operation").Operation): void;
        delete(this: Editor, options?: {
            amount?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): void;
        flush(this: Editor): void; /**
         * Check if a node is inline based on the schema rules.
         */
        insertBlock(this: Editor, block: Element): void;
        insertFragment(this: Editor, fragment: import("../../interfaces/fragment").Fragment): void;
        insertInline(this: Editor, inline: Element): void;
        insertText(this: Editor, text: string): void;
        normalize(this: Editor, options?: {
            force?: boolean | undefined;
        }): void;
        removeMark(this: Editor, mark: Mark): void;
        replaceMark(this: Editor, oldMark: Mark, newMark: Mark): void;
        setLeafBlocks(this: Editor, props: {}): void;
        setLeafInlines(this: Editor, props: {}): void;
        setRootBlocks(this: Editor, props: {}): void;
        setRootInlines(this: Editor, props: {}): void;
        setValue(this: Editor, props: {}): void;
        splitBlock(this: Editor, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        splitInline(this: Editor, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        toggleMark(this: Editor, mark: Mark): void;
        unwrapBlock(this: Editor, props: {}): void;
        unwrapInline(this: Editor, props: {}): void;
        withoutNormalizing(this: Editor, fn: () => void): void;
        wrapBlock(this: Editor, block: Element): void;
        wrapInline(this: Editor, inline: Element): void;
        isLeafBlock(this: Editor, node: Node): node is Element;
        isLeafInline(this: Editor, node: Node): node is Element;
        createPathRef(this: Editor, path: number[], options?: {
            stick?: "backward" | "forward" | null | undefined;
        }): import("../../classes/path-ref").PathRef;
        getClosestBlock(this: Editor, path: number[]): [Element, number[]] | undefined;
        getClosestInline(this: Editor, path: number[]): [Element, number[]] | undefined;
        getClosestVoid(this: Editor, path: number[]): [Element, number[]] | undefined;
        getEnd(this: Editor, path: number[]): import("../../interfaces/point").Point;
        getFirstText(this: Editor, path: number[]): [import("../../interfaces/text").Text, number[]];
        getFurthestBlock(this: Editor, path: number[]): [Element, number[]] | undefined;
        getFurthestInline(this: Editor, path: number[]): [Element, number[]] | undefined;
        getFurthestVoid(this: Editor, path: number[]): [Element, number[]] | undefined;
        getLastText(this: Editor, path: number[]): [import("../../interfaces/text").Text, number[]];
        getNextLeafBlock(this: Editor, path: number[]): [Element, number[]] | undefined;
        getNextLeafInline(this: Editor, path: number[]): [Element, number[]] | undefined;
        getNextRootBlock(this: Editor, path: number[]): [Element, number[]] | undefined;
        getNextRootInline(this: Editor, path: number[]): [Element, number[]] | undefined;
        getNextText(this: Editor, path: number[]): [import("../../interfaces/text").Text, number[]] | undefined;
        getPreviousLeafBlock(this: Editor, path: number[]): [Element, number[]] | undefined;
        getPreviousLeafInline(this: Editor, path: number[]): [Element, number[]] | undefined;
        getPreviousRootBlock(this: Editor, path: number[]): [Element, number[]] | undefined;
        getPreviousRootInline(this: Editor, path: number[]): [Element, number[]] | undefined;
        getPreviousText(this: Editor, path: number[]): [import("../../interfaces/text").Text, number[]] | undefined;
        getRange(this: Editor, path: number[]): import("../../interfaces/range").Range;
        getStart(this: Editor, path: number[]): import("../../interfaces/point").Point;
        createPointRef(this: Editor, point: import("../../interfaces/point").Point, options?: {
            stick?: "backward" | "forward" | null | undefined;
        }): import("../../classes/point-ref").PointRef;
        isAtStartOfPath(this: Editor, point: import("../../interfaces/point").Point, path: number[]): boolean;
        isAtEndOfPath(this: Editor, point: import("../../interfaces/point").Point, path: number[]): boolean;
        isAtEdgeOfPath(this: Editor, point: import("../../interfaces/point").Point, path: number[]): boolean;
        getNextPoint(this: Editor, point: import("../../interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        }): import("../../interfaces/point").Point | undefined;
        getNextNonVoidPoint(this: Editor, point: import("../../interfaces/point").Point): import("../../interfaces/point").Point | undefined;
        getPreviousPoint(this: Editor, point: import("../../interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        }): import("../../interfaces/point").Point | undefined;
        getPreviousNonVoidPoint(this: Editor, point: import("../../interfaces/point").Point): import("../../interfaces/point").Point | undefined; /**
         * Check if a node is void based on the schema rules.
         */
        createRangeRef(this: Editor, range: import("../../interfaces/range").Range, options?: {
            stick?: "backward" | "forward" | "outward" | "inward" | null | undefined;
        }): import("../../classes/range-ref").RangeRef;
        getNonBlockHangingRange(this: Editor, range: import("../../interfaces/range").Range): import("../../interfaces/range").Range;
        getNonInlineHangingRange(this: Editor, range: import("../../interfaces/range").Range): import("../../interfaces/range").Range;
        getNonHangingRange(this: Editor, range: import("../../interfaces/range").Range): import("../../interfaces/range").Range;
        isBlockHanging(this: Editor, range: import("../../interfaces/range").Range): boolean;
        isInlineHanging(this: Editor, range: import("../../interfaces/range").Range): boolean;
        isHanging(this: Editor, range: import("../../interfaces/range").Range): boolean;
        blocks(this: Editor, options?: {}): Iterable<[Element, number[]]>;
        getActiveMarks(this: Editor, options?: {
            union?: boolean | undefined;
        }): Mark[];
        inlines(this: Editor, options?: {}): Iterable<[Element, number[]]>;
        leafBlocks(this: Editor, options?: {}): Iterable<[Element, number[]]>;
        leafInlines(this: Editor, options?: {}): Iterable<[Element, number[]]>;
        positions(this: Editor, options?: {
            point?: import("../../interfaces/point").Point | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            allowZeroWidth?: boolean | undefined;
        }): Iterable<import("../../interfaces/point").Point>;
        rootBlocks(this: Editor, options?: {}): Iterable<[Element, number[]]>;
        rootInlines(this: Editor, options?: {}): Iterable<[Element, number[]]>;
        texts(this: Editor, options?: {}): Iterable<[import("../../interfaces/text").Text, number[]]>;
    };
};
export default SchemaPlugin;
//# sourceMappingURL=plugin.d.ts.map