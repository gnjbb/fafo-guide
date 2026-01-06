#!/usr/bin/env node

/**
 * FAFO Guide CLI
 *
 * Entry point for npx fafo-guide install
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Detect if running via npx (npm's temp cache)
const isNpx = __dirname.includes('_npx') || __dirname.includes('.npm');

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  if (command === 'install') {
    // Dynamic import to handle ESM
    const { install } = await import('../src/commands/install.js');
    await install(process.cwd(), args.slice(1));
  } else if (command === 'version' || command === '--version' || command === '-v') {
    const pkg = await import('../package.json', { assert: { type: 'json' } });
    console.log(`fafo-guide v${pkg.default.version}`);
  } else {
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                      FAFO GUIDE                              ║
║         Find your perfect project in 20 minutes              ║
╚══════════════════════════════════════════════════════════════╝

Usage:
  npx fafo-guide install     Install wizard to current directory
  npx fafo-guide --version   Show version
  npx fafo-guide --help      Show this help

After installation:
  1. Open Claude Code in your project
  2. Say: "Run the fafo ideation workflow"
  3. Follow the prompts!

Learn more: https://github.com/gnjbb/fafo-guide
`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
