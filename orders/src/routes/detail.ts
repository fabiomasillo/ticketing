import express, { Request, Response } from "express";
import { Order } from "../models/order";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuthMiddleware,
} from "@fabio/common";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuthMiddleware,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("not authorized");
    }
    res.send(order);
  }
);

export { router as detailOrderRouter };
