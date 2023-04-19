import {createElement as $hgUW1$createElement, Component as $hgUW1$Component} from "react";

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};

var $3e40d2fd7fdb47d2$exports = {};
/**
 * Detect Element Resize.
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * Forked from version 0.5.3; includes the following modifications:
 * 1) Guard against unsafe 'window' and 'document' references (to support SSR).
 * 2) Defer initialization code via a top-level function wrapper (to support SSR).
 * 3) Avoid unnecessary reflows by not measuring size for scroll events bubbling from children.
 * 4) Add nonce for style element.
 **/ // Check `document` and `window` in case of server-side rendering
let $3e40d2fd7fdb47d2$var$windowObject;
if (typeof window !== "undefined") $3e40d2fd7fdb47d2$var$windowObject = window;
else if (typeof self !== "undefined") // eslint-disable-next-line no-restricted-globals
$3e40d2fd7fdb47d2$var$windowObject = self;
else $3e40d2fd7fdb47d2$var$windowObject = $parcel$global;
let $3e40d2fd7fdb47d2$var$cancelFrame = null;
let $3e40d2fd7fdb47d2$var$requestFrame = null;
const $3e40d2fd7fdb47d2$var$TIMEOUT_DURATION = 20;
const $3e40d2fd7fdb47d2$var$clearTimeoutFn = $3e40d2fd7fdb47d2$var$windowObject.clearTimeout;
const $3e40d2fd7fdb47d2$var$setTimeoutFn = $3e40d2fd7fdb47d2$var$windowObject.setTimeout;
const $3e40d2fd7fdb47d2$var$cancelAnimationFrameFn = $3e40d2fd7fdb47d2$var$windowObject.cancelAnimationFrame || $3e40d2fd7fdb47d2$var$windowObject.mozCancelAnimationFrame || $3e40d2fd7fdb47d2$var$windowObject.webkitCancelAnimationFrame;
const $3e40d2fd7fdb47d2$var$requestAnimationFrameFn = $3e40d2fd7fdb47d2$var$windowObject.requestAnimationFrame || $3e40d2fd7fdb47d2$var$windowObject.mozRequestAnimationFrame || $3e40d2fd7fdb47d2$var$windowObject.webkitRequestAnimationFrame;
if ($3e40d2fd7fdb47d2$var$cancelAnimationFrameFn == null || $3e40d2fd7fdb47d2$var$requestAnimationFrameFn == null) {
    // For environments that don't support animation frame,
    // fallback to a setTimeout based approach.
    $3e40d2fd7fdb47d2$var$cancelFrame = $3e40d2fd7fdb47d2$var$clearTimeoutFn;
    $3e40d2fd7fdb47d2$var$requestFrame = function requestAnimationFrameViaSetTimeout(callback) {
        return $3e40d2fd7fdb47d2$var$setTimeoutFn(callback, $3e40d2fd7fdb47d2$var$TIMEOUT_DURATION);
    };
} else {
    // Counter intuitively, environments that support animation frames can be trickier.
    // Chrome's "Throttle non-visible cross-origin iframes" flag can prevent rAFs from being called.
    // In this case, we should fallback to a setTimeout() implementation.
    $3e40d2fd7fdb47d2$var$cancelFrame = function cancelFrame([animationFrameID, timeoutID]) {
        $3e40d2fd7fdb47d2$var$cancelAnimationFrameFn(animationFrameID);
        $3e40d2fd7fdb47d2$var$clearTimeoutFn(timeoutID);
    };
    $3e40d2fd7fdb47d2$var$requestFrame = function requestAnimationFrameWithSetTimeoutFallback(callback) {
        const animationFrameID = $3e40d2fd7fdb47d2$var$requestAnimationFrameFn(function animationFrameCallback() {
            $3e40d2fd7fdb47d2$var$clearTimeoutFn(timeoutID);
            callback();
        });
        const timeoutID = $3e40d2fd7fdb47d2$var$setTimeoutFn(function timeoutCallback() {
            $3e40d2fd7fdb47d2$var$cancelAnimationFrameFn(animationFrameID);
            callback();
        }, $3e40d2fd7fdb47d2$var$TIMEOUT_DURATION);
        return [
            animationFrameID,
            timeoutID
        ];
    };
}
function $3e40d2fd7fdb47d2$var$createDetectElementResize(nonce) {
    let animationKeyframes;
    let animationName;
    let animationStartEvent;
    let animationStyle;
    let checkTriggers;
    let resetTriggers;
    let scrollListener;
    const attachEvent = typeof document !== "undefined" && document.attachEvent;
    if (!attachEvent) {
        resetTriggers = function(element) {
            const triggers = element.__resizeTriggers__, expand = triggers.firstElementChild, contract = triggers.lastElementChild, expandChild = expand.firstElementChild;
            contract.scrollLeft = contract.scrollWidth;
            contract.scrollTop = contract.scrollHeight;
            expandChild.style.width = expand.offsetWidth + 1 + "px";
            expandChild.style.height = expand.offsetHeight + 1 + "px";
            expand.scrollLeft = expand.scrollWidth;
            expand.scrollTop = expand.scrollHeight;
        };
        checkTriggers = function(element) {
            return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height;
        };
        scrollListener = function(e) {
            // Don't measure (which forces) reflow for scrolls that happen inside of children!
            if (e.target.className && typeof e.target.className.indexOf === "function" && e.target.className.indexOf("contract-trigger") < 0 && e.target.className.indexOf("expand-trigger") < 0) return;
            const element = this;
            resetTriggers(this);
            if (this.__resizeRAF__) $3e40d2fd7fdb47d2$var$cancelFrame(this.__resizeRAF__);
            this.__resizeRAF__ = $3e40d2fd7fdb47d2$var$requestFrame(function animationFrame() {
                if (checkTriggers(element)) {
                    element.__resizeLast__.width = element.offsetWidth;
                    element.__resizeLast__.height = element.offsetHeight;
                    element.__resizeListeners__.forEach(function forEachResizeListener(fn) {
                        fn.call(element, e);
                    });
                }
            });
        };
        /* Detect CSS Animations support to detect element display/re-attach */ let animation = false;
        let keyframeprefix = "";
        animationStartEvent = "animationstart";
        const domPrefixes = "Webkit Moz O ms".split(" ");
        let startEvents = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" ");
        let pfx = "";
        {
            const elm = document.createElement("fakeelement");
            if (elm.style.animationName !== undefined) animation = true;
            if (animation === false) {
                for(let i = 0; i < domPrefixes.length; i++)if (elm.style[domPrefixes[i] + "AnimationName"] !== undefined) {
                    pfx = domPrefixes[i];
                    keyframeprefix = "-" + pfx.toLowerCase() + "-";
                    animationStartEvent = startEvents[i];
                    animation = true;
                    break;
                }
            }
        }
        animationName = "resizeanim";
        animationKeyframes = "@" + keyframeprefix + "keyframes " + animationName + " { from { opacity: 0; } to { opacity: 0; } } ";
        animationStyle = keyframeprefix + "animation: 1ms " + animationName + "; ";
    }
    const createStyles = function(doc) {
        if (!doc.getElementById("detectElementResize")) {
            //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
            const css = (animationKeyframes ? animationKeyframes : "") + ".resize-triggers { " + (animationStyle ? animationStyle : "") + "visibility: hidden; opacity: 0; } " + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }', head = doc.head || doc.getElementsByTagName("head")[0], style = doc.createElement("style");
            style.id = "detectElementResize";
            style.type = "text/css";
            if (nonce != null) style.setAttribute("nonce", nonce);
            if (style.styleSheet) style.styleSheet.cssText = css;
            else style.appendChild(doc.createTextNode(css));
            head.appendChild(style);
        }
    };
    const addResizeListener = function(element, fn) {
        if (attachEvent) element.attachEvent("onresize", fn);
        else {
            if (!element.__resizeTriggers__) {
                const doc = element.ownerDocument;
                const elementStyle = $3e40d2fd7fdb47d2$var$windowObject.getComputedStyle(element);
                if (elementStyle && elementStyle.position === "static") element.style.position = "relative";
                createStyles(doc);
                element.__resizeLast__ = {};
                element.__resizeListeners__ = [];
                (element.__resizeTriggers__ = doc.createElement("div")).className = "resize-triggers";
                const expandTrigger = doc.createElement("div");
                expandTrigger.className = "expand-trigger";
                expandTrigger.appendChild(doc.createElement("div"));
                const contractTrigger = doc.createElement("div");
                contractTrigger.className = "contract-trigger";
                element.__resizeTriggers__.appendChild(expandTrigger);
                element.__resizeTriggers__.appendChild(contractTrigger);
                element.appendChild(element.__resizeTriggers__);
                resetTriggers(element);
                element.addEventListener("scroll", scrollListener, true);
                /* Listen for a css animation to detect element display/re-attach */ if (animationStartEvent) {
                    element.__resizeTriggers__.__animationListener__ = function animationListener(e) {
                        if (e.animationName === animationName) resetTriggers(element);
                    };
                    element.__resizeTriggers__.addEventListener(animationStartEvent, element.__resizeTriggers__.__animationListener__);
                }
            }
            element.__resizeListeners__.push(fn);
        }
    };
    const removeResizeListener = function(element, fn) {
        if (attachEvent) element.detachEvent("onresize", fn);
        else {
            element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
            if (!element.__resizeListeners__.length) {
                element.removeEventListener("scroll", scrollListener, true);
                if (element.__resizeTriggers__.__animationListener__) {
                    element.__resizeTriggers__.removeEventListener(animationStartEvent, element.__resizeTriggers__.__animationListener__);
                    element.__resizeTriggers__.__animationListener__ = null;
                }
                try {
                    element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
                } catch (e) {
                // Preact compat; see developit/preact-compat/issues/228
                }
            }
        }
    };
    return {
        addResizeListener: addResizeListener,
        removeResizeListener: removeResizeListener
    };
}
$3e40d2fd7fdb47d2$exports = {
    createDetectElementResize: $3e40d2fd7fdb47d2$var$createDetectElementResize
};


function $6e2bb92d9db3b0c8$var$_defineProperty(obj, key, value) {
    key = $6e2bb92d9db3b0c8$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $6e2bb92d9db3b0c8$var$_toPropertyKey(arg) {
    var key = $6e2bb92d9db3b0c8$var$_toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
}
function $6e2bb92d9db3b0c8$var$_toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
class $6e2bb92d9db3b0c8$export$9d94f4ee1d930ff extends (0, $hgUW1$Component) {
    constructor(...args){
        super(...args);
        $6e2bb92d9db3b0c8$var$_defineProperty(this, "state", {
            height: this.props.defaultHeight || 0,
            scaledHeight: this.props.defaultHeight || 0,
            scaledWidth: this.props.defaultWidth || 0,
            width: this.props.defaultWidth || 0
        });
        $6e2bb92d9db3b0c8$var$_defineProperty(this, "_autoSizer", null);
        $6e2bb92d9db3b0c8$var$_defineProperty(this, "_detectElementResize", null);
        $6e2bb92d9db3b0c8$var$_defineProperty(this, "_parentNode", null);
        $6e2bb92d9db3b0c8$var$_defineProperty(this, "_resizeObserver", null);
        $6e2bb92d9db3b0c8$var$_defineProperty(this, "_onResize", ()=>{
            const { disableHeight: disableHeight , disableWidth: disableWidth , onResize: onResize  } = this.props;
            if (this._parentNode) {
                var _style$paddingLeft, _style$paddingRight, _style$paddingTop, _style$paddingBottom;
                // Guard against AutoSizer component being removed from the DOM immediately after being added.
                // This can result in invalid style values which can result in NaN values if we don't handle them.
                // See issue #150 for more context.
                const style = window.getComputedStyle(this._parentNode) || {};
                const paddingLeft = parseInt((_style$paddingLeft = style.paddingLeft) !== null && _style$paddingLeft !== void 0 ? _style$paddingLeft : "0", 10);
                const paddingRight = parseInt((_style$paddingRight = style.paddingRight) !== null && _style$paddingRight !== void 0 ? _style$paddingRight : "0", 10);
                const paddingTop = parseInt((_style$paddingTop = style.paddingTop) !== null && _style$paddingTop !== void 0 ? _style$paddingTop : "0", 10);
                const paddingBottom = parseInt((_style$paddingBottom = style.paddingBottom) !== null && _style$paddingBottom !== void 0 ? _style$paddingBottom : "0", 10);
                const rect = this._parentNode.getBoundingClientRect();
                const scaledHeight = rect.height - paddingTop - paddingBottom;
                const scaledWidth = rect.width - paddingLeft - paddingRight;
                const height = this._parentNode.offsetHeight - paddingTop - paddingBottom;
                const width = this._parentNode.offsetWidth - paddingLeft - paddingRight;
                if (!disableHeight && (this.state.height !== height || this.state.scaledHeight !== scaledHeight) || !disableWidth && (this.state.width !== width || this.state.scaledWidth !== scaledWidth)) {
                    this.setState({
                        height: height,
                        width: width,
                        scaledHeight: scaledHeight,
                        scaledWidth: scaledWidth
                    });
                    if (typeof onResize === "function") onResize({
                        height: height,
                        scaledHeight: scaledHeight,
                        scaledWidth: scaledWidth,
                        width: width
                    });
                }
            }
        });
        $6e2bb92d9db3b0c8$var$_defineProperty(this, "_setRef", (autoSizer)=>{
            this._autoSizer = autoSizer;
        });
    }
    componentDidMount() {
        const { nonce: nonce  } = this.props;
        if (this._autoSizer && this._autoSizer.parentNode && this._autoSizer.parentNode.ownerDocument && this._autoSizer.parentNode.ownerDocument.defaultView && this._autoSizer.parentNode instanceof this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement) {
            // Delay access of parentNode until mount.
            // This handles edge-cases where the component has already been unmounted before its ref has been set,
            // As well as libraries like react-lite which have a slightly different lifecycle.
            this._parentNode = this._autoSizer.parentNode;
            // Defer requiring resize handler in order to support server-side rendering.
            // See issue #41
            if (this._parentNode != null) {
                if (typeof ResizeObserver !== "undefined") {
                    this._resizeObserver = new ResizeObserver(()=>{
                        // Guard against "ResizeObserver loop limit exceeded" error;
                        // could be triggered if the state update causes the ResizeObserver handler to run long.
                        // See https://github.com/bvaughn/react-virtualized-auto-sizer/issues/55
                        setTimeout(this._onResize, 0);
                    });
                    this._resizeObserver.observe(this._parentNode);
                } else {
                    this._detectElementResize = (0, $3e40d2fd7fdb47d2$exports.createDetectElementResize)(nonce);
                    this._detectElementResize.addResizeListener(this._parentNode, this._onResize);
                }
                this._onResize();
            }
        }
    }
    componentWillUnmount() {
        if (this._parentNode) {
            if (this._detectElementResize) this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
            if (this._resizeObserver) {
                this._resizeObserver.observe(this._parentNode);
                this._resizeObserver.disconnect();
            }
        }
    }
    render() {
        const { children: children , defaultHeight: defaultHeight , defaultWidth: defaultWidth , disableHeight: disableHeight , disableWidth: disableWidth , nonce: nonce , onResize: onResize , style: style , tagName: tagName = "div" , ...rest } = this.props;
        const { height: height , scaledHeight: scaledHeight , scaledWidth: scaledWidth , width: width  } = this.state;
        // Outer div should not force width/height since that may prevent containers from shrinking.
        // Inner component should overflow and use calculated width/height.
        // See issue #68 for more information.
        const outerStyle = {
            overflow: "visible"
        };
        const childParams = {};
        // Avoid rendering children before the initial measurements have been collected.
        // At best this would just be wasting cycles.
        let bailoutOnChildren = false;
        if (!disableHeight) {
            if (height === 0) bailoutOnChildren = true;
            outerStyle.height = 0;
            childParams.height = height;
            childParams.scaledHeight = scaledHeight;
        }
        if (!disableWidth) {
            if (width === 0) bailoutOnChildren = true;
            outerStyle.width = 0;
            childParams.width = width;
            childParams.scaledWidth = scaledWidth;
        }
        return (0, $hgUW1$createElement)(tagName, {
            ref: this._setRef,
            style: {
                ...outerStyle,
                ...style
            },
            ...rest
        }, !bailoutOnChildren && children(childParams));
    }
}
$6e2bb92d9db3b0c8$var$_defineProperty($6e2bb92d9db3b0c8$export$9d94f4ee1d930ff, "defaultProps", {
    onResize: ()=>{},
    disableHeight: false,
    disableWidth: false,
    style: {}
});


var $149c1bd638913645$export$2e2bcd8739ae039 = (0, $6e2bb92d9db3b0c8$export$9d94f4ee1d930ff);


export {$149c1bd638913645$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=react-virtualized-auto-sizer.module.js.map
