# Getting Started with Kickstart Express v2

This guide will help you get up and running with Kickstart Express v2 quickly.

## What's New in v2

- **Simplified CLI**: No more `create` command needed - scaffolding is the default behavior
- **Feature Addition**: New `add` command to extend projects with databases, authentication, and more
- **Streamlined Workflow**: More intuitive project creation and enhancement process

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** or **pnpm** (pnpm recommended)
- **Git** (for project initialization)

### Checking Your Setup

```bash
node --version    # Should be >= 18.0.0
npm --version     # Any recent version
git --version     # Any recent version
```

## Installation

### Option 1: Global Installation (Recommended)

Install Kickstart Express globally to use it anywhere:

```bash
npm install -g kickstart-express
```

Verify the installation:

```bash
kickstart-express --version
```

### Option 2: Using npx (No Installation)

Use Kickstart Express without installing it globally:

```bash
npx kickstart-express
```

This downloads and runs the latest version each time.

## Your First Project

### Interactive Mode (Recommended for Beginners)

1. **Run the command:**
   ```bash
   kickstart-express
   ```

2. **Follow the prompts:**
   - **Project name:** Enter a name for your project (e.g., "my-first-api")
   - **Language:** Choose TypeScript (recommended) or JavaScript
   - **Include Dockerfile:** Choose Yes for Docker support
   - **Source folder:** Choose Yes for organized structure
   - **Structured architecture:** Choose Yes for enterprise-ready structure

3. **Navigate to your project:**
   ```bash
   cd my-first-api
   ```

4. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser:**
   Visit `http://localhost:3000` to see your Express server running!

### Adding Features to Your Project

Once you have a project created, you can enhance it with additional features:

1. **Add database support:**
   ```bash
   cd my-first-api
   kickstart-express add database
   ```

2. **Add authentication:**
   ```bash
   kickstart-express add auth
   ```

3. **Follow the interactive prompts** to configure each feature according to your needs.

### Non-Interactive Mode (For Advanced Users)

Create a project instantly with CLI arguments:

```bash
kickstart-express --name my-api --language ts --docker --src --structured
cd my-api
pnpm install
pnpm dev
```

Then add features as needed:

```bash
# Add database support
kickstart-express add database

# Add authentication
kickstart-express add auth
```

## What You Get

### Project Scaffolding
Your new Express.js project includes:

✅ **Modern Express.js setup** with TypeScript/JavaScript  
✅ **Hot reloading** for development  
✅ **CORS enabled** for cross-origin requests  
✅ **Environment variables** support  
✅ **Docker configuration** (if selected)  
✅ **Structured architecture** (if selected)  
✅ **Sample API endpoints** to get you started  

### Feature Addition (New in v2)
The `add` command can enhance your project with:

✅ **Database Support** - MongoDB/PostgreSQL with multiple ORM options  
✅ **Authentication** - JWT or Clerk authentication systems  
✅ **API Documentation** - Swagger/OpenAPI integration (coming soon)  
✅ **Testing Setup** - Jest/Vitest testing frameworks (coming soon)  

## Next Steps

1. **Explore the codebase** - Check out the generated files and structure
2. **Read the [CLI Reference](./cli-reference.md)** - Learn about all available options
3. **Check [Usage Examples](./examples.md)** - See practical use cases
4. **Review [Project Templates](./templates.md)** - Understand different project structures

## Need Help?

- Check the [FAQ](./faq.md) for common issues
- Review the [CLI Reference](./cli-reference.md) for detailed command information
- Open an issue on [GitHub](https://github.com/bhaveshsinghal95182/kickstart-express) if you encounter problems

## Quick Commands Reference

```bash
# Create new project (interactive mode)
kickstart-express

# Create new project (non-interactive)
kickstart-express -n my-app -l ts -d -s --structured

# Add database support
kickstart-express add database

# Add authentication
kickstart-express add auth

# Get help
kickstart-express --help

# Check version
kickstart-express --version
```

Ready to build something amazing? Let's go! 🚀