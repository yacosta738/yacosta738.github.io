module.exports = function createTapListener(el, callback, useCapture) {
  var startX = 0;
  var startY = 0;
  var touchStarted = false;
  var touchMoved = false;
  // Assume that if a touchstart event initiates, the user is
  // using touch and click events should be ignored.
  // If this isn't done, touch-clicks will fire the callback
  // twice: once on touchend, once on the subsequent "click".
  var usingTouch = false;

  el.addEventListener('click', handleClick, useCapture);
  el.addEventListener('touchstart', handleTouchstart, useCapture);

  function handleClick(e) {
    if (usingTouch) return;
    callback(e);
  }

  function handleTouchstart(e) {
    usingTouch = true;

    if (touchStarted) return;
    touchStarted = true;

    el.addEventListener('touchmove', handleTouchmove, useCapture);
    el.addEventListener('touchend', handleTouchend, useCapture);
    el.addEventListener('touchcancel', handleTouchcancel, useCapture);

    touchMoved = false;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function handleTouchmove(e) {
    if (touchMoved) return;

    if (
      Math.abs(e.touches[0].clientX - startX) <= 10
      && Math.abs(e.touches[0].clientY - startY) <= 10
    ) return;

    touchMoved = true;
  }

  function handleTouchend(e) {
    touchStarted = false;
    removeSecondaryTouchListeners();
    if (!touchMoved) {
      callback(e);
    }
  }

  function handleTouchcancel() {
    touchStarted = false;
    touchMoved = false;
    startX = 0;
    startY = 0;
  }

  function removeSecondaryTouchListeners() {
    el.removeEventListener('touchmove', handleTouchmove, useCapture);
    el.removeEventListener('touchend', handleTouchend, useCapture);
    el.removeEventListener('touchcancel', handleTouchcancel, useCapture);
  }

  function removeTapListener() {
    el.removeEventListener('click', handleClick, useCapture);
    el.removeEventListener('touchstart', handleTouchstart, useCapture);
    removeSecondaryTouchListeners();
  }

  return {
    remove: removeTapListener,
  };
};
