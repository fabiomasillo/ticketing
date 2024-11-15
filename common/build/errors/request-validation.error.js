"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom.error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Invalid request parameters");
        this.errors = errors;
        this.statusCode = 400;
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
exports.RequestValidationError = RequestValidationError;
