import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validationMiddleware =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res
        .status(400)
        .json({ error: "Input validation failed", issue: result.error.errors });
    }

    next();
  };
