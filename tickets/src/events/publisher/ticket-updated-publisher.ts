import { Publisher, Subjects, TicketUpdatedEvent } from "@fabio/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
