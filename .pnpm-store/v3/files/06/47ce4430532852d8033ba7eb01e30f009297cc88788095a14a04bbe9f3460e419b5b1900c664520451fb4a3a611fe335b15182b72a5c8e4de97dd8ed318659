import { AncestorEntry, AnnotationEntry, Editor, ElementEntry, Location, Mark, MarkEntry, NodeEntry, Path, Point, Range, Fragment, Span, TextEntry } from '../..';
import { Match } from '../utils';
declare class LocationQueries {
    /**
     * Iterate through all of the annotations in the editor.
     */
    annotations(this: Editor, options?: {
        at?: Location;
    }): Iterable<AnnotationEntry>;
    /**
     * Iterate through all of the elements in the editor.
     */
    elements(this: Editor, options?: {
        at?: Location | Span;
        reverse?: boolean;
    }): Iterable<ElementEntry>;
    /**
     * Get the marks that are "active" at a location. These are the
     * marks that will be added to any text that is inserted.
     *
     * The `union: true` option can be passed to create a union of marks across
     * the text nodes in the selection, instead of creating an intersection, which
     * is the default.
     *
     * Note: to obey common rich text behavior, if the selection is collapsed at
     * the start of a text node and there are previous text nodes in the same
     * block, it will carry those marks forward from the previous text node. This
     * allows for continuation of marks from previous words.
     */
    getActiveMarks(this: Editor, options?: {
        at?: Location;
        union?: boolean;
        hanging?: boolean;
    }): Mark[];
    /**
     * Get the point after a location.
     */
    getAfter(this: Editor, at: Location, options?: {
        distance?: number;
        unit?: 'offset' | 'character' | 'word' | 'line' | 'block';
    }): Point | undefined;
    /**
     * Get the common ancestor node of a location.
     */
    getAncestor(this: Editor, at: Location, options?: {
        depth?: number;
        edge?: 'start' | 'end';
    }): AncestorEntry;
    /**
     * Get the point before a location.
     */
    getBefore(this: Editor, at: Location, options?: {
        distance?: number;
        unit?: 'offset' | 'character' | 'word' | 'line' | 'block';
    }): Point | undefined;
    /**
     * Get the start and end points of a location.
     */
    getEdges(this: Editor, at: Location): [Point, Point];
    /**
     * Get the end point of a location.
     */
    getEnd(this: Editor, at: Location): Point;
    /**
     * Get the first node at a location.
     */
    getFirst(this: Editor, at: Location): NodeEntry;
    /**
     * Get the fragment at a location.
     */
    getFragment(this: Editor, at: Location): Fragment;
    /**
     * Get the last node at a location.
     */
    getLast(this: Editor, at: Location): NodeEntry;
    /**
     * Get the leaf text node at a location.
     */
    getLeaf(this: Editor, at: Location, options?: {
        depth?: number;
        edge?: 'start' | 'end';
    }): TextEntry;
    /**
     * Get the first matching node in a single branch of the document.
     */
    getMatch(this: Editor, at: Location, match: Match): NodeEntry | undefined;
    /**
     * Get the matching node in the branch of the document after a location.
     */
    getNext(this: Editor, at: Location, match: Match): NodeEntry | undefined;
    /**
     * Get the node at a location.
     */
    getNode(this: Editor, at: Location, options?: {
        depth?: number;
        edge?: 'start' | 'end';
    }): NodeEntry;
    /**
     * Get the parent node of a location.
     */
    getParent(this: Editor, at: Location, options?: {
        depth?: number;
        edge?: 'start' | 'end';
    }): AncestorEntry;
    /**
     * Get the path of a location.
     */
    getPath(this: Editor, at: Location, options?: {
        depth?: number;
        edge?: 'start' | 'end';
    }): Path;
    /**
     * Get the start or end point of a location.
     */
    getPoint(this: Editor, at: Location, options?: {
        edge?: 'start' | 'end';
    }): Point;
    /**
     * Get the matching node in the branch of the document before a location.
     */
    getPrevious(this: Editor, at: Location, match: Match): NodeEntry | undefined;
    /**
     * Get a range of a location.
     */
    getRange(this: Editor, at: Location, to?: Location): Range;
    /**
     * Get the start point of a location.
     */
    getStart(this: Editor, at: Location): Point;
    /**
     * Get the text content of a location.
     *
     * Note: the text of void nodes is presumed to be an empty string, regardless
     * of what their actual content is.
     */
    getText(this: Editor, at: Location): string;
    /**
     * Check if there is a node at a location.
     */
    hasNode(this: Editor, at: Location, options?: {
        depth?: number;
        edge?: 'start' | 'end';
    }): boolean;
    /**
     * Check if a point the start point of a location.
     */
    isStart(this: Editor, point: Point, at: Location): boolean;
    /**
     * Check if a point is the end point of a location.
     */
    isEnd(this: Editor, point: Point, at: Location): boolean;
    /**
     * Check if a point is an edge of a location.
     */
    isEdge(this: Editor, point: Point, at: Location): boolean;
    /**
     * Iterate through all of the levels at a location.
     */
    levels(this: Editor, options?: {
        at?: Location;
        reverse?: boolean;
    }): Iterable<NodeEntry>;
    /**
     * Iterate through all of the text nodes in the editor.
     */
    marks(this: Editor, options?: {
        at?: Location | Span;
        reverse?: boolean;
    }): Iterable<MarkEntry>;
    /**
     * Iterate through all of the nodes that match.
     */
    matches(this: Editor, options: {
        at?: Location | Span;
        match?: Match;
        reverse?: boolean;
    }): Iterable<NodeEntry>;
    /**
     * Iterate through all of the nodes in the editor.
     */
    nodes(this: Editor, options?: {
        at?: Location | Span;
        reverse?: boolean;
    }): Iterable<NodeEntry>;
    /**
     * Iterate through all of the positions in the document where a `Point` can be
     * placed.
     *
     * By default it will move forward by individual offsets at a time,  but you
     * can pass the `unit: 'character'` option to moved forward one character, word,
     * or line at at time.
     *
     * Note: void nodes are treated as a single point, and iteration will not
     * happen inside their content.
     */
    positions(this: Editor, options?: {
        at?: Location;
        unit?: 'offset' | 'character' | 'word' | 'line' | 'block';
        reverse?: boolean;
    }): Iterable<Point>;
    /**
     * Iterate through all of the text nodes in the editor.
     */
    texts(this: Editor, options?: {
        at?: Location | Span;
        reverse?: boolean;
    }): Iterable<TextEntry>;
}
export default LocationQueries;
//# sourceMappingURL=location.d.ts.map