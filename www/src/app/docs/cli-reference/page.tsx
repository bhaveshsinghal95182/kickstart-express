export default function CliReferencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">CLI Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for all Kickstart Express command-line options and usage patterns.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Basic Usage
          </h2>
          <div className="rounded-md bg-muted p-4 mb-4">
            <pre><code>kickstart-express [options]</code></pre>
          </div>
          <p className="leading-7">
            When run without any options, Kickstart Express starts in interactive mode, guiding you through project configuration.
          </p>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Global Options
          </h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-mono text-lg font-semibold">-h, --help</h3>
              <p className="text-muted-foreground">Display help information and exit.</p>
              <div className="rounded-md bg-muted p-2 mt-2">
                <pre><code>kickstart-express --help</code></pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-mono text-lg font-semibold">-V, --version</h3>
              <p className="text-muted-foreground">Display version number and exit.</p>
              <div className="rounded-md bg-muted p-2 mt-2">
                <pre><code>kickstart-express --version</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Project Configuration Options
          </h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-mono text-lg font-semibold">-n, --name &lt;project-name&gt;</h3>
              <p className="text-muted-foreground">Specify the project name. This will be used as the directory name.</p>
              <div className="rounded-md bg-muted p-2 mt-2">
                <pre><code>kickstart-express --name my-awesome-api</code></pre>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Required:</strong> Yes (if not provided, you'll be prompted)
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-mono text-lg font-semibold">-l, --language &lt;ts|js&gt;</h3>
              <p className="text-muted-foreground">Choose the programming language for your project.</p>
              <div className="rounded-md bg-muted p-2 mt-2">
                <pre><code>{`kickstart-express --language ts   # TypeScript
kickstart-express --language js   # JavaScript`}</code></pre>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Default:</strong> ts (TypeScript)
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-mono text-lg font-semibold">-d, --docker</h3>
              <p className="text-muted-foreground">Include Docker configuration (Dockerfile and docker-compose.yml).</p>
              <div className="rounded-md bg-muted p-2 mt-2">
                <pre><code>kickstart-express --docker</code></pre>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Default:</strong> false
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-mono text-lg font-semibold">-s, --src</h3>
              <p className="text-muted-foreground">Create src folder structure instead of root-level files.</p>
              <div className="rounded-md bg-muted p-2 mt-2">
                <pre><code>kickstart-express --src</code></pre>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Default:</strong> false
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-mono text-lg font-semibold">--structured</h3>
              <p className="text-muted-foreground">Use structured architecture with controllers, services, and routes separation.</p>
              <div className="rounded-md bg-muted p-2 mt-2">
                <pre><code>kickstart-express --structured</code></pre>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Default:</strong> false<br />
                <strong>Note:</strong> Automatically enables --src when used
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Usage Examples
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Interactive Mode</h3>
              <p className="leading-7">Start the interactive CLI to configure your project step by step:</p>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre><code>kickstart-express</code></pre>
              </div>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Full Featured Project</h3>
              <p className="leading-7">Create a TypeScript project with all features enabled:</p>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre><code>kickstart-express -n my-awesome-api -l ts -d -s --structured</code></pre>
              </div>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Simple JavaScript Project</h3>
              <p className="leading-7">Create a basic JavaScript project:</p>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre><code>kickstart-express --name simple-app --language js</code></pre>
              </div>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Docker-Ready Project</h3>
              <p className="leading-7">Create a project with Docker configuration:</p>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre><code>kickstart-express --name docker-api --docker --src</code></pre>
              </div>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Partial Configuration</h3>
              <p className="leading-7">Provide some options and be prompted for the rest:</p>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre><code>kickstart-express --name my-app --docker</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Configuration Combinations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="border-b">
                  <th className="border border-border px-4 py-2 text-left">Options</th>
                  <th className="border border-border px-4 py-2 text-left">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">--language js</td>
                  <td className="border border-border px-4 py-2">JavaScript project with simple structure</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">--language ts --src</td>
                  <td className="border border-border px-4 py-2">TypeScript project with src/ folder</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">--structured</td>
                  <td className="border border-border px-4 py-2">Structured architecture (auto-enables --src)</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">--docker --structured</td>
                  <td className="border border-border px-4 py-2">Full-featured project with Docker and structure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Exit Codes
          </h2>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li><strong>0</strong> - Success</li>
            <li><strong>1</strong> - General error (invalid arguments, file system errors, etc.)</li>
            <li><strong>2</strong> - Project directory already exists</li>
            <li><strong>130</strong> - User interrupted the process (Ctrl+C)</li>
          </ul>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Environment Variables
          </h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-mono text-lg font-semibold">KICKSTART_EXPRESS_DEBUG</h3>
              <p className="text-muted-foreground">Enable debug output for troubleshooting.</p>
              <div className="rounded-md bg-muted p-2 mt-2">
                <pre><code>KICKSTART_EXPRESS_DEBUG=1 kickstart-express --name debug-test</code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}