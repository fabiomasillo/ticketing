import { currentUserMiddleware } from "@fabio/common";
import express from "express";
const router = express.Router();

router.get("/api/users/current-user", currentUserMiddleware, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
