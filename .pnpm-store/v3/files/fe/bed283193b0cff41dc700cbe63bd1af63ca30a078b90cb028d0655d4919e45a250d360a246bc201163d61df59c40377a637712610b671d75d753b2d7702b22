import { Editor, Node, Path, PathRef, PointRef, RangeRef, NodeEntry } from '..';
/**
 * `Match` is a shorthand for a `NodeEntry` predicate for handling the most
 * common needs for rich text editing.
 */
export declare type Match = number | 'value' | 'block' | 'inline' | 'text' | 'void' | Partial<Node> | Path | ((entry: NodeEntry) => boolean);
/**
 * Weak maps to keep track of instance-level editor state.
 */
export declare const DIRTY_PATHS: WeakMap<Editor, Path[]>;
export declare const NORMALIZING: WeakMap<Editor, boolean>;
export declare const FLUSHING: WeakMap<Editor, boolean>;
export declare const PATH_REFS: WeakMap<Editor, Set<PathRef>>;
export declare const POINT_REFS: WeakMap<Editor, Set<PointRef>>;
export declare const RANGE_REFS: WeakMap<Editor, Set<RangeRef>>;
/**
 * Check if a character is a word character. The `remaining` argument is used
 * because sometimes you must read subsequent characters to truly determine it.
 */
export declare const isWordCharacter: (char: string, remaining: string) => boolean;
/**
 * Get the distance to the end of the first character in a string of text.
 */
export declare const getCharacterDistance: (text: string) => number;
/**
 * Get the distance to the end of the first word in a string of text.
 */
export declare const getWordDistance: (text: string) => number;
//# sourceMappingURL=utils.d.ts.map