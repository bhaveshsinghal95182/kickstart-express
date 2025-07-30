import { Request, Response } from 'express';
import { add as addService } from '../services/calculator.service';
import { CalculationResult } from '../models/calculation.model';

/**
 * Handles the addition request.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export const addController = (req: Request, res: Response): void => {
  try {
    // Extract numbers from request body
    const { a, b } = req.body;

    // Basic validation
    if (typeof a !== 'number' || typeof b !== 'number') {
      res.status(400).json({ error: 'Invalid input. Both "a" and "b" must be numbers.' });
      return;
    }

    // Perform calculation using the service function
    const result = addService(a, b);
    const response: CalculationResult = { result };

    // Send the response
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};
