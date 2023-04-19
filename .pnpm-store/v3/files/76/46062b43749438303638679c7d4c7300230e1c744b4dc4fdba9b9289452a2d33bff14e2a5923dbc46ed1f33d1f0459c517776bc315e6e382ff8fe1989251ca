import { Mark, Path } from '..';
/**
 * `Text` objects represent the nodes that contain the actual text content of a
 * Slate document along with any formatting marks. They are always leaf nodes in
 * the document tree as they cannot contain any children.
 */
interface Text {
    text: string;
    marks: Mark[];
    [key: string]: any;
}
/**
 * `TextEntry` objects refer to an `Text` and the `Path` where it can be
 * found inside a root node.
 */
declare type TextEntry = [Text, Path];
declare namespace Text {
    /**
     * Check if a value implements the `Text` interface.
     */
    const isText: (value: any) => value is Text;
    /**
     * Check if a value is a list of `Text` objects.
     */
    const isTextList: (value: any) => value is Text[];
    /**
     * Check if an text matches set of properties.
     *
     * Note: this is for matching custom properties, and it does not ensure that
     * the `text` property are two nodes equal. However, if `marks` are passed it
     * will ensure that the set of marks is exactly equal.
     */
    const matches: (text: Text, props: Partial<Text>) => boolean;
}
export { Text, TextEntry };
//# sourceMappingURL=text.d.ts.map