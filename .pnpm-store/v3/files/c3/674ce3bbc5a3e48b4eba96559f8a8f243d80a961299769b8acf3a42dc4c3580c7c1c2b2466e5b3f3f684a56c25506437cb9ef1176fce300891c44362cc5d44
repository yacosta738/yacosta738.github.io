/// <reference types="react" />
import { Mark, Element, Range, Text } from 'slate';
import { ReactEditor } from '../editor';
/**
 * The default rendering behavior for the React editor.
 */
export default class ReactRendering {
    /**
     * Render an annotation `Range` object.
     */
    renderAnnotation(this: ReactEditor, props: {
        annotation: Range;
        annotations: Range[];
        children: any;
        decorations: Range[];
        marks: Mark[];
        node: Text;
        attributes: {
            'data-slate-annotation': true;
        };
    }): JSX.Element;
    /**
     * Render an `Element` object.
     */
    renderElement(this: ReactEditor, props: {
        children: any;
        node: Element;
        attributes: {
            'data-slate-node': 'element';
            'data-slate-void'?: true;
            dir?: 'rtl';
            ref: any;
        };
    }): JSX.Element;
    /**
     * Render a decoration `Range` object.
     */
    renderDecoration(this: ReactEditor, props: {
        annotations: Range[];
        children: any;
        decoration: Range;
        decorations: Range[];
        marks: Mark[];
        node: Text;
        attributes: {
            'data-slate-decoration': true;
        };
    }): JSX.Element;
    /**
     * Render a `Mark` object.
     */
    renderMark(this: ReactEditor, props: {
        annotations: Range[];
        children: any;
        decorations: Range[];
        mark: Mark;
        marks: Mark[];
        node: Text;
        attributes: {
            'data-slate-mark': true;
        };
    }): JSX.Element;
}
//# sourceMappingURL=rendering.d.ts.map