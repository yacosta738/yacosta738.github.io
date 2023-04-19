import { Editor, Mark, Range, EditorConstructor, Element, Node } from '../..';
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
         * Check if a node is inline based on the schema rules.
         */
        isInline(this: Editor, element: Element): boolean;
        /**
         * Check if a node is void based on the schema rules.
         */
        isVoid(this: Editor, element: Element): boolean;
        /**
         * Normalize a node at a path with the schema's rules, returning it to a
         * valid state if it is currently invalid.
         */
        normalizeNodeAtPath(this: Editor, options?: {
            at?: number[] | undefined;
        }): void;
        onChange: (change: import("../../interfaces/change").Change) => void;
        operations: import("../../interfaces/operation").Operation[];
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
        addAnnotation(this: Editor, key: string, annotation: Range): void;
        removeAnnotation(this: Editor, key: string): void;
        setAnnotation(this: Editor, key: string, props: Partial<Range>): void;
        delete(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            distance?: number | undefined;
            unit?: "character" | "word" | "line" | "block" | undefined;
            reverse?: boolean | undefined;
            hanging?: boolean | undefined;
        }): void;
        insertFragment(this: Editor, fragment: import("../../interfaces/fragment").Fragment, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
        }): void;
        insertText(this: Editor, text: string, options?: {
            at?: import("../../interfaces/point").Point | Range | undefined;
        }): void;
        removeText(this: Editor, text: string, options?: {
            at?: Range | undefined;
        }): void;
        insertNodes(this: Editor, nodes: Element | import("../../interfaces/value").Value | import("../../interfaces/text").Text | Node[], options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
        }): void;
        liftNodes(this: Editor, options: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
        }): void;
        mergeNodes(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        }): void;
        moveNodes(this: Editor, options: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
            to: number[];
        }): void;
        normalizeNodes(this: Editor, options: {
            at: number[];
        }): void;
        removeNodes(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        }): void;
        setNodes(this: Editor, props: Partial<Element> | Partial<import("../../interfaces/value").Value> | Partial<import("../../interfaces/text").Text>, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        }): void;
        splitNodes(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
            always?: boolean | undefined;
            height?: number | undefined;
        }): void;
        unwrapNodes(this: Editor, options: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        }): void;
        wrapNodes(this: Editor, element: Element, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            match?: number | "value" | "text" | "block" | "inline" | "void" | Partial<Node_1> | ((entry: [Node, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        }): void;
        addMarks(this: Editor, marks: Mark[], options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            hanging?: boolean | undefined;
        }): void;
        removeMarks(this: Editor, marks: Mark[], options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            hanging?: boolean | undefined;
        }): void;
        setMarks(this: Editor, marks: Mark[], props: Partial<Mark>, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            hanging?: boolean | undefined;
        }): void;
        toggleMarks(this: Editor, marks: Mark[], options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            hanging?: boolean | undefined;
        }): void;
        collapse(this: Editor, options?: {
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        }): void;
        deselect(this: Editor): void;
        move(this: Editor, options?: {
            distance?: number | undefined;
            unit?: "character" | "word" | "line" | "offset" | undefined;
            reverse?: boolean | undefined;
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        }): void;
        select(this: Editor, target: import("../../interfaces/location").Location): void;
        setPoint(this: Editor, props: Partial<import("../../interfaces/point").Point>, options: {
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        }): void;
        setSelection(this: Editor, props: Partial<Range>): void;
        apply(this: Editor, op: import("../../interfaces/operation").Operation): void;
        flush(this: Editor): void;
        normalize(this: Editor, options?: {
            force?: boolean | undefined;
        }): void;
        withoutNormalizing(this: Editor, fn: () => void): void;
        hasBlocks(this: Editor, element: Element): boolean;
        hasInlines(this: Editor, element: Element): boolean;
        hasTexts(this: Editor, element: Element): boolean;
        isEmpty(this: Editor, element: Element): boolean;
        createPathRef(this: Editor, path: number[], options?: {
            affinity?: "backward" | "forward" | null | undefined;
        }): import("../../classes/path-ref").PathRef;
        createPointRef(this: Editor, point: import("../../interfaces/point").Point, options?: {
            affinity?: "backward" | "forward" | null | undefined;
        }): import("../../classes/point-ref").PointRef;
        createRangeRef(this: Editor, range: Range, options?: {
            affinity?: "backward" | "forward" | "outward" | "inward" | null | undefined;
        }): import("../../classes/range-ref").RangeRef;
        annotations(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
        }): Iterable<[Range, string]>;
        elements(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[Element, number[]]>;
        entries(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[Node, number[]]>;
        getActiveMarks(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            union?: boolean | undefined;
            hanging?: boolean | undefined;
        }): Mark[];
        getAfter(this: Editor, at: import("../../interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
        }): import("../../interfaces/point").Point | undefined;
        getAncestor(this: Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): [import("../../interfaces/node").Ancestor, number[]];
        getBefore(this: Editor, at: import("../../interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
        }): import("../../interfaces/point").Point | undefined;
        getEdges(this: Editor, at?: import("../../interfaces/location").Location): [import("../../interfaces/point").Point, import("../../interfaces/point").Point];
        getEnd(this: Editor, at?: import("../../interfaces/location").Location): import("../../interfaces/point").Point;
        getFirst(this: Editor, at: import("../../interfaces/location").Location): [Node, number[]];
        getLast(this: Editor, at: import("../../interfaces/location").Location): [Node, number[]];
        getLeaf(this: Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): [import("../../interfaces/text").Text, number[]];
        getMatch(this: Editor, at: import("../../interfaces/location").Location, match: import("../../classes/utils").Match): [Node, number[]] | undefined;
        getNext(this: Editor, at: import("../../interfaces/location").Location, match: import("../../classes/utils").Match): [Node, number[]] | undefined;
        getNode(this: Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): [Node, number[]];
        getParent(this: Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): [import("../../interfaces/node").Ancestor, number[]];
        getPath(this: Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): number[];
        getPoint(this: Editor, at: import("../../interfaces/location").Location, options?: {
            edge?: "start" | "end" | undefined;
        }): import("../../interfaces/point").Point;
        getPrevious(this: Editor, at: import("../../interfaces/location").Location, match: import("../../classes/utils").Match): [Node, number[]] | undefined;
        getRange(this: Editor, at: import("../../interfaces/location").Location, to?: number[] | import("../../interfaces/point").Point | Range | undefined): Range;
        getStart(this: Editor, at?: import("../../interfaces/location").Location): import("../../interfaces/point").Point;
        getText(this: Editor, at?: import("../../interfaces/location").Location): string;
        hasNode(this: Editor, at: import("../../interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        }): boolean;
        isStart(this: Editor, point: import("../../interfaces/point").Point, at?: import("../../interfaces/location").Location): boolean;
        isEnd(this: Editor, point: import("../../interfaces/point").Point, at?: import("../../interfaces/location").Location): boolean;
        isEdge(this: Editor, point: import("../../interfaces/point").Point, at?: import("../../interfaces/location").Location): boolean;
        levels(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[Node, number[]]>;
        marks(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[Mark, number, import("../../interfaces/text").Text, number[]]>;
        matches(this: Editor, options: {
            match: import("../../classes/utils").Match;
            at?: number[] | import("../../interfaces/point").Point | Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[Node, number[]]>;
        positions(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | undefined;
            unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
            reverse?: boolean | undefined;
        }): Iterable<import("../../interfaces/point").Point>;
        texts(this: Editor, options?: {
            at?: number[] | import("../../interfaces/point").Point | Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("../../interfaces/text").Text, number[]]>;
        unhangRange(this: Editor, range: Range): Range;
    };
};
export default SchemaPlugin;
//# sourceMappingURL=plugin.d.ts.map