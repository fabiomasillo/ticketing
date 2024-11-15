import { CustomError } from "./custom.error";
export declare class NotFoundError extends CustomError {
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
    statusCode: number;
    constructor();
}
