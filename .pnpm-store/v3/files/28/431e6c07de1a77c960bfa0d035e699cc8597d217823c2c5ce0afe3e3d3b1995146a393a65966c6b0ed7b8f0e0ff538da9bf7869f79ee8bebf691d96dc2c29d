import { Operation, Path, Editor } from '..';
/**
 * `PathRef` objects keep a specific path in a document synced over time as new
 * operations are applied to the editor. You can access their `current` property
 * at any time for the up-to-date path value.
 */
declare class PathRef {
    current: Path | null;
    private affinity;
    private editor;
    constructor(props: {
        path: Path | null;
        affinity: 'forward' | 'backward' | null;
        editor: Editor;
    });
    /**
     * Transform the path ref's current value by an operation.
     */
    transform(op: Operation): void;
    /**
     * Unreference the ref, allowing the editor to stop updating its value.
     */
    unref(): Path | null;
}
export { PathRef };
//# sourceMappingURL=path-ref.d.ts.map