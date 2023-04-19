import { Mark, Node, Path, Range, Value } from '..';
declare type AddAnnotationOperation = {
    type: 'add_annotation';
    key: string;
    annotation: Range;
    [key: string]: any;
};
declare type AddMarkOperation = {
    type: 'add_mark';
    path: Path;
    mark: Mark;
    [key: string]: any;
};
declare type InsertNodeOperation = {
    type: 'insert_node';
    path: Path;
    node: Node;
    [key: string]: any;
};
declare type InsertTextOperation = {
    type: 'insert_text';
    path: Path;
    offset: number;
    text: string;
    [key: string]: any;
};
declare type MergeNodeOperation = {
    type: 'merge_node';
    path: Path;
    position: number;
    target: number | null;
    properties: Partial<Node>;
    [key: string]: any;
};
declare type MoveNodeOperation = {
    type: 'move_node';
    path: Path;
    newPath: Path;
    [key: string]: any;
};
declare type RemoveAnnotationOperation = {
    type: 'remove_annotation';
    key: string;
    annotation: Range;
    [key: string]: any;
};
declare type RemoveMarkOperation = {
    type: 'remove_mark';
    path: Path;
    mark: Mark;
    [key: string]: any;
};
declare type RemoveNodeOperation = {
    type: 'remove_node';
    path: Path;
    node: Node;
    [key: string]: any;
};
declare type RemoveTextOperation = {
    type: 'remove_text';
    path: Path;
    offset: number;
    text: string;
    [key: string]: any;
};
declare type SetAnnotationOperation = {
    type: 'set_annotation';
    key: string;
    properties: Partial<Range>;
    newProperties: Partial<Range>;
    [key: string]: any;
};
declare type SetMarkOperation = {
    type: 'set_mark';
    path: Path;
    properties: Partial<Mark>;
    newProperties: Partial<Mark>;
    [key: string]: any;
};
declare type SetNodeOperation = {
    type: 'set_node';
    path: Path;
    properties: Partial<Node>;
    newProperties: Partial<Node>;
    [key: string]: any;
};
declare type SetSelectionOperation = {
    type: 'set_selection';
    [key: string]: any;
    properties: null;
    newProperties: Range;
} | {
    type: 'set_selection';
    [key: string]: any;
    properties: Partial<Range>;
    newProperties: Partial<Range>;
} | {
    type: 'set_selection';
    [key: string]: any;
    properties: Range;
    newProperties: null;
};
declare type SetValueOperation = {
    type: 'set_value';
    properties: Partial<Value>;
    newProperties: Partial<Value>;
    [key: string]: any;
};
declare type SplitNodeOperation = {
    type: 'split_node';
    path: Path;
    position: number;
    target: number | null;
    properties: Partial<Node>;
    [key: string]: any;
};
/**
 * `Operation` objects define the low-level instructions that Slate editors use
 * to apply changes to their internal state. Representing all changes as
 * operations is what allows Slate editors to easily implement history,
 * collaboration, and other features.
 */
declare type Operation = AnnotationOperation | NodeOperation | MarkOperation | SelectionOperation | TextOperation | ValueOperation;
declare type AnnotationOperation = AddAnnotationOperation | RemoveAnnotationOperation | SetAnnotationOperation;
declare type NodeOperation = InsertNodeOperation | MergeNodeOperation | MoveNodeOperation | RemoveNodeOperation | SetNodeOperation | SplitNodeOperation;
declare type MarkOperation = AddMarkOperation | RemoveMarkOperation | SetMarkOperation;
declare type SelectionOperation = SetSelectionOperation;
declare type TextOperation = InsertTextOperation | RemoveTextOperation;
declare type ValueOperation = SetValueOperation;
declare namespace Operation {
    /**
     * Check of a value is an `AnnotationOperation` object.
     */
    const isAnnotationOperation: (value: any) => value is AnnotationOperation;
    /**
     * Check of a value is a `NodeOperation` object.
     */
    const isNodeOperation: (value: any) => value is NodeOperation;
    /**
     * Check of a value is a `MarkOperation` object.
     */
    const isMarkOperation: (value: any) => value is MarkOperation;
    /**
     * Check of a value is an `Operation` object.
     */
    const isOperation: (value: any) => value is Operation;
    /**
     * Check if a value is a list of `Operation` objects.
     */
    const isOperationList: (value: any) => value is Operation[];
    /**
     * Check of a value is a `SelectionOperation` object.
     */
    const isSelectionOperation: (value: any) => value is SetSelectionOperation;
    /**
     * Check of a value is a `TextOperation` object.
     */
    const isTextOperation: (value: any) => value is TextOperation;
    /**
     * Check of a value is a `ValueOperation` object.
     */
    const isValueOperation: (value: any) => value is SetValueOperation;
    /**
     * Invert an operation, returning a new operation that will exactly undo the
     * original when applied.
     */
    const inverse: (op: Operation) => Operation;
}
export { AddMarkOperation, AddAnnotationOperation, InsertNodeOperation, InsertTextOperation, MergeNodeOperation, MoveNodeOperation, RemoveAnnotationOperation, RemoveMarkOperation, RemoveNodeOperation, RemoveTextOperation, SetAnnotationOperation, SetMarkOperation, SetNodeOperation, SetSelectionOperation, SetValueOperation, SplitNodeOperation, Operation, };
//# sourceMappingURL=operation.d.ts.map