import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"

export default function Home() {
  return (
    <div className="min-h-screen">
      <MainNav />
      <main className="container">
        {/* Hero Section */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="mx-auto flex max-w-[64rem] flex-col items-center space-y-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Kickstart Express
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices. 
              Get up and running with a fully configured Express server in seconds!
            </p>
            <div className="space-x-4">
              <Link href="/docs/getting-started">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="https://github.com/bhaveshsinghal95182/kickstart-express">
                <Button variant="outline" size="lg">
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to build modern Express.js applications
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Interactive & Non-Interactive CLI</h3>
                  <p className="text-sm text-muted-foreground">
                    Use prompts or pass arguments for instant scaffolding
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">TypeScript & JavaScript Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language with full type support
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Docker Ready</h3>
                  <p className="text-sm text-muted-foreground">
                    Optional Docker configuration included for easy deployment
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Modern Tooling</h3>
                  <p className="text-sm text-muted-foreground">
                    Pre-configured with ESLint, hot reloading, and build scripts
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Flexible Architecture</h3>
                  <p className="text-sm text-muted-foreground">
                    From simple to enterprise-ready project structures
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Best Practices</h3>
                  <p className="text-sm text-muted-foreground">
                    CORS, environment variables, and structured routing included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Quick Start
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Get started in seconds with our powerful CLI
            </p>
          </div>
          <div className="mx-auto max-w-[58rem] space-y-4">
            <div className="rounded-lg border bg-muted p-4">
              <pre className="text-sm">
                <code>{`# Install globally
npm install -g kickstart-express

# Create a new project
kickstart-express

# Or use npx (no installation required)
npx kickstart-express --name my-api --language ts --docker --src --structured`}</code>
              </pre>
            </div>
            <div className="flex justify-center">
              <Link href="/docs/getting-started">
                <Button>View Full Documentation</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://github.com/bhaveshsinghal95182"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                bhaveshsinghal95182
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/bhaveshsinghal95182/kickstart-express"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
