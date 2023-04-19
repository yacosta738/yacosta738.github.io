
var assert = require('assert');
var isBackward = require('../');

describe('selection-is-backward', function () {
  var div;

  afterEach(function () {
    if (div) {
      // clean up...
      document.body.removeChild(div);
      div = null;
    }
  });

  it('should return `false` for a "regular" Selection', function () {
    div = document.createElement('div');
    div.innerHTML = 'hello <b>world!</b>';
    div.setAttribute('contenteditable', 'true');
    document.body.appendChild(div);

    // set current Selection
    var range = document.createRange();
    range.setStart(div.firstChild, 1);
    range.setEnd(div.firstChild, 3);

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    assert.equal(false, isBackward(sel));
  });

  it('should return `true` for a "backward" Selection', function () {
    div = document.createElement('div');
    div.innerHTML = 'hello <b>world!</b>';
    div.setAttribute('contenteditable', 'true');
    document.body.appendChild(div);

    // set current Selection
    var range = document.createRange();
    range.setStart(div.firstChild, 3);
    range.setEnd(div.firstChild, 3);

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    // "extending" to before the given collapsed Ranged makes it "backward"
    sel.extend(div.firstChild, 1);

    assert.equal(true, isBackward(sel));
  });

});
