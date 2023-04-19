import { Editor, Fragment, Location, Range, Point } from '../..';
declare class DeletingCommands {
    /**
     * Delete content in the editor.
     */
    delete(this: Editor, options?: {
        at?: Location;
        distance?: number;
        unit?: 'character' | 'word' | 'line' | 'block';
        reverse?: boolean;
        hanging?: boolean;
    }): void;
    /**
     * Insert a fragment at a specific location in the editor.
     */
    insertFragment(this: Editor, fragment: Fragment, options?: {
        at?: Location;
    }): void;
    /**
     * Insert a string of text in the editor.
     */
    insertText(this: Editor, text: string, options?: {
        at?: Point | Range;
    }): void;
    /**
     * Remove a string of text in the editor.
     */
    removeText(this: Editor, text: string, options?: {
        at?: Range;
    }): void;
}
export default DeletingCommands;
//# sourceMappingURL=text.d.ts.map