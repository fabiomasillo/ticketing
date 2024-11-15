"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
function requestLogger(req, res, next) {
    let message = `
    -----------------------------
    REQUEST
    Method: ${req.method} 
    URL: ${req.originalUrl} 
    Headers: ${JSON.stringify(req.headers)}
    -----------------------------`;
    console.log(message);
    next(); // Call next to pass control to the next middleware or route handler
}
