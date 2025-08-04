# Changelog

All notable changes to kickstart-express will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Version Format
- **Major** (X.0.0): Breaking changes, significant architecture updates
- **Minor** (X.Y.0): New features, functionality additions, backward compatible
- **Patch** (X.Y.Z): Bug fixes, small improvements, backward compatible

---

## [2.0.0] - Current Version - Major Release
### Breaking Changes
- **Removed `create` command**: Scaffolding is now the default behavior when running `kickstart-express`
- **Simplified CLI structure**: Direct project scaffolding with `kickstart-express [options]`

### Features
- **Enhanced `add` command**: Comprehensive feature addition for existing projects
  - **Non-interactive CLI arguments support**:
    - `--db-type <mongodb|postgres>` - Database type selection
    - `--orm <mongoose|prisma|drizzle>` - ORM/ODM selection  
    - `--auth-type <jwt|clerk>` - Authentication type selection
  - **Intelligent fallback prompting**: When run outside kickstart project, prompts to create new project
  - **Comprehensive validation**: Prevents invalid combinations (e.g., mongodb+drizzle)
  - **Interactive mode preserved**: Falls back to prompts when CLI options not provided
- **Streamlined workflow**: More intuitive command structure with scaffolding as primary action
- **Enhanced user experience**: Helpful error messages and guidance for invalid operations
- **Full backward compatibility**: All v1 commands continue to work for seamless migration

### Examples
```bash
# v2 Project scaffolding (default behavior)
kickstart-express --name my-app --language ts --docker

# v2 Non-interactive feature addition
kickstart-express add db --db-type mongodb --orm mongoose
kickstart-express add auth --auth-type jwt

# v2 Interactive feature addition 
kickstart-express add db    # Prompts for database choices
kickstart-express add auth  # Prompts for auth choices
```

## [1.3.0] - Previous Version
### Features
- **Graceful Ctrl+C Shutdown**: Added comprehensive SIGINT handling for interrupting project creation
  - Proper cleanup of partially created projects when user cancels with Ctrl+C
  - User-friendly messaging during cancellation process
  - Automatic removal of incomplete project directories
  - Standard exit codes for interrupted operations
- Enhanced error handling during project creation cleanup process

## [1.2.0] - Previous Version  
### Features
- Enhanced CLI prompts for better user experience
- Improved template selection process

## [1.1.3] - Previous Version
### Patches
- Updated project documentation and changelog maintenance
- Improved CLI tool reliability and stability
- Enhanced dependency management and compatibility
- Minor bug fixes and performance optimizations

## [1.1.2] - Previous Patch
### Patches
- Bug fixes and stability improvements
- Enhanced error handling in CLI prompts
- Improved dependency management

## [1.1.1] 
### Patches
- Fixed template copying issues
- Resolved path resolution problems in various environments
- Minor CLI user experience improvements

## [1.1.0] - Feature Release
### Features
- Added structured source directory option
- Introduced controllers, services, and routes separation
- Enhanced TypeScript and JavaScript template support
- Docker configuration improvements

### Patches
- Fixed package.json script generation based on project structure
- Improved tsconfig.json handling for different project layouts
- Better error messages for failed operations

## [1.0.x] - Initial Stable Releases
### Features
- Core CLI scaffolding functionality
- TypeScript and JavaScript project support
- Basic Express.js template generation
- Interactive project configuration
- Git repository initialization
- Package manager integration (pnpm support)

### Patches
- Multiple bug fixes for file copying
- Improved cross-platform compatibility
- Enhanced template customization options

## [0.x.x] - Beta Releases
### Features
- Initial proof of concept
- Basic Express.js scaffolding
- Template system foundation

---

## Understanding Version Numbers

### Major Versions (X.0.0)
- Breaking changes that require user action
- Complete API rewrites or significant architecture changes
- Removal of deprecated features
- Changes that might break existing generated projects

### Minor Versions (X.Y.0)
- New features and enhancements
- New template options or project structures
- Additional CLI options or prompts
- New dependencies or significant feature additions
- Always backward compatible

### Patch Versions (X.Y.Z)
- **Bug fixes** - The most common type of patch release
- Security updates
- Performance improvements
- Documentation updates
- Dependency updates that don't add features
- Template content improvements
- CLI experience enhancements

## Common Bug Fixes in Patches
- Template file copying issues
- Cross-platform path resolution
- Package manager compatibility
- CLI prompt and interaction bugs
- Generated project configuration errors
- TypeScript/JavaScript template inconsistencies
- Docker configuration issues
- .gitignore and environment file handling

## Upcoming Features
Features planned for future minor releases:
- Additional framework support
- More template customization options
- Plugin system for extensibility
- Enhanced Docker configurations
- Testing framework integration
- Linting and formatting presets