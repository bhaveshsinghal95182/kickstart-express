# API Reference

Programmatic usage and core classes for Kickstart Express.

## Overview

While Kickstart Express is primarily designed as a CLI tool, its core functionality is available for programmatic use. This is useful for:

- Building custom scaffolding tools
- Integrating with other development tools
- Creating automated project generation workflows
- Building IDE extensions or plugins

## Installation for Programmatic Use

```bash
npm install kickstart-express
```

## Core Classes

### `Scaffolder`

The main class responsible for project scaffolding.

#### Constructor

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';

const scaffolder = new Scaffolder(cliOptions?: CliOptions);
```

**Parameters:**

- `cliOptions` (optional): Pre-filled options to skip prompts

```typescript
interface CliOptions {
  projectName?: string;
  language?: 'ts' | 'js';
  src?: boolean;
  structuredSrc?: boolean;
  docker?: boolean;
}
```

#### Methods

##### `run(): Promise<void>`

Executes the scaffolding process.

```typescript
const scaffolder = new Scaffolder({
  projectName: 'my-api',
  language: 'ts',
  docker: true,
  src: true,
  structuredSrc: true
});

await scaffolder.run();
```

##### Internal Methods

These methods are used internally but can be overridden for customization:

##### `collectUserInputs(): Promise<ProjectOptions>`

Collects user inputs through interactive prompts for any missing options.

```typescript
interface ProjectOptions {
  src: boolean;
  structuredSrc: boolean;
  docker: boolean;
  language: 'ts' | 'js';
}
```

##### `copyTemplateFiles(projectPath: string): Promise<void>`

Copies template files to the target directory.

##### `updatePackageJson(projectPath: string): Promise<void>`

Updates package.json with appropriate scripts and dependencies.

##### `updateTsConfig(projectPath: string): Promise<void>`

Configures TypeScript settings based on project structure.

##### `initializeGitRepo(projectPath: string): Promise<void>`

Initializes a Git repository in the project directory.

##### `installDependencies(projectPath: string): Promise<void>`

Installs npm dependencies using the preferred package manager.

## Usage Examples

### Basic Programmatic Usage

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';

async function createProject() {
  // Create a TypeScript API with all features
  const scaffolder = new Scaffolder({
    projectName: 'my-awesome-api',
    language: 'ts',
    docker: true,
    src: true,
    structuredSrc: true
  });

  try {
    await scaffolder.run();
    console.log('Project created successfully!');
  } catch (error) {
    console.error('Failed to create project:', error);
  }
}

createProject();
```

### Partial Options (Interactive)

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';

async function createInteractiveProject() {
  // Only specify project name, prompt for other options
  const scaffolder = new Scaffolder({
    projectName: 'my-project',
    language: 'ts' // Default to TypeScript
  });

  await scaffolder.run();
  // Will prompt for: docker, src, structuredSrc
}
```

### Batch Project Creation

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';

async function createMicroservices() {
  const services = [
    { name: 'auth-service', structured: true },
    { name: 'user-service', structured: true },
    { name: 'order-service', structured: true },
    { name: 'notification-service', structured: false }
  ];

  for (const service of services) {
    const scaffolder = new Scaffolder({
      projectName: service.name,
      language: 'ts',
      docker: true,
      src: true,
      structuredSrc: service.structured
    });

    try {
      await scaffolder.run();
      console.log(`✓ Created ${service.name}`);
    } catch (error) {
      console.error(`✗ Failed to create ${service.name}:`, error);
    }
  }
}
```

## Extending the Scaffolder

### Custom Scaffolder Class

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';

class CustomScaffolder extends Scaffolder {
  constructor(cliOptions, customTemplates) {
    super(cliOptions);
    this.customTemplates = customTemplates;
  }

  // Override template copying to use custom templates
  async copyTemplateFiles(projectPath) {
    // Custom template logic here
    if (this.customTemplates) {
      await this.copyCustomTemplates(projectPath);
    } else {
      await super.copyTemplateFiles(projectPath);
    }
  }

  async copyCustomTemplates(projectPath) {
    // Implementation for custom templates
  }

  // Add custom post-scaffolding steps
  async run() {
    await super.run();
    await this.customPostProcessing();
  }

  async customPostProcessing() {
    // Custom post-processing logic
    console.log('Running custom post-processing...');
  }
}
```

### Custom Template Integration

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';
import fs from 'fs-extra';
import path from 'path';

class TemplateScaffolder extends Scaffolder {
  constructor(cliOptions, customTemplatePath) {
    super(cliOptions);
    this.customTemplatePath = customTemplatePath;
  }

  async copyTemplateFiles(projectPath) {
    if (this.customTemplatePath && fs.existsSync(this.customTemplatePath)) {
      // Copy from custom template directory
      await fs.copy(this.customTemplatePath, projectPath);
    } else {
      // Fall back to default templates
      await super.copyTemplateFiles(projectPath);
    }
  }
}

// Usage
const scaffolder = new TemplateScaffolder({
  projectName: 'custom-project',
  language: 'ts'
}, '/path/to/custom/templates');
```

## Environment Integration

### CI/CD Integration

```typescript
// ci-scaffold.js
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';

async function scaffoldForCI() {
  const projectConfig = {
    projectName: process.env.PROJECT_NAME || 'default-api',
    language: process.env.LANGUAGE || 'ts',
    docker: process.env.INCLUDE_DOCKER === 'true',
    src: process.env.USE_SRC === 'true',
    structuredSrc: process.env.STRUCTURED === 'true'
  };

  const scaffolder = new Scaffolder(projectConfig);
  await scaffolder.run();
}

if (process.env.CI) {
  scaffoldForCI().catch(console.error);
}
```

### Configuration File Support

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';
import fs from 'fs';

async function scaffoldFromConfig(configPath) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  const scaffolder = new Scaffolder({
    projectName: config.name,
    language: config.language,
    docker: config.features?.docker,
    src: config.structure?.src,
    structuredSrc: config.structure?.structured
  });

  await scaffolder.run();
}

// Usage with config.json
/*
{
  "name": "my-project",
  "language": "ts",
  "features": {
    "docker": true
  },
  "structure": {
    "src": true,
    "structured": true
  }
}
*/
```

## Error Handling

### Custom Error Classes

```typescript
class ScaffoldingError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ScaffoldingError';
    this.code = code;
  }
}

// Usage
try {
  await scaffolder.run();
} catch (error) {
  if (error instanceof ScaffoldingError) {
    console.error(`Scaffolding failed (${error.code}): ${error.message}`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Graceful Error Handling

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';

async function safeScaffold(options) {
  const scaffolder = new Scaffolder(options);
  
  try {
    await scaffolder.run();
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    };
  }
}

const result = await safeScaffold({
  projectName: 'test-project',
  language: 'ts'
});

if (result.success) {
  console.log('Project created successfully');
} else {
  console.error('Failed to create project:', result.error);
}
```

## Testing Support

### Unit Testing the Scaffolder

```typescript
import { Scaffolder } from 'kickstart-express/core/scaffolder.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('Scaffolder', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-scaffold-'));
    process.chdir(tempDir);
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  test('creates TypeScript project with src structure', async () => {
    const scaffolder = new Scaffolder({
      projectName: 'test-project',
      language: 'ts',
      src: true,
      structuredSrc: false,
      docker: false
    });

    await scaffolder.run();

    expect(fs.existsSync('test-project/src/index.ts')).toBe(true);
    expect(fs.existsSync('test-project/package.json')).toBe(true);
    expect(fs.existsSync('test-project/tsconfig.json')).toBe(true);
  });
});
```

### Integration Testing

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('CLI Integration', () => {
  test('CLI creates project with all options', async () => {
    const cmd = 'kickstart-express --name test-cli --language ts --docker --src --structured';
    
    await execAsync(cmd);
    
    expect(fs.existsSync('test-cli/src/controllers')).toBe(true);
    expect(fs.existsSync('test-cli/Dockerfile')).toBe(true);
  });
});
```

## Type Definitions

### Complete TypeScript Interfaces

```typescript
interface CliOptions {
  projectName?: string;
  language?: 'ts' | 'js';
  src?: boolean;
  structuredSrc?: boolean;
  docker?: boolean;
}

interface ProjectOptions {
  src: boolean;
  structuredSrc: boolean;
  docker: boolean;
  language: 'ts' | 'js';
}

interface ScaffolderConfig {
  templatePath?: string;
  packageManager?: 'npm' | 'pnpm' | 'yarn';
  skipInstall?: boolean;
  skipGitInit?: boolean;
}

class Scaffolder {
  constructor(cliOptions?: CliOptions, config?: ScaffolderConfig);
  
  run(): Promise<void>;
  collectUserInputs(): Promise<ProjectOptions>;
  copyTemplateFiles(projectPath: string): Promise<void>;
  updatePackageJson(projectPath: string): Promise<void>;
  updateTsConfig(projectPath: string): Promise<void>;
  initializeGitRepo(projectPath: string): Promise<void>;
  installDependencies(projectPath: string): Promise<void>;
}
```

## Best Practices

### 1. Error Handling
Always wrap scaffolder calls in try-catch blocks and handle errors gracefully.

### 2. Validation
Validate input options before passing them to the Scaffolder constructor.

### 3. Path Safety
Use absolute paths when working with custom template directories.

### 4. Resource Cleanup
Clean up temporary files and directories in case of errors.

### 5. Logging
Implement proper logging for debugging and monitoring.

### 6. Testing
Write tests for custom scaffolding logic and template modifications.

This API reference provides the foundation for building advanced tooling around Kickstart Express. For more examples and use cases, see the [Usage Examples](./examples.md) documentation.