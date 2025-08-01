# Kickstart Express

[![npm version](https://badge.fury.io/js/kickstart-express.svg)](https://www.npmjs.com/package/kickstart-express)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices. Get up and running with a fully configured Express server in seconds!

## 🚀 Features

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

### Interactive Mode (Default)
Simply run the command and follow the interactive prompts:

```bash
kickstart-express
```

The CLI will ask you:
1. **Project name** - Name for your new project directory
2. **Language** - Choose between TypeScript or JavaScript
3. **Include Dockerfile** - Optional Docker configuration
4. **Source folder structure** - Simple or organized structure
5. **Structured architecture** - Controllers, services, and routes separation

### Non-Interactive Mode (CLI Arguments)
You can also pass arguments to skip prompts and scaffold projects instantly:

```bash
kickstart-express --name my-api --language ts --docker --src --structured
```

#### Available CLI Options:
- `-n, --name <project-name>` - Specify the project name
- `-l, --language <ts|js>` - Choose language (default: ts)
- `-d, --docker` - Include Dockerfile and docker-compose.yml
- `-s, --src` - Create src folder structure
- `--structured` - Use structured architecture (controllers, services, routes)
- `-h, --help` - Display help information
- `-V, --version` - Display version number

#### Examples:

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

### Interactive Mode
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

### Non-Interactive Mode
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

### Dependencies
- **Express.js** - Fast, unopinionated web framework
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

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

For comprehensive documentation, visit the [docs](./docs/) folder:

- **[Getting Started](./docs/getting-started.md)** - Installation and first steps
- **[CLI Reference](./docs/cli-reference.md)** - Complete command-line options
- **[Usage Examples](./docs/examples.md)** - Real-world examples and use cases
- **[Project Templates](./docs/templates.md)** - Understanding generated structures
- **[API Reference](./docs/api-reference.md)** - Programmatic usage
- **[Contributing](./docs/contributing.md)** - Development and contribution guide
- **[FAQ](./docs/faq.md)** - Frequently asked questions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for detailed information on:

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

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) for interactive CLI
- Uses [Ora](https://github.com/sindresorhus/ora) for elegant terminal spinners
- Inspired by modern Express.js best practices

---

**Happy coding! 🎉**

If you find this tool helpful, please consider giving it a ⭐ on GitHub!