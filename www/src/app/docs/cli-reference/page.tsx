import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/ui/code-block"

export default function CliReferencePage() {
  return (
    <div className="space-y-6 relative">
      <div className="absolute -top-8 right-1/4 h-52 w-72 -z-10 rounded-full bg-cyan-500/15 blur-3xl" />
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">CLI Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for all Kickstart Express command-line options and usage patterns.
        </p>
      </div>

      <Separator />

      <div className="space-y-8 relative">
        <div className="absolute top-32 left-8 h-44 w-44 -z-10 rounded-full bg-purple-500/12 blur-2xl" />
        <div className="absolute top-80 right-12 h-36 w-36 -z-10 rounded-full bg-orange-500/12 blur-2xl" />
        <div className="absolute bottom-40 left-1/3 h-40 w-40 -z-10 rounded-full bg-green-500/12 blur-2xl" />
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Basic Usage
          </h2>
          <CodeBlock showCard={false} className="mb-4">kickstart-express [options]</CodeBlock>
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
                <CodeBlock showCard={false}>kickstart-express --help</CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">-V, --version</CardTitle>
                <CardDescription>Display version number and exit.</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock showCard={false}>kickstart-express --version</CodeBlock>
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
                <CodeBlock showCard={false}>kickstart-express --name my-awesome-api</CodeBlock>
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
                <CodeBlock showCard={false}>
{`kickstart-express --language ts   # TypeScript
kickstart-express --language js   # JavaScript`}
                </CodeBlock>
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
                <CodeBlock showCard={false}>kickstart-express --docker</CodeBlock>
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
                <CodeBlock showCard={false}>kickstart-express --src</CodeBlock>
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
                <CodeBlock showCard={false}>kickstart-express --structured</CodeBlock>
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
            Add Command
          </h2>
          <p className="leading-7 mb-6">
            The add command allows you to extend existing kickstart-express projects with additional features like databases and authentication.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">Basic Syntax</h3>
              <CodeBlock>kickstart-express add &lt;feature&gt; [options]</CodeBlock>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">Database Features</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-lg">add db --db-type &lt;type&gt; --orm &lt;orm&gt;</CardTitle>
                    <CardDescription>Add database support with specific database type and ORM.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">Interactive Mode:</h4>
                        <CodeBlock showCard={false}>kickstart-express add db</CodeBlock>
                      </div>
                      <div>
                        <h4 className="font-semibold">Non-Interactive Examples:</h4>
                        <CodeBlock showCard={false}>{`# MongoDB with Mongoose
kickstart-express add db --db-type mongodb --orm mongoose

# PostgreSQL with Prisma  
kickstart-express add db --db-type postgres --orm prisma

# PostgreSQL with Drizzle
kickstart-express add db --db-type postgres --orm drizzle`}</CodeBlock>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">--db-type: mongodb, postgres</Badge>
                        <Badge variant="outline">--orm: mongoose, prisma, drizzle</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">Authentication Features</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-lg">add auth --auth-type &lt;type&gt;</CardTitle>
                    <CardDescription>Add authentication support with JWT or Clerk.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">Interactive Mode:</h4>
                        <CodeBlock showCard={false}>kickstart-express add auth</CodeBlock>
                      </div>
                      <div>
                        <h4 className="font-semibold">Non-Interactive Examples:</h4>
                        <CodeBlock showCard={false}>{`# JWT Authentication
kickstart-express add auth --auth-type jwt

# Clerk Authentication
kickstart-express add auth --auth-type clerk`}</CodeBlock>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">--auth-type: jwt, clerk</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Usage Examples
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Project Scaffolding</h3>
            </div>
            
            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Interactive Mode</h4>
              <p className="leading-7">Start the interactive CLI to configure your project step by step:</p>
              <CodeBlock>kickstart-express</CodeBlock>
            </div>

            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Full Featured Project</h4>
              <p className="leading-7">Create a TypeScript project with all features enabled:</p>
              <CodeBlock>kickstart-express -n my-awesome-api -l ts -d -s --structured</CodeBlock>
            </div>

            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Simple JavaScript Project</h4>
              <p className="leading-7">Create a basic JavaScript project:</p>
              <CodeBlock>kickstart-express --name simple-app --language js</CodeBlock>
            </div>

            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Docker-Ready Project</h4>
              <p className="leading-7">Create a project with Docker configuration:</p>
              <CodeBlock>kickstart-express --name docker-api --docker --src</CodeBlock>
            </div>

            <div>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Feature Addition Workflows</h3>
            </div>

            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Complete Setup (Interactive)</h4>
              <p className="leading-7">Create a project and add features interactively:</p>
              <CodeBlock>{`# 1. Create project
kickstart-express --name my-api --language ts --docker --src --structured

# 2. Add database (interactive prompts)
cd my-api
kickstart-express add db

# 3. Add authentication (interactive prompts)
kickstart-express add auth`}</CodeBlock>
            </div>

            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Complete Setup (Non-Interactive)</h4>
              <p className="leading-7">Create a project and add features with CLI arguments:</p>
              <CodeBlock>{`# 1. Create project
kickstart-express --name my-api --language ts --docker --src --structured

# 2. Add MongoDB with Mongoose
cd my-api
kickstart-express add db --db-type mongodb --orm mongoose

# 3. Add JWT authentication
kickstart-express add auth --auth-type jwt`}</CodeBlock>
            </div>

            <div>
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">Enterprise API with PostgreSQL and Clerk</h4>
              <p className="leading-7">Create an enterprise-ready API:</p>
              <CodeBlock>{`# 1. Create project with full structure
kickstart-express --name enterprise-api --language ts --docker --src --structured

# 2. Add PostgreSQL with Prisma
cd enterprise-api
kickstart-express add db --db-type postgres --orm prisma

# 3. Add Clerk authentication
kickstart-express add auth --auth-type clerk`}</CodeBlock>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}