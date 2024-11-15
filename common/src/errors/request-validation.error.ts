import { ErrorObject } from "ajv";
import { CustomError } from "./custom.error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ErrorObject[]) {
    super("Invalid request parameters");
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      field: error.instancePath ? error.instancePath.slice(1) : undefined, // Remove leading '/' from the path
      message: error.message ? error.message : "",
    }));
  }
}
