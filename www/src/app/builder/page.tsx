"use client";

import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/ui/code-block";
import { Copy, Check, Folder, FolderOpen, Archive, Code, Server } from "lucide-react";
import { toast } from "sonner";

interface BuilderOptions {
  projectName: string;
  language: "ts" | "js";
  docker: boolean;
  src: boolean;
  structured: boolean;
  packageManager: "npm" | "pnpm" | "yarn" | "bun";
}

interface AddOptions {
  feature: "db" | "auth" | "";
  dbType: "mongodb" | "postgres" | "";
  orm: "mongoose" | "prisma" | "drizzle" | "";
  authType: "jwt" | "clerk" | "";
}

export default function BuilderPage() {
  const [mode, setMode] = useState<"scaffold" | "add">("scaffold");
  const [options, setOptions] = useState<BuilderOptions>({
    projectName: "my-express-app",
    language: "ts",
    docker: false,
    src: true,
    structured: false,
    packageManager: "npm",
  });
  
  const [addOptions, setAddOptions] = useState<AddOptions>({
    feature: "",
    dbType: "",
    orm: "",
    authType: "",
  });
  
  const [copied, setCopied] = useState(false);

  const generateCommand = () => {
    if (mode === "add") {
      return generateAddCommand();
    }
    
    const packageManagers = {
      npm: "npx kickstart-express",
      pnpm: "pnpm dlx kickstart-express",
      yarn: "yarn dlx kickstart-express",
      bun: "bunx kickstart-express",
    };

    let command = packageManagers[options.packageManager];
    
    if (options.projectName !== "my-express-app") {
      command += ` --name "${options.projectName}"`;
    }
    
    if (options.language === "js") {
      command += " --language js";
    }
    
    if (options.docker) {
      command += " --docker";
    }
    
    if (options.src) {
      command += " --src";
    }
    
    if (options.structured && options.src) {
      command += " --structured";
    }
    
    return command;
  };

  const generateAddCommand = () => {
    if (!addOptions.feature) {
      return "# Select a feature to add";
    }

    let command = `kickstart-express add ${addOptions.feature}`;
    
    if (addOptions.feature === "db") {
      if (addOptions.dbType && addOptions.orm) {
        command += ` --db-type ${addOptions.dbType} --orm ${addOptions.orm}`;
      } else if (addOptions.dbType || addOptions.orm) {
        command += " # Both --db-type and --orm are required for non-interactive mode";
      }
    } else if (addOptions.feature === "auth") {
      if (addOptions.authType) {
        command += ` --auth-type ${addOptions.authType}`;
      }
    }
    
    return command;
  };

  const copyToClipboard = async () => {
    const command = generateCommand();
    await navigator.clipboard.writeText(command);
    setCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const updateOption = <K extends keyof BuilderOptions>(
    key: K,
    value: BuilderOptions[K]
  ) => {
    setOptions(prev => ({
      ...prev,
      [key]: value,
      // If src is disabled, also disable structured
      ...(key === "src" && !value ? { structured: false } : {}),
    }));
  };

  const updateAddOption = <K extends keyof AddOptions>(
    key: K,
    value: AddOptions[K]
  ) => {
    setAddOptions(prev => ({
      ...prev,
      [key]: value,
      // Reset dependent options when feature changes
      ...(key === "feature" ? { dbType: "", orm: "", authType: "" } : {}),
      // Reset orm when dbType changes to avoid invalid combinations
      ...(key === "dbType" ? { orm: "" } : {}),
    }));
  };

  const isValidDbOrmCombination = (dbType: string, orm: string) => {
    if (dbType === "mongodb") return orm === "mongoose";
    if (dbType === "postgres") return orm === "prisma" || orm === "drizzle";
    return false;
  };

  const ScaffoldOptions = () => (
    <>
      {/* Project Name */}
      <Card>
        <CardHeader>
          <CardTitle>Project Configuration</CardTitle>
          <CardDescription>
            Basic settings for your new Express.js project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={options.projectName}
              onChange={(e) => updateOption("projectName", e.target.value)}
              placeholder="my-express-app"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="packageManager">Package Manager</Label>
            <Select 
              value={options.packageManager} 
              onValueChange={(value: BuilderOptions["packageManager"]) => updateOption("packageManager", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="npm">npm</SelectItem>
                <SelectItem value="pnpm">pnpm</SelectItem>
                <SelectItem value="yarn">yarn</SelectItem>
                <SelectItem value="bun">bun</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Language
          </CardTitle>
          <CardDescription>
            Choose your preferred programming language
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={options.language === "ts" ? "default" : "outline"}
              onClick={() => updateOption("language", "ts")}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <div className="text-lg font-bold text-blue-500">TS</div>
              <div className="text-sm">TypeScript</div>
            </Button>
            <Button
              variant={options.language === "js" ? "default" : "outline"}
              onClick={() => updateOption("language", "js")}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <div className="text-lg font-bold text-yellow-500">JS</div>
              <div className="text-sm">JavaScript</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>
            Select additional features for your project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Docker */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Archive className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Label htmlFor="docker" className="text-base font-medium">
                  Docker
                </Label>
                <p className="text-sm text-muted-foreground">
                  Include Dockerfile for containerization
                </p>
              </div>
            </div>
            <Switch
              id="docker"
              checked={options.docker}
              onCheckedChange={(checked) => updateOption("docker", checked)}
            />
          </div>

          {/* Src Folder */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Folder className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <Label htmlFor="src" className="text-base font-medium">
                  Source Folder
                </Label>
                <p className="text-sm text-muted-foreground">
                  Organize code in a src/ directory
                </p>
              </div>
            </div>
            <Switch
              id="src"
              checked={options.src}
              onCheckedChange={(checked) => updateOption("src", checked)}
            />
          </div>

          {/* Structured Src */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FolderOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <Label htmlFor="structured" className="text-base font-medium">
                  Structured Source
                </Label>
                <p className="text-sm text-muted-foreground">
                  Use organized structure (routes, controllers, services)
                </p>
              </div>
            </div>
            <Switch
              id="structured"
              checked={options.structured}
              onCheckedChange={(checked) => updateOption("structured", checked)}
              disabled={!options.src}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );

  const AddFeaturesOptions = () => (
    <>
      {/* Feature Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Feature</CardTitle>
          <CardDescription>
            Choose which feature to add to your existing project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={addOptions.feature === "db" ? "default" : "outline"}
              onClick={() => updateAddOption("feature", "db")}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <div className="text-lg font-bold text-green-500">DB</div>
              <div className="text-sm">Database</div>
            </Button>
            <Button
              variant={addOptions.feature === "auth" ? "default" : "outline"}
              onClick={() => updateAddOption("feature", "auth")}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <div className="text-lg font-bold text-blue-500">AUTH</div>
              <div className="text-sm">Authentication</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Database Options */}
      {addOptions.feature === "db" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Database Type</CardTitle>
              <CardDescription>
                Choose your database technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={addOptions.dbType === "mongodb" ? "default" : "outline"}
                  onClick={() => updateAddOption("dbType", "mongodb")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <div className="text-lg font-bold text-green-600">Mongo</div>
                  <div className="text-sm">MongoDB</div>
                </Button>
                <Button
                  variant={addOptions.dbType === "postgres" ? "default" : "outline"}
                  onClick={() => updateAddOption("dbType", "postgres")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <div className="text-lg font-bold text-blue-600">PG</div>
                  <div className="text-sm">PostgreSQL</div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ORM/ODM</CardTitle>
              <CardDescription>
                Choose your data access layer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={addOptions.orm === "mongoose" ? "default" : "outline"}
                  onClick={() => updateAddOption("orm", "mongoose")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  disabled={addOptions.dbType === "postgres"}
                >
                  <div className="text-sm font-bold">Mongoose</div>
                  <div className="text-xs">MongoDB ODM</div>
                </Button>
                <Button
                  variant={addOptions.orm === "prisma" ? "default" : "outline"}
                  onClick={() => updateAddOption("orm", "prisma")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  disabled={addOptions.dbType === "mongodb"}
                >
                  <div className="text-sm font-bold">Prisma</div>
                  <div className="text-xs">Type-safe ORM</div>
                </Button>
                <Button
                  variant={addOptions.orm === "drizzle" ? "default" : "outline"}
                  onClick={() => updateAddOption("orm", "drizzle")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  disabled={addOptions.dbType === "mongodb"}
                >
                  <div className="text-sm font-bold">Drizzle</div>
                  <div className="text-xs">SQL Kit</div>
                </Button>
              </div>
              {addOptions.dbType && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {addOptions.dbType === "mongodb" 
                      ? "MongoDB works with Mongoose ODM"
                      : "PostgreSQL works with Prisma or Drizzle ORM"
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Authentication Options */}
      {addOptions.feature === "auth" && (
        <Card>
          <CardHeader>
            <CardTitle>Authentication Type</CardTitle>
            <CardDescription>
              Choose your authentication method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={addOptions.authType === "jwt" ? "default" : "outline"}
                onClick={() => updateAddOption("authType", "jwt")}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <div className="text-lg font-bold text-orange-600">JWT</div>
                <div className="text-sm">JSON Web Tokens</div>
              </Button>
              <Button
                variant={addOptions.authType === "clerk" ? "default" : "outline"}
                onClick={() => updateAddOption("authType", "clerk")}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <div className="text-lg font-bold text-purple-600">Clerk</div>
                <div className="text-sm">Auth Service</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );

  return (
    <div className="min-h-screen">
      <MainNav />
      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Project Builder</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Create new Express.js projects or add features to existing ones. 
              We'll generate the perfect command for you to copy and run.
            </p>
            
            {/* Mode Switcher */}
            <div className="flex justify-center">
              <div className="bg-muted p-1 rounded-lg inline-flex">
                <Button
                  variant={mode === "scaffold" ? "default" : "ghost"}
                  onClick={() => setMode("scaffold")}
                  className="px-6"
                >
                  <Server className="h-4 w-4 mr-2" />
                  Scaffold Project
                </Button>
                <Button
                  variant={mode === "add" ? "default" : "ghost"}
                  onClick={() => setMode("add")}
                  className="px-6"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Add Features
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Command Display */}
            <div className="order-2 lg:order-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {mode === "scaffold" ? <Server className="h-5 w-5" /> : <Code className="h-5 w-5" />}
                    Generated Command
                  </CardTitle>
                  <CardDescription>
                    {mode === "scaffold" 
                      ? "Run this command in your terminal to create your project"
                      : "Run this command in your kickstart-express project directory to add features"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <CodeBlock language="bash">{generateCommand()}</CodeBlock>
                  </div>
                  <Button 
                    onClick={copyToClipboard} 
                    className="w-full"
                    size="lg"
                    disabled={mode === "add" && !addOptions.feature}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Command
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Configuration Options */}
            <div className="order-1 lg:order-2 space-y-6">
              {mode === "scaffold" ? (
                <ScaffoldOptions />
              ) : (
                <AddFeaturesOptions />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}