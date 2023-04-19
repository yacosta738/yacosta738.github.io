import { Mark, Point, Range } from '..';
/**
 * `Annotation` objects are a type of formatting that are applied at the
 * top-level of a Slate value. They implement both the `Mark` and `Range`
 * interfaces, such that a single annotation can describe formatting that spans
 * across multiple nodes in the document.
 */
interface Annotation extends Mark, Range {
}
/**
 * `AnnotationPointEntry` objects are returned when iterating over `Point`
 * objects that belong to an `Annotation`.
 */
declare type AnnotationPointEntry = [Point, Annotation, string];
declare namespace Annotation {
    /**
     * Check if a value implements the `Annotation` interface.
     */
    const isAnnotation: (value: any) => value is Annotation;
    /**
     * Check if a value is a map of `Annotation` objects.
     */
    const isAnnotationRecord: (value: any) => value is Record<string, Annotation>;
}
export { Annotation, AnnotationPointEntry };
//# sourceMappingURL=annotation.d.ts.map