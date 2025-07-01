import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./db/connect.js";
import { authRouter, subscriptionRouter, userRouter } from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Subscriptions API is running on http://localhost:${PORT}`);
  await connectDB();
});
export default app;
