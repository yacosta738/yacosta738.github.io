import { Operation } from '../..';
/**
 * `HistoryBatch` arrays hold a batch of operations that are applied as a single
 * step in the history. They can be merged together with previous batches.
 */
declare type HistoryBatch = Operation[];
/**
 * `History` objects hold all of the operations that are applied to a value, so
 * they can be undone or redone as necessary.
 */
interface History {
    redos: HistoryBatch[];
    undos: HistoryBatch[];
}
declare namespace History {
    /**
     * Check if an object implements the `History` interface.
     */
    const isHistory: (object: any) => object is History;
    /**
     * Check if an object implements the `HistoryBatch` interface.
     */
    const isHistoryBatch: (object: any) => object is Operation[];
}
export { History, HistoryBatch };
//# sourceMappingURL=history.d.ts.map