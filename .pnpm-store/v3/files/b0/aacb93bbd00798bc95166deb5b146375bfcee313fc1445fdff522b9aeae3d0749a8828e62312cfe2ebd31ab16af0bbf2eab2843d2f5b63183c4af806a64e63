import { Operation, Range, Editor } from '..';
/**
 * `RangeRef` objects keep a specific range in a document synced over time as new
 * operations are applied to the editor. You can access their `current` property
 * at any time for the up-to-date range value.
 */
declare class RangeRef {
    current: Range | null;
    private affinity;
    private editor;
    constructor(props: {
        range: Range | null;
        affinity: 'forward' | 'backward' | 'outward' | 'inward' | null;
        editor: Editor;
    });
    /**
     * Transform the range ref's current value by an operation.
     */
    transform(op: Operation): void;
    /**
     * Unreference the ref, allowing the editor to stop updating its value.
     */
    unref(): Range | null;
}
export { RangeRef };
//# sourceMappingURL=range-ref.d.ts.map