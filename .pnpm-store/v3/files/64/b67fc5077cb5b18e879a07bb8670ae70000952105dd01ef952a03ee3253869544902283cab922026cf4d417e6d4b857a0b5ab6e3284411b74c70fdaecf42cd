import React from 'react';
import Types from 'prop-types';
/**
 * Void.
 *
 * @type {Component}
 */
declare class Void extends React.Component {
    /**
     * Property types.
     *
     * @type {Object}
     */
    static propTypes: {
        block: any;
        children: Types.Validator<any>;
        editor: Types.Validator<object>;
        node: any;
        parent: any;
        readOnly: Types.Validator<boolean>;
    };
    /**
     * Debug.
     *
     * @param {String} message
     * @param {Mixed} ...args
     */
    debug: (message: any, ...args: any[]) => void;
    /**
     * Render.
     *
     * @return {Element}
     */
    render(): JSX.Element;
    /**
     * Render the void node's text node, which will catch the cursor when it the
     * void node is navigated to with the arrow keys.
     *
     * Having this text node there means the browser continues to manage the
     * selection natively, so it keeps track of the right offset when moving
     * across the block.
     *
     * @return {Element}
     */
    renderText: () => JSX.Element;
}
/**
 * Export.
 *
 * @type {Component}
 */
export default Void;
//# sourceMappingURL=void.d.ts.map