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
const parsedJson = new Map();

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

function stripJsonComments(input) {
  let output = "";
  let inString = false;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const nextCharacter = input[index + 1];

    if (inLineComment) {
      if (character === "\n") {
        inLineComment = false;
        output += character;
      }
      continue;
    }

    if (inBlockComment) {
      if (character === "*" && nextCharacter === "/") {
        inBlockComment = false;
        index += 1;
      } else if (character === "\n") {
        output += character;
      }
      continue;
    }

    if (inString) {
      output += character;

      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
      output += character;
      continue;
    }

    if (character === "/" && nextCharacter === "/") {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (character === "/" && nextCharacter === "*") {
      inBlockComment = true;
      index += 1;
      continue;
    }

    output += character;
  }

  return output.replace(/^\uFEFF/, "").trim();
}

function parseThemeJson(file) {
  const raw = readFileSync(join(root, file), "utf8");
  const cleaned = stripJsonComments(raw);
  return JSON.parse(cleaned);
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
    parsedJson.set(file, parseThemeJson(file));
  } catch (error) {
    errors.push(`Invalid JSON in ${file}: ${error.message}`);
  }
}

const templateFiles = walk("templates").filter((file) => extname(file) === ".json");
for (const file of templateFiles) {
  const template = parsedJson.get(file);
  if (!template) continue;

  for (const section of Object.values(template.sections ?? {})) {
    const type = section?.type;
    if (
      typeof type !== "string" ||
      type.startsWith("@") ||
      type.startsWith("shopify://apps/")
    ) {
      continue;
    }

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
