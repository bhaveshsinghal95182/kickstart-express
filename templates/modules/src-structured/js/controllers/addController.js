import { add } from '../services/addService.js';

export const addNumbers = (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Both inputs must be numbers' });
  }

  const result = add(num1, num2);
  res.json({ result });
};
