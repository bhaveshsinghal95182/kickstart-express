import { clerkMiddleware, requireAuth, getAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  auth?: any;
}

/**
 * Clerk Authentication Middleware
 * Adds Clerk authentication to all routes
 * This middleware checks for session JWTs and attaches auth object to request
 */
export const clerkAuth = clerkMiddleware();

/**
 * Protected Route Middleware
 * Use this middleware to protect routes that require authentication
 * Redirects unauthenticated users to sign-in page
 */
export const protectedRoute = requireAuth();

/**
 * Optional Auth Middleware
 * Use this when you want to check if user is authenticated but not require it
 */
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  req.auth = auth;
  next();
};

/**
 * Custom Protection Middleware
 * Use this for custom authorization logic based on user roles/permissions
 */
export const customProtection = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  
  if (!auth.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // Add custom authorization logic here
  // Example: Check for specific roles or permissions
  // if (!auth.has({ permission: 'your:permission' })) {
  //   return res.status(403).json({ error: 'Insufficient permissions' });
  // }
  
  req.auth = auth;
  next();
};