import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import {
  currentUserMiddleware,
  errorHandler,
  NotFoundError,
  requestLogger,
} from "@fabio/common";
import { detailOrderRouter } from "./routes/detail";
import { createOrderRouter } from "./routes/create";
import { listOrderRouter } from "./routes/list";
import { deleteOrderRouter } from "./routes/delete";
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
app.use(detailOrderRouter);
app.use(createOrderRouter);
app.use(listOrderRouter);
app.use(deleteOrderRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
