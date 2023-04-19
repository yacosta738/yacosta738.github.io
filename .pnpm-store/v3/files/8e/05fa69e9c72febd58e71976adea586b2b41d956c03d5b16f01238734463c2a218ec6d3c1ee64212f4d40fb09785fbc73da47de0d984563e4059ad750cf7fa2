import { Editor, Node, Element } from '../..';
declare class NodeQueries {
    /**
     * Check if a node is a block, meaning it lives at the level above text nodes
     * in the document tree.
     */
    isBlock(this: Editor, node: Node): node is Element;
    /**
     * Check if a node is an inline, meaning that it lives intermixed with text
     * nodes in the document tree.
     */
    isInline(this: Editor, node: Node): node is Element;
    /**
     * Check if a node is a leaf block node.
     */
    isLeafBlock(this: Editor, node: Node): node is Element;
    /**
     * Check if a node is a leaf inline node.
     */
    isLeafInline(this: Editor, node: Node): node is Element;
    /**
     * Check if a node is a void, meaning that Slate considers its content a black
     * box. It will be edited as if it has no content.
     */
    isVoid(this: Editor, node: Node): node is Element;
}
export default NodeQueries;
//# sourceMappingURL=node.d.ts.map