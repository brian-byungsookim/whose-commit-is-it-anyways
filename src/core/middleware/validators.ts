import { NextFunction, Request, Response } from "express";
import { APIError } from "../models";

export function validateOwnerAndRepo(req: Request, _: Response, next: NextFunction) {
  if (!req.query.owner) {
    next(
      new APIError(
        "VALIDATION",
        "The 'owner' query param is required.",
        400,
      )
    );
  } else if (!req.query.repo) {
    next(
      new APIError(
        "VALIDATION",
        "The 'repo' query param is required.",
        400,
      )
    );
  } else {
    next();
  }
}
