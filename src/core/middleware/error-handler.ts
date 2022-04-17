import { NextFunction, Request, Response } from "express";
import { APIError } from "../models";

export function errorHandler(
  err: Error | APIError,
  _: Request,
  res: Response,
  __: NextFunction
) {
  let apiError: APIError;

  if (err instanceof APIError) {
    apiError = err;
  } else {
    apiError = new APIError(
      "GENERAL",
      err.message,
      400,
    );
  }

  console.error(`[${apiError.status}] (${apiError.name}): ${apiError.message}`);
  res.status(apiError.status).json(apiError);
}
