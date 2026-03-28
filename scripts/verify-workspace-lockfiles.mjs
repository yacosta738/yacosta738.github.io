import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const workspaceFile = path.join(repoRoot, "pnpm-workspace.yaml");
const workspaceConfig = await readFileUtf8(workspaceFile);
const workspacePatterns = readWorkspacePatterns(workspaceConfig);
const workspaceDirs = await expandWorkspacePatterns(
	workspacePatterns,
	repoRoot,
);

const violations = [];

for (const workspaceDir of workspaceDirs) {
	const lockfilePath = path.join(workspaceDir, "pnpm-lock.yaml");
	if (await pathExists(lockfilePath)) {
		violations.push({
			packagePath: path.relative(repoRoot, workspaceDir),
			lockfilePath: path.relative(repoRoot, lockfilePath),
			message:
				"Workspace packages are managed by the root pnpm-lock.yaml. Update dependencies from the repository root and do not commit nested workspace lockfiles.",
		});
	}
}

if (violations.length > 0) {
	console.error("Workspace lockfile policy violation(s) found:\n");
	for (const violation of violations) {
		console.error(`- ${violation.lockfilePath}`);
		console.error(`  package: ${violation.packagePath}`);
		console.error(`  fix: ${violation.message}`);
	}
	process.exit(1);
}

console.log(
	"Workspace lockfile check passed. Update dependencies for packages/notion-astro-loader from the repository root so pnpm-lock.yaml stays canonical.",
);

function readWorkspacePatterns(content) {
	const lines = content.split(/\r?\n/);
	const patterns = [];
	let inPackages = false;

	for (const rawLine of lines) {
		const line = rawLine.trimEnd();

		if (!inPackages) {
			if (line.trim() === "packages:") {
				inPackages = true;
			}
			continue;
		}

		const trimmed = line.trim();
		if (trimmed === "" || trimmed.startsWith("#")) {
			continue;
		}

		if (
			!rawLine.startsWith(" ") &&
			!rawLine.startsWith("\t") &&
			!trimmed.startsWith("- ")
		) {
			break;
		}

		if (trimmed.startsWith("- ")) {
			patterns.push(trimmed.slice(2).replace(/^['"]|['"]$/g, ""));
		}
	}

	if (patterns.length === 0) {
		throw new Error("No workspace package globs found in pnpm-workspace.yaml.");
	}

	return patterns;
}

async function expandWorkspacePatterns(patterns, rootDir) {
	const workspaceDirs = new Set();

	for (const pattern of patterns) {
		if (pattern.endsWith("/*")) {
			const parentDir = path.join(rootDir, pattern.slice(0, -2));
			if (!(await pathExists(parentDir))) {
				continue;
			}

			const entries = await readdir(parentDir, { withFileTypes: true });
			for (const entry of entries) {
				if (!entry.isDirectory()) {
					continue;
				}
				workspaceDirs.add(path.join(parentDir, entry.name));
			}
			continue;
		}

		const workspaceDir = path.join(rootDir, pattern);
		if (await pathExists(workspaceDir)) {
			workspaceDirs.add(workspaceDir);
		}
	}

	return [...workspaceDirs].sort();
}

async function pathExists(targetPath) {
	try {
		await stat(targetPath);
		return true;
	} catch (error) {
		if (
			error &&
			typeof error === "object" &&
			"code" in error &&
			error.code === "ENOENT"
		) {
			return false;
		}
		throw error;
	}
}

async function readFileUtf8(filePath) {
	return readFile(filePath, "utf8");
}
