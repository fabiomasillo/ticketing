import { CustomError } from "./custom.error";
export declare class NotAuthenticatedError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
