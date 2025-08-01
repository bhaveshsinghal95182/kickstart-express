#! /usr/bin/env node
import { Command } from 'commander';
import { Scaffolder } from "./core/scaffolder.js";

const program = new Command();

program
  .name('kickstart-express')
  .description('A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices')
  .version('1.1.3')
  .option('-n, --name <project-name>', 'project name')
  .option('-l, --language <ts|js>', 'language to use (ts or js)', 'ts')
  .option('-d, --docker', 'include Dockerfile', false)
  .option('-s, --src', 'include src folder', false)
  .option('--structured', 'use structured src/ (routes, controllers, services)', false)
  .parse(process.argv);

const options = program.opts();

// Convert CLI options to the format expected by Scaffolder
const cliOptions = {};
if (options.name) cliOptions.projectName = options.name;
if (options.language) cliOptions.language = options.language;
if (options.docker !== undefined) cliOptions.docker = options.docker;
if (options.src !== undefined) cliOptions.src = options.src;
if (options.structured !== undefined) cliOptions.structuredSrc = options.structured;

const scaffolder = new Scaffolder(cliOptions);
await scaffolder.run();
