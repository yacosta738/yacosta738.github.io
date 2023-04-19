import { Operation, Point } from '..';
/**
 * `Range` objects are a set of points that refer to a specific span of a Slate
 * document. They can define a span inside a single node or a can span across
 * multiple nodes.
 */
interface Range {
    anchor: Point;
    focus: Point;
    [key: string]: any;
}
declare namespace Range {
    const start: (range: Range) => Point;
    const end: (range: Range) => Point;
    const intersection: (range: Range, another: Range) => Range | null;
    /**
     * Check if a range is exactly equal to another.
     */
    const equals: (range: Range, another: Range) => boolean;
    /**
     * Check if a range includes a path, a point or part of another range.
     */
    const includes: (range: Range, target: Range | Point | number[]) => boolean;
    /**
     * Check if a range is backward, meaning that its anchor point appears in the
     * document _after_ its focus point.
     */
    const isBackward: (range: Range) => boolean;
    /**
     * Check if a range is collapsed, meaning that both its anchor and focus
     * points refer to the exact same position in the document.
     */
    const isCollapsed: (range: Range) => boolean;
    /**
     * Check if a range is expanded.
     *
     * This is the opposite of [[Range.isCollapsed]] and is provided for legibility.
     */
    const isExpanded: (range: Range) => boolean;
    /**
     * Check if a range is forward.
     *
     * This is the opposite of [[Range.isBackward]] and is provided for legibility.
     */
    const isForward: (range: Range) => boolean;
    /**
     * Check if a value implements the [[Range]] interface.
     */
    const isRange: (value: any) => value is Range;
    /**
     * Get the start and end points of a range, in the order in which they appear
     * in the document.
     */
    const edges: (range: Range, options?: {
        reverse?: boolean | undefined;
    }) => [Point, Point];
    /**
     * Transform a range by an operation.
     */
    const transform: (range: Range, op: Operation, options: {
        affinity: "forward" | "backward" | "outward" | "inward" | null;
    }) => Range | null;
}
export { Range };
//# sourceMappingURL=range.d.ts.map