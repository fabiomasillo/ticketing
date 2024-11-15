import { NextFunction, Request, Response } from "express";
export declare const requireAuthMiddleware: (req: Request, res: Response, next: NextFunction) => void;
