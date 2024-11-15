import { ExpirationCompleteEvent, Publisher, Subjects } from "@fabio/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
