import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const requiredDirectories = [
  "assets",
  "blocks",
  "config",
  "layout",
  "locales",
  "sections",
  "snippets",
  "templates",
];

const errors = [];
const warnings = [];

function pathExists(path) {
  return existsSync(join(root, path));
}

function walk(directory) {
  const absolute = join(root, directory);
  if (!existsSync(absolute)) return [];

  return readdirSync(absolute).flatMap((entry) => {
    const fullPath = join(absolute, entry);
    const repoPath = relative(root, fullPath).replaceAll("\\", "/");
    return statSync(fullPath).isDirectory() ? walk(repoPath) : [repoPath];
  });
}

for (const directory of requiredDirectories) {
  if (!pathExists(directory)) {
    errors.push(`Missing required Shopify directory: ${directory}/`);
  }
}

if (!pathExists("layout/theme.liquid")) {
  errors.push("Missing required layout/theme.liquid file.");
}

const jsonFiles = ["config", "locales", "sections", "templates"]
  .flatMap(walk)
  .filter((file) => extname(file) === ".json");

for (const file of jsonFiles) {
  try {
    JSON.parse(readFileSync(join(root, file), "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${file}: ${error.message}`);
  }
}

const templateFiles = walk("templates").filter((file) => extname(file) === ".json");
for (const file of templateFiles) {
  let template;
  try {
    template = JSON.parse(readFileSync(join(root, file), "utf8"));
  } catch {
    continue;
  }

  for (const section of Object.values(template.sections ?? {})) {
    const type = section?.type;
    if (typeof type !== "string" || type.startsWith("@")) continue;

    const expectedSection = `sections/${type}.liquid`;
    if (!pathExists(expectedSection)) {
      errors.push(`${file} references missing section ${expectedSection}.`);
    }
  }
}

const liquidFiles = ["layout", "sections", "snippets", "templates"]
  .flatMap(walk)
  .filter((file) => extname(file) === ".liquid");

const assetReferencePattern = /["']([^"']+)["']\s*\|\s*asset_url/g;
for (const file of liquidFiles) {
  const source = readFileSync(join(root, file), "utf8");

  if (source.trim().length === 0) {
    warnings.push(`Empty Liquid placeholder: ${file}`);
  }

  for (const match of source.matchAll(assetReferencePattern)) {
    const assetName = match[1];
    const expectedAsset = `assets/${assetName}`;
    if (!pathExists(expectedAsset)) {
      warnings.push(`${file} references missing static asset ${expectedAsset}.`);
    }
  }
}

console.log(`Checked ${jsonFiles.length} JSON files and ${liquidFiles.length} Liquid files.`);

if (warnings.length > 0) {
  console.warn("\nWarnings:");
  for (const warning of [...new Set(warnings)].sort()) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("\nErrors:");
  for (const error of [...new Set(errors)].sort()) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("\nTheme structure validation passed.");
