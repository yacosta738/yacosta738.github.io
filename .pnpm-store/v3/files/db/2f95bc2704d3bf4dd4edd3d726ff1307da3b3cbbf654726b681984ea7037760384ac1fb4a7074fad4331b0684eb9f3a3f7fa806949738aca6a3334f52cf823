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
        addAnnotation(this: import("../../classes/editor").Editor, key: string, annotation: import("../../interfaces/range").Range): void;
        removeAnnotation(this: import("../../classes/editor").Editor, key: string): void;
        setAnnotation(this: import("../../classes/editor").Editor, key: string, props: Partial<import("../../interfaces/range").Range>): void;
        delete(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            distance?: number | undefined;
            unit?: "block" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            hanging?: boolean | undefined;
        }): void;
        insertFragment(this: import("../../classes/editor").Editor, fragment: import("../../interfaces/fragment").Fragment, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
        }): void;
        insertText(this: import("../../classes/editor").Editor, text: string, options?: {
            at?: import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
        }): void;
        removeText(this: import("../../classes/editor").Editor, text: string, options?: {
            at?: import("../../interfaces/range").Range | undefined;
        }): void;
        insertNodes(this: import("../../classes/editor").Editor, nodes: import("../../interfaces/value").Value | import("../../interfaces/element").Element | import("../../interfaces/text").Text | import("../../interfaces/node").Node[], options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
        }): void;
        liftNodes(this: import("../../classes/editor").Editor, options: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
        }): void;
        mergeNodes(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        }): void;
        moveNodes(this: import("../../classes/editor").Editor, options: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
            to: number[];
        }): void;
        normalizeNodes(this: import("../../classes/editor").Editor, options: {
            at: number[];
        }): void;
        removeNodes(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        }): void;
        setNodes(this: import("../../classes/editor").Editor, props: Partial<import("../../interfaces/value").Value> | Partial<import("../../interfaces/element").Element> | Partial<import("../../interfaces/text").Text>, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        }): void;
        splitNodes(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        unwrapNodes(this: import("../../classes/editor").Editor, options: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        }): void;
        wrapNodes(this: import("../../classes/editor").Editor, element: import("../../interfaces/element").Element, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("../../interfaces/node").Node, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        }): void;
        addMarks(this: import("../../classes/editor").Editor, marks: import("../../interfaces/mark").Mark[], options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined; /**
             * The `HistoryPlugin` keeps track of the operation history of a Slate editor as
             * operations are applied to it, using undo and redo stacks.
             */
            hanging?: boolean | undefined;
        }): void;
        removeMarks(this: import("../../classes/editor").Editor, marks: import("../../interfaces/mark").Mark[], options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            hanging?: boolean | undefined;
        }): void;
        setMarks(this: import("../../classes/editor").Editor, marks: import("../../interfaces/mark").Mark[], props: Partial<import("../../interfaces/mark").Mark>, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            hanging?: boolean | undefined;
        }): void;
        toggleMarks(this: import("../../classes/editor").Editor, marks: import("../../interfaces/mark").Mark[], options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            /**
             * Get the history object for the editor.
             */
            hanging?: boolean | undefined;
        }): void;
        collapse(this: import("../../classes/editor").Editor, options?: {
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        }): void;
        deselect(this: import("../../classes/editor").Editor): void;
        move(this: import("../../classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        }): void; /**
         * Get the history object for the editor.
         */
        select(this: import("../../classes/editor").Editor, target: import("../../interfaces/location").Location): void;
        setPoint(this: import("../../classes/editor").Editor, props: Partial<import("../../interfaces/point").Point>, options: {
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        }): void;
        setSelection(this: import("../../classes/editor").Editor, props: Partial<import("../../interfaces/range").Range>): void;
        flush(this: import("../../classes/editor").Editor): void;
        normalize(this: import("../../classes/editor").Editor, options?: {
            force?: boolean | undefined;
        }): void;
        withoutNormalizing(this: import("../../classes/editor").Editor, fn: () => void): void;
        hasBlocks(this: import("../../classes/editor").Editor, element: import("../../interfaces/element").Element): boolean;
        hasInlines(this: import("../../classes/editor").Editor, element: import("../../interfaces/element").Element): boolean;
        hasTexts(this: import("../../classes/editor").Editor, element: import("../../interfaces/element").Element): boolean;
        isEmpty(this: import("../../classes/editor").Editor, element: import("../../interfaces/element").Element): boolean;
        isInline(this: import("../../classes/editor").Editor, element: import("../../interfaces/element").Element): boolean;
        isVoid(this: import("../../classes/editor").Editor, element: import("../../interfaces/element").Element): boolean;
        createPathRef(this: import("../../classes/editor").Editor, path: number[], options?: {
            affinity?: "backward" | "forward" | null | undefined;
        }): import("../../classes/path-ref").PathRef;
        createPointRef(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, options?: {
            affinity?: "backward" | "forward" | null | undefined;
        }): import("../../classes/point-ref").PointRef;
        createRangeRef(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range, options?: {
            affinity?: "backward" | "forward" | "outward" | "inward" | null | undefined;
        }): import("../../classes/range-ref").RangeRef;
        annotations(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
        }): Iterable<[import("../../interfaces/range").Range, string]>;
        elements(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("../../interfaces/element").Element, number[]]>;
        entries(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("../../interfaces/node").Node, number[]]>;
        getActiveMarks(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            union?: boolean | undefined;
            hanging?: boolean | undefined;
        }): import("../../interfaces/mark").Mark[];
        getAfter(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
        }): import("../../interfaces/point").Point | undefined;
        getAncestor(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): [import("../../interfaces/node").Ancestor, number[]];
        getBefore(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
        }): import("../../interfaces/point").Point | undefined;
        getEdges(this: import("../../classes/editor").Editor, at?: import("../../interfaces/location").Location): [import("../../interfaces/point").Point, import("../../interfaces/point").Point];
        getEnd(this: import("../../classes/editor").Editor, at?: import("../../interfaces/location").Location): import("../../interfaces/point").Point;
        getFirst(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location): [import("../../interfaces/node").Node, number[]];
        getLast(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location): [import("../../interfaces/node").Node, number[]];
        getLeaf(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): [import("../../interfaces/text").Text, number[]];
        getMatch(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, match: import("../../classes/utils").Match): [import("../../interfaces/node").Node, number[]] | undefined;
        getNext(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, match: import("../../classes/utils").Match): [import("../../interfaces/node").Node, number[]] | undefined;
        getNode(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): [import("../../interfaces/node").Node, number[]];
        getParent(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): [import("../../interfaces/node").Ancestor, number[]];
        getPath(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): number[];
        getPoint(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            edge?: "start" | "end" | undefined;
        }): import("../../interfaces/point").Point;
        getPrevious(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, match: import("../../classes/utils").Match): [import("../../interfaces/node").Node, number[]] | undefined;
        getRange(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, to?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined): import("../../interfaces/range").Range;
        getStart(this: import("../../classes/editor").Editor, at?: import("../../interfaces/location").Location): import("../../interfaces/point").Point;
        getText(this: import("../../classes/editor").Editor, at?: import("../../interfaces/location").Location): string;
        hasNode(this: import("../../classes/editor").Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): boolean;
        isStart(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, at?: import("../../interfaces/location").Location): boolean;
        isEnd(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, at?: import("../../interfaces/location").Location): boolean;
        isEdge(this: import("../../classes/editor").Editor, point: import("../../interfaces/point").Point, at?: import("../../interfaces/location").Location): boolean;
        levels(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("../../interfaces/node").Node, number[]]>;
        marks(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("../../interfaces/mark").Mark, number, import("../../interfaces/text").Text, number[]]>;
        matches(this: import("../../classes/editor").Editor, options: {
            match: import("../../classes/utils").Match;
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("../../interfaces/node").Node, number[]]>;
        positions(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        }): Iterable<import("../../interfaces/point").Point>;
        texts(this: import("../../classes/editor").Editor, options?: {
            at?: number[] | import("../../interfaces/range").Range | import("../../interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("../../interfaces/text").Text, number[]]>;
        unhangRange(this: import("../../classes/editor").Editor, range: import("../../interfaces/range").Range): import("../../interfaces/range").Range;
    };
};
export { HistoryPlugin };
//# sourceMappingURL=plugin.d.ts.map