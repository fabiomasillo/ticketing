import { OrderCreatedEvent, Publisher, Subjects } from "@fabio/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
