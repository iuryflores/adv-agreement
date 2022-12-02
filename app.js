import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "morgan";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import defendantRoutes from "./routes/defendant.routes.js";
import processRoutes from "./routes/process.routes.js";
import dealRoutes from "./routes/deal.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

import authMiddleware from "./middlewares/auth.middlewares.js";

const app = express();

import "./config/db.config.js";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/", userRoutes);

app.use(authMiddleware);

app.use("/", defendantRoutes);
app.use("/", processRoutes);
app.use("/", dealRoutes);
app.use("/", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
