var diff = require('../')
var dedent = require('dedent-js')
var fs = require('fs')

var assert = require("nodeunit").assert

exports.testSimplePatch = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    index 83db48f..bf269f4 100644
    --- file.txt
    +++ file.txt
    @@ -1,3 +1,3 @@ class Thing {
     line1
    -line2
    +new line
     line3
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
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
          heading: 'class Thing {',
          lines: [
            ' line1',
            '-line2',
            '+new line',
            ' line3'
          ]
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testNewPatch = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    new file mode 100644
    index 0000000..dab621c
    --- /dev/null
    +++ file.txt
    @@ -0,0 +1 @@
    +foo
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: null,
      newPath: 'file.txt',
      oldMode: null,
      newMode: '100644',
      status: 'added',
      hunks: [
        {
          oldStartLine: 0,
          oldLineCount: 0,
          newStartLine: 1,
          newLineCount: 1,
          heading: '',
          lines: ['+foo']
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testRemovedPatch = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    deleted file mode 100644
    index dab621c..0000000
    --- file.txt
    +++ /dev/null
    @@ -1 +0,0 @@
    -foo
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'file.txt',
      newPath: null,
      oldMode: '100644',
      newMode: null,
      status: 'deleted',
      hunks: [
        {
          oldStartLine: 1,
          oldLineCount: 1,
          newStartLine: 0,
          newLineCount: 0,
          heading: '',
          lines: ['-foo']
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testFileModeChange = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    old mode 100644
    new mode 100755
    index 83db48f..bf269f4
    --- file.txt
    +++ file.txt
    @@ -1,3 +1,3 @@
     line1
    -line2
    +new line
     line3
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'file.txt',
      newPath: 'file.txt',
      oldMode: '100644',
      newMode: '100755',
      status: 'modified',
      hunks: [
        {
          oldStartLine: 1,
          oldLineCount: 3,
          newStartLine: 1,
          newLineCount: 3,
          heading: '',
          lines: [
            ' line1',
            '-line2',
            '+new line',
            ' line3'
          ]
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testNewEmptyFile = function(test) {
  var str = dedent`
    diff --git newfile.txt newfile.txt
    new file mode 100644
    index 0000000..e69de29
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: null,
      newPath: 'newfile.txt',
      oldMode: null,
      newMode: '100644',
      hunks: [],
      status: 'added',
      binary: false
    }
  ])
  test.done()
}

exports.testSingleLineHunk = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    index 83db48f..bf269f4 100644
    --- file.txt
    +++ file.txt
    @@ -1 +1 @@
    -line1
    +line2
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'file.txt',
      newPath: 'file.txt',
      oldMode: '100644',
      newMode: '100644',
      status: 'modified',
      hunks: [
        {
          oldStartLine: 1,
          oldLineCount: 1,
          newStartLine: 1,
          newLineCount: 1,
          heading: '',
          lines: [
            '-line1',
            '+line2'
          ]
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testMultipleHunks = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    index 83db48f..bf269f4 100644
    --- file.txt
    +++ file.txt
    @@ -1,5 +1,4 @@
     line1
    -line2
     line3
     line4
     line5
    @@ -15,4 +14,5 @@
     line6
     line7
     line8
    +line2
     line9
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'file.txt',
      newPath: 'file.txt',
      oldMode: '100644',
      newMode: '100644',
      status: 'modified',
      hunks: [
        {
          oldStartLine: 1,
          oldLineCount: 5,
          newStartLine: 1,
          newLineCount: 4,
          heading: '',
          lines: [
            ' line1',
            '-line2',
            ' line3',
            ' line4',
            ' line5'
          ]
        },
        {
          oldStartLine: 15,
          oldLineCount: 4,
          newStartLine: 14,
          newLineCount: 5,
          heading: '',
          lines: [
            ' line6',
            ' line7',
            ' line8',
            '+line2',
            ' line9'
          ]
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testRemovedEOFNL = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    index a999a0c..266014b 100644
    --- file.txt
    +++ file.txt
    @@ -1 +1 @@
    -line
    +line
    \ No newline at end of file
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'file.txt',
      newPath: 'file.txt',
      oldMode: '100644',
      newMode: '100644',
      status: 'modified',
      hunks: [
        {
          oldStartLine: 1,
          oldLineCount: 1,
          newStartLine: 1,
          newLineCount: 1,
          heading: '',
          lines: [
            '-line',
            '+line',
            '\ No newline at end of file'
          ]
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testAddedEOFNL = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    index 266014b..a999a0c 100644
    --- file.txt
    +++ file.txt
    @@ -1 +1 @@
    -line
    \ No newline at end of file
    +line
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'file.txt',
      newPath: 'file.txt',
      oldMode: '100644',
      newMode: '100644',
      status: 'modified',
      hunks: [
        {
          oldStartLine: 1,
          oldLineCount: 1,
          newStartLine: 1,
          newLineCount: 1,
          heading: '',
          lines: [
            '-line',
            '\ No newline at end of file',
            '+line'
          ]
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testEmptyHunkLine = function(test) {
  var str = dedent`
    diff --git file.txt file.txt
    index 83db48f..bf269f4 100644
    --- file.txt
    +++ file.txt
    @@ -1,3 +1,3 @@
     line1
    -line2
    +
     line3
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
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
          heading: '',
          lines: [
            ' line1',
            '-line2',
            '+',
            ' line3'
          ]
        }
      ],
      binary: false
    }
  ])
  test.done()
}

exports.testMergeConflicts = function(test) {
  var str = dedent`
    diff --cc modified-on-both.txt
    index 5b7855c,1353022..0000000
    --- modified-on-both.txt
    +++ modified-on-both.txt
    @@@ -1,1 -1,1 +1,7 @@@ some context
    ++<<<<<<< HEAD
     +master modification
    ++||||||| merged common ancestors
    ++text
    ++=======
    + branch modification
    ++>>>>>>> branch
    * Unmerged path removed-on-branch.txt
    * Unmerged path removed-on-master.txt
    diff --cc image.gif
    index e6551c7,5f88da9..0000000
    Binary files differ
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      filePath: 'modified-on-both.txt',
      status: 'unmerged',
      hunks: [
        {
          ourStartLine: 1,
          ourLineCount: 1,
          baseStartLine: 1,
          baseLineCount: 1,
          theirStartLine: 1,
          theirLineCount: 7,
          heading: 'some context',
          lines: [
            '++<<<<<<< HEAD',
            ' +master modification',
            '++||||||| merged common ancestors',
            '++text',
            '++=======',
            '+ branch modification',
            '++>>>>>>> branch'
          ]
        }
      ],
      binary: false
    },
    {
      filePath: 'removed-on-branch.txt',
      status: 'unmerged',
      binary: false
    },
    {
      filePath: 'removed-on-master.txt',
      status: 'unmerged',
      binary: false
    },
    {
      filePath: 'image.gif',
      status: 'unmerged',
      binary: true
    }
  ])
  test.done()
}

exports.testBinaryFiles = function(test) {
  var str = dedent`
    diff --git one.gif one.gif
    new file mode 100644
    index 0000000..9243b23
    Binary files /dev/null and one.gif differ
    diff --git two.gif two.gif
    index 9243b23..e26b70a 100644
    Binary files two.gif and two.gif differ
    diff --git three.gif three.gif
    deleted file mode 100644
    index e26b70a..0000000
    Binary files three.gif and /dev/null differ
    diff --git a/cat.png b/cat.png
    new file mode 100644
    index 0000000..8b8dc61
    --- /dev/null
    +++ b/cat.png
    Binary files differ
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: null,
      newPath: 'one.gif',
      oldMode: null,
      newMode: '100644',
      status: 'added',
      hunks: [],
      binary: true
    },
    {
      oldPath: 'two.gif',
      newPath: 'two.gif',
      oldMode: '100644',
      newMode: '100644',
      status: 'modified',
      hunks: [],
      binary: true
    },
    {
      oldPath: 'three.gif',
      newPath: null,
      oldMode: '100644',
      newMode: null,
      status: 'deleted',
      hunks: [],
      binary: true
    },
    {
      oldPath: null,
      newPath: 'b/cat.png',
      hunks: [],
      oldMode: null,
      newMode: '100644',
      status: 'added',
      binary: true
    }
  ])
  test.done()
}

exports.testBinaryFilesRename = function(test) {
  var str = dedent`
    diff --git a/dir_a/one.png b/dir_b/one.png
    similarity index 100%
    rename from dir_a/one.png
    rename to dir_b/one.png
    Binary files differ
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'dir_a/one.png',
      newPath: 'dir_b/one.png',
      hunks: undefined,
      status: 'renamed',
      similarity: 100
    }
  ])
  test.done()
}

exports.testNoPatch = function(test) {
  var str = dedent`
  diff --git file.txt file.txt
  old mode 100644
  new mode 100755
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'file.txt',
      newPath: 'file.txt',
      oldMode: '100644',
      newMode: '100755',
      status: 'modified',
      hunks: [],
      binary: false
    },
  ])
  test.done()
}

exports.testRenameCopy = function(test) {
  var str = dedent`
  diff --git old/file.png new/file.png
  similarity index 90%
  rename from old/file.png
  rename to new/file.png
  diff --git copy/file.png copy/file2.png
  similarity index 100%
  copy from copy/file.png
  copy to copy/file2.png
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: 'old/file.png',
      newPath: 'new/file.png',
      status: 'renamed',
      similarity: 90,
      hunks: [],
    },
    {
      oldPath: 'copy/file.png',
      newPath: 'copy/file2.png',
      status: 'copied',
      similarity: 100,
      hunks: [],
    },
  ])
  test.done()
}

exports.testRenameWithChangedLinesAndModeChange = function(test) {
  var str = dedent`
  diff --git file.txt rename-file.txt
  old mode 100644
  new mode 100755
  similarity index 76%
  rename from file.txt
  rename to rename-file.txt
  index 471a7b8..3e32ec2
  --- file.txt
  +++ rename-file.txt
  @@ -1,4 +1,5 @@
   foo
   bar
   baz
  +qux

  `;

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      oldPath: "file.txt",
      newPath: "rename-file.txt",
      oldMode: "100644",
      newMode: "100755",
      status: "renamed",
      similarity: 76,
      hunks: [{
        oldStartLine: 1,
        oldLineCount: 4,
        newStartLine: 1,
        newLineCount: 5,
        heading: '',
        lines: [' foo', ' bar', ' baz', '+qux']
      }]
    }
  ]);
  test.done()
}

exports.testMergeConflictNoPatch = function(test) {
  var str = dedent`
  diff --cc file-0.txt
  index 1fbec74,3bfc451..0000000
  --- file-0.txt
  +++ file-0.txt
  `

  const output = diff.parse(str)
  assert.deepEqual(output, [
    {
      filePath: 'file-0.txt',
      status: 'unmerged',
      hunks: [],
      binary: false
    }
  ])
  test.done()
}
