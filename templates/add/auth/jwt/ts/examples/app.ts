import express from 'express';
import dotenv from 'dotenv';
import authMiddleware from './middleware/auth';
import { generateToken, hashPassword, comparePassword } from './utils/auth';

dotenv.config();

const app = express();
app.use(express.json());

// Example: Public route (no authentication required)
app.get('/public', (req, res) => {
  res.json({ message: 'This is a public route accessible to everyone' });
});

// Example: Login route (generates JWT token)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Here you would typically:
    // 1. Find user in database by email
    // 2. Compare password with stored hash
    // For example purposes, we'll use dummy data
    
    const storedPasswordHash = '$2a$12$example.hash'; // Get from database
    const isValidPassword = await comparePassword(password, storedPasswordHash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token with user data
    const token = generateToken({ 
      userId: 'user123', 
      email: email,
      role: 'user' 
    });
    
    res.json({ 
      message: 'Login successful',
      token: token,
      user: { userId: 'user123', email: email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Example: Register route (creates new user with hashed password)
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Hash the password before storing
    const hashedPassword = await hashPassword(password);
    
    // Here you would store the user in your database
    // const user = await User.create({ email, password: hashedPassword });
    
    res.json({ 
      message: 'User registered successfully',
      user: { email: email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Example: Protected route (requires authentication)
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ 
    message: 'This is a protected route',
    user: req.user 
  });
});

// Example: Protected route with role check
app.get('/admin', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  res.json({ 
    message: 'Admin-only content',
    user: req.user 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available routes:');
  console.log('  GET  /public     - Public route');
  console.log('  POST /login      - Login and get token');
  console.log('  POST /register   - Register new user');
  console.log('  GET  /protected  - Protected route (requires token)');
  console.log('  GET  /admin      - Admin-only route');
});