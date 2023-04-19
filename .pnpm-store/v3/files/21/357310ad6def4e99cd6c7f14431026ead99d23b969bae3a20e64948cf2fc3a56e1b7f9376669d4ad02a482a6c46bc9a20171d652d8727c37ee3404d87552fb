/// <reference types="react" />
import { Element, Range, Mark, Text } from 'slate';
import { Leaf } from '../utils/leaf';
/**
 * `CustomAnnotationProps` are passed to the `renderAnnotation` handler.
 */
export interface CustomAnnotationProps {
    annotation: Range;
    children: any;
    key: string;
    leaf: Leaf;
    text: Text;
    attributes: {
        'data-slate-annotation': true;
    };
}
/**
 * The default custom annotation renderer.
 */
export declare const CustomAnnotation: (props: CustomAnnotationProps) => JSX.Element;
export interface CustomDecorationProps {
    children: any;
    decoration: Range;
    leaf: Leaf;
    text: Text;
    attributes: {
        'data-slate-decoration': true;
    };
}
/**
 * The default custom decoration renderer.
 */
export declare const CustomDecoration: (props: CustomDecorationProps) => JSX.Element;
/**
 * `CustomElementProps` are passed to the `renderElement` handler.
 */
export interface CustomElementProps {
    children: any;
    element: Element;
    attributes: {
        'data-slate-inline'?: true;
        'data-slate-node': 'element';
        'data-slate-void'?: true;
        dir?: 'rtl';
        ref: any;
    };
}
/**
 * The default element renderer.
 */
export declare const CustomElement: (props: CustomElementProps) => JSX.Element;
/**
 * `CustomMarkProps` are passed to the `renderMark` handler.
 */
export interface CustomMarkProps {
    children: any;
    mark: Mark;
    leaf: Leaf;
    text: Text;
    attributes: {
        'data-slate-mark': true;
    };
}
/**
 * The default custom mark renderer.
 */
export declare const CustomMark: (props: CustomMarkProps) => JSX.Element;
/**
 * A custom decoration for the default placeholder behavior.
 */
export declare const PlaceholderDecoration: (props: CustomDecorationProps) => JSX.Element;
//# sourceMappingURL=custom.d.ts.map