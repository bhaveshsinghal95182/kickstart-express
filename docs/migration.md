# Migration Guide: v1 to v2

This guide helps you understand the changes between Kickstart Express v1 and v2, and how to migrate your workflows.

## What Changed in v2

### Removed Features
- **`create` command removed** - No longer needed as scaffolding is the default behavior

### New Features
- **`add` command introduced** - Add features to existing projects
- **Simplified CLI** - More intuitive command structure
- **Enhanced project extension** - Database and authentication support

### Backward Compatibility
- **Existing projects continue to work** - No changes needed for existing projects
- **CLI arguments unchanged** - All scaffolding options work the same way
- **Generated project structure unchanged** - Same file structures and templates

## Command Changes

### v1 vs v2 Commands

| v1 Command | v2 Command | Notes |
|------------|------------|--------|
| `kickstart-express create` | `kickstart-express` | Default behavior, no `create` needed |
| `kickstart-express create --name my-app` | `kickstart-express --name my-app` | Same arguments, no `create` |
| `kickstart-express` | `kickstart-express` | Interactive mode unchanged |
| N/A | `kickstart-express add <feature>` | New feature addition capability |

### Migration Examples

#### Creating Projects

**v1 Way:**
```bash
# These still work in v2
kickstart-express create --name my-app --language ts --docker
kickstart-express create  # Interactive mode
```

**v2 Way (Recommended):**
```bash
# Simplified - no "create" needed
kickstart-express --name my-app --language ts --docker
kickstart-express  # Interactive mode (unchanged)
```

#### Adding Features (New in v2)

**v1 Limitation:**
```bash
# In v1, you had to manually add databases, auth, etc.
# No built-in way to extend projects
```

**v2 Enhancement:**
```bash
# Create project
kickstart-express --name my-api --language ts --structured

# Add features
cd my-api
kickstart-express add database
kickstart-express add auth
```

## Updating Your Workflows

### Scripts and Automation

If you have scripts that use v1 commands:

**Before (v1):**
```bash
#!/bin/bash
kickstart-express create --name api-service --language ts --docker --structured
```

**After (v2) - Option 1 (Recommended):**
```bash
#!/bin/bash
kickstart-express --name api-service --language ts --docker --structured
```

**After (v2) - Option 2 (Still works):**
```bash
#!/bin/bash
# v1 commands still work for backward compatibility
kickstart-express create --name api-service --language ts --docker --structured
```

### CI/CD Pipelines

**Before (v1):**
```yaml
# .github/workflows/scaffold.yml
- name: Create project
  run: kickstart-express create --name test-project --language ts
```

**After (v2):**
```yaml
# .github/workflows/scaffold.yml
- name: Create project
  run: kickstart-express --name test-project --language ts

- name: Add database
  run: |
    cd test-project
    kickstart-express add database
```

### Documentation Updates

If you have team documentation referencing v1:

**Update these patterns:**
```bash
# Old
kickstart-express create [options]

# New
kickstart-express [options]
```

**Add these new patterns:**
```bash
# Feature addition
kickstart-express add <feature>
```

## No Action Required

The following will continue to work without changes:

### Existing Projects
- All existing kickstart-express projects work normally
- No updates needed to existing codebases
- All npm scripts continue to work

### CLI Arguments
- All scaffolding options work the same way
- Interactive prompts are unchanged
- Help and version commands work the same

### Generated Code
- Project templates are the same
- File structures are unchanged
- Dependencies and configurations are identical

## Taking Advantage of v2 Features

### For New Projects

**Enhanced Workflow:**
```bash
# 1. Create base project
kickstart-express --name my-api --language ts --structured

# 2. Add database support
cd my-api
kickstart-express add database

# 3. Add authentication
kickstart-express add auth

# 4. Start development
pnpm dev
```

### For Existing Projects

You can enhance existing v1 projects with v2 features:

```bash
# Navigate to existing project
cd my-existing-v1-project

# Add new features (requires kickstart-express v2)
kickstart-express add database
kickstart-express add auth
```

## Version Detection

To check which version you're using:

```bash
kickstart-express --version
```

**v1 output:** `1.x.x`  
**v2 output:** `2.x.x`

## Installation

### Upgrading to v2

```bash
# Global installation
npm install -g kickstart-express@latest

# Verify version
kickstart-express --version
```

### Using Both Versions

If you need both versions for some reason:

```bash
# Install v2 globally
npm install -g kickstart-express@latest

# Use v1 with npx when needed
npx kickstart-express@1 create --name legacy-project
```

## Breaking Changes

### None for End Users
- All v1 commands continue to work
- No breaking changes in generated projects
- No migration needed for existing projects

### For Contributors/Developers
If you've contributed to the kickstart-express codebase:

- `create` command logic moved to default behavior
- New `Adder` class for feature addition
- Updated CLI argument parsing

## FAQ

### Q: Do I need to update existing projects?
**A:** No, existing projects work without any changes.

### Q: Will v1 commands stop working?
**A:** No, v1 commands are maintained for backward compatibility.

### Q: Can I use `add` command on v1 projects?
**A:** Yes, the `add` command works with any kickstart-express project.

### Q: Should I update my scripts to v2 syntax?
**A:** It's recommended but not required. v2 syntax is simpler and more intuitive.

### Q: What if I prefer the `create` command?
**A:** It still works! `kickstart-express create` is equivalent to `kickstart-express`.

## Getting Help

- [CLI Reference](./cli-reference.md) - Complete v2 command reference
- [Adding Features](./adding-features.md) - Guide to the new `add` command
- [Examples](./examples.md) - Updated examples for v2
- [GitHub Issues](https://github.com/bhaveshsinghal95182/kickstart-express/issues) - Report problems or ask questions

## Summary

Kickstart Express v2 is designed to be a **non-breaking upgrade** that enhances your workflow while maintaining full backward compatibility. The main benefits are:

✅ **Simpler CLI** - No more `create` command needed  
✅ **Enhanced Projects** - Add databases and auth to existing projects  
✅ **Better DX** - More intuitive command structure  
✅ **Zero Migration** - All existing workflows continue to work  

Welcome to v2! 🚀