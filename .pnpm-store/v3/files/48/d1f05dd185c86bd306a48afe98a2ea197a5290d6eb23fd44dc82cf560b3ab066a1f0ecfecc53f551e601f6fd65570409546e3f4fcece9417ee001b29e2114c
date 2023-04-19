"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntil = waitUntil;
exports.waitUntilWithTimeout = waitUntilWithTimeout;

var _waitUntilAction = require("../redux/middleware/waitUntilAction");

function waitUntil(_ref) {
  let {
    predicate,
    run
  } = _ref;
  return {
    type: _waitUntilAction.WAIT_UNTIL_ACTION,
    predicate,
    run
  };
}

async function waitUntilWithTimeout(dispatch, waitActionArgs) {
  let timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30000;
  let waitDone = false;
  const waitPromise = new Promise(resolve => {
    dispatch(waitUntil(waitActionArgs(resolve)));
  });
  const timeoutPromise = new Promise(resolve => {
    setTimeout(() => {
      if (waitDone) {
        resolve();
      } else {
        console.warn('Wait Action timed out');
        resolve(null);
      }
    }, timeout);
  });
  const result = await Promise.race([waitPromise.then(result => {
    waitDone = true;
    return result;
  }).catch(null), timeoutPromise]);
  return result;
}