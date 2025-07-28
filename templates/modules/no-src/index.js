import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);

app.get("/", (req, res) => {
  const { a, b } = req.body;
  const c = a + b;
  res.send({ answer: c });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
