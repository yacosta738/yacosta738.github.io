import { Element, Operation, Path, Point, PointKey, Range } from '..';
/**
 * `Value` objects hold all of the state in a Slate editor, including all of the
 * nodes in the document and the user's currently selected range of text.
 */
interface Value extends Element {
    selection: Range | null;
    annotations: Record<string, Range>;
    [key: string]: any;
}
/**
 * `ValueEntry` objects refer to an `Value` and the `Path` where it can be
 * found inside a root node.
 */
declare type ValueEntry = [Value, Path];
/**
 * `AnnotationEntry` objects are returned when iterating over annotations
 * in the top-level value.
 */
declare type AnnotationEntry = [Range, string];
/**
 * `AnnotationPointEntry` objects are returned when iterating over `Point`
 * objects that belong to an annotation.
 */
declare type AnnotationPointEntry = [Point, PointKey, Range, string];
/**
 * `SelectionPointEntry` objects are returned when iterating over `Point`
 * objects that belong to a selection.
 */
declare type SelectionPointEntry = [Point, PointKey, Range];
declare namespace Value {
    /**
     * Check if a value implements the `Value` interface.
     */
    const isValue: (value: any) => value is Value;
    /**
     * Check if a value matches a set of properties.
     *
     * Note: the is for checking custom properties, and it does not ensure that
     * any children in the `nodes` property are equal.
     */
    const matches: (value: Value, props: Partial<Value>) => boolean;
    /**
     * Iterate through all of the point objects in a value.
     */
    function points(value: Value): Iterable<SelectionPointEntry | AnnotationPointEntry>;
    /**
     * Transform a value by an operation.
     */
    const transform: (value: Value, op: Operation) => Value;
}
export { Value, ValueEntry, AnnotationEntry, AnnotationPointEntry, SelectionPointEntry, };
//# sourceMappingURL=value.d.ts.map