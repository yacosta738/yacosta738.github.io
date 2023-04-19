import callBind from 'call-bind';
import callBound from 'call-bind/callBound';
import RequireObjectCoercible from 'es-abstract/2022/RequireObjectCoercible.js';

import getPolyfill from 'array.prototype.foreach/polyfill';

const bound = callBind.apply(getPolyfill());
const $slice = callBound('Array.prototype.slice');

// eslint-disable-next-line no-unused-vars
export default function forEach(array, callbackfn) {
	RequireObjectCoercible(array);
	return bound(array, $slice(arguments, 1));
}

export { default as getPolyfill } from 'array.prototype.foreach/polyfill';
export { default as implementation } from 'array.prototype.foreach/implementation';
export { default as shim } from 'array.prototype.foreach/shim';
