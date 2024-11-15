import { CustomError } from "./custom.error";

export class NotAuthenticatedError extends CustomError {
  statusCode = 401;
  constructor(public message: string) {
    super(message);
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
