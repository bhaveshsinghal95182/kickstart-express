# Contributing

Thank you for your interest in contributing to Kickstart Express! This guide will help you get started with development and contributing to the project.

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** (recommended) or npm
- **Git**

### Setting Up the Development Environment

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/kickstart-express.git
   cd kickstart-express
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Test the CLI locally:**
   ```bash
   node index.js --help
   ```

4. **Create a test project:**
   ```bash
   node index.js --name test-project --language ts --src
   ```

## 📁 Project Structure

```
kickstart-express/
├── core/
│   └── scaffolder.js        # Main scaffolding logic
├── templates/               # Project templates
│   ├── base/               # Common files for all projects
│   ├── javascript/         # JavaScript-specific templates
│   ├── typescript/         # TypeScript-specific templates
│   ├── docker/            # Docker configuration templates
│   └── structured/        # Structured architecture templates
├── docs/                  # Documentation
├── index.js              # CLI entry point
├── package.json
└── README.md
```

### Key Files

- **`index.js`** - CLI argument parsing and entry point
- **`core/scaffolder.js`** - Core scaffolding logic and file operations
- **`templates/`** - Template files for different project types
- **`docs/`** - Comprehensive documentation

## 🔄 Development Workflow

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Edit source code in `core/` or `index.js`
   - Update templates in `templates/`
   - Add/update documentation in `docs/`

3. **Test your changes:**
   ```bash
   # Test CLI functionality
   node index.js --name test-app --language ts --src --structured
   
   # Verify the generated project works
   cd test-app
   pnpm install
   pnpm dev
   ```

4. **Clean up test projects:**
   ```bash
   cd ..
   rm -rf test-app
   ```

### Testing

#### Manual Testing

```bash
# Test different combinations
node index.js --name ts-simple --language ts
node index.js --name js-docker --language js --docker
node index.js --name full-featured --language ts --docker --src --structured

# Test interactive mode
node index.js
```

#### Template Testing

```bash
# Test each template type
mkdir test-templates
cd test-templates

# Simple TypeScript
node ../index.js --name simple-ts --language ts
# Simple JavaScript  
node ../index.js --name simple-js --language js
# With src folder
node ../index.js --name with-src --language ts --src
# Structured architecture
node ../index.js --name structured --language ts --src --structured
# With Docker
node ../index.js --name with-docker --language ts --docker --src --structured

# Verify each project
for dir in */; do
  echo "Testing $dir"
  cd "$dir"
  pnpm install --silent
  if [ -f "package.json" ] && grep -q "\"build\"" package.json; then
    pnpm build
  fi
  cd ..
done
```

## 🎯 Contributing Guidelines

### Code Style

- Use ES6+ syntax
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages

Use conventional commit format:

```
feat: add support for custom templates
fix: resolve tsconfig.json path issues  
docs: update CLI reference documentation
refactor: improve error handling in scaffolder
test: add integration tests for Docker templates
```

### Types of Contributions

#### 🐛 Bug Fixes

1. **Identify the issue:**
   - Reproduce the bug
   - Check existing issues on GitHub
   - Create an issue if none exists

2. **Fix the bug:**
   - Write a minimal fix
   - Test the fix thoroughly
   - Ensure no regressions

3. **Example bug fix:**
   ```javascript
   // Before (bug)
   if (options.language = 'ts') { // Assignment instead of comparison
   
   // After (fixed)
   if (options.language === 'ts') {
   ```

#### ✨ New Features

1. **Propose the feature:**
   - Open an issue to discuss the feature
   - Get feedback from maintainers
   - Ensure it aligns with project goals

2. **Implement the feature:**
   - Follow existing patterns
   - Add CLI options if needed
   - Update documentation

3. **Example feature addition:**
   ```javascript
   // Add new CLI option
   .option('--testing', 'include testing setup')
   
   // Handle in scaffolder
   if (options.testing) {
     await this.setupTesting(projectPath);
   }
   ```

#### 📚 Documentation

1. **Keep docs up to date:**
   - Update README.md for new features
   - Add examples for new options
   - Update CLI reference

2. **Improve existing docs:**
   - Fix typos and grammar
   - Add clarifications
   - Include more examples

#### 🧪 Templates

1. **Adding new templates:**
   ```bash
   # Create template directory
   mkdir templates/new-template
   
   # Add template files
   echo "console.log('New template');" > templates/new-template/index.js
   ```

2. **Template guidelines:**
   - Keep templates minimal and focused
   - Use placeholder variables: `{{PROJECT_NAME}}`
   - Include necessary dependencies only
   - Follow best practices for each technology

## 🔧 Advanced Development

### Adding New CLI Options

1. **Update the CLI parser in `index.js`:**
   ```javascript
   .option('--new-option', 'description of new option')
   ```

2. **Handle the option in scaffolder:**
   ```javascript
   if (providedArgs.includes('--new-option')) {
     cliOptions.newOption = true;
   }
   ```

3. **Implement the functionality:**
   ```javascript
   // In Scaffolder class
   if (this.cliOptions.newOption) {
     await this.handleNewOption(projectPath);
   }
   ```

### Adding New Project Templates

1. **Create template directory:**
   ```bash
   mkdir templates/my-new-template
   ```

2. **Add template files:**
   ```bash
   # Add files with template variables
   echo 'export const projectName = "{{PROJECT_NAME}}";' > templates/my-new-template/config.ts
   ```

3. **Update scaffolder logic:**
   ```javascript
   async copyTemplateFiles(projectPath) {
     // Copy base templates
     await this.copyBaseTemplates(projectPath);
     
     // Copy specific templates based on options
     if (this.options.myNewTemplate) {
       await fs.copy(
         path.join(this.templatePath, 'my-new-template'),
         projectPath
       );
     }
   }
   ```

### Template Variables

Current supported variables:
- `{{PROJECT_NAME}}` - Project name
- `{{LANGUAGE}}` - Selected language (ts/js)
- `{{PORT}}` - Default port (3000)

To add new variables:

1. **Define in scaffolder:**
   ```javascript
   const templateVars = {
     PROJECT_NAME: this.projectName,
     LANGUAGE: this.options.language,
     PORT: process.env.PORT || 3000,
     NEW_VARIABLE: 'value'
   };
   ```

2. **Replace in files:**
   ```javascript
   let content = await fs.readFile(filePath, 'utf8');
   Object.entries(templateVars).forEach(([key, value]) => {
     content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
   });
   ```

## 🧪 Testing

### Test Checklist

Before submitting a PR, test:

- [ ] Interactive mode works correctly
- [ ] Non-interactive mode with all options works
- [ ] Partial interactive mode works (some options provided)
- [ ] TypeScript projects compile and run
- [ ] JavaScript projects run correctly
- [ ] Docker builds work (if Docker option used)
- [ ] Generated projects install dependencies successfully
- [ ] Development servers start correctly
- [ ] All template combinations work
- [ ] CLI help and version commands work

### Automated Testing (Future)

We're working on adding automated tests. Contributions welcome!

```javascript
// Example test structure (planned)
describe('Scaffolder', () => {
  test('creates TypeScript project', async () => {
    const scaffolder = new Scaffolder({
      projectName: 'test-ts',
      language: 'ts'
    });
    await scaffolder.run();
    expect(fs.existsSync('test-ts/tsconfig.json')).toBe(true);
  });
});
```

## 📋 Pull Request Process

1. **Before submitting:**
   - Test your changes thoroughly
   - Update documentation if needed
   - Ensure code follows existing style
   - Write clear commit messages

2. **Submit the PR:**
   - Use a descriptive title
   - Explain what the PR does
   - Include testing instructions
   - Reference any related issues

3. **PR template:**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   
   ## Testing
   - [ ] Tested manually
   - [ ] All template combinations work
   - [ ] Generated projects run correctly
   
   ## Related Issues
   Fixes #123
   ```

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Run `kickstart-express --name test --language ts`
2. Navigate to project
3. Run `pnpm dev`
4. See error

**Expected behavior**
What you expected to happen.

**Environment:**
- OS: [e.g. macOS, Ubuntu, Windows]
- Node.js version: [e.g. 18.17.0]
- Package manager: [e.g. pnpm, npm]
- Kickstart Express version: [e.g. 1.1.3]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.

**Additional context**
Any other context about the feature request.
```

## 🎯 Areas for Contribution

### High Priority

1. **Testing framework** - Add automated tests
2. **More templates** - Additional project types
3. **Configuration files** - Support for config-based scaffolding
4. **Plugin system** - Allow extending with custom templates

### Medium Priority

1. **Additional languages** - Support for other languages/frameworks
2. **IDE integration** - VS Code extension
3. **Monitoring templates** - Health checks, metrics
4. **Database templates** - MongoDB, PostgreSQL setups

### Low Priority

1. **UI improvements** - Better prompts and styling
2. **Performance optimization** - Faster scaffolding
3. **Additional package managers** - Yarn support
4. **Cloud deployment** - AWS, Azure, GCP templates

## 📞 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and general discussion
- **Email** - For security issues or private matters

## 🙏 Recognition

Contributors will be recognized in:
- **CHANGELOG.md** - For significant contributions
- **README.md** - Contributors section
- **GitHub** - Automatic contributor graph

Thank you for contributing to Kickstart Express! 🚀