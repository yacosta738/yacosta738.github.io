import { Value, Operation } from '..';
/**
 * `Change` objects are emited when a Slate editor is flushed. They contain the
 * latest `Value` and the list of `Operation` objects that have been applied
 * since the previous change.
 */
interface Change {
    value: Value;
    operations: Operation[];
    [key: string]: any;
}
declare namespace Change {
    /**
     * Check if a value implements the `Change` interface.
     */
    const isChange: (value: any) => value is Change;
}
export { Change };
//# sourceMappingURL=change.d.ts.map