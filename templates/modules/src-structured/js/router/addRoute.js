import express from 'express';
import { addNumbers } from '../controllers/addController.js';

const router = express.Router();

router.post('/add', addNumbers);

export default router;
