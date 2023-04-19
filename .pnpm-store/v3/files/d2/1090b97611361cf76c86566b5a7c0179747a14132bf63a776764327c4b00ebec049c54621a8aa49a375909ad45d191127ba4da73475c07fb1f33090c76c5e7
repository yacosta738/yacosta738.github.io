import { EditorConstructor, Element as SlateElement, Node as SlateNode, Operation as SlateOperation, Point as SlatePoint, Range as SlateRange, Value as SlateValue } from 'slate';
import { Key } from '../utils/key';
/**
 * `ReactEditor` is a Slate editor interface with the React mixin applied.
 */
export declare type ReactEditor = InstanceType<ReturnType<typeof withReact>>;
export declare const withReact: (Editor: EditorConstructor<import("slate/lib/classes/editor").Editor>) => {
    new (...args: any[]): {
        apply(op: SlateOperation): void;
        /**
         * Find a key for a Slate node.
         */
        findKey(node: SlateNode): Key;
        /**
         * Find the path of Slate node.
         */
        findPath(node: SlateNode): number[];
        /**
         * Resolve the decorations for a node.
         */
        getDecorations(node: SlateNode): SlateRange[];
        /**
         * Check if the editor is focused.
         */
        isFocused(): boolean;
        /**
         * Check if the editor is in read-only mode.
         */
        isReadOnly(): boolean;
        /**
         * Blur the editor.
         */
        blur(): void;
        /**
         * Focus the editor.
         */
        focus(): void;
        /**
         * Deselect the editor.
         */
        deselect(): void;
        /**
         * Insert a `DataTransfer` object.
         */
        insertData(dataTransfer: DataTransfer): void;
        /**
         * Transform an `InputEvent` into commands on the editor.
         */
        onBeforeInput(event: Event & {
            data: string | null;
            dataTransfer: DataTransfer | null;
            getTargetRanges(): StaticRange[];
            inputType: string;
            isComposing: boolean;
        }): void;
        /**
         * Transform a `KeyboardEvent` into commands on the editor. This should only
         * be used for hotkeys which attach specific commands to specific key
         * combinations. Most input logic will be handled by the `onBeforeInput`
         * method instead.
         */
        onKeyDown(event: KeyboardEvent): void;
        /**
         * Redo.
         */
        redo(): void;
        /**
         * Undo.
         */
        undo(): void;
        /**
         * Check if a DOM node is within the editor.
         */
        hasDomNode(target: Node, options?: {
            editable?: boolean | undefined;
        }): boolean;
        /**
         * Find the native DOM element from a Slate node.
         */
        toDomNode(node: SlateNode): HTMLElement;
        /**
         * Find a native DOM selection point from a Slate point.
         */
        toDomPoint(point: SlatePoint): [Node, number];
        /**
         * Find a native DOM range from a Slate `range`.
         */
        toDomRange(range: SlateRange): Range;
        /**
         * Find a Slate node from a native DOM `element`.
         */
        toSlateNode(domNode: Node): SlateNode;
        /**
         * Get the target range from a DOM `event`.
         */
        findEventRange(event: any): SlateRange | undefined;
        /**
         * Find a Slate point from a DOM selection's `domNode` and `domOffset`.
         */
        toSlatePoint(domPoint: [Node, number]): SlatePoint;
        /**
         * Find a Slate range from a DOM range or selection.
         */
        toSlateRange(domRange: Selection | StaticRange | Range): SlateRange;
        onChange: (value: SlateValue, operations: SlateOperation[]) => void;
        operations: SlateOperation[];
        value: SlateValue;
        addAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, annotation: SlateRange): void;
        removeAnnotation(this: import("slate/lib/classes/editor").Editor, key: string): void;
        setAnnotation(this: import("slate/lib/classes/editor").Editor, key: string, props: Partial<SlateRange>): void;
        delete(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            distance?: number | undefined;
            unit?: "block" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        insertFragment(this: import("slate/lib/classes/editor").Editor, fragment: import("slate/lib/interfaces/fragment").Fragment, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
        } | undefined): void;
        insertText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
            at?: SlatePoint | SlateRange | undefined;
        } | undefined): void;
        removeText(this: import("slate/lib/classes/editor").Editor, text: string, options?: {
            at?: SlateRange | undefined;
        } | undefined): void;
        insertNodes(this: import("slate/lib/classes/editor").Editor, nodes: SlateValue | SlateElement | import("slate/lib/interfaces/text").Text | SlateNode[], options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
        } | undefined): void;
        liftNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
        }): void;
        mergeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        moveNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
            to: number[];
        }): void;
        normalizeNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at: number[];
        }): void;
        removeNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        setNodes(this: import("slate/lib/classes/editor").Editor, props: Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text>, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        splitNodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
            always?: boolean | undefined;
            height?: number | undefined;
        } | undefined): void;
        unwrapNodes(this: import("slate/lib/classes/editor").Editor, options: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        }): void;
        wrapNodes(this: import("slate/lib/classes/editor").Editor, element: SlateElement, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
            split?: boolean | undefined;
        } | undefined): void;
        addMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        removeMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        setMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], props: Partial<import("slate/lib/interfaces/mark").Mark>, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        toggleMarks(this: import("slate/lib/classes/editor").Editor, marks: import("slate/lib/interfaces/mark").Mark[], options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            hanging?: boolean | undefined;
        } | undefined): void;
        collapse(this: import("slate/lib/classes/editor").Editor, options?: {
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        } | undefined): void;
        move(this: import("slate/lib/classes/editor").Editor, options?: {
            distance?: number | undefined;
            unit?: "offset" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        } | undefined): void;
        select(this: import("slate/lib/classes/editor").Editor, target: import("slate/lib/interfaces/location").Location): void;
        setPoint(this: import("slate/lib/classes/editor").Editor, props: Partial<SlatePoint>, options: {
            edge?: "anchor" | "focus" | "start" | "end" | undefined;
        }): void;
        setSelection(this: import("slate/lib/classes/editor").Editor, props: Partial<SlateRange>): void;
        flush(this: import("slate/lib/classes/editor").Editor): void;
        normalize(this: import("slate/lib/classes/editor").Editor, options?: {
            force?: boolean | undefined;
        } | undefined): void;
        withoutNormalizing(this: import("slate/lib/classes/editor").Editor, fn: () => void): void;
        hasBlocks(this: import("slate/lib/classes/editor").Editor, element: SlateElement): boolean;
        hasInlines(this: import("slate/lib/classes/editor").Editor, element: SlateElement): boolean;
        hasTexts(this: import("slate/lib/classes/editor").Editor, element: SlateElement): boolean;
        isEmpty(this: import("slate/lib/classes/editor").Editor, element: SlateElement): boolean;
        isInline(this: import("slate/lib/classes/editor").Editor, element: SlateElement): boolean;
        isVoid(this: import("slate/lib/classes/editor").Editor, element: SlateElement): boolean;
        createPathRef(this: import("slate/lib/classes/editor").Editor, path: number[], options?: {
            affinity?: "backward" | "forward" | null | undefined;
        } | undefined): import("slate/lib/classes/path-ref").PathRef;
        createPointRef(this: import("slate/lib/classes/editor").Editor, point: SlatePoint, options?: {
            affinity?: "backward" | "forward" | null | undefined;
        } | undefined): import("slate/lib/classes/point-ref").PointRef;
        createRangeRef(this: import("slate/lib/classes/editor").Editor, range: SlateRange, options?: {
            affinity?: "backward" | "forward" | "outward" | "inward" | null | undefined;
        } | undefined): import("slate/lib/classes/range-ref").RangeRef;
        annotations(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
        } | undefined): Iterable<[SlateRange, string]>;
        elements(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[SlateElement, number[]]>;
        getActiveMarks(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            union?: boolean | undefined;
            hanging?: boolean | undefined;
        } | undefined): import("slate/lib/interfaces/mark").Mark[];
        getAfter(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
        } | undefined): SlatePoint | undefined;
        getAncestor(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [import("slate/lib/interfaces/node").Ancestor, number[]];
        getBefore(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            distance?: number | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
        } | undefined): SlatePoint | undefined;
        getEdges(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [SlatePoint, SlatePoint];
        getEnd(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): SlatePoint;
        getFirst(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [SlateNode, number[]];
        getFragment(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): import("slate/lib/interfaces/fragment").Fragment;
        getLast(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): [SlateNode, number[]];
        getLeaf(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [import("slate/lib/interfaces/text").Text, number[]];
        getMatch(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, match: import("slate/lib/classes/utils").Match): [SlateNode, number[]] | undefined;
        getNext(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, match: import("slate/lib/classes/utils").Match): [SlateNode, number[]] | undefined;
        getNode(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [SlateNode, number[]];
        getParent(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): [import("slate/lib/interfaces/node").Ancestor, number[]];
        getPath(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined; /**
             * Check if the editor is in read-only mode.
             */
            edge?: "start" | "end" | undefined;
        } | undefined): number[];
        getPoint(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            edge?: "start" | "end" | undefined;
        } | undefined): SlatePoint;
        getPrevious(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, match: import("slate/lib/classes/utils").Match): [SlateNode, number[]] | undefined;
        getRange(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, to?: number[] | SlatePoint | SlateRange | undefined): SlateRange;
        getStart(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): SlatePoint;
        getText(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location): string;
        hasNode(this: import("slate/lib/classes/editor").Editor, at: import("slate/lib/interfaces/location").Location, options?: {
            depth?: number | undefined;
            edge?: "start" | "end" | undefined;
        } | undefined): boolean;
        isStart(this: import("slate/lib/classes/editor").Editor, point: SlatePoint, at: import("slate/lib/interfaces/location").Location): boolean;
        isEnd(this: import("slate/lib/classes/editor").Editor, point: SlatePoint, at: import("slate/lib/interfaces/location").Location): boolean;
        isEdge(this: import("slate/lib/classes/editor").Editor, point: SlatePoint, at: import("slate/lib/interfaces/location").Location): boolean;
        levels(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[SlateNode, number[]]>;
        marks(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/mark").Mark, number, import("slate/lib/interfaces/text").Text, number[]]>;
        matches(this: import("slate/lib/classes/editor").Editor, options: {
            at?: number[] | SlatePoint | SlateRange | [number[], number[]] | undefined;
            match?: number | number[] | Partial<SlateValue> | Partial<SlateElement> | Partial<import("slate/lib/interfaces/text").Text> | "text" | "value" | "block" | "inline" | "void" | ((entry: [SlateNode, number[]]) => boolean) | undefined;
            reverse?: boolean | undefined;
        }): Iterable<[SlateNode, number[]]>;
        nodes(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[SlateNode, number[]]>;
        positions(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | undefined;
            unit?: "offset" | "block" | "character" | "word" | "line" | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<SlatePoint>;
        texts(this: import("slate/lib/classes/editor").Editor, options?: {
            at?: number[] | SlatePoint | SlateRange | [number[], number[]] | undefined;
            reverse?: boolean | undefined;
        } | undefined): Iterable<[import("slate/lib/interfaces/text").Text, number[]]>;
        unhangRange(this: import("slate/lib/classes/editor").Editor, range: SlateRange): SlateRange;
    };
};
//# sourceMappingURL=index.d.ts.map