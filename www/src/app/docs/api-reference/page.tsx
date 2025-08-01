export default function ApiReferencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Programmatic usage and API documentation for integrating Kickstart Express into your tools and workflows.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Node.js API
          </h2>
          <p className="leading-7 mb-4">
            While Kickstart Express is primarily a CLI tool, you can also use it programmatically in Node.js applications.
          </p>
          
          <div className="border rounded-lg p-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Installation</h3>
            <div className="rounded-md bg-muted p-4 mt-2">
              <pre><code>npm install kickstart-express</code></pre>
            </div>
          </div>

          <div className="border rounded-lg p-4 mt-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Basic Usage</h3>
            <div className="rounded-md bg-muted p-4 mt-2">
              <pre><code>{`const { generateProject } = require('kickstart-express');

// Generate a project programmatically
await generateProject({
  name: 'my-api',
  language: 'ts',
  docker: true,
  src: true,
  structured: true,
  outputDir: './projects'
});`}</code></pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Configuration Object
          </h2>
          <p className="leading-7 mb-4">
            The configuration object used for programmatic project generation.
          </p>
          
          <div className="border rounded-lg p-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">ProjectConfig Interface</h3>
            <div className="rounded-md bg-muted p-4 mt-2">
              <pre><code>{`interface ProjectConfig {
  name: string;                    // Project name (required)
  language: 'ts' | 'js';          // Programming language
  docker?: boolean;               // Include Docker files
  src?: boolean;                  // Use src folder structure
  structured?: boolean;           // Use structured architecture
  outputDir?: string;             // Output directory (default: current)
  packageManager?: 'npm' | 'pnpm' | 'yarn'; // Package manager
  installDependencies?: boolean;  // Auto-install dependencies
}`}</code></pre>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Configuration Properties</h3>
            <div className="space-y-4 mt-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">name</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Type:</strong> <code>string</code> (required)<br />
                  <strong>Description:</strong> The name of the project. Used as directory name and in package.json.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">language</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Type:</strong> <code>'ts' | 'js'</code><br />
                  <strong>Default:</strong> <code>'ts'</code><br />
                  <strong>Description:</strong> Programming language for the project.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">docker</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Type:</strong> <code>boolean</code><br />
                  <strong>Default:</strong> <code>false</code><br />
                  <strong>Description:</strong> Include Dockerfile and docker-compose.yml files.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">src</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Type:</strong> <code>boolean</code><br />
                  <strong>Default:</strong> <code>false</code><br />
                  <strong>Description:</strong> Create src folder structure instead of root-level files.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">structured</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Type:</strong> <code>boolean</code><br />
                  <strong>Default:</strong> <code>false</code><br />
                  <strong>Description:</strong> Use structured architecture with controllers, services, routes. Automatically enables src.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">outputDir</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Type:</strong> <code>string</code><br />
                  <strong>Default:</strong> <code>process.cwd()</code><br />
                  <strong>Description:</strong> Directory where the project will be created.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">packageManager</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Type:</strong> <code>'npm' | 'pnpm' | 'yarn'</code><br />
                  <strong>Default:</strong> <code>'pnpm'</code><br />
                  <strong>Description:</strong> Package manager to use for dependency installation.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">installDependencies</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Type:</strong> <code>boolean</code><br />
                  <strong>Default:</strong> <code>true</code><br />
                  <strong>Description:</strong> Automatically install dependencies after project generation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            API Methods
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">generateProject()</h3>
              <p className="text-muted-foreground mb-4">
                Main method to generate a new Express.js project.
              </p>
              
              <div className="rounded-md bg-muted p-4 mb-4">
                <pre><code>{`async function generateProject(config: ProjectConfig): Promise<GenerationResult>`}</code></pre>
              </div>

              <h4 className="font-semibold mt-4 mb-2">Parameters:</h4>
              <ul className="ml-6 list-disc [&>li]:mt-1 text-sm">
                <li><strong>config</strong> - ProjectConfig object with project configuration</li>
              </ul>

              <h4 className="font-semibold mt-4 mb-2">Returns:</h4>
              <p className="text-sm">Promise&lt;GenerationResult&gt;</p>
              
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre><code>{`interface GenerationResult {
  success: boolean;
  projectPath: string;
  message: string;
  error?: string;
}`}</code></pre>
              </div>

              <h4 className="font-semibold mt-4 mb-2">Example:</h4>
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`const result = await generateProject({
  name: 'my-awesome-api',
  language: 'ts',
  docker: true,
  structured: true
});

if (result.success) {
  console.log(\`Project created at: \${result.projectPath}\`);
} else {
  console.error(\`Error: \${result.error}\`);
}`}</code></pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">validateConfig()</h3>
              <p className="text-muted-foreground mb-4">
                Validate a project configuration before generation.
              </p>
              
              <div className="rounded-md bg-muted p-4 mb-4">
                <pre><code>{`function validateConfig(config: Partial<ProjectConfig>): ValidationResult`}</code></pre>
              </div>

              <h4 className="font-semibold mt-4 mb-2">Returns:</h4>
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}`}</code></pre>
              </div>

              <h4 className="font-semibold mt-4 mb-2">Example:</h4>
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`const validation = validateConfig({
  name: 'my-api',
  language: 'ts'
});

if (!validation.valid) {
  console.error('Configuration errors:', validation.errors);
}`}</code></pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">getTemplateInfo()</h3>
              <p className="text-muted-foreground mb-4">
                Get information about available templates and their features.
              </p>
              
              <div className="rounded-md bg-muted p-4 mb-4">
                <pre><code>{`function getTemplateInfo(): TemplateInfo[]`}</code></pre>
              </div>

              <div className="rounded-md bg-muted p-4">
                <pre><code>{`interface TemplateInfo {
  name: string;
  description: string;
  features: string[];
  language: 'ts' | 'js' | 'both';
  complexity: 'simple' | 'medium' | 'advanced';
}`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Integration Examples
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Build Tool Integration</h3>
              <p className="text-muted-foreground mb-4">
                Integrate with build tools like Gulp, Webpack, or custom scripts.
              </p>
              
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`// gulpfile.js
const { generateProject } = require('kickstart-express');

gulp.task('create-service', async () => {
  const serviceName = process.env.SERVICE_NAME || 'new-service';
  
  await generateProject({
    name: serviceName,
    language: 'ts',
    docker: true,
    structured: true,
    outputDir: './services'
  });
  
  console.log(\`Service \${serviceName} created!\`);
});`}</code></pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">CI/CD Pipeline</h3>
              <p className="text-muted-foreground mb-4">
                Use in continuous integration pipelines for automated project creation.
              </p>
              
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`// create-service.js
const { generateProject } = require('kickstart-express');

async function createService() {
  const config = {
    name: process.argv[2],
    language: 'ts',
    docker: true,
    structured: true,
    outputDir: process.env.SERVICES_DIR || './services'
  };

  try {
    const result = await generateProject(config);
    
    if (result.success) {
      console.log(\`✅ Service created: \${result.projectPath}\`);
      process.exit(0);
    } else {
      console.error(\`❌ Failed: \${result.error}\`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

createService();`}</code></pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Custom CLI Tool</h3>
              <p className="text-muted-foreground mb-4">
                Build your own CLI tool on top of Kickstart Express.
              </p>
              
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`#!/usr/bin/env node
const { generateProject, validateConfig } = require('kickstart-express');
const { program } = require('commander');

program
  .command('api <name>')
  .description('Create a new API service')
  .option('--lang <language>', 'Programming language', 'ts')
  .option('--no-docker', 'Skip Docker configuration')
  .action(async (name, options) => {
    const config = {
      name,
      language: options.lang,
      docker: options.docker,
      structured: true,
      src: true
    };

    const validation = validateConfig(config);
    if (!validation.valid) {
      console.error('Invalid configuration:', validation.errors);
      return;
    }

    const result = await generateProject(config);
    console.log(result.message);
  });

program.parse();`}</code></pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Express.js Middleware</h3>
              <p className="text-muted-foreground mb-4">
                Create an endpoint in your existing Express app to generate new projects.
              </p>
              
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`const express = require('express');
const { generateProject } = require('kickstart-express');

const app = express();
app.use(express.json());

app.post('/api/projects', async (req, res) => {
  try {
    const { name, language, features } = req.body;
    
    const config = {
      name,
      language: language || 'ts',
      docker: features?.includes('docker'),
      structured: features?.includes('structured'),
      outputDir: './generated-projects'
    };

    const result = await generateProject(config);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Project created successfully',
        path: result.projectPath
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Error Handling
          </h2>
          
          <div className="space-y-4 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Common Errors</h3>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold">PROJECT_EXISTS</h4>
                  <p className="text-sm text-muted-foreground">Project directory already exists</p>
                  <div className="rounded-md bg-muted p-2 mt-1">
                    <pre><code className="text-xs">Error: Directory 'my-api' already exists</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">INVALID_NAME</h4>
                  <p className="text-sm text-muted-foreground">Invalid project name format</p>
                  <div className="rounded-md bg-muted p-2 mt-1">
                    <pre><code className="text-xs">Error: Project name must be a valid npm package name</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">PERMISSION_DENIED</h4>
                  <p className="text-sm text-muted-foreground">Insufficient permissions to create project</p>
                  <div className="rounded-md bg-muted p-2 mt-1">
                    <pre><code className="text-xs">Error: Permission denied writing to directory</code></pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">DEPENDENCY_INSTALL_FAILED</h4>
                  <p className="text-sm text-muted-foreground">Failed to install project dependencies</p>
                  <div className="rounded-md bg-muted p-2 mt-1">
                    <pre><code className="text-xs">Error: Failed to install dependencies with pnpm</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Error Handling Example</h3>
              
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`async function createProjectSafely(config) {
  try {
    // Validate configuration first
    const validation = validateConfig(config);
    if (!validation.valid) {
      throw new Error(\`Invalid config: \${validation.errors.join(', ')}\`);
    }

    // Check if project already exists
    const projectPath = path.join(config.outputDir || '.', config.name);
    if (fs.existsSync(projectPath)) {
      throw new Error(\`Project '\${config.name}' already exists\`);
    }

    // Generate project
    const result = await generateProject(config);
    
    if (!result.success) {
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.error('Failed to create project:', error.message);
    
    // Cleanup on failure
    if (fs.existsSync(projectPath)) {
      fs.removeSync(projectPath);
    }
    
    throw error;
  }
}`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            TypeScript Support
          </h2>
          <p className="leading-7 mb-4">
            Kickstart Express includes full TypeScript definitions for type-safe development.
          </p>
          
          <div className="border rounded-lg p-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Type Definitions</h3>
            <div className="rounded-md bg-muted p-4">
              <pre><code>{`// Install types (included automatically)
npm install @types/kickstart-express

// Import with full type support
import { 
  generateProject, 
  validateConfig, 
  ProjectConfig, 
  GenerationResult 
} from 'kickstart-express';

// Type-safe configuration
const config: ProjectConfig = {
  name: 'typed-api',
  language: 'ts',
  docker: true,
  structured: true
};

// Type-safe result handling
const result: GenerationResult = await generateProject(config);`}</code></pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}