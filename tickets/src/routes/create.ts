import { requireAuthMiddleware, validateBodyMiddleware } from "@fabio/common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publisher/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

const bodySchema = {
  type: "object",
  required: ["title", "price"],
  properties: {
    title: { type: "string" },
    price: { type: "number", minimum: 0 },
  },
  additionalProperties: false,
};

router.post(
  "/api/tickets",
  requireAuthMiddleware,
  validateBodyMiddleware(bodySchema),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    await ticket.save();
    res.status(201).send(ticket);

    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    return;
  }
);

export { router as createTicketRouter };
