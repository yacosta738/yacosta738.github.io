import { Operation } from '..';
/**
 * `Path` arrays are a list of indexes that describe a node's exact position in
 * a Slate node tree. Although they are usually relative to the root `Value`
 * object, they can be relative to any `Node` object.
 */
declare type Path = number[];
declare namespace Path {
    /**
     * Get a list of ancestor paths for a given path.
     *
     * The paths are sorted from deepest to shallowest ancestor. However, if the
     * `reverse: true` option is passed, they are reversed.
     */
    const ancestors: (path: number[], options?: {
        reverse?: boolean | undefined;
    }) => number[][];
    /**
     * Get the common ancestor path of two paths.
     */
    const common: (path: number[], another: number[]) => number[];
    /**
     * Compare a path to another, returning an integer indicating whether the path
     * was before, at, or after the other.
     *
     * Note: Two paths of unequal length can still receive a `0` result if one is
     * directly above or below the other. If you want exact matching, use
     * [[Path.equals]] instead.
     */
    const compare: (path: number[], another: number[]) => 0 | 1 | -1;
    /**
     * Check if a path ends after one of the indexes in another.
     */
    const endsAfter: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path ends at one of the indexes in another.
     */
    const endsAt: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path ends before one of the indexes in another.
     */
    const endsBefore: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path is exactly equal to another.
     */
    const equals: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path is after another.
     */
    const isAfter: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path is an ancestor of another.
     */
    const isAncestor: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path is before another.
     */
    const isBefore: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path is a child of another.
     */
    const isChild: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path is equal to or an ancestor of another.
     */
    const isCommon: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path is a descendant of another.
     */
    const isDescendant: (path: number[], another: number[]) => boolean;
    /**
     * Check if a path is the parent of another.
     */
    const isParent: (path: number[], another: number[]) => boolean;
    /**
     * Check is a value implements the `Path` interface.
     */
    const isPath: (value: any) => value is number[];
    /**
     * Check if a path is a sibling of another.
     */
    const isSibling: (path: number[], another: number[]) => boolean;
    /**
     * Get a list of paths at every level down to a path. Note: this is the same
     * as `Path.ancestors`, but including the path itself.
     *
     * The paths are sorted from deepest to shallowest. However, if the
     * `reverse: true` option is passed, they are reversed.
     */
    const levels: (path: number[], options?: {
        reverse?: boolean | undefined;
    }) => number[][];
    /**
     * Given a path, get the path to the next sibling node.
     */
    const next: (path: number[]) => number[];
    /**
     * Given a path, return a new path referring to the parent node above it.
     */
    const parent: (path: number[]) => number[];
    /**
     * Given a path, get the path to the previous sibling node.
     */
    const previous: (path: number[]) => number[];
    /**
     * Get a path relative to an ancestor.
     */
    const relative: (path: number[], ancestor: number[]) => number[];
    /**
     * Transform a path by an operation.
     */
    const transform: (path: number[], operation: Operation, options?: {
        affinity?: "forward" | "backward" | null | undefined;
    }) => number[] | null;
}
export { Path };
//# sourceMappingURL=path.d.ts.map