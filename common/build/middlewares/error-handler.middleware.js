"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../errors/custom.error");
const errorHandler = (error, req, res, next) => {
    if (error instanceof custom_error_1.CustomError) {
        res.status(error.statusCode).send({ errors: error.serializeErrors() });
        return;
    }
    res.status(400).send({ message: error.message });
    return;
};
exports.errorHandler = errorHandler;
