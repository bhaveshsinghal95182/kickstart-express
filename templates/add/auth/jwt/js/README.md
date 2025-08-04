# JWT Authentication

This template provides JWT (JSON Web Token) authentication for your Express.js application.

## Files Generated

- `middleware/auth.js` - JWT authentication middleware
- `utils/auth.js` - JWT utility functions (token generation, password hashing)
- `examples/app.js` - Complete example Express app with JWT auth
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
   ```javascript
   const authMiddleware = require('./middleware/auth');
   
   // Protected route
   app.get('/protected', authMiddleware, (req, res) => {
     res.json({ user: req.user });
   });
   ```

## Usage Examples

### Generate a JWT Token
```javascript
const { generateToken } = require('./utils/auth');

const token = generateToken({ 
  userId: 'user123', 
  email: 'user@example.com',
  role: 'user'
});
```

### Hash a Password
```javascript
const { hashPassword } = require('./utils/auth');

const hashedPassword = await hashPassword('userPassword123');
```

### Verify a Password
```javascript
const { comparePassword } = require('./utils/auth');

const isValid = await comparePassword('userPassword123', hashedPassword);
```

### Protect Routes
```javascript
const authMiddleware = require('./middleware/auth');

app.get('/protected', authMiddleware, (req, res) => {
  // req.user contains the decoded JWT payload
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

## Security Notes

- Always use HTTPS in production
- Use a strong, random JWT_SECRET
- Consider token refresh strategies for long-lived applications
- Store sensitive data server-side, not in JWT payload