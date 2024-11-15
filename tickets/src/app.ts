import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { createTicketRouter } from "./routes/create";
import {
  currentUserMiddleware,
  errorHandler,
  NotFoundError,
  requestLogger,
} from "@fabio/common";
import { detailTicketRouter } from "./routes/detail";
import { listTicketRouter } from "./routes/list";
import { updateTicketRouter } from "./routes/update";

const app = express();
// app.use(requestLogger);
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserMiddleware);
app.use(detailTicketRouter);
app.use(createTicketRouter);
app.use(listTicketRouter);
app.use(updateTicketRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
