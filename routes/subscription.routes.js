import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.json({ message: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.json({ message: `GET subscription` });
});

subscriptionRouter.post("/", (req, res) => {
  res.json({ message: "Create a new subscription" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.json({ message: `Update subscription` });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.json({ message: `Delete subscription` });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.json({ message: `GET all user subscriptions ` });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.json({ message: `Cancel subscription` });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.json({ message: `GET all upcoming renewals` });
});

export default subscriptionRouter;
