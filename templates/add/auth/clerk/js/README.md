# Clerk Authentication

This template provides Clerk authentication for your Express.js application.

## Files Generated

- `middleware/auth.js` - Clerk authentication middleware functions
- `examples/app.js` - Complete example Express app with Clerk auth
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
   ```javascript
   const { clerkAuth, protectedRoute } = require('./middleware/auth');
   
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

```javascript
const { clerkAuth } = require('./middleware/auth');
app.use(clerkAuth);
```

### protectedRoute
Protects routes by redirecting unauthenticated users to sign-in page.

```javascript
const { protectedRoute } = require('./middleware/auth');
app.get('/protected', protectedRoute, (req, res) => {
  // User is guaranteed to be authenticated
});
```

### optionalAuth
Checks authentication but doesn't require it. Useful for routes that show different content for authenticated users.

```javascript
const { optionalAuth } = require('./middleware/auth');
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

```javascript
const { customProtection } = require('./middleware/auth');
app.get('/api/user', customProtection, (req, res) => {
  // Custom authorization logic here
});
```

## Usage Examples

### Get User Information
```javascript
const { clerkClient } = require('@clerk/express');

app.get('/user', protectedRoute, async (req, res) => {
  const user = await clerkClient.users.getUser(req.auth.userId);
  res.json(user);
});
```

### Check Permissions
```javascript
app.get('/admin', customProtection, (req, res) => {
  if (!req.auth.has({ permission: 'org:admin' })) {
    return res.status(403).json({ error: 'Admin permission required' });
  }
  res.json({ message: 'Admin content' });
});
```

### Organization-based Access
```javascript
app.get('/org-data', customProtection, (req, res) => {
  if (!req.auth.orgId) {
    return res.status(403).json({ error: 'Organization membership required' });
  }
  res.json({ orgId: req.auth.orgId });
});
```

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
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Clerk Community](https://clerk.com/community)