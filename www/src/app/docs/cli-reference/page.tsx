import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CliReferencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">CLI Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for all Kickstart Express command-line options and usage patterns.
        </p>
      </div>

      <Separator />

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Basic Usage
          </h2>
          <Card>
            <CardContent className="pt-4">
              <pre><code>kickstart-express [options]</code></pre>
            </CardContent>
          </Card>
          <p className="leading-7">
            When run without any options, Kickstart Express starts in interactive mode, guiding you through project configuration.
          </p>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Global Options
          </h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">-h, --help</CardTitle>
                <CardDescription>Display help information and exit.</CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardContent className="pt-4">
                    <pre><code>kickstart-express --help</code></pre>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">-V, --version</CardTitle>
                <CardDescription>Display version number and exit.</CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardContent className="pt-4">
                    <pre><code>kickstart-express --version</code></pre>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Project Configuration Options
          </h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">-n, --name &lt;project-name&gt;</CardTitle>
                <CardDescription>Specify the project name. This will be used as the directory name.</CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardContent className="pt-4">
                    <pre><code>kickstart-express --name my-awesome-api</code></pre>
                  </CardContent>
                </Card>
                <div className="mt-2">
                  <Badge variant="destructive">Required</Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    Yes (if not provided, you'll be prompted)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">-l, --language &lt;ts|js&gt;</CardTitle>
                <CardDescription>Choose the programming language for your project.</CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardContent className="pt-4">
                    <pre><code>{`kickstart-express --language ts   # TypeScript
kickstart-express --language js   # JavaScript`}</code></pre>
                  </CardContent>
                </Card>
                <div className="mt-2">
                  <Badge variant="secondary">Default</Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    ts (TypeScript)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">-d, --docker</CardTitle>
                <CardDescription>Include Docker configuration (Dockerfile and docker-compose.yml).</CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardContent className="pt-4">
                    <pre><code>kickstart-express --docker</code></pre>
                  </CardContent>
                </Card>
                <div className="mt-2">
                  <Badge variant="secondary">Default</Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    false
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">-s, --src</CardTitle>
                <CardDescription>Create src folder structure instead of root-level files.</CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardContent className="pt-4">
                    <pre><code>kickstart-express --src</code></pre>
                  </CardContent>
                </Card>
                <div className="mt-2">
                  <Badge variant="secondary">Default</Badge>
                  <span className="text-sm text-muted-foreground ml-2">
                    false
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">--structured</CardTitle>
                <CardDescription>Use structured architecture with controllers, services, and routes separation.</CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardContent className="pt-4">
                    <pre><code>kickstart-express --structured</code></pre>
                  </CardContent>
                </Card>
                <div className="mt-2 space-y-1">
                  <div>
                    <Badge variant="secondary">Default</Badge>
                    <span className="text-sm text-muted-foreground ml-2">false</span>
                  </div>
                  <div>
                    <Badge variant="outline">Note</Badge>
                    <span className="text-sm text-muted-foreground ml-2">
                      Automatically enables --src when used
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              <Card>
                <CardContent className="pt-4">
                  <pre><code>kickstart-express</code></pre>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Full Featured Project</h3>
              <p className="leading-7">Create a TypeScript project with all features enabled:</p>
              <Card>
                <CardContent className="pt-4">
                  <pre><code>kickstart-express -n my-awesome-api -l ts -d -s --structured</code></pre>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Simple JavaScript Project</h3>
              <p className="leading-7">Create a basic JavaScript project:</p>
              <Card>
                <CardContent className="pt-4">
                  <pre><code>kickstart-express --name simple-app --language js</code></pre>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Docker-Ready Project</h3>
              <p className="leading-7">Create a project with Docker configuration:</p>
              <Card>
                <CardContent className="pt-4">
                  <pre><code>kickstart-express --name docker-api --docker --src</code></pre>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Partial Configuration</h3>
              <p className="leading-7">Provide some options and be prompted for the rest:</p>
              <Card>
                <CardContent className="pt-4">
                  <pre><code>kickstart-express --name my-app --docker</code></pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}