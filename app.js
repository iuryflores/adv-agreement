import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "morgan";

import cors from "cors";

const app = express();

import "./config/db.config.js";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
