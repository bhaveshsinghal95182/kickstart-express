# CLI Reference

Complete reference for all Kickstart Express command-line interface options.

## Command Syntax

```bash
kickstart-express [options]
```

## Usage Modes

Kickstart Express supports three distinct usage modes:

### 1. Full Interactive Mode
No arguments provided - prompts for all options:
```bash
kickstart-express
```

### 2. Partial Interactive Mode
Some arguments provided - prompts only for missing options:
```bash
kickstart-express --name my-app --docker
# Will prompt for: language, src folder, structured architecture
```

### 3. Full Non-Interactive Mode
All required arguments provided - no prompts:
```bash
kickstart-express --name my-app --language ts --docker --src --structured
```

## CLI Options

### Project Identification

#### `--name, -n <project-name>`
Specifies the name of the project directory to create.

- **Type:** String
- **Required:** Yes (will prompt if not provided)
- **Example:** `--name my-awesome-api`
- **Aliases:** `-n`

**Notes:**
- Creates a directory with this name in the current working directory
- Must be a valid directory name (no special characters except hyphens and underscores)
- If directory exists, the command will fail

### Language Options

#### `--language, -l <ts|js>`
Chooses the programming language for the project.

- **Type:** String (`ts` or `js`)
- **Default:** `ts` (TypeScript)
- **Example:** `--language js`
- **Aliases:** `-l`

**Values:**
- `ts` - TypeScript project with type definitions and tsx for development
- `js` - JavaScript project with nodemon for development

### Project Structure Options

#### `--src, -s`
Creates a `src/` folder structure instead of placing files in the root.

- **Type:** Boolean flag
- **Default:** `false`
- **Example:** `--src`
- **Aliases:** `-s`

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

#### `--structured`
Enables structured architecture with controllers, services, and routes.

- **Type:** Boolean flag
- **Default:** `false`
- **Example:** `--structured`
- **Dependencies:** Automatically enables `--src`

**Structure:**
```
my-app/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── models/
│   └── index.ts
├── package.json
└── ...
```

### Docker Options

#### `--docker, -d`
Includes Docker configuration files.

- **Type:** Boolean flag
- **Default:** `false`
- **Example:** `--docker`
- **Aliases:** `-d`

**Generated files:**
- `Dockerfile` - Multi-stage production-ready container
- `docker-compose.yml` - Development and production compose configuration

### Utility Options

#### `--help, -h`
Displays help information and usage examples.

- **Type:** Boolean flag
- **Example:** `--help`
- **Aliases:** `-h`

#### `--version, -V`
Displays the current version of Kickstart Express.

- **Type:** Boolean flag
- **Example:** `--version`
- **Aliases:** `-V`

## Option Combinations

### Recommended Combinations

#### Minimal TypeScript API
```bash
kickstart-express --name simple-api --language ts
```

#### Full-Featured TypeScript API
```bash
kickstart-express --name enterprise-api --language ts --docker --src --structured
```

#### JavaScript Project with Docker
```bash
kickstart-express --name js-api --language js --docker --src
```

#### Quick Prototyping
```bash
kickstart-express --name prototype --language js
```

### Option Dependencies

Some options have implicit dependencies:

- `--structured` automatically enables `--src` (cannot have structured architecture without src folder)
- Docker options work with any language choice
- Language choice affects available npm scripts and dependencies

## Exit Codes

| Code | Meaning |
|------|---------|
| 0    | Success |
| 1    | General error (invalid arguments, file system error) |
| 2    | Directory already exists |
| 3    | Git initialization failed |
| 4    | Package manager installation failed |

## Environment Variables

Kickstart Express respects these environment variables:

### `KICKSTART_EXPRESS_PM`
Preferred package manager for dependency installation.

- **Values:** `npm`, `pnpm`, `yarn`
- **Default:** `pnpm`
- **Example:** `KICKSTART_EXPRESS_PM=npm kickstart-express --name my-app`

### `KICKSTART_EXPRESS_NO_INSTALL`
Skip automatic dependency installation.

- **Values:** `true`, `false`
- **Default:** `false`
- **Example:** `KICKSTART_EXPRESS_NO_INSTALL=true kickstart-express --name my-app`

## Advanced Usage

### Scripting and Automation

For CI/CD and automated workflows:

```bash
#!/bin/bash
# Create multiple microservices
services=("auth" "users" "orders" "payments")

for service in "${services[@]}"; do
  kickstart-express \
    --name "${service}-service" \
    --language ts \
    --docker \
    --src \
    --structured
done
```

### JSON Configuration (Future Feature)

Planned support for configuration files:

```json
{
  "name": "my-app",
  "language": "ts",
  "docker": true,
  "src": true,
  "structured": true
}
```

```bash
kickstart-express --config ./project-config.json
```

## Troubleshooting

### Common Issues

**"Directory already exists"**
```bash
# Solution: Use a different name or remove existing directory
rm -rf existing-project
kickstart-express --name existing-project
```

**"Command not found"**
```bash
# Solution: Install globally or use npx
npm install -g kickstart-express
# or
npx kickstart-express
```

**"Permission denied"**
```bash
# Solution: Check directory permissions
ls -la
chmod 755 .
```

For more troubleshooting help, see the [FAQ](./faq.md).

## Examples

For comprehensive usage examples, see [Usage Examples](./examples.md).