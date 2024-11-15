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
import { createChargeRouter } from "./routes/create";

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
app.use(createChargeRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
