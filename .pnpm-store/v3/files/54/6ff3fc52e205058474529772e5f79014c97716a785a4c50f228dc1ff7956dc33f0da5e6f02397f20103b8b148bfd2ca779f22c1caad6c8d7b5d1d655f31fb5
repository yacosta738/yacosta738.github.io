var assert = require('power-assert');
var simulant = require('simulant');
var queue = require('d3-queue').queue;
var createFocusGroup = require('..');

var arrowUpEvent = { keyCode: 38 };
var arrowDownEvent = { keyCode: 40 };
var arrowLeftEvent = { keyCode: 37 };
var arrowRightEvent = { keyCode: 39 };

var nodeOne = document.createElement('button');
nodeOne.innerHTML = 'one';
document.body.appendChild(nodeOne);
var nodeTwo = document.createElement('button');
nodeTwo.innerHTML = 'two';
document.body.appendChild(nodeTwo);
var nodeThree = document.createElement('button');
nodeThree.innerHTML = 'three';
document.body.appendChild(nodeThree);
// nodeFour has no text content
var nodeFour = document.createElement('button');
document.body.appendChild(nodeFour);

describe('default settings', function() {
  beforeEach(function() {
    this.focusGroup = createFocusGroup({
      members: [nodeOne, nodeTwo, nodeThree],
    }).activate();
  });

  afterEach(function() {
    this.focusGroup.deactivate();
  });

  it('with focus outside the group, arrow and letter keys do not affect focus', function() {
    nodeFour.focus(); // nodeFour is outside group
    simulateKeydown(arrowUpEvent);
    assertActiveElement(nodeFour);
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeFour);
    simulateKeydown(arrowLeftEvent);
    assertActiveElement(nodeFour);
    simulateKeydown(arrowRightEvent);
    assertActiveElement(nodeFour);
    simulateKeydown({ keyCode: 70 });
    assertActiveElement(nodeFour);
    simulateKeydown({ keyCode: 88 });
    assertActiveElement(nodeFour);
  });

  describe('with focus inside the group', function() {
    it('down arrow moves focus to next node and sticks on last', function() {
      nodeOne.focus();
      simulateKeydown(arrowDownEvent);
      assertActiveElement(nodeTwo);
      simulateKeydown(arrowDownEvent);
      assertActiveElement(nodeThree);
      simulateKeydown(arrowDownEvent);
      assertActiveElement(nodeThree);
    });

    it('up arrow moves focus to previous node and sticks on first', function() {
      nodeThree.focus();
      simulateKeydown(arrowUpEvent);
      assertActiveElement(nodeTwo);
      simulateKeydown(arrowUpEvent);
      assertActiveElement(nodeOne);
      simulateKeydown(arrowUpEvent);
      assertActiveElement(nodeOne);
    });

    it('left and right arrows and letters do not move focus', function() {
      nodeTwo.focus();
      simulateKeydown(arrowLeftEvent);
      assertActiveElement(nodeTwo);
      simulateKeydown(arrowRightEvent);
      assertActiveElement(nodeTwo);
      simulateKeydown({ keyCode: 70 });
      assertActiveElement(nodeTwo);
      simulateKeydown({ keyCode: 88 });
      assertActiveElement(nodeTwo);
    });
  });
});

describe('all arrows designated', function() {
  beforeEach(function() {
    this.focusGroup = createFocusGroup({
      members: [nodeOne, nodeTwo, nodeThree],
      keybindings: {
        next: [arrowDownEvent, arrowRightEvent],
        prev: [arrowUpEvent, arrowLeftEvent],
      },
      wrap: true
    }).activate();
  });

  afterEach(function() {
    this.focusGroup.deactivate();
  });

  it('up and left arrows move focus forward', function() {
    nodeOne.focus();
    simulateKeydown(arrowUpEvent);
    assertActiveElement(nodeThree);
    simulateKeydown(arrowLeftEvent);
    assertActiveElement(nodeTwo);
  });

  it('down and right arrows move focus back', function() {
    nodeThree.focus();
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeOne);
    simulateKeydown(arrowRightEvent);
    assertActiveElement(nodeTwo);
  });
});

describe('modifier keys', function() {
  beforeEach(function () {
    this.focusGroup = createFocusGroup({
      members: [nodeOne, nodeTwo, nodeThree],
      keybindings: {
        first: { keyCode: 36, ctrlKey: true },
        last: { keyCode: 35, ctrlKey: true },
      },
    }).activate();
  });

  afterEach(function () {
    this.focusGroup.deactivate();
  });

  it('move focus to first node when holding control and hitting home key', function() {
    nodeThree.focus();
    simulateKeydown({ keyCode: 36, ctrlKey: true });
    assertActiveElement(nodeOne);
  })

  it('move focus to last node when holding control and hitting end key', function() {
    nodeOne.focus();
    simulateKeydown({ keyCode: 35, ctrlKey: true });
    assertActiveElement(nodeThree);
  })
});

describe('all keybinding properties used', function() {
  beforeEach(function () {
    this.focusGroup = createFocusGroup({
      members: [nodeOne, nodeTwo, nodeThree],
      keybindings: {
        next: arrowDownEvent,
        prev: arrowUpEvent,
        first: { keyCode: 36 },
        last: { keyCode: 35 },
      },
    }).activate();
  });

  afterEach(function () {
    this.focusGroup.deactivate();
  });

  it('move focus forward when hitting down arrow key', function() {
    nodeOne.focus();
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeTwo);
  })

  it('move focus backwards when hitting up arrow key', function() {
    nodeTwo.focus();
    simulateKeydown(arrowUpEvent);
    assertActiveElement(nodeOne);
  })

  it('move focus to first node when hitting home key', function() {
    nodeThree.focus();
    simulateKeydown({ keyCode: 36 });
    assertActiveElement(nodeOne);
  })

  it('move focus to last node when hitting end key', function() {
    nodeOne.focus();
    simulateKeydown({ keyCode: 35 });
    assertActiveElement(nodeThree);
  })
});

describe('arrows with modifier keys should not move focus by default', function() {
  beforeEach(function() {
    this.focusGroup = createFocusGroup({
      members: [nodeOne, nodeTwo, nodeThree]
    }).activate();
  });

  afterEach(function() {
    this.focusGroup.deactivate();
  });

  it('down arrow with meta key should not move forward', function() {
    nodeOne.focus();
    simulateKeydown({ key: 'ArrowDown', metaKey: true });
    assertActiveElement(nodeOne);
  });

  it('up arrow with shift key should not move back', function() {
    nodeTwo.focus();
    simulateKeydown({ key: 'ArrowUp', shiftKey: true });
    assertActiveElement(nodeTwo);
  });
});

describe('wrap: true', function() {
  beforeEach(function() {
    this.focusGroup = createFocusGroup({
      members: [nodeOne, nodeTwo, nodeThree],
      wrap: true,
    }).activate();
  });

  afterEach(function() {
    this.focusGroup.deactivate();
  });

  it('down arrow wraps forward', function() {
    nodeTwo.focus();
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeThree);
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeOne);
  });

  it('up arrow wraps back', function() {
    nodeTwo.focus();
    simulateKeydown(arrowUpEvent);
    assertActiveElement(nodeOne);
    simulateKeydown(arrowUpEvent);
    assertActiveElement(nodeThree);
  });
});

describe('stringSearch: true', function(done) {
  before(function() {
    this.focusGroup = createFocusGroup({
      members: [nodeOne, nodeTwo, nodeThree, nodeFour],
      stringSearch: true,
    }).activate();
  });

  after(function() {
    this.focusGroup.deactivate();
  });

  var q = queue(1);
  q.defer(function(next) {
    nodeThree.focus();
    it('moves on first keystroke', function() {
      simulateKeydown({ keyCode: 79 }); // "o"
      assertActiveElement(nodeOne);
    });
    next();
  });
  q.defer(function(next) {
    setTimeout(function() {
      it('300ms continues old search', function() {
        simulateKeydown({ keyCode: 84 }); // "t"
        assertActiveElement(nodeOne);
      });
      next();
    }, 300);
  });
  q.defer(function(next) {
    setTimeout(function() {
      it('805ms starts new search', function() {
        simulateKeydown({ keyCode: 84 }); // "t"
        assertActiveElement(nodeTwo);
      });
      next();
    }, 805);
  });
  q.defer(function(next) {
    setTimeout(function() {
      it('another key after 10ms extends search', function() {
        simulateKeydown({ keyCode: 72 }); // "h"
        assertActiveElement(nodeThree);
      });
      next();
    }, 10);
  });
  q.defer(function(next) {
    setTimeout(function() {
      it('another key that produces an irrelevant search does not move focus', function() {
        simulateKeydown({ keyCode: 79 }); // "o"
        assertActiveElement(nodeThree);
      });
      next();
    }, 10);
  });
  q.defer(function(next) {
    setTimeout(function() {
      it('after another 805ms the search has reset', function() {
        simulateKeydown({ keyCode: 84 }); // "t"
        assertActiveElement(nodeTwo);
      });
      next();
    }, 805);
  });
  q.awaitAll(function(err) {
    if (err) throw err;
    done();
  });
})

describe('stringSearch: true but no search happens', function() {
  beforeEach(function() {
    this.focusGroup = createFocusGroup({
      members: [nodeOne, nodeTwo, nodeThree, nodeFour],
      stringSearch: true,
    }).activate();
  });

  afterEach(function() {
    this.focusGroup.deactivate();
  });

  it('non-letters do nothing', function() {
    nodeOne.focus();
    simulateKeydown({ keyCode: 54 }); // "5"
    assertActiveElement(nodeOne);
    simulateKeydown({ keyCode: 188 }); // ","
    assertActiveElement(nodeOne);
  });

  it('letters keys do nothing when ctrl, meta, or alt are also pressed', function() {
    nodeOne.focus();
    simulateKeydown({ keyCode: 84, ctrlKey: true }) // "t"
    assertActiveElement(nodeOne);
    simulateKeydown({ keyCode: 84, altKey: true }) // "t"
    assertActiveElement(nodeOne);
    simulateKeydown({ keyCode: 84, metaKey: true }) // "t"
    assertActiveElement(nodeOne);
  });
});

describe('deactivate()', function() {
  beforeEach(function() {
    this.focusGroup = createFocusGroup({ members: [nodeOne, nodeTwo, nodeThree] }).activate()
  });

  afterEach(function() {
    this.focusGroup.deactivate();
  });

  it('does not respond after deactivation', function() {
    this.focusGroup.deactivate()
    nodeOne.focus();
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeOne);
    simulateKeydown({ keyCode: 84 }); // "t"
    assertActiveElement(nodeOne);
  });
});

describe('dynamically adding and removing nodes', function() {
  beforeEach(function() {
    this.focusGroup = createFocusGroup().activate();
  });

  afterEach(function() {
    this.focusGroup.deactivate();
  });

  it('does nothing without nodes', function() {
    assert.deepEqual(this.focusGroup.getMembers(), []);
    nodeOne.focus();
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeOne);
    simulateKeydown({ keyCode: 84 }); // "t"
    assertActiveElement(nodeOne);
  });

  it('works after adding nodes one at a time with addMember()', function() {
    assert.deepEqual(this.focusGroup.getMembers(), []);
    this.focusGroup.addMember(nodeOne);
    this.focusGroup.addMember(nodeTwo);
    assert.deepEqual(this.focusGroup.getMembers(), [
      { node: nodeOne, text: 'one' },
      { node: nodeTwo, text: 'two' },
    ]);
    nodeOne.focus();
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeTwo);
  });

  it('works after adding all nodels with setMembers()', function() {
    assert.deepEqual(this.focusGroup.getMembers(), []);
    this.focusGroup.setMembers([nodeThree, nodeFour]);
    assert.deepEqual(this.focusGroup.getMembers(), [
      { node: nodeThree, text: 'three' },
      { node: nodeFour, text: '' },
    ]);
    nodeThree.focus();
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeFour);
  });

  it('adds a member at an index with addMember(node, index)', function() {
    this.focusGroup.setMembers([nodeThree, nodeFour]);
    this.focusGroup.addMember(nodeOne, 0);
    this.focusGroup.addMember(nodeTwo, 1);
    assert.deepEqual(this.focusGroup.getMembers(), [
      { node: nodeOne, text: 'one' },
      { node: nodeTwo, text: 'two' },
      { node: nodeThree, text: 'three' },
      { node: nodeFour, text: "" },
    ]);
  });

  it('removes a member with removeMember(node)', function() {
    this.focusGroup.setMembers([nodeThree, nodeFour]);
    this.focusGroup.removeMember(nodeThree);
    assert.deepEqual(this.focusGroup.getMembers(), [
      { node: nodeFour, text: "" },
    ]);
  });

  it('removes a member with removeMember(index)', function() {
    this.focusGroup.setMembers([nodeThree, nodeFour]);
    this.focusGroup.removeMember(1);
    assert.deepEqual(this.focusGroup.getMembers(), [
      { node: nodeThree, text: 'three' },
    ]);
  });

  it('does nothing when you remove a member that does not exist', function() {
    this.focusGroup.setMembers([nodeThree]);
    this.focusGroup.removeMember(nodeOne);
    assert.deepEqual(this.focusGroup.getMembers(), [
      { node: nodeThree, text: "three" },
    ]);
  });
});

describe('works while adding and removing nodes at whim', function() {
  before(function() {
    this.focusGroup = createFocusGroup().activate()
  });

  after(function() {
    this.focusGroup.deactivate();
  });

  it('starts with an empty group', function() {
    assert.deepEqual(this.focusGroup.getMembers(), []);
  });

  it('adds members with setMembers()', function() {
    this.focusGroup.setMembers([nodeOne, nodeTwo, nodeThree, nodeFour]);
    assert.deepEqual(this.focusGroup.getMembers(), [
      { node: nodeOne, text: 'one' },
      { node: nodeTwo, text: 'two' },
      { node: nodeThree, text: 'three' },
      { node: nodeFour, text: '' },
    ]);
  });

  it('removes a member with removeMember(node)', function() {
    this.focusGroup.removeMember(nodeTwo);
    assert.deepEqual(this.focusGroup.getMembers(), [
      { node: nodeOne, text: 'one' },
      { node: nodeThree, text: 'three' },
      { node: nodeFour, text: '' },
    ]);
  });

  it('still registers proper focus movement', function() {
    nodeOne.focus();
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeThree);
  });

  it('clears members with clearMembers()', function() {
    this.focusGroup.clearMembers();
    assert.deepEqual(this.focusGroup.getMembers(), []);
  });

  it('still registers proper focus movement', function() {
    simulateKeydown(arrowDownEvent);
    assertActiveElement(nodeThree);
  });
});

describe('when an object without a focus() method is added to the group', function() {
  it('throws an error', function() {
    assert.throws(function() {
      createFocusGroup({ members: [nodeOne, nodeTwo, { foo: 'bar' }] }).activate()
    });
  });
});

describe('focusNodeAtIndex', function() {
  beforeEach(function() {
    this.focusGroup = createFocusGroup({ members: [nodeOne, nodeTwo, nodeThree, nodeFour] })
      .activate();
  });

  afterEach(function() {
    this.focusGroup.deactivate();
  });

  it('works', function() {
    nodeOne.focus();
    this.focusGroup.focusNodeAtIndex(2);
    assertActiveElement(nodeThree);
    this.focusGroup.focusNodeAtIndex(0);
    assertActiveElement(nodeOne);
    this.focusGroup.focusNodeAtIndex(3);
    assertActiveElement(nodeFour);
  });

  it('quietly fails to focus when non-existant index is passed', function() {
    nodeOne.focus();
    this.focusGroup.focusNodeAtIndex(6);
    assertActiveElement(nodeOne);
  });
});

function assertActiveElement(node, message) {
  assert.equal(document.activeElement, node, message);
}

function simulateKeydown(mockEvent) {
  simulant.fire(document, 'keydown', mockEvent);
}
