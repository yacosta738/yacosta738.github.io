import React from 'react';
import Types from 'prop-types';
/**
 * Node.
 *
 * @type {Component}
 */
declare class Node extends React.Component {
    /**
     * Property types.
     *
     * @type {Object}
     */
    static propTypes: {
        annotations: any;
        block: any;
        decorations: any;
        editor: Types.Validator<object>;
        node: any;
        parent: any;
        readOnly: Types.Validator<boolean>;
        selection: any;
    };
    /**
     * Temporary values.
     *
     * @type {Object}
     */
    tmp: {
        nodeRefs: {};
    };
    /**
     * A ref for the contenteditable DOM node.
     *
     * @type {Object}
     */
    ref: React.RefObject<unknown>;
    /**
     * Debug.
     *
     * @param {String} message
     * @param {Mixed} ...args
     */
    debug: (message: any, ...args: any[]) => void;
    /**
     * Should the node update?
     *
     * @param {Object} nextProps
     * @param {Object} value
     * @return {Boolean}
     */
    shouldComponentUpdate(nextProps: any): boolean;
    /**
     * Render.
     *
     * @return {Element}
     */
    render(): any;
}
/**
 * Export.
 *
 * @type {Component}
 */
export default Node;
//# sourceMappingURL=node.d.ts.map