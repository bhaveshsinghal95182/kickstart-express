export default function GettingStartedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Getting Started</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to install and use Kickstart Express to scaffold your first Express.js project.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Installation
          </h2>
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Global Installation (Recommended)
            </h3>
            <p className="leading-7">
              Install Kickstart Express globally to use it from anywhere on your system:
            </p>
            <div className="rounded-md bg-muted p-4">
              <pre><code>npm install -g kickstart-express</code></pre>
            </div>
            
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Using npx (No Installation Required)
            </h3>
            <p className="leading-7">
              You can also use npx to run Kickstart Express without installing it globally:
            </p>
            <div className="rounded-md bg-muted p-4">
              <pre><code>npx kickstart-express</code></pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Requirements
          </h2>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li><strong>Node.js</strong> >= 18.0.0</li>
            <li><strong>pnpm</strong> (recommended) or npm</li>
            <li><strong>Git</strong> (for project initialization)</li>
          </ul>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Your First Project
          </h2>
          <p className="leading-7">
            Once you have Kickstart Express installed, creating your first project is simple:
          </p>
          
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6">
            Interactive Mode
          </h3>
          <p className="leading-7">
            Simply run the command and follow the interactive prompts:
          </p>
          <div className="rounded-md bg-muted p-4 mb-4">
            <pre><code>kickstart-express</code></pre>
          </div>
          <p className="leading-7">
            The CLI will guide you through:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li><strong>Project name</strong> - Name for your new project directory</li>
            <li><strong>Language</strong> - Choose between TypeScript or JavaScript</li>
            <li><strong>Include Dockerfile</strong> - Optional Docker configuration</li>
            <li><strong>Source folder structure</strong> - Simple or organized structure</li>
            <li><strong>Structured architecture</strong> - Controllers, services, and routes separation</li>
          </ul>

          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6">
            Non-Interactive Mode
          </h3>
          <p className="leading-7">
            For faster scaffolding, you can pass arguments directly:
          </p>
          <div className="rounded-md bg-muted p-4 mb-4">
            <pre><code>kickstart-express --name my-awesome-api --language ts --docker --src --structured</code></pre>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Running Your Project
          </h2>
          <p className="leading-7">
            After creating your project, navigate to the directory and start development:
          </p>
          <div className="rounded-md bg-muted p-4 mb-4">
            <pre><code>{`# Navigate to your project
cd my-awesome-api

# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev`}</code></pre>
          </div>
          <p className="leading-7">
            Your Express server will be running at <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">http://localhost:3000</code>!
          </p>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Available Scripts
          </h2>
          <p className="leading-7">
            All generated projects come with these npm scripts:
          </p>
          
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6">
            TypeScript Projects
          </h3>
          <div className="rounded-md bg-muted p-4 mb-4">
            <pre><code>{`pnpm dev      # Start development server with hot reload
pnpm build    # Build for production
pnpm start    # Start production server`}</code></pre>
          </div>

          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            JavaScript Projects
          </h3>
          <div className="rounded-md bg-muted p-4 mb-4">
            <pre><code>{`pnpm dev      # Start development server with nodemon
pnpm start    # Start production server`}</code></pre>
          </div>

          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Docker Projects
          </h3>
          <div className="rounded-md bg-muted p-4 mb-4">
            <pre><code>docker-compose up --build  # Build and run with Docker</code></pre>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Next Steps
          </h2>
          <p className="leading-7">
            Now that you have your first Express.js project running, explore these topics:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Learn about <a href="/docs/cli-reference" className="font-medium text-primary underline underline-offset-4">CLI options and commands</a></li>
            <li>Explore <a href="/docs/examples" className="font-medium text-primary underline underline-offset-4">usage examples</a> for different scenarios</li>
            <li>Understand the <a href="/docs/templates" className="font-medium text-primary underline underline-offset-4">project templates</a> and structures</li>
            <li>Check out the <a href="/docs/api-reference" className="font-medium text-primary underline underline-offset-4">API reference</a> for programmatic usage</li>
          </ul>
        </section>
      </div>
    </div>
  )
}