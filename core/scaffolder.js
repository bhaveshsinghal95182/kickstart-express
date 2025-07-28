import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { exec as execCallback } from "child_process";
import { promisify } from "util";
import ora from "ora";

const exec = promisify(execCallback);

export class Scaffolder {
  constructor() {
    this.projectName = "";
    this.options = {
      src: false,
      structuredSrc: false,
      docker: false,
      language: "ts",
    };
    this.templatePath = path.resolve(
      new URL(import.meta.url).pathname,
      "../../templates"
    );
  }

  async run() {
    await this.promptUser();
    const projectPath = path.join(process.cwd(), this.projectName);

    await this.generateProject();

    console.log("⚙️  Initializing Git and installing dependencies...");
    await this.runCommands(projectPath);

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
      console.log("✓ Git repository initialized.");

      spinner.start("Installing dependencies with pnpm...");
      await exec("pnpm install", opts);
      spinner.succeed("Dependencies installed with pnpm.");
    } catch (error) {
      if (spinner.isSpinning) {
        spinner.fail("Failed to install dependencies.");
      }
      console.error("\n❌ Error during setup:", error.stderr || error.message);
    }
  }

  async promptUser() {
    const answers = await inquirer.prompt([
      {
        name: "projectName",
        message: "Project name?",
        default: "my-express-app",
      },
      {
        name: "language",
        type: "list",
        message: "Which language do you want to use?",
        choices: ["ts", "js"],
        default: "ts",
      },
      { name: "docker", type: "confirm", message: "Include Dockerfile?" },
    ]);

    this.projectName = answers.projectName;
    this.options.docker = answers.docker;
    this.options.language = answers.language;

    // This logic can also be simplified to always ask
    const { src } = await inquirer.prompt([
      {
        name: "src",
        type: "confirm",
        message: "Do you want a src folder?",
        default: true,
      },
    ]);
    this.options.src = src;

    if (this.options.src) {
      const { structured } = await inquirer.prompt([
        {
          name: "structured",
          type: "confirm",
          message: "Use structured src/ (routes, controllers, services)?",
        },
      ]);
      this.options.structuredSrc = structured;
    }
  }

  async generateProject() {
    const dest = path.join(process.cwd(), this.projectName);

    if (this.options.language) {
      const languageFolder = this.options.language;
      await fs.copy(path.join(this.templatePath, "base", languageFolder), dest);
    }

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
        language,
      );
      await fs.copy(dockerfileSource, dest);
    }

    // Update package.json name
    const pkgPath = path.join(dest, "package.json");
    const pkg = await fs.readJson(pkgPath);
    pkg.name = this.projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }
}
