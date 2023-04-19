/// <reference types="react" />
import { Value, Element, Range as SlateRange, Operation } from 'slate';
import { CustomAnnotationProps, CustomDecorationProps, CustomElementProps, CustomMarkProps } from './custom';
/**
 * Editor.
 */
declare const Editor: (props: {
    [key: string]: any;
    decorate?: ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => SlateRange[]) | undefined;
    editor: {
        apply(op: Operation): void;
        findKey(node: import("slate/lib/interfaces/node").Node): import("../utils/key").Key;
        findPath(node: import("slate/lib/interfaces/node").Node): number[];
        getDecorations(node: import("slate/lib/interfaces/node").Node): SlateRange[];
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
        toDomRange(range: SlateRange): Range;
        toSlateNode(domNode: Node): import("slate/lib/interfaces/node").Node;
        findEventRange(event: any): SlateRange | undefined;
        toSlatePoint(domPoint: [Node, number]): import("slate/lib/interfaces/point").Point;
        toSlateRange(domRange: Range | StaticRange | Selection): SlateRange;
        onChange: (value: Value, operations: Operation[]) => void;
        operations: Operation[];
        value: Value;
        addAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, annotation: SlateRange): void;
        removeAnnotation(this: import("slate/lib/classes/editor").Editor, key: string): void;
        setAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, props: Partial<SlateRange>): void;
        delete(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            distance?: number | undefined;
            unit?: "block" | "line" | "character" | "word" | undefined;
            reverse?: boolean | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        insertFragment(this: import("slate/lib/classes/editor").Editor, fragment: import("slate/lib/interfaces/fragment").Fragment, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
        } | undefined): void;
        insertText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
            at?: SlateRange | import("slate/lib/interfaces/point").Point | undefined;
        } | undefined): void;
        removeText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
            at?: SlateRange | undefined;
        } | undefined): void;
        insertNodes(this: import("slate/lib/classes/editor").Editor, nodes: Value | Element | import("slate/lib/interfaces/text").Text | import("slate/lib/interfaces/node").Node[], options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        } | undefined): void;
        liftNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
        }): void;
        mergeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        moveNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            to: number[];
        }): void;
        normalizeNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at: number[];
        }): void;
        removeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        setNodes(this: import("slate/lib/classes/editor").Editor, props: Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text>, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        splitNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        unwrapNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        }): void;
        wrapNodes(this: import("slate/lib/classes/editor").Editor, element: Element, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        } | undefined): void;
        addMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        removeMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        setMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], props: Partial<import("slate/lib/interfaces/mark").Mark>, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        toggleMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        collapse(this: import("slate/lib/classes/editor").Editor, options?: {
            edge?: "focus" | "start" | "end" | "anchor" | undefined;
        } | undefined): void;
        move(this: import("slate/lib/classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "line" | "character" | "word" | undefined;
            reverse?: boolean | undefined;
            edge?: "focus" | "start" | "end" | "anchor" | undefined;
        } | undefined): void;
        select(this: import("slate/lib/classes/editor").Editor, target: import("slate/lib/interfaces/location").Location): void;
        setPoint(this: import("slate/lib/classes/editor").Editor, props: Partial<import("slate/lib/interfaces/point").Point>, options: {
            edge?: "focus" | "start" | "end" | "anchor" | undefined;
        }): void;
        setSelection(this: import("slate/lib/classes/editor").Editor, props: Partial<SlateRange>): void;
        flush(this: import("slate/lib/classes/editor").Editor): void;
        normalize(this: import("slate/lib/classes/editor").Editor, options?: {
            force?: boolean | undefined;
        } | undefined): void;
        withoutNormalizing(this: import("slate/lib/classes/editor").Editor, fn: () => void): void;
        hasBlocks(this: import("slate/lib/classes/editor").Editor, element: Element): boolean;
        hasInlines(this: import("slate/lib/classes/editor").Editor, element: Element): boolean;
        hasTexts(this: import("slate/lib/classes/editor").Editor, element: Element): boolean;
        isEmpty(this: import("slate/lib/classes/editor").Editor, element: Element): boolean;
        isInline(this: import("slate/lib/classes/editor").Editor, element: Element): boolean;
        isVoid(this: import("slate/lib/classes/editor").Editor, element: Element): boolean;
        createPathRef(this: import("slate/lib/classes/editor").Editor, path: number[], options?: {
            affinity?: "backward" | "forward" | null | undefined;
        } | undefined): import("slate/lib/classes/path-ref").PathRef;
        createPointRef(this: import("slate/lib/classes/editor").Editor, point: import("slate/lib/interfaces/point").Point, options?: {
            affinity?: "backward" | "forward" | null | undefined;
        } | undefined): import("slate/lib/classes/point-ref").PointRef;
        createRangeRef(this: import("slate/lib/classes/editor").Editor, range: SlateRange, options?: {
            affinity?: "backward" | "forward" | "outward" | "inward" | null | undefined;
        } | undefined): import("slate/lib/classes/range-ref").RangeRef;
        annotations(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
        } | undefined): Iterable<[SlateRange, string]>;
        elements(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[Element, number[]]>;
        getActiveMarks(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            union?: boolean | undefined;
            hanging?: boolean | undefined;
        } | undefined): import("slate/lib/interfaces/mark").Mark[];
        getAfter(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "offset" | "block" | "line" | "character" | "word" | undefined;
        } | undefined): import("slate/lib/interfaces/point").Point | undefined;
        getAncestor(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [import("slate/lib/interfaces/node").Ancestor, number[]];
        getBefore(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "offset" | "block" | "line" | "character" | "word" | undefined;
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
        getRange(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, to?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined): SlateRange;
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
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
        marks(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/mark").Mark, number, import("slate/lib/interfaces/text").Text, number[]]>;
        matches(this: import("slate/lib/classes/editor").Editor, options: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
            match?: number | number[] | "value" | Partial<Value> | Partial<Element> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "block" | "inline" | "void" | ((entry: [import("slate/lib/interfaces/node").Node, number[]]) => boolean) | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
        nodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/node").Node, number[]]>;
        positions(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | undefined;
            unit?: "offset" | "block" | "line" | "character" | "word" | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<import("slate/lib/interfaces/point").Point>;
        texts(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlateRange | import("slate/lib/interfaces/point").Point | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/text").Text, number[]]>;
        unhangRange(this: import("slate/lib/classes/editor").Editor, range: SlateRange): SlateRange;
    };
    onChange: (value: Value, operations: Operation[]) => void;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    role?: string | undefined;
    style?: Record<string, any> | undefined;
    renderAnnotation?: ((props: CustomAnnotationProps) => JSX.Element) | undefined;
    renderDecoration?: ((props: CustomDecorationProps) => JSX.Element) | undefined;
    renderElement?: ((props: CustomElementProps) => JSX.Element) | undefined;
    renderMark?: ((props: CustomMarkProps) => JSX.Element) | undefined;
    value: Value;
}) => JSX.Element;
export default Editor;
//# sourceMappingURL=editor.d.ts.map