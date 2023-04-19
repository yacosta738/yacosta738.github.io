# hast-util-to-mdast

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**hast**][hast] utility to transform to [**mdast**][mdast].

> **Note**: You probably want to use [rehype-remark][].

## Install

[npm][]:

```sh
npm install hast-util-to-mdast
```

## Use

Say we have the following `example.html`:

```html
<h2>Hello <strong>world!</strong></h2>
```

…and next to it, `example.js`:

```js
var unified = require('unified')
var parse = require('rehype-parse')
var stringify = require('remark-stringify')
var vfile = require('to-vfile')
var toMdast = require('hast-util-to-mdast')

var file = vfile.readSync('example.html')

var hast = unified()
  .use(parse)
  .parse(file)

var mdast = toMdast(hast)

var doc = unified()
  .use(stringify)
  .stringify(mdast)

console.log(doc)
```

Now, running `node example.js` yields:

```markdown
## Hello **world!**
```

## API

### `toMdast(tree[, options])`

Transform the given [**hast**][hast] [*tree*][tree] to [**mdast**][mdast].

##### Options

###### `options.handlers`

Object mapping tag names or [*types*][type] to functions handling those
[*elements*][element] or [*nodes*][hast-node].
See [`handlers/`][handlers] for examples.

In a handler, you have access to `h`, which should be used to create mdast nodes
from hast nodes.
On `h`, there are fields that may be of interest.
Most interesting of them is `h.wrapText`, which is `true` if the mdast content
can include newlines, and `false` if not (such as in headings or table cells).

###### `options.document`

Whether the given [*tree*][tree] is a complete document.
Applies if the given `tree` is a [`root`][hast-root].
First its [*children*][child] are transformed to [**mdast**][mdast].
By default, if one or more of the new mdast children are [*phrasing*][phrasing]
nodes, and one or more are not, the phrasing nodes are wrapped in
[*paragraphs*][mdast-paragraph].
If `document: true`, all mdast phrasing children are wrapped in paragraphs.

###### `options.newlines`

Whether to collapse to a line feed (`\n`) instead of a single space (default) if
a streak of white-space in a text node contains a newline.

###### `options.checked`

Value to use when serializing a checked checkbox or radio input (`string`,
default: `[x]`).

###### `options.unchecked`

Value to use when serializing an unchecked checkbox or radio input (`string`,
default: `[ ]`).

###### `options.quotes`

List of quotes to use (`string[]`, default: `['"']`).
Each value can be one or two characters.
When two, the first character determines the opening quote and the second the
closing quote at that level.
When one, both the opening and closing quote are that character.
The order in which the preferred quotes appear determines which quotes to use at
which level of nesting.
So, to prefer `‘’` at the first level of nesting, and `“”` at the second, pass:
`['‘’', '“”']`.
If `<q>`s are nested deeper than the given amount of quotes, the markers wrap
around: a third level of nesting when using `['«»', '‹›']` should have double
guillemets, a fourth single, a fifth double again, etc.

##### Returns

[`MdastNode`][mdast-node].

##### Notes

###### Implied paragraphs

The algorithm supports implicit and explicit paragraphs (see [HTML Standard,
A. van Kesteren; et al. WHATWG § 3.2.5.4 Paragraphs][spec]), such as:

```html
<article>
  An implicit paragraph.
  <h1>An explicit paragraph.</h1>
</article>
```

Yields:

```markdown
An implicit paragraph.

# An explicit paragraph.
```

###### Ignoring nodes

Some [*nodes*][hast-node] are ignored and their content will not be present in
the [**mdast**][mdast] [*tree*][tree].
To ignore nodes, configure a [handler][] for their tag name or [*type*][type]
that returns nothing.
For example, to ignore `em` [*elements*][element], pass `handlers: {'em':
function () {}}`:

```html
<p><strong>Importance</strong> and <em>emphasis</em>.</p>
```

Yields:

```markdown
**Importance** and .
```

To ignore a specific element from the HTML source, set `data-mdast` to
`ignore`:

```html
<p><strong>Importance</strong> and <em data-mdast="ignore">emphasis</em>.</p>
```

Yields:

```markdown
**Importance** and .
```

###### HTML in Markdown

We try our best to map any HTML (hast) to Markdown (mdast) and keep it readable.
Readability is one of Markdown’s greatest features: it’s terser than HTML, such
as allowing `# Alpha` instead of `<h1>Alpha</h1>`.

Another awesome feature of Markdown is that you *can* author HTML inside it.
As we focus on readability we don’t do that, but you can by passing a handler.

Say we for example have this HTML, and want to embed the SVG inside Markdown as
well:

```html
<p>
  Some text with
  <svg viewBox="0 0 1 1" width="1" height="1"><rect fill="black" x="0" y="0" width="1" height="1" /></svg>
  a graphic… Wait is that a dead pixel?
</p>
```

This can be achieved with `example.js` like so:

```js
var unified = require('unified')
var parse = require('rehype-parse')
var stringify = require('remark-stringify')
var vfile = require('to-vfile')
var toHtml = require('hast-util-to-html')
var toMdast = require('hast-util-to-mdast')

var file = vfile.readSync('example.html')

var hast = unified()
  .use(parse)
  .parse(file)

var mdast = toMdast(hast, {handlers: {svg: svg}})

var doc = unified()
  .use(stringify)
  .stringify(mdast)

console.log(doc)

function svg(h, node) {
  return h(node, 'html', toHtml(node, {space: 'svg'}))
}
```

Yields:

```markdown
Some text with <svg viewBox="0 0 1 1" width="1" height="1"><rect fill="black" x="0" y="0" width="1" height="1"></rect></svg> a graphic… Wait is that a dead pixel?
```

## Security

Use of `hast-util-to-mdast` can open you up to a
[cross-site scripting (XSS)][xss] attack if the hast tree is unsafe.
Use [`hast-util-santize`][sanitize] to make the hast tree safe.

## Related

*   [`hast-util-to-nlcst`](https://github.com/syntax-tree/hast-util-to-nlcst)
    — transform hast to nlcst
*   [`hast-util-to-xast`](https://github.com/syntax-tree/hast-util-to-xast)
    — transform hast to xast
*   [`mdast-util-to-hast`](https://github.com/syntax-tree/mdast-util-to-hast)
    — transform mdast to hast
*   [`mdast-util-to-nlcst`](https://github.com/syntax-tree/mdast-util-to-nlcst)
    — transform mdast to nlcst
*   [`remark-rehype`](https://github.com/remarkjs/remark-rehype)
    — rehype support for remark
*   [`rehype-remark`](https://github.com/rehypejs/rehype-remark)
    — remark support for rehype

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/hast-util-to-mdast/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-to-mdast/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-to-mdast.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-to-mdast

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-to-mdast.svg

[downloads]: https://www.npmjs.com/package/hast-util-to-mdast

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-to-mdast.svg

[size]: https://bundlephobia.com/result?p=hast-util-to-mdast

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[tree]: https://github.com/syntax-tree/unist#tree

[child]: https://github.com/syntax-tree/unist#child

[type]: https://github.com/syntax-tree/unist#type

[mdast]: https://github.com/syntax-tree/mdast

[mdast-paragraph]: https://github.com/syntax-tree/mdast#paragraph

[mdast-node]: https://github.com/syntax-tree/mdast#nodes

[phrasing]: https://github.com/syntax-tree/mdast#phrasingcontent

[hast]: https://github.com/syntax-tree/hast

[hast-node]: https://github.com/syntax-tree/hast#nodes

[hast-root]: https://github.com/syntax-tree/hast#root

[element]: https://github.com/syntax-tree/hast#element

[rehype-remark]: https://github.com/rehypejs/rehype-remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[handler]: #optionshandlers

[handlers]: https://github.com/syntax-tree/hast-util-to-mdast/tree/main/lib/handlers

[spec]: https://html.spec.whatwg.org/#paragraphs
