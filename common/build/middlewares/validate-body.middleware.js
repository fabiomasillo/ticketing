"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBodyMiddleware = validateBodyMiddleware;
const ajv_1 = __importDefault(require("ajv"));
const request_validation_error_1 = require("../errors/request-validation.error");
const validate = (schema, body) => {
    const ajv = new ajv_1.default({ allErrors: true });
    ajv.addFormat("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    ajv.addFormat("date-time", /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/);
    ajv.addFormat("data-url", new RegExp(/data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/));
    const validate = ajv.compile(schema);
    let valid = validate(body);
    if (!valid && validate.errors) {
        return { valid: false, errors: validate.errors };
    }
    return { valid: true, errors: [] };
};
function validateBodyMiddleware(schema) {
    return (req, res, next) => {
        let { valid, errors } = validate(schema, req.body);
        if (valid) {
            next();
        }
        else {
            throw new request_validation_error_1.RequestValidationError(errors);
        }
    };
}
