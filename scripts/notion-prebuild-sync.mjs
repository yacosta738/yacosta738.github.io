import { spawn } from "node:child_process";

// ── Notion connectivity diagnostic (safe: only prints masked values) ──
const notionToken = process.env.NOTION_TOKEN;
const notionDbId = process.env.NOTION_DATABASE_ID;
const mask = (v) => (v ? `${v.slice(0, 8)}...${v.slice(-4)} (len=${v.length})` : "<not set>");
console.log(`[notion-diag] NOTION_TOKEN  = ${mask(notionToken)}`);
console.log(`[notion-diag] NOTION_DATABASE_ID = ${mask(notionDbId)}`);
if (notionToken && notionDbId) {
	try {
		const res = await fetch(`https://api.notion.com/v1/databases/${notionDbId}`, {
			headers: { Authorization: `Bearer ${notionToken}`, "Notion-Version": "2022-06-28" },
		});
		const body = await res.json();
		console.log(`[notion-diag] API status=${res.status} object=${body.object ?? body.code} title=${body.title?.[0]?.plain_text ?? body.message ?? "?"}`);
	} catch (e) {
		console.log(`[notion-diag] fetch error: ${e.message}`);
	}
}
// ── End diagnostic ──

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
