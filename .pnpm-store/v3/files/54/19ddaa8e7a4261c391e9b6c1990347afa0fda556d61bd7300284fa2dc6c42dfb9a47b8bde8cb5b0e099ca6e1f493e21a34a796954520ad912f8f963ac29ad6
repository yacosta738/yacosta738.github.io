import { Editor, Location, Point, Range } from '../..';
declare class SelectionCommands {
    /**
     * Collapse the selection.
     */
    collapse(this: Editor, options?: {
        edge?: 'anchor' | 'focus' | 'start' | 'end';
    }): void;
    /**
     * Unset the selection.
     */
    deselect(this: Editor): void;
    /**
     * Move the selection's point forward or backward.
     */
    move(this: Editor, options?: {
        distance?: number;
        unit?: 'offset' | 'character' | 'word' | 'line';
        reverse?: boolean;
        edge?: 'anchor' | 'focus' | 'start' | 'end';
    }): void;
    /**
     * Set the selection to a new value.
     */
    select(this: Editor, target: Location): void;
    /**
     * Set new properties on one of the selection's points.
     */
    setPoint(this: Editor, props: Partial<Point>, options: {
        edge?: 'anchor' | 'focus' | 'start' | 'end';
    }): void;
    /**
     * Set new properties on the selection.
     */
    setSelection(this: Editor, props: Partial<Range>): void;
}
export default SelectionCommands;
//# sourceMappingURL=selection.d.ts.map