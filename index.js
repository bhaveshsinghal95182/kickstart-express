#! /usr/bin/env node
import { Command } from 'commander';
import { Scaffolder } from "./core/scaffolder.js";
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
  .version('1.3.0')
  .option('-n, --name <project-name>', 'project name')
  .option('-l, --language <ts|js>', 'language to use (ts or js)')
  .option('-d, --docker', 'include Dockerfile')
  .option('-s, --src', 'include src folder')
  .option('--structured', 'use structured src/ (routes, controllers, services)')
  .parse(process.argv);

const options = program.opts();

// Convert CLI options to the format expected by Scaffolder
// Only include options that were explicitly provided
const cliOptions = {};
if (options.name) cliOptions.projectName = options.name;
if (options.language) cliOptions.language = options.language;

// For boolean flags, check if they were explicitly provided by checking if they're in the process.argv
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
