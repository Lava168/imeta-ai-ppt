#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const args = process.argv.slice(2);

if (args[0] !== "run" || !args[1]) {
  console.error("This local npm shim currently supports: npm run <script>");
  process.exit(1);
}

const scriptName = args[1];
const scriptArgs = args.slice(2);
const packageJson = require(path.join(process.cwd(), "package.json"));
const script = packageJson.scripts?.[scriptName];

if (!script) {
  console.error(`Missing script: ${scriptName}`);
  process.exit(1);
}

const binPath = path.join(process.cwd(), "node_modules", ".bin");
const env = {
  ...process.env,
  PATH: `${binPath}${path.delimiter}${process.env.PATH ?? ""}`,
};

const result = spawnSync(script, scriptArgs, {
  cwd: process.cwd(),
  env,
  shell: true,
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
