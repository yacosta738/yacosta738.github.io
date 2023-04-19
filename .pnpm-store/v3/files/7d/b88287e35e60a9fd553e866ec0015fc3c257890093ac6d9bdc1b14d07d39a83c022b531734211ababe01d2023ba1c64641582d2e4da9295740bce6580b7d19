import { Change, Path, PathRef, PointRef, RangeRef, Operation, Value } from '..';
import { DIRTY_PATHS, NORMALIZING, FLUSHING, PATH_REFS, POINT_REFS, RANGE_REFS } from '../symbols';
import AnnotationCommands from './commands/annotation';
import TextCommands from './commands/text';
import NodeCommands from './commands/node';
import MarkCommands from './commands/mark';
import SelectionCommands from './commands/selection';
import GeneralCommands from './commands/general';
import ElementQueries from './queries/element';
import GeneralQueries from './queries/general';
import LocationQueries from './queries/location';
import RangeQueries from './queries/range';
/**
 * The `EditorConstructor` interface is provided as a convenience for plugins
 * who can use it when writing the typings for extending the `Editor` class.
 */
declare type EditorConstructor = new (...args: any[]) => Editor;
/**
 * The `EditorPlugin` interface is provided as a convenience for plugins
 * who can use it when writing the typings for their plugin functions.
 */
declare type EditorPlugin = (...args: any) => ((Editor: EditorConstructor) => EditorConstructor);
/**
 * The `Editor` class stores all the state of a Slate editor. It is extended by
 * plugins that wish to add their own methods that implement new behaviors.
 */
declare class Editor {
    onChange: (change: Change) => void;
    operations: Operation[];
    readOnly: boolean;
    value: Value;
    [DIRTY_PATHS]: Path[];
    [FLUSHING]: boolean;
    [NORMALIZING]: boolean;
    [PATH_REFS]: {
        [key: number]: PathRef;
    };
    [POINT_REFS]: {
        [key: number]: PointRef;
    };
    [RANGE_REFS]: {
        [key: number]: RangeRef;
    };
    constructor(props?: {
        onChange?(change: Change): void;
        readOnly?: boolean;
        value?: Value;
    });
}
interface Editor extends AnnotationCommands, TextCommands, NodeCommands, MarkCommands, SelectionCommands, GeneralCommands, ElementQueries, GeneralQueries, LocationQueries, RangeQueries {
}
export { Editor, EditorConstructor, EditorPlugin };
//# sourceMappingURL=editor.d.ts.map