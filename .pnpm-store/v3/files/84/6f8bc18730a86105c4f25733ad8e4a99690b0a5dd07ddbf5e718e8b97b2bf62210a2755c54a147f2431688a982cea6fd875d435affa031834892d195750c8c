import { EditorConstructor, Element, Node } from 'slate';
declare const h: <S extends "element" | "mark" | "annotation" | "anchor" | "cursor" | "focus" | "selection" | "text" | "value">(tagName: S, attributes?: Object | undefined, ...children: any[]) => ReturnType<({
    anchor: typeof import("slate-hyperscript/lib/creators").createAnchor;
    annotation: typeof import("slate-hyperscript/lib/creators").createAnnotation;
    cursor: typeof import("slate-hyperscript/lib/creators").createCursor;
    element: typeof import("slate-hyperscript/lib/creators").createElement;
    focus: typeof import("slate-hyperscript/lib/creators").createFocus;
    mark: typeof import("slate-hyperscript/lib/creators").createMark;
    selection: typeof import("slate-hyperscript/lib/creators").createSelection;
    text: typeof import("slate-hyperscript/lib/creators").createText;
    value: typeof import("slate-hyperscript/lib/creators").createValue;
} | {
    anchor: typeof import("slate-hyperscript/lib/creators").createAnchor;
    annotation: typeof import("slate-hyperscript/lib/creators").createAnnotation;
    cursor: typeof import("slate-hyperscript/lib/creators").createCursor;
    element: typeof import("slate-hyperscript/lib/creators").createElement;
    focus: typeof import("slate-hyperscript/lib/creators").createFocus;
    mark: typeof import("slate-hyperscript/lib/creators").createMark;
    selection: typeof import("slate-hyperscript/lib/creators").createSelection;
    text: typeof import("slate-hyperscript/lib/creators").createText;
    value: typeof import("slate-hyperscript/lib/creators").createValue;
})[S]>;
declare const TestPlugin: (Editor: EditorConstructor) => {
    new (...args: any[]): {
        isInline(node: Node): node is Element;
        onChange: (change: import("slate/lib/interfaces/change").Change) => void;
        operations: import("slate/lib/interfaces/operation").Operation[];
        readOnly: boolean;
        value: import("slate/lib/interfaces/value").Value;
        [DIRTY_PATHS]: number[][];
        [FLUSHING]: boolean;
        [NORMALIZING]: boolean;
        [PATH_REFS]: {
            [key: number]: import("slate/lib/classes/path-ref").PathRef;
        };
        [POINT_REFS]: {
            [key: number]: import("slate/lib/classes/point-ref").PointRef;
        };
        [RANGE_REFS]: {
            [key: number]: import("slate/lib/classes/range-ref").RangeRef;
        };
        addAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, annotation: import("slate/lib/interfaces/annotation").Annotation): void;
        removeAnnotation(this: import("slate/lib/classes/editor").Editor, key: string): void;
        setAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, props: Partial<import("slate/lib/interfaces/annotation").Annotation>): void;
        addMarkAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], mark: import("slate/lib/interfaces/mark").Mark): void;
        insertFragmentAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], fragment: import("slate/lib/interfaces/fragment").Fragment): void;
        insertNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], node: Node): void;
        mergeBlockAtPath(this: import("slate/lib/classes/editor").Editor, path: number[]): void;
        mergeNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[]): void;
        moveNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], newPath: number[]): void;
        normalizeNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[]): void;
        removeChildrenAtPath(this: import("slate/lib/classes/editor").Editor, path: number[]): void;
        removeMarkAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], mark: import("slate/lib/interfaces/mark").Mark): void;
        removeNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[]): void;
        removeParentAtPath(this: import("slate/lib/classes/editor").Editor, path: number[]): void;
        replaceNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], node: Node): void;
        setNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], props: {}): void;
        setMarkAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], mark: Partial<import("slate/lib/interfaces/mark").Mark>, props: {}): void;
        replaceMarkAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], before: import("slate/lib/interfaces/mark").Mark, after: import("slate/lib/interfaces/mark").Mark): void;
        replaceTextAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], text: string): void;
        splitNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], position: number, options?: {
            target?: number | undefined;
        } | undefined): void;
        unwrapChildrenAtPath(this: import("slate/lib/classes/editor").Editor, path: number[]): void;
        unwrapNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[]): void;
        wrapNodeAtPath(this: import("slate/lib/classes/editor").Editor, path: number[], element: Element): void;
        deleteAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        } | undefined): void;
        insertBlockAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, block: Element): void;
        insertFragmentAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, fragment: import("slate/lib/interfaces/fragment").Fragment): void;
        insertInlineAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, inline: Element): void;
        insertTextAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, text: string): import("slate/lib/interfaces/point").Point;
        removeTextAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, length: number): import("slate/lib/interfaces/point").Point;
        splitBlockAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        splitInlineAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        splitNodeAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        splitTextAtPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            always?: boolean | undefined;
        } | undefined): void;
        addMarkAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, mark: import("slate/lib/interfaces/mark").Mark): void;
        deleteAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, options?: {
            amount?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        insertBlockAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, block: Element): void;
        insertFragmentAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, fragment: import("slate/lib/interfaces/fragment").Fragment): void;
        insertInlineAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, inline: Element): void;
        insertTextAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, text: string): void;
        removeMarkAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, mark: import("slate/lib/interfaces/mark").Mark): void;
        setLeafBlocksAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        } | undefined): void;
        setLeafInlinesAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        } | undefined): void;
        setRootBlocksAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        } | undefined): void;
        setRootInlinesAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, props: {}, options?: {
            hanging?: boolean | undefined;
        } | undefined): void;
        splitBlockAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        splitInlineAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        toggleMarkAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, mark: import("slate/lib/interfaces/mark").Mark): void;
        unwrapBlockAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, props: {}): void;
        unwrapInlineAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, props: {}): void;
        wrapBlockAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, block: Element): void;
        wrapInlineAtRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, inline: Element): void;
        blur(this: import("slate/lib/classes/editor").Editor): void;
        deselect(this: import("slate/lib/classes/editor").Editor): void;
        focus(this: import("slate/lib/classes/editor").Editor): void;
        flip(this: import("slate/lib/classes/editor").Editor): void;
        move(this: import("slate/lib/classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        } | undefined): void;
        moveAnchor(this: import("slate/lib/classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        } | undefined): void;
        moveAnchorTo(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point): void;
        moveEnd(this: import("slate/lib/classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        } | undefined): void;
        moveEndTo(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point): void;
        moveFocus(this: import("slate/lib/classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        } | undefined): void;
        moveFocusTo(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point): void;
        moveStart(this: import("slate/lib/classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        } | undefined): void;
        moveStartTo(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point): void;
        moveTo(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point): void;
        select(this: import("slate/lib/classes/editor").Editor, properties: Partial<import("slate/lib/interfaces/selection").Selection> | null): void;
        addMark(this: import("slate/lib/classes/editor").Editor, mark: import("slate/lib/interfaces/mark").Mark): void;
        apply(this: import("slate/lib/classes/editor").Editor, op: import("slate/lib/interfaces/operation").Operation): void;
        delete(this: import("slate/lib/classes/editor").Editor, options?: {
            amount?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        } | undefined): void;
        flush(this: import("slate/lib/classes/editor").Editor): void;
        insertBlock(this: import("slate/lib/classes/editor").Editor, block: Element): void;
        insertFragment(this: import("slate/lib/classes/editor").Editor, fragment: import("slate/lib/interfaces/fragment").Fragment): void;
        insertInline(this: import("slate/lib/classes/editor").Editor, inline: Element): void;
        insertText(this: import("slate/lib/classes/editor").Editor, text: string): void;
        normalize(this: import("slate/lib/classes/editor").Editor, options?: {
            force?: boolean | undefined;
        } | undefined): void;
        removeMark(this: import("slate/lib/classes/editor").Editor, mark: import("slate/lib/interfaces/mark").Mark): void;
        replaceMark(this: import("slate/lib/classes/editor").Editor, oldMark: import("slate/lib/interfaces/mark").Mark, newMark: import("slate/lib/interfaces/mark").Mark): void;
        setLeafBlocks(this: import("slate/lib/classes/editor").Editor, props: {}): void;
        setLeafInlines(this: import("slate/lib/classes/editor").Editor, props: {}): void;
        setRootBlocks(this: import("slate/lib/classes/editor").Editor, props: {}): void;
        setRootInlines(this: import("slate/lib/classes/editor").Editor, props: {}): void;
        setValue(this: import("slate/lib/classes/editor").Editor, props: {}): void;
        splitBlock(this: import("slate/lib/classes/editor").Editor, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        splitInline(this: import("slate/lib/classes/editor").Editor, options?: {
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        toggleMark(this: import("slate/lib/classes/editor").Editor, mark: import("slate/lib/interfaces/mark").Mark): void;
        unwrapBlock(this: import("slate/lib/classes/editor").Editor, props: {}): void;
        unwrapInline(this: import("slate/lib/classes/editor").Editor, props: {}): void;
        withoutNormalizing(this: import("slate/lib/classes/editor").Editor, fn: () => void): void;
        wrapBlock(this: import("slate/lib/classes/editor").Editor, block: Element): void;
        wrapInline(this: import("slate/lib/classes/editor").Editor, inline: Element): void;
        isAtomic(this: import("slate/lib/classes/editor").Editor, mark: import("slate/lib/interfaces/mark").Mark): boolean;
        isBlock(this: import("slate/lib/classes/editor").Editor, node: Node): node is Element;
        isLeafBlock(this: import("slate/lib/classes/editor").Editor, node: Node): node is Element;
        isLeafInline(this: import("slate/lib/classes/editor").Editor, node: Node): node is Element;
        isVoid(this: import("slate/lib/classes/editor").Editor, node: Node): node is Element;
        createPathRef(this: import("slate/lib/classes/editor").Editor, path: number[], options?: {
            stick?: "backward" | "forward" | null | undefined;
        } | undefined): import("slate/lib/classes/path-ref").PathRef;
        getClosestBlock(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getClosestInline(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getClosestVoid(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getEnd(this: import("slate/lib/classes/editor").Editor, path: number[]): import("slate/lib/interfaces/point").Point;
        getFirstText(this: import("slate/lib/classes/editor").Editor, path: number[]): [import("slate/lib/interfaces/text").Text, number[]];
        getFurthestBlock(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getFurthestInline(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getFurthestVoid(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getLastText(this: import("slate/lib/classes/editor").Editor, path: number[]): [import("slate/lib/interfaces/text").Text, number[]];
        getNextLeafBlock(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getNextLeafInline(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getNextRootBlock(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getNextRootInline(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getNextText(this: import("slate/lib/classes/editor").Editor, path: number[]): [import("slate/lib/interfaces/text").Text, number[]] | undefined;
        getPreviousLeafBlock(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getPreviousLeafInline(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getPreviousRootBlock(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getPreviousRootInline(this: import("slate/lib/classes/editor").Editor, path: number[]): [Element, number[]] | undefined;
        getPreviousText(this: import("slate/lib/classes/editor").Editor, path: number[]): [import("slate/lib/interfaces/text").Text, number[]] | undefined;
        getRange(this: import("slate/lib/classes/editor").Editor, path: number[]): import("slate/lib/interfaces/range").Range;
        getStart(this: import("slate/lib/classes/editor").Editor, path: number[]): import("slate/lib/interfaces/point").Point;
        createPointRef(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            stick?: "backward" | "forward" | null | undefined;
        } | undefined): import("slate/lib/classes/point-ref").PointRef;
        isAtStartOfPath(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, path: number[]): boolean;
        isAtEndOfPath(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, path: number[]): boolean;
        isAtEdgeOfPath(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, path: number[]): boolean;
        getNextPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        } | undefined): import("slate/lib/interfaces/point").Point | undefined;
        getNextNonVoidPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point): import("slate/lib/interfaces/point").Point | undefined;
        getPreviousPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            allowZeroWidth?: boolean | undefined;
        } | undefined): import("slate/lib/interfaces/point").Point | undefined;
        getPreviousNonVoidPoint(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point): import("slate/lib/interfaces/point").Point | undefined;
        createRangeRef(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range, options?: {
            stick?: "backward" | "forward" | "outward" | "inward" | null | undefined;
        } | undefined): import("slate/lib/classes/range-ref").RangeRef;
        getNonBlockHangingRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): import("slate/lib/interfaces/range").Range;
        getNonInlineHangingRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): import("slate/lib/interfaces/range").Range;
        getNonHangingRange(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): import("slate/lib/interfaces/range").Range;
        isBlockHanging(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): boolean;
        isInlineHanging(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): boolean;
        isHanging(this: import("slate/lib/classes/editor").Editor, range: import("slate/lib/interfaces/range").Range): boolean;
        blocks(this: import("slate/lib/classes/editor").Editor, options?: {} | undefined): Iterable<[Element, number[]]>;
        getActiveMarks(this: import("slate/lib/classes/editor").Editor, options?: {
            union?: boolean | undefined;
        } | undefined): import("slate/lib/interfaces/mark").Mark[];
        inlines(this: import("slate/lib/classes/editor").Editor, options?: {} | undefined): Iterable<[Element, number[]]>;
        leafBlocks(this: import("slate/lib/classes/editor").Editor, options?: {} | undefined): Iterable<[Element, number[]]>;
        leafInlines(this: import("slate/lib/classes/editor").Editor, options?: {} | undefined): Iterable<[Element, number[]]>;
        positions(this: import("slate/lib/classes/editor").Editor, options?: {
            point?: import("slate/lib/interfaces/point").Point | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            allowZeroWidth?: boolean | undefined;
        } | undefined): Iterable<import("slate/lib/interfaces/point").Point>;
        rootBlocks(this: import("slate/lib/classes/editor").Editor, options?: {} | undefined): Iterable<[Element, number[]]>;
        rootInlines(this: import("slate/lib/classes/editor").Editor, options?: {} | undefined): Iterable<[Element, number[]]>;
        texts(this: import("slate/lib/classes/editor").Editor, options?: {} | undefined): Iterable<[import("slate/lib/interfaces/text").Text, number[]]>;
    };
};
declare const schema: {
    blocks: {
        image: {
            isVoid: boolean;
        };
    };
    inlines: {
        emoji: {
            isVoid: boolean;
        };
    };
    annotations: {
        result: {
            isAtomic: boolean;
        };
    };
};
export { h, TestPlugin, schema };
//# sourceMappingURL=index.d.ts.map