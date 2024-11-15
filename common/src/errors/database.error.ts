import { CustomError } from "./custom.error";

export class DataBaseError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";
  constructor() {
    super("Error connecting to database");
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DataBaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
