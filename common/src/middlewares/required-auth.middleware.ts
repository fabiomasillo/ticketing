import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized.error";
import { NotAuthenticatedError } from "../errors";

export const requireAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthenticatedError("Not authenticated");
  }
  next();
  return;
};
