"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { MainNav } from "@/components/main-nav";
import { useGSAPOnMount, animateOnScroll } from "@/hooks/useGSAP";
import { useLayoutEffect, useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const quickStartRef = useRef<HTMLDivElement>(null);

  // Hero section animations
  useGSAPOnMount((tl) => {
    tl.fromTo(
      ".logo-animation",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "back.out(1.7)" }
    )
      .fromTo(
        ".title-animation",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ".description-animation",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".buttons-animation",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
  });

  // Scroll-triggered animations
  useLayoutEffect(() => {
    // Features cards stagger animation
    animateOnScroll(".feature-card", {
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
    });

    // Quick start section
    animateOnScroll(".quick-start-content", {
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <div>
      <MainNav />
      <main className="container">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"
        >
          <div className="mx-auto flex max-w-[64rem] flex-col items-center space-y-4 text-center">
            <div className="logo-animation">
              <Image
                src="/logo.png"
                alt="Kickstart Express Logo"
                width={200}
                height={200}
              />
            </div>
            <h1 className="title-animation font-bold font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Kickstart Express
            </h1>
            <p className="description-animation max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A powerful CLI tool to quickly scaffold Express.js projects with
              modern tooling and best practices. Get up and running with a fully
              configured Express server in seconds!
            </p>
            <div className="buttons-animation space-x-4">
              <Link href="/docs/getting-started">
                <Button
                  size="lg"
                  className="hover:scale-105 transition-transform"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="https://github.com/bhaveshsinghal95182/kickstart-express">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 transition-transform"
                >
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          className="space-y-6 py-8 md:py-12 lg:py-24 p-3"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to build modern Express.js applications
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="feature-card hover:scale-105 transition-transform hover:shadow-lg">
              <CardHeader>
                <CardTitle>Interactive & Non-Interactive CLI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use prompts or pass arguments for instant scaffolding
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="feature-card hover:scale-105 transition-transform hover:shadow-lg">
              <CardHeader>
                <CardTitle>TypeScript & JavaScript Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose your preferred language with full type support
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="feature-card hover:scale-105 transition-transform hover:shadow-lg">
              <CardHeader>
                <CardTitle>Docker Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Optional Docker configuration included for easy deployment
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="feature-card hover:scale-105 transition-transform hover:shadow-lg">
              <CardHeader>
                <CardTitle>Modern Tooling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Pre-configured with ESLint, hot reloading, and build scripts
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="feature-card hover:scale-105 transition-transform hover:shadow-lg">
              <CardHeader>
                <CardTitle>Flexible Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  From simple to enterprise-ready project structures
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="feature-card hover:scale-105 transition-transform hover:shadow-lg">
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  CORS, environment variables, and structured routing included
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Start Section */}
        <section
          ref={quickStartRef}
          className="space-y-6 p-3 py-8 md:py-12 lg:py-24"
        >
          <div className="quick-start-content mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Quick Start
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Get started in seconds with our powerful CLI
            </p>
          </div>
          <div className="quick-start-content mx-auto max-w-[58rem] space-y-4">
            <CodeBlock>
              {`# Install globally
npm install -g kickstart-express

# Create a new project
kickstart-express

# Or use npx (no installation required)
npx kickstart-express --name my-api --language ts --docker --src --structured`}
            </CodeBlock>
            <div className="flex justify-center">
              <Link href="/docs/getting-started">
                <Button className="hover:scale-105 transition-transform">
                  View Full Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://github.com/bhaveshsinghal95182"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
              >
                bhaveshsinghal95182
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/bhaveshsinghal95182/kickstart-express"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
