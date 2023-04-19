import { Editor, Operation } from 'slate';
import { ReactEditor } from '.';
import { DOMStaticRange } from '../utils/dom';
export default class ReactEditorCommands {
    /**
     * Override
     */
    apply(this: Editor, op: Operation): void;
    /**
     * Blur the editor.
     */
    blur(this: ReactEditor): void;
    /**
     * Focus the editor.
     */
    focus(this: ReactEditor): void;
    /**
     * Deselect the editor.
     */
    deselect(this: Editor): void;
    /**
     * Insert a `DataTransfer` object.
     */
    insertData(this: ReactEditor, dataTransfer: DataTransfer): void;
    /**
     * Transform an `InputEvent` into commands on the editor.
     */
    onBeforeInput(this: ReactEditor, event: Event & {
        data: string | null;
        dataTransfer: DataTransfer | null;
        getTargetRanges(): DOMStaticRange[];
        inputType: string;
        isComposing: boolean;
    }): void;
    /**
     * Transform a `KeyboardEvent` into commands on the editor. This should only
     * be used for hotkeys which attach specific commands to specific key
     * combinations. Most input logic will be handled by the `onBeforeInput`
     * method instead.
     */
    onKeyDown(this: ReactEditor, event: KeyboardEvent): void;
    /**
     * Redo.
     */
    redo(this: ReactEditor): void;
    /**
     * Undo.
     */
    undo(this: ReactEditor): void;
}
//# sourceMappingURL=commands.d.ts.map