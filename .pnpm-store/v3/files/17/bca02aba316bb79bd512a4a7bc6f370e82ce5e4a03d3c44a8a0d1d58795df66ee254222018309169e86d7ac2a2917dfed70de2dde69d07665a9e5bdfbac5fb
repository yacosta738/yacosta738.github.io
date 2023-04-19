import { Editor, Path, Point, PointRef } from '../..';
declare class PointQueries {
    /**
     * Create a mutable ref for a `Point` object, which will stay in sync as new
     * operations are applied to the this.
     */
    createPointRef(this: Editor, point: Point, options?: {
        stick?: 'backward' | 'forward' | null;
    }): PointRef;
    /**
     * Check if a point is at the start of a path.
     */
    isAtStartOfPath(this: Editor, point: Point, path: Path): boolean;
    /**
     * Check if a point is at the end of a path.
     */
    isAtEndOfPath(this: Editor, point: Point, path: Path): boolean;
    /**
     * Check if a point is at either edge of a path.
     */
    isAtEdgeOfPath(this: Editor, point: Point, path: Path): boolean;
    /**
     * Calculate the next point forward in the document from a starting point.
     */
    getNextPoint(this: Editor, point: Point, options?: {
        distance?: number;
        unit?: 'offset' | 'character' | 'word' | 'line';
        allowZeroWidth?: boolean;
    }): Point | undefined;
    /**
     * Get the next point in the document that is not inside a void node.
     */
    getNextNonVoidPoint(this: Editor, point: Point): Point | undefined;
    /**
     * Calculate the previous point backward from a starting point.
     */
    getPreviousPoint(this: Editor, point: Point, options?: {
        distance?: number;
        unit?: 'offset' | 'character' | 'word' | 'line';
        allowZeroWidth?: boolean;
    }): Point | undefined;
    /**
     * Get the previous point in the document that is not inside a void node.
     */
    getPreviousNonVoidPoint(this: Editor, point: Point): Point | undefined;
}
export default PointQueries;
//# sourceMappingURL=point.d.ts.map