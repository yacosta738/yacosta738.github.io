declare type IterableItem<T> = T extends Iterable<infer R> ? R : never;
/**
 * Process items from `iterable` in batches and yield the result of each call to
 * `iteratorFn`
 */
declare function doWorkAndYield<TIn, TOut, TIterable extends Iterable<TIn>>(
/**
 * The size of the batch of work, or, how many times `iteratorFn` will be
 * called in parallel.
 */
concurrentCount: number, 
/**
 * An iterable that contains the items that should be passed to `iteratorFn`.
 */
iterable: TIterable, 
/**
 * The async callback function that does the work. Will be passed items from
 * `iterable`.
 */
iteratorFn: (item: IterableItem<TIterable>, Iterable: TIterable) => Promise<TOut>): AsyncGenerator<Awaited<TOut>, void, unknown>;

/**
 * Process items from `iterable` in batches.
 */
declare function doWork<TIn, TOut, TIterable extends Iterable<TIn>>(...args: Parameters<typeof doWorkAndYield<TIn, TOut, TIterable>>): Promise<void>;

export { doWork, doWorkAndYield };
