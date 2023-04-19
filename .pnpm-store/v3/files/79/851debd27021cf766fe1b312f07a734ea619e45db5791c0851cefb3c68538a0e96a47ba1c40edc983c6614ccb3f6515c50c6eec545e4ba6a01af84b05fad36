import { EditorConstructor } from 'slate';
/**
 * A plugin that adds the "before" browser-specific logic to the editor.
 */
export declare const BeforePlugin: () => (Editor: EditorConstructor<import("slate/lib/classes/editor").Editor>) => {
    new (...args: any[]): {
        /**
         * On before input.
         */
        onBeforeInput(event: any): void;
        /**
         * On blur.
         */
        onBlur(event: any): void;
        /**
         * On composition end.
         */
        onCompositionEnd(event: any): void;
        /**
         * On click.
         */
        onClick(event: any): void;
        /**
         * On composition start.
         */
        onCompositionStart(event: any): void;
        /**
         * On copy.
         */
        onCopy(event: any): void;
        /**
         * On cut.
         */
        onCut(event: any): void;
        /**
         * On drag end.
         */
        onDragEnd(event: any): void;
        /**
         * On drag enter.
         */
        onDragEnter(event: any): void;
        /**
         * On drag exit.
         */
        onDragExit(event: any): void;
        /**
         * On drag leave.
         */
        onDragLeave(event: any): void;
        /**
         * On drag over.
         */
        onDragOver(event: any): void;
        /**
         * On drag start.
         */
        onDragStart(event: any): void;
        /**
         * On drop.
         */
        onDrop(event: any): void;
        /**
         * On focus.
         */
        onFocus(event: any): void;
        /**
         * On input.
         */
        onInput(event: any): void;
        /**
         * On key down.
         */
        onKeyDown(event: any): void;
        /**
         * On key up.
         */
        onKeyUp(event: any): void;
        /**
         * On paste.
         */
        onPaste(event: any): void;
        /**
         * On select.
         */
        onSelect(event: any): void;
        onChange: (change: import("slate/lib/interfaces/change").Change) => void;
        operations: import("slate/lib/interfaces/operation").Operation[];
        readOnly: boolean;
        value: import("slate/lib/interfaces/value").Value;
        addAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, annotation: import("slate/lib/interfaces/range").Range): void;
        removeAnnotation(this: import("slate/lib/classes/editor").Editor, key: string): void;
        setAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, props: Partial<import("slate/lib/interfaces/range").Range>): void;
        delete(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            distance?: number | undefined;
            unit?: "block" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        insertFragment(this: import("slate/lib/classes/editor").Editor, fragment: import("slate/lib/interfaces/fragment").Fragment, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
        } | undefined): void;
        insertText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
            at?: import("slate/lib/interfaces/point").Point | import("slate/lib/interfaces/range").Range | undefined;
        } | undefined): void;
        removeText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
            at?: import("slate/lib/interfaces/range").Range | undefined;
        } | undefined): void;
        insertNodes(this: import("slate/lib/classes/editor").Editor, nodes: import("slate/lib/interfaces/value").Value | import("slate/lib/interfaces/element").Element | import("slate/lib/interfaces/text").Text | import("slate/lib/interfaces/node").Node[], options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        } | undefined): void;
        liftNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        }): void;
        mergeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        moveNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            to: number[];
        }): void;
        normalizeNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at: number[];
        }): void;
        removeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        setNodes(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text>, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        splitNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        unwrapNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        }): void;
        wrapNodes(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            match?: number | "text" | "value" | "block" | "inline" | "void" | Partial<Node> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        } | undefined): void;
        addMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        removeMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        setMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], props: Partial<import("slate/lib/interfaces/mark").Mark>, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        toggleMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        collapse(this: import("slate/lib/classes/editor").Editor, options?: {
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        } | undefined): void;
        deselect(this: import("slate/lib/classes/editor").Editor): void;
        move(this: import("slate/lib/classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        } | undefined): void;
        select(this: import("slate/lib/classes/editor").Editor, target: import("slate/lib/interfaces/location").Location): void;
        setPoint(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/point").Point>, options: {
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        }): void;
        setSelection(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/range").Range>): void;
        apply(this: import("slate/lib/classes/editor").Editor, op: import("slate/lib/interfaces/operation").Operation): void;
        flush(this: import("slate/lib/classes/editor").Editor): void;
        normalize(this: import("slate/lib/classes/editor").Editor, options?: {
            force?: boolean | undefined;
        } | undefined): void;
        withoutNormalizing(this: import("slate/lib/classes/editor").Editor, fn: () => void): void;
        hasBlocks(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element): boolean;
        hasInlines(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element): boolean;
        hasTexts(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element): boolean;
        isEmpty(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element): boolean;
        isInline(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element): boolean;
        isVoid(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element): boolean;
        createPathRef(this: import("slate/lib/classes/editor").Editor, path: number[], options?: {
            affinity?: "backward" | "forward" | null | undefined;
        } | undefined): import("slate/lib/classes/path-ref").PathRef;
        createPointRef(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            affinity?: "backward" | "forward" | null | undefined;
        } | undefined): import("slate/lib/classes/point-ref").PointRef;
        createRangeRef(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, options?: {
            affinity?: "backward" | "forward" | "outward" | "inward" | null | undefined;
        } | undefined): import("slate/lib/classes/range-ref").RangeRef;
        annotations(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/range").Range, string]>;
        elements(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/element").Element, number[]]>;
        entries(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
        getActiveMarks(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            union?: boolean | undefined;
            hanging?: boolean | undefined;
        } | undefined): import("slate/lib/interfaces/mark").Mark[];
        getAfter(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
        } | undefined): import("slate/lib/interfaces/point").Point | undefined;
        getAncestor(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [import("slate/lib/interfaces/node").Ancestor, number[]];
        getBefore(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
        } | undefined): import("slate/lib/interfaces/point").Point | undefined;
        getEdges(this: import("slate/lib/classes/editor").Editor, at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined): [import("slate/lib/interfaces/point").Point, import("slate/lib/interfaces/point").Point];
        getEnd(this: import("slate/lib/classes/editor").Editor, at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined): import("slate/lib/interfaces/point").Point;
        getFirst(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [import("slate/lib/interfaces/node").Node, number[]];
        getLast(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [import("slate/lib/interfaces/node").Node, number[]];
        getLeaf(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [import("slate/lib/interfaces/text").Text, number[]];
        getMatch(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, match: import("slate/lib/classes/utils").Match): [import("slate/lib/interfaces/node").Node, number[]] | undefined;
        getNext(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, match: import("slate/lib/classes/utils").Match): [import("slate/lib/interfaces/node").Node, number[]] | undefined;
        getNode(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [import("slate/lib/interfaces/node").Node, number[]];
        getParent(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [import("slate/lib/interfaces/node").Ancestor, number[]];
        getPath(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): number[];
        getPoint(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            edge?: "start" | "end" | undefined;
        } | undefined): import("slate/lib/interfaces/point").Point;
        getPrevious(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, match: import("slate/lib/classes/utils").Match): [import("slate/lib/interfaces/node").Node, number[]] | undefined;
        getRange(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, to?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined): import("slate/lib/interfaces/range").Range;
        getStart(this: import("slate/lib/classes/editor").Editor, at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined): import("slate/lib/interfaces/point").Point;
        getText(this: import("slate/lib/classes/editor").Editor, at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined): string;
        hasNode(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): boolean;
        isStart(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined): boolean;
        isEnd(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined): boolean;
        isEdge(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined): boolean;
        levels(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
        marks(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/mark").Mark, number, import("slate/lib/interfaces/text").Text, number[]]>;
        matches(this: import("slate/lib/classes/editor").Editor, options: {
            match: import("slate/lib/classes/utils").Match;
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
        positions(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<import("slate/lib/interfaces/point").Point>;
        texts(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: import("slate/lib/interfaces/point").Point | number[] | import("slate/lib/interfaces/range").Range | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/text").Text, number[]]>;
        unhangRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): import("slate/lib/interfaces/range").Range;
    };
};
//# sourceMappingURL=before.d.ts.map