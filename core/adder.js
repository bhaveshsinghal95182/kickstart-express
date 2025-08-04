import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { exec as execCallback } from "child_process";
import { promisify } from "util";
import ora from "ora";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { Scaffolder } from "./scaffolder.js";

const exec = promisify(execCallback);

export class Adder {
  constructor(cliOptions = {}) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    this.templatePath = path.resolve(__dirname, "../templates");
    this.currentDir = process.cwd();
    this.componentsPath = path.join(this.currentDir, "components.json");
    this.packagePath = path.join(this.currentDir, "package.json");
    this.cliOptions = cliOptions;
  }

  async run(feature) {
    console.log(chalk.blue(`🔧 Adding ${feature} to your project...`));

    // Check if components.json exists
    if (!(await fs.pathExists(this.componentsPath))) {
      console.log(
        chalk.red("❌ components.json not found in current directory.")
      );
      console.log(
        chalk.yellow(
          "   This command only works in a kickstart-express project."
        )
      );
      
      // Ask if user wants to start a new kickstart project
      const { startNewProject } = await inquirer.prompt([
        {
          name: "startNewProject",
          type: "confirm",
          message: "Would you like to start a new kickstart-express project instead?",
          default: true,
        },
      ]);

      if (startNewProject) {
        console.log(chalk.blue("\n🚀 Starting a new kickstart-express project..."));
        
        // Create a new scaffolder and run it
        const scaffolder = new Scaffolder();
        await scaffolder.run();
        
        console.log(chalk.green("\n✨ Project created successfully!"));
        console.log(chalk.yellow(`💡 You can now run 'kickstart-express add ${feature}' inside your new project to add the ${feature} feature.`));
        return;
      } else {
        console.log(
          chalk.gray(
            "\n   Make sure you're in a project created with kickstart-express to use the add command."
          )
        );
        return;
      }
    }

    // Load project configuration
    try {
      this.components = await fs.readJson(this.componentsPath);
    } catch (error) {
      console.log(
        chalk.red("❌ Error reading components.json:"),
        error.message
      );
      return;
    }

    // Route to specific feature handler
    switch (feature.toLowerCase()) {
      case "db":
      case "database":
        // Check for required options in non-interactive mode
        if (this.cliOptions.dbType && !this.cliOptions.orm) {
          console.log(chalk.red("❌ When specifying --db-type, you must also specify --orm"));
          console.log(chalk.yellow("💡 Example: kickstart-express add db --db-type mongodb --orm mongoose"));
          return;
        }
        if (this.cliOptions.orm && !this.cliOptions.dbType) {
          console.log(chalk.red("❌ When specifying --orm, you must also specify --db-type"));
          console.log(chalk.yellow("💡 Example: kickstart-express add db --db-type postgres --orm prisma"));
          return;
        }
        await this.addDatabase();
        break;
      case "auth":
      case "authentication":
        await this.addAuthentication();
        break;
      default:
        console.log(chalk.red(`❌ Unknown feature: ${feature}`));
        console.log(chalk.yellow("\n📋 Available features:"));
        console.log(
          chalk.gray(
            "   db, database    Add database support (MongoDB/PostgreSQL with Mongoose/Prisma/Drizzle)"
          )
        );
        console.log(
          chalk.gray(
            "   auth            Add authentication support (JWT or Clerk)"
          )
        );
        console.log(chalk.yellow("\n🔧 CLI Options:"));
        console.log(chalk.gray("   --db-type <mongodb|postgres>   Database type"));
        console.log(chalk.gray("   --orm <mongoose|prisma|drizzle> ORM/ODM to use"));
        console.log(chalk.gray("   --auth-type <jwt|clerk>         Authentication type"));
        console.log(chalk.yellow("\n💡 Examples:"));
        console.log(chalk.gray("   kickstart-express add db --db-type mongodb --orm mongoose"));
        console.log(chalk.gray("   kickstart-express add auth --auth-type jwt"));
        console.log(chalk.gray("   kickstart-express add db  # Interactive mode"));
        return;
    }
  }

  async addDatabase() {
    console.log(chalk.blue("📊 Adding database support to your project..."));
    console.log(
      chalk.gray(
        `   Project: ${this.components.name} (${this.components.language})`
      )
    );

    let dbType, orm;

    // Use CLI options if provided, otherwise prompt
    if (this.cliOptions.dbType && this.cliOptions.orm) {
      dbType = this.cliOptions.dbType;
      orm = this.cliOptions.orm;
      
      // Validate the combination
      if (!this.isValidDbOrmCombination(dbType, orm)) {
        console.log(chalk.red(`❌ Invalid combination: ${dbType} with ${orm}`));
        console.log(chalk.yellow("Valid combinations:"));
        console.log(chalk.gray("   mongodb: mongoose, prisma"));
        console.log(chalk.gray("   postgres: prisma, drizzle"));
        return;
      }
      
      console.log(chalk.green(`✅ Using CLI options: ${dbType} with ${orm}`));
    } else {
      // Interactive mode - prompt for database type and ORM
      const dbResponse = await inquirer.prompt([
        {
          name: "dbType",
          type: "list",
          message: "Which database do you want to use?",
          choices: [
            { name: "MongoDB", value: "mongodb" },
            { name: "PostgreSQL", value: "postgres" },
          ],
          default: this.cliOptions.dbType || "mongodb",
        },
      ]);
      dbType = dbResponse.dbType;

      // Get ORM choices based on database type
      let ormChoices = [];
      if (dbType === "mongodb") {
        ormChoices = [
          { name: "Mongoose", value: "mongoose" },
          { name: "Prisma", value: "prisma" },
        ];
      } else if (dbType === "postgres") {
        ormChoices = [
          { name: "Prisma", value: "prisma" },
          { name: "Drizzle", value: "drizzle" },
        ];
      }

      const ormResponse = await inquirer.prompt([
        {
          name: "orm",
          type: "list",
          message: `Which ORM/ODM do you want to use with ${
            dbType === "mongodb" ? "MongoDB" : "PostgreSQL"
          }?`,
          choices: ormChoices,
          default: this.cliOptions.orm || ormChoices[0].value,
        },
      ]);
      orm = ormResponse.orm;

      console.log(
        chalk.green(
          `\n✅ Selected: ${
            dbType === "mongodb" ? "MongoDB" : "PostgreSQL"
          } with ${orm}`
        )
      );
    }

    // Apply the database template
    await this.applyDatabaseTemplate(dbType, orm);

    // Update components.json
    await this.updateComponents(dbType, orm);

    console.log(chalk.green("\n🎉 Database support added successfully!"));
    console.log(chalk.yellow("\n📝 Next steps:"));
    console.log(chalk.gray("   1. Install dependencies: pnpm install"));
    console.log(chalk.gray("   2. Configure your database connection in .env"));
    console.log(
      chalk.gray("   3. Check the generated files for usage examples")
    );
  }

  isValidDbOrmCombination(dbType, orm) {
    const validCombinations = {
      mongodb: ["mongoose", "prisma"],
      postgres: ["prisma", "drizzle"],
    };
    
    return validCombinations[dbType] && validCombinations[dbType].includes(orm);
  }

  async applyDatabaseTemplate(dbType, orm) {
    const spinner = ora("Adding database files...").start();

    try {
      const templateSource = path.join(
        this.templatePath,
        "add",
        "db",
        dbType,
        orm,
        this.components.language
      );

      if (!(await fs.pathExists(templateSource))) {
        spinner.fail(
          `Template not found for ${dbType}/${orm}/${this.components.language}`
        );
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
          errorOnExist: false,
        });
      } else {
        await fs.copy(templateSource, this.currentDir, {
          overwrite: false,
          errorOnExist: false,
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
      console.log(
        chalk.yellow("⚠️  Could not update package.json:"),
        error.message
      );
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
        dbConfig =
          "\n# Database Configuration\nMONGODB_URI=mongodb://localhost:27017/your-database-name\n";
      } else if (dbType === "postgres") {
        if (orm === "prisma") {
          dbConfig =
            "\n# Database Configuration\nDATABASE_URL=postgresql://username:password@localhost:5432/your-database-name\n";
        } else if (orm === "drizzle") {
          dbConfig =
            "\n# Database Configuration\nDATABASE_URL=postgresql://username:password@localhost:5432/your-database-name\n";
        }
      }

      // Only add if not already present
      if (!envContent.includes("Database Configuration")) {
        envContent += dbConfig;
        await fs.writeFile(envPath, envContent);
        console.log(chalk.green("✓ Updated .env with database configuration"));
      }
    } catch (error) {
      console.log(
        chalk.yellow("⚠️  Could not update .env file:"),
        error.message
      );
    }
  }

  async updateComponents(dbType, orm) {
    try {
      this.components.features = this.components.features || {};
      this.components.features.database = {
        type: dbType,
        orm: orm,
        added: new Date().toISOString(),
      };

      await fs.writeJson(this.componentsPath, this.components, { spaces: 2 });
      console.log(chalk.green("✓ Updated components.json"));
    } catch (error) {
      console.log(
        chalk.yellow("⚠️  Could not update components.json:"),
        error.message
      );
    }
  }

  async addAuthentication() {
    console.log(chalk.blue("🔐 Adding authentication support to your project..."));
    console.log(
      chalk.gray(
        `   Project: ${this.components.name} (${this.components.language})`
      )
    );

    let authType;

    // Use CLI option if provided, otherwise prompt
    if (this.cliOptions.authType) {
      authType = this.cliOptions.authType;
      
      // Validate the auth type
      if (!this.isValidAuthType(authType)) {
        console.log(chalk.red(`❌ Invalid authentication type: ${authType}`));
        console.log(chalk.yellow("Valid types: jwt, clerk"));
        return;
      }
      
      console.log(chalk.green(`✅ Using CLI option: ${authType} authentication`));
    } else {
      // Interactive mode - prompt for authentication type
      const response = await inquirer.prompt([
        {
          name: "authType",
          type: "list",
          message: "Which authentication method do you want to use?",
          choices: [
            { name: "JWT (JSON Web Tokens)", value: "jwt" },
            { name: "Clerk (Third-party auth service)", value: "clerk" },
          ],
          default: this.cliOptions.authType || "jwt",
        },
      ]);
      authType = response.authType;

      console.log(
        chalk.green(
          `\n✅ Selected: ${authType === "jwt" ? "JWT Authentication" : "Clerk Authentication"}`
        )
      );
    }

    // Apply the authentication template
    await this.applyAuthTemplate(authType);

    // Update components.json
    await this.updateComponentsAuth(authType);

    console.log(chalk.green("\n🎉 Authentication support added successfully!"));
    console.log(chalk.yellow("\n📝 Next steps:"));
    
    if (authType === "jwt") {
      console.log(chalk.gray("   1. Install dependencies: pnpm install"));
      console.log(chalk.gray("   2. Configure your JWT secret in .env"));
      console.log(chalk.gray("   3. Use the auth middleware in your routes"));
      console.log(chalk.gray("   4. Check the generated files for usage examples"));
    } else {
      console.log(chalk.gray("   1. Install dependencies: pnpm install"));
      console.log(chalk.gray("   2. Set up your Clerk account and get API keys"));
      console.log(chalk.gray("   3. Configure your Clerk keys in .env"));
      console.log(chalk.gray("   4. Check the generated files for usage examples"));
    }
  }

  isValidAuthType(authType) {
    const validTypes = ["jwt", "clerk"];
    return validTypes.includes(authType);
  }

  async applyAuthTemplate(authType) {
    const spinner = ora("Adding authentication files...").start();

    try {
      const templateSource = path.join(
        this.templatePath,
        "add",
        "auth",
        authType,
        this.components.language
      );

      if (!(await fs.pathExists(templateSource))) {
        spinner.fail(
          `Template not found for auth/${authType}/${this.components.language}`
        );
        return;
      }

      // Determine the correct destination based on project structure
      const hasSource = this.components.architecture.src;

      // Copy authentication files
      if (hasSource) {
        const srcDir = path.join(this.currentDir, "src");
        await fs.copy(templateSource, srcDir, {
          overwrite: false, // Don't overwrite existing files
          errorOnExist: false,
        });
      } else {
        await fs.copy(templateSource, this.currentDir, {
          overwrite: false,
          errorOnExist: false,
        });
      }

      // Update package.json with new dependencies
      await this.updatePackageJsonAuth(authType);

      // Update .env with authentication configuration
      await this.updateEnvFileAuth(authType);

      spinner.succeed("Authentication files added successfully");
    } catch (error) {
      spinner.fail("Failed to add authentication files");
      console.log(chalk.red("Error:"), error.message);
    }
  }

  async updatePackageJsonAuth(authType) {
    try {
      const pkg = await fs.readJson(this.packagePath);

      // Add dependencies based on authentication type
      const dependencies = this.getAuthDependencies(authType);

      pkg.dependencies = pkg.dependencies || {};
      Object.assign(pkg.dependencies, dependencies);

      await fs.writeJson(this.packagePath, pkg, { spaces: 2 });
      console.log(chalk.green("✓ Updated package.json with new dependencies"));
    } catch (error) {
      console.log(
        chalk.yellow("⚠️  Could not update package.json:"),
        error.message
      );
    }
  }

  getAuthDependencies(authType) {
    const deps = {};

    if (authType === "jwt") {
      deps["jsonwebtoken"] = "^9.0.0";
      deps["bcryptjs"] = "^2.4.3";
      deps["dotenv"] = "^16.3.0";
      if (this.components.language === "ts") {
        deps["@types/jsonwebtoken"] = "^9.0.0";
        deps["@types/bcryptjs"] = "^2.4.0";
      }
    } else if (authType === "clerk") {
      deps["@clerk/express"] = "^1.0.0";
      deps["dotenv"] = "^16.3.0";
    }

    return deps;
  }

  async updateEnvFileAuth(authType) {
    try {
      const envPath = path.join(this.currentDir, ".env");
      let envContent = "";

      if (await fs.pathExists(envPath)) {
        envContent = await fs.readFile(envPath, "utf8");
      }

      // Add authentication configuration
      let authConfig = "";
      if (authType === "jwt") {
        authConfig = "\n# JWT Authentication Configuration\nJWT_SECRET=your-super-secret-jwt-key-change-this-in-production\nJWT_EXPIRES_IN=7d\n";
      } else if (authType === "clerk") {
        authConfig = "\n# Clerk Authentication Configuration\nCLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY\nCLERK_SECRET_KEY=YOUR_SECRET_KEY\n";
      }

      // Only add if not already present
      if (!envContent.includes("Authentication Configuration")) {
        envContent += authConfig;
        await fs.writeFile(envPath, envContent);
        console.log(chalk.green("✓ Updated .env with authentication configuration"));
      }
    } catch (error) {
      console.log(
        chalk.yellow("⚠️  Could not update .env file:"),
        error.message
      );
    }
  }

  async updateComponentsAuth(authType) {
    try {
      this.components.features = this.components.features || {};
      this.components.features.authentication = {
        type: authType,
        added: new Date().toISOString(),
      };

      await fs.writeJson(this.componentsPath, this.components, { spaces: 2 });
      console.log(chalk.green("✓ Updated components.json"));
    } catch (error) {
      console.log(
        chalk.yellow("⚠️  Could not update components.json:"),
        error.message
      );
    }
  }
}
