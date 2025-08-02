import { CodeBlock } from "@/components/ui/code-block";

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Common questions and answers about Kickstart Express.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            General Questions
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                What is Kickstart Express?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Kickstart Express is a powerful CLI tool that helps you quickly scaffold Express.js projects with modern tooling and best practices. 
                It supports both TypeScript and JavaScript, offers multiple project templates, and includes optional Docker configuration.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Why use Kickstart Express instead of creating projects manually?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Kickstart Express saves you time by providing:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li>Pre-configured project structures with best practices</li>
                <li>Automatic dependency management and setup</li>
                <li>Multiple template options for different use cases</li>
                <li>Docker support for containerized development</li>
                <li>TypeScript configuration that just works</li>
                <li>Consistent project structure across your organization</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Is Kickstart Express free to use?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Yes! Kickstart Express is completely free and open-source. It's released under the ISC license, 
                which means you can use it for personal and commercial projects without any restrictions.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                What's the difference between interactive and non-interactive mode?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                <strong>Interactive mode</strong> (default) guides you through project configuration with prompts, 
                making it perfect for beginners or when you want to explore options.
              </p>
              <p className="leading-7 text-muted-foreground mt-2">
                <strong>Non-interactive mode</strong> allows you to specify all options via command-line arguments, 
                ideal for automation, scripts, or when you know exactly what you want.
              </p>
              <CodeBlock>
{`# Interactive
kickstart-express

# Non-interactive
kickstart-express --name my-api --language ts --docker --structured`}
</CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Installation & Setup
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Do I need to install Kickstart Express globally?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                No, you have two options:
              </p>
              <div className="mt-3 space-y-2">
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">Global installation (recommended for frequent use):</p>
                  <CodeBlock showCard={false}>npm install -g kickstart-express</CodeBlock>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">No installation with npx (recommended for occasional use):</p>
                  <CodeBlock showCard={false}>npx kickstart-express</CodeBlock>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                What Node.js version do I need?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Kickstart Express requires Node.js version 18.0.0 or higher. You can check your version with:
              </p>
              <CodeBlock>node --version</CodeBlock>
              <p className="text-sm text-muted-foreground mt-2">
                If you need to update Node.js, visit <a href="https://nodejs.org" className="text-primary underline">nodejs.org</a> 
                or use a version manager like nvm.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Can I use npm instead of pnpm?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Yes! While the generated projects use pnpm by default (for faster installs), you can use any package manager. 
                The generated package.json works with npm, yarn, and pnpm.
              </p>
              <CodeBlock>
{`# Using npm
cd my-project
npm install
npm run dev

# Using yarn
cd my-project  
yarn install
yarn dev`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                I'm getting permission errors on macOS/Linux. What should I do?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                This usually happens when installing globally. Try one of these solutions:
              </p>
              <div className="mt-3 space-y-2">
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">Option 1: Use npx (no installation needed):</p>
                  <CodeBlock showCard={false}>npx kickstart-express</CodeBlock>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">Option 2: Configure npm to use a different directory:</p>
                  <CodeBlock showCard={false}>
{`mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH`}
                  </CodeBlock>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">Option 3: Use a Node version manager (recommended):</p>
                  <CodeBlock showCard={false}>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash</CodeBlock>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Project Templates
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Which template should I choose?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Choose based on your project size and complexity:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-2 text-sm text-muted-foreground">
                <li><strong>Simple:</strong> Perfect for learning, prototypes, or small APIs</li>
                <li><strong>Src folder:</strong> Good for medium-sized projects that need organization</li>
                <li><strong>Structured:</strong> Best for large applications, teams, or production use</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                See our <a href="/docs/templates" className="text-primary underline">Project Templates guide</a> for detailed comparisons.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                What's included in the structured template?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                The structured template includes:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li>Separation of concerns (controllers, services, routes, models)</li>
                <li>A working calculator API example</li>
                <li>Proper TypeScript types and interfaces</li>
                <li>Best practices for error handling</li>
                <li>Scalable architecture patterns</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Can I modify the generated project?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Absolutely! The generated project is completely yours to modify. Kickstart Express just gives you a solid starting point. 
                You can add dependencies, change the structure, add new features, or modify anything to fit your needs.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Should I use TypeScript or JavaScript?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                We recommend TypeScript for most projects because it provides:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li>Better IDE support with autocomplete and error detection</li>
                <li>Compile-time error checking</li>
                <li>Better refactoring capabilities</li>
                <li>Improved code documentation through types</li>
              </ul>
              <p className="leading-7 text-muted-foreground mt-3">
                Choose JavaScript if you're just learning or need to get something running quickly without the TypeScript learning curve.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Docker & Deployment
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                When should I use the Docker option?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Use Docker when you:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li>Want consistent development environments across your team</li>
                <li>Plan to deploy to containerized platforms (Kubernetes, Docker Swarm)</li>
                <li>Are building microservices</li>
                <li>Want to isolate your application dependencies</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Do I need Docker installed to use the Docker template?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                No, you can generate a project with Docker files without having Docker installed. 
                However, you'll need Docker installed to actually build and run the containerized application.
              </p>
              <CodeBlock>
{`# Generate with Docker files (no Docker needed)
kickstart-express --name my-api --docker

# Build and run (requires Docker)
cd my-api
docker-compose up --build`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                How do I deploy my generated project?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                The generated projects are ready for deployment to various platforms:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li><strong>Heroku:</strong> Push to git, add Procfile if needed</li>
                <li><strong>Vercel/Netlify:</strong> Works with minor adjustments for serverless</li>
                <li><strong>DigitalOcean/AWS:</strong> Use the included Docker configuration</li>
                <li><strong>Traditional VPS:</strong> Run npm build && npm start</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Troubleshooting
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                The command "kickstart-express" is not found
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                This usually means the package isn't installed globally or your PATH isn't configured correctly. Try:
              </p>
              <CodeBlock>
{`# Use npx instead (recommended)
npx kickstart-express

# Or install globally
npm install -g kickstart-express

# Check if it's installed
npm list -g kickstart-express`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                "Directory already exists" error
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                This happens when you try to create a project with a name that already exists in the current directory. 
                Choose a different name or remove the existing directory:
              </p>
              <CodeBlock>
{`# Use a different name
kickstart-express --name my-api-v2

# Or remove the existing directory (be careful!)
rm -rf existing-project
kickstart-express --name existing-project`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Generated project won't start
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                First, make sure you've installed dependencies and check for error messages:
              </p>
              <CodeBlock>
{`cd your-project

# Install dependencies
pnpm install  # or npm install

# Check for TypeScript errors (TS projects only)
pnpm build    # or npm run build

# Start development server
pnpm dev      # or npm run dev`}
</CodeBlock>
              <p className="text-sm text-muted-foreground mt-3">
                If you're still having issues, check that port 3000 isn't already in use or set a different port in your .env file.
              </p>
            </div>


            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                I found a bug or have a feature request
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                We appreciate feedback! Please:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li>Check <a href="https://github.com/bhaveshsinghal95182/kickstart-express/issues" className="text-primary underline">existing issues</a> first</li>
                <li>Create a new issue with detailed information</li>
                <li>Include your Node.js version, OS, and steps to reproduce</li>
                <li>For feature requests, explain the use case and benefits</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Advanced Usage
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Can I use Kickstart Express in CI/CD pipelines?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Yes! It's perfect for automated project generation. Use non-interactive mode:
              </p>
              <CodeBlock>
{`# In your CI script
npx kickstart-express --name $SERVICE_NAME --language ts --docker --structured

# Or create a script for your team
#!/bin/bash
npx kickstart-express --name "$1" --language ts --docker --structured
cd "$1" && pnpm install && pnpm build`}
</CodeBlock>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Can I customize the templates?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                While you can't customize templates directly, you can:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li>Generate a project and modify it as needed</li>
                <li>Create your own wrapper script with post-generation customizations</li>
                <li>Fork the project and modify templates for your organization</li>
                <li>Request new templates via feature requests</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                How do I integrate with my team's development workflow?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Several approaches work well:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li>Add kickstart-express to your team's setup documentation</li>
                <li>Create npm scripts that wrap kickstart-express with your preferred options</li>
                <li>Use it in project templates or yeoman generators</li>
                <li>Include it in development environment setup scripts</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Is there an API for programmatic usage?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Yes! While primarily a CLI tool, you can use it programmatically in Node.js applications. 
                See our <a href="/docs/api-reference" className="text-primary underline">API Reference</a> for details.
              </p>
              <CodeBlock>
{`const { generateProject } = require('kickstart-express');

await generateProject({
  name: 'my-api',
  language: 'ts',
  structured: true
});`}
</CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Contributing & Community
          </h2>
          
          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                How can I contribute to Kickstart Express?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                We welcome all kinds of contributions! Check out our <a href="/docs/contributing" className="text-primary underline">Contributing Guide</a> 
                for detailed information on:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li>Reporting bugs and requesting features</li>
                <li>Improving documentation</li>
                <li>Adding new templates or features</li>
                <li>Helping with testing and code review</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Where can I get help or discuss ideas?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                Join our community:
              </p>
              <ul className="mt-3 ml-6 list-disc [&>li]:mt-1 text-sm text-muted-foreground">
                <li><a href="https://github.com/bhaveshsinghal95182/kickstart-express/issues" className="text-primary underline">GitHub Issues</a> for bugs and feature requests</li>
                <li><a href="https://github.com/bhaveshsinghal95182/kickstart-express/discussions" className="text-primary underline">GitHub Discussions</a> for questions and ideas</li>
                <li>This documentation site for guides and examples</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Will you add support for other frameworks (Fastify, Koa, etc.)?
              </h3>
              <p className="leading-7 text-muted-foreground mt-2">
                While Kickstart Express focuses on Express.js, we're open to expanding support based on community demand. 
                If you're interested in other frameworks, please create a feature request explaining your use case!
              </p>
            </div>
          </div>
        </section>

        <section className="border rounded-lg p-6 bg-muted/50">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Still have questions?
          </h2>
          <p className="leading-7 text-muted-foreground mt-2">
            If you didn't find what you're looking for, don't hesitate to reach out:
          </p>
          <ul className="mt-4 ml-6 list-disc [&>li]:mt-1 text-sm">
            <li>Browse our <a href="/docs" className="text-primary underline">complete documentation</a></li>
            <li>Search or create an <a href="https://github.com/bhaveshsinghal95182/kickstart-express/issues" className="text-primary underline">issue on GitHub</a></li>
            <li>Start a <a href="https://github.com/bhaveshsinghal95182/kickstart-express/discussions" className="text-primary underline">discussion</a> for general questions</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            We're here to help you build amazing Express.js applications!
          </p>
        </section>
      </div>
    </div>
  )
}