import { CustomError } from "./custom.error";
export declare class DataBaseError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
