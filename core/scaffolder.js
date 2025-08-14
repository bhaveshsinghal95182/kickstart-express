import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { exec as execCallback } from "child_process";
import { promisify } from "util";
import ora from "ora";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { getGitignoreContent } from "./lib/constants";

const exec = promisify(execCallback);

export class Scaffolder {
  constructor(cliOptions = {}) {
    this.projectName = cliOptions.projectName || "";
    this.options = {
      src: cliOptions.src !== undefined ? cliOptions.src : null,
      structuredSrc:
        cliOptions.structuredSrc !== undefined
          ? cliOptions.structuredSrc
          : null,
      docker: cliOptions.docker !== undefined ? cliOptions.docker : null,
      language: cliOptions.language || "ts", // Default to TypeScript
    };
    this.cliOptions = cliOptions;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    this.templatePath = path.resolve(__dirname, "../templates");

    // Track project creation state for cleanup
    this.projectCreationInProgress = false;
    this.projectPath = null;
  }

  async run() {
    await this.promptUser();
    this.projectPath = path.join(process.cwd(), this.projectName);
    this.projectCreationInProgress = true;

    await this.generateProject();

    console.log("⚙️  Initializing Git and installing dependencies...");
    await this.runCommands(this.projectPath);

    this.projectCreationInProgress = false;
    console.log(`\n✅ Project ${this.projectName} scaffolded successfully!`);
    console.log(`\nNavigate to your project and start developing:\n`);
    console.log(`  cd ${this.projectName}`);
    console.log(`  pnpm dev\n`);
  }

  async runCommands(projectPath) {
    const opts = { cwd: projectPath };
    const spinner = ora();

    try {
      await exec("git init", opts);
      await exec("git add -A", opts);
      await exec("git commit -am 'Initial commit'", opts);
      console.log("✓ Git repository initialized.");

      spinner.start("Installing dependencies with pnpm...");
      try {
        await exec("pnpm --version", opts);
        await exec("pnpm install", opts);
        spinner.succeed("Dependencies installed with pnpm.");
      } catch {
        spinner.start("pnpm not found, falling back to npm...");
        await exec("npm install", opts);
        spinner.succeed("Dependencies installed with npm.");
      }
    } catch (error) {
      if (spinner.isSpinning) {
        spinner.fail("Failed to install dependencies.");
      }
      console.error("\n❌ Error during setup:", error.stderr || error.message);
    }
  }

  async promptUser() {
    const prompts = [];

    // Only prompt for project name if not provided via CLI
    if (!this.projectName) {
      prompts.push({
        name: "projectName",
        message: "Project name?",
        default: "my-express-app",
      });
    }

    // Only prompt for language if not provided via CLI
    if (!this.cliOptions.language) {
      prompts.push({
        name: "language",
        type: "list",
        message: "Which language do you want to use?",
        choices: ["ts", "js"],
        default: "ts",
      });
    }

    // Only prompt for docker if not provided via CLI
    if (this.options.docker === null) {
      prompts.push({
        name: "docker",
        type: "confirm",
        message: "Include Dockerfile?",
      });
    }

    // Ask all questions at once if any are needed
    if (prompts.length > 0) {
      const answers = await inquirer.prompt(prompts);

      if (answers.projectName) this.projectName = answers.projectName;
      if (answers.language) this.options.language = answers.language;
      if (answers.docker !== undefined) this.options.docker = answers.docker;
    }

    // Only prompt for src folder if not provided via CLI
    if (this.options.src === null) {
      const { src } = await inquirer.prompt([
        {
          name: "src",
          type: "confirm",
          message: "Do you want a src folder?",
          default: true,
        },
      ]);
      this.options.src = src;

      // Show suggestion if user chooses no src folder
      if (!src) {
        console.log(
          "\n" + chalk.blue("💡 Suggestion:"),
          chalk.yellow(
            "For best use of Kickstart.express, consider using a 'src' folder with structured architecture."
          )
        );
        console.log(
          "  ",
          chalk.gray(
            "This provides better organization with controllers, services, and router separation."
          )
        );
        console.log(
          "  ",
          chalk.gray("You can still proceed with your current choice.\n")
        );
      }
    }

    // Only prompt for structured src if src folder is enabled and structured option not provided via CLI
    if (this.options.src && this.options.structuredSrc === null) {
      const { structured } = await inquirer.prompt([
        {
          name: "structured",
          type: "confirm",
          message: "Use structured src/ (router, controllers, services)?",
        },
      ]);
      this.options.structuredSrc = structured;
    }

    // If src folder is false, ensure structuredSrc is also false
    if (!this.options.src) {
      this.options.structuredSrc = false;
    }
  }

  async generateProject() {
    const dest = this.projectPath;

    if (this.options.language) {
      const languageFolder = this.options.language;
      await fs.copy(
        path.join(this.templatePath, "base", languageFolder),
        dest,
        { globOptions: { dot: true } }
      );
    }

    const envContent = "PORT=3000";
    const envPath = path.join(dest, ".env");
    await fs.writeFile(envPath, envContent);

    if (this.options.src) {
      const destSrcPath = path.join(dest, "src");

      if (this.options.structuredSrc) {
        // CASE: Structured src
        const sourceDir = path.join(
          this.templatePath,
          "modules",
          "src-structured",
          this.options.language
        );
        await fs.copy(sourceDir, destSrcPath);
      } else {
        // CASE: Simple src
        await fs.ensureDir(destSrcPath);
        const sourceFile = path.join(
          this.templatePath,
          "modules",
          "src",
          `index.${this.options.language}`
        );
        const destFile = path.join(
          destSrcPath,
          `index.${this.options.language}`
        );
        await fs.copy(sourceFile, destFile);
      }
    } else {
      // CASE: No src folder
      await fs.copy(path.join(this.templatePath, "modules", "no-src"), dest);
    }

    if (this.options.docker) {
      const language = this.options.language;

      // Copy Dockerfile
      const dockerfileSource = path.join(
        this.templatePath,
        "modules",
        "docker",
        language
      );
      await fs.copy(dockerfileSource, dest);
    }

    // Ensure .gitignore exists (runtime creation as backup)
    const gitignorePath = path.join(dest, ".gitignore");
    const gitignoreExists = await fs.pathExists(gitignorePath);
    if (!gitignoreExists) {
      console.log("📝 Creating .gitignore file...");
      await fs.writeFile(gitignorePath, getGitignoreContent());
    }

    // Update package.json name
    const pkgPath = path.join(dest, "package.json");
    const pkg = await fs.readJson(pkgPath);
    if (this.projectName === ".") {
      pkg.name = path.basename(process.cwd());
    } else {
      pkg.name = this.projectName;
    }

    // Update scripts based on src folder choice
    if (this.options.src) {
      if (this.options.language === "js") {
        pkg.scripts.dev = "nodemon src/index.js";
        pkg.scripts.start = "node src/index.js";
      } else if (this.options.language === "ts") {
        pkg.scripts.dev = "tsx watch src/index.ts";
      }
    } else {
      // No src folder - update TypeScript tsconfig.json if needed
      if (this.options.language === "ts") {
        const tsconfigPath = path.join(dest, "tsconfig.json");

        try {
          // Read the tsconfig file as text and try to parse it
          const tsconfigContent = await fs.readFile(tsconfigPath, "utf8");
          // Simple text replacement for the specific values we need to change
          const updatedContent = tsconfigContent
            .replace('"rootDir": "./src"', '"rootDir": "./"')
            .replace('"include": ["src/**/*.ts"]', '"include": ["*.ts"]');

          await fs.writeFile(tsconfigPath, updatedContent);
        } catch (error) {
          console.warn("Could not update tsconfig.json:", error.message);
        }
      }
    }

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

    // Generate components.json to track user setup
    const componentsConfig = this.generateComponentsJson();
    const componentsPath = path.join(dest, "components.json");
    await fs.writeJson(componentsPath, componentsConfig, { spaces: 2 });
    console.log(
      "📋 Generated components.json to track your setup configuration."
    );
  }

  // Generate components.json to track user setup
  generateComponentsJson() {
    const config = {
      name: this.projectName,
      language: this.options.language,
      architecture: {
        src: this.options.src,
        structured: this.options.structuredSrc,
        docker: this.options.docker,
      },
      generated: new Date().toISOString(),
      version: "1.3.3",
    };

    // Add suggestion if user chose single index file structure
    if (!this.options.src) {
      config.suggestion = {
        recommended: "src-structured",
        reason:
          "Better organization and scalability for Express.js applications. Consider using 'src' folder with structured architecture (controllers, services, router) for best use of Kickstart.express.",
      };
    }

    return config;
  }

  // Methods for graceful error handling
  isProjectCreationInProgress() {
    return this.projectCreationInProgress;
  }

  async cleanup() {
    if (this.projectPath && (await fs.pathExists(this.projectPath))) {
      try {
        await fs.remove(this.projectPath);
        console.log(
          `🗑️  Removed partially created project: ${this.projectName}`
        );
      } catch (error) {
        console.log(`⚠️  Could not remove project directory: ${error.message}`);
        console.log(`📁 Please manually remove: ${this.projectPath}`);
      }
    }
  }
}
