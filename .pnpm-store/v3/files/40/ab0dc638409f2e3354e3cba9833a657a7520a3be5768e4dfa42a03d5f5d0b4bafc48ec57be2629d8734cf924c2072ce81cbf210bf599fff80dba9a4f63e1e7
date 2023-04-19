import { Mark, Point, Range } from '..';
/**
 * `Selection` objects represent the range in a document that a user has
 * selected with their cursor. They implement the `Range` interface, with an
 * extra property denoting whether the editor is currently focused or not.
 */
interface Selection extends Range {
    isFocused: boolean;
    marks: Mark[] | null;
    [key: string]: any;
}
/**
 * `SelectionPointEntry` objects are returned when iterating over `Point`
 * objects that belong to an `Selection`.
 */
declare type SelectionPointEntry = [Point, Selection];
declare namespace Selection {
    /**
     * Check if a value implements the `Selection` interface.
     */
    const isSelection: (value: any) => value is Selection;
}
export { Selection, SelectionPointEntry };
//# sourceMappingURL=selection.d.ts.map