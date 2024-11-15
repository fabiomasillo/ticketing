import { PaymentCreatedEvent, Publisher, Subjects } from "@fabio/common";
import { Message } from "node-nats-streaming";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
