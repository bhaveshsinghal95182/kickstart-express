#! /usr/bin/env node
import { Command } from "commander";
import { Scaffolder } from "./core/scaffolder.js";
import { Adder } from "./core/adder.js";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Get current version from package.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagePath = path.join(__dirname, "package.json");
const packageJson = await fs.readJson(packagePath);
const version = packageJson.version;

const program = new Command();

// Graceful handling for Ctrl+C (SIGINT)
let scaffolder = null;

process.on("SIGINT", async () => {
  console.log("\n");
  console.log(chalk.yellow("⚠️  Operation cancelled by user"));

  if (scaffolder && scaffolder.isProjectCreationInProgress()) {
    console.log(chalk.yellow("🧹 Cleaning up partially created project..."));
    try {
      await scaffolder.cleanup();
    } catch (error) {
      console.log(chalk.red("⚠️  Error during cleanup:"), error.message);
    }
  }

  console.log(chalk.blue("👋 Thanks for using kickstart-express!"));
  process.exit(130); // Standard exit code for SIGINT
});

program
  .name("kickstart-express")
  .description(
    "A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices"
  )
  .version(version);



// Add command for adding features to existing projects
program
  .command("add <feature>")
  .description(
    "Add features to an existing kickstart-express project\n\nAvailable features:\n  db, database    Add database support (MongoDB/PostgreSQL with Mongoose/Prisma/Drizzle)\n  auth            Add authentication support (JWT or Clerk)"
  )
  .option("--db-type <type>", "database type (mongodb, postgres)")
  .option("--orm <orm>", "ORM/ODM to use (mongoose, prisma, drizzle)")
  .option("--auth-type <type>", "authentication type (jwt, clerk)")
  .action(async (feature, options) => {
    // Extract CLI options for the add command
    const addOptions = {};
    if (options.dbType) addOptions.dbType = options.dbType;
    if (options.orm) addOptions.orm = options.orm;
    if (options.authType) addOptions.authType = options.authType;
    
    const adder = new Adder(addOptions);
    await adder.run(feature);
  });

// Check if this is an "add" command, otherwise default to scaffolding
const isAddCommand = process.argv.includes("add");

if (!isAddCommand) {
  // Default behavior - scaffold a new project
  program
    .option("-n, --name <project-name>", "project name")
    .option("-l, --language <ts|js>", "language to use (ts or js)")
    .option("-d, --docker", "include Dockerfile")
    .option("-s, --src", "include src folder")
    .option(
      "--structured",
      "use structured src/ (routes, controllers, services)"
    )
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
  if (providedArgs.includes("--docker") || providedArgs.includes("-d")) {
    cliOptions.docker = true;
  }
  if (providedArgs.includes("--src") || providedArgs.includes("-s")) {
    cliOptions.src = true;
  }
  if (providedArgs.includes("--structured")) {
    cliOptions.structuredSrc = true;
  }

  scaffolder = new Scaffolder(cliOptions);
  await scaffolder.run();
}

program.parse(process.argv);
