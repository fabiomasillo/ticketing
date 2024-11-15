import { ErrorObject } from "ajv";
import { CustomError } from "./custom.error";
export declare class RequestValidationError extends CustomError {
    errors: ErrorObject[];
    statusCode: number;
    constructor(errors: ErrorObject[]);
    serializeErrors(): {
        field: string | undefined;
        message: string;
    }[];
}
