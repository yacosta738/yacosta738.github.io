import { spawn } from "node:child_process";

const shouldSync = process.env.NOTION_SYNC === "1";

if (!shouldSync) {
	process.exit(0);
}

const run = (command) =>
	new Promise((resolve, reject) => {
		const child = spawn(command, { stdio: "inherit", shell: true });
		child.on("close", (code) => {
			if (code === 0) {
				resolve();
				return;
			}
			reject(new Error(`Command failed: ${command}`));
		});
	});

await run("pnpm notion:sync-authors");
await run("pnpm notion:sync-taxonomy");
