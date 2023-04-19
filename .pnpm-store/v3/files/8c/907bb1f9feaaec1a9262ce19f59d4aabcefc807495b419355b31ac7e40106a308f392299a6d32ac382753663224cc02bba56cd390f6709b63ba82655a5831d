import { Path, Point, Range } from '..';
/**
 * The `Location` interface is a union of the ways to refer to a specific
 * location in a Slate document: paths, points or ranges.
 *
 * Methods will often accept a `Location` instead of requiring only a `Path`,
 * `Point` or `Range`. This eliminates the need for developers to manage
 * converting between the different interfaces in their own code base.
 */
declare type Location = Path | Point | Range;
declare namespace Location {
    /**
     * Check if a value implements the `Location` interface.
     */
    const isLocation: (value: any) => value is Location;
}
declare type Span = [Path, Path];
declare namespace Span {
    /**
     * Check if a value implements the `Span` interface.
     */
    const isSpan: (value: any) => value is [number[], number[]];
}
export { Location, Span };
//# sourceMappingURL=location.d.ts.map