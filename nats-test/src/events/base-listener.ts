import { Stan, Message } from "node-nats-streaming";
import { Subjects } from "./subject";

interface Event {
  subject: Subjects;
  data: any;
}
export abstract class Listener<T extends Event> {
  private client: Stan;
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;

  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subcriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName);
  }
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subcriptionOptions()
    );
    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
