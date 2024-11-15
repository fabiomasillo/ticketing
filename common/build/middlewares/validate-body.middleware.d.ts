import { NextFunction, Request, Response } from "express";
declare function validateBodyMiddleware(schema: any): (req: Request, res: Response, next: NextFunction) => void;
export { validateBodyMiddleware };
