# rehype-accessible-emojis

Written in Typescript

As I couldn't get [gatsby-remark-a11y-emoji](https://github.com/florianeckerstorfer/gatsby-remark-a11y-emoji) working with [gatsby-plugin-mdx](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx#readme) I made this rehype version to make **emojis accessible** by wrapping them in a `<span role="image">` with `aria-label` set to the emojis description based on [gemoji](https://github.com/github/gemoji/).

So

```
😅
```

turns into

```html
<span role="img" aria-label="smiling face with open mouth &amp; cold sweat">
  😅
</span>
```

so screenreaders and other assistive technology can understand the emojis and act accordingly by for example reading the `aria-label`.

## Install

```bash
yarn add -D rehype-accessible-emojis
# or
npm i -D rehype-accessible-emojis
```

## Usage

### Using Rehype

Given an `example.html` like

```html
<h1>Hello World!</h1>

<p>👋 Hi, I love emojis a lot 🤓</p>
```

and `example.js` like

```js
import vfile from 'to-vfile'
import rehype from 'rehype'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'

rehype()
  .use(rehypeAccessibleEmojis)
  .process(vfile.readSync('example.html'), (_, file) => {
    console.log(String(file))
  })
```

running `node example` results in

```html
<h1>Hello World!</h1>

<p>
  <span role="image" aria-label="waving hand">👋</span> Hi, I love emojis a lot
  <span role="image" aria-label="nerd face">🤓</span>
</p>
```

### Using gatsby-plugin-mdx

```js
// gatsby-config.js
{
  resolve: `gatsby-plugin-mdx`,
  options: {
    rehypePlugins: [require(`rehype-accessible-emojis`).rehypeAccessibleEmojis],
  },
}
```

## Options

`options.ignore` (Array, default: `['title', 'script', 'style', 'svg', 'math']`)  
Tag-names of parents to ignore, to not wrap an emoji within a `<script>` for example.  
Will be merged with the defaults.

## Mentioned in

- [Rehype's Plugin List](https://github.com/rehypejs/rehype/blob/master/doc/plugins.md)

## License

[MIT](/license) © [Can Rau](https://www.canrau.com)
