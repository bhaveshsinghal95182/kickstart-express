# Clerk Authentication (TypeScript)

This template provides Clerk authentication for your TypeScript Express.js application.

## Files Generated

- `middleware/auth.ts` - Clerk authentication middleware functions with TypeScript types
- `types/globals.d.ts` - Global TypeScript types for Clerk auth object
- `examples/app.ts` - Complete example Express app with Clerk auth
- `.env` - Environment variables for Clerk configuration

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your Clerk account:
   - Sign up at [clerk.com](https://clerk.com)
   - Create a new application
   - Get your API keys from the dashboard

3. Update your `.env` file:
   ```
   CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

4. Use the middleware in your app:
   ```typescript
   import { clerkAuth, protectedRoute } from './middleware/auth';
   
   // Apply to all routes
   app.use(clerkAuth);
   
   // Protected route
   app.get('/protected', protectedRoute, (req, res) => {
     res.json({ userId: req.auth.userId });
   });
   ```

## Available Middleware

### clerkAuth
Adds Clerk authentication to all routes. Checks for session JWTs and attaches auth object to request.

```typescript
import { clerkAuth } from './middleware/auth';
app.use(clerkAuth);
```

### protectedRoute
Protects routes by redirecting unauthenticated users to sign-in page.

```typescript
import { protectedRoute } from './middleware/auth';
app.get('/protected', protectedRoute, (req, res) => {
  // User is guaranteed to be authenticated
});
```

### optionalAuth
Checks authentication but doesn't require it. Useful for routes that show different content for authenticated users.

```typescript
import { optionalAuth } from './middleware/auth';
app.get('/optional', optionalAuth, (req, res) => {
  if (req.auth.userId) {
    // User is authenticated
  } else {
    // User is not authenticated
  }
});
```

### customProtection
For API routes that need custom authorization logic. Returns JSON errors instead of redirecting.

```typescript
import { customProtection } from './middleware/auth';
app.get('/api/user', customProtection, (req, res) => {
  // Custom authorization logic here
});
```

## Usage Examples

### Get User Information with Type Safety
```typescript
import { clerkClient } from '@clerk/express';
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  auth?: any;
}

app.get('/user', protectedRoute, async (req: AuthenticatedRequest, res: Response) => {
  const user = await clerkClient.users.getUser(req.auth.userId);
  res.json(user);
});
```

### Check Permissions
```typescript
app.get('/admin', customProtection, (req: AuthenticatedRequest, res: Response) => {
  if (!req.auth.has({ permission: 'org:admin' })) {
    return res.status(403).json({ error: 'Admin permission required' });
  }
  res.json({ message: 'Admin content' });
});
```

### Organization-based Access
```typescript
app.get('/org-data', customProtection, (req: AuthenticatedRequest, res: Response) => {
  if (!req.auth.orgId) {
    return res.status(403).json({ error: 'Organization membership required' });
  }
  res.json({ orgId: req.auth.orgId });
});
```

## TypeScript Benefits

- Full type safety for authentication middleware
- IntelliSense support for Clerk auth object
- Compile-time error checking for auth properties
- Better IDE support and refactoring
- Auto-completion for Clerk API methods

## Global Types

The `types/globals.d.ts` file provides TypeScript definitions for the Clerk auth object, enabling:

- Auto-completion for `req.auth` properties
- Type checking for authentication methods
- IntelliSense support in your IDE

## Client-Side Integration

Clerk provides client-side SDKs for React, Next.js, and vanilla JavaScript. The session tokens are automatically managed and sent to your Express backend.

## Security Features

- Automatic session management
- Built-in user management
- Social login support
- Multi-factor authentication
- Session-based security
- GDPR compliance tools

## Learn More

- [Clerk Express Documentation](https://clerk.com/docs/quickstarts/express)
- [Clerk TypeScript Reference](https://clerk.com/docs/references/express/overview)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Clerk Community](https://clerk.com/community)