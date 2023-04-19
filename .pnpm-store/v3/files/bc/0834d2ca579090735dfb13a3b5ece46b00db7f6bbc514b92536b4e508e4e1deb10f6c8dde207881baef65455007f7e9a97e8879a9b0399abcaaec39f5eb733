import { Operation, Path } from '..';
/**
 * `Point` objects refer to a specific location in a text node in a Slate
 * document. Its path refers to the location of the node in the tree, and its
 * offset refers to the distance into the node's string of text. Points can
 * only refer to `Text` nodes.
 */
interface Point {
    path: Path;
    offset: number;
    [key: string]: any;
}
/**
 * `PointKey` is either an "anchor" or "focus" point string.
 */
declare type PointKey = 'anchor' | 'focus';
declare namespace Point {
    /**
     * Compare a point to another, returning an integer indicating whether the
     * point was before, at, or after the other.
     */
    const compare: (point: Point, another: Point) => 0 | 1 | -1;
    /**
     * Check if a point is after another.
     */
    const isAfter: (point: Point, another: Point) => boolean;
    /**
     * Check if a point is before another.
     */
    const isBefore: (point: Point, another: Point) => boolean;
    /**
     * Check if a point is exactly equal to another.
     */
    const equals: (point: Point, another: Point) => boolean;
    /**
     * Check if a value implements the `Point` interface.
     */
    const isPoint: (value: any) => value is Point;
    /**
     * Transform a point by an operation.
     */
    const transform: (point: Point, op: Operation, options?: {
        affinity?: "forward" | "backward" | null | undefined;
    }) => Point | null;
}
export { Point, PointKey };
//# sourceMappingURL=point.d.ts.map