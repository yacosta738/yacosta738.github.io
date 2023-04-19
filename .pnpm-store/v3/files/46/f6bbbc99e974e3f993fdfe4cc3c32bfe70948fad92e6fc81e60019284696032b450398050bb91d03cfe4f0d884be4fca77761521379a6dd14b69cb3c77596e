# JavaScript Diff Parser

![](https://pbs.twimg.com/media/ByZVWXgIIAA5Y2D.png:large)

Credit: [@eightballart](https://twitter.com/EightballArt/status/515195030546690048)

Parse unified diffs with JavaScript

## Installation

what-the-diff is available via npm

    npm install what-the-diff


## Usage

```javascript
let {parse} = require('what-the-diff')

var str = `diff --git file.txt file.txt
index 83db48f..bf269f4 100644
--- file.txt
+++ file.txt
@@ -1,3 +1,3 @@
line1
-line2
+new line
line3`

parse(diffStr)

// returns
  {
    oldPath: 'file.txt',
    newPath: 'file.txt',
    oldMode: '100644',
    newMode: '100644',
    status: 'modified',
    hunks: [
      {
        oldStartLine: 1,
        oldLineCount: 3,
        newStartLine: 1,
        newLineCount: 3,
        lines: [
          ' line1',
          '-line2',
          '+new line',
          ' line3'
        ]
      }
    ]
  }
```

If the diff includes a similarity index line (from a detected copy or rename), the `similarity` property will be set, and will be a number.
