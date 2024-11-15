import { OrderCancelledEvent, Publisher, Subjects } from "@fabio/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
