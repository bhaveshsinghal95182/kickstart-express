# Adding Features to Your Project

One of the key features of Kickstart Express v2 is the ability to enhance existing projects with additional functionality using the `add` command.

## Overview

The `add` command allows you to extend your existing kickstart-express projects with:

- **Database Support** - Multiple database and ORM options
- **Authentication** - JWT or Clerk authentication systems
- **More features coming soon** - API docs, testing, and more

## Prerequisites

- You must run the `add` command from within an existing kickstart-express project directory
- The project should have been created with kickstart-express (any version)

## Available Features

### Database Support

Add comprehensive database support to your project:

```bash
kickstart-express add database
# or
kickstart-express add db
```

#### Supported Databases:
- **MongoDB** with Mongoose
- **PostgreSQL** with Prisma
- **PostgreSQL** with Drizzle
- **SQLite** with Prisma (for development)

#### What Gets Added:
- Database connection configuration
- Environment variables for database URLs
- Sample models and schemas
- Database initialization scripts
- Type definitions (for TypeScript projects)

### Authentication

Add authentication support to your project:

```bash
kickstart-express add auth
```

#### Supported Authentication Methods:
- **JWT (JSON Web Tokens)** - Self-hosted authentication
- **Clerk** - Third-party authentication service

#### What Gets Added:
- Authentication middleware
- User models and types
- Login/signup endpoints
- JWT token handling (for JWT option)
- Clerk integration (for Clerk option)
- Protected route examples

## Usage Examples

### Complete Project Setup

```bash
# 1. Create a new project
kickstart-express --name my-api --language ts --docker --src --structured

# 2. Navigate to project
cd my-api

# 3. Install dependencies and start development
pnpm install
pnpm dev

# 4. In a new terminal, add database support
kickstart-express add database

# 5. Add authentication
kickstart-express add auth
```

### Adding to Existing Projects

If you have an existing kickstart-express project:

```bash
# Navigate to your project
cd my-existing-project

# Add any missing features
kickstart-express add database
kickstart-express add auth
```

## Interactive Configuration

When you run the `add` command, you'll be prompted to configure the feature:

### Database Configuration Example:
```
? Which database would you like to use?
❯ MongoDB with Mongoose
  PostgreSQL with Prisma
  PostgreSQL with Drizzle
  SQLite with Prisma

? What would you like to call your main model? (User)
? Include sample CRUD operations? (Y/n)
```

### Authentication Configuration Example:
```
? Which authentication method would you like to use?
❯ JWT (JSON Web Tokens)
  Clerk

? Include user registration endpoint? (Y/n)
? Include password reset functionality? (Y/n)
```

## Feature Integration

Features added through the `add` command are designed to integrate seamlessly with your existing code:

- **Environment Variables** - Added to your `.env` file
- **Dependencies** - Automatically added to `package.json`
- **TypeScript Support** - Type definitions included for TS projects
- **Structured Projects** - Features follow your existing architecture
- **Documentation** - README updates with setup instructions

## File Structure After Adding Features

### With Database (MongoDB + Mongoose):
```
my-app/
├── src/
│   ├── models/
│   │   └── User.model.ts
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── routes/
│   │   └── user.route.ts
│   ├── config/
│   │   └── database.ts
│   └── ...
├── .env (updated)
├── package.json (updated)
└── ...
```

### With Authentication (JWT):
```
my-app/
├── src/
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── routes/
│   │   └── auth.route.ts
│   ├── utils/
│   │   └── jwt.util.ts
│   └── ...
├── .env (updated)
├── package.json (updated)
└── ...
```

## Best Practices

1. **Add features incrementally** - Start with database, then authentication, etc.
2. **Test after each addition** - Ensure each feature works before adding the next
3. **Review generated code** - Understand what was added and customize as needed
4. **Commit changes** - Use git to track what each feature adds
5. **Update documentation** - The README will be updated, but add your own notes

## Troubleshooting

### Common Issues:

**"Not a kickstart-express project"**
```bash
# Make sure you're in the right directory
pwd
ls -la package.json
```

**"Feature already exists"**
```bash
# Some features can be re-run to update configuration
kickstart-express add database --force
```

**"Dependency conflicts"**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

## Coming Soon

Future features planned for the `add` command:

- **API Documentation** - Swagger/OpenAPI integration
- **Testing Setup** - Jest/Vitest configuration
- **Caching** - Redis integration
- **Logging** - Winston/Pino logging setup
- **Monitoring** - Health checks and metrics
- **Deployment** - Heroku, Vercel, Docker configs

## Need Help?

- Check the [CLI Reference](./cli-reference.md) for command details
- Review [Examples](./examples.md) for real-world usage
- Open an issue on [GitHub](https://github.com/bhaveshsinghal95182/kickstart-express) for feature requests