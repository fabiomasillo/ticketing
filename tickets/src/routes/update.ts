import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuthMiddleware,
  validateBodyMiddleware,
} from "@fabio/common";
import express, { Request, Response } from "express";
import { TicketUpdatedPublisher } from "../events/publisher/ticket-updated-publisher";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

const bodySchema = {
  type: "object",
  required: ["id", "title", "price"],
  properties: {
    id: { type: "string" },
    userId: { type: "string" },
    title: { type: "string" },
    price: { type: "number" },
  },
  additionalProperties: false,
};

router.put(
  "/api/tickets/:id",
  requireAuthMiddleware,
  validateBodyMiddleware(bodySchema),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("not authorized");
    }
    if (ticket.orderId) {
      throw new BadRequestError("Ticket locked");
    }
    ticket.set({ title, price });

    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    res.status(200).send(ticket);
    return;
  }
);

export { router as updateTicketRouter };
