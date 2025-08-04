# Kickstart Express v2

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Downloads](https://img.shields.io/npm/dm/kickstart-express.svg)](https://www.npmjs.com/package/kickstart-express)

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-☕-yellow.svg)](https://buymeacoffee.com/descentkatil)

A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices. Get up and running with a fully configured Express server in seconds!

![npm](https://img.shields.io/badge/npm-compatible-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue)
![Docker](https://img.shields.io/badge/Docker-ready-blue)

## ⚡ Quick Demo

```bash
# Install globally
npm install -g kickstart-express

# Create a new project (default behavior)
kickstart-express --name my-api --language ts --docker --src --structured

# Add features to existing projects
kickstart-express add database

# Navigate and start
cd my-api && pnpm dev
```

Your Express server will be running at `http://localhost:3000` with a fully configured TypeScript setup, Docker containers, and organized project structure!

## 📋 Table of Contents

- [⚡ Quick Demo](#-quick-demo)
- [🚀 Features](#-features)
- [📦 Installation](#-installation)
- [🛠️ Usage](#️-usage)
- [📁 Project Templates](#-project-templates)
- [🏃‍♂️ Quick Start Examples](#️-quick-start-examples)
- [📋 Available Scripts](#-available-scripts)
- [🔧 Requirements](#-requirements)
- [🌟 What's Included](#-whats-included)
- [🚀 Generated API Example](#-generated-api-example)
- [📝 Project Structure Explained](#-project-structure-explained)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [💖 Support](#-support)
- [📄 License](#-license)

## 🚀 Features

- **Simplified CLI** - No more "create" command needed - scaffolding is the default behavior
- **Feature Addition** - Use `add` command to extend existing projects with databases, auth, and more
- **Interactive & Non-Interactive CLI** - Use prompts or pass arguments for instant scaffolding
- **Graceful Interruption Handling** - Safe Ctrl+C handling with automatic cleanup of partial projects
- **TypeScript & JavaScript Support** - Choose your preferred language
- **Flexible Project Structure** - From simple to enterprise-ready architectures
- **Docker Ready** - Optional Docker configuration included
- **Modern Tooling** - Pre-configured with ESLint, hot reloading, and build scripts
- **Best Practices** - CORS, environment variables, and structured routing

## 📦 Installation

### Global Installation (Recommended)
```bash
npm install -g kickstart-express
```

### Using npx (No Installation Required)
```bash
npx kickstart-express
```

## 🛠️ Usage

### Creating New Projects

#### Interactive Mode (Default)
Simply run the command and follow the interactive prompts to create a new Express.js project:

```bash
kickstart-express
```

The CLI will ask you:
1. **Project name** - Name for your new project directory
2. **Language** - Choose between TypeScript or JavaScript
3. **Include Dockerfile** - Optional Docker configuration
4. **Source folder structure** - Simple or organized structure
5. **Structured architecture** - Controllers, services, and routes separation

#### Non-Interactive Mode (CLI Arguments)
You can also pass arguments to skip prompts and scaffold projects instantly:

```bash
kickstart-express --name my-api --language ts --docker --src --structured
```

#### Available CLI Options for Project Creation:
- `-n, --name <project-name>` - Specify the project name
- `-l, --language <ts|js>` - Choose language (default: ts)
- `-d, --docker` - Include Dockerfile and docker-compose.yml
- `-s, --src` - Create src folder structure
- `--structured` - Use structured architecture (controllers, services, routes)
- `-h, --help` - Display help information
- `-V, --version` - Display version number

### Adding Features to Existing Projects

Kickstart Express v2 introduces the `add` command to extend your existing projects with both interactive and non-interactive modes:

```bash
kickstart-express add <feature> [options]
```

#### Available Features:
- `database` or `db` - Add database support (MongoDB/PostgreSQL with Mongoose/Prisma/Drizzle)
- `auth` - Add authentication support (JWT or Clerk)

#### Interactive Mode (Default)
When run without CLI options, prompts guide you through feature configuration:

```bash
# Interactive database setup
kickstart-express add db

# Interactive authentication setup
kickstart-express add auth
```

#### Non-Interactive Mode (CLI Arguments)
Skip prompts by providing configuration options directly:

**Database CLI Options:**
- `--db-type <mongodb|postgres>` - Database type selection
- `--orm <mongoose|prisma|drizzle>` - ORM/ODM selection

**Authentication CLI Options:**
- `--auth-type <jwt|clerk>` - Authentication type selection

#### Examples:

**Interactive Mode:**
```bash
# Add database support (interactive prompts)
kickstart-express add database

# Add authentication (interactive prompts)
kickstart-express add auth
```

**Non-Interactive Mode:**
```bash
# Add MongoDB with Mongoose
kickstart-express add db --db-type mongodb --orm mongoose

# Add PostgreSQL with Prisma
kickstart-express add db --db-type postgres --orm prisma

# Add PostgreSQL with Drizzle
kickstart-express add db --db-type postgres --orm drizzle

# Add JWT authentication
kickstart-express add auth --auth-type jwt

# Add Clerk authentication
kickstart-express add auth --auth-type clerk
```

**Fallback Behavior:**
When run outside a kickstart-express project, the add command will prompt to create a new project instead.

### Examples

#### Create Projects:

**TypeScript project with all features:**
```bash
kickstart-express -n my-awesome-api -l ts -d -s --structured
```

**Simple JavaScript project:**
```bash
kickstart-express --name simple-app --language js
```

**Partial arguments (will prompt for missing options):**
```bash
kickstart-express --name my-app --docker
```

**Quick TypeScript project with src folder:**
```bash
kickstart-express -n quick-api -s
```

#### Add Features:

**Interactive Mode:**
```bash
# Add database support with prompts
cd my-existing-project
kickstart-express add database

# Add authentication with prompts
kickstart-express add auth
```

**Non-Interactive Mode:**
```bash
cd my-existing-project

# Add MongoDB with Mongoose
kickstart-express add db --db-type mongodb --orm mongoose

# Add PostgreSQL with Prisma
kickstart-express add db --db-type postgres --orm prisma

# Add JWT authentication
kickstart-express add auth --auth-type jwt
```

**Complete Workflow:**
```bash
# 1. Create project
kickstart-express -n my-api -l ts -d -s --structured

# 2. Add database support
cd my-api
kickstart-express add db --db-type postgres --orm prisma

# 3. Add authentication
kickstart-express add auth --auth-type jwt
```

## 📁 Project Templates

### Simple Structure
```
my-app/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json (TS only)
├── .env
└── .gitignore
```

### Structured Architecture
```
my-app/
├── src/
│   ├── controllers/
│   │   └── calculator.controller.ts
│   ├── routes/
│   │   └── calculator.route.ts
│   ├── services/
│   │   └── calculator.service.ts
│   ├── models/
│   │   └── calculation.model.ts
│   └── index.ts
├── package.json
├── tsconfig.json (TS only)
├── .env
└── .gitignore
```

### With Docker
```
my-app/
├── src/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── ...
```

## 🏃‍♂️ Quick Start Examples

### Create New Projects

#### Interactive Mode
```bash
# Install the CLI
npm install -g kickstart-express

# Create a new project interactively
kickstart-express

# Follow the prompts:
# ✓ Project name: my-awesome-api
# ✓ Language: TypeScript
# ✓ Include Dockerfile: Yes
# ✓ Source folder: Yes
# ✓ Structured architecture: Yes

# Navigate to your project
cd my-awesome-api

# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev
```

#### Non-Interactive Mode
```bash
# Install the CLI
npm install -g kickstart-express

# Create a new project with CLI arguments
kickstart-express --name my-awesome-api --language ts --docker --src --structured

# Navigate to your project
cd my-awesome-api

# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev
```

### Add Features to Existing Projects

```bash
# Navigate to your existing kickstart-express project
cd my-existing-project

# Add database support
kickstart-express add database

# Add authentication
kickstart-express add auth
```

Your Express server will be running at `http://localhost:3000`!

## 📋 Available Scripts

All generated projects come with these npm scripts:

### TypeScript Projects
```bash
pnpm dev      # Start development server with hot reload
pnpm build    # Build for production
pnpm start    # Start production server
```

### JavaScript Projects
```bash
pnpm dev      # Start development server with nodemon
pnpm start    # Start production server
```

### Docker Projects
```bash
docker-compose up --build  # Build and run with Docker
```

## 🔧 Requirements

- **Node.js** >= 18.0.0
- **pnpm** (recommended) or npm
- **Git** (for project initialization)

## 🌟 What's Included

### Project Scaffolding
- **Express.js** - Fast, unopinionated web framework
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

### Feature Addition (New in v2)
- **Database Support** - MongoDB/PostgreSQL with multiple ORMs
- **Authentication** - JWT or Clerk authentication systems

### TypeScript Projects Include
- **TypeScript** - Static type checking
- **tsx** - TypeScript execution and watch mode
- **@types/express** - Express type definitions

### JavaScript Projects Include
- **nodemon** - Automatic restart on file changes

### Optional Docker Setup
- **Multi-stage Dockerfile** - Optimized for production
- **docker-compose.yml** - Ready for development and deployment
- **pnpm** integration for fast installs

## 🚀 Generated API Example

The structured template includes a sample calculator API:

```typescript
// GET /api/calculator
{
  "message": "Calculator API is working!"
}

// POST /api/calculator/add
{
  "a": 5,
  "b": 3
}
// Response: { "result": 8 }
```

## 📝 Project Structure Explained

### Controllers
Handle HTTP requests and responses, delegating business logic to services.

### Routes
Define API endpoints and middleware, connecting URLs to controller methods.

### Services
Contain business logic, data processing, and external API calls.

### Models
Define data structures, interfaces, and type definitions.

## 📚 Documentation

For comprehensive documentation, visit our online docs at **[docs.kickstart.express](https://docs.kickstart.express)**:

### v2 Documentation
- **[Getting Started](https://docs.kickstart.express/docs/getting-started)** - Installation and first steps
- **[CLI Reference](https://docs.kickstart.express/docs/cli-reference)** - Complete command-line options for v2
- **[Adding Features](https://docs.kickstart.express/docs/adding-features)** - Guide to using the new `add` command
- **[Usage Examples](https://docs.kickstart.express/docs/examples)** - Real-world examples and use cases
- **[Project Templates](https://docs.kickstart.express/docs/templates)** - Understanding generated structures
- **[Migration Guide](https://docs.kickstart.express/docs/migration)** - Upgrading from v1 to v2
- **[API Reference](https://docs.kickstart.express/docs/api-reference)** - Programmatic usage
- **[Contributing](https://docs.kickstart.express/docs/contributing)** - Development and contribution guide
- **[FAQ](https://docs.kickstart.express/docs/faq)** - Frequently asked questions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://docs.kickstart.express/docs/contributing) for detailed information on:

- Setting up the development environment
- Code style guidelines
- Testing procedures
- Pull request process

### Quick Development Setup
```bash
git clone https://github.com/bhaveshsinghal95182/kickstart-express.git
cd kickstart-express
npm install
```

### Testing the CLI
```bash
node index.js --name test-project --language ts --src
```

## 💖 Support

If you find this tool helpful, please consider:

- ⭐ Giving it a star on GitHub
- ☕ [Buying me a coffee](https://buymeacoffee.com/descentkatil) to support development
- 🐛 [Reporting issues](https://github.com/bhaveshsinghal95182/kickstart-express/issues) you encounter
- 💡 [Suggesting new features](https://github.com/bhaveshsinghal95182/kickstart-express/issues)

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) for interactive CLI
- Uses [Ora](https://github.com/sindresorhus/ora) for elegant terminal spinners
- Inspired by modern Express.js best practices

---

**Happy coding! 🎉**

Made with ❤️ by [bhaveshsinghal95182](https://github.com/bhaveshsinghal95182)

[![GitHub followers](https://img.shields.io/github/followers/bhaveshsinghal95182?style=social)](https://github.com/bhaveshsinghal95182)
[![GitHub stars](https://img.shields.io/github/stars/bhaveshsinghal95182/kickstart-express?style=social)](https://github.com/bhaveshsinghal95182/kickstart-express)
