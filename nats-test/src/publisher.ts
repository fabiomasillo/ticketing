import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();
const stan = nats.connect("ticketing", "abc", {
  url: "nats://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");
  // const data = {
  //   id: "123",
  //   title: "concert",
  //   price: 20,
  // };

  // stan.publish("ticket:created", JSON.stringify(data), (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("Event published");
  // });
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.log(err);
  }
});