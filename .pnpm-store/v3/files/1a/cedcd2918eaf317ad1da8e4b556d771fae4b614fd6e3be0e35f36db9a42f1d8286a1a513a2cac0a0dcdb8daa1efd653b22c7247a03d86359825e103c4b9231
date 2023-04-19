import { Range, Mark } from 'slate';
/**
 * The `Leaf` interface represents the individual leaves inside a text node,
 * once annotations and decorations have been applied.
 */
interface Leaf {
    annotations: Record<string, Range>;
    decorations: Range[];
    marks: Mark[];
    text: string;
}
declare namespace Leaf {
    /**
     * Check if two leaves are equal.
     */
    const equals: (leaf: Leaf, another: Leaf) => boolean;
    /**
     * Check if a value is a `Leaf` object.
     */
    const isLeaf: (value: any) => value is Leaf;
    /**
     * Split a leaf into two at an offset.
     */
    const split: (leaf: Leaf, offset: number) => [Leaf, Leaf];
}
/**
 * Check if a list of ranges is equal to another.
 *
 * PERF: this requires the two lists to also have the ranges inside them in the
 * same order, but this is an okay constraint for us since decorations are
 * kept in order, and the odd case where they aren't is okay to re-render for.
 */
declare const isRangeListEqual: (list: Range[], another: Range[]) => boolean;
/**
 * Check if a map of ranges is equal to another.
 */
declare const isRangeMapEqual: (map: Record<string, Range>, another: Record<string, Range>) => boolean;
export { Leaf, isRangeListEqual, isRangeMapEqual };
//# sourceMappingURL=leaf.d.ts.map