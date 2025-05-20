import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || err.status || 500;

  res
    .status(statusCode)
    .json({ error: err.message || "Internal server error" });
};
