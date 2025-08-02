import { CodeBlock } from "@/components/ui/code-block";

export default function ExamplesPage() {
  return (
    <div className="space-y-6 relative">
      <div className="absolute -top-8 left-1/4 h-56 w-84 -z-10 rounded-full bg-green-500/15 blur-3xl" />
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Usage Examples
        </h1>
        <p className="text-xl text-muted-foreground">
          Real-world examples and use cases for different project types and
          scenarios.
        </p>
      </div>

      <div className="space-y-8 relative">
        <div className="absolute top-24 right-16 h-40 w-40 -z-10 rounded-full bg-orange-500/12 blur-2xl" />
        <div className="absolute top-64 left-12 h-36 w-36 -z-10 rounded-full bg-purple-500/12 blur-2xl" />
        <div className="absolute top-96 right-8 h-32 w-32 -z-10 rounded-full bg-blue-500/12 blur-2xl" />
        <div className="absolute bottom-64 left-1/4 h-44 w-44 -z-10 rounded-full bg-pink-500/12 blur-2xl" />
        <div className="absolute bottom-32 right-1/3 h-38 w-38 -z-10 rounded-full bg-cyan-500/12 blur-2xl" />
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Quick Start Examples
          </h2>

          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Interactive Mode
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                The easiest way to get started - let the CLI guide you through
                configuration.
              </p>
              <CodeBlock>
{`# Install the CLI
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
pnpm dev`}
              </CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                One-Line Setup
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Create a fully-featured project with a single command.
              </p>
              <CodeBlock>
{`# Create a TypeScript project with all features
kickstart-express --name my-awesome-api --language ts --docker --src --structured

# Navigate and start
cd my-awesome-api && pnpm dev`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Project Types
          </h2>

          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Microservice API
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Perfect for building lightweight microservices with TypeScript
                and Docker.
              </p>
              <CodeBlock>kickstart-express --name user-service --language ts --docker --src --structured</CodeBlock>
              <p className="text-sm text-muted-foreground">
                <strong>Generated structure:</strong> TypeScript, Docker-ready,
                organized codebase with controllers/services separation
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Rapid Prototype
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Quick and simple setup for prototyping or learning.
              </p>
              <CodeBlock>kickstart-express --name prototype-api --language js</CodeBlock>
              <p className="text-sm text-muted-foreground">
                <strong>Generated structure:</strong> Simple JavaScript setup,
                minimal configuration, ready to code
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Enterprise API
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Full-featured setup for production applications with all best
                practices.
              </p>
              <CodeBlock>kickstart-express --name enterprise-api --language ts --docker --src --structured</CodeBlock>
              <p className="text-sm text-muted-foreground">
                <strong>Generated structure:</strong> TypeScript, Docker,
                structured architecture, production-ready
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Learning Project
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Great for beginners learning Express.js fundamentals.
              </p>
              <CodeBlock>kickstart-express --name learning-express --language js --src</CodeBlock>
              <p className="text-sm text-muted-foreground">
                <strong>Generated structure:</strong> JavaScript, organized src
                folder, simple but clean structure
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Development Workflows
          </h2>

          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                TypeScript Development
              </h3>
              <CodeBlock>
{`# Create TypeScript project
kickstart-express --name ts-api --language ts --src

# Development workflow
cd ts-api
pnpm dev        # Start with hot reload
pnpm build      # Build for production
pnpm start      # Start production server

# Project structure
ts-api/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
├── .env
└── .gitignore`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Docker Development
              </h3>
              <CodeBlock>
{`# Create Docker-ready project
kickstart-express --name docker-api --docker --src

# Docker workflow
cd docker-api
docker-compose up --build    # Build and run
docker-compose up            # Run existing image
docker-compose down          # Stop containers

# Project includes
docker-api/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── src/`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Structured Architecture
              </h3>
              <CodeBlock>
{`# Create structured project
kickstart-express --name structured-api --structured

# Generated API example
curl http://localhost:3000/api/calculator
curl -X POST http://localhost:3000/api/calculator/add \\
  -H "Content-Type: application/json" \\
  -d '{"a": 5, "b": 3}'

# Project structure
structured-api/
├── src/
│   ├── controllers/
│   │   └── calculator.controller.ts
│   ├── routes/
│   │   └── calculator.route.ts
│   ├── services/
│   │   └── calculator.service.ts
│   ├── models/
│   │   └── calculation.model.ts
│   └── index.ts`}
</CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Team Scenarios
          </h2>

          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                New Team Member Setup
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Share these commands with new team members for consistent
                project setup.
              </p>
              <CodeBlock>
{`# Team standard setup
npm install -g kickstart-express
kickstart-express --name team-project --language ts --docker --structured

# Or using npx (no global installation)
npx kickstart-express --name team-project --language ts --docker --structured`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                CI/CD Pipeline Setup
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Use in automated scripts for consistent project generation.
              </p>
              <CodeBlock>
{`#!/bin/bash
# setup-new-service.sh

SERVICE_NAME=$1
if [ -z "$SERVICE_NAME" ]; then
  echo "Usage: ./setup-new-service.sh <service-name>"
  exit 1
fi

# Generate service
npx kickstart-express --name "$SERVICE_NAME" --language ts --docker --structured

# Navigate and setup
cd "$SERVICE_NAME"
pnpm install
pnpm build

echo "Service $SERVICE_NAME created successfully!"`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Workshop/Training Setup
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Perfect for coding workshops or training sessions.
              </p>
              <CodeBlock>
{`# For participants
npx kickstart-express --name workshop-api --language js --src

# Quick verification
cd workshop-api
pnpm dev
# Visit http://localhost:3000 to confirm it's working`}
</CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Integration Examples
          </h2>

          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                With Package Managers
              </h3>
              <CodeBlock>
{`# Using npm
npm install -g kickstart-express
kickstart-express --name npm-project

# Using yarn globally
yarn global add kickstart-express
kickstart-express --name yarn-project

# Using pnpm globally  
pnpm add -g kickstart-express
kickstart-express --name pnpm-project

# Using npx (recommended)
npx kickstart-express --name no-install-project`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                In NPM Scripts
              </h3>
              <p className="leading-7 text-muted-foreground mb-4">
                Add to package.json for team workflows.
              </p>
              <CodeBlock>
{`{
  "scripts": {
    "create:service": "npx kickstart-express --language ts --docker --structured",
    "create:simple": "npx kickstart-express --language js",
    "setup:dev": "npx kickstart-express --name dev-api --language ts --src"
  }
}

# Usage
npm run create:service -- --name user-service
npm run create:simple -- --name quick-test`}
</CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Troubleshooting Examples
          </h2>

          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Debug Mode
              </h3>
              <CodeBlock>
{`# Enable debug output
KICKSTART_EXPRESS_DEBUG=1 kickstart-express --name debug-test

# Check if project exists
ls -la debug-test/

# Verify generation
cd debug-test && pnpm dev`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Common Issues
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Directory already exists:</h4>
                  <CodeBlock showCard={false} className="mt-1">rm -rf existing-project && kickstart-express --name existing-project</CodeBlock>
                </div>
                <div>
                  <h4 className="font-semibold">Permission issues:</h4>
                  <CodeBlock showCard={false} className="mt-1">sudo npm install -g kickstart-express</CodeBlock>
                </div>
                <div>
                  <h4 className="font-semibold">Node version compatibility:</h4>
                  <CodeBlock showCard={false} className="mt-1">{'node --version # Should be >= 18.0.0'}</CodeBlock>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
