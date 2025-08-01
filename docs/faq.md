# Frequently Asked Questions

Common questions and troubleshooting guide for Kickstart Express.

## 🚀 Getting Started

### Q: How do I install Kickstart Express?

**A:** You have two options:

**Global installation (recommended):**
```bash
npm install -g kickstart-express
kickstart-express --name my-project
```

**Using npx (no installation):**
```bash
npx kickstart-express --name my-project
```

### Q: What's the difference between TypeScript and JavaScript projects?

**A:** 

**TypeScript projects include:**
- Type safety and better IDE support
- `tsconfig.json` configuration
- TypeScript compiler and tsx for development
- Build step to compile to JavaScript
- Better error catching at development time

**JavaScript projects are:**
- Simpler setup with no compilation step
- Faster to start for beginners
- Good for rapid prototyping
- Use nodemon for hot reloading

**Recommendation:** Use TypeScript for any project that will grow or involve multiple developers.

### Q: When should I use the structured architecture option?

**A:** Use `--structured` when:
- Building enterprise applications
- Working with a team
- Creating microservices
- Need clear separation of concerns
- Planning for long-term maintenance

**Don't use structured when:**
- Building simple prototypes
- Learning Express.js basics
- Creating single-purpose scripts
- Need minimal setup

## 🔧 CLI Usage

### Q: How do I see all available CLI options?

**A:** Run the help command:
```bash
kickstart-express --help
```

This shows all available options with descriptions.

### Q: Can I use some CLI arguments and still get prompts for others?

**A:** Yes! Kickstart Express supports partial interactive mode:

```bash
kickstart-express --name my-app --docker
# Will prompt for: language, src folder, structured architecture
```

Only missing options will be prompted.

### Q: How do I create multiple projects with the same configuration?

**A:** Use non-interactive mode with all options specified:

```bash
# Create multiple microservices
kickstart-express --name auth-service --language ts --docker --src --structured
kickstart-express --name user-service --language ts --docker --src --structured
kickstart-express --name order-service --language ts --docker --src --structured
```

### Q: What does each CLI option do?

| Option | Description | Example |
|--------|-------------|---------|
| `--name, -n` | Project name and directory | `--name my-api` |
| `--language, -l` | TypeScript or JavaScript | `--language ts` |
| `--docker, -d` | Include Docker configuration | `--docker` |
| `--src, -s` | Create src/ folder structure | `--src` |
| `--structured` | Add controllers, services, routes | `--structured` |

## 🏗️ Project Structure

### Q: What's the difference between using `--src` and not using it?

**Without `--src`:**
```
my-app/
├── index.ts
├── package.json
└── ...
```

**With `--src`:**
```
my-app/
├── src/
│   └── index.ts
├── package.json
└── ...
```

The `--src` option provides better organization and prepares your project for build processes.

### Q: What files are created in a structured project?

**A:** Structured projects (`--structured`) create:

```
my-app/
├── src/
│   ├── controllers/    # Handle HTTP requests/responses
│   │   └── calculator.controller.ts
│   ├── services/       # Business logic
│   │   └── calculator.service.ts
│   ├── routes/         # API endpoint definitions
│   │   └── calculator.route.ts
│   ├── models/         # Data types and interfaces
│   │   └── calculation.model.ts
│   └── index.ts        # Main server file
```

### Q: Can I add more files to the generated project?

**A:** Absolutely! The generated project is a starting point. You can:
- Add more routes, controllers, and services
- Install additional dependencies
- Modify the existing code
- Add database connections
- Include authentication
- Set up testing frameworks

## 🐳 Docker

### Q: What Docker files are created?

**A:** When using `--docker`, you get:

- **`Dockerfile`** - Multi-stage build for development and production
- **`docker-compose.yml`** - Development and production configurations
- **`.dockerignore`** - Excludes unnecessary files from Docker context

### Q: How do I run the Docker container?

**A:** Several options:

**Development with hot reloading:**
```bash
docker-compose up
```

**Production build:**
```bash
docker-compose -f docker-compose.yml up app-prod
```

**Manual Docker commands:**
```bash
# Build
docker build -t my-app .

# Run development
docker run -p 3000:3000 my-app

# Run production
docker build --target production -t my-app-prod .
docker run -p 3000:3000 my-app-prod
```

### Q: Can I modify the Docker configuration?

**A:** Yes! You can customize:
- Change the base Node.js version in `Dockerfile`
- Add environment variables in `docker-compose.yml`
- Install additional system packages
- Configure different ports
- Add database services to docker-compose

## 🔧 Development

### Q: How do I start the development server?

**A:** After creating a project:

```bash
cd my-project
pnpm install    # or npm install
pnpm dev        # or npm run dev
```

The server starts at `http://localhost:3000`

### Q: What npm scripts are available?

**TypeScript projects:**
```json
{
  "dev": "tsx watch src/index.ts",    // Development with hot reload
  "build": "tsc",                     // Compile TypeScript
  "start": "node dist/index.js"       // Start production server
}
```

**JavaScript projects:**
```json
{
  "dev": "nodemon index.js",          // Development with hot reload
  "start": "node index.js"            // Start server
}
```

### Q: How do I add environment variables?

**A:** Use the generated `.env` file:

```bash
# .env
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
```

Access in your code:
```javascript
console.log(process.env.DATABASE_URL);
```

### Q: How do I add a database?

**A:** Install the database driver and add connection code:

**MongoDB:**
```bash
pnpm add mongoose
pnpm add -D @types/mongoose  # TypeScript only
```

**PostgreSQL:**
```bash
pnpm add pg
pnpm add -D @types/pg  # TypeScript only
```

Then add connection code to `src/index.ts` or `index.js`.

## 🚨 Troubleshooting

### Q: "Command not found: kickstart-express"

**Solutions:**

1. **Install globally:**
   ```bash
   npm install -g kickstart-express
   ```

2. **Use npx:**
   ```bash
   npx kickstart-express
   ```

3. **Check PATH:**
   ```bash
   npm config get prefix
   # Make sure this directory is in your PATH
   ```

### Q: "Directory already exists" error

**A:** This happens when you try to create a project with a name that already exists.

**Solutions:**
```bash
# Remove existing directory
rm -rf existing-project-name

# Or use a different name
kickstart-express --name my-project-v2
```

### Q: Generated project won't start - "Cannot resolve module"

**A:** This usually means dependencies weren't installed:

```bash
cd your-project
pnpm install  # or npm install
pnpm dev
```

### Q: TypeScript compilation errors

**Common issues:**

1. **Missing types:**
   ```bash
   pnpm add -D @types/express @types/cors @types/node
   ```

2. **tsconfig.json issues:**
   - Check that `rootDir` and `outDir` are correct
   - Ensure `include` covers your source files

3. **Import/export syntax:**
   ```typescript
   // Use ES6 imports
   import express from 'express';
   
   // Not CommonJS
   const express = require('express');
   ```

### Q: Docker build fails

**Common solutions:**

1. **Check Node.js version:**
   ```dockerfile
   FROM node:18-alpine  # Use supported version
   ```

2. **Clean Docker cache:**
   ```bash
   docker system prune -a
   ```

3. **Check .dockerignore:**
   ```
   node_modules
   npm-debug.log
   .git
   ```

### Q: Port already in use

**A:** Change the port in `.env`:
```bash
PORT=3001
```

Or kill the process using port 3000:
```bash
# Find process
lsof -i :3000

# Kill process (replace PID)
kill -9 PID
```

### Q: Permission denied errors

**Solutions:**

1. **Check directory permissions:**
   ```bash
   ls -la
   chmod 755 .
   ```

2. **Use sudo (if necessary):**
   ```bash
   sudo npm install -g kickstart-express
   ```

3. **Fix npm permissions:**
   ```bash
   npm config set prefix ~/.npm-global
   export PATH=~/.npm-global/bin:$PATH
   ```

## 🔄 Updates and Maintenance

### Q: How do I update Kickstart Express?

**A:** Update the global installation:
```bash
npm update -g kickstart-express
```

Check version:
```bash
kickstart-express --version
```

### Q: How do I update a generated project?

**A:** Generated projects are independent. You can:
- Update dependencies manually: `pnpm update`
- Regenerate with newer version (manual migration)
- Apply specific updates from newer templates

### Q: Are there breaking changes between versions?

**A:** We follow semantic versioning:
- **Patch** (1.1.1 → 1.1.2): Bug fixes, safe to update
- **Minor** (1.1.0 → 1.2.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes, check CHANGELOG

## 🤝 Contributing

### Q: How can I contribute to Kickstart Express?

**A:** We welcome contributions! You can:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation
- Create new templates

See our [Contributing Guide](./contributing.md) for details.

### Q: Can I create custom templates?

**A:** Currently, templates are built-in, but we're working on:
- Plugin system for custom templates
- Configuration file support
- Template marketplace

Track progress in our [GitHub issues](https://github.com/bhaveshsinghal95182/kickstart-express/issues).

## 📚 Learning Resources

### Q: I'm new to Express.js. Where should I start?

**A:** Great resources:
- [Express.js Official Docs](https://expressjs.com/)
- [Node.js Official Docs](https://nodejs.org/docs/)
- Create a simple project: `kickstart-express --name learning --language js`
- Try the structured example to see best practices

### Q: Should I learn TypeScript?

**A:** TypeScript is highly recommended for:
- Better IDE support and autocomplete
- Catching errors at development time
- Large applications and team projects
- Modern development practices

Start with: `kickstart-express --name ts-learning --language ts --src`

### Q: What should I learn after Express.js?

**A:** Consider these next steps:
- **Databases:** MongoDB, PostgreSQL
- **Authentication:** JWT, OAuth, Passport.js
- **Testing:** Jest, Supertest
- **DevOps:** Docker, CI/CD, cloud deployment
- **Advanced patterns:** Microservices, GraphQL

## 🔍 Still Need Help?

If your question isn't answered here:

1. **Check GitHub Issues:** [Open Issues](https://github.com/bhaveshsinghal95182/kickstart-express/issues)
2. **Open a new issue:** Include error messages and steps to reproduce
3. **Read the docs:** [Full Documentation](./README.md)

We're here to help! 🚀