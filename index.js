#! /usr/bin/env node
import { Command } from 'commander';
import { Scaffolder } from "./core/scaffolder.js";

const program = new Command();

program
  .name('kickstart-express')
  .description('A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices')
  .version('1.1.3')
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

const scaffolder = new Scaffolder(cliOptions);
await scaffolder.run();
