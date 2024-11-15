import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
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
