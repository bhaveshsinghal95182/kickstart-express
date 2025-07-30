// src/app.ts

import express from "express";
import cors from "cors";
import calculatorRoutes from "./routes/calculator.route";
import dotenv from "dotenv";

dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Mount the calculator routes
app.use("/api/calculator", calculatorRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("TypeScript Express Calculator Server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
