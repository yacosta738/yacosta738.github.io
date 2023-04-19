# teeny-tap

**Status: Experimental, Under Active Development**

Listen for both clicks and click-like touches (not scrolls or drags).

This library is very small and simple and focused, without any dependencies.
It is not a touch gesture library or a complete fastclick-style solution.
Plenty of similar libraries exist, but none of them seemed exactly right for
my simple needs. For more about the purpose of the library, read ["Why?"](#why).

This library is heavily inspired by [tap.js](https://github.com/alexgibson/tap.js),
which is no longer maintained.

**[Check out the demo](http://davidtheclark.github.io/teeny-tap/demo/).**

(If the demo works on your phone, would you mind tweeting me your specs,
`@davidtheclark`? That way I can list the devices where we know it works.
And of course let me know if you find any bugs!)

## Installation

```
npm install teeny-tap
```

You will need to be compiling CommonJS modules (browserify or webpack).

### Browser Support

IE9+ and everything help, I hope. Testing underway.
(If you can help out by trying the demo on your mobile device, please do!)

## Usage

```js
var createTapListener = require('teeny-tap');

var docTapListener = createTapListener(document.documentElement, function(e) {
  console.log('A tap happened!');
});

// ...
docTapListener.remove();
```

That's it. Very simple. You create and remove listeners.

### API

#### `var tapListenerInstance = createTapListener(element, callback[, useCapture])`

Adds a tap listener on `element`, using `addEventListener()`.
When there's a tap, `callback` is invoked with
the relevant `event` as its argument (either a `click` or `touchend` event).

**Returns an object with a `remove` function, for removing the listener.**

#### `tapListenerInstance.remove()`

Remove the listener that you added when you created `tapListenerInstance`.

## Why?

For
[react-aria-menubutton](https://github.com/davidtheclark/react-aria-menubutton),
I need to close an open menu when the user taps/clicks outside of it.

The click event wasn't reliable: mobile Safari screws it up.
So I needed to **distinguish, on touch devices, between *touches
that are scrolling or dragging* and *touches that are clicking*,
in situations where the regular `click` event doesn't work**.
Existing solutions that I found weren't satisfactory for a few reasons:

- jQuery or other dependencies I didn't want or need.

- Many just threw in a `touchstart` or `touchend`
listener, in addition to the click; but that alone won't distinguish
between tapping and scrolling/dragging, so it's insufficient.
The menu might close when you, say, scroll down in order to see more of it.
Egad!

- One solution to the detect-clicks-outside-an-element problem is to add an
underlay that covers the page, beneath the element, and listen for clicks on that.
However, this prevents the click from getting through and actually
*doing* something; so if I click a link outside the open menu,
that click only closes the menu, and I have to click *again* to
go where I wanted to go. Non-optimal.

- A number of solutions just use `click` events, which won't
work on most browsers on most iPhones and iPads, due to
mobile Safari's unique and unpleasant handling of click events.

- Some went the other way, and had more fine-tuning than I want or need.

[tap.js](https://github.com/alexgibson/tap.js) pretty much provided exactly what I needed,
but that library is no longer maintained so I made this one to carry the torch,
to fill the need.

But know that *I do not like that this exists, do not want it to need to exist*.
If you know of a way to accomplish the same goal without this library,
please let me know!
