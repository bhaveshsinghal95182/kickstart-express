#! /usr/bin/env node
import { Command } from 'commander';
import { Scaffolder } from "./core/scaffolder.js";
import { Adder } from "./core/adder.js";
import chalk from 'chalk';

const program = new Command();

// Graceful handling for Ctrl+C (SIGINT)
let scaffolder = null;

process.on('SIGINT', async () => {
  console.log('\n');
  console.log(chalk.yellow('⚠️  Operation cancelled by user'));
  
  if (scaffolder && scaffolder.isProjectCreationInProgress()) {
    console.log(chalk.yellow('🧹 Cleaning up partially created project...'));
    try {
      await scaffolder.cleanup();
    } catch (error) {
      console.log(chalk.red('⚠️  Error during cleanup:'), error.message);
    }
  }
  
  console.log(chalk.blue('👋 Thanks for using kickstart-express!'));
  process.exit(130); // Standard exit code for SIGINT
});

program
  .name('kickstart-express')
  .description('A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices')
  .version('1.3.0');

// Create command for scaffolding new projects
program
  .command('create')
  .description('Create a new Express.js project')
  .option('-n, --name <project-name>', 'project name')
  .option('-l, --language <ts|js>', 'language to use (ts or js)')
  .option('-d, --docker', 'include Dockerfile')
  .option('-s, --src', 'include src folder')
  .option('--structured', 'use structured src/ (routes, controllers, services)')
  .action(async (options) => {
    await runScaffolder(options);
  });

// Add command for adding features to existing projects
program
  .command('add <feature>')
  .description('Add features to an existing kickstart-express project')
  .action(async (feature) => {
    const adder = new Adder();
    await adder.run(feature);
  });

// Check if this is a legacy command (no subcommand specified)
const isLegacyCommand = process.argv.length > 2 && 
  !process.argv.includes('create') && 
  !process.argv.includes('add') &&
  !process.argv.includes('--help') && 
  !process.argv.includes('-h') &&
  !process.argv.includes('--version') &&
  !process.argv.includes('-V');

if (isLegacyCommand) {
  // Handle legacy behavior
  program
    .option('-n, --name <project-name>', 'project name')
    .option('-l, --language <ts|js>', 'language to use (ts or js)')
    .option('-d, --docker', 'include Dockerfile')
    .option('-s, --src', 'include src folder')
    .option('--structured', 'use structured src/ (routes, controllers, services)')
    .action(async () => {
      const options = program.opts();
      await runScaffolder(options);
    });
}

async function runScaffolder(options) {
  // Convert CLI options to the format expected by Scaffolder
  const cliOptions = {};
  if (options.name) cliOptions.projectName = options.name;
  if (options.language) cliOptions.language = options.language;

  // For boolean flags, check if they were explicitly provided
  const providedArgs = process.argv.slice(2);
  if (providedArgs.includes('--docker') || providedArgs.includes('-d')) {
    cliOptions.docker = true;
  }
  if (providedArgs.includes('--src') || providedArgs.includes('-s')) {
    cliOptions.src = true;
  }
  if (providedArgs.includes('--structured')) {
    cliOptions.structuredSrc = true;
  }

  scaffolder = new Scaffolder(cliOptions);
  await scaffolder.run();
}

program.parse(process.argv);
