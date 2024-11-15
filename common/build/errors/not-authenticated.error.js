"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthenticatedError = void 0;
const custom_error_1 = require("./custom.error");
class NotAuthenticatedError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 401;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.NotAuthenticatedError = NotAuthenticatedError;
