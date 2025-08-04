import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * JWT Utility Functions
 * Helper functions for JWT token generation and password hashing
 */

/**
 * Generate a JWT token for a user
 * @param payload - User data to include in token
 * @returns JWT token
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'kickstart-express'
    }
  );
};

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare a plain text password with a hash
 * @param password - Plain text password
 * @param hash - Hashed password
 * @returns True if passwords match
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/**
 * Verify and decode a JWT token
 * @param token - JWT token
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = (token: string): any | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};