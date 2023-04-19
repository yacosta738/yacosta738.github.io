import { Operation, Value } from '..';
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
 * The `Editor` class stores all the state of a Slate editor. It is extended by
 * plugins that wish to add their own methods that implement new behaviors.
 */
declare class Editor {
    onChange: (value: Value, operations: Operation[]) => void;
    operations: Operation[];
    value: Value;
    constructor(props?: {
        onChange?(value: Value, operations: Operation[]): void;
        readOnly?: boolean;
        value?: Value;
    });
}
interface Editor extends AnnotationCommands, TextCommands, NodeCommands, MarkCommands, SelectionCommands, GeneralCommands, ElementQueries, GeneralQueries, LocationQueries, RangeQueries {
}
export { Editor };
//# sourceMappingURL=editor.d.ts.map