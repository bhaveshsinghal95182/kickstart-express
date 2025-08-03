import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { exec as execCallback } from "child_process";
import { promisify } from "util";
import ora from "ora";
import chalk from "chalk";
import { fileURLToPath } from "url";

const exec = promisify(execCallback);

export class Adder {
  constructor() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    this.templatePath = path.resolve(__dirname, "../templates");
    this.currentDir = process.cwd();
    this.componentsPath = path.join(this.currentDir, "components.json");
    this.packagePath = path.join(this.currentDir, "package.json");
  }

  async run(feature) {
    console.log(chalk.blue(`🔧 Adding ${feature} to your project...`));

    // Check if components.json exists
    if (!await fs.pathExists(this.componentsPath)) {
      console.log(chalk.red("❌ components.json not found in current directory."));
      console.log(chalk.yellow("   This command only works in a kickstart-express project."));
      console.log(chalk.gray("   Make sure you're in a project created with kickstart-express."));
      return;
    }

    // Load project configuration
    try {
      this.components = await fs.readJson(this.componentsPath);
    } catch (error) {
      console.log(chalk.red("❌ Error reading components.json:"), error.message);
      return;
    }

    // Route to specific feature handler
    switch (feature.toLowerCase()) {
      case 'db':
      case 'database':
        await this.addDatabase();
        break;
      default:
        console.log(chalk.red(`❌ Unknown feature: ${feature}`));
        console.log(chalk.yellow("   Available features: db"));
        return;
    }
  }

  async addDatabase() {
    console.log(chalk.blue("📊 Adding database support to your project..."));
    console.log(chalk.gray(`   Project: ${this.components.name} (${this.components.language})`));

    // Prompt for database type and ORM
    const { dbType } = await inquirer.prompt([
      {
        name: "dbType",
        type: "list",
        message: "Which database do you want to use?",
        choices: [
          { name: "MongoDB", value: "mongodb" },
          { name: "PostgreSQL", value: "postgres" }
        ]
      }
    ]);

    // Get ORM choices based on database type
    let ormChoices = [];
    if (dbType === "mongodb") {
      ormChoices = [
        { name: "Mongoose", value: "mongoose" },
        { name: "Prisma", value: "prisma" }
      ];
    } else if (dbType === "postgres") {
      ormChoices = [
        { name: "Prisma", value: "prisma" },
        { name: "Drizzle", value: "drizzle" }
      ];
    }

    const { orm } = await inquirer.prompt([
      {
        name: "orm",
        type: "list",
        message: `Which ORM/ODM do you want to use with ${dbType === 'mongodb' ? 'MongoDB' : 'PostgreSQL'}?`,
        choices: ormChoices
      }
    ]);

    console.log(chalk.green(`\n✅ Selected: ${dbType === 'mongodb' ? 'MongoDB' : 'PostgreSQL'} with ${orm}`));

    // Apply the database template
    await this.applyDatabaseTemplate(dbType, orm);

    // Update components.json
    await this.updateComponents(dbType, orm);

    console.log(chalk.green("\n🎉 Database support added successfully!"));
    console.log(chalk.yellow("\n📝 Next steps:"));
    console.log(chalk.gray("   1. Install dependencies: pnpm install"));
    console.log(chalk.gray("   2. Configure your database connection in .env"));
    console.log(chalk.gray("   3. Check the generated files for usage examples"));
  }

  async applyDatabaseTemplate(dbType, orm) {
    const spinner = ora("Adding database files...").start();

    try {
      const templateSource = path.join(this.templatePath, "add", "db", dbType, orm, this.components.language);
      
      if (!await fs.pathExists(templateSource)) {
        spinner.fail(`Template not found for ${dbType}/${orm}/${this.components.language}`);
        return;
      }

      // Determine the correct destination based on project structure
      const hasSource = this.components.architecture.src;
      const isStructured = this.components.architecture.structured;

      // Copy database files
      if (hasSource) {
        const srcDir = path.join(this.currentDir, "src");
        await fs.copy(templateSource, srcDir, {
          overwrite: false, // Don't overwrite existing files
          errorOnExist: false
        });
      } else {
        await fs.copy(templateSource, this.currentDir, {
          overwrite: false,
          errorOnExist: false
        });
      }

      // Update package.json with new dependencies
      await this.updatePackageJson(dbType, orm);

      // Update .env with database configuration
      await this.updateEnvFile(dbType, orm);

      spinner.succeed("Database files added successfully");
    } catch (error) {
      spinner.fail("Failed to add database files");
      console.log(chalk.red("Error:"), error.message);
    }
  }

  async updatePackageJson(dbType, orm) {
    try {
      const pkg = await fs.readJson(this.packagePath);
      
      // Add dependencies based on database and ORM choice
      const dependencies = this.getDependencies(dbType, orm);
      
      pkg.dependencies = pkg.dependencies || {};
      Object.assign(pkg.dependencies, dependencies);

      await fs.writeJson(this.packagePath, pkg, { spaces: 2 });
      console.log(chalk.green("✓ Updated package.json with new dependencies"));
    } catch (error) {
      console.log(chalk.yellow("⚠️  Could not update package.json:"), error.message);
    }
  }

  getDependencies(dbType, orm) {
    const deps = {};

    if (dbType === "mongodb") {
      if (orm === "mongoose") {
        deps["mongoose"] = "^8.0.0";
      } else if (orm === "prisma") {
        deps["prisma"] = "^5.0.0";
        deps["@prisma/client"] = "^5.0.0";
      }
    } else if (dbType === "postgres") {
      if (orm === "prisma") {
        deps["prisma"] = "^5.0.0";
        deps["@prisma/client"] = "^5.0.0";
        deps["pg"] = "^8.11.0";
        if (this.components.language === "ts") {
          deps["@types/pg"] = "^8.10.0";
        }
      } else if (orm === "drizzle") {
        deps["drizzle-orm"] = "^0.29.0";
        deps["drizzle-kit"] = "^0.20.0";
        deps["postgres"] = "^3.4.0";
      }
    }

    return deps;
  }

  async updateEnvFile(dbType, orm) {
    try {
      const envPath = path.join(this.currentDir, ".env");
      let envContent = "";

      if (await fs.pathExists(envPath)) {
        envContent = await fs.readFile(envPath, "utf8");
      }

      // Add database configuration
      let dbConfig = "";
      if (dbType === "mongodb") {
        dbConfig = "\n# Database Configuration\nMONGODB_URI=mongodb://localhost:27017/your-database-name\n";
      } else if (dbType === "postgres") {
        if (orm === "prisma") {
          dbConfig = "\n# Database Configuration\nDATABASE_URL=postgresql://username:password@localhost:5432/your-database-name\n";
        } else if (orm === "drizzle") {
          dbConfig = "\n# Database Configuration\nDATABASE_URL=postgresql://username:password@localhost:5432/your-database-name\n";
        }
      }

      // Only add if not already present
      if (!envContent.includes("Database Configuration")) {
        envContent += dbConfig;
        await fs.writeFile(envPath, envContent);
        console.log(chalk.green("✓ Updated .env with database configuration"));
      }
    } catch (error) {
      console.log(chalk.yellow("⚠️  Could not update .env file:"), error.message);
    }
  }

  async updateComponents(dbType, orm) {
    try {
      this.components.features = this.components.features || {};
      this.components.features.database = {
        type: dbType,
        orm: orm,
        added: new Date().toISOString()
      };

      await fs.writeJson(this.componentsPath, this.components, { spaces: 2 });
      console.log(chalk.green("✓ Updated components.json"));
    } catch (error) {
      console.log(chalk.yellow("⚠️  Could not update components.json:"), error.message);
    }
  }
}