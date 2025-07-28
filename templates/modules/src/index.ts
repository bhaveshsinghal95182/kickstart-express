import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);

interface CalculationRequestBody {
  a: number;
  b: number;
}

app.get("/", (req: Request<{}, {}, CalculationRequestBody>, res: Response) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).send({ error: "Both 'a' and 'b' must be numbers." });
  }

  const c = a + b;
  res.send({ answer: c });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
