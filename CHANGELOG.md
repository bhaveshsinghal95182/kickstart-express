# Changelog

All notable changes to kickstart-express will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Version Format
- **Major** (X.0.0): Breaking changes, significant architecture updates
- **Minor** (X.Y.0): New features, functionality additions, backward compatible
- **Patch** (X.Y.Z): Bug fixes, small improvements, backward compatible

---

## [1.2.0] - Current Version
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