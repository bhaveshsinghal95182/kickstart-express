import express from 'express';
import addRoute from './routes/addRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', addRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
