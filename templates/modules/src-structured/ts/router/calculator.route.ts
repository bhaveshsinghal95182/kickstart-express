// src/routes/calculator.routes.ts

import { Router } from 'express';
import { addController } from '../controllers/calculator.controller';

const router = Router();

/**
 * @route POST /add
 * @description Route to add two numbers.
 * @access Public
 */
router.post('/add', addController);

export default router;
