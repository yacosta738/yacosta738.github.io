/// <reference types="react" />
/**
 * A React context for sharing the `ReactEditor` class.
 */
export declare const EditorContext: import("react").Context<{
    apply(op: import("slate/lib/interfaces/operation").Operation): void;
    findKey(node: import("slate/lib/interfaces/node").Node): import("../utils/key").Key;
    findPath(node: import("slate/lib/interfaces/node").Node): number[];
    getDecorations(node: import("slate/lib/interfaces/node").Node): import("slate/lib/interfaces/range").Range[];
    isFocused(): boolean;
    isReadOnly(): boolean;
    blur(): void;
    focus(): void;
    deselect(): void;
    insertData(dataTransfer: DataTransfer): void;
    onBeforeInput(event: Event & {
        data: string | null;
        dataTransfer: DataTransfer | null;
        getTargetRanges(): StaticRange[];
        inputType: string;
        isComposing: boolean;
    }): void;
    onKeyDown(event: KeyboardEvent): void;
    redo(): void;
    undo(): void;
    hasDomNode(target: Node, options?: {
        editable?: boolean | undefined;
    }): boolean;
    toDomNode(node: import("slate/lib/interfaces/node").Node): HTMLElement;
    toDomPoint(point: import("slate/lib/interfaces/point").Point): [Node, number];
    toDomRange(range: import("slate/lib/interfaces/range").Range): Range;
    toSlateNode(domNode: Node): import("slate/lib/interfaces/node").Node;
    findEventRange(event: any): import("slate/lib/interfaces/range").Range | undefined;
    toSlatePoint(domPoint: [Node, number]): import("slate/lib/interfaces/point").Point;
    toSlateRange(domRange: StaticRange | Range | Selection): import("slate/lib/interfaces/range").Range;
    onChange: (value: import("slate/lib/interfaces/value").Value, operations: import("slate/lib/interfaces/operation").Operation[]) => void;
    operations: import("slate/lib/interfaces/operation").Operation[];
    value: import("slate/lib/interfaces/value").Value;
    addAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, annotation: import("slate/lib/interfaces/range").Range): void;
    removeAnnotation(this: import("slate/lib/classes/editor").Editor, key: string): void;
    setAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, props: Partial<import("slate/lib/interfaces/range").Range>): void;
    delete(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "block" | undefined;
        reverse?: boolean | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    insertFragment(this: import("slate/lib/classes/editor").Editor, fragment: import("slate/lib/interfaces/fragment").Fragment, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
    } | undefined): void;
    insertText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
        at?: import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
    } | undefined): void;
    removeText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
        at?: import("slate/lib/interfaces/range").Range | undefined;
    } | undefined): void;
    insertNodes(this: import("slate/lib/classes/editor").Editor, nodes: import("slate/lib/interfaces/value").Value | import("slate/lib/interfaces/element").Element | import("slate/lib/interfaces/text").Text | import("slate/lib/interfaces/node").Node[], options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
    } | undefined): void;
    liftNodes(this: import("slate/lib/classes/editor").Editor, options: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
    }): void;
    mergeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    moveNodes(this: import("slate/lib/classes/editor").Editor, options: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        to: number[];
    }): void;
    normalizeNodes(this: import("slate/lib/classes/editor").Editor, options: {
        at: number[];
    }): void;
    removeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    setNodes(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text>, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    splitNodes(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        always?: boolean | undefined;
        height?: number | undefined;
    } | undefined): void;
    unwrapNodes(this: import("slate/lib/classes/editor").Editor, options: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        split?: boolean | undefined;
    }): void;
    wrapNodes(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        split?: boolean | undefined;
    } | undefined): void;
    addMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    removeMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    setMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], props: Partial<import("slate/lib/interfaces/mark").Mark>, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    toggleMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    collapse(this: import("slate/lib/classes/editor").Editor, options?: {
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    } | undefined): void;
    move(this: import("slate/lib/classes/editor").Editor, options?: {
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "offset" | undefined;
        reverse?: boolean | undefined;
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    } | undefined): void;
    select(this: import("slate/lib/classes/editor").Editor, target: import("slate/lib/interfaces/location").Location): void;
    setPoint(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/point").Point>, options: {
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    }): void;
    setSelection(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/range").Range>): void;
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
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/range").Range, string]>;
    elements(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/element").Element, number[]]>;
    getActiveMarks(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        union?: boolean | undefined;
        hanging?: boolean | undefined;
    } | undefined): import("slate/lib/interfaces/mark").Mark[];
    getAfter(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
    } | undefined): import("slate/lib/interfaces/point").Point | undefined;
    getAncestor(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
        depth?: number | undefined;
        edge?: "start" | "end" | undefined;
    } | undefined): [import("slate/lib/interfaces/node").Ancestor, number[]];
    getBefore(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
    } | undefined): import("slate/lib/interfaces/point").Point | undefined;
    getEdges(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [import("slate/lib/interfaces/point").Point, import("slate/lib/interfaces/point").Point];
    getEnd(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): import("slate/lib/interfaces/point").Point;
    getFirst(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [import("slate/lib/interfaces/node").Node, number[]];
    getFragment(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): import("slate/lib/interfaces/fragment").Fragment;
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
    getRange(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, to?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined): import("slate/lib/interfaces/range").Range;
    getStart(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): import("slate/lib/interfaces/point").Point;
    getText(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): string;
    hasNode(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
        depth?: number | undefined;
        edge?: "start" | "end" | undefined;
    } | undefined): boolean;
    isStart(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at: import("slate/lib/interfaces/location").Location): boolean;
    isEnd(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at: import("slate/lib/interfaces/location").Location): boolean;
    isEdge(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at: import("slate/lib/interfaces/location").Location): boolean;
    levels(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
    marks(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/mark").Mark, number, import("slate/lib/interfaces/text").Text, number[]]>;
    matches(this: import("slate/lib/classes/editor").Editor, options: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        reverse?: boolean | undefined;
    }): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
    nodes(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
    positions(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<import("slate/lib/interfaces/point").Point>;
    texts(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/text").Text, number[]]>;
    unhangRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): import("slate/lib/interfaces/range").Range;
} | undefined>;
/**
 * Get the current `ReactEditor` class that the component lives under.
 */
export declare const useEditor: () => {
    apply(op: import("slate/lib/interfaces/operation").Operation): void;
    findKey(node: import("slate/lib/interfaces/node").Node): import("../utils/key").Key;
    findPath(node: import("slate/lib/interfaces/node").Node): number[];
    getDecorations(node: import("slate/lib/interfaces/node").Node): import("slate/lib/interfaces/range").Range[];
    isFocused(): boolean;
    isReadOnly(): boolean;
    blur(): void;
    focus(): void;
    deselect(): void;
    insertData(dataTransfer: DataTransfer): void;
    onBeforeInput(event: Event & {
        data: string | null;
        dataTransfer: DataTransfer | null;
        getTargetRanges(): StaticRange[];
        inputType: string;
        isComposing: boolean;
    }): void;
    onKeyDown(event: KeyboardEvent): void;
    redo(): void;
    undo(): void;
    hasDomNode(target: Node, options?: {
        editable?: boolean | undefined;
    }): boolean;
    toDomNode(node: import("slate/lib/interfaces/node").Node): HTMLElement;
    toDomPoint(point: import("slate/lib/interfaces/point").Point): [Node, number];
    toDomRange(range: import("slate/lib/interfaces/range").Range): Range;
    toSlateNode(domNode: Node): import("slate/lib/interfaces/node").Node;
    findEventRange(event: any): import("slate/lib/interfaces/range").Range | undefined;
    toSlatePoint(domPoint: [Node, number]): import("slate/lib/interfaces/point").Point;
    toSlateRange(domRange: StaticRange | Range | Selection): import("slate/lib/interfaces/range").Range;
    onChange: (value: import("slate/lib/interfaces/value").Value, operations: import("slate/lib/interfaces/operation").Operation[]) => void;
    operations: import("slate/lib/interfaces/operation").Operation[];
    value: import("slate/lib/interfaces/value").Value;
    addAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, annotation: import("slate/lib/interfaces/range").Range): void;
    removeAnnotation(this: import("slate/lib/classes/editor").Editor, key: string): void;
    setAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, props: Partial<import("slate/lib/interfaces/range").Range>): void;
    delete(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "block" | undefined;
        reverse?: boolean | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    insertFragment(this: import("slate/lib/classes/editor").Editor, fragment: import("slate/lib/interfaces/fragment").Fragment, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
    } | undefined): void;
    insertText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
        at?: import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
    } | undefined): void;
    removeText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
        at?: import("slate/lib/interfaces/range").Range | undefined;
    } | undefined): void;
    insertNodes(this: import("slate/lib/classes/editor").Editor, nodes: import("slate/lib/interfaces/value").Value | import("slate/lib/interfaces/element").Element | import("slate/lib/interfaces/text").Text | import("slate/lib/interfaces/node").Node[], options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
    } | undefined): void;
    liftNodes(this: import("slate/lib/classes/editor").Editor, options: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
    }): void;
    mergeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    moveNodes(this: import("slate/lib/classes/editor").Editor, options: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        to: number[];
    }): void;
    normalizeNodes(this: import("slate/lib/classes/editor").Editor, options: {
        at: number[];
    }): void;
    removeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    setNodes(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text>, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    splitNodes(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        always?: boolean | undefined;
        height?: number | undefined;
    } | undefined): void;
    unwrapNodes(this: import("slate/lib/classes/editor").Editor, options: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        split?: boolean | undefined;
    }): void;
    wrapNodes(this: import("slate/lib/classes/editor").Editor, element: import("slate/lib/interfaces/element").Element, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        split?: boolean | undefined;
    } | undefined): void;
    addMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    removeMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    setMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], props: Partial<import("slate/lib/interfaces/mark").Mark>, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    toggleMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        hanging?: boolean | undefined;
    } | undefined): void;
    collapse(this: import("slate/lib/classes/editor").Editor, options?: {
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    } | undefined): void;
    move(this: import("slate/lib/classes/editor").Editor, options?: {
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "offset" | undefined;
        reverse?: boolean | undefined;
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    } | undefined): void;
    select(this: import("slate/lib/classes/editor").Editor, target: import("slate/lib/interfaces/location").Location): void;
    setPoint(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/point").Point>, options: {
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    }): void;
    setSelection(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/range").Range>): void;
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
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/range").Range, string]>;
    elements(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/element").Element, number[]]>;
    getActiveMarks(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        union?: boolean | undefined;
        hanging?: boolean | undefined;
    } | undefined): import("slate/lib/interfaces/mark").Mark[];
    getAfter(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
    } | undefined): import("slate/lib/interfaces/point").Point | undefined;
    getAncestor(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
        depth?: number | undefined;
        edge?: "start" | "end" | undefined;
    } | undefined): [import("slate/lib/interfaces/node").Ancestor, number[]];
    getBefore(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
    } | undefined): import("slate/lib/interfaces/point").Point | undefined;
    getEdges(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [import("slate/lib/interfaces/point").Point, import("slate/lib/interfaces/point").Point];
    getEnd(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): import("slate/lib/interfaces/point").Point;
    getFirst(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [import("slate/lib/interfaces/node").Node, number[]];
    getFragment(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): import("slate/lib/interfaces/fragment").Fragment;
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
    getRange(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, to?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined): import("slate/lib/interfaces/range").Range;
    getStart(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): import("slate/lib/interfaces/point").Point;
    getText(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): string;
    hasNode(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
        depth?: number | undefined;
        edge?: "start" | "end" | undefined;
    } | undefined): boolean;
    isStart(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at: import("slate/lib/interfaces/location").Location): boolean;
    isEnd(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at: import("slate/lib/interfaces/location").Location): boolean;
    isEdge(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, at: import("slate/lib/interfaces/location").Location): boolean;
    levels(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
    marks(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/mark").Mark, number, import("slate/lib/interfaces/text").Text, number[]]>;
    matches(this: import("slate/lib/classes/editor").Editor, options: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        match?: number | "value" | number[] | "block" | "inline" | "text" | "void" | Partial<import("slate/lib/interfaces/value").Value> | Partial<import("slate/lib/interfaces/element").Element> | Partial<import("slate/lib/interfaces/text").Text> | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        reverse?: boolean | undefined;
    }): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
    nodes(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
    positions(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | undefined;
        unit?: "character" | "word" | "line" | "block" | "offset" | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<import("slate/lib/interfaces/point").Point>;
    texts(this: import("slate/lib/classes/editor").Editor, options?: {
        at?: number[] | import("slate/lib/interfaces/range").Range | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
        reverse?: boolean | undefined;
    } | undefined): Iterable<[import("slate/lib/interfaces/text").Text, number[]]>;
    unhangRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): import("slate/lib/interfaces/range").Range;
};
//# sourceMappingURL=use-editor.d.ts.map