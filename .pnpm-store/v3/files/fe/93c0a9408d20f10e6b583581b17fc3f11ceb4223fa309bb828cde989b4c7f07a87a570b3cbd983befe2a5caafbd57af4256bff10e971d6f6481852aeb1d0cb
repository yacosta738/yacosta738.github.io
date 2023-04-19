# focus-group

[![Build Status](https://travis-ci.org/davidtheclark/focus-group.svg?branch=master)](https://travis-ci.org/davidtheclark/focus-group)
[![Coverage Status](https://coveralls.io/repos/github/davidtheclark/focus-group/badge.svg?branch=master)](https://coveralls.io/github/davidtheclark/focus-group?branch=master)

Create a group of nodes with special focus-related powers.

Specifically, you can do the following with your focus group:

- Use different keybindings to move focus through the nodes
- Type (with letters) to jump focus to a specific node based on its text

Essentially, it mimics some of the essential keyboard interactions of a native `<select>`.

These kinds of powers are useful for:

- Accessible menus, like [react-aria-menubutton](//github.com/davidtheclark/react-aria-menubutton)
- Any other widgets whose keyboard UX will improve by enabling arrow-key navigation and letter-key jumping

## Concepts

A focus-group is composed of members.

The order of the members matters, because focus moves forwards and backwards through the group, in order.

Each member consists of a DOM node and some text associated with that node.
The member's text will be used for letter-key jumping (a.k.a. string searching).
Each member's text can be established in a few ways:

- It can be manually specified when adding the member to the group, via `setMembers()` or `addMember()` (see below).
- If the member's node has a `data-focus-group-text` attribute, that value will serve as the member's text.
- If neither of the above is provided, the member's text will be the `textContent` of its node.

## Keyboard Interactions

When focus is inside the focus-group, the following things should happen:

- If you press one of your `next` `keybindings` (the down arrow by default), focus moves
  from the currently focused member to the next member in the group (or wraps back
  to the front, according to the `wrap` option).
- If you press one of your `prev` `keybindings` (the up arrow by default), focus moves
  from the currently focused member to the previous member in the group (or wraps around
  to the back, according to the `wrap` option).
- If you press a letter key, string searching begins (see below!).

### String searching

If the option `stringSearch` is `true` and focus is within the group, the following things happen:

- When you start typing, focus moves to the first member whose registered text begins with
  whatever you've been typing.
- As long as each keystroke occurs within `stringSearchDelay`,
  the search string will extend (e.g. `f` -> `fa` -> `far` -> `farm`) and focus will move
  accordingly.
- If no text matches the search string, focus will not move.
- After you have not typed any letters for `stringSearchDelay`, the search
  string resets and you can start over (e.g. you type `fa` then wait and type `go` to match `gorge`).

This all mimics the native `<select>` behavior.

Note that like the native `<select>`, typing only matches the *beginning of words*. So you can't focus `David Clark` by typing `Clark`.

## API

### var focusGroup = createFocusGroup([options])

This is the function you get when you `require()` or `import` the module.

```js
var createFocusGroup = require('focus-group');
var myMegaMenuFocusGroup = createFocusGroup();
```

#### Options

**members** { Array }: Designate initial members of the group. Can be any of the following:

- An array of DOM nodes (or a NodeList, like what's returned by `querySelectorAll()`)
- An array of member objects, each object with the following properties: `node` (the DOM node),
  and (optionally) `text` (the text that should be associated with that node for letter-navigation)

You can omit this option and add members later with `addMember()` or `setMembers()`. Default: `[]`.

**keybindings** { Object of `'next'`, `'prev'`, `'first'`, or `'last'` }:
Specify which key events should move the focus *forward*, *back*, to the *first* member, or to the *last* member through the group. Provide objects (or arrays of objects) that describe the requirements of a [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) that should trigger that keybinding. Undesignated modifier keys are false by default. So when using something like `{ keyCode: 38 }`, that keybinding will be ignored if key 38 is combined with meta, ctrl, or alt.

Default:
``` js
{
  next: { keyCode: 40 }, // ArrowDown
  prev: { keyCode: 38 }, // ArrowUp
}
```

Use arrays of objects for multiple key bindings:
``` js
{
  next: [{ key: 'ArrowDown' }, { key: 'ArrowRight' }],
  prev: [{ key: 'ArrowUp' }, { key: 'ArrowLeft' }],
}
```

Even add modifiers or any valid event properties:
``` js
{
  first: { keyCode: 74, metaKey: true },
  last: { keyCode: 75, metaKey: true },
}
```

**wrap** { Boolean }:
If `true`, when the arrow keys are moving focus they will wrap around the group. That is, when focus is on the last item and you move focus forward, the first item will focus; and when focus is on the first item and you move focus back, the last item will focus.

**stringSearch** { Boolean }:
If `true`, string searching is enabled (see below).
Default: `false`.

**stringSearchDelay** { Number }:
The number of milliseconds that should elapse between the user's last letter entry (with the keyboard)
and a refresh of the string search (see below).
Default: `800`.

### focusGroup.activate()

Start this group listening to keyboard events and responding accordingly.

Returns the focus group instance.

### focusGroup.deactivate()

Stop this group listening to keyboard events.

Returns the focus group instance.

### focusGroup.addMember(member[, index])

Add a member to the group.

`member` can be any of the following:

- A DOM node
- An object with the following properties:
  - `node` (the node itself)
  - (optionally) `text`: Text that should be associated with that node for letter-navigation. If none is provided, focus-group will check for a `data-focus-group-text` attribute or fallback to the node's `textContent.`

If `index` is provided, the member will be added at that index.
Otherwise, it will be added to the end of the group.

Returns the focus group instance.

### focusGroup.removeMember(member)

Remove a member from the group.

`member` can be any of the following:

- A DOM node
- An index for the member that should be removed.

Returns the focus group instance.

### focusGroup.clearMembers()

Empty the focus group of members.

Returns the focus group instance.

### focusGroup.setMembers(members)

Set the focus group's members (clearing any that already exist).

`members` can be any of the following:

- An array of DOM nodes (or a NodeList, like what's returned by `querySelectorAll()`)
- An array of member objects, each object with the following properties:
  - `node` (the node itself)
  - (optionally) `text`: Text that should be associated with that node for letter-navigation. If none is provided, focus-group will check for a `data-focus-group-text` attribute or fallback to the node's `textContent.

Returns the focus group instance.

### focusGroup.getMembers()

Returns the focus group's current array of members.

Each item in the array is an object with `node` and `text` properties.

### focusGroup.focusNodeAtIndex(index)

Focuses the node at a particular index in the focus group's member array.

If no member exists at that index, does nothing.

Returns the focus group instance.

### focusGroup.moveFocusForward()

Moves the focus forward one member, if focus is already within the group.

If focus is not within the group, does nothing.

Returns the index of the newly focused member.

### focusGroup.moveFocusBack()

Moves the focus back one member, if focus is already within the group.

If focus is not within the group, does nothing.

Returns the index of the newly focused member.

## Contributing

Please note that this project is released with a Contributor Code of Conduct.
By participating in this project you agree to abide by its terms.
