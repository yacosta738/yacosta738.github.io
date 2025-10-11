import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the base articles directory
const BASE_ARTICLES_DIR = path.join(__dirname, "..", "src/data", "articles");
// Add dry run option to preview changes without applying them
const DRY_RUN = process.argv.includes("--dry-run");
// Parse directories from command line arguments or use all subdirectories
const specifiedDirs = process.argv
	.slice(2)
	.filter((arg) => !arg.startsWith("--"));

function organizeArticlesByDate() {
	try {
		console.log("Organizing Markdown files by date...");

		// Get language directories to process
		const langDirs =
			specifiedDirs.length > 0 ? specifiedDirs : getLanguageDirectories();

		if (langDirs.length === 0) {
			console.log("No language directories found or specified");
			return;
		}

		console.log(`Processing language directories: ${langDirs.join(", ")}`);

		// Process each language directory
		for (const langDir of langDirs) {
			processLanguageDirectory(langDir);
		}

		console.log("Process completed!");
	} catch (error) {
		console.error("Error:", error.message);
	}
}

function getLanguageDirectories() {
	// Get all subdirectories in the base articles directory
	return fs
		.readdirSync(BASE_ARTICLES_DIR, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
}

function processLanguageDirectory(langDir) {
	const langPath = path.join(BASE_ARTICLES_DIR, langDir);
	console.log(`\nProcessing language directory: ${langDir}`);

	try {
		// Find all markdown files directly in this language directory
		const files = fs
			.readdirSync(langPath)
			.filter((file) => [".md", ".mdx"].includes(path.extname(file)));

		if (files.length === 0) {
			console.log(`No Markdown files found in ${langDir} folder`);
			return;
		}

		for (const file of files) {
			const filePath = path.join(langPath, file);
			processFile(filePath, file, langDir);
		}
	} catch (error) {
		console.error(`Error processing ${langDir} directory:`, error.message);
	}
}

function processFile(filePath, fileName, langDir) {
	try {
		const content = fs.readFileSync(filePath, "utf8");
		const { data: frontmatter } = matter(content);

		if (!frontmatter.date) {
			console.warn(`⚠️  File ${fileName} has no date - skipping`);
			return;
		}

		const date =
			frontmatter.date instanceof Date
				? frontmatter.date
				: new Date(frontmatter.date);

		if (Number.isNaN(date.getTime())) {
			console.warn(`⛔  Invalid date in ${fileName}: ${frontmatter.date}`);
			return;
		}

		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");

		// Create date path inside language directory
		const newDir = path.join(BASE_ARTICLES_DIR, langDir, year, month, day);

		if (!fs.existsSync(newDir)) {
			fs.mkdirSync(newDir, { recursive: true });
			console.log(`📂 Folder created: ${newDir}`);
		}

		const newPath = path.join(newDir, fileName);
		if (fs.existsSync(newPath)) {
			console.warn(`⚠️  File already exists at ${newPath} - skipping`);
			return;
		}

		if (!DRY_RUN) {
			fs.renameSync(filePath, newPath);
		}

		console.log(
			`${DRY_RUN ? "[DRY RUN] Would move" : "✅ Moved"}: ${fileName} -> ${newPath.replace(BASE_ARTICLES_DIR, "")}`,
		);
	} catch (error) {
		console.error(`❌ Error processing ${fileName}:`, error.message);
	}
}

organizeArticlesByDate();
