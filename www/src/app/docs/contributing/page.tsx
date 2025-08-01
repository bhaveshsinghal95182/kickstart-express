export default function ContributingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Contributing Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to contribute to Kickstart Express - from setting up your
          development environment to submitting pull requests.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Getting Started
          </h2>
          <p className="leading-7 mb-4">
            We welcome contributions from everyone! Whether you're fixing bugs,
            adding features, improving documentation, or helping with testing,
            your contributions are valuable.
          </p>

          <div className="border rounded-lg p-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Prerequisites
            </h3>
            <ul className="mt-4 ml-6 list-disc [&>li]:mt-2">
              <li>
                <strong>Node.js</strong> {">="} 18.0.0
              </li>
              <li>
                <strong>pnpm</strong> (recommended) or npm
              </li>
              <li>
                <strong>Git</strong> for version control
              </li>
              <li>
                A{" "}
                <a href="https://github.com" className="text-primary underline">
                  GitHub account
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Development Setup
          </h2>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                1. Fork and Clone
              </h3>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre>
                  <code>{`# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/kickstart-express.git
cd kickstart-express

# Add the original repository as upstream
git remote add upstream https://github.com/bhaveshsinghal95182/kickstart-express.git`}</code>
                </pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                2. Install Dependencies
              </h3>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre>
                  <code>{`# Install project dependencies
pnpm install

# Or if you prefer npm
npm install`}</code>
                </pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                3. Test Your Setup
              </h3>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre>
                  <code>{`# Test the CLI locally
node index.js --name test-project --language ts --src

# Verify the generated project works
cd test-project
pnpm install
pnpm dev`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Project Structure
          </h2>
          <p className="leading-7 mb-4">
            Understanding the project structure will help you navigate and
            contribute effectively.
          </p>

          <div className="border rounded-lg p-4">
            <div className="rounded-md bg-muted p-4">
              <pre>
                <code>{`kickstart-express/
├── core/                    # Core library functions
│   ├── generator.js         # Main project generator
│   ├── templates.js         # Template management
│   └── utils.js             # Utility functions
├── templates/               # Project templates
│   └── base/
│       ├── js/              # JavaScript templates
│       └── ts/              # TypeScript templates
├── docs/                    # Documentation (markdown)
├── www/                     # Documentation website (Next.js)
├── index.js                 # CLI entry point
├── package.json             # Project configuration
├── README.md                # Project README
└── CHANGELOG.md             # Version history`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Key Components
            </h3>
            <div className="space-y-4 mt-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">core/generator.js</h4>
                <p className="text-sm text-muted-foreground">
                  Main logic for generating projects, handling templates, and
                  file operations.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">templates/</h4>
                <p className="text-sm text-muted-foreground">
                  Contains all project templates organized by language and
                  structure type.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold">index.js</h4>
                <p className="text-sm text-muted-foreground">
                  CLI interface using Commander.js for parsing arguments and
                  running interactive prompts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Types of Contributions
          </h2>

          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                🐛 Bug Fixes
              </h3>
              <p className="text-muted-foreground mb-4">
                Help us fix issues and improve stability.
              </p>
              <ul className="ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Check existing issues before creating new ones</li>
                <li>Include steps to reproduce the bug</li>
                <li>Provide environment details (Node.js version, OS, etc.)</li>
                <li>Add tests to prevent regression</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                ✨ New Features
              </h3>
              <p className="text-muted-foreground mb-4">
                Add new capabilities and improve existing ones.
              </p>
              <ul className="ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Discuss your idea in an issue first</li>
                <li>Keep features focused and well-scoped</li>
                <li>Add comprehensive tests</li>
                <li>Update documentation</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                📚 Documentation
              </h3>
              <p className="text-muted-foreground mb-4">
                Improve guides, API docs, and examples.
              </p>
              <ul className="ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Fix typos and improve clarity</li>
                <li>Add examples and use cases</li>
                <li>Update outdated information</li>
                <li>Translate to other languages</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                🧪 Testing
              </h3>
              <p className="text-muted-foreground mb-4">
                Help ensure reliability and catch edge cases.
              </p>
              <ul className="ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Add unit tests for new features</li>
                <li>Improve test coverage</li>
                <li>Test on different platforms and Node.js versions</li>
                <li>Add integration tests</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Development Workflow
          </h2>

          <div className="space-y-6 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                1. Create a Branch
              </h3>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre>
                  <code>{`# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description`}</code>
                </pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                2. Make Your Changes
              </h3>
              <div className="space-y-2 mt-2">
                <p className="text-sm">Follow our coding standards:</p>
                <ul className="ml-6 list-disc [&>li]:mt-1 text-sm">
                  <li>Use consistent formatting (we use Prettier)</li>
                  <li>Add JSDoc comments for new functions</li>
                  <li>Write descriptive commit messages</li>
                  <li>Keep commits focused and atomic</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                3. Test Your Changes
              </h3>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre>
                  <code>{`# Run the CLI with your changes
node index.js --name test-feature --language ts --structured

# Test different configurations
node index.js --name test-js --language js --docker
node index.js --name test-simple --language js

# Verify generated projects work
cd test-feature && pnpm install && pnpm dev`}</code>
                </pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                4. Submit a Pull Request
              </h3>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre>
                  <code>{`# Push your branch to your fork
git push origin feature/your-feature-name

# Then create a pull request on GitHub`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Code Style Guidelines
          </h2>

          <div className="space-y-4 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                JavaScript/Node.js
              </h3>
              <ul className="mt-2 ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Use ES6+ features where appropriate</li>
                <li>
                  Prefer <code>const</code> and <code>let</code> over{" "}
                  <code>var</code>
                </li>
                <li>Use descriptive variable and function names</li>
                <li>Add JSDoc comments for public functions</li>
                <li>Handle errors appropriately</li>
              </ul>

              <div className="rounded-md bg-muted p-4 mt-4">
                <pre>
                  <code>{`// Good
/**
 * Generates a new Express.js project
 * @param {Object} config - Project configuration
 * @param {string} config.name - Project name
 * @param {string} config.language - Programming language
 * @returns {Promise<Object>} Generation result
 */
async function generateProject(config) {
  try {
    const projectPath = await createProjectDirectory(config.name);
    return { success: true, path: projectPath };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`}</code>
                </pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Templates
              </h3>
              <ul className="mt-2 ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Use consistent indentation (2 spaces)</li>
                <li>Include helpful comments in generated code</li>
                <li>Follow best practices for each language/framework</li>
                <li>Ensure templates are production-ready</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Commit Messages
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Use conventional commits format:
              </p>
              <div className="rounded-md bg-muted p-4">
                <pre>
                  <code>{`feat: add Docker support to TypeScript templates
fix: resolve path resolution issue on Windows
docs: update CLI reference with new options
test: add unit tests for template generator
chore: update dependencies to latest versions`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Pull Request Guidelines
          </h2>

          <div className="space-y-4 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Before Submitting
              </h3>
              <ul className="mt-2 ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>✅ Test your changes thoroughly</li>
                <li>✅ Update documentation if needed</li>
                <li>✅ Add tests for new functionality</li>
                <li>✅ Ensure commit messages follow conventions</li>
                <li>✅ Rebase on latest main branch</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                PR Template
              </h3>
              <div className="rounded-md bg-muted p-4">
                <pre>
                  <code>{`## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
Describe how you tested these changes:
- [ ] Unit tests pass
- [ ] Generated projects work correctly
- [ ] Tested on multiple Node.js versions
- [ ] Manual testing completed

## Screenshots (if applicable)
Include screenshots for UI changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works`}</code>
                </pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Review Process
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                What to expect during review:
              </p>
              <ul className="mt-2 ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Maintainers will review within 1-2 business days</li>
                <li>Address feedback promptly and professionally</li>
                <li>Be open to suggestions and improvements</li>
                <li>Keep discussions focused on the code</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Adding New Templates
          </h2>
          <p className="leading-7 mb-4">
            Want to add support for new frameworks or project types? Here's how
            to add new templates.
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Template Structure
              </h3>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre>
                  <code>{`templates/
└── base/
    ├── js/
    │   ├── simple/          # Simple JavaScript template
    │   ├── src/             # Src folder template
    │   └── structured/      # Structured template
    └── ts/
        ├── simple/          # Simple TypeScript template
        ├── src/             # Src folder template
        └── structured/      # Structured template`}</code>
                </pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Template Requirements
              </h3>
              <ul className="mt-2 ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>
                  Include a working <code>package.json</code>
                </li>
                <li>Add appropriate dev/build scripts</li>
                <li>Include basic error handling</li>
                <li>Add a README with usage instructions</li>
                <li>Follow security best practices</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Testing New Templates
              </h3>
              <div className="rounded-md bg-muted p-4 mt-2">
                <pre>
                  <code>{`# Test your new template
node index.js --name test-new-template --language ts --your-new-option

# Verify it works
cd test-new-template
pnpm install
pnpm dev

# Test build process
pnpm build
pnpm start`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Community Guidelines
          </h2>

          <div className="space-y-4 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Code of Conduct
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                We are committed to providing a welcoming and inclusive
                environment:
              </p>
              <ul className="mt-2 ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Be respectful and considerate</li>
                <li>Welcome newcomers and help them learn</li>
                <li>Focus on constructive feedback</li>
                <li>Respect different viewpoints and experiences</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Getting Help
              </h3>
              <ul className="mt-2 ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>
                  📖 Check the{" "}
                  <a href="/docs" className="text-primary underline">
                    documentation
                  </a>{" "}
                  first
                </li>
                <li>
                  🐛 Search{" "}
                  <a
                    href="https://github.com/bhaveshsinghal95182/kickstart-express/issues"
                    className="text-primary underline"
                  >
                    existing issues
                  </a>
                </li>
                <li>
                  💬 Ask questions in{" "}
                  <a
                    href="https://github.com/bhaveshsinghal95182/kickstart-express/discussions"
                    className="text-primary underline"
                  >
                    discussions
                  </a>
                </li>
                <li>📧 Contact maintainers for sensitive issues</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Recognition
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                We appreciate all contributions:
              </p>
              <ul className="mt-2 ml-6 list-disc [&>li]:mt-1 text-sm">
                <li>Contributors are listed in our README</li>
                <li>Significant contributions are highlighted in releases</li>
                <li>We love giving credit where credit is due!</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Quick Start Checklist
          </h2>
          <div className="border rounded-lg p-4 mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Ready to contribute? Here's your quick start checklist:
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <input type="checkbox" className="mr-2" disabled />
                Fork the repository on GitHub
              </li>
              <li>
                <input type="checkbox" className="mr-2" disabled />
                Clone your fork locally
              </li>
              <li>
                <input type="checkbox" className="mr-2" disabled />
                Install dependencies with <code>pnpm install</code>
              </li>
              <li>
                <input type="checkbox" className="mr-2" disabled />
                Create a feature branch
              </li>
              <li>
                <input type="checkbox" className="mr-2" disabled />
                Make your changes
              </li>
              <li>
                <input type="checkbox" className="mr-2" disabled />
                Test thoroughly
              </li>
              <li>
                <input type="checkbox" className="mr-2" disabled />
                Submit a pull request
              </li>
            </ul>

            <p className="text-sm text-muted-foreground mt-4">
              Thank you for helping make Kickstart Express better! 🎉
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
