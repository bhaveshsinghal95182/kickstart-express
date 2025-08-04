# Usage Examples v2

Real-world examples and use cases for Kickstart Express v2, including the new feature addition capabilities.

## Quick Start Examples

### 1. Simple Blog API (TypeScript)

Perfect for a personal blog or content management system:

```bash
# Create the project
kickstart-express --name blog-api --language ts --src

# Navigate and start development
cd blog-api
pnpm install
pnpm dev

# Add database support for blog posts
kickstart-express add database
# Choose: MongoDB with Mongoose
# Model name: BlogPost

# Add authentication for admin
kickstart-express add auth
# Choose: JWT
```

**What you get:**
- TypeScript setup with hot reloading
- Clean src/ folder structure
- MongoDB integration with blog post model
- JWT authentication for admin access
- Sample CRUD operations

**Perfect for:** Personal projects, learning TypeScript, content management

### 2. Enterprise Microservice (Full Featured)

Production-ready microservice with all best practices:

```bash
# Create structured project with Docker
kickstart-express --name user-service --language ts --docker --src --structured

# Navigate and install
cd user-service
pnpm install

# Add PostgreSQL database with Prisma
kickstart-express add database
# Choose: PostgreSQL with Prisma
# Model name: User

# Add JWT authentication
kickstart-express add auth
# Choose: JWT
# Include registration: Yes
# Include password reset: Yes

# Start development
pnpm dev
```

**What you get:**
- Structured architecture (controllers, services, routes, models)
- Docker configuration for containerization
- PostgreSQL with Prisma ORM
- Complete JWT authentication system
- User management with CRUD operations
- TypeScript with strict type checking

**Perfect for:** Microservices, enterprise applications, team projects

### 3. E-commerce API (Complete Setup)

Full e-commerce backend with products, users, and orders:

```bash
# Create the base project
kickstart-express --name ecommerce-api --language ts --docker --src --structured

cd ecommerce-api
pnpm install

# Add database for products and orders
kickstart-express add database
# Choose: PostgreSQL with Prisma
# Model name: Product

# Add authentication for users
kickstart-express add auth
# Choose: JWT
# Include registration: Yes

# Start development
pnpm dev
```

**Additional manual setup after running the commands:**
```typescript
// Add additional models in src/models/
// - Order.model.ts
// - CartItem.model.ts
// - Payment.model.ts
```

**What you get:**
- Complete authentication system
- Database models for e-commerce
- Docker deployment ready
- Structured architecture for scalability
- TypeScript for type safety

**Perfect for:** E-commerce backends, marketplace APIs, complex business logic

### 4. Rapid Prototype (JavaScript)

Quick and simple setup for testing ideas:

```bash
# Create minimal project
kickstart-express --name prototype --language js

cd prototype
pnpm install
pnpm dev

# Optionally add features later
# kickstart-express add database  # if you need data persistence
# kickstart-express add auth      # if you need user accounts
```

**What you get:**
- JavaScript setup with nodemon
- Minimal project structure
- Basic Express server
- Ready for rapid experimentation

**Perfect for:** MVPs, hackathons, quick tests, learning Express

## Feature Addition Workflows

### Adding Database to Existing Project

```bash
# Start with any existing project
cd my-existing-project

# Add database support
kickstart-express add database

# Follow the prompts:
# ✓ Database: MongoDB with Mongoose
# ✓ Model name: Product
# ✓ Include CRUD operations: Yes
```

### Adding Authentication

```bash
# Add authentication to existing project
kickstart-express add auth

# Follow the prompts:
# ✓ Auth method: JWT
# ✓ Include registration: Yes
# ✓ Include password reset: Yes
```

### Complete Feature Setup

```bash
# Create base project
kickstart-express --name full-stack-api --language ts --docker --src --structured

cd full-stack-api

# Add database
kickstart-express add database
# Choose: PostgreSQL with Prisma

# Add authentication  
kickstart-express add auth
# Choose: JWT

# Start development
pnpm dev
```

## Development Workflows

### Local Development

```bash
# Create project
kickstart-express --name my-api --language ts --src --structured

# Navigate and install
cd my-api
pnpm install

# Start development server
pnpm dev

# Your API is running at http://localhost:3000
```

**Development commands:**
```bash
pnpm dev      # Hot reload development server
pnpm build    # Build for production (TypeScript only)
pnpm start    # Start production server
```

### Docker Development

```bash
# Create project with Docker
kickstart-express --name dockerized-api --language ts --docker --src

cd dockerized-api

# Option 1: Docker Compose (recommended)
docker-compose up --build

# Option 2: Direct Docker commands
docker build -t dockerized-api .
docker run -p 3000:3000 dockerized-api
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy API
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Create project
        run: |
          npx kickstart-express \
            --name production-api \
            --language ts \
            --docker \
            --src \
            --structured
            
      - name: Build and deploy
        run: |
          cd production-api
          pnpm install
          pnpm build
          docker build -t my-api .
```

## Project Types and Use Cases

### 1. REST API with Database

```bash
kickstart-express --name ecommerce-api --language ts --docker --src --structured
```

**Add to the generated project:**
```bash
cd ecommerce-api
pnpm add mongoose @types/mongoose
# or
pnpm add pg @types/pg

# Add database models in src/models/
# Configure database connection in src/index.ts
```

**Use cases:**
- E-commerce platforms
- User management systems
- Content management APIs
- Data processing services

### 2. GraphQL API

```bash
kickstart-express --name graphql-api --language ts --src --structured
```

**Add GraphQL dependencies:**
```bash
cd graphql-api
pnpm add apollo-server-express graphql
pnpm add -D @types/graphql
```

**Use cases:**
- Modern API architectures
- Mobile app backends
- Complex data relationships
- Real-time applications

### 3. Authentication Service

```bash
kickstart-express --name auth-service --language ts --docker --src --structured
```

**Add authentication dependencies:**
```bash
cd auth-service
pnpm add jsonwebtoken bcryptjs
pnpm add -D @types/jsonwebtoken @types/bcryptjs
```

**Use cases:**
- OAuth providers
- JWT authentication services
- User registration systems
- Security microservices

### 4. File Upload Service

```bash
kickstart-express --name upload-service --language ts --docker --src
```

**Add file handling dependencies:**
```bash
cd upload-service
pnpm add multer sharp
pnpm add -D @types/multer
```

**Use cases:**
- Image processing APIs
- Document management
- Media hosting services
- CDN integrations

## Team Collaboration Examples

### Frontend + Backend Development

**Backend team:**
```bash
kickstart-express --name backend-api --language ts --docker --src --structured
```

**Frontend team can then:**
```bash
# Use the API documentation
curl http://localhost:3000/api/calculator
# or connect React/Vue/Angular apps to the endpoints
```

### Microservices Architecture

```bash
# User service
kickstart-express --name user-service --language ts --docker --src --structured

# Order service  
kickstart-express --name order-service --language ts --docker --src --structured

# Payment service
kickstart-express --name payment-service --language ts --docker --src --structured

# API Gateway
kickstart-express --name api-gateway --language ts --docker --src
```

### Monorepo Setup

```bash
mkdir my-company-apis
cd my-company-apis

# Create multiple services
kickstart-express --name auth --language ts --src --structured
kickstart-express --name users --language ts --src --structured
kickstart-express --name orders --language ts --src --structured

# Setup workspace package.json
echo '{
  "name": "my-company-apis",
  "private": true,
  "workspaces": ["auth", "users", "orders"]
}' > package.json
```

## Deployment Examples

### Heroku Deployment

```bash
# Create project
kickstart-express --name heroku-api --language ts --src

cd heroku-api

# Initialize git if not done
git init
git add .
git commit -m "Initial commit"

# Create Heroku app
heroku create my-api-name

# Deploy
git push heroku main
```

### AWS Lambda

```bash
# Create lightweight project
kickstart-express --name lambda-api --language ts --src

cd lambda-api

# Add serverless framework
pnpm add -D serverless serverless-offline
pnpm add aws-lambda aws-serverless-express
pnpm add -D @types/aws-lambda
```

### Digital Ocean App Platform

```bash
# Create project with Docker
kickstart-express --name do-api --language ts --docker --src --structured

cd do-api

# Add app spec
echo 'name: my-api
services:
- name: api
  source_dir: /
  github:
    repo: your-username/your-repo
    branch: main
  run_command: pnpm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  http_port: 3000' > .do/app.yaml
```

## Testing Examples

### Unit Testing Setup

```bash
# Create project
kickstart-express --name tested-api --language ts --src --structured

cd tested-api

# Add testing dependencies
pnpm add -D jest @types/jest ts-jest supertest @types/supertest

# Add test script to package.json
npm pkg set scripts.test="jest"
npm pkg set scripts.test:watch="jest --watch"
```

### Integration Testing

```bash
# Create test file
echo 'import request from "supertest";
import app from "../src/index";

describe("Calculator API", () => {
  test("GET /api/calculator", async () => {
    const response = await request(app).get("/api/calculator");
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
  });
});' > tests/calculator.test.ts
```

## Performance Optimization Examples

### Production Build

```bash
# TypeScript project
kickstart-express --name prod-api --language ts --src --structured

cd prod-api

# Install dependencies
pnpm install

# Build for production
pnpm build

# Start production server
NODE_ENV=production pnpm start
```

### Docker Multi-stage Build

The generated Dockerfile already includes multi-stage builds:

```dockerfile
# Development stage
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

# Production stage  
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=development /app/dist ./dist
CMD ["npm", "start"]
```

## Best Practices

### Project Naming

```bash
# Good examples
kickstart-express --name user-auth-api
kickstart-express --name order-processing-service
kickstart-express --name file-upload-service

# Avoid
kickstart-express --name MyAPI          # Use kebab-case
kickstart-express --name "api service"  # No spaces
kickstart-express --name api@v1        # No special chars
```

### Directory Organization

```bash
# Create related services together
mkdir my-project
cd my-project

kickstart-express --name api --language ts --docker --src --structured
kickstart-express --name admin --language ts --src
kickstart-express --name workers --language ts --src

# Result:
# my-project/
# ├── api/          (main API service)
# ├── admin/        (admin interface)
# └── workers/      (background jobs)
```

### Development Environment

```bash
# Set environment variables
export NODE_ENV=development
export PORT=3001

# Use different ports for different services
kickstart-express --name service-a # runs on 3000
# Edit service-a/.env to use PORT=3001

kickstart-express --name service-b # runs on 3000  
# Edit service-b/.env to use PORT=3002
```

These examples should give you a solid foundation for using Kickstart Express in various scenarios. For more specific use cases or questions, check the [FAQ](./faq.md) or open an issue on GitHub.