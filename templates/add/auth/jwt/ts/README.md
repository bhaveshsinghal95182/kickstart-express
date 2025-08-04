# JWT Authentication (TypeScript)

This template provides JWT (JSON Web Token) authentication for your TypeScript Express.js application.

## Files Generated

- `middleware/auth.ts` - JWT authentication middleware with TypeScript types
- `utils/auth.ts` - JWT utility functions (token generation, password hashing)
- `examples/app.ts` - Complete example Express app with JWT auth
- `.env` - Environment variables for JWT configuration

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update your `.env` file:
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ```

3. Use the middleware in your routes:
   ```typescript
   import authMiddleware from './middleware/auth';
   
   // Protected route
   app.get('/protected', authMiddleware, (req, res) => {
     res.json({ user: req.user });
   });
   ```

## Usage Examples

### Generate a JWT Token
```typescript
import { generateToken } from './utils/auth';

const token = generateToken({ 
  userId: 'user123', 
  email: 'user@example.com',
  role: 'user'
});
```

### Hash a Password
```typescript
import { hashPassword } from './utils/auth';

const hashedPassword = await hashPassword('userPassword123');
```

### Verify a Password
```typescript
import { comparePassword } from './utils/auth';

const isValid = await comparePassword('userPassword123', hashedPassword);
```

### Protect Routes with Type Safety
```typescript
import authMiddleware from './middleware/auth';
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

app.get('/protected', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  // req.user contains the decoded JWT payload with full TypeScript support
  res.json({ message: 'Protected content', user: req.user });
});
```

## Client-Side Usage

Send the JWT token in the Authorization header:

```javascript
fetch('/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## TypeScript Benefits

- Full type safety for authentication middleware
- IntelliSense support for JWT utilities
- Compile-time error checking
- Better IDE support and refactoring

## Security Notes

- Always use HTTPS in production
- Use a strong, random JWT_SECRET
- Consider token refresh strategies for long-lived applications
- Store sensitive data server-side, not in JWT payload