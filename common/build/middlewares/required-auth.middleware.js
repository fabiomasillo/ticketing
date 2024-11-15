"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthMiddleware = void 0;
const errors_1 = require("../errors");
const requireAuthMiddleware = (req, res, next) => {
    if (!req.currentUser) {
        throw new errors_1.NotAuthenticatedError("Not authenticated");
    }
    next();
    return;
};
exports.requireAuthMiddleware = requireAuthMiddleware;
