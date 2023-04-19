# [files-pipe] 🧪

## Installation

First, install the `files-pipe` component like so:

```
npm install -D -E files-pipe
```

Then, create a new pipe from this component:

**`index.ts`**

```ts
import { files } from "files-pipe";

await new files().in("./input");
```

## Getting started

The `files-pipe` will now provide you with a `pipe` method which you can use to
execute the callback on each file from the pipe.

**`index.ts`**

```ts
import { files } from "files-pipe";

await (
	await (await new files().in("./input")).by("**/*.md")
).pipe({
	// Prepend some content to all of the text files
	wrote: (ongoing) => (ongoing.buffer += "LICENSE [MIT]"),
});
```

These are the defaults for each callback.

```ts
import { files } from "files-pipe";

await new files().pipe({
	// Writes the buffer into a file
	wrote: async (ongoing) => ongoing.buffer,
	// Reads the file into a buffer
	read: async (ongoing) =>
		await fs.promises.readFile(ongoing.inputPath, "utf-8"),
	// Checks if the file has passed any checks
	passed: async () => true,
	// When file cannot be processed
	failed: async (inputPath) => `Error: Cannot process file ${inputPath}!`,
	// When the file is processed
	accomplished: async (ongoing) =>
		`Processed ${ongoing.inputPath} in ${ongoing.outputPath}.`,
	// When the whole plan is fulfilled
	fulfilled: async (plan) =>
		`Successfully processed a total of ${plan.files} ${
			plan.files === 1 ? "file" : "files"
		}.`,
	// When the plan has changed
	changed: async (plan) => plan,
});
```

You can add multiple paths to your pipe by specifying an array as the `path`
variable.

**`index.ts`**

```ts
import { files } from "files-pipe";

await new files().in(["./input", "./input2"]);
```

You can also provide a map of paths for different input output directories.

**`index.ts`**

```ts
import { files } from "files-pipe";

new files().in(new Map([["./input", "./output"]]));
```

You can provide a filter to exclude files from your pipe. A filter can be an
array of regexes or a single match. You can use functions, as well to match on
file names.

**`index.ts`**

```ts
import { files } from "files-pipe";

await new files().not([
	"my-awesome.file",
	(file: string) => file === "./input/this-file-will-not-be-processed.txt",
]);
```

Set `logger` to `0` if you do not want to see debug messages. Default is `2`.

**`index.ts`**

```ts
import { files } from "files-pipe";

new files(0);
```

[files-pipe]: https://npmjs.org/files-pipe

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this component.

[![Lightrix logo](https://raw.githubusercontent.com/Lightrix/npm/main/.github/img/favicon.png "Built with Lightrix/npm")](https://github.com/Lightrix/npm)
