import { Component, HTMLAttributes, ReactElement } from "react";
export type Size = {
    height?: number;
    width?: number;
    scaledHeight?: number;
    scaledWidth?: number;
};
export type Props = {
    children: (size: Size) => ReactElement;
    defaultHeight?: number;
    defaultWidth?: number;
    disableHeight?: boolean;
    disableWidth?: boolean;
    nonce?: string;
    onResize?: (size: Size) => void;
    tagName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "onResize">;
type State = {
    height: number;
    scaledHeight: number;
    scaledWidth: number;
    width: number;
};
type ResizeHandler = (element: HTMLElement, onResize: () => void) => void;
type DetectElementResize = {
    addResizeListener: ResizeHandler;
    removeResizeListener: ResizeHandler;
};
declare class AutoSizer extends Component<Props, State> {
    static defaultProps: {
        onResize: () => void;
        disableHeight: boolean;
        disableWidth: boolean;
        style: {};
    };
    state: {
        height: number;
        scaledHeight: number;
        scaledWidth: number;
        width: number;
    };
    _autoSizer: HTMLElement | null;
    _detectElementResize: DetectElementResize | null;
    _parentNode: HTMLElement | null;
    _resizeObserver: ResizeObserver | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): ReactElement;
    _onResize: () => void;
    _setRef: (autoSizer: HTMLElement | null) => void;
}
export default AutoSizer;

//# sourceMappingURL=react-virtualized-auto-sizer.d.ts.map
