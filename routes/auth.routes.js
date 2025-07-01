import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.json({ message: "Sign-up endpoint" });
});
authRouter.post("/sign-in", (req, res) => {
  res.json({ message: "Sign-in endpoint" });
});

authRouter.post("/sign-out", (req, res) => {
  res.json({ message: "Sign-out endpoint" });
});

export default authRouter;
