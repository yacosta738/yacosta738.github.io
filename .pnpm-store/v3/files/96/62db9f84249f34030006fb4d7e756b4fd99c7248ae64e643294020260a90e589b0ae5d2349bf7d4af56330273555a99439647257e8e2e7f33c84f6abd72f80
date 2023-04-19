import { Mark, Point, PointKey, Range } from '..';
/**
 * `Annotation` objects are a type of formatting that are applied at the
 * top-level of a Slate value. They implement both the `Mark` and `Range`
 * interfaces, such that a single annotation can describe formatting that spans
 * across multiple nodes in the document.
 */
interface Annotation extends Mark, Range {
}
/**
 * `AnnotationEntry` objects are returned when iterating over `Annotation`
 * objects in the top-level value.
 */
declare type AnnotationEntry = [Annotation, string];
/**
 * `AnnotationPointEntry` objects are returned when iterating over `Point`
 * objects that belong to an `Annotation`.
 */
declare type AnnotationPointEntry = [Point, PointKey, Annotation, string];
declare namespace Annotation {
    /**
     * Check if a value implements the `Annotation` interface.
     */
    const isAnnotation: (value: any) => value is Annotation;
    /**
     * Check if a value is a map of `Annotation` objects.
     */
    const isAnnotationMap: (value: any) => value is Record<string, Annotation>;
}
export { Annotation, AnnotationEntry, AnnotationPointEntry };
//# sourceMappingURL=annotation.d.ts.map